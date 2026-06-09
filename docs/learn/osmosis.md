---
description: The cross-chain DEX and liquidity hub.
sidebar_position: 1
---
# What is Osmosis?

Osmosis is the premier cross-chain DeFi hub. As the liquidity center and primary trading venue of Cosmos (the open, emergent ecosystem of sovereign Layer 1s connected with the [Inter-Blockchain Communication protocol](https://www.ibcprotocol.dev/), or IBC) it is the access point for the wide world of appchains, the gateway to the interchain.

As IBC connects more and more chains, Osmosis is where their assets and users meet: a single venue to trade, provide liquidity, and move value across the interchain.

<p align="center">
  <img src="/img/homepage.png" alt="The Osmosis app" width="90%" />
</p>

Osmosis pairs the experience of a centralized exchange with the guarantees of decentralized finance: self-custody, trust-minimized transactions, and direct onchain access. The things that matter, the trading logic, the liquidity, and the governance, all live onchain and in the open.

# Why Osmosis?

## Permissionless at the core

The core market actions on Osmosis are permissionless: anyone can [create a pool](/learn/how-trading-works), [create a native token](/learn/features/tokenfactory), or open an [orderbook market](/learn/features/orderbook) directly, without anyone approving it first. This is what lets the long tail of assets and strategies live on Osmosis rather than waiting on a listing committee.

A few surfaces do involve a process rather than a single transaction. Getting an asset fully [listed and verified](/integrate/list-asset) on the Osmosis frontend goes through the asset-list pipeline (basic listing is automatic once an asset is in the Cosmos Chain Registry; verified status and advanced configuration take a pull request and review). Adding a token to the set accepted for [transaction fees](/learn/features/fee-abstraction) is managed by a governance-controlled DAO. So the protocol itself does not gatekeep what you can build, but a few shared, user-facing settings are curated.

## Many pool types, one router

A swap on most AMMs runs against a single curve. Osmosis supports several pool types, each suited to different assets, and routes across all of them through one module, the [pool manager](/build/chain/pool-manager):

- **Weighted pools** for general pairs.
- **Stableswap pools** for assets that should trade near a fixed ratio.
- **[Concentrated liquidity](/learn/features/concentrated-liquidity) pools** for capital-efficient ranges.
- **CosmWasm pools**, including the onchain [orderbook](/learn/features/orderbook), where the pool logic is a smart contract.

Because every pool type is a swap entrypoint behind the same router, a single trade can compose across them, splitting and hopping through whichever pools give the best price. New pool types can be added as contracts and immediately participate in routing, so the exchange extends without re-plumbing the core.

## Customizable liquidity pools

Many AMMs lock the parameters of a pool: fixed two-token pairs, a single swap fee, one curve for everything. But the optimal setup depends on the assets in the pool and on market conditions, which change. There is no single fee or curve that is right for every market.

Osmosis lets pool creators tune these parameters rather than accept a centrally chosen compromise. The right balance between fees and liquidity can be found through experimentation and iteration, which extends what an AMM can serve beyond simple token swaps to more specialized markets, from stable pairs to assets that need their own curve.
