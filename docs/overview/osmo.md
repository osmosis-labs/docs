# OSMO

## Purpose

The OSMO token is a governance token that allows staked token holders to decide the future of the protocol, including every implementation detail. OSMO will initially be used for the following (although governance is free to add or remove these functions):

- Voting on protocol upgrades
- Allocating liquidity mining rewards for bonded liquidity gauges
- Setting the base network swap fee

Governance is the critical component of how Osmosis evolves. Active stakeholders of the network will be responsible for proposing, vetting, and passing protocol upgrades.

The pools eligible for liquidity rewards will be selected by OSMO governance participants, allowing the stakeholders to formulate an incentivization strategy that best aligns with the long-term interests of the protocol.

While OSMO will initially function as both a governance token and a staking token, Osmosis intends to transition into a Cosmos Hub shared security zone as soon as the feature is ready.

## Superfluid Staking

The OSMO token is also minted and burned in the context of Superfluid Staking. As a Osmosis-specific feature, Superfluid Staking provides the consensus layer more security with a sort of "Proof of Useful Stake". Each person gets an amount of Osmo representative of the value of their share of liquidity pool tokens staked and delegated to validators, resulting in the security guarantee of the consensus layer to also be based on GAMM LP shares. 

Further details can be seen in the [Superfluid module specifications](../developing/osmosis-core/modules/spec-superfluid.md)


