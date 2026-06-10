---
description: Source the initial liquidity needed to list and trade your asset.
sidebar_position: 6
---

# Source Initial Liquidity

A new asset needs a pool with real liquidity to be tradable, and more liquidity to qualify for [verified status](/integrate/list-asset/frontend) (default visibility on the frontend). As a starting point, a pool with at least USD $1,000-worth of liquidity makes the asset tradable; verification requires more (on the order of $10k total plus depth criteria, per [LISTING.md](https://github.com/osmosis-labs/assetlists/blob/main/LISTING.md)). This page covers a few ways to source that liquidity.

*Note that the Osmosis Foundation will **not** consider any OTC token transfers or loans*

## Add your own liquidity
Buy at least USD $500-worth of your chosen Quote Asset (USDC, USDT, DAI, WBTC, ETH, ATOM or OSMO) to pair with USD $500-worth of the new asset to create a 50/50 pool.

Alternatively, find partners who would be willing to provide the base asset portion of the liquidity to the equivalent value of the new asset you are creating a pool for.

Alternatively, it is possible to create an asymmetrically-weighted liquidity pool to reduce the requirement for the base asset (e.g. 80% FOO::20% OSMO). However, 50/50 pools are recommended.

## Utilise StreamSwap to obtain initial liquidity
[StreamSwap](https://streamswap.io/) is a protocol built on Osmosis that allows a token to be loaded into a stream and users to subscribe by depositing a second asset in order to receive a share of the token according to the proportion of the total deposit they contributed.

The stream ends with participating users having smoothly exchanged their deposit for the streamed token and the initiating user obtaining the alternative asset that can then be used for any purpose, including as a base asset to establish a pool. 

The stream also helps to define an appropriate ratio of the two assets that should be added in order for the pool to have an equal value of each on each side of a 50:50 pool.

# Additional Liquidity

As more liquidity becomes available to users, either through mining, airdrops, or giveaways, it could be strategic to incentivize more liquidity to be added to Osmosis liquidity pools to ensure there is a healthy, consistent market for the new asset. See the [Liquidity Incentives Docs page](./incentives.md) to learn more about how you can .