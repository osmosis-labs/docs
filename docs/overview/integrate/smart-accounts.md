---
sidebar_position: 16
---

# Smart Accounts and Authenticators

The `x/smart-account` module on Osmosis lets a regular account opt into custom transaction-authentication logic in addition to (or instead of) the standard Cosmos SDK signature check. The account stays a normal `BaseAccount` at the keeper level; the authentication path is what changes.

This is the primitive that Osmosis uses to close the gap between the standard "one key signs everything" wallet model and the UX patterns users expect from the rest of the modern web: rotating keys without losing the account, granting a single device or session limited spending power, using a hardware key for high-value operations while a hot key handles trading, recovering from a lost device without seed-phrase gymnastics. None of that is built into the module directly. The module provides composable building blocks; products like One Click Trading on the Osmosis frontend assemble them into a user-facing feature.

In practice this means a single Osmosis account can:

- Verify transactions against multiple signature schemes or keys.
- Compose authentication rules (`AllOf`, `AnyOf`).
- Restrict authentication to specific message types or message contents via a `MessageFilter`.
- Delegate authentication entirely to a CosmWasm contract, which is how features like spend limits, time-bounded session keys, and arbitrary policy engines are built on top of the module.

This page covers the integrator surface: the messages an account uses to manage its authenticators, the seven authenticator types registered onchain, how the transaction flow works, the queries available, and how the Osmosis frontend wires these together to ship One Click Trading.

## Module state and circuit breaker

Smart-account authentication is opt-in per transaction. By default a transaction is verified by the standard Cosmos SDK signature mechanism. A transaction opts in by setting `selected_authenticators` on its `TxExtension`; the chain then routes authentication for each message through the chosen authenticator on the signer's account.

Module-level state can be queried at `osmosis/smartaccount/params`:

```bash
curl https://lcd.osmosis.zone/osmosis/smartaccount/params
```

```json
{
  "params": {
    "maximum_unauthenticated_gas": "250000",
    "is_smart_account_active": true,
    "circuit_breaker_controllers": [
      "osmo1wn58hxkv0869ua7qmz3gvek3sz773l89a778fjqvenl6anwuhgnq6ks7kl"
    ]
  }
}
```

Three fields matter to integrators:

- `is_smart_account_active`: the module-level circuit breaker. When `false`, the authenticator path is disabled and every transaction falls back to standard signature verification, regardless of `selected_authenticators`. Useful as a kill switch during incident response.
- `circuit_breaker_controllers`: the list of addresses authorised to flip the circuit breaker. On mainnet this is a single DAODAO subDAO dedicated to smart-account incident response.
- `maximum_unauthenticated_gas`: the gas budget granted to the fee payer's authentication before the rest of the gas limit is unlocked. Spam-prevention measure.

## Authenticator types registered on chain

Seven authenticator types are registered in the chain's authenticator manager. Three are primitives, two are composites, and two are partitioned composites; one delegates to CosmWasm.

| Type string | Category | What it does |
| --- | --- | --- |
| `SignatureVerification` | primitive | Verifies a transaction signature against a configured public key. The default authentication method. |
| `MessageFilter` | primitive | Matches the incoming message against a configured pattern (msg type and/or partial msg contents). Authentication passes only if the message matches. Typically nested inside a composite. |
| `AllOf` | composite | Authentication passes only if every nested authenticator passes. |
| `AnyOf` | composite | Authentication passes if any one nested authenticator passes. |
| `PartitionedAllOf` | composite | `AllOf` with per-message partitioning. Each nested authenticator is responsible for a specific message in the transaction rather than all of them. |
| `PartitionedAnyOf` | composite | `AnyOf` with per-message partitioning. |
| `CosmwasmAuthenticatorV1` | external | Delegates authentication to a CosmWasm contract. Used to implement arbitrary policy engines such as spend limits, session keys, or role-based controls. |

The type string is what goes in `MsgAddAuthenticator.authenticator_type`. The `data` field of `MsgAddAuthenticator` is a type-specific byte payload that the authenticator's `OnAuthenticatorAdded` hook parses and validates at the time the authenticator is registered.

## Managing authenticators on an account

The module exposes three execute messages, all sent by the account that owns the authenticator:

### `MsgAddAuthenticator`

