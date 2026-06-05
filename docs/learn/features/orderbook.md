---
sidebar_position: 11
---

# Orderbook

Alongside its [automated market maker](/learn/how-trading-works) pools, Osmosis has an onchain **orderbook**: a venue for limit orders, where you specify the exact price you want to trade at and your order waits until the market reaches it. This gives traders a familiar tool from centralized exchanges, fully onchain and composable with the rest of Osmosis liquidity.

## Limit orders vs swaps

A normal swap on an AMM executes immediately at whatever price the pool gives, accepting some [price impact and slippage](/learn/how-trading-works#price-impact-and-slippage). A **limit order** is different: you say "buy this asset, but only at or below this price" (or sell at or above), and the order rests on the book until the market comes to your price. If it never does, it never fills. This lets you trade at a target price without watching the market, and to provide liquidity passively by placing resting orders others can trade against.

## How it fits into Osmosis

Each orderbook market is its own onchain contract pairing one asset to buy or sell (the base) against the asset its price is quoted in (the quote). Crucially, orderbook markets are not a separate, walled-off venue: they participate in the same routing graph as weighted, stableswap, and [concentrated liquidity](/learn/features/concentrated-liquidity) pools. When you make an ordinary swap, Osmosis can route through orderbook liquidity alongside pool liquidity if that gives you a better price, so the orderbook deepens the whole exchange rather than fragmenting it.

Creating a new orderbook market is permissionless: anyone can open a market for a new pair. The orderbook is implemented as a smart contract; for the developer-facing detail (discovering markets, placing and cancelling orders, querying state, and routing), see the [Orderbook module page](/build/chain/orderbook) under Build.
