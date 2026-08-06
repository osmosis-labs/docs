---
description: Integrate against concentrated liquidity pools and positions.
title: Concentrated Liquidity Integration
sidebar_position: 5
---

# Concentrated Liquidity Integration

Concentrated liquidity (CL) pools let liquidity providers deposit capital into a chosen price range instead of across the whole price curve. A deposit into a range is a **position**: it has its own ID, its own tick bounds, and its own accrued fees and incentives. Positions in the same pool are independent objects, even when they share an owner or a range.

This page covers the integrator surface: discovering CL pools and reading their state, the full position lifecycle with current message shapes, creating a pool, and how incentives accrue and are forfeited. For a conceptual introduction, see [Concentrated Liquidity](/learn/features/concentrated-liquidity) in the Learn section. For module internals (the tick math, accumulator design, swap-step derivations, and precision handling), see the [Concentrated Liquidity module page](/build/chain/pool-manager/concentrated-liquidity) under Build; this page does not duplicate it.

CL pools participate in the chain's routing graph like any other pool type: swaps against them go through the `poolmanager` module and are quoted by the Sidecar Query Server (SQS). If you only want to swap through CL pools, you do not need anything on this page; follow [Swap Integration](/integrate/swap).

## Discovering pools and reading data

### SQS

SQS serves hydrated pool state and is the right source for anything latency-sensitive. Two endpoints matter for CL:

`GET /pools` with `filter[type]=2` returns every concentrated pool (pool type `2` is `Concentrated` in the `poolmanager` pool-type enum; `0` is Balancer, `1` is Stableswap, `3` is CosmWasm):

```bash
curl "https://sqs.osmosis.zone/pools?filter[type]=2"
```

Each entry's `chain_model` carries the CL-specific fields: `token0`, `token1`, `current_tick`, `current_sqrt_price`, `tick_spacing`, `exponent_at_price_one`, and `spread_factor`. Filters compose with `filter[id]`, `filter[denom]`, and `filter[min_liquidity_cap]`; see the [SQS page](/integrate/endpoints/sqs) for the full parameter reference.

`GET /pools/ticks/{id}` returns the full tick model for one concentrated pool: every initialized tick range with its liquidity, plus the current tick index. This is the endpoint to build liquidity-depth charts or simulate swaps offchain:

```bash
curl "https://sqs.osmosis.zone/pools/ticks/1066"
```

### LCD query surface

The module's gRPC/REST queries live under `/osmosis/concentratedliquidity/v1beta1/`. The ones an integrator typically needs:

| Query | Path | Returns |
| --- | --- | --- |
| Pools | `/pools` | All CL pools (paginated). |
| Params | `/params` | Module parameters (authorized tick spacings, spread factors, uptimes). |
| UserPositions | `/positions/{address}` | All positions owned by an address, optionally filtered by `pool_id`. |
| PositionById | `/position_by_id?position_id=` | One position with its asset breakdown and claimable rewards. |
| LiquidityPerTickRange | `/liquidity_per_tick_range?pool_id=` | Liquidity in every initialized tick range of a pool. |
| LiquidityNetInDirection | `/liquidity_net_in_direction` | Net liquidity by tick in a swap direction, bounded or unbounded. |
| ClaimableSpreadRewards | `/claimable_spread_rewards?position_id=` | Spread rewards claimable by a position. |
| ClaimableIncentives | `/claimable_incentives?position_id=` | Incentives claimable now, and what would be forfeited if claimed now. |
| IncentiveRecords | `/incentive_records?pool_id=` | Active incentive records on a pool. |
| UserUnbondingPositions | `/user_unbonding_positions/{address}` | Positions currently unbonding from a lock. |
| CFMMPoolIdLinkFromConcentratedPoolId | `/cfmm_pool_id_link_from_concentrated/{concentrated_pool_id}` | The governance-linked classic pool, if one exists. |

Example:

```bash
curl "https://lcd.osmosis.zone/osmosis/concentratedliquidity/v1beta1/positions/osmo1...?pool_id=1464"
```

The spot price of a CL pool is served by the `poolmanager` module, same as for every other pool type:

```bash
curl "https://lcd.osmosis.zone/osmosis/poolmanager/pools/1464/prices?base_asset_denom=uosmo&quote_asset_denom=ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4"
```

The returned `spot_price` is quoted in base units of each denom. Scale it by the difference in the two assets' exponents (from asset metadata) before displaying it; never assume 6 decimals.

## Position lifecycle

Six messages make up the position lifecycle. All examples below use proto-JSON; field names are verified against the module's `tx.proto` at the deployed version. The examples use pool `1464` (`uosmo` / USDC, tick spacing 100).

