# Smart Account

## Abstract

The `x/smart-account` module (store key `smartaccount`) adds an opt-in, per-transaction authentication path that runs alongside the classic Cosmos SDK signature verification. An account registers one or more *authenticators*, small units of authentication logic identified by a numeric id. A transaction opts into the authenticator path by naming an authenticator id per message in a `TxExtension`; transactions without the extension flow through the original ante handler chain unchanged. A module-level circuit breaker can disable the authenticator path chain-wide, at which point every transaction falls back to classic signature verification.

This page is the module spec: storage layout, the ante and post handler internals, and the exact semantics of each registered authenticator type. For the integrator surface (message payload shapes, worked One Click Trading example, composition patterns), see [Smart Accounts and Authenticators](/integrate/features/smart-accounts).

Source: [`x/smart-account` at v31.0.2](https://github.com/osmosis-labs/osmosis/tree/v31.0.2/x/smart-account).

## Concepts

An authenticator is any type implementing the `Authenticator` interface (`x/smart-account/authenticator/iface.go`): `Type`, `StaticGas`, `Initialize`, and five lifecycle hooks. Three run per transaction: `Authenticate` (read-only verification in the ante handler), `Track` (persistent pre-execution state writes), and `ConfirmExecution` (post-execution enforcement in the post handler). Two run on registration changes: `OnAuthenticatorAdded` and `OnAuthenticatorRemoved`.

Authenticator implementations are stateless singletons registered in an `AuthenticatorManager` at app wiring time. What accounts store onchain is only a `(type, config)` pair; at use time the keeper looks the type up in the manager and calls `Initialize(config)` to produce a ready instance. An authenticator type that is not registered in the manager can never be added to an account, and a stored authenticator whose type has disappeared from the manager fails initialization rather than silently passing.

## State

Two store prefixes:

| Prefix (as stored) | Key layout | Value |
| --- | --- | --- |
| `[1]\|` | fixed key | `next_authenticator_id`, a module-wide `uint64` counter |
| `[2]\|` | `[2]\|<bech32 account>\|<id>\|` | `AccountAuthenticator{id, type, config}` |

The prefixes are declared as `[]byte{0x01}` and `[]byte{0x02}` in `types/keys.go`, but `BuildKey` formats every element with `fmt.Sprint` and joins them with `|`, so the persisted keys literally begin with the ASCII strings `[1]|` and `[2]|` rather than raw prefix bytes. Ids are allocated from the single global counter (starting at 1), so an authenticator id is unique across all accounts, not merely within one. The account address string and id follow in the key, which makes per-account iteration a straightforward prefix scan (`GetAuthenticatorDataForAccount`) and single-authenticator lookup a direct key get (`GetSelectedAuthenticatorData`).

The stored `AccountAuthenticator` (`proto/osmosis/smartaccount/v1beta1/models.proto`) has three fields: `id` (uint64), `type` (the registered type string), and `config` (opaque bytes whose interpretation is type-specific).

## Parameters

Defined in `x/smart-account/types/params.go`. Live values verified against `https://lcd.osmosis.zone/osmosis/smartaccount/params`:

| Parameter | Type | Live value | Purpose |
| --- | --- | --- | --- |
| `maximum_unauthenticated_gas` | uint64 | `250000` | Gas budget available before the fee payer's message has been authenticated. See [Fee payer gating](#fee-payer-gating-and-the-unauthenticated-gas-limit). |
| `is_smart_account_active` | bool | `true` | Circuit breaker. When `false`, every transaction routes through the classic ante handler flow and `MsgAddAuthenticator`/`MsgRemoveAuthenticator` are rejected. |
| `circuit_breaker_controllers` | []string | one DAODAO subDAO address | Addresses permitted to switch `is_smart_account_active` **off** via `MsgSetActiveState`. |

The circuit breaker is asymmetric (`keeper/msg_server.go`): any address in `circuit_breaker_controllers` can deactivate the module, but only the `CircuitBreakerGovernor` (wired to the `x/gov` module account in `app/keepers/keepers.go`) can reactivate it. Incident responders can pull the plug quickly; turning the feature back on requires governance.

## Transaction flow

### Routing: the circuit breaker decorator

`CircuitBreakerDecorator` (`ante/circuit_breaker.go`) sits at the top of the ante chain and holds two complete ante handler flows. It routes a transaction to the authenticator flow only when both hold:

1. `is_smart_account_active` is `true`, and
2. the transaction carries a `TxExtension` (in the tx's non-critical extension options) with at least one entry in `selected_authenticators`.

Otherwise the transaction runs the original ante handler flow, meaning classic signature verification. Opting in is therefore strictly per transaction; an account with registered authenticators can still sign classically.

### Authenticate

`AuthenticatorDecorator.AnteHandle` (`ante/ante.go`) performs, in order:

- **Fee payer validation.** The fee payer must be the first message's signer; manually set fee payers (as used by fee grants) are rejected.
- **Selected authenticator matching.** `selected_authenticators` from the `TxExtension` must contain exactly one entry per message; a length mismatch rejects the transaction. Entry *i* is the id of the authenticator to use for message *i*, looked up on that message's signer account. Every message must have exactly one signer.
- **Per-message authentication.** For each message, the keeper initializes the selected authenticator and builds an `AuthenticationRequest` carrying the message, the full tx data, the signature, and fee information. Replay protection is enforced here: the signature's sequence must match the account sequence (`SequenceMatch` in `authenticator/replay_protection.go`). `Authenticate` is invoked on a cached context that is always discarded, so authenticators cannot write state during verification regardless of outcome. Any failure rejects the whole transaction.

#### Fee payer gating and the unauthenticated gas limit

Until the fee payer's own message has been authenticated, nobody is committed to paying for the transaction, so the handler swaps in a temporary gas meter limited to `min(remaining gas, maximum_unauthenticated_gas)`. This prevents an attacker from stacking arbitrarily expensive authenticators (deep composites, contract calls) and making validators burn compute on transactions that can never pay. The moment the fee payer authenticates, the fee is deducted immediately and that deduction is written through to the store, so it persists even if a later message in the same transaction fails authentication. The gas consumed so far is charged to the original gas meter and the full transaction gas limit is restored for the remaining work.

### Track

After every message has authenticated, the handler runs each authenticator's `Track` hook, in message order, on the live (uncached) context. `Track` runs before message execution and its writes persist even if message execution later fails; it exists so an authenticator can snapshot pre-execution state (a balance, a timestamp) that `ConfirmExecution` compares against afterwards. A `Track` failure is not expected in normal operation and rejects the transaction.

### ConfirmExecution

`AuthenticatorPostDecorator.PostHandle` (`post/post.go`) runs after message execution, for authenticator transactions only (it re-checks the same circuit breaker condition and passes classic transactions through). For each message it re-initializes the same selected authenticator, rebuilds the request (replay protection is skipped, having already been checked in the ante), and calls `ConfirmExecution`. This is where outcome-dependent rules live: a spend limit compares the post-execution balance captured here against the pre-execution balance captured in `Track`.

A `ConfirmExecution` failure returns an error from the post handler, which reverts all message execution state: the transaction is included in the block as failed and nothing the messages did survives. Everything written during the ante phase does survive, though: BaseApp commits the ante cache before message execution, so both the fee deduction and the `Track` snapshots persist even for a rejected transaction. Authenticator contracts must not assume a `ConfirmExecution` failure rolls back what they wrote during `Track`.

## Authenticator types

Six types are registered at manager construction in `app/keepers/keepers.go` (`InitializeAuthenticators`): `SignatureVerification`, `MessageFilter`, `AllOf`, `AnyOf`, `PartitionedAnyOf`, `PartitionedAllOf`. A seventh, `CosmwasmAuthenticatorV1`, is registered later in the same wiring (`RegisterAuthenticator`), once the wasm contract keeper it depends on exists.

**`SignatureVerification`** (`authenticator/signature_authenticator.go`) verifies the transaction's secp256k1 signature over the SIGN_MODE_DIRECT sign bytes against the public key stored in its config, which must be exactly a 33-byte compressed secp256k1 key (enforced by `OnAuthenticatorAdded`). It consumes the standard `SigVerifyCostSecp256k1` gas per invocation. `Track` and `ConfirmExecution` are no-ops.

**`MessageFilter`** (`authenticator/message_filter.go`) stores a JSON pattern and passes authentication only when the pattern is a subset of the message rendered as JSON: every key and value in the pattern must appear in the message, while the message may contain extra fields. Numbers in the pattern must be encoded as strings; floats are rejected at registration. It performs no signature checking, so it is only meaningful nested inside a composite alongside something that does.

**`AllOf`** (`authenticator/all_of.go`) wraps sub-authenticators and passes each hook only if every child passes, evaluated in order with a short-circuit on the first failure. All children see the same signature.

**`AnyOf`** (`authenticator/any_of.go`) passes `Authenticate` when any one child passes, accumulating each child's error into the message returned when all fail. `ConfirmExecution` runs each child on a cached context and writes through only the state of the first child that succeeds; failed children's writes are discarded. `Track` always runs on all children.

**`PartitionedAllOf` / `PartitionedAnyOf`** are the same composites constructed with partitioned signature assignment: the request's signature field must be a JSON array with exactly one signature per child, and child *i* receives signature *i* instead of all children sharing one signature. This is what makes an onchain multisig out of `PartitionedAllOf(SignatureVerification, ...)`.

**`CosmwasmAuthenticatorV1`** (`authenticator/cosmwasm.go`) delegates every hook to a CosmWasm contract via `Sudo` calls. Its config is JSON with a `contract` address and optional `params` (JSON bytes forwarded to the contract on every hook), letting one deployed contract serve many accounts with per-authenticator parameters. It declares no static gas; the contract's execution is metered as ordinary wasm gas, bounded by the unauthenticated gas limit until the fee payer authenticates.

### Composite nesting rules

Composite config is a JSON array of `{"type", "config"}` pairs (`authenticator/composite.go`). Every composite requires at least two sub-authenticators; both registration (`onSubAuthenticatorsAdded`) and initialization reject a shorter list. Children may themselves be composites. Each child is addressed by a dotted composite id derived from the parent's id (`"5.0"`, `"5.1"`, `"5.1.0"`, ...); this id is threaded through every hook, which is how a shared CosmWasm contract keys per-position state even when the same contract appears at several places in one tree.

## CosmwasmAuthenticatorV1 contract interface

A contract backing a `CosmwasmAuthenticatorV1` must handle five sudo message variants. The canonical Rust types live in the [`cw-authenticator`](https://github.com/osmosis-labs/cw-authenticator) crate ([crates.io](https://crates.io/crates/cw-authenticator)), which the chain-side encoder in `authenticator/cosmwasm.go` mirrors:

```rust
#[cw_serde]
pub enum AuthenticatorSudoMsg {
    OnAuthenticatorAdded(OnAuthenticatorAddedRequest),
    OnAuthenticatorRemoved(OnAuthenticatorRemovedRequest),
    Authenticate(Box<AuthenticationRequest>),
    Track(TrackRequest),
    ConfirmExecution(ConfirmExecutionRequest),
}
```

All five requests carry `account`, `authenticator_id` (the dotted composite id as a string), and the optional `authenticator_params` from the authenticator's config. `Track` and `ConfirmExecution` additionally carry the message (`type_url` plus raw `value` bytes), `msg_index`, and fee details. `Authenticate` is the richest: it adds the `signature`, `sign_mode_tx_data` (the SIGN_MODE_DIRECT sign bytes), `tx_data` (chain id, account number, sequence, all messages, memo), and `signature_data`, so a contract can implement full custom signature schemes. Returning an error from any variant fails that hook with the phase semantics described above; an error from `OnAuthenticatorAdded` blocks the registration itself.

## Messages

Three rpcs, defined in `proto/osmosis/smartaccount/v1beta1/tx.proto`. Full JSON payload shapes and examples are on the [integrate page](/integrate/features/smart-accounts).

| Msg | Signer | Effect |
| --- | --- | --- |
| `MsgAddAuthenticator` | the account itself | Validates config via the type's `OnAuthenticatorAdded`, assigns the next global id, stores the authenticator. |
| `MsgRemoveAuthenticator` | the account itself | Runs `OnAuthenticatorRemoved` (which may veto removal), then deletes the store entry. |
| `MsgSetActiveState` | controller (off) / governance (on) | Flips `is_smart_account_active`. |

`MsgAddAuthenticator` and `MsgRemoveAuthenticator` are themselves rejected while the module is inactive. The same proto file defines `TxExtension`, whose single field `selected_authenticators` (repeated uint64) is the per-message authenticator selection described above.

## Queries

| Query | LCD path | Returns |
| --- | --- | --- |
| `Params` | `/osmosis/smartaccount/params` | Module parameters. |
| `GetAuthenticators` | `/osmosis/smartaccount/authenticators/{account}` | All authenticators on an account. |
| `GetAuthenticator` | `/osmosis/smartaccount/authenticator/{account}/{authenticator_id}` | One authenticator by id. |

## Genesis

`GenesisState` (`proto/osmosis/smartaccount/v1beta1/genesis.proto`) holds the module `params`, the global `next_authenticator_id` counter, and `authenticator_data`: a list of `(address, authenticators)` groups produced by prefix-iterating the authenticator store on export. On import, each authenticator is re-added with its original id; the type's `OnAuthenticatorAdded` hook is invoked for validation against a cached context whose writes are discarded, so contract-side registration state is not re-created at genesis, only checked.
