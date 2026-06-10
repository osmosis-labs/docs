---
description: Pay transaction fees in many tokens, not only OSMO.
sidebar_position: 4
---

# Fee Abstraction

Fee abstraction lets you pay transaction fees in tokens other than the chain's native token. On Osmosis you can pay gas in many of the assets listed on the exchange, not just OSMO, so you do not have to hold a separate balance of the native token just to transact.

## Why it matters

Normally every chain requires its own native token to pay for gas. That is friction: a user who holds only USDC has to go acquire OSMO before they can do anything. Fee abstraction removes that step. You hold the asset you actually use, and the network accepts it for fees, converting it behind the scenes.

## How it works conceptually

A governance-managed allowlist defines which tokens are accepted for fees. When you pay a fee in an accepted non-OSMO token, the network values it against OSMO using an onchain price and accepts the equivalent amount. The collected non-OSMO fees are periodically swapped back to the native token, so validators and stakers are still ultimately paid in OSMO.

The same primitive also lets other Cosmos chains accept their users' fees in IBC tokens and settle them through Osmosis liquidity, using Osmosis as the conversion venue. To pay a fee in an alternative token, set your gas price in that token's denom; see [Fees and Gas](/integrate/fees) for the integrator detail.

## Reference

For the full module mechanics (the exchange-rate updates over interchain queries, the cross-chain swap settlement, and the deployment), see the [fee-abstraction repository](https://github.com/osmosis-labs/fee-abstraction).
