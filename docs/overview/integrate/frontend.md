---
sidebar_position: 8
---

# List on Main

## How to Add Assets onto the Osmosis Assets Page

Osmosis utilizes an alternate front end interface for listing new and unverified assets: [Osmosis Frontier](https://frontier.osmosis.zone).

As long as the asset has been properly registered according to the [registration documentation](https://docs.osmosis.zone/overview/integrate/registration) and there is a pool with USD $1000 of [initial liquidity](https://docs.osmosis.zone/overview/integrate/liquidity) then the pool will be visible on this frontend.

Once a pool containing the asset has received governance approval, the asset will then be added to the main [app.osmosis.zone](https://app.osmosis.zone/) site. There are also some exceptions of unincentivized assets being listed directly on the main site if the assets are well-established and part of an ecosystem with a large market capitalization.

![](../../assets/asset_list.png)

Goverance approval can come in many forms such as:
* Being part of the [External Incentive Matching Program](https://docs.osmosis.zone/overview/getting-started/#external-incentive-matching-program).
* Receiving [Internal Incentives](https://docs.osmosis.zone/overview/getting-started/#internal-incentives).
* Having [Superfluid Staking](https://docs.osmosis.zone/overview/getting-started/#superfluid-staking) enabled.
* Being explicitly approved for listing on the frontend e.g. [Mintscan Proposal 491](https://www.mintscan.io/osmosis/proposals/491).
* Being involved in a [Token](https://docs.osmosis.zone/overview/integrate/liquidity#request-a-token-swap-from-the-osmosis-community-pool) or [Loan Swap](https://docs.osmosis.zone/overview/integrate/liquidity#request-a-loan-swap-from-the-osmosis-community-pool-ocp).
* Any governance proposal where the asset is mentioned as being interacted with.

## Swap Page

Although any asset in a liquidity pool can be traded when a user specifies the pool, an asset will only be listed on the Swap page if it is has a pool cointaining liquidity of USD $1000 (Frontier) or USD $10,000 (Main App).

