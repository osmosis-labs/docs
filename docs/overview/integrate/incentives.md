---
sidebar_position: 7
---
# Liquidity Incentives

Liquidity Providers on Osmosis receive swap fees by default, but can choose to bond to pools and receive additional liquidity incentives from many sources.

* [External Incentives](https://docs.osmosis.zone/overview/getting-started/#external-incentives)

	Osmosis allows for the permissionless creation of (external) liquidity mining gauges, allowing projects to add thier own rewards to further incentivize users to provide liquidity into a pool.

* [External Incentive Matching Program](https://docs.osmosis.zone/overview/getting-started/#external-incentive-matching-program)

	Activated by Osmosis governance, this is a temporary addition to the Osmosis internal incentives system in order to share the cost of establishing liquidity.

* [Internal Incentives](https://docs.osmosis.zone/overview/getting-started/#internal-incentives)

	Osmosis allocates 20% of its inflation to incentivize users to bond their liquidity on Osmosis. If a pool is included then it will be allocated a share of incentives based on several factors such as type of asset, swap fees generated in the pool, age of listing and sustained volumes. 

* [Superfluid Staking](https://docs.osmosis.zone/overview/getting-started/#superfluid-staking)

	If enabled on a pool, a portion of the OSMO within can also be staked. Providing additional security to Osmosis as well as giving the liquidity providers additional staking rewards and the ability to participate in governance.

To learn more about the Incentives module, see
	[Osmosis Docs: Develop > Osmosis-core > Modules > Incentives](https://docs.osmosis.zone/osmosis-core/modules/incentives)

## External Incentives

External Incentives are an effective way to incentivize users to provide liquidity, as well as a great way to have the pool be considered for onboarding into the set of pools receiving internal Osmosis Liquidity Mining incentives. Creating an incentive gauge is permissionless, so anyone can deposit tokens into a gauge to be distributed as bonding incentives. This feature allows outside parties to augment Osmosis’ own liquidity incentive program without having to obtain governance approval.

It is possible to add incentives to any combination of 1-day, 7-day, and 14-day gauges. Incentives allocated to the 1-day gauge will be split among all three gauges. Incentives allocated to the 7-day gauge will be split among only the 7-day and 14-day gauges, but not to the 1-day gauge. Incentives allocated to the 14-day gauge will only be distributed to the 14-day gauge.

Currently, the only way to create an external incentive gauge is to run the [create-gauge command](../../osmosis-core/modules/incentives/#create-gauge) using [CLI](https://docs.osmosis.zone/osmosis-core/osmosisd).

This command costs 100 OSMO to run, transferred from the running wallet's balance to the Osmosis Community Pool, but can be used to load any token as external incentives to any pool.

## External Incentive Matching Program

To incentivize projects to add external incentives, Osmosis governance voted to add the [External Incentive Matching program](https://www.mintscan.io/osmosis/proposals/47). If on-chain governance approves to match external incentives for a pool then the pool will be added to the internal incentives system and begin to receive OSMO incentives up to the value of the external incentives.

This has the potential to effectively double the impact of a project's external incentives, although there are some restrictions to this:
- Osmosis generally prefers to use incentives on OSMO pools and so there is an OSMO bias that can down-scale the value of the OSMO matching. If the pool is an OSMO pool, (e.g., FOO/OSMO,) then the value of the matching is 100%. But, if the pool is a non-OSMO pool, (e.g., FOO/ATOM,) then the value of the matching is scaled down to 50% of the value of the external incentives. 
	- See: [Osmosis Proposal #264: External Incentive Matching reduction within non-OSMO categories](https://www.mintscan.io/osmosis/proposals/264)

- There is also a cap on the value of the matching, which is no more than value of the standard OSMO incentives that the pool would receive from internal Osmosis incentives.
	- See: [Osmosis Proposal #133: Incentive Matching Fee Based and 1:1 Caps](https://www.mintscan.io/osmosis/proposals/133)

### How to apply to the External Incentive Matching Program:
* Create a post on the [Osmosis Governance Forum](https://gov.osmosis.zone) to allow users to give opinions on whether this should be matched.
	* See [Commonwealth post: EVMOS Incentivized pool & Matched Incentives](https://gov.osmosis.zone/discussion/5032-evmos-incentivized-pool-matched-incentives) for an example.

* After the 3 day waiting period on the governance forum, [create a text proposal](https://docs.osmosis.zone/osmosis-core/modules/gov#submit-proposal-text) with the details of the pool, duration of incentives and potential matching amount.
	* See [Osmosis Proposal #346 Match External Incentives on OSMO/EVMOS](https://www.mintscan.io/osmosis/proposals/346) for an example of a successful proposal to match external incentives to a new pool. 

* A successful proposal will lead to incentive matching being included in the next routine incentives proposal (Monday ~15:00 UTC) and lead to incentives starting on the following Sunday.

## Internal incentives
Internal incentives are provided from Osmosis inflation at each Epoch. Each pool on Osmosis has gauges that may be assigned a weighting to receive a share of these emissions. This weighting can be viewed on chain by [querying the poolincentives module](https://docs.osmosis.zone/osmosis-core/modules/pool-incentives#queries).

To see how these weightings translate into incentive rates there is a spreadsheet that shows the current incentives as well as a prediction of how they will change at the next weekly adjustment: [Incentives Spreadsheet](https://docs.google.com/spreadsheets/d/1oEn8JtrIU1mze_3Fw4DbbxWBq6yPUM-yAoaOPxG6Y1k/edit#gid=9186761)

Each weekly adjustment is required to be voted through Osmosis Governance in order to directly approve changes to the on chain parameters. An example of this is [Proposal 493](https://www.mintscan.io/osmosis/proposals/493).

The calculations that generate these weightings are visible in the [github repository](https://github.com/OsmosisIncentivesCommittee/OsmoIncentives) as well as detailed [below](https://docs.osmosis.zone/overview/integrate/incentives#distribution-calculations).

### How to Receive Internal Incentives
Pools that are voted in to receive Osmosis internal incentives remain in the system unless removed by a subsequent proposal. 

* Create a post on the [Osmosis Governance Forum](https://gov.osmosis.zone) to allow users to give opinions on whether this should be matched.
	* See [Commonwealth post: Signalling Proposal for Axelar Incentivised Pool](https://gov.osmosis.zone/discussion/6876-signalling-proposal-for-axelar-incentivised-pool) for an example.

* After the 3 day waiting period on the governance forum, [create a text proposal](https://docs.osmosis.zone/osmosis-core/modules/gov#submit-proposal-text).
	* See [Osmosis Proposal #333: Signalling Proposal for OSMO/AXL incentivised pool](https://www.mintscan.io/osmosis/proposals/333) for an example of a successful proposal. 

* A successful proposal will lead to the pool being included in the next routine incentives proposal (Monday ~15:00 UTC) and lead to incentives starting on the following Sunday.

To increase the chances of a pool being accepted:
* Propose an OSMO pool.

	Osmosis originally incentivised other base pairs such as ATOM and USDC, however the community expressed a desire to move to OSMO pools only. These are more likely to pass. 
	Exceptions would be pools which provide essential value to fulfil Osmosis' goal of become a liquidity hub such as Stable/Stable pools and Composability pool.

* Add appropriate External incentives.

	Pools that already have external incentives, or have previously been part of the external incentive matching program are a more efficient spend for Osmosis, and also shows that the project is serious about the pool.
	Pools with excessive external incentives may not be taken seriously due to high inflation and hype drawing more liquidity than Osmosis requires to faciliate trading.

* Propose well designed pools.

	Pools with high swap fees or asymmetrical weighting ocan discourage trading or providing liquidity. It is best to stick to a standard pool design (i.e., 50/50 weighting and <= 0.3% swap fee)

* Engage with feedback.

	On both the Governance forum and in wider social media to answer user concerns and establish a benefit to Osmosis acquiring liquidity.

## Distribution Calculations

### Category Model

This model groups pools into a number of categories with fixed incentive shares, so that we can prioritize certain classes of liquidity directly.

The model is maintained in the [OsmoIncentives](https://github.com/OsmosisIncentivesCommittee/OsmoIncentives) repo and produces a new proposal to adjust incentive allocations weekly. These are also viewable as csv outputs which are auto imported into [Current Proposal](https://docs.google.com/spreadsheets/d/1ydQfgEDot0AC9xuT2txc39VBfuum_I1gU_1-GrmrWx4/edit?usp=sharing) and [Prospective Proposal](https://docs.google.com/spreadsheets/d/1oEn8JtrIU1mze_3Fw4DbbxWBq6yPUM-yAoaOPxG6Y1k/edit?usp=sharing) spreadsheets.

### Target Share
The share of incentives allocated to each category is then split according to the proportion of swap fees collected by each pool within the category. These values are limited by the `swap fee cap` (currently 3), such that pools will not benefit by having more than 3x the average fee APR of the category.

We then recalculate shares using (capped) fees + external incentives collected by the pool. To limit the incentive increase caused by a match relative to the base incentives, we take the minimum of this `adjusted reveneue` share, and `(1 + matched_multiple_cap) * capped_fee_share`. We set `matched_multiple_cap` at 1, so that matches can be no more than the base incentives of a pool.

### Minimum Share
Pools can also have a minimum share set by governance, to incentivize liquidity ahead of observed trading volume. Minimum shares have currently been set for the OSMO/ETH, OSMO/WBTC, OSMO/CRO, OSMO/DAI and OSMO/DOT pools.  These parameters are set and changed by governance and should be used to prioritizes the growth of strategic liquidity.

### Maximum Share
Pools can also have a maximum share set by governance, to prevent too many incentives being allocated to any one pool and ensuring a diverse range of liquidity for trading.  Currently the OSMO/ATOM pool and OSMO/USDC pools have maximum shares to encourage liquidity diversification in the Major/OSMO and Stable/OSMO categories.

### Major
Qualification for `Major` status is determined by governance based on a combination of factors, namely:
- Is the token market cap large relative to `OSMO`?
- Does the majority of the trade volume happen outside of Osmosis?
- Does Osmosis have a strategic interest in attracting more liquidity of this token?
Being listed as a `Major` asset gives a token a higher share of incentives.

The Current Major tokens are:
* ATOM [[Proposal #233]](https://www.mintscan.io/osmosis/proposals/233)
* WETH [[Proposal #233]](https://www.mintscan.io/osmosis/proposals/233)
* WBTC [[Proposal #233]](https://www.mintscan.io/osmosis/proposals/233)
* CRO [[Proposal #233]](https://www.mintscan.io/osmosis/proposals/233)
* DOT [[Proposal #287]](https://www.mintscan.io/osmosis/proposals/287)
* MATIC [[Proposal #385]](https://www.mintscan.io/osmosis/proposals/385)
* AVAX [[Proposal #409]](https://www.mintscan.io/osmosis/proposals/409)
* FTM [[Proposal #434]](https://www.mintscan.io/osmosis/proposals/434)

### Stable
Qualification for `Stable` status has not been formally set, however it is an endorsement by Osmosis governance that this token is recognised as a Stable token and so will be allocated a higher share of incentives by Osmosis as well as being subject to automatic external incentive matching on Stable/Stable pools according to [Proposal 377]
(https://www.mintscan.io/osmosis/proposals/377)

Stable assets are:
* USDC [[Proposal #233]](https://www.mintscan.io/osmosis/proposals/233) 
* DAI [[Proposal #233]](https://www.mintscan.io/osmosis/proposals/233) 
* USDT [[Proposal #403]](https://www.mintscan.io/osmosis/proposals/403)
* IST [[Proposal #431]](https://www.mintscan.io/osmosis/proposals/431)
* CMST [[Proposal #442]](https://www.mintscan.io/osmosis/proposals/442)

### Categories
These determine the ratio of incentives that are allocated to each category
- Osmo/Major - 54%
- Osmo/Stable - 17%
- Osmo/Minor - 25%
- Stable/Stable - <=4%
- Composability - 0.074%

Any Stable/Stable incentives below the 4% cap are redistributed proportionately between the other categories.

### Scale Limited Adjustments
To prevent excessive volatility in the incentives APRs, incentive targets are adjusted towards over multiple weeks, with each adjustment being limited to no more than +25% or -25%. This is somewhat disrupted as a result of normalization though, so when there are large changes in other pools, some pools might see changes in the range of +/- 30%.

### Maturity
This adjustment scale limiting, is also partially negated during the 4 week onboarding period, where pools are expected to grow quite quickly, and so incentives need to be able to adjust quickly as well to keep up. 

During this period, the setting for the pool is chosen to be a weighted average between the target level and the adjustment limited by the 25% scale, with the weighting between these shifting linearly from entirely target, to entirely scale limited adjustment over the onboarding period. (ie 100% target, 75% target/25% adjustment, 50/50, 25/75, 100% adjustment)

The maturity setting is also exempted when the status of external incentives matching changes in order to allocate an appropriate amount of incentives to tokens with established trading history.

### Bond Duration
Under current parameters, all Internal incentives go to the 14day gauge only due to [Proposal 400](https://www.mintscan.io/osmosis/proposals/400). 
In the event of there being multiple bonding periods active, e.g. for External incentives, each bonding period in a pool receives a share of incentives for all shorter bonding periods.

## Superfluid Staking
Osmosis Superfluid Staking can further incentivize users to provide liquidity to a pool, as they are able to stake their LP tokens for additional rewards as well as participating in Osmosis governance. The rewards from superfluid staking come from a portion of the OSMO in the pool being staked, so only OSMO pools can qualify for superfluid staking.

The reason Osmosis hasn't simply allowed all OSMO pools to enable Superfluid staking is because any sudden extreme loss of value in an asset paired with OSMO would cause the OSMO side of the pool to shrink significantly, and this poses a risk to the security of the chain. The superfluid staked OSMO is meant to be safely staked and untouchable for at least 14-days (the duration on the unbonding period), like all staked OSMO, but if the amount of OSMO in a pool suddenly shrinks, then it essentially has the effect of releasing staked OSMO before the 14-days. This is why governance must assess whether a pool seems stable before enabling superfluid staking for it. 

Currently, there is no strict criteria on which pools may have Superfluid staking enabled, however typical standards from historical discussions include:
* Chain/Token should be established for at least three months.
* Token supply should be reasonably decentralised.
* Liquidity should be suitably high (>$300k) to prevent high volatility in the quantity of Superfluid Staked OSMO. 
* Pool liquidity should have stabilised.

The feature is enabled by via on-chain governance by a `Set Superfluid Asset` Proposal. These proposals must also be posted to the [Osmosis Governance Forum](https://gov.osmosis.zone/) for 3 days before moving to chain.

For an example of a forum post see [Commonwealth Post: Enable Superfluid Staking on OSMO/USDT](https://commonwealth.im/osmosis/discussion/10497-enable-superfluid-staking-on-osmousdt)

For an example of a Superfluid proposal see [Proposal #471: Enable Superfluid Staking on OSMO/USDT
](https://www.mintscan.io/osmosis/proposals/471)

For instructions on how to carry out a `Set Superfluid Asset` Proposal via [CLI](https://docs.osmosis.zone/osmosis-core/osmosisd) see [Gov Module Documentation](https://docs.osmosis.zone/osmosis-core/modules/gov#submit-proposal-set-superfluid-asset)