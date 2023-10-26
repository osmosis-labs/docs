---
sidebar_position: 7
---
# Liquidity Incentives

Liquidity Providers on Osmosis receive swap fees by default, but can choose to bond to pools and receive additional liquidity incentives from many sources.

* [External Incentives](https://docs.osmosis.zone/overview/getting-started/#external-incentives)

	Osmosis allows for the permissionless creation of (external) liquidity mining gauges, allowing projects to add thier own rewards to further incentivize users to provide liquidity into a pool.

* [Internal Incentives](https://docs.osmosis.zone/overview/getting-started/#internal-incentives)

	Osmosis allocates up to 20% of inflation to incentivize users to bond their liquidity on Osmosis. If a pool is included then it will be allocated a share of incentives based on several factors such as type of asset, swap fees generated in the pool, age of listing and sustained volumes. 
	Osmosis currently only incentivises pools composed of a very limited set of tokens as of [Proposal 638](https://www.mintscan.io/osmosis/proposals/638).

* [Superfluid Staking](https://docs.osmosis.zone/overview/getting-started/#superfluid-staking)

	If enabled on a pool, a portion of the OSMO within can also be staked. Providing additional security to Osmosis as well as giving the liquidity providers additional staking rewards and the ability to participate in governance.
	Superfluid staking is only available on Classic pools or full range Supercharged Pools.

To learn more about the Incentives module, see
	[Osmosis Docs: Develop > Osmosis-core > Modules > Incentives](https://docs.osmosis.zone/osmosis-core/modules/incentives)

## External Incentives

External Incentives are an effective way to incentivize users to provide liquidity, as well as a great way to have the pool be considered for onboarding into the set of pools receiving internal Osmosis Liquidity Mining incentives. Creating an incentive gauge is permissionless, so anyone can deposit tokens into a gauge to be distributed as bonding incentives. This feature allows outside parties to augment Osmosis’ own liquidity incentive program without having to obtain governance approval.

In Classic and Stableswap pools, it is possible to add incentives to any combination of 1-day, 7-day, and 14-day gauges. Incentives allocated to the 1-day gauge will be split among all three gauges. Incentives allocated to the 7-day gauge will be split among only the 7-day and 14-day gauges, but not to the 1-day gauge. Incentives allocated to the 14-day gauge will only be distributed to the 14-day gauge.

In Supercharged pools, incentives are distributed block by block according to the ratio of liquidity provision to the active tick.

Currently, the only way to create an external incentive gauge is to run the [create-gauge command](../../osmosis-core/modules/incentives/#create-gauge) using [CLI](https://docs.osmosis.zone/osmosis-core/osmosisd).

This command costs 50 OSMO to run, transferred from the running wallet's balance to the Osmosis Community Pool, but can be used to load any token as external incentives to any pool.

## Internal incentives
Internal incentives are provided from Osmosis inflation at each Epoch. Each pool on Osmosis has gauges that may be assigned a weighting to receive a share of these emissions. This weighting can be viewed on chain by [querying the poolincentives module](https://docs.osmosis.zone/osmosis-core/modules/pool-incentives#queries).

To see how these weightings translate into incentive rates and expected changes at the next adjustment there is a dashboard available from [Chaos Labs](https://community-staging.chaoslabs.xyz/osmosis/incentives-optimization).

Adjustments happen monthly and are required to be voted through Osmosis Governance in order to directly approve changes to the on chain parameters. An example of this is [Proposal 647](https://www.mintscan.io/osmosis/proposals/647).

Calculations to determine incentive weighting for each pool were set in [Proposal 578](https://www.mintscan.io/osmosis/proposals/578).

These use the incentives research carried out [documented in this paper](https://hathornodes.com/osmosis_incentives_research.html) and the [revision to this](https://hathornodes.com/incentives_research_update.html) based on community feedback.

In summary, liquidity targets are set based on:
* Aiming to have slippage of 0.25% for most retail swaps, with 2.5% allowed for whale swaps.
* Minimum liquidity targets to defend against Oracle manipulation

Incentives are then adjusted by up to 10% per month until that liquidity target is reached.

## Superfluid Staking
Osmosis Superfluid Staking can further incentivize users to provide liquidity to a pool, as they are able to stake their LP tokens for additional rewards as well as participating in Osmosis governance. The rewards from superfluid staking come from a portion of the OSMO in the pool being staked, so only OSMO pools can qualify for superfluid staking.

The reason Osmosis hasn't simply allowed all OSMO pools to enable Superfluid staking is because any sudden extreme loss of value in an asset paired with OSMO would cause the OSMO side of the pool to shrink significantly, and this poses a risk to the security of the chain. The superfluid staked OSMO is meant to be safely staked and untouchable for at least 14-days (the duration on the unbonding period), like all staked OSMO, but if the amount of OSMO in a pool suddenly shrinks, then it essentially has the effect of releasing staked OSMO before the 14-days. This is why governance must assess whether a pool seems stable before enabling superfluid staking for it. 

Currently, there is no strict criteria on which pools may have Superfluid staking enabled, however typical standards from historical discussions include:
* Chain/Token should be established for at least three months.
* Token supply should be reasonably decentralised.
* Liquidity should be suitably high (>$300k) to prevent high volatility in the quantity of Superfluid Staked OSMO. 
* Pool liquidity should have stabilised.

Superfluid staking is only available on full range positions in Supercharged pools and so this is most frequently used in Classic pools.

The feature is enabled by via on-chain governance by a `Set Superfluid Asset` Proposal. These proposals must also be posted to the [Osmosis Governance Forum](https://gov.osmosis.zone/) for 3 days before moving to chain.

For an example of a forum post see [Commonwealth Post: Enable Superfluid Staking on OSMO/USDT](https://commonwealth.im/osmosis/discussion/10497-enable-superfluid-staking-on-osmousdt)

For an example of a Superfluid proposal see [Proposal #471: Enable Superfluid Staking on OSMO/USDT](https://www.mintscan.io/osmosis/proposals/471)

For instructions on how to carry out a `Set Superfluid Asset` Proposal via [CLI](https://docs.osmosis.zone/osmosis-core/osmosisd) see [Gov Module Documentation](https://docs.osmosis.zone/osmosis-core/modules/gov#submit-proposal-set-superfluid-asset)