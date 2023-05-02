---
sidebar_position: 2
---
# The OSMO Token

The OSMO token is a governance token that allows staked token holders to decide the future of the protocol, including every implementation detail. OSMO is currently used for the following (although governance is free to add or remove these functions):

## Voting
Governance is the critical component of how Osmosis evolves. Active stakeholders of the network will be responsible for proposing, vetting, and passing protocol upgrades.

The pools eligible for liquidity rewards will be selected by OSMO governance participants, allowing the stakeholders to formulate an incentivization strategy that best aligns with the long-term interests of the protocol.

## Consolidation of Liquidity
### Multihop

### Superfluid Staking

The OSMO token is also minted and burned in the context of Superfluid Staking. As a Osmosis-specific feature, Superfluid Staking provides the consensus layer more security with a sort of "Proof of Useful Stake". Each person gets an amount of Osmo representative of the value of their share of liquidity pool tokens staked and delegated to validators, resulting in the security guarantee of the consensus layer to also be based on GAMM LP shares. 

Further details can be seen in the [Superfluid module specifications](/osmosis-core/modules/superfluid/)

## TX Fees
Transaction fees are paid by any user to post a transaction on the chain. The fee amount is determined by the computation and storage costs of the transaction. Minimum gas costs are determined by the proposer of a block in which the transaction is included. This transaction fee is distributed to OSMO stakers on the network.
Validators can choose which assets to accept for fees in the blocks that they propose. This optionality is a unique feature of Osmosis.

## ProtoRev

## Fees