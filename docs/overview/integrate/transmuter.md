---
sidebar_position: 15
---

# Alloyed Assets

An **alloyed asset** is a single canonical Osmosis denom that represents the sum of multiple equivalent assets held in a 1:1 backing pool. The contract that implements this primitive is the **transmuter**: a CosmWasm contract that custodies a basket of `n` "variants" and mints a single alloyed denom against deposits.

`allBTC` is the most prominent live example. The contract at [`osmo1z6r6qdknhgsc0zeracktgpcxf43j6sekq07nw8sxduc9lg0qjjlqfu25e3`](https://celatone.osmosis.zone/osmosis-1/contracts/osmo1z6r6qdknhgsc0zeracktgpcxf43j6sekq07nw8sxduc9lg0qjjlqfu25e3) holds several different bridged-BTC denoms (wBTC variants, ckBTC, etc.) and mints `factory/.../alloyed/allBTC` against them. Holders of any of the backing assets can deposit and receive `allBTC` in return; holders of `allBTC` can redeem for any backing asset that has sufficient liquidity. The amount minted is **not** necessarily equal to the raw amount deposited: each asset is converted through its normalization factor first (see [How it works mechanically](#how-it-works-mechanically)), so backing assets with different decimal precision mint different raw amounts of `allBTC`.

This page covers the integrator surface: how alloyed assets are instantiated, the messages and queries the contract exposes, how routing through SQS works for them, and the implications for IBC transfers.

## Why Alloyed Assets exist

Bridging mechanisms often result in producing multiple bridged variants of "the same" asset. This is particularly noticable in the Cosmos ecosystem where most assets are bridged by default using IBC but may have multiple issuance chains. There are several legitimate wBTC denoms on Osmosis, several ETH denoms, several variants of USDT. Each is its own IBC denom (or factory denom) with its own liquidity pool, which fragments order flow and makes life harder for both LPs and users. The transmuter solves this by acting as a bridge fungifier: assets that arrived on Osmosis through different bridges become fungible at the trading layer.

Even where this is not currently true for an asset, additional bridges may emerge or existing ones may deprecate, resulting in shifting popularities of denominations and fractured liquidity between them.

An alloyed asset collapses that fragmentation into a single canonical denom **without removing the backing assets**. Each backing variant remains a real asset that can be deposited or redeemed at any time. The alloyed denom becomes the trading unit (in routing, pricing, and UX), while the transmuter pool absorbs the variant-level accounting.

The "transmuter" naming comes from the fact that joining the pool with variant `A` and exiting with variant `B` is a transmutation between two backing assets at parity, mediated by the alloyed accounting unit.

### Rate limiters

Two configurable limiters protect an alloyed asset from being dominated by a single bridge or variant:

- A **static limiter** caps any one backing variant at a fixed percentage of the pool (for example, "ETH via Axelar cannot exceed 75%").
- A **change limiter** restricts how much a variant's share can grow over a configured time window (for example, "no more than 10% increase in 24 hours").

The static upper limit is enforced at quote time by SQS as well as at execute time by the contract, so a swap that would push a backing variant over its cap surfaces as insufficient routing rather than only failing at broadcast.

If a variant is found to be compromised (a bridge incident, for example), the moderator can mark that asset as corrupted. The contract then excludes it from the active pool while still tracking its balance, and forces redemptions of the alloyed denom to drain the corrupted asset out, isolating the rest of the backing from the bad variant.

## How it works mechanically

When the contract is instantiated, the governance proposal supplies:

- A list of **pool asset configs**: the backing denoms plus a `normalization_factor` for each one. The normalization factor accounts for decimal differences between variants (for example, an asset with 8 decimals bridged alongside one with 6 decimals).
- An **alloyed asset subdenom** (the human-readable suffix appended after `alloyed/` in the factory denom).
- A **normalization factor** for the alloyed asset itself.
- An **admin** address (typically the Osmosis governance module account).
- A **moderator** address.

On instantiation, the contract calls `MsgCreateDenom` on the tokenfactory module to create the alloyed denom, which is owned by the contract itself. From that point on, the only way to mint alloyed tokens is to deposit backing assets through the contract.

The arithmetic is just a normalised sum. Each backing asset has its `normalization_factor`, and so does the alloyed asset. Deposits of any backing asset are converted into "normalised units" and credited 1:1 to the alloyed denom in the same normalised space. Withdrawals do the reverse. The contract never quotes an exchange rate other than `1:1` in the normalised accounting unit, so `spot_price` between any pair of supported denoms always returns the ratio of their normalization factors and never deviates from that.

This means swaps through the transmuter:

- Are not subject to price impact in the traditional sense. There is no curve.
- Can fail if the requested output denom does not have enough backing balance to fill the request.
- Charge no spread fee.

## Discovery

A transmuter pool is a `x/cosmwasmpool` pool whose contract is built from one of the alloyed-transmuter code IDs. SQS recognises them by matching the `code_id` against its configured list ([`AlloyedTransmuterCodeIDs` in `domain/config.go`](https://github.com/osmosis-labs/sqs/blob/main/domain/config.go)).

To find every live alloyed-asset pool:

- `GET https://sqs.osmosis.zone/pools` and filter for `type == 3` (CosmWasm) with a `chain_model.code_id` in the alloyed-transmuter list.
- Or query the chain directly: `osmosisd query cosmwasmpool pools` and filter the same way.
- Or query the contract's `get_share_denom` to confirm the share (alloyed) denom for a given contract address.

For a human-friendly view of the live alloyed-asset pools, including pool composition charts and swap interfaces, the [Alloyed Asset Dashboard](https://github.com/osmosis-labs/osmosis-alloy-asset-dashboard) reads the same code-id list and renders a per-pool overview.

### Finding the current code id

Multiple alloyed-transmuter code IDs are whitelisted at once, and capabilities differ between them: newer code IDs are supersets of older ones. **When creating a new pool, use the most recent whitelisted code id** so the pool has the full feature set. Query the live whitelist rather than hardcoding a value:

```bash
# Every code id whitelisted as a cosmwasm pool
osmosisd q cosmwasmpool params

# The code id backing a specific existing pool, via SQS
curl -s "https://sqs.osmosis.zone/pools?IDs=<POOL_ID>" | jq '.[0].chain_model.code_id'
```

The alloyed-transmuter code IDs are the subset of that whitelist tracked in SQS's [`AlloyedTransmuterCodeIDs`](https://github.com/osmosis-labs/sqs/blob/main/domain/config.go); the highest of them is the current version.

## Instantiation parameters

```json
{
  "pool_asset_configs": [
    { "denom": "ibc/<bridged-variant-1>", "normalization_factor": "1" },
    { "denom": "ibc/<bridged-variant-2>", "normalization_factor": "1000000" }
  ],
  "alloyed_asset_subdenom": "allBTC",
  "alloyed_asset_normalization_factor": "1",
  "admin": "osmo10d07y265gmmuvt4z0w9aw880jnsr700jjeq4qp",
  "moderator": "osmo1ugrn8qgsvyr8zwrv8h2g4r8ascngxk7qeaz7e0htjq3znswkh4cqhjdpgy"
}
```

Notes:

- `admin` is optional. For an alloyed asset onboarded through Osmosis governance, this is set to the governance module account so subsequent parameter changes go through governance proposals.
- `moderator` is required and gates the active-status circuit breaker. Conventionally a multisig or DAODAO subDAO, not an individual key.
- `pool_asset_configs` cannot include the alloyed denom itself; the contract creates that during instantiation.
- The alloyed denom that results from instantiation is `factory/<contract-addr>/alloyed/<alloyed_asset_subdenom>`.

[Proposal 826](https://www.mintscan.io/osmosis/proposals/826) ratified a generic specification for these parameters: a standard `all`-prefixed subdenom naming scheme, normalization-factor rules (minimum effective exponent of 6, never above the highest-exponent contributing variant), the standard governance admin and the Alloyed Moderator subDAO as moderator, and rate-limit conventions. An alloyed asset instantiated to that specification is recognised as the canonical version of the asset by Osmosis integrators, which is what lets it be surfaced automatically rather than relitigating parameters per asset. Follow the spec when instantiating a new alloyed asset intended to become canonical.

## Deposit (join_pool)

To mint alloyed tokens by depositing backing assets, send a `join_pool` execute message with the backing tokens attached as `funds`:

```bash
osmosisd tx wasm execute <TRANSMUTER_CONTRACT_ADDR> '{
  "join_pool": {}
}' --amount "100000000ibc/<BACKING_DENOM>" --from <KEY> --gas auto --gas-prices 0.05uosmo --gas-adjustment 1.3
```

The `--gas-prices` here is illustrative. Osmosis sets a dynamic minimum gas price via its [EIP-1559 fee market](/overview/features/eip-1559), so query the current base fee (`osmosisd query txfees base-fee` or the `osmosis/txfees/v1beta1/cur_eip_base_fee` LCD endpoint) and pass a value at or above it.

The contract mints alloyed tokens equal to the deposit converted into normalised units, which is **not** the same as the raw deposited amount unless the backing asset's normalization factor matches the alloyed asset's. Size redemptions off the minted (normalised) amount, not the raw deposit. For example, on the live `allBTC` pool one backing denom has a normalization factor of `1000000` while others have `1`, so depositing `1000000` base units of the high-factor denom mints `1` unit of `allBTC`, whereas `1000000` base units of a factor-`1` denom mints `1000000`. Query `list_asset_configs` for the factors before sizing a deposit or redemption. `--amount` can include multiple coins in one call as long as every coin's denom is in the pool's asset list.

## Redeem (exit_pool)

To burn alloyed tokens and receive backing assets, send an `exit_pool` execute with the requested output coins:

```bash
osmosisd tx wasm execute <TRANSMUTER_CONTRACT_ADDR> '{
  "exit_pool": {
    "tokens_out": [
      { "denom": "ibc/<BACKING_DENOM>", "amount": "100000000" }
    ]
  }
}' --from <KEY> --gas auto --gas-prices 0.05uosmo --gas-adjustment 1.3
```

No `--amount` is needed; the contract debits the required amount of the sender's alloyed-denom balance directly. The request fails if the requested output exceeds the contract's holdings of the chosen backing denom.

`exit_pool` can request multiple denoms in one call. This is the primitive that lets a holder "swap" one backing variant for another by depositing variant `A` (mint alloyed) and immediately exiting with variant `B`.

## Querying state

All queries are read-only smart queries against the contract:

```bash
osmosisd query wasm contract-state smart <CONTRACT_ADDR> '<QUERY_JSON>'
```

or over LCD at `GET /cosmwasm/wasm/v1/contract/<CONTRACT_ADDR>/smart/<base64(QUERY_JSON)>`.

### Pool-compatible queries

These satisfy the `x/cosmwasmpool` routing interface.

```json
{ "spot_price": { "base_asset_denom": "<denom>", "quote_asset_denom": "<denom>" } }
```

Returns the ratio of the two assets' normalization factors. There is no price curve.

```json
{ "calc_out_amt_given_in": { "token_in": { "denom": "<denom>", "amount": "<amount>" }, "token_out_denom": "<denom>", "swap_fee": "0" } }
```

How much of `token_out_denom` a swap of `token_in` would produce. `swap_fee` must equal the value returned by `get_swap_fee` (currently `"0"`); any other value errors. Fails if there is insufficient backing of the requested output.

```json
{ "calc_in_amt_given_out": { "token_out": { "denom": "<denom>", "amount": "<amount>" }, "token_in_denom": "<denom>", "swap_fee": "0" } }
```

The inverse of `calc_out_amt_given_in`, with the same `swap_fee` constraint. Unlike many CosmWasm pools, the transmuter implements this for real rather than panicking.

```json
{ "get_total_pool_liquidity": {} }
```

The contract's holdings of every backing asset, as a coins array.

```json
{ "get_swap_fee": {} }
```

Returns the swap fee (currently `"0"` on the live contracts).

### Alloyed-asset queries

```json
{ "get_share_denom": {} }
```

The factory denom of the alloyed asset (the "share" token).

```json
{ "get_total_shares": {} }
```

Total supply of the alloyed denom (equals the total backing in normalised units).

```json
{ "get_shares": { "address": "<address>" } }
```

The balance of alloyed tokens held by an address.

```json
{ "list_asset_configs": {} }
```

Every pool asset plus the alloyed asset itself, each with its `normalization_factor`. Use this to learn the backing set.

```json
{ "is_active": {} }
```

Returns `true` if the contract accepts deposits and withdrawals.

### Limiter and corruption queries

```json
{ "list_limiters": {} }
```

Every limiter currently registered on the contract, keyed by `(denom, label)`. The response includes both static-limiter state (current upper limit per variant) and change-limiter state (window size, boundary offset, current divisions).

```json
{ "get_corrupted_denoms": {} }
```

The list of backing denoms currently flagged as corrupted. A corrupted denom is excluded from the active pool but its balance is still tracked, and `exit_pool` is steered to drain it.

### Admin and moderator queries

```json
{ "get_admin": {} }
```

The current admin.

```json
{ "get_admin_candidate": {} }
```

Any pending admin-transfer offer (the address offered the admin role that has not yet claimed it).

```json
{ "get_moderator": {} }
```

The current moderator.

## Routing through SQS

See the [Sidecar Query Server (SQS)](./sqs) page for the routing and pool-query endpoints in general. SQS has a dedicated routable pool type for alloyed transmuters in [`routable_cw_alloy_transmuter_pool.go`](https://github.com/osmosis-labs/sqs/blob/main/router/usecase/pools/routable_cw_alloy_transmuter_pool.go). The routing semantics differ from a CFMM:

- SQS exposes the alloyed denom and every backing denom as connected through the pool, so a quote between any two of them can be routed through the transmuter.
- Quoting is exact: no slippage, no price impact, no spread fee on the current contracts. The output is simply the input scaled by the ratio of normalization factors.
- **Static upper-limit enforcement happens at quote time.** Before returning a quote, SQS checks every backing variant's post-trade balance against its configured static upper limit. A swap that would push a variant over its cap is rejected by SQS as insufficient routing, not just by the contract at execute time.
- Routing through a transmuter can also fail if the pool does not hold enough of the requested output denom. Balance validation is skipped on the alloyed side because the contract can mint or burn it freely; it is enforced on every backing denom.
- SQS computes both exact-in and exact-out quotes in-process from normalization factors; it does not call the contract's `calc_in_amt_given_out` or `calc_out_amt_given_in`. For the transmuter the two directions are mathematically symmetric (no curve, no spread fee), so this is safe; static rate limiters are still applied in both directions.
- The actual fill happens via `osmosis.poolmanager.v1beta1.MsgSwapExactAmountIn` against the transmuter's pool id, not a direct CosmWasm execute. The router handles the swap construction; integrators using the SQS quote endpoint do not need to build `join_pool` / `exit_pool` messages themselves.

For brand-new transmuter contracts spawned from an already-recognised code id, SQS picks them up automatically. A brand-new alloyed-transmuter *code id* (a new contract version, typically tied to a chain upgrade) has to be added to `AlloyedTransmuterCodeIDs` in the SQS deployment config and the service redeployed.

## IBC implications

Because the alloyed denom is a tokenfactory denom created on Osmosis, **it can be IBC-transferred out of Osmosis like any other tokenfactory denom**. The variant denoms it wraps are independent IBC denoms with their own paths.

Practical consequences for an integrator:

- A user holding `allBTC` on a destination chain has to come back to Osmosis to redeem into a backing variant. There is no off-chain transmuter; redemption requires interacting with the contract on Osmosis.
- The chain-registry assetlist for Osmosis lists the alloyed denom alongside its backing variants. The assetlists pipeline tags the relationship with `is_alloyed: true` so downstream apps can present them as related.
- The 1:1 redemption invariant only holds for the alloyed denom as it sits on Osmosis. After an IBC transfer out, the redeem path is "transfer back, then exit_pool"; the destination chain treats the IBC-voucher of the alloyed denom as opaque.

## Admin and moderator

The contract has two roles. Permissions below are taken from the `ensure_admin_authority!` and `ensure_moderator_authority!` checks in the v3.2.0 source.

### Admin

Admin-only execute messages:

- **Adminship transfer:** `transfer_admin` and `cancel_admin_transfer` are called by the current admin (offer / clear-offer). `claim_admin` and `reject_admin_transfer` are called by the address that was offered admin rights, not the current admin.
- **Pool composition:** `add_new_assets`, `rescale_normalization_factor`.
- **Rate limiters:** `register_limiter`, `deregister_limiter`, `set_change_limiter_boundary_offset`, `set_static_limiter_upper_limit`.
- **Token metadata:** `set_alloyed_denom_metadata`.
- **Role management:** `assign_moderator`.

### Moderator

Moderator-only execute messages:

- `set_active_status`: the contract's circuit breaker. Pausing stops both deposits and withdrawals.
- `mark_corrupted_assets` and `unmark_corrupted_assets`: flag a backing denom as corrupted, or undo that flag. While a denom is corrupted: `join_pool` rejects deposits of it; `calc_*` and `exit_pool` requests that take it out remain valid (and are the mechanism by which the pool drains it); `is_active` continues to report `true` unless the moderator separately pauses the contract. Querying `get_corrupted_denoms` is the canonical way to surface this state to users before they sign.

The moderator role is assigned by the admin via `assign_moderator`; there is no offer-and-claim handshake on the moderator side.

## Repository references

- Contract: [`osmosis-labs/transmuter`](https://github.com/osmosis-labs/transmuter). The v3.2.0 tag is the deployed version on code id 996.
- SQS routing: [`router/usecase/pools/routable_cw_alloy_transmuter_pool.go`](https://github.com/osmosis-labs/sqs/blob/main/router/usecase/pools/routable_cw_alloy_transmuter_pool.go).
- Assetlist tagging: the `is_alloyed` flag in [`osmosis-1/osmosis.zone_assets.json`](https://github.com/osmosis-labs/assetlists/blob/main/osmosis-1/osmosis.zone_assets.json).
