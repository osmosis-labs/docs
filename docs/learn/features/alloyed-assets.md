---
description: One canonical denom that unifies several bridged versions of an asset.
sidebar_position: 9
---

# Alloyed Assets

An **alloyed asset** is a single canonical Osmosis denom that stands in for several equivalent versions of the same underlying asset. Bridging tends to produce more than one denom for "the same" thing: there are several legitimate bridged versions of BTC on Osmosis, several versions of ETH, several versions of USDT. Each arrives as its own denom with its own liquidity pool, which splits trading depth and makes the asset harder to price and route.

An alloyed asset collapses that fragmentation into one trading unit. `allBTC` is the most prominent live example: deposit any supported bridged BTC and receive `allBTC` in return, or redeem `allBTC` back into any backing version that has liquidity. The backing assets are never removed, they remain real denoms you can hold or withdraw at any time. The alloyed denom simply becomes the unit that pricing, routing, and the frontend use, while the backing accounting happens behind the scenes.

The primitive is implemented by a CosmWasm contract called the **transmuter**, which custodies the basket of backing versions and mints the alloyed denom against deposits at parity. Joining with one backing version and exiting with another is a swap between the two at a 1:1 rate, mediated by the alloyed unit, which is where the "transmuter" name comes from. Per-asset rate limiters keep any single bridge or version from dominating the pool.

For the contract surface (instantiation, messages and queries, normalization factors, routing through SQS, and IBC implications), see [Alloyed Assets](/integrate/features/transmuter) in the Integrate section.
