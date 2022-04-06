# Liquidity Mining Incentives

There are many ways pools on Osmosis can reward liquidity mining incentives. One way is through (internal) Osmosis Liquidity Mining; Osmosis allocates 45% of its inflation to incentivize users to bond their liquidity on Osmosis. In addition, Osmosis allows for the permissionless creation of (external) liquidity mining gauges, allowing projects to add thier own rewards to further incentivize users to provide liquidity into a pool.
To learn more about Liquidity Mining on Osmosis, see: [Osmosis Docs: Develop > Modules > Incentives](https://docs.osmosis.zone/developing/modules/spec-incentives.html)

## External Incentives

External Incentives are an effective way to incentive users to provide liquidity, as well as a great way to have the pool be considered for onboarding into the set of pools receiving (internal) Osmosis Liquidity Mining incentives. Anyone can deposit tokens into a gauge to be distributed. This feature allows outside parties to augment Osmosis’ own liquidity incentive program. To learn more, see: [External Incentives](https://docs.osmosis.zone/overview/osmosis-app/learn-more.html#external-incentives).

It is possible to add incentives to any combination of 1-day, 7-day, and 14-day gauges. Incentives allocated to the 1-day gauge will be split among all three gauges. Incentives allocated to the 7-day gauge will be split among only the 7-day and 14-day gauges. Incentives allocated to the 14-day gauge will only be distributed to the 14-day gauge.

Currently, the only way to create an external incentive gauge is to run the [create-gauge command](https://docs.osmosis.zone/developing/modules/spec-incentives.html#create-gauge) using CLI.

Once external incentives have been added, note the gauge Id numbers and follow [this procedure](https://docs.osmosis.zone/integrate/frontend.html#how-to-add-external-incentive-gauges-onto-the-osmosis-pools-page) to request to show the gauges on the [Osmosis Zone Pools page](https://app.osmosis.zone/pools).

### External Incentive Matching Program

To incentivize projects to add external incentives, Osmosis voted to add the External Incentive Matching program. This change makes the incentives adjustment process  measure the total dollar value of external incentives that have been added to a pool, matches the value in OSMO, and releases that OSMO as extra liquidity mining rewards for gauges of the pool.
- See [Osmosis Proposal #47: Add Incentive Matching to Prop 13 Model](https://www.mintscan.io/osmosis/proposals/47) on Mintscan.

This has the potential to effectively double the incentive of a project's external incentives, although there are some restrictions to this:
- There is an OSMO bias that can down-scale the value of the OSMO matching. If the pool is an OSMO pool, (e.g., FOO/OSMO,) then the value of the matching is 100%. But, if the pool is a non-OSMO pool, (e.g., FOO/ATOM,) then the value of the matching is scaled down to 50% of the external incentives (subject to change if the OSMO bias changes).
	- See: [Osmosis Proposal #128: Add a bias factor to external incentive matching](https://www.mintscan.io/osmosis/proposals/128)
- There is also a cap on the value of the matching, which is no more than double the value of the standard OSMO incentives that the pool would receive from internal Osmosis Liquidity Mining.
	- See: [Osmosis Proposal #133: Incentive Matching Fee Based and 1:1 Caps](https://www.mintscan.io/osmosis/proposals/133)

Currently, it is implied that if a pool is to receive External Incentive matching, then it is also to be onboarded to receive internal Osmosis Liquidity Mining incentives.

See [Osmosis Proposal #178: Match External Incentives for SWTH/OSMO](https://www.mintscan.io/osmosis/proposals/178) for an example of a successful proposal to match external incentives to a new pool. As always, don't forget to precede on-chain proposals with a forum post to give an opportunity for the community to provide feedback. See [Commonwealth post: Signalling proposal to match OSMO rewards to upcoming SWTH/OSMO pool](https://commonwealth.im/osmosis/discussion/4025-signalling-proposal-to-match-osmo-rewards-to-upcoming-swthosmo-pool).

## Osmosis Liquidity Mining

Bonded Liquidity Gauges are mechanisms for distributing liquidity incentives to LP tokens that have been bonded for a minimum amount of time. 45% of the daily issuance of OSMO goes towards these liquidity incentives. When a new pool is onboarded to receive (internal) Osmosis Liquidity Mining incentives, it will be granted allocation points and recieve a portion of the 45% of daily OSMO issuance. See [Bonded Liquidity Gauges](https://docs.osmosis.zone/overview/osmosis-app/learn-more.html#bonded-liquidity-gauges).

Although pools must be voted in to be onboarded to recieve Osmosis Liquidity Mining Incentives, there are ways to increase the chances of a pool being accepted.
- Propose an OSMO pool. OSMO pools have the highest chances of being onboarded. The community regularly expresses concern over incentivizing non-OSMO pools, so propsing only an OSMO pool has a better chance of being accepted. It is still somewhat common to onboard an ATOM or UST pool, as those or common base assets on Osmosis, but pools with unusual base asset probably have a low chance of being onboarded.
- Add External incentives. Pools that already have a significant amount of external incentives means that incentives will stack, and also shows that the project is serious about the pool.
- Propose well designed pools. Pools with high swap fees, high exit fees, or with extremely asymmetrical weighting can be discourage trading or providing liquidity. It is probably best to stick to a standard pool design (i.e., 50/50 weighting, 0% exit fee, and <= 0.3% swap fee)
- Create a commonwealth post about the proposal before creating an on-chain proposal to give the community an opportunity to provide feedback and seek clarity. 

As an example, we can see how MARBLE was onboarded into the set of pools to receive internal Osmosis Liquidity Mining rewards: 
- See: [Commonwealth post: Signaling Proposal: Add MARBLE Incentivized Pool (#649 OSMO)](https://commonwealth.im/osmosis/discussion/3982-signaling-proposal-add-marble-incentivized-pool-649-osmo)
- See: [Osmosis Proposal #180: Signalling proposal for MARBLE/OSMO(#649) incentivized pool.](https://www.mintscan.io/osmosis/proposals/180)

## Superfluid Staking

Osmosis Superfluid Staking can further incentives users to provide liquidity to a pool and staking it for additional staking rewards. The rewards from superfluid staking come from the OSMO in the pool being staked, so only OSMO pools can qualify for superfluid staking.

Currently, there is no strict criteria on which pools may have Superfluid staking enabled. The feature is enabled for certain pools via on-chain governance. The reason Osmosis hasn't simply allowed all OSMO pools to enable Superfluid staking is because if there is a sudden extreme loss of value in an asset paired with OSMO, the OSMO side of the pool with be skrink significantly, and this poses a risk to the protocol. The superfluid staked OSMO is supposed to be safely staked and untouchable, like all staked OSMO, for at least 14-days (the duration on the unbonding period), but if the amount of OSMO in a pool suddenly shrinks then it essentially has the effect of releasing staked OSMO before the 14-days. This is why governance must assess whether a pool seems stable before enabling superfluid staking for it. The token and project should seem legitimate to the community, have significant amount of liquidity, and have been around for a decent amount of time.

There has so far been no proven way to hasten the enabling of superfluid staking for a pool, although one could always try to gather suppport from the community and then propose on-chain to enable the feature for the pool.

## Interfluid Staking

Similar to how superfluid staking stakes a portion of the OSMO in a pool, Interfluid staking stakes a portion of the pair asset (e.g., FOO) on the corresponding foreign chain (e.g., on Foochain), but this feature is not yet live on Osmosis. 
