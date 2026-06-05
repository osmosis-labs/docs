---
sidebar_position: 4
---

# How Trading Works on Osmosis

Osmosis is an [automated market maker](/learn/terminology#defi) (AMM): there is no central order matching engine deciding your trade price. Instead, every market is a [liquidity pool](/learn/terminology#pools), a shared reserve of two or more assets that anyone can trade against. Prices come from the math of the pool, not from a counterparty on the other side of your order. This page explains, in plain language, what happens when you swap and where the price comes from. For the technical depth behind any of it, follow the links to the Features pages.

## Pools and prices

A pool holds reserves of the assets in a market, for example OSMO and USDC. The pool's formula sets a spot price from the ratio of those reserves. When you swap OSMO for USDC, you add OSMO to the pool and take USDC out; that shifts the ratio, so the price moves slightly against you as your trade executes. The bigger your trade is relative to the pool's depth, the more the price moves.

Osmosis supports more than one kind of pool, because different assets trade best under different curves:

- **Weighted (Balancer-style) pools** spread liquidity across the entire price range. They are simple and robust for volatile pairs.
- **Stableswap pools** concentrate liquidity near a fixed ratio, which is efficient for assets that should trade close to parity (such as two versions of a stablecoin).
- **Concentrated liquidity pools** let liquidity providers place their capital in a chosen price range for much higher capital efficiency. See [Concentrated Liquidity](/learn/features/concentrated-liquidity) for how this works.
- **Orderbook markets** add limit orders to the mix. See [Orderbook](/learn/features/orderbook) for the concept.

You do not have to choose a pool yourself. Osmosis routes each trade across whichever pools give the best result, including splitting a single swap across several pools and hopping through intermediate assets when that is cheaper.

## Price impact and slippage

Two related ideas govern what price you actually get:

- **Price impact** is how much your own trade moves the price, because you are changing the pool's reserves as you trade. Small trades on deep pools have negligible price impact; large trades on shallow pools can have a lot.
- **[Slippage](/learn/terminology#slippage)** is the difference between the price you saw when you submitted and the price at execution. Between those two moments, other trades and price movements can change the pool. You set a slippage tolerance; if the price would move beyond it, the trade reverts rather than filling at a worse price than you accepted.

## Fees on a trade

A swap on Osmosis carries two kinds of fee:

- **Spread factor** (the pool's swap fee). This is paid to the pool's liquidity providers as compensation for supplying the assets you traded against. Each pool sets its own spread factor.
- **[Taker fee](/learn/osmo#taker-fees)**. A small protocol-level fee on trades, 0.1% by default, with some routes reduced or exempt. Taker fees are split between OSMO stakers, OSMO buyback, and the community pool.

You also pay a network [gas](/learn/terminology#fees) fee to include the transaction in a block, like any onchain action. Thanks to [fee abstraction](/learn/features/fee-abstraction), you can pay that gas in many tokens, not only OSMO.

## What you get out

Put together: when you swap, the router finds the best path across pools, your trade moves the price by some price impact, the spread factor and taker fee are taken, and the result must land within your slippage tolerance or the trade reverts. The next step from here is [providing liquidity](/learn/providing-liquidity), which is the other side of the same mechanism: supplying the assets that traders swap against, and earning the spread factor in return.
