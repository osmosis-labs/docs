---
description: Provide liquidity in a chosen price range for far higher capital efficiency.
sidebar_position: 2
---

# Concentrated Liquidity

Concentrated liquidity is a pool design that lets liquidity providers focus their capital in a chosen price range instead of spreading it evenly across all possible prices. It is one of the most important features on Osmosis for capital efficiency.

## The idea

In a classic pool, your liquidity is spread from zero to infinity, so most of it sits at prices that rarely trade and earns little. Concentrated liquidity lets you place your capital only where trading actually happens. For a pair that trades in a tight band (a stablecoin pair near 1, for example), an LP can put all their liquidity in that band and earn far more fees on the same capital, often many times more than a classic position.

The tradeoff is involvement. Your liquidity only earns while the price is inside your chosen range; if the price moves out of range, your position stops earning until the price returns or you adjust the range. So concentrated positions can be actively managed, where classic full-range positions are hands-off. The range you choose is expressed in discrete price steps called [ticks](/learn/terminology#tick).

This design also enables features that a single curve cannot, such as range orders (providing liquidity entirely on one side of the current price, which behaves like a limit order).

## In pictures

In a classic pool, liquidity is distributed across the full range of possible prices. With concentrated liquidity, it can be focused around the current price, massively increasing capital efficiency.

![Classic full-range liquidity versus liquidity concentrated around the current price](@site/docs/assets/cl-step1.gif)

You pick a strategy that suits you. A passive strategy spreads a little liquidity across a wide span: you earn less, but rarely go out of range.

![A wide, passive liquidity range](@site/docs/assets/cl-step2.gif)

A more aggressive, narrow range earns more but is more likely to go out of range. While out of range, you stop earning on swaps, so it needs watching and occasional rebalancing.

![A narrow, aggressive liquidity range](@site/docs/assets/cl-step3.gif)

As with any AMM, when the price moves, your position converts toward one asset. If it moves fully out of range, you end up holding 100% of the other asset until the price re-enters your range.

![A position converting to one asset as the price moves out of range](@site/docs/assets/cl-step4.gif)

Across many LPs all running different strategies, liquidity becomes more dynamic and better optimized for traders.

![Many liquidity providers with overlapping ranges](@site/docs/assets/cl-step5.gif)

For the full mechanics (the math, tick handling, fee and incentive accounting, and precision details), see the [Concentrated Liquidity module page](/build/chain/concentrated-liquidity) under Build. To integrate against CL pools, see [Concentrated Liquidity Integration](/integrate/features/concentrated-liquidity-integration).
