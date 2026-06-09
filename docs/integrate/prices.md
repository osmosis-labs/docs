---
title: Prices and Oracles
description: How to get a USD or spot price for an asset, and when to use each source.
sidebar_position: 6
---

# Prices and Oracles

There is no single "price of an asset" on Osmosis; which price source to use depends on what you need it for. This page covers the options, when each is appropriate, and the decimal handling that applies to all of them. For the raw endpoint reference, see the [SQS page](/integrate/endpoints/sqs).

## Choosing a source

| Source | Good for | Notes |
| --- | --- | --- |
| **SQS spot price** | Display prices, quoting, "what is this worth right now" | Fast, covers every routable asset, falls back to CoinGecko when a price cannot be determined onchain. |
| **TWAP** | A manipulation-resistant reference price, especially for a contract | Averaged over a time window, so far harder to manipulate than spot. See [TWAP](/build/chain/twap). |
| **Pyth** | An external oracle feed for assets Pyth covers | Pull-based oracle; see the [Pyth integration](/integrate/external_projects/pyth). |

A rule of thumb: use **SQS spot** for UI and quoting, and **TWAP** anywhere a price feeds back into onchain logic or a decision that an attacker could profit from moving.

## SQS spot price

The quickest way to get a current price. `GET /tokens/prices` returns the spot price of each base denom expressed in a quote denom:

```bash
curl "https://sqs.osmosis.zone/tokens/prices?base=uosmo"
```

```json
{ "uosmo": { "ibc/498A0751...": "0.045873961862374866000000000000000000" } }
```

Each base maps to a quote-denom map whose value is the spot price. Pass `humanDenoms=true` to use display symbols (`wbtc`) instead of the full `ibc/HASH`. See [Read token prices](/integrate/endpoints/sqs#read-token-prices) for the full parameter reference.

The price is returned at full precision; format it for display using the asset's exponent (see below). If you need the price implied by a specific trade size rather than the marginal spot price, request a [quote](/integrate/swap) instead, the quote's `in_base_out_quote_spot_price` and `amount_out` reflect the actual route and its price impact.

## TWAP

The `x/twap` module records time-weighted average prices that compose across pools. Because a TWAP is averaged over many blocks, moving it requires sustaining a price over time rather than within a single transaction, which makes it the right choice for any onchain consumer (another contract, a liquidation check, a reference rate). Read it from the chain over [RPC, REST, or gRPC](/integrate/endpoints); see the [TWAP module](/build/chain/twap) for the query surface and the windowing semantics.

## Pyth

For assets covered by Pyth, the [Pyth integration](/integrate/external_projects/pyth) provides an external pull-based oracle feed. Use it when you specifically want Pyth's price (for example, to match another venue) rather than an Osmosis-derived price.

## Decimal handling (applies to every source)

All of these sources return prices and amounts in an asset's **base (minimal) denom**, and assets do not all use 6 decimals. To convert a base-denom price or amount to a human display value you must apply the asset's **exponent**, which you read from its metadata, never assume.

- SQS exposes metadata at `GET /tokens/metadata` (see [Token metadata](/integrate/endpoints/sqs#token-metadata)).
- The Cosmos Chain Registry and the Osmosis assetlists are the canonical source for an asset's exponent and display denom.

Match assets on the full base denom (`ibc/HASH` or `factory/...`), not the display symbol, since different assets can share a symbol.
