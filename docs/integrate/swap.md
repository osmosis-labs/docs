---
title: Swap Integration
description: Get a quote, build the swap message from the route, and broadcast it.
sidebar_position: 3
---

# Swap Integration

This page walks through executing a swap on Osmosis end to end: get a routed quote from the Sidecar Query Server (SQS), turn that quote into a swap message, and broadcast it. It ties together the quote API (documented in full on the [SQS page](/integrate/endpoints/sqs)) and the chain's `poolmanager` swap messages.

The flow has three steps:

1. **Quote.** Ask SQS for the best route and expected output for your input.
2. **Build.** Construct a `MsgSwapExactAmountIn` from the quote's route, with a minimum-output guard derived from your slippage tolerance.
3. **Sign and broadcast.** Sign the transaction and submit it over RPC.

:::warning Exact-in vs exact-out
This page covers the canonical **exact-in** swap (you specify the input amount and get a minimum output). Osmosis also supports **exact-out** (`MsgSwapExactAmountOut`, you specify the output and a maximum input). The two are not interchangeable: do not invert an exact-in quote to fake an exact-out swap. For exact-out, request an exact-out quote from SQS and build `MsgSwapExactAmountOut` instead; see [Exact-out swaps](#exact-out-swaps) below for the worked example.
:::

## 1. Get a quote

Request an out-given-in quote from SQS. `tokenIn` is `<amount><denom>` and `tokenOutDenom` is the full base denom you want out (match the full `ibc/HASH`, never a stripped symbol):

```bash
curl "https://sqs.osmosis.zone/router/quote?tokenIn=1000000uosmo&tokenOutDenom=ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2"
```

The response contains the expected output, the route, and the realized fees and price impact:

```json
{
  "amount_in": { "denom": "uosmo", "amount": "1000000" },
  "amount_out": "27607",
  "route": [
    {
      "pools": [
        { "id": 1933, "token_out_denom": "ibc/498A0751...", "taker_fee": "0.008000000000000000" },
        { "id": 1282, "token_out_denom": "ibc/27394FB0...", "taker_fee": "0.008000000000000000" }
      ],
      "in_amount": "1000000",
      "out_amount": "27607"
    }
  ],
  "effective_fee": "0.015936000000000000",
  "price_impact": "0.070767626877084552",
  "in_base_out_quote_spot_price": "0.026200034512947721"
}
```

The fields you need to build the swap:

- `amount_in`: the input coin (echoes your request).
- `route[].pools[]`: the ordered hops. Each pool's `id` and `token_out_denom` map directly to the swap message's route.
- `amount_out`: the expected output. Use it with your slippage tolerance to set the minimum acceptable output.

`effective_fee` (combined spread factor + taker fee across the route) and `price_impact` are returned for display and decision-making; they are already reflected in `amount_out`. Each pool's `taker_fee` is read from chain state for that pool and can differ from (and exceed) the chain-wide default, so use the per-pool values and `effective_fee` from the quote rather than assuming a default. See the [SQS page](/integrate/endpoints/sqs#get-a-swap-quote) for the full parameter and field reference, including split routes (where `route` has more than one entry).

## 2. Build the swap message

Osmosis executes swaps through the `poolmanager` module. The exact-in message is `osmosis.poolmanager.v1beta1.MsgSwapExactAmountIn`:

```protobuf
message MsgSwapExactAmountIn {
  string sender = 1;
  repeated SwapAmountInRoute routes = 2; // { pool_id, token_out_denom }
  cosmos.base.v1beta1.Coin token_in = 3;
  string token_out_min_amount = 4;
}
```

Map the quote onto the message:

- `sender`: the address signing and paying.
- `routes`: one `SwapAmountInRoute { pool_id, token_out_denom }` per entry in `route[].pools[]`, in order. The quote's `pools[].id` is the `pool_id` and `pools[].token_out_denom` is the `token_out_denom`.
- `token_in`: the quote's `amount_in` (`{ denom, amount }`).
- `token_out_min_amount`: your slippage guard: `amount_out` reduced by your tolerance, computed in the output denom's base units. Do this with integer (`BigInt`) math, not floating point, because `amount_out` is an integer string that can exceed `Number.MAX_SAFE_INTEGER`. For a 1% tolerance, `amount_out * 99 / 100`.

:::danger Always set a real minimum
`token_out_min_amount` is the only onchain protection against the price moving between quote and execution. Never set it to `0` or `1`. Compute it from the quote's `amount_out` and an explicit slippage tolerance, in the output asset's base (minimal) denom. Read the output asset's exponent from its metadata; do not assume 6 decimals.
:::

Composing the message with [OsmoJS](/build/frontend/osmojs) (which ships the `poolmanager` message composers):

The example below handles the single-route case (one entry in `quote.route`). SQS can also return a **split route** (more than one entry), where each entry swaps a portion of the input through its own path; handle that separately (see below) rather than collapsing it into one message.

```ts
import { osmosis } from 'osmojs';

const { swapExactAmountIn } =
  osmosis.poolmanager.v1beta1.MessageComposer.withTypeUrl;

// This example assumes a single (non-split) route.
if (quote.route.length !== 1) {
  throw new Error('Split route: use MsgSplitRouteSwapExactAmountIn instead.');
}
const route = quote.route[0];

// Slippage guard in integer base units (BigInt, never Number/float):
// 1% tolerance -> keep 99/100 of the quoted output, rounded down.
const tokenOutMinAmount = (
  (BigInt(quote.amount_out) * 99n) / 100n
).toString();

const msg = swapExactAmountIn({
  sender: address,
  routes: route.pools.map((p) => ({
    poolId: BigInt(p.id),
    tokenOutDenom: p.token_out_denom,
  })),
  tokenIn: quote.amount_in,
  tokenOutMinAmount,
});
```

### Split routes

SQS often returns a **split route**: `quote.route` has more than one entry, and the input is divided across several paths to get a better overall price. Each entry carries its own `in_amount` (the portion of the total input routed through it). Do not collapse this into a single `MsgSwapExactAmountIn` with the total `amount_in`, it will not match the quote and can fail or mis-execute.

Use `osmosis.poolmanager.v1beta1.MsgSplitRouteSwapExactAmountIn` instead:

```protobuf
message MsgSplitRouteSwapExactAmountIn {
  string sender = 1;
  repeated SwapAmountInSplitRoute routes = 2; // each: { pools[], token_in_amount }
  string token_in_denom = 3;
  string token_out_min_amount = 4; // one overall minimum across all routes
}
```

Map the quote onto it: one `SwapAmountInSplitRoute` per entry in `quote.route`, where `pools` is that entry's hops and `token_in_amount` is its `in_amount`. The `token_in_denom` is the input denom, and `token_out_min_amount` is a single overall guard derived from the quote's total `amount_out` (the same integer-math reduction as above).

```ts
const { splitRouteSwapExactAmountIn } =
  osmosis.poolmanager.v1beta1.MessageComposer.withTypeUrl;

const tokenOutMinAmount = ((BigInt(quote.amount_out) * 99n) / 100n).toString();

const msg = splitRouteSwapExactAmountIn({
  sender: address,
  tokenInDenom: quote.amount_in.denom,
  tokenOutMinAmount,
  routes: quote.route.map((r) => ({
    tokenInAmount: r.in_amount,
    pools: r.pools.map((p) => ({
      poolId: BigInt(p.id),
      tokenOutDenom: p.token_out_denom,
    })),
  })),
});
```

A robust integration handles both shapes: branch on `quote.route.length` and build `MsgSwapExactAmountIn` for a single route or `MsgSplitRouteSwapExactAmountIn` for a split one.

## 3. Sign and broadcast

Sign the message and broadcast it over RPC like any Cosmos SDK transaction. With OsmoJS and a connected signer:

```ts
// The fee amount must cover gas_limit * gas_price, where gas_price is at or
// above the current dynamic base fee. The values below are illustrative: at a
// 0.03 uosmo base fee, 350000 gas needs at least 10500 uosmo (350000 * 0.03).
const fee = { amount: [{ denom: 'uosmo', amount: '10500' }], gas: '350000' };
const res = await client.signAndBroadcast(address, [msg], fee);
```

Estimate gas rather than hardcoding it for production, and size the fee against the live base fee at submission time: Osmosis runs a dynamic fee market, and a transaction whose gas price is below the current base fee is rejected (see [Fees and Gas](/integrate/fees)). Pay fees in any accepted fee token (see [Fee Abstraction](/learn/features/fee-abstraction)). For the lower-level signing and broadcasting flow over raw RPC, see [Interact with RPC endpoints](/integrate/endpoints/rpc).

## Exact-out swaps

When the fixed quantity is the **output** (for example, buying exactly 1 ION and paying whatever OSMO it takes), run the same three steps with the exact-out shapes: an in-given-out quote, `MsgSwapExactAmountOut`, and a **maximum-input** guard instead of a minimum-output one.

### Quote

Request an in-given-out quote: `tokenOut` is `<amount><denom>` of the desired output and `tokenInDenom` is the base denom you will pay with:

```bash
curl "https://sqs.osmosis.zone/router/quote?tokenOut=1000000uion&tokenInDenom=uosmo"
```

```json
{
  "amount_in": "544382386",
  "amount_out": { "denom": "uion", "amount": "1000000" },
  "route": [
    {
      "pools": [
        { "id": 2, "token_in_denom": "uosmo", "taker_fee": "0.002000000000000000" }
      ],
      "in_amount": "544382386",
      "out_amount": "1000000"
    }
  ],
  "effective_fee": "0.002000000000000000",
  "price_impact": "-0.013073061156192177",
  "in_base_out_quote_spot_price": "552.698797850585259960"
}
```

The shape mirrors the exact-in quote with the roles swapped: `amount_out` is the coin you asked for, `amount_in` is the required input as a string, and each pool in the route carries a `token_in_denom` instead of a `token_out_denom`.

### Build the message

The exact-out message is `osmosis.poolmanager.v1beta1.MsgSwapExactAmountOut`:

```protobuf
message MsgSwapExactAmountOut {
  string sender = 1;
  repeated SwapAmountOutRoute routes = 2; // { pool_id, token_in_denom }
  string token_in_max_amount = 3;
  cosmos.base.v1beta1.Coin token_out = 4;
}
```

Map the quote onto the message:

- `routes`: one `SwapAmountOutRoute { pool_id, token_in_denom }` per entry in `route[].pools[]`, **in reverse order**. SQS returns an exact-out route's pools ordered from the output token back toward the input token, while the chain executes the `routes` array from input toward output (each hop's output feeds the next hop's `token_in_denom`), so reverse a copy of the array when building the message. The first route after reversing must carry your input denom as its `token_in_denom`. A single-hop route is unaffected, but reverse unconditionally so multi-hop quotes do not fail onchain. The quote's `pools[].id` is the `pool_id` and `pools[].token_in_denom` is the `token_in_denom`.
- `token_out`: the quote's `amount_out` (`{ denom, amount }`).
- `token_in_max_amount`: your slippage guard, mirrored: the quote's `amount_in` **increased** by your tolerance, in the input denom's base units. As with exact-in, compute it with integer (`BigInt`) math, never floats, and round **up** (a ceiling), so the guard never lands below what the quote itself requires.

:::danger The guard caps the input, so round up
For exact-out the slippage guard is a maximum on what you pay, not a minimum on what you receive. Never set `token_in_max_amount` to a huge sentinel value; compute it from the quote's `amount_in` plus an explicit tolerance, with ceiling rounding. Setting it below the quoted `amount_in` guarantees the swap fails.
:::

```ts
import { osmosis } from 'osmojs';

const { swapExactAmountOut } =
  osmosis.poolmanager.v1beta1.MessageComposer.withTypeUrl;

// This example assumes a single (non-split) route.
if (quote.route.length !== 1) {
  throw new Error('Split route: use MsgSplitRouteSwapExactAmountOut instead.');
}
const route = quote.route[0];

// Slippage guard in integer base units (BigInt, never Number/float):
// 1% tolerance -> pay at most 101/100 of the quoted input, rounded up.
const tokenInMaxAmount = (
  (BigInt(quote.amount_in) * 101n + 99n) / 100n
).toString();

// SQS lists exact-out pools output-to-input; the chain executes
// input-to-output, so reverse a copy before mapping.
const msg = swapExactAmountOut({
  sender: address,
  routes: [...route.pools].reverse().map((p) => ({
    poolId: BigInt(p.id),
    tokenInDenom: p.token_in_denom,
  })),
  tokenOut: quote.amount_out,
  tokenInMaxAmount,
});
```

### Split routes

SQS returns split exact-out routes too (`quote.route` with more than one entry, each carrying its own `out_amount` portion of the total output). Use `osmosis.poolmanager.v1beta1.MsgSplitRouteSwapExactAmountOut` for those:

```protobuf
message MsgSplitRouteSwapExactAmountOut {
  string sender = 1;
  repeated SwapAmountOutSplitRoute routes = 2; // each: { pools[], token_out_amount }
  string token_out_denom = 3;
  string token_in_max_amount = 4; // one overall maximum across all routes
}
```

One `SwapAmountOutSplitRoute` per entry in `quote.route`, where `pools` is that entry's hops **reversed the same way as above** (every split route needs its own reversed copy) and `token_out_amount` is its `out_amount`. `token_out_denom` is the output denom and `token_in_max_amount` is a single overall cap derived from the quote's total `amount_in` (the same ceiling math as above). As with exact-in, branch on `quote.route.length` and never collapse a split quote into the single-route message.

Signing and broadcasting are identical to the exact-in flow above.

## Hazards checklist

- **Direction.** Exact-in and exact-out are distinct messages; pick the one matching the quote you requested.
- **Slippage.** Always set `token_out_min_amount` from the quote and an explicit tolerance.
- **Denoms.** Match the full base denom (`ibc/HASH` or `factory/...`), never the display symbol. Read exponents from metadata.
- **Route order.** For exact-in, preserve the pool order from the quote; the `token_out_denom` of each hop must chain into the next. For exact-out, reverse the quote's pool order (SQS lists those pools output-to-input, the chain executes input-to-output).
- **Fees.** `effective_fee` already accounts for spread factors and taker fees; the onchain swap applies them, so size `token_out_min_amount` against the quoted `amount_out`, not the spot price.
