---
title: Affiliate Fee Share
description: Earn a fee share on swaps you route to Osmosis, as an integrator or referrer.
sidebar_position: 8
---

# Affiliate Fee Share

If you send swap volume to Osmosis from your own app, aggregator, or frontend, you can take an affiliate fee on each swap. You build the swap surface; Osmosis provides the onchain pieces that let you take a cut.

There is no hosted embeddable widget to drop in. You construct and submit the swap yourself (from your UI, bot, or backend), and one of two onchain mechanisms carries the fee:

- The **`affiliate-swap` contract**, the self-contained path: send it a token, it takes your fee and swaps the rest through Osmosis pools. This is the one to use if you are building your own swap surface against Osmosis directly.
- The **Skip `swap_and_action` affiliates array**, if you already route swaps through the Skip entry point.

A note on why a contract is involved: the native poolmanager swap message (`MsgSwapExactAmountIn` / `MsgSwapExactAmountOut`) has **no** affiliate or fee field. You cannot attach a cut to a plain Osmosis swap. The `affiliate-swap` contract exists precisely to wrap a swap with a fee deduction, which is why it, rather than a raw swap message, is the integrator path.

## Which path applies

| You are... | Use | Fee is taken... |
| -- | -- | -- |
| Building your own swap surface against Osmosis pools (app, bot, backend) | `affiliate-swap` contract | From the input token, before the swap |
| Already routing swaps through the Skip entry point | Skip `affiliates` array | By Skip, per the entry point contract |

## The `affiliate-swap` contract

Osmosis has a deployed `affiliate-swap` CosmWasm contract (code id `149`). You send it one token, it takes your fee, and it swaps the remainder on your behalf through the poolmanager. The fee goes to any address you name.

### Execute message

The contract exposes a single `swap` execute message:

```json
{
  "swap": {
    "routes": [
      { "pool_id": "1", "token_out_denom": "uosmo" }
    ],
    "token_out_min_amount": { "denom": "uosmo", "amount": "950000" },
    "fee_percentage": "1.0",
    "fee_collector": "osmo1youraffiliateaddress..."
  }
}
```

- `routes`: the poolmanager swap route (`SwapAmountInRoute`: `pool_id` + `token_out_denom`), same routing you would pass to `MsgSwapExactAmountIn`.
- `token_out_min_amount`: your slippage-guarded minimum output. This is enforced on the swap of the post-fee amount.
- `fee_percentage`: your affiliate fee, as a percent (so `1.0` is 1%). Optional; omitting it means no fee.
- `fee_collector`: the address that receives the fee.

Send the input token as funds on the execute call. The contract:

1. Takes `fee_percentage` percent of the sent amount (clamped to at least `0` and at most the contract's configured maximum), and sends that fee to `fee_collector` in the **input denom**.
2. Swaps the remaining amount through `routes`, enforcing `token_out_min_amount`.
3. Returns the swapped output to you.

### Fee cap

The fee is capped. If you request more than the configured maximum, the contract silently uses the maximum instead of failing. Query the live cap before relying on a value:

```bash
# max_fee_percentage is returned as a percent, e.g. "1.5" means 1.5%
osmosisd query wasm contract-state smart <CONTRACT_ADDRESS> '{"get_max_fee_percentage":{}}'
```

The deployed maximum is `1.5` (1.5%) at the time of writing, with a hard ceiling of 10% built into the contract. Because the fee comes out of the input before the swap, a `1.0` fee on a `1000000` `uosmo` input sends `10000` `uosmo` to `fee_collector` and swaps `990000`.

### Worked example

You want to swap 1 OSMO to USDC through pool 1, taking a 1% referral fee to your own address:

1. Build the execute message above with `fee_percentage: "1.0"` and `fee_collector` set to your address.
2. Send `1000000uosmo` as funds on the execute.
3. Onchain, `10000uosmo` (1%) transfers to your address, and `990000uosmo` swaps to USDC with your `token_out_min_amount` enforced.
4. The USDC output returns to the sender.

## The Skip `affiliates` array

Swaps routed through the [Skip](https://skip.build/) entry point (code id `833`, the path Osmosis uses for inbound IBC swaps) carry affiliate fees in a `swap_and_action` message. The entry point deducts the fee as part of executing the action.

The affiliates field is an array; each entry is:

```json
{
  "basis_points_fee": "50",
  "address": "osmo1youraffiliateaddress..."
}
```

- `basis_points_fee`: your fee in basis points (so `50` is 0.5%).
- `address`: the address that receives the fee.

This sits inside the `swap_and_action` message alongside `user_swap`, `min_asset`, and `post_swap_action`:

```json
{
  "swap_and_action": {
    "user_swap": { "swap_exact_asset_in": { "swap_venue_name": "osmosis-poolmanager", "operations": [ ... ] } },
    "min_asset": { "native": { "denom": "uosmo", "amount": "950000" } },
    "timeout_timestamp": 0,
    "post_swap_action": { "transfer": { "to_address": "osmo1recipient..." } },
    "affiliates": [
      { "basis_points_fee": "50", "address": "osmo1youraffiliateaddress..." }
    ]
  }
}
```

The Osmosis frontend builds exactly this message for IBC-hook swaps and currently passes `affiliates: []` (no fee). If you route your own swaps through the Skip entry point, populate the array with your address and bps.

For the full Skip message shape, venue names, and the operations format, use the [Skip API documentation](https://docs.skip.build/). Osmosis only provides the deployed entry point; the message format is Skip's.

## Disclose the fee in your UI

The `affiliate-swap` contract deducts your fee silently: it does not surface anything to the user, because the swap runs from your own surface. Disclosing the fee is your responsibility. Before the user signs, show the fee amount and that it goes to you, so the quoted output and the fee are both clear. Users should never discover a cut only by comparing the received amount against the market rate.

For quoting, remember the fee is taken from the input before the swap, so quote the swap on the post-fee amount (`input * (1 - fee)`), not the gross input, or your displayed output will be too high.

## Deep-linking the Osmosis app

If instead of building your own surface you just want to hand users off to the Osmosis app with a pair pre-filled, the app reads the trading pair from URL query parameters:

```
https://app.osmosis.zone/?from=ATOM&to=OSMO
```

- `from`: the sell asset symbol (defaults to ATOM).
- `to`: the buy asset symbol (defaults to OSMO).

This sets the default pair only. It swaps on the Osmosis app, not your surface, so no affiliate fee is taken. To earn a fee you build the swap yourself using one of the mechanisms above.
