# Governance

## Voting

Staked OSMO holders are eligible to vote on governance proposals. Browse the available proposals, and use one's staked tokens to cast a vote.

![](../assets/voting.png)

### Voting Power
Your voting power is determined by:
- Amount of "free" OSMO in your wallet
- Amount of OSMO staked by your wallet (this ***currently*** does not include Superfluid staking, that voting power is delegated to your validator)

## Creating a Proposal

Governance proposals can be added through CLI.
Proposers should use the following format when recommending allocation points for a new gauge:

```bash
osmosisd tx gov submit-proposal update-pool-incentives [gaugeIds] [weights]
```

For example, to designate 100 weight to Gauge ID 2 and 200 weight to Gauge ID 3, the following command can be used:

```
osmosisd tx gov submit-proposal update-pool-incentives 2,3 100,200
```

