---
title: Affiliate Fee Share
description: Earn a fee share on swaps you route to Osmosis, as an integrator or referrer.
sidebar_position: 8
---

# Affiliate Fee Share

If you send swap volume to Osmosis from your own app, aggregator, or frontend, you can take an affiliate fee on each swap. There is no Osmosis-native embeddable widget, but there are three supported paths, in increasing order of integration effort:

- The **Skip Go Widget**, a drop-in React or Web Component with built-in affiliate fee configuration. The fastest path if you want a ready-made swap surface.
- The **`affiliate-swap` contract**, the self-contained path if you build your own surface and swap directly against Osmosis pools: send it a token, it takes your fee and swaps the rest.
- The **Skip `swap_and_action` affiliates array**, if you build your own surface on Skip API routing.

A note on why a contract is always involved: the native poolmanager swap message (`MsgSwapExactAmountIn` / `MsgSwapExactAmountOut`) has **no** affiliate or fee field. You cannot attach a cut to a plain Osmosis swap, so every affiliate path wraps the swap in a contract that performs the fee deduction.

## Which path applies

| You are... | Use | Fee is taken... |
| -- | -- | -- |
| Embedding a ready-made swap UI in your app | Skip Go Widget | Per its `chainIdsToAffiliates` config |
| Building your own surface, swapping Osmosis pools directly | `affiliate-swap` contract | From the input token, before the swap |
| Building your own surface on Skip API routing | Skip `affiliates` array | From `min_asset`, in the output token |

## Drop-in: the Skip Go Widget

