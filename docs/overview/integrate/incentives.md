---
sidebar_position: 7
---
# Liquidity Incentives

Liquidity Providers on Osmosis receive swap fees by default, but can receive additional liquidity incentives from many sources.

* [External Incentives](#external-incentives)

	Osmosis allows for the permissionless creation of external liquidity mining gauges, allowing projects to add their own rewards to further incentivize users to provide liquidity into a pool.

* [Internal Incentives](#internal-incentives)

	Osmosis allocates up to 20% of inflation to incentivize users to bond their liquidity on Osmosis. If a pool is included by governance then it will be allocated a share of incentives based on several factors such as type of asset, swap fees generated in the pool, age of listing and sustained volumes. 
	Osmosis currently only incentivizes pools composed of a very limited set of tokens as of [Proposal 638](https://www.mintscan.io/osmosis/proposals/638).

* [Superfluid Staking](#superfluid-staking)

	If enabled on a pool, a portion of the OSMO within can also be staked. Providing additional security to Osmosis as well as giving the liquidity providers additional staking rewards and the ability to participate in governance.
	Superfluid staking is only available on Classic pools or full range Supercharged Pools.

## How to add External Incentives to a pool

External Incentives are an effective way to incentivize users to provide liquidity by enabling an additional reason to provide liquidity apart from swap fees.

Creating an incentive gauge is permissionless, anyone can deposit tokens into a gauge to be distributed as bonding incentives.

There is a small fee in OSMO to create a gauge, which is transferred from the running wallet's balance to the Osmosis Community Pool. At the time of writing this is 50 OSMO.

### Classic and Stableswap Pool Distribution mechanism
In Classic and Stableswap pools, it is possible to add incentives to 14-day gauges*. As long as a provider bonds liquidity for at least the time that is specified, they will receive a share of incentives at epoch. 

* 1 and 7 day gauges are also possible through the SDK, but this is **not** suggested and may be removed entirely in the near future

### Supercharged Pool Distribution mechanism
In Supercharged pools, incentives are distributed block by block according to the ratio of liquidity provision to the active tick.
For example, if 14,400 FOO per day is allocated to the pool, with an average of six seconds per block, there will be 1 FOO distributed per block.

In this example Wosmongton and Amelia are both providing the same quantity of tokens to the Supercharged pool.

Wosmongton provides liquidity across a nine times wider range than Amelia. Therefore, Amelia is providing nine times the liquidity at the active tick. 

Wosmongton receives 0.1 FOO per block, while Amelia receives 0.9 FOO per block. Amelia's liquidity is more efficiently used, but may require adjusting more frequently and so would be subject to impermanent loss and trading fees in order to establish a new position around the new active tick.


### Creating an External Incentives Gauge
Currently, the only way to create an external incentive gauge is to use the [CLI](https://docs.osmosis.zone/osmosis-core/osmosisd).

The command to run takes the format:
`osmosisd tx incentives create-gauge [lockup_denom] [reward] [poolId] [flags]`

`[lockup_denom]` takes the form of the pool's GAMM token such as gamm/pool/1, this can be set to 0 for Supercharged pools

`[reward]` is the quantity of the base denom that you are adding to the pool, such as 1355000000uosmo for 1355 OSMO tokens.

`[poolId]` is the pool ID of the Supercharged pool, this should be set to 0 for Classic and Stableswap pools

`[flags]` required specific to this transaction are 
	`--duration` which specifies the length of time that a provider must be bonded for to receive incentives, this is not required for Supercharged pools as there is no bonding. Typical values are 24h, 168h and 336h.
	`--epochs` which specifies the number of days that these incentives will be distributed over
	`--start-time` which specifies a Unix timestamp to begin incentives on, they will begin distribution the epoch after this time

**Example Supercharged command**

`osmosisd tx incentives create-gauge 0 1355000000uosmo 1081 --epochs 30 --start-time 1698328800 --from Wosmongton --gas=auto --gas-prices 0.0025uosmo --gas-adjustment 1.3`

**Example Classic Pool command**

`osmosisd tx incentives create-gauge gamm/pool/1 1355000000uosmo 0 --duration 336h --epochs 30 --start-time 1698328800 --from Wosmongton --gas=auto --gas-prices 0.0025uosmo --gas-adjustment 1.3`



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

The feature is enabled by via on-chain governance by a `Set Superfluid Asset` Proposal. These proposals must also be posted to the [Osmosis Governance Forum](https://forum.osmosis.zone/) for 3 days before moving to chain.

For an example of a Superfluid proposal see [Proposal #546: Enable Superfluid Staking on OSMO/KAVA](https://www.mintscan.io/osmosis/proposals/546)

For instructions on how to carry out a `Set Superfluid Asset` Proposal via [CLI](https://docs.osmosis.zone/osmosis-core/osmosisd) see [Gov Module Documentation](https://docs.osmosis.zone/osmosis-core/modules/gov#submit-proposal-set-superfluid-asset)