### Create a position

`MsgCreatePosition` opens a position between `lower_tick` and `upper_tick` in a pool. Both ticks must be multiples of the pool's tick spacing. `tokens_provided` holds one coin for a single-sided position (a range entirely above or below the current price) or two coins for a range that straddles the current tick. Coins in the list must be sorted by denom, as in any `sdk.Coins` field.

```json
{
  "@type": "/osmosis.concentratedliquidity.v1beta1.MsgCreatePosition",
  "pool_id": "1464",
  "sender": "osmo1...",
  "lower_tick": "-17000000",
  "upper_tick": "-15000000",
  "tokens_provided": [
    { "denom": "ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4", "amount": "1500000" },
    { "denom": "uosmo", "amount": "50000000" }
  ],
  "token_min_amount0": "47500000",
  "token_min_amount1": "1300000"
}
```

Because liquidity must be proportional to the pool's reserves at the current price, the amounts actually used can be less than `tokens_provided`. `token_min_amount0` and `token_min_amount1` are the slippage guards: the transaction fails if the used amounts fall below them. They index the pool's `token0` and `token1` (here `uosmo` and USDC respectively), not the order of `tokens_provided`. Set them from the current pool state and an explicit tolerance; do not pass `0` in production.

The response reports what was actually used:

```json
{
  "position_id": "12345678",
  "amount0": "49850000",
  "amount1": "1406000",
  "liquidity_created": "1093950289.451923094521861493",
  "lower_tick": "-17000000",
  "upper_tick": "-15000000"
}
```

`amount0`/`amount1` are the deposited amounts; the difference from `tokens_provided` stays in the sender's balance. The response echoes `lower_tick` and `upper_tick` because multiple ticks can represent the same price, and the chain may move the provided ticks to the canonical tick for that price. Store the response values, not the ones you sent.

### Add to a position

