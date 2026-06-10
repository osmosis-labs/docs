---
description: "What it means to provide liquidity: position types, impermanent loss, and rewards."
sidebar_position: 5
---

# Providing Liquidity

Every trade on Osmosis happens against a [liquidity pool](/learn/terminology#pools). Liquidity providers (LPs) are the people who supply the assets in those pools. In return for letting traders swap against your assets, you earn a share of the fees those trades generate. This page explains the concept of providing liquidity and the tradeoffs involved. For the mechanics of the most capital-efficient pool type, see [Concentrated Liquidity](/learn/features/concentrated-liquidity).

## What it means to provide liquidity

When you provide liquidity, you deposit assets into a pool. The pool uses your assets (alongside everyone else's) as the reserve that traders swap against. Each swap pays the pool's swap fee (its **spread factor**), and that fee is distributed to the pool's LPs in proportion to how much of the pool they supply. The more trading volume a pool sees, the more fees its LPs earn.

In a traditional weighted pool, your deposit is represented by [LP tokens](/learn/terminology#lp-tokens): a receipt for your share of the pool that you redeem to withdraw your assets plus your accrued fees.

## Position types

Osmosis offers more than one way to provide liquidity, with different effort-and-reward tradeoffs:

- **Classic (full-range) positions** spread your liquidity across the entire price range, from zero to infinity. They are simple and hands-off: you deposit and earn fees on any trade, but your capital is thinly spread, so each unit earns less.
- **Concentrated liquidity positions** let you place your capital in a specific price range you choose. Within that range your liquidity is far denser, so you earn a larger share of fees for the same capital, often dramatically more. The tradeoff is that you only earn while the price stays in your range, and you may want to manage the position as the market moves. See [Concentrated Liquidity](/learn/features/concentrated-liquidity) for the full picture.

## Impermanent loss

The main risk of providing liquidity is **[impermanent loss](/learn/terminology#impermanent-loss)**. When the prices of the pooled assets diverge from where they were when you deposited, the pool automatically rebalances by selling the asset that went up and buying the one that went down. The result is that you can end up with less value than if you had simply held the two assets in your wallet. It is called "impermanent" because the gap narrows if prices return to their original ratio, but it becomes permanent the moment you withdraw.

<p align="center">
  <img src="/img/impermanentloss.png" alt="Value of an LP position versus simply holding the two assets as their prices diverge" width="90%" />
</p>

Fees earned offset impermanent loss, and whether providing liquidity is net profitable depends on how much volume the pool sees versus how much its assets' prices diverge. Stable pairs (assets that track each other) have little impermanent loss; volatile pairs have more.

## Incentives

Beyond swap fees, some pools receive additional **liquidity incentives**: extra rewards streamed to LPs on top of the fees they earn. These are typically funded by third parties (for example, a project incentivizing its own pool) through a [gauge](/learn/terminology#gauge), which anyone can create permissionlessly. Depending on the gauge, you may need to [bond](/learn/terminology#bonding) your position for a commitment period to qualify.

## Where to go next

Providing liquidity is the supply side of [how trading works](/learn/how-trading-works). To actually create or join a pool, the app at [app.osmosis.zone](https://app.osmosis.zone) walks through it; to integrate liquidity provision into your own software or list a new asset with a pool, see the [Integrate](/integrate) section.
