---
title: Fees and Gas
description: Set transaction fees, estimate gas, and pay in alternative fee tokens.
sidebar_position: 7
---

# Fees and Gas

When you submit a transaction to Osmosis you pay a **gas fee** to get it included in a block. This is separate from the **swap fees** (spread factor + taker fee) that a trade pays to LPs and the protocol, which are already accounted for in a [swap quote](/integrate/swap). This page covers the gas side: the dynamic base fee, estimating gas, and paying fees in tokens other than OSMO.

## The dynamic base fee

Osmosis uses an [EIP-1559 style fee market](/learn/features/fee-market): the minimum gas price adjusts with network congestion rather than being a fixed constant. A transaction whose gas price is below the current base fee is rejected for insufficient fee.

Query the current base fee before setting your gas price:

```bash
osmosisd query txfees base-fee
# or over REST:
curl "https://lcd.osmosis.zone/osmosis/txfees/v1beta1/cur_eip_base_fee"
```

```json
{ "base_fee": "0.030000000000000000" }
```

Set your `--gas-prices` at or above this value (in `uosmo`, or an accepted alternative denom, see below). Because the base fee moves, read it at submission time rather than hardcoding it. Older docs and examples that use `0.0025uosmo` predate the dynamic fee market and will be rejected.

## Estimating gas

Set the gas **limit** from a simulation rather than a fixed number. With `osmosisd`:

```bash
osmosisd tx ... --gas auto --gas-adjustment 1.3 --gas-prices 0.03uosmo
```

`--gas auto` simulates the transaction to estimate the gas used, and `--gas-adjustment` pads that estimate (swaps and multi-hop routes vary, so a 1.2-1.5 pad is typical). Client libraries expose the same simulate-then-pad flow; prefer it over a hardcoded limit, which either wastes fees or risks an out-of-gas failure on a larger route.

The total fee paid is `gas_limit * gas_price`.

## Paying fees in other tokens

Thanks to [fee abstraction](/learn/features/fee-abstraction), gas does not have to be paid in OSMO. Validators accept a permissionless, governance-managed whitelist of fee tokens, so a transaction can pay gas in many of the assets listed on Osmosis. Accepted non-OSMO fees are converted back to OSMO before distribution to stakers.

To pay in an alternative token, set `--gas-prices` (or `--fees`) in that token's denom, for example `--gas-prices 0.025ibc/<hash>`. The accepted set and each token's minimum price are onchain; query them rather than assuming a token is accepted.

## Swap fees are not gas

Keep the two separate when integrating a swap:

- **Gas fee:** paid to include the transaction, sized as above (`gas_limit * gas_price`).
- **Spread factor + taker fee:** charged by the swap itself, already reflected in a quote's `amount_out` and surfaced as `effective_fee`. See [Swap Integration](/integrate/swap) and [The OSMO Token](/learn/osmo#taker-fees).

Do not double-count: size your `token_out_min_amount` against the quote's `amount_out` (which already has swap fees applied), and budget gas separately.
