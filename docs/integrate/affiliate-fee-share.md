---
title: Affiliate Fee Share
description: Earn a fee share on swaps you route to Osmosis, as an integrator or referrer.
sidebar_position: 8
---

# Affiliate Fee Share

If you send swap volume to Osmosis from your own app, aggregator, or frontend, you can take an affiliate fee on each swap. There are two independent mechanisms, and which one you use depends on how the swap is routed:

- The **`affiliate-swap` contract**, for swaps you build and submit directly against Osmosis pools.
- The **Skip `swap_and_action` affiliates array**, for swaps routed through the Skip entry point (the path used for inbound IBC swaps).

They are not alternatives to configure on the same message: each belongs to a different swap path. This page covers both, with a worked example for each.

## Which path applies

| You are... | Use | Fee is taken... |
| -- | -- | -- |
| Building a poolmanager swap yourself (CosmWasm or a bot) and want a cut | `affiliate-swap` contract | From the input token, before the swap |
| Routing a swap through the Skip entry point (Skip API, inbound IBC) | Skip `affiliates` array | By Skip, per the entry point contract |

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

## Embedding the swap tool

There is no purpose-built embeddable swap widget with an affiliate parameter today. The swap tool on the Osmosis app does read the trading pair from URL query parameters, which lets you deep-link into a pre-filled swap:

```
https://app.osmosis.zone/?from=ATOM&to=OSMO
```

- `from`: the sell asset symbol (defaults to ATOM).
- `to`: the buy asset symbol (defaults to OSMO).

These set the default pair only. There is no query parameter to attach an affiliate address or fee to a deep link. To earn an affiliate fee you must build the swap yourself using one of the two mechanisms above.

## Summary

- To take a fee on a swap you build against Osmosis pools directly, call the `affiliate-swap` contract with a `fee_percentage` and `fee_collector`. The fee comes from the input token and is capped (currently 1.5%).
- To take a fee on a swap routed through the Skip entry point, populate the `affiliates` array in `swap_and_action` with your address and `basis_points_fee`.
- Deep links can pre-fill the swap pair but cannot carry an affiliate fee.
