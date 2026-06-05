---
sidebar_position: 6
---

# Staking and Governance

Osmosis is a proof-of-stake chain secured by validators, and it is governed by the people who stake [OSMO](/learn/osmo). This page explains staking and governance as concepts: what staking does, what you earn and risk, and how a proposal becomes a protocol change. For what the OSMO token is and its full set of uses, see [The OSMO Token](/learn/osmo).

## Staking and delegation

Osmosis uses [proof of stake](/learn/terminology#proof-of-stake): a set of [validators](/learn/terminology#bonded-validator) produces blocks, and their influence is weighted by how much OSMO is staked to them. Most holders do not run a validator themselves; instead they [delegate](/learn/terminology#delegate) their OSMO to one. Delegating keeps your tokens in your control (the validator can never spend them) while contributing your stake's weight to that validator and the network's security.

In return for helping secure the chain, stakers earn **staking rewards**: a share of transaction fees and other distributions, minus the [commission](/learn/terminology#commission) the validator takes for running the infrastructure. Choosing a validator means weighing commission, reliability, and how much you want to support decentralization rather than concentrating stake in the largest few.

## Unbonding and slashing

Staking is not instant to reverse. When you unstake, your OSMO goes through an **unbonding period** during which it earns no rewards and cannot be transferred, before it returns to your liquid balance. This delay is what makes the security guarantee credible.

Staking also carries risk. If a validator misbehaves (for example, double-signing blocks or being offline for too long), it can be [slashed](/learn/terminology#slashing): a portion of its stake, including its delegators' stake, is destroyed. This is why the validator you delegate to matters. A well-run validator with good uptime and security protects your stake.

## Governance

Staked OSMO is also voting power. [Governance](/learn/terminology#governance) is how every meaningful change to Osmosis is decided, from protocol upgrades to which pools receive liquidity incentives to adjusting parameters.

The lifecycle of a [governance proposal](/learn/terminology#governance-proposal) is:

1. **Deposit.** A proposal must reach a minimum OSMO deposit to enter the voting period. Anyone can contribute to the deposit.
2. **Voting.** Stakers vote `Yes`, `No`, `No with veto`, or `Abstain`. Your vote is weighted by your staked OSMO. If you do not vote, your validator votes on your behalf, and you can always override your validator's vote with your own.
3. **Tally.** At the end of the voting period the result is decided by quorum (enough participation), a majority threshold, and a veto threshold. If it passes, parameter and software changes take effect per the proposal.

Because voting power comes from staked OSMO, staking and governance are two sides of the same role: securing the chain and steering it. To start, delegate your OSMO from a wallet on [app.osmosis.zone](https://app.osmosis.zone). For the operator's side (running a validator or a node), see [Validate](/validate).
