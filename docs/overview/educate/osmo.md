---
sidebar_position: 2
---
# The OSMO Token

The OSMO token is a governance token that allows staked token holders to decide the future of the protocol, including every implementation detail. OSMO is currently used for the following (although governance is free to add or remove these functions):

## Voting
Governance is the critical component of how Osmosis evolves. Active stakeholders of the network will be responsible for proposing, vetting, and passing protocol upgrades.

The pools eligible for liquidity rewards are selected by OSMO governance participants, allowing the stakeholders to formulate an incentivization strategy that best aligns with the long-term interests of the protocol.

## Transaction Fees
Transaction fees are paid by any user to post a transaction on the chain. The fee amount is determined by the computation and storage costs of the transaction. Minimum gas costs are determined by the proposer of a block in which the transaction is included. This transaction fee is distributed to OSMO stakers on the network.
Validators can choose which assets to accept for fees in the blocks that they propose, but all accepted assets are converted to OSMO before distribution.

## ProtoRev
The ProtoRev module mints and burns the OSMO token in order to perform privileged arbitrage transactions on chain to ensure prices are balanced across liquidity sources on chain.
No use for this revenue has currently been decided, but will be allocated by governance in the future.
Protocol Revenue collected so far is currently stored in the [module address](https://www.mintscan.io/osmosis/account/osmo17qdmjdumw4xawam4g46gtwzle5rd4zwyfqvvza)

## Taker Fees
Osmosis charges a small taker fee on all trades with a 0.1% default.
Several routes have reductions or exemptions and these are managed by the [Protocol Fee Controller](https://daodao.zone/dao/osmo162wk8qc3w5s9hfs8dm76wrqnk6fjmsez2t4kk6zyugmrlzgds8sqfesmlm) subDAO.
Taker fees are collected in the Quote asset involved in the trade. All OSMO collected is distributed to stakers. Non-OSMO collected is divided, with 33% going to the Community Pool and 67% being converted to OSMO before being distributed to stakers.

## Superfluid Staking
The OSMO token is also minted and burned in the context of Superfluid Staking. As a Osmosis-specific feature, Superfluid Staking provides the consensus layer more security with a sort of "Proof of Useful Stake". Each person gets an amount of OSMO representative of the value of their share of liquidity pool tokens staked and delegated to validators, resulting in the security guarantee of the consensus layer to also be based on GAMM LP shares. This is available in pools that contain OSMO in the pairing and have had this feature enabled by governance.

Further details can be seen in the [Superfluid module specifications](/osmosis-core/modules/superfluid/)

## Other Fees
The OSMO token is required as fees for several tasks on chain to prevent spam and encourage considered usage of features. All fees paid go to the Community Pool.

* Adding External Incentives to a pool: 50 OSMO
* Topping up External Incentives on an existing stream: 25 OSMO
