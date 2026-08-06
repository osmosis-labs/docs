---
description: Place, cancel, claim, and track limit orders on the Osmosis onchain orderbook as a bot operator or dapp.
sidebar_position: 16
---

# Orderbook Integration

Osmosis limit orders live in CosmWasm orderbook contracts that are registered as `x/cosmwasmpool` pools, so the same books that hold resting limit orders also serve market flow routed through the poolmanager. Each market is its own contract instance pairing exactly one base denom against one quote denom, and for every pair SQS designates a single canonical book that routing and the frontend use.

This page covers the integration surface for a bot operator or dapp working with limit orders directly: discovering the canonical book for a pair, placing and cancelling orders, claiming fills, and tracking open orders. For a conceptual introduction see [Limit Orders](/learn/features/orderbook) in the Learn section; for pool mechanics, tick math, market creation, routing internals, and the admin/moderator surface, see the [orderbook module page](/build/chain/pool-manager/cosmwasmpool/orderbook).

Everything below is written against the deployed contract: the canonical orderbooks run code id `885`, which carries cw2 info `crates.io:sumtree-orderbook` version `2.0.0`. Message shapes are taken from [`msg.rs`](https://github.com/osmosis-labs/orderbook/blob/main/contracts/sumtree-orderbook/src/msg.rs) at that version.

## Discovering the canonical orderbook

Do not hardcode contract addresses. SQS tracks which book is canonical for each pair and exposes it directly:

```bash
# Every canonical orderbook
curl -s "https://sqs.osmosis.zone/pools/canonical-orderbooks" | jq .

# One pair (OSMO/USDC)
curl -s "https://sqs.osmosis.zone/pools/canonical-orderbook?base=uosmo&quote=ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4" | jq .
```

```json
{
  "base": "uosmo",
  "quote": "ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4",
  "pool_id": 1933,
  "contract_address": "osmo1twq36c866tdjhp4jgsayr0un5rn7adv4xwm0e7qs78te65pmynqqzwulk4"
}
```

The `base` and `quote` fields are the chain denoms the contract was instantiated with; you can confirm them against the contract itself with the `denoms` smart query (`{ "denoms": {} }` returns `{ "quote_denom", "base_denom" }`). Both endpoints are documented with the rest of the SQS surface under [Canonical orderbook lookup](/integrate/endpoints/sqs#canonical-orderbook-lookup).

All examples below use the OSMO/USDC book at `osmo1twq36c866tdjhp4jgsayr0un5rn7adv4xwm0e7qs78te65pmynqqzwulk4` (pool `1933`).

## Placing an order

Limit orders are placed with the `place_limit` execute message:

```bash
osmosisd tx wasm execute osmo1twq36c866tdjhp4jgsayr0un5rn7adv4xwm0e7qs78te65pmynqqzwulk4 '{
  "place_limit": {
    "tick_id": -3600000,
    "order_direction": "bid",
    "quantity": "5000000",
    "claim_bounty": "0.0001"
  }
}' --amount "5000000ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4" \
   --from <KEY> --gas auto --gas-adjustment 1.3 --gas-prices 0.05uosmo
```

Field by field:

- `tick_id` (signed integer): the price tick the order rests at. Ticks follow the same geometric spec as concentrated liquidity, with valid values from `-108000000` to `182402823`; the price for a tick is derived by the tick math covered on the [module page](/build/chain/pool-manager/cosmwasmpool/orderbook). Tick `0` is price 1 in minimal-denom terms, so the example above (`-3600000`) rests a bid below 1 base-unit of quote per base-unit of base.
- `order_direction`: `"bid"` or `"ask"`. A bid deposits the quote denom and buys the base; an ask deposits the base denom and sells into the quote. Direction is defined relative to the contract's own `base_denom`/`quote_denom`, not to how your application labels the pair.
- `quantity` (integer string): the exact amount deposited up front, in minimal units of the deposit denom (quote for bids, base for asks). The funds attached to the transaction must match this amount and denom exactly.
- `claim_bounty` (optional decimal string): the fraction of each claim payout the order owner is willing to pay whoever executes the claim. The contract enforces `0 <= claim_bounty <= 0.01` (a 1% hard cap, rejected with `InvalidClaimBounty` otherwise) and the value is fixed at placement; it cannot be changed later. The Osmosis frontend sets `0.0001` (0.01%) on every limit order it places. Omitting it means no third party has an incentive to claim for you.

The execution response includes the assigned `order_id`, which you need (together with the `tick_id`) for cancels and claims. Gas prices are dynamic on Osmosis; query the current base fee via the [fee market](/learn/features/fee-market) rather than reusing the illustrative value above.

## Cancelling an order

```bash
osmosisd tx wasm execute osmo1twq36c866tdjhp4jgsayr0un5rn7adv4xwm0e7qs78te65pmynqqzwulk4 '{
  "cancel_limit": {
    "tick_id": -3600000,
    "order_id": 42
  }
}' --from <KEY>
```

Only the order owner can cancel (`Unauthorized` otherwise), and cancellation is all-or-nothing: if any portion of the order has been filled the contract rejects with `CancelFilledOrder`. To exit a partially filled order, claim the filled portion first (which resets the order to just its unfilled remainder), then cancel the rest.

## Claiming filled orders

Fills are not pushed to the order owner. When market flow crosses a resting order, the contract records the fill; the proceeds sit in the contract until someone claims the order. There are two claim messages:

```json
{ "claim_limit": { "tick_id": -3600000, "order_id": 42 } }
```

```json
{ "batch_claim": { "orders": [[-3600000, 42], [-3599000, 43]] } }
```

Both are permissionless: any address can claim any order's fills at any time, and neither message accepts funds. What happens on a claim, per the deployed implementation in [`order.rs`](https://github.com/osmosis-labs/orderbook/blob/main/contracts/sumtree-orderbook/src/order.rs):

- The filled portion (which may be partial) is converted at the order's tick price into the opposite denom: bids are paid out in the base denom, asks in the quote denom.
- If the order was placed with a `claim_bounty`, that fraction of the payout goes to the transaction sender, whoever they are. This is the incentive that lets order owners outsource claiming.
- If the book has a nonzero maker fee, it is deducted next (see [Maker fee](#maker-fee) below).
- The remainder always goes to the order owner, regardless of who sent the claim.
- A claim with nothing newly filled is rejected with `ZeroClaim`. After a partial claim the order continues resting with its remaining quantity.

`batch_claim` accepts up to 100 `[tick_id, order_id]` pairs per call and fails silently per order: invalid or zero-fill entries are skipped so the valid claims in the batch still process. This makes it safe for a bot to submit slightly stale batches.

### The claimbot

[`osmosis-labs/orderbook-claimbot`](https://github.com/osmosis-labs/orderbook-claimbot) is the reference implementation of a third-party claimer. It runs a scanner per orderbook that reads the book's tick cursors (`next_bid_tick`, `next_ask_tick` from the `orderbook_state` query), identifies fully crossed ticks (bid ticks above `next_bid_tick`, ask ticks below `next_ask_tick`), pushes their orders onto a queue, and a claimer drains the queue with `batch_claim` transactions of up to 100 orders, earning whatever bounties those orders carry. If you place orders with a bounty, this is the machinery that turns them into hands-off fills; if you run your own bot, it is the architecture to copy.

Bounty economics are per-claim: the bounty rate applies to each claim's payout, so claiming an order in many small increments yields the same total bounty as one claim at full fill (modulo rounding down on each claim).

## Tracking orders

Two options, depending on whether you want aggregated or per-contract state:

- **SQS passthrough**: `GET /passthrough/active-orders?userOsmoAddress=<address>` returns an address's open limit orders across all canonical orderbooks in one call, including a `is_best_effort` flag when some books could not be reached. See [Active limit orders](/integrate/endpoints/sqs#active-limit-orders) for the response shape.
- **Contract query**: each book exposes `orders_by_owner` directly:

```json
{
  "orders_by_owner": {
    "owner": "osmo1...",
    "start_from": null,
    "end_at": null,
    "limit": 100
  }
}
```

`start_from` (exclusive) and `end_at` (inclusive) are `[tick_id, order_id]` pairs for pagination; `limit` defaults to 100. The response is `{ "orders": [...], "count": n }` where `count` is the number of orders returned. The related `orders_by_tick`, `orderbook_state`, `ticks_by_id`, and `all_ticks` queries (useful for building your own claim scanner or book view) are covered on the [module page](/build/chain/pool-manager/cosmwasmpool/orderbook#querying-state).

## Maker fee

The contract supports a maker fee, deducted from claim payouts and sent to a configured recipient. On the deployed canonical books it is currently zero:

```bash
osmosisd query wasm contract-state smart osmo1twq36c866tdjhp4jgsayr0un5rn7adv4xwm0e7qs78te65pmynqqzwulk4 '{ "get_maker_fee": {} }'
# data: "0"
```

Because the fee is an admin-settable parameter (the admin is the Osmosis governance module account), read it at claim-accounting time with `get_maker_fee` rather than assuming zero in code that reconciles payouts.

## Hazards

- **Tick bounds.** `tick_id` must be within `[-108000000, 182402823]` (`InvalidTickId` otherwise). Compute ticks from the contract's tick math, not from display prices.
- **Limit orders never execute immediately.** `place_limit` only rests the order and updates the book's tick cursors; it does not match against the opposite side even at a crossing price. An aggressively priced limit order just sits there until market flow (swaps routed through the pool) reaches its tick. For immediate execution, submit a swap against the pool id via the poolmanager instead of a limit message.
- **Direction is contract-relative.** `"bid"` and `"ask"` are defined against the contract's `base_denom`/`quote_denom`. If your application displays the pair inverted relative to the contract, a naive mapping silently places orders on the wrong side. Always confirm with the `denoms` query.
- **Quantities are minimal units.** `quantity` and the attached funds are in minimal denom units. Read each asset's decimals from [token metadata](/integrate/endpoints/sqs#token-metadata) or the assetlist; do not assume 6.
- **Funds must match exactly.** The attached coin must equal `quantity` in the deposit denom for the order's side. IBC and tokenfactory denoms must be passed in full (`ibc/HASH`, `factory/...`), not as symbols.
- **Claim bounty is immutable.** The bounty is fixed when the order is placed. An order placed without one will sit unclaimed unless the owner claims it themselves.
- **Partial fills cannot be cancelled directly.** Claim first, then cancel the remainder.
- **Zero-claim and dust.** Claiming an order with no new fills errors with `ZeroClaim` in `claim_limit`; inside `batch_claim` such entries are skipped silently, so do not rely on batch results to detect state.