`MsgAddToPosition` adds `amount0` and `amount1` (of the pool's `token0` and `token1`) to an existing position:

```json
{
  "@type": "/osmosis.concentratedliquidity.v1beta1.MsgAddToPosition",
  "position_id": "12345678",
  "sender": "osmo1...",
  "amount0": "25000000",
  "amount1": "700000",
  "token_min_amount0": "23750000",
  "token_min_amount1": "630000"
}
```

Under the hood the chain deletes the old position and creates a new one with the combined liquidity, preserving the original join time. **The response contains a new `position_id`**, along with the `amount0`/`amount1` actually added. Update any stored position references; the old ID no longer exists. The min amounts guard only the liquidity being added, not the position's total.

### Withdraw a position

`MsgWithdrawPosition` removes liquidity, partially or in full. `liquidity_amount` is a decimal string denominated in the position's liquidity units (the `liquidity` field returned by `PositionById` or `UserPositions`), not in either token:

```json
{
  "@type": "/osmosis.concentratedliquidity.v1beta1.MsgWithdrawPosition",
  "position_id": "12345678",
  "sender": "osmo1...",
  "liquidity_amount": "1093950289.451923094521861493"
}
```

The response returns `amount0` and `amount1` withdrawn. Withdrawing more than the position's liquidity fails. Any withdrawal also claims the position's incentives, forfeiting those that have not met their uptime requirement (see [Incentives](#incentives-and-uptime) below). Withdrawing the full liquidity amount additionally collects outstanding spread rewards and deletes the position from state.

### Collect spread rewards

Spread rewards (the swap fees paid by traders, accrued while the price is inside the position's range) are claimed explicitly. `MsgCollectSpreadRewards` batches any number of positions belonging to one owner:

```json
{
  "@type": "/osmosis.concentratedliquidity.v1beta1.MsgCollectSpreadRewards",
  "position_ids": ["12345678", "12345679"],
  "sender": "osmo1..."
}
```

The response's `collected_spread_rewards` lists the coins sent to the sender. Check what is pending first with the `ClaimableSpreadRewards` query.

### Collect incentives

`MsgCollectIncentives` claims accrued liquidity-mining incentives for one or more positions:

```json
{
  "@type": "/osmosis.concentratedliquidity.v1beta1.MsgCollectIncentives",
  "position_ids": ["12345678"],
  "sender": "osmo1..."
}
```

The response has two coin lists: `collected_incentives` (sent to the sender) and `forfeited_incentives` (accrued but not yet matured past their uptime requirement, and therefore given up by claiming now). The `ClaimableIncentives` query returns the same split without executing, so you can show users what an early claim would cost.

### Transfer positions

`MsgTransferPositions` moves ownership of one or more positions to another address:

```json
{
  "@type": "/osmosis.concentratedliquidity.v1beta1.MsgTransferPositions",
  "position_ids": ["12345678"],
  "sender": "osmo1...",
  "new_owner": "osmo1..."
}
```

The sender must own every listed position. The response is empty; after transfer the positions appear under the new owner's `UserPositions`.

## Creating a pool

Concentrated pool creation is permissionless (`is_permissionless_pool_creation_enabled` is `true` in the module params). The message lives in its own proto package, separate from the position messages:

```json
{
  "@type": "/osmosis.concentratedliquidity.poolmodel.concentrated.v1beta1.MsgCreateConcentratedPool",
  "sender": "osmo1...",
  "denom0": "uosmo",
  "denom1": "ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4",
  "tick_spacing": "100",
  "spread_factor": "0.001000000000000000"
}
```

The response returns the new `pool_id`. Two module parameters constrain the configuration (query them live at `/osmosis/concentratedliquidity/v1beta1/params`):

- `authorized_tick_spacing`: `1`, `10`, `100`, `1000`. Smaller spacing allows finer price granularity at the cost of more tick state.
- `authorized_spread_factors`: `0`, `0.0001`, `0.0005`, `0.001`, `0.002`, `0.003`, `0.005`, `0.01`, `0.025`.

Values outside these lists are rejected (governance-created pools and a whitelist of unrestricted creators bypass the lists). Creation also charges the `poolmanager` module's `pool_creation_fee`, currently 20 USDC (`20000000` of the USDC base denom), which is deposited into the community pool. A freshly created pool has no liquidity and no spot price until the first `MsgCreatePosition` lands on it.

## Swapping against CL pools

There is nothing CL-specific to implement for swaps. CL pools are routed by the `poolmanager` module and quoted by SQS alongside every other pool type; a route hop through a CL pool looks identical to any other hop in the quote response and in `MsgSwapExactAmountIn`. Follow [Swap Integration](/integrate/swap) end to end. If you are simulating CL swaps yourself instead of using SQS quotes, take tick data from `GET /pools/ticks/{id}` and the swap math from the [module spec](/build/chain/pool-manager/concentrated-liquidity#calculating-swap-amounts).

## Incentives and uptime

CL incentives are uptime-based: a position qualifies for an incentive record only after its liquidity has been in the pool for the record's minimum uptime. The authorized uptimes on mainnet are `1ns`, `1m`, `1h`, and `24h` (live values in module params as `0.000000001s`, `60s`, `3600s`, `86400s`). The `1ns` tier behaves like an unconditional incentive; the longer tiers reward liquidity that stays.

Incentives that have accrued to a position but not yet matured past their uptime are **forfeited** if the position claims early, and every withdrawal (partial or full) triggers a claim. Forfeited amounts are redistributed to the remaining qualifying liquidity in the pool (or returned to the sender when no other active liquidity exists). Surface the `ClaimableIncentives` split (`claimable_incentives` vs `forfeited_incentives`) before users withdraw or claim.

Incentive creation is funneled through the `x/incentives` gauge system rather than the CL module directly. For gauge setup and the accumulator math, see the [module spec's incentive section](/build/chain/pool-manager/concentrated-liquidity#incentive-creation-and-querying).

## Integration hazards

- **Ticks are not prices.** Osmosis uses geometric tick spacing with additive ranges, not the uniform `1.0001^t` mapping. Convert with the formulas in the [module spec's tick section](/build/chain/pool-manager/concentrated-liquidity#ticks), and remember the tick-to-price mapping is in **base units**: rescale by the assets' exponents from metadata before showing a human price. The full range is `MinInitializedTick = -108000000` to `MaxTick = 342000000`.
- **Position IDs identify positions, not owners.** IDs are globally monotonic across all pools and owners. One address can hold many positions in the same pool and range; aggregate per owner via `UserPositions`, never by assuming one position per user.
- **`MsgAddToPosition` changes the position ID.** Treat the returned ID as a new object and update stored references atomically.
- **Decimals come from asset metadata.** `amount0`/`amount1`, spot prices, and tick math all operate in base denoms. Read each asset's exponent from its metadata; never assume 6.
- **Amounts used can differ from amounts sent.** Reconcile balances against the response's `amount0`/`amount1`, not against `tokens_provided`, and always set real `token_min_amount0`/`token_min_amount1` guards.
- **A CL pool can have zero liquidity.** Before the first position, and after the last one is withdrawn, the pool has no valid spot price and cannot be swapped against. Handle spot-price query failures for freshly created or drained pools.
