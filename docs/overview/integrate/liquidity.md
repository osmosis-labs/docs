---
sidebar_position: 6
---

# Source Initial Liquidity

When integrating a new asset, Osmosis Zone recommends at least USD $1000-worth of liquidity in a pool before it is listed onto [osmosis.zone](https://app.osmosis.zone). There are a few ways to go about setting up the minimum liquidity requirement.

*Note that the Osmosis Foundation will **not** consider any OTC token transfers or loans*

## Add your own liquidity
Buy at least USD $500-worth of your chosen Quote Asset (USDC, USDT, DAI, WBTC, ETH, ATOM or OSMO) to pair with USD $500-worth of the new asset to create a 50/50 pool.

Alternatively, find partners who would be willing to provide the base asset portion of the liquidity to the equivalent value of the new asset you are creating a pool for.

Alternatively, it is possible to create an asymmetrically-weighted liquidity pool to reduce the requirement for the base asset (e.g. 80% FOO::20% OSMO). However, 50/50 pools are recommended.

## Utilise StreamSwap to obtain initial liquidity
[StreamSwap](https://streamswap.io/) is a protocol built on Osmosis that allows a token to be loaded into a stream and users to subscribe by depositing a second asset in order to receive a share of the token according to the proportion of the total deposit they contributed.

The stream ends with participating users having smoothly exchanged their deposit for the streamed token and the initiating user obtaining the alternative asset that can then be used for any purpose, including as a base asset to establish a pool. 

The stream also helps to define an appropriate ratio of the two assets that should be added in order for the pool to have an equal value of each on each side of a 50:50 pool.

## Request a Loan Swap from the Osmosis Community Pool (OCP)
Osmosis has seen multiple cases of a new project proposing a loan of OSMO from the OCP, which would later be repaid in the form of the new pair token.
The process for this is still under refinement, but current standards are that OSMO would be spent into a multisig controlled by the requesting team for use as initial liquidity. After 30 days, the equivalent value of the paired token would be returned to the Osmosis Community Pool based on a Time Weighted Average Price (TWAP) of both tokens.

Stargaze Network was loaned 135,000 OSMO, repaid equivalent value of STARS
* On-chain Proposal: [Mintscan Osmosis Proposal 99](https://www.mintscan.io/osmosis/proposals/99)
* Commonwealth Posts: [Details and Parameters of Stargaze LBP on Osmosis](https://commonwealth.im/osmosis/discussion/2882-details-and-parameters-of-stargaze-lbp-on-osmosis), [Signalling proposal for OSMO for STARS Token Swap](https://commonwealth.im/osmosis/discussion/2494-signaling-proposal-for-osmo-for-stars-token-swap)

Axelar Network was loaned 741,000 OSMO, repaid equivalent value of AXL
* On-chain Proposal: [Mintscan Osmosis Proposal 332](https://www.mintscan.io/osmosis/proposals/332)
* Commonwealth Post: [Proposal for Loan Swap of OSMO to Axelar](https://commonwealth.im/osmosis/discussion/6875-proposal-for-loan-swap-of-osmo-to-axelar)

## Request a Token Swap from the Osmosis Community Pool
If your token has comparable inflation rates to that of OSMO then a direct swap could be used for both parties to establish Protocol Owned Liquidity to establish liquidity whilst maintaining value.

WYND Protocol swapped 26,000 OSMO for the equivalent value of WYND shortly after launch to establish functional liquidity on both DEXs.
* On-chain Proposal: [Mintscan Osmosis Proposal 420](https://www.mintscan.io/osmosis/proposals/420)
* Commonwealth Post: [OSMO WYND Token Swap for Protocol Liquidity](https://commonwealth.im/osmosis/discussion/9620-osmowynd-token-swap-for-protocol-liquidity)

Regen Network worked with the Osmosis Community to swap ~133,000 OSMO for ~53,000 NCT and establish the Carbon market on Osmosis
* On-chain Proposal: [Establish Carbon Market on Osmosis](https://www.mintscan.io/osmosis/proposals/182)
* Commonwealth Post: [Osmosis Carbon Market with Regen Network](https://commonwealth.im/osmosis/discussion/3936-proposal-osmosis-carbon-market-with-regen-network)

# Additional Liquidity

As more liquidity becomes available to users, either through mining, airdrops, or giveaways, it could be strategic to incentivize more liquidity to be added to Osmosis liquidity pools to ensure there is a healthy, consistent market for the new asset. See the [Liquidity Incentives Docs page](../integrate/incentives.md) to learn more about how you can .