The [Skip Go Widget](https://docs.skip.build/go/widget/getting-started) (`@skip-go/widget`) is an embeddable swap component, available as a React component or a Web Component, with affiliate fees as a first-class config option:

```tsx
import { Widget } from "@skip-go/widget";

<Widget
  chainIdsToAffiliates={{
    "osmosis-1": {
      affiliates: [
        { basisPointsFee: "50", address: "osmo1youraffiliateaddress..." },
      ],
    },
  }}
/>;
```

- `basisPointsFee`: your fee in basis points (`50` is 0.5%).
- `address`: the fee recipient, which must be valid for that chain.
- The total `basisPointsFee` must be consistent across every chain you configure.

The widget handles quoting, fee inclusion, and message construction for you. See the [widget configuration reference](https://docs.skip.build/go/widget/configuration) for theming and the full option set. The rest of this page covers the two lower-level paths for integrators building their own surface.

## The `affiliate-swap` contract

Osmosis has a deployed `affiliate-swap` CosmWasm contract. You send it one token, it takes your fee, and it swaps the remainder on your behalf through the poolmanager. The fee goes to any address you name.

Use this instance:

```
osmo19n4w08zgxhc669cnjt47h5v8tyd6nel2jhy6pkgz7hthy3mu4umsrc298t
```

The code (id `149`) has several instances on mainnet, instantiated with different fee caps (`0`, `1.5`, and `10` percent are all live). An instance capped at `0` pays you nothing, so pin the address above and verify its cap (below) rather than picking any instance of the code id.

The contract wraps `MsgSwapExactAmountIn` only: **exact-in swaps**. There is no exact-out variant.

### Execute message

The contract exposes a single `swap` execute message. This example swaps ATOM to OSMO through pool 1 (an ATOM/OSMO pool):

```json
{
  "swap": {
    "routes": [
      {
        "pool_id": "1",
        "token_out_denom": "uosmo"
      }
    ],
    "token_out_min_amount": { "denom": "uosmo", "amount": "950000" },
    "fee_percentage": "1.0",
    "fee_collector": "osmo1youraffiliateaddress..."
  }
}
```

- `routes`: the poolmanager swap route (`SwapAmountInRoute`: `pool_id` + `token_out_denom`), same routing you would pass to `MsgSwapExactAmountIn`.
- `token_out_min_amount`: your slippage-guarded minimum output, enforced on the swap of the post-fee amount. Only the `amount` is enforced; the `denom` field is ignored by the deployed contract. Set it to the route's output denom anyway for readability.
- `fee_percentage`: your affiliate fee, as a percent (so `1.0` is 1%). Optional; omitting it means no fee. It must deserialize as an unsigned decimal: a negative value is rejected at parse time, not clamped to zero.
- `fee_collector`: the address that receives the fee. Must be a valid Osmosis address; the contract validates it and rejects the call otherwise.

Send the input token as funds on the execute call. The contract:

1. Takes `fee_percentage` percent of the sent amount and sends that fee to `fee_collector` in the **input denom**.
2. Swaps the remaining amount through `routes`, enforcing `token_out_min_amount.amount`.
3. Returns the swapped output to you.

### Fee cap

Each instance has its own maximum. If you request more than the instance's configured maximum, the contract silently uses the maximum instead of failing. Query the live cap on the instance you use:

```bash
# max_fee_percentage is returned as a percent, e.g. "1.5" means 1.5%
osmosisd query wasm contract-state smart osmo19n4w08zgxhc669cnjt47h5v8tyd6nel2jhy6pkgz7hthy3mu4umsrc298t '{"get_max_fee_percentage":{}}'
```

The instance above is capped at `1.5` (1.5%) at the time of writing; the contract code refuses to instantiate with a cap above 10%.

### Worked example

You want to swap 1 ATOM to OSMO through pool 1, taking a 1% referral fee to your own address. ATOM on Osmosis is `ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2` (6 decimals, so 1 ATOM = `1000000`):

1. Build the execute message above with `fee_percentage: "1.0"` and `fee_collector` set to your address.
2. Execute against the instance above, attaching `1000000` of the ATOM denom as funds.
3. Onchain, `10000` ATOM-denom (1%) transfers to your address, and the remaining `990000` swaps to OSMO with `token_out_min_amount.amount` enforced.
4. The OSMO output returns to the sender.

Because the fee comes out of the input before the swap, quote the swap on the post-fee amount (`input * (1 - fee)`), not the gross input, or your displayed output will be too high.

## The Skip `affiliates` array

Swaps built with the [Skip API](https://docs.skip.build/) execute through a Skip entry point contract and can carry affiliate fees. Two entry points exist on Osmosis:

- `osmo10a3k4hvk37cc4hnxctw4p95fhscd2z6h2rmx0aukc6rm8u9qqx9smfsh7u` (code id `1241`): the entry point Skip currently publishes for Osmosis. Messages generated by the Skip API or Widget target Skip's current contracts.
- `osmo1vkdakqqg5htq5c3wy2kj2geq536q665xdexrtjuwqckpads2c2nsvhhcyv` (code id `833`): an older entry point, still live; the Osmosis frontend builds its inbound IBC-hook swap memos against it (currently with `affiliates: []`, no fee).

If you use the Skip API, you do not pick the address yourself; the API generates messages against the right contract. The addresses matter only if you are hand-building or auditing messages. Skip's [contract address list](https://docs.skip.build/go/contracts/skip-go-contracts) is the authoritative source.

### The fee must be in the quote, not just the message

Populating `affiliates` on the message alone is not enough. Skip requires the fee at **quote time**: pass `cumulative_affiliate_fee_bps` (the total fee in bps across all your affiliates) in the route request, then supply the matching `affiliates` array (recipient addresses whose fees sum to that total) when generating messages. The entry point computes the fee from `min_asset`, in the **output** token, not from the input or the realized output. A message whose affiliates were not accounted for in the quote can misquote the user or fail an exact-in swap. See [Skip's affiliate fee documentation](https://docs.skip.build/go/general/affiliate-fees) for the API flow.

Each affiliate entry is:

```json
{
  "basis_points_fee": "50",
  "address": "osmo1youraffiliateaddress..."
}
```

- `basis_points_fee`: your fee in basis points (so `50` is 0.5%).
- `address`: the address that receives the fee.

In the executed `swap_and_action` message it sits alongside `user_swap`, `min_asset`, and `post_swap_action`. The `timeout_timestamp` is a Unix timestamp in **nanoseconds** and must be in the future; the entry point rejects anything at or before the current block time, so compute it at execution time (for example, now plus a few minutes). The value below is illustrative:

```json
{
  "swap_and_action": {
    "user_swap": {
      "swap_exact_asset_in": {
        "swap_venue_name": "osmosis-poolmanager",
        "operations": [
          {
            "pool": "1",
            "denom_in": "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2",
            "denom_out": "uosmo"
          }
        ]
      }
    },
    "min_asset": { "native": { "denom": "uosmo", "amount": "950000" } },
    "timeout_timestamp": 1798761600000000000,
    "post_swap_action": { "transfer": { "to_address": "osmo1recipient..." } },
    "affiliates": [
      { "basis_points_fee": "50", "address": "osmo1youraffiliateaddress..." }
    ]
  }
}
```

For the full message shape and venue names, use the [Skip API documentation](https://docs.skip.build/). The message format is Skip's; Osmosis hosts the deployed entry points.

## Disclose the fee in your UI

The `affiliate-swap` contract deducts your fee silently: it does not surface anything to the user, because the swap runs from your own surface. Disclosing the fee is your responsibility. Before the user signs, show the fee amount and that it goes to you, so the quoted output and the fee are both clear. Users should never discover a cut only by comparing the received amount against the market rate. The same applies to fees you configure on the Skip paths.

## Deep-linking the Osmosis app

If instead of building your own surface you just want to hand users off to the Osmosis app with a pair pre-filled, the app reads the trading pair from URL query parameters:

```
https://app.osmosis.zone/?from=ATOM&to=OSMO
```

- `from`: the sell asset (defaults to ATOM).
- `to`: the buy asset (defaults to OSMO).

Both accept an asset symbol or a minimal denom. Symbols are ambiguous where multiple bridged variants of an asset exist, so prefer minimal denoms (`uosmo`, or the full `ibc/HASH` for IBC assets) for links you generate programmatically; the symbol form is fine for hand-written links to majors like ATOM and OSMO.

This sets the default pair only. It swaps on the Osmosis app, not your surface, so no affiliate fee is taken. To earn a fee you use one of the mechanisms above.
