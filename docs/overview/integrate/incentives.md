# Liquidity Mining Incentives

There are many ways pools on Osmosis can reward liquidity mining incentives. One way is through (internal) Osmosis Liquidity Mining; Osmosis allocates 45% of its inflation to incentivize users to bond their liquidity on Osmosis. In addition, Osmosis allows for the permissionless creation of (external) liquidity mining gauges, allowing projects to add thier own rewards to further incentivize users to provide liquidity into a pool.
To learn more about the Liquidity Mining modules, see: Osmosis Docs: Develop > Osmosis-core > Modules > [Incentives](http://localhost:3000/osmosis-core/modules/spec-incentives)

## Current incentives
There is a spreadsheet that shows the current incentives from the Osmosis chain: https://docs.google.com/spreadsheets/d/1oEn8JtrIU1mze_3Fw4DbbxWBq6yPUM-yAoaOPxG6Y1k/edit#gid=9186761

## External Incentives

External Incentives are an effective way to incentivize users to provide liquidity, as well as a great way to have the pool be considered for onboarding into the set of pools receiving (internal) Osmosis Liquidity Mining incentives. Creating an incentive gauge is permissionless, so anyone can deposit tokens into a gauge to be distributed as bonding incentives. This feature allows outside parties to augment Osmosis’ own liquidity incentive program. To learn more, see: [External Incentives](../../overview/getting-started.md#external-incentives).

It is possible to add incentives to any combination of 1-day, 7-day, and 14-day gauges. Incentives allocated to the 1-day gauge will be split among all three gauges. Incentives allocated to the 7-day gauge will be split among only the 7-day and 14-day gauges, but not to the 1-day gauge. Incentives allocated to the 14-day gauge will only be distributed to the 14-day gauge.

Currently, the only way to create an external incentive gauge is to run the [create-gauge command](../../osmosis-core/modules/incentives/#create-gauge) using CLI.

Once external incentives have been added, note the gauge Id numbers and follow the procedure to [Add External Incentive Gauges onto the Osmosis Zone Pools page](../integrate/frontend.md#how-to-add-external-incentive-gauges-onto-the-osmosis-pools-page) to request to show the gauges on the [Osmosis Zone Pools page](https://app.osmosis.zone/pools).

### External Incentive Matching Program

To incentivize projects to add external incentives, Osmosis governance voted to add the External Incentive Matching program. If on-chain governance approves to match external incentives for a pool, the incentives adjustment process measures the total dollar value of external incentives that have been added to the pool, matches the value in OSMO tokens, and releases that OSMO as extra liquidity mining rewards to all bonding gauges of the pool.
- See [Osmosis Proposal #47: Add Incentive Matching to Prop 13 Model](https://www.mintscan.io/osmosis/proposals/47) on Mintscan.

This has the potential to effectively double the incentive of a project's external incentives, although there are some restrictions to this:
- There is an OSMO bias that can down-scale the value of the OSMO matching. If the pool is an OSMO pool, (e.g., FOO/OSMO,) then the value of the matching is 100%. But, if the pool is a non-OSMO pool, (e.g., FOO/ATOM,) then the value of the matching is scaled down to 50% of the value of the external incentives (subject to change if the OSMO bias changes).
	- See: [Osmosis Proposal #264: External Incentive Matching reduction within non-OSMO categories](https://www.mintscan.io/osmosis/proposals/264)
- There is also a cap on the value of the matching, which is no more than double the value of the standard OSMO incentives that the pool would receive from internal Osmosis Liquidity Mining.
	- See: [Osmosis Proposal #133: Incentive Matching Fee Based and 1:1 Caps](https://www.mintscan.io/osmosis/proposals/133)

See [Osmosis Proposal #178: Match External Incentives for SWTH/OSMO](https://www.mintscan.io/osmosis/proposals/178) for an example of a successful proposal to match external incentives to a new pool. As always, don't forget to precede on-chain proposals with a forum post to give an opportunity for the community to provide feedback. See [Commonwealth post: Signalling proposal to match OSMO rewards to upcoming SWTH/OSMO pool](https://commonwealth.im/osmosis/discussion/4025-signalling-proposal-to-match-osmo-rewards-to-upcoming-swthosmo-pool).

## Osmosis Liquidity Mining

Bonded Liquidity Gauges are mechanisms for distributing liquidity incentives to LP tokens that have been bonded for a minimum amount of time. 45% of the daily issuance of OSMO goes towards these liquidity incentives. When a new pool is onboarded to receive (internal) Osmosis Liquidity Mining incentives, it will be granted allocation points and recieve a portion of the 45% of daily OSMO issuance. See [Bonded Liquidity Gauges](../../overview/getting-started.md#bonded-liquidity-gauges).

### Distribution Calculations


#### Category Model

This model groups pools into a number of categories with fixed incentive shares, so that we can prioritize certain classes of liquidity directly.
The model is maintained in the [OsmoIncentives](https://github.com/OsmosisIncentivesCommittee/OsmoIncentives) repo and produces a new proposal to adjust incentive allocations weekly. These are also viewable as csv outputs which are auto imported into [Current Proposal](https://docs.google.com/spreadsheets/d/1ydQfgEDot0AC9xuT2txc39VBfuum_I1gU_1-GrmrWx4/edit?usp=sharing) and [Prospective Proposal](https://docs.google.com/spreadsheets/d/1oEn8JtrIU1mze_3Fw4DbbxWBq6yPUM-yAoaOPxG6Y1k/edit?usp=sharing) spreadsheets.

#### Target Share
The share of incentives allocated to each category is then split according to the proportion of swap fees collected by each pool within the category. These values are limited by the `swap fee cap` (currently 3), such that pools will not benefit by having more than 3x the average fee APR of the category.

We then recalculate shares using (capped) fees + external incentives collected by the pool. To limit the incentive increase caused by a match relative to the base incentives, we take the minimum of this `adjusted reveneue` share, and `(1 + matched_multiple_cap) * capped_fee_share`. We set `matched_multiple_cap` at 1, so that matches can be no more than the base incentives of a pool.

#### Minimum Share
Pools can also have a minimum share set by governance, to incentivize liquidity ahead of observed trading volume. Minimum shares have currently been set for the OSMO/ATOM, OSMO/WETH, OSMO/WBTC, OSMO/CRO and OSMO/USDC pools.  These parameters are set and changed by governance and should be used to prioritizes the growth of strategic liquidity.

#### Maximum Share
Pools can also have a maximum share set by governance, to prevent too many incentives being allocated to any one pool and ensuring a diverse range of liquidity for trading.  Currently the OSMO/ATOM pool is the only pool with a maximum set.

#### Major
Qualification for `Major` status is determined by governance based on a combination of factors, namely:
- Is the token market cap large relative to `Osmo`
- Does the majority of the trade volume happen outside of Osmosis
- Do we have a strategic interest in attracting more liquidity of this token

Currently this means that there are 4 Major tokens: `Atom`, `WETH`, `WBTC` and `Cro`

#### Categories
These determine the ratio of incentives that are allocated to each category
- Osmo/Major - 45%
- Osmo/Stable - 30%
- Osmo/Minor - 14%
- Stable/Major - 0%
- Stable/Stable - 0%
- Others - 2% - Liquidity for Minor tokens paired with non-Osmo

#### Scale Limited Adjustments
To prevent excessive volatility in the incentives APRs, these incentive targets are adjusted towards over multiple weeks, with each adjustment being limited to no more than +25% or -25%. This is somewhat disrupted as a result of normalization though, so when there are large changes in other pools, some pools might see changes in the range of +/- 30%.

#### Maturity
This adjustment scale limiting, is also partially negated during the 4 week onboarding period, where pools are expected to grow quite quickly, and so incentives need to be able to adjust quickly as well to keep up. During this period, the setting for the pool is chosen to be a weighted average between the target level and the adjustment limited by the 25% scale, with the weighting between these shifting linearly from entirely target, to entirely scale limited adjustment over the onboarding period. (ie 100% target, 75% target/25% adjustment, 50/50, 25/75, 100% adjustment)

#### Bond Duration
The above calculation determines what share of incentives go to each pool, but these shares are then further split into 3 gauges for each pool. Under current parameters, the 1day gauge receives 50%, 7day 30%, and 14day 20%. This means in effect that 100% of the incentives are available to 14 day bonders, 80% available to 7 day bonders, and only 50% available for 1 day bonders. The actual difference in APRs between bonding lengths is not this simple though, as it is heavily dependent on what percentage of the liquidity in the pool is bonded to each duration, and therefore how much competition there is within each gauge.

### Pool Onboarding
Although pools must be voted in to be onboarded to recieve Osmosis Liquidity Mining Incentives, there are ways to increase the chances of a pool being accepted.
- Propose an OSMO pool. OSMO pools have the highest chances of being onboarded. The community regularly expresses concern over incentivizing non-OSMO pools, so proposing only an OSMO pool has a better chance of being accepted. It is still somewhat common to onboard an ATOM or USDC pool, as those are common base assets on Osmosis, but pools with uncommon base assets (e.g., JUNO) probably have a low chance of being onboarded.
- Add External incentives. Pools that already have a significant amount of external incentives means that incentives will stack, and also shows that the project is serious about the pool.
- Propose well designed pools. Pools with high swap fees, high exit fees, or with extremely asymmetrical weighting can discourage trading or providing liquidity. It is probably best to stick to a standard pool design (i.e., 50/50 weighting, 0% exit fee, and <= 0.3% swap fee)
- Create a commonwealth post about the proposal before creating an on-chain proposal to give the community an opportunity to provide feedback and seek clarity. 

As an example, we can see how MARBLE was onboarded into the set of pools to receive internal Osmosis Liquidity Mining rewards: 
- See: [Commonwealth post: Signaling Proposal: Add MARBLE Incentivized Pool (#649 OSMO)](https://commonwealth.im/osmosis/discussion/3982-signaling-proposal-add-marble-incentivized-pool-649-osmo)
- See: [Osmosis Proposal #180: Signalling proposal for MARBLE/OSMO(#649) incentivized pool.](https://www.mintscan.io/osmosis/proposals/180)

## Superfluid Staking

Osmosis Superfluid Staking can further incentivize users to provide liquidity to a pool, as they'll be able to stake their LP tokens for additional rewards. The rewards from superfluid staking come from the OSMO in the pool being staked, so only OSMO pools can qualify for superfluid staking.

Currently, there is no strict criteria on which pools may have Superfluid staking enabled. The feature is enabled for certain pools via on-chain governance. The reason Osmosis hasn't simply allowed all OSMO pools to enable Superfluid staking is because any sudden extreme loss of value in an asset paired with OSMO would cause the OSMO side of the pool to shrink significantly, and this poses a risk to the security of the chain. The superfluid staked OSMO is meant to be safely staked and untouchable for at least 14-days (the duration on the unbonding period), like all staked OSMO, but if the amount of OSMO in a pool suddenly shrinks, then it essentially has the effect of releasing staked OSMO before the 14-days. This is why governance must assess whether a pool seems stable before enabling superfluid staking for it. Before being enabled for Superfluid staking, the token and project should seem legitimate to the community, have a significant amount of liquidity on Osmosis, and have been around for a decent amount of time.

There has so far been no proven way to hasten the enabling of superfluid staking for a pool, although one could always try to gather suppport from the community and then propose on-chain to enable the feature for the pool.

## Interfluid Staking

Similar to how superfluid staking stakes a portion of the OSMO in a pool, Interfluid staking stakes a portion of the pair asset (e.g., FOO) on the corresponding foreign chain (e.g., on Foochain), but this feature is not yet live on Osmosis. 
