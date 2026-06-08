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
This page covers the canonical **exact-in** swap (you specify the input amount and get a minimum output). Osmosis also supports **exact-out** (`MsgSwapExactAmountOut`, you specify the output and a maximum input). The two are not interchangeable: do not invert an exact-in quote to fake an exact-out swap. For exact-out, request an exact-out quote from SQS and build `MsgSwapExactAmountOut` instead.
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

`effective_fee` (combined spread factor + taker fee) and `price_impact` are returned for display and decision-making; they are already reflected in `amount_out`. See the [SQS page](/integrate/endpoints/sqs#get-a-swap-quote) for the full parameter and field reference, including split routes (where `route` has more than one entry).

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
- `token_out_min_amount`: your slippage guard: `amount_out` reduced by your tolerance, computed in the output denom's base units. For a 1% tolerance, `floor(amount_out * 0.99)`.

:::danger Always set a real minimum
`token_out_min_amount` is the only onchain protection against the price moving between quote and execution. Never set it to `0` or `1`. Compute it from the quote's `amount_out` and an explicit slippage tolerance, in the output asset's base (minimal) denom. Read the output asset's exponent from its metadata; do not assume 6 decimals.
:::

Composing the message with [OsmoJS](/build/frontend/osmojs) (which ships the `poolmanager` message composers):

```ts
import { osmosis } from 'osmojs';

const { swapExactAmountIn } =
  osmosis.poolmanager.v1beta1.MessageComposer.withTypeUrl;

const slippage = 0.01; // 1%
const tokenOutMinAmount = Math.floor(
  Number(quote.amount_out) * (1 - slippage)
).toString();

const msg = swapExactAmountIn({
  sender: address,
  routes: quote.route[0].pools.map((p) => ({
    poolId: BigInt(p.id),
    tokenOutDenom: p.token_out_denom,
  })),
  tokenIn: quote.amount_in,
  tokenOutMinAmount,
});
```

For a split route (more than one entry in `quote.route`), each entry is a separate swap of a portion of the input; use `MsgSplitRouteSwapExactAmountIn` instead, which takes a list of routes each with its own `token_in_amount`.

## 3. Sign and broadcast

Sign the message and broadcast it over RPC like any Cosmos SDK transaction. With OsmoJS and a connected signer:

```ts
const fee = { amount: [{ denom: 'uosmo', amount: '5000' }], gas: '350000' };
const res = await client.signAndBroadcast(address, [msg], fee);
```

Estimate gas rather than hardcoding it for production, and pay fees in any accepted fee token (see [Fee Abstraction](/learn/features/fee-abstraction)). For the lower-level signing and broadcasting flow over raw RPC, see [Interact with RPC endpoints](/integrate/endpoints/rpc).

## Hazards checklist

- **Direction.** Exact-in and exact-out are distinct messages; pick the one matching the quote you requested.
- **Slippage.** Always set `token_out_min_amount` from the quote and an explicit tolerance.
- **Denoms.** Match the full base denom (`ibc/HASH` or `factory/...`), never the display symbol. Read exponents from metadata.
- **Route order.** Preserve the pool order from the quote; the `token_out_denom` of each hop must chain into the next.
- **Fees.** `effective_fee` already accounts for spread factors and taker fees; the onchain swap applies them, so size `token_out_min_amount` against the quoted `amount_out`, not the spot price.
