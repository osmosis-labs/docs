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

The OSMO token is also minted and burned in the context of Superfluid Staking. As a Osmosis-specific feature, Superfluid Staking provides the consensus layer more security with a sort of "Proof of Useful Stake". Each person gets an amount of Osmo representative of the value of their share of liquidity pool tokens staked and delegated to validators, resulting in the security guarantee of the consensus layer to also be based on GAMM LP shares. The process is as follows: 

- The `SuperfluidDelegate` method stores your share of bonded liquidity pool tokens, with `validateLock` as a verifier for lockup time. 
- `GetSuperfluidOsmo` mints OSMO tokens each day for delegation as a representative of the value of your pool share. This amount is minted because the staking module at the moment requires staked tokens to be in $OSMO. This amount is burned each day and re-minted to keep the representative amount of the value of your pool share accurate.
- `GetExpectedDelegationAmount` iterates over each (denom, delegate) pair and checks for how much OSMO we have delegated. The difference from the current balance to what is expected is burned / minted to match with the expected.
- A `messageServer` method executes a Superfluid delegate message. 
- `syntheticLockup` is used to index bond holders for reward distribution purposes.
- An `IntermediaryAccount` is used for the actual reward distribution. Rewards are first moved to the incentive gauges, then distributed from the gauges. In this way, we're leveraging the currently working staking liquidity reward distribution method.
- Rewards are distributed per epoch, which is currently a day. `abci.go` checks whether or not the current block is at the beginning of the epoch using `BeginBlock`.
- Superfluid staking will continue to expand based on governance proposals and votes.

For example, if Alice has 500 GAMM tokens bonded to the ATOM <> OSMO, she will have the equivalent value of OSMO minted, delegated to her chosen staker, and burned for her each day with Superfluid staking. On the user side, all she has to know is who she wants to delegate her tokens to. In order to switch delegation, she has to unbond her tokens from the pool first and then redeposit. Bob, who has a share of the same liquidity pool before Superfluid Staking went live, also has to re-deposit into the pool for the above process to kickstart.

All of this can be seen in the Osmosis Superfluid module.