```protobuf
message MsgAddAuthenticator {
  string sender = 1;
  string authenticator_type = 2;  // one of the type strings in the table above
  bytes data = 3;                 // type-specific config, validated by OnAuthenticatorAdded
}
```

`sender` is both the signer and the account that the authenticator is being added to; you cannot add an authenticator to someone else's account. The response contains a `success` bool.

The `data` shape is specific to the authenticator type. Each authenticator's `OnAuthenticatorAdded` hook validates the bytes at registration time and rejects malformed payloads. Verified against authenticators currently live on chain, the shapes are:

- **`SignatureVerification`**: raw compressed secp256k1 public-key bytes (33 bytes).
- **`MessageFilter`**: JSON-encoded message pattern, typically `{"@type": "/osmosis.poolmanager.v1beta1.MsgSwapExactAmountIn"}` to restrict the authenticator to a specific msg type. Partial msg contents can also be matched.
- **`AllOf`, `AnyOf`, `PartitionedAllOf`, `PartitionedAnyOf`**: JSON-encoded array of `{"type": "<type-string>", "config": "<base64-encoded child config>"}` objects, one per nested authenticator. Nesting is arbitrary; composites of composites are valid.
- **`CosmwasmAuthenticatorV1`**: JSON-encoded object with two fields, `contract` (the bech32 address of the contract that handles the authentication sudo messages) and `params` (a base64-encoded byte payload that the chain forwards to the contract's `OnAuthenticatorAdded` hook as its initialisation config).

### `MsgRemoveAuthenticator`

```protobuf
message MsgRemoveAuthenticator {
  string sender = 1;
  uint64 id = 2;  // the authenticator's id, returned by GetAuthenticators
}
```

Removes the authenticator with the given id from the sender's account.

### `MsgSetActiveState`

```protobuf
message MsgSetActiveState {
  string sender = 1;
  bool active = 2;
}
```

The module-level circuit breaker. Only the addresses in `circuit_breaker_controllers` can call this. Used to disable the entire authenticator path chain-wide during incident response.

## Selecting authenticators on a transaction

For a transaction to use authenticators rather than the default signature path, the transaction must include a `TxExtension`:

```protobuf
message TxExtension {
  repeated uint64 selected_authenticators = 1;
}
```

`selected_authenticators` is a flat list with one entry per message in the transaction. Each entry is the id of the authenticator the chain should use to authenticate the corresponding message. If `selected_authenticators` is empty or missing, the transaction uses the standard Cosmos SDK signature mechanism (assuming the module's circuit breaker is on; otherwise the standard path is the only option).

Wallets and SDKs construct this extension when building the transaction. Direct integrators using `osmosisd` can pass it via the protobuf-any extension fields supported by the Cosmos SDK tx builder.

## Common composition patterns

The seven authenticator types are intentionally low-level building blocks. Real-world deployments compose them into higher-level constructs. The most common pattern observed on chain today is what amounts to a **session key with a spending policy and a message-type allowlist**:

```
AllOf
├── SignatureVerification         (pubkey of the session key)
├── CosmwasmAuthenticatorV1       (policy contract: spend limit, time bound, etc.)
└── AnyOf
    ├── MessageFilter             ({"@type": "/osmosis.poolmanager.v1beta1.MsgSwapExactAmountIn"})
    ├── MessageFilter             ({"@type": "/osmosis.poolmanager.v1beta1.MsgSplitRouteSwapExactAmountIn"})
    └── MessageFilter             (... other allowlisted msg types)
```

Reading this top-down: a transaction signed with the session-key pubkey, that satisfies the policy contract's `Authenticate` and `ConfirmExecution` hooks, and whose message is one of the allowlisted types, is authenticated. Any one of those failing means the whole `AllOf` fails and the transaction is rejected.

A few notes on why this composition is the recommended template:

- **`SignatureVerification` first** keeps the cheap check up front. If the signature is wrong, neither the contract nor the filter is consulted.
- **The policy contract goes in the middle**, where it can use `Authenticate` for cheap rejections and `ConfirmExecution` for any rule that depends on the transaction's outcome (spend limits, balance assertions, slippage caps).
- **`AnyOf(MessageFilter, MessageFilter, ...)`** at the end gives an explicit allowlist of message types this authenticator can sign for. The session key cannot accidentally authorise a `MsgSend` or governance vote if those filters are not in the list.

Other compositions are valid too. A multisig with custom quorum logic might be `AllOf(SignatureVerification, SignatureVerification, ...)` directly, with no contract. A read-only observer key (for analytics flows) might be a `SignatureVerification` plus a `MessageFilter` restricting it to query-only message types. The point is that the primitives compose; pick the smallest set that expresses your policy.

## Authentication lifecycle

Every authenticator implements four lifecycle hooks. Each authenticator type defines its own logic for these, and CosmWasm authenticators forward them as sudo messages to the backing contract:

1. **`Authenticate`** runs in the ante handler. It validates the message and signature. Any state changes here are discarded once the hook returns; the role of this hook is read-only verification. If `Authenticate` fails, the transaction is rejected and no fee is charged.
2. **`Track`** runs after every message has been authenticated and the fee has been collected, but before message execution. State changes here are persistent regardless of whether the message itself succeeds. Authenticators use this hook to record information about the transaction they are about to authorise.
3. **Message execution** then runs normally.
4. **`ConfirmExecution`** runs in the post handler. It can enforce rules that depend on the outcome of execution, such as spending limits that check the account's post-execution balance. State changes here persist if the hook succeeds and are discarded if it fails, in which case the whole transaction is rolled back.

A spend-limit authenticator is the canonical example of why `ConfirmExecution` matters: pre-execution balance is captured in `Track`, post-execution balance is captured in `ConfirmExecution`, and the difference is compared to the configured limit.

## Queries

Two REST endpoints expose authenticator state for an account.

`GET /osmosis/smartaccount/authenticators/{account}` returns every authenticator configured on the account:

```json
{
  "account_authenticators": [
    {
      "id": "<uint64>",
      "type": "AllOf",
      "config": "<base64-encoded type-specific bytes>"
    }
  ]
}
```

Each entry's `id` is a string on the wire (`uint64` in the proto) and is what goes into `MsgRemoveAuthenticator` and into `TxExtension.selected_authenticators` to use this authenticator on a transaction. The response is `{"account_authenticators": []}` for accounts that have not opted in.

`GET /osmosis/smartaccount/authenticator/{account}/{authenticator_id}` returns a single authenticator by id, wrapped in `account_authenticator` (singular) rather than `account_authenticators`.

Module-level parameters are at `GET /osmosis/smartaccount/params` (shown above).

## CosmWasm authenticators: how they work

A `CosmwasmAuthenticatorV1` authenticator points at a CosmWasm contract and forwards each lifecycle hook to that contract as a sudo message. Contracts implement the [`cw-authenticator`](https://crates.io/crates/cw-authenticator) interface, which defines the `AuthenticatorSudoMsg` enum that the chain dispatches:

- `OnAuthenticatorAdded`: fired when an account adds the authenticator. Used to validate config and seed contract state.
- `OnAuthenticatorRemoved`: fired when the account removes the authenticator. Used to clean up per-account state.
- `Authenticate`: read-only verification in the ante handler.
- `Track`: persistent state writes before execution.
- `ConfirmExecution`: post-execution enforcement.

Because the contract is the source of truth for what "authenticated" means, this is the path used to build features the chain itself does not natively support: spending limits in fiat-quoted USD, time-bounded session keys, role-based controls, multi-sig with custom quorum logic, and so on.

## Worked example: One Click Trading

One Click Trading on the Osmosis frontend is the canonical production deployment of this module. The user enables it once with their main wallet key; for the duration of the session the frontend signs swap transactions without any further wallet prompt. The pattern is small enough to walk through end-to-end.

### Setup

When the user enables a session, the frontend:

1. Generates a fresh secp256k1 keypair in the browser. This is the session key. The private key never leaves the device and is discarded when the session ends.
2. Builds an `AllOf` composite that wraps three nested authenticators:
   - `SignatureVerification` configured with the session key's public key.
   - `CosmwasmAuthenticatorV1` configured to call the spend-limit-authenticator contract with per-session parameters: a daily spending limit in USDC, a reset period, and a session expiry timestamp.
   - `AnyOf` containing a `MessageFilter` for each msg type the session is allowed to sign. The current allowlist is `MsgSwapExactAmountIn`, `MsgSplitRouteSwapExactAmountIn`, `MsgSwapExactAmountOut`, `MsgSplitRouteSwapExactAmountOut`, `MsgWithdrawPosition`, and `MsgSetValidatorSetPreference`.
3. Sends a single `MsgAddAuthenticator` transaction signed by the user's main wallet key, with `authenticator_type = "AllOf"` and the composite serialised into the `data` field. The chain validates every nested authenticator's config in the same hook.

The returned authenticator id is the value the frontend writes into `TxExtension.selected_authenticators` on every swap during the session.

### During the session

Each swap is signed by the in-browser session key, not the user's wallet. The transaction carries:

- A single signature from the session keypair.
- A `TxExtension` with `selected_authenticators` set to the session's authenticator id.

The chain dispatches authentication for the swap message through the `AllOf` composite. The signature check, the spend-limit contract's `Authenticate` (cheap pre-check) and the `MessageFilter` allowlist all have to pass before the message is admitted. After execution, the spend-limit contract's `ConfirmExecution` reads post-execution balances, converts the spend into USDC using a TWAP price, and rejects the transaction if the cumulative spend over the current period exceeds the limit.

The session key has no other authority: it cannot send funds, vote on governance, or even execute a swap whose message type is not in the allowlist.

### Teardown

Ending the session is a `MsgRemoveAuthenticator` signed by the user's main wallet key, passing the session's authenticator id. The composite and all its nested authenticators are removed from the account in one operation. The frontend also discards the in-browser session key.

### Why this composition

This shape addresses three independent concerns with three different primitives:

- **Who can sign:** `SignatureVerification` gates by a specific public key.
- **How much they can spend:** the spend-limit contract gates by post-execution balance delta.
- **What they can sign for:** `AnyOf(MessageFilter, ...)` gates by message type.

Any one of them failing means the transaction is rejected, so the user's main wallet key (which still controls the account directly) remains the source of absolute authority. The session is intentionally narrow.

### The spend-limit contract onchain

The spend-limit policy contract that the worked example points at is a single live deployment shared by every One Click Trading session on mainnet:

- **Address:** `osmo10xqv8rlpkflywm92k5wdmplzy7khtasl9c2c08psmvlu543k724sy94k74`
- **Code id:** 852
- **cw2 version:** `crates.io:spend-limit` v1.0.0

The `osmo1wn58hxkv0869ua7qmz3gvek3sz773l89a778fjqvenl6anwuhgnq6ks7kl` DAODAO subDAO holds both the contract's wasm-level admin and the spend-limit contract's own internal `admin`. That is the same subDAO listed in the module's `circuit_breaker_controllers`, so the kill switch on the contract and the kill switch on the module are operated by the same governance hand.

Each One Click Trading session passes its own per-session parameters to this shared contract via the `params` field of the `CosmwasmAuthenticatorV1` config. The shape is `{ "limit": "<microUSDC>", "reset_period": "day", "time_limit": { "end": "<unix-nanos>" } }`, base64-encoded. The contract keeps per-(account, authenticator-id) state so multiple sessions on the same account do not collide.

The source for the contract is at [`osmosis-labs/spend-limit-authenticator`](https://github.com/osmosis-labs/spend-limit-authenticator). The same pattern can be reused for other policy contracts: a custom authenticator only has to implement the `cw-authenticator` sudo interface and the chain's lifecycle hooks do the rest.

## Repository references

- Chain module: [`osmosis-labs/osmosis` → `x/smart-account`](https://github.com/osmosis-labs/osmosis/tree/main/x/smart-account). The module README has the full authenticator-interface description and the authentication flow diagrams.
- Registered authenticator types: [`x/smart-account/authenticator/`](https://github.com/osmosis-labs/osmosis/tree/main/x/smart-account/authenticator). The initialisation list lives in [`app/keepers/keepers.go`](https://github.com/osmosis-labs/osmosis/blob/main/app/keepers/keepers.go) under `InitializeAuthenticators`.
- Spend-limit policy contract: [`osmosis-labs/spend-limit-authenticator`](https://github.com/osmosis-labs/spend-limit-authenticator).
- Frontend One Click Trading implementation: [`osmosis-frontend` → `packages/web/hooks/mutations/one-click-trading/`](https://github.com/osmosis-labs/osmosis-frontend/tree/master/packages/web/hooks/mutations/one-click-trading). The `use-create-one-click-trading-session.tsx` hook contains the session construction logic walked through above.
- Authenticator interface crate: [`cw-authenticator` on crates.io](https://crates.io/crates/cw-authenticator).
