---
sidebar_position: 5
---

# Initial Liquidity

## Options for Intial Liquidity

When integrating a new asset, Osmosis Zone recommends at least USD $1000-worth of liquidity in a pool before it is listed onto [frontier.osmosis.zone](https://frontier.osmosis.zone); there are a few ways to go about setting up the minimum liquidity requirement.

*Note that the Osmosis Foundation will **not** consider any OTC token transfers or loans*

- Add your own liquidity
	- Simply buy at least USD $500-worth of OSMO (recommended), ATOM, and/or UST to pair with USD $500-worth of the new asset to create a 50/50 pool
		- Recommended criteria for a new pool: 
			- Contains only 2 tokens
			- 50/50 weighting
			- Contains a common Base Asset (i.e., OSMO, ATOM, or UST)
			- 0.2 for OSMO pools, 0.3% swap fee for ATOM or UST pools
			- 0% exit fee
			- No future governor (set to blank (""))
			- Sufficient liquidity (at least USD $1000-worth)
	- Alternatively, find some partners who would be willing to provide the base asset (e.g., OSMO, ATOM, UST, etc.) portion of the liquidity (this is assuming you can provide the pair asset portion (i.e., the new asset))
	- Alternatively, it is possible to create an asymmetrically-weighted liquidity pool to reduce the requirement for the base asset (e.g., 80% FOO::20% OSMO). However, Osmosis Foundation recommends only creating 50/50 pools
	- See: [GAMM Module: Create pool](../../osmosis-core/modules/gamm/#create-pool) for the CLI command to create a pool
	- If the asset has already been [added onto the Osmosis Zone Frontier Assets page](../integrate/frontend.md#how-to-add-an-asset-onto-the-osmosis-assets-page), then a new pool can be created using the [Osmosis Zone Frontier Pools page](https://frontier.osmosis.zone/pools)
		- See: [Create a new pool](../../overview/getting-started.md#create-a-new-pool)
- Initiate a Liquidity Bootstrapping Pool (LBP)
	- A Liquidity Bootstrapping Pool (LBP) is a Liquidity Pool that is initiated with a phase of linear weight change.
		- Choose any starting weights (e.g., 90:10), ending weights (e.g., 50:50), and weight change duration (e.g., 3 days)
	- The primary purpose of an LBP is to be able to initiate a liquidity pool with relatively low amounts of the base asset (e.g., 10% OSMO), and high amounts on the new pair asset (e.g., 90% FOO). Throughout the weight change, as the new pair assets gets cheaper, the market is incentivized to bootstrap the pool with more of the base asset over time.
		- Because you'll be providing a low amount of the base asset (e.g., OSMO), it is expected to be able to provide a large amount of the pair asset (e.g., FOO)
		- The benefit of being able to bootstrap a liquidity pool with more of the base asset from the market comes at the cost of the GAMM/LP token losing value throughout the weight change
			- Some (unverified) examples, where the pool is intially created with a fiar price, and where the prices of the assets do not change throughout the LBP:
				- 80 FOO/20 OSMO -> 50 FOO/50 OSMO, means a 2x of the OSMO-side, but a 20% decrease in value of GAMM/LP token
				- 90 FOO/10 OSMO -> 50 FOO/50 OSMO, means a 3x of the OSMO-side, but a 40% decrease in value of GAMM/LP token
				- 95 FOO/ 5 OSMO -> 50 FOO/50 OSMO, means a ~4.36x of the OSMO-side, but a ~56.4% decrease in value of GAMM/LP token
			- Note that if the price of the pair asset (FOO) increases or decreases throughout the LBP, that can mitigate or exacerbate the loss of value of the GAMM/LP token
	- The secondary purpose of an LBP is natural price discovery for the new asset.
		- Although it can be a strategic way to establish a price for the token, an LBP is still possible to conduct with an already established price, even while arbitrage opportunities would exist. However, the GAMM/LP tokens will lose value of the duration of the weight change, and is therefore generally not recommended
	- To learn more about LBPs, see: [Learn More: Liquidity Bootstrapping Pools](../../overview/getting-started.md#liquidity-bootstrapping-pools).
	- To create an LBP, see: [Creating an LBP](../integrate/liquidity.md#creating-a-liquidity-bootstrapping-pool)
	- When creating an LBP, be sure to request the appropriate changes on the Osmosis Zone Frontier Front End to ensure the LBP page is displayed
	- Note: It is highly recommended to postpone any aridrops until after the LBP has fully completed. The potential for users dumping an airdropped token during such a sensitive phase of price discovery can significantly negatively impact the final price of the asset--much moreso than an airdrop that is released afterward.
	- Note: LBP 2.0 is still being developed, and will likely be at least a few more months before the front end interface is implemented for it
- Request a loan from the Osmosis Community Pool (OCP)
	- Osmosis has now seen a successful case of a new project propsing a loan of OSMO from the OCP, which would later be repaid in the form of the new pair token
		- The loaned OSMO was sent to a multisig wallet, added to an LBP, and then the pair asset (STARS) was repaid to the OCP by the same multisig wallet after the completion of the LBP
	- Example:
		- Stargaze Network (loaned 135,000 OSMO, repaid equivalent value of STARS)
			- On-chain Proposal: [Mintscan Osmosis Proposal 99](https://www.mintscan.io/osmosis/proposals/99)
			- Commonwealth Posts: [1](https://commonwealth.im/osmosis/discussion/2882-details-and-parameters-of-stargaze-lbp-on-osmosis), [2](https://commonwealth.im/osmosis/discussion/2494-signaling-proposal-for-osmo-for-stars-token-swap)

## Additional Liquidity

As more liquidity becomes available to users, either through mining, airdrops, or giveaways, it could be strategic to incentivize more liquidity to be added to Osmosis liquidity pools to ensure there is a healthy, consistent market for the new asset. See the [Liquidity Mining Incentives Docs page](../integrate/incentives.md) to learn more about Osmosis Liquidity Mining Rewards, External Gauge Incentives, and Superfluid Staking.

## Creating a Liquidity Bootstrapping Pool

The below is an example of the pool.json file for a [liquidity bootstrapping pool](../../overview/getting-started.md#liquidity-bootstrapping-pools).

A liquidity bootstrapping pool's weight begins at the weight set in the `weights` parameter and linearly shifts the weights until `target-pool-weights` is reached over a time period set by the `duration` parameter upon pool creation.

Typically, weights begin at an unbalanced ratio with more weight given to the token that is to be sold and shifts to a 1:1 weight (or a weight favoring the counter-party token that the pool is aiming to accrue). The changing of the weight affects the exchange price of the tokens even when the tokens within the pools remain the same. Note that linear change in weight does **not** mean linear change in price (it is highly recommend to play around with the various parameters on this [basic LBP simulator](https://docs.google.com/spreadsheets/d/1t6VsMJF8lh4xuH_rfPNdT5DM3nY4orF9KFOj2HdMmuY/edit#gid=1392289526) to make sure you understand how the pool will act with different parameters and market demand).

The pool creator can designate when the weight change begins by setting the `start-time`. While the pool will be live and available for trade at the initial `weights`, pool weight shift will not begin until `start-time` is reached.


### Example Pool Files

The following is an example of a liquidity bootstrapping pool.
The weights linearly change between the initial weights provided, and the target weights over 72 hrs (3 days)
If no start time is provided, it defaults to time the tx was successfully executed on chain.

The `pool.json` file:

```json
{
    "weights": "10akt,1atom",
    "initial-deposit": "1000akt,100atom",
    "swap-fee": "0.001",
    "exit-fee": "0.001",
    "lbp-params": {
        "duration": "72h",
        "target-pool-weights": "1akt,1atom"
    }
}
```

Instead with start time included:

```json
{
    "weights": "10akt,1atom",
    "initial-deposit": "1000akt,100atom",
    "swap-fee": "0.001",
    "exit-fee": "0.001",
    "lbp-params": {
        "duration": "72h",
        "target-pool-weights": "1akt,1atom",
        "start-time": "2006-01-02T15:04:05Z"
    }
}
```

### Example CLI TX

```
osmosisd tx gamm create-pool --pool-file="path/to/lbp-pool.json" --from myKey
```

Note: The command to create a liquidity bootstrapping pool is the same as creating a normal pool. However, if the pool has valid `lbp-params` in the pool file (json), it will be created as a liquidity bootstrapping pool.
