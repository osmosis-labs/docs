---
title: Governance Participation
description: How to discuss, vote on, and submit Osmosis governance proposals.
sidebar_position: 1
---

# Governance Participation

Osmosis is governed by its stakers. Anyone who stakes OSMO can vote on proposals, and proposals decide everything from parameter changes to software upgrades to treasury spending. This page is about participating in that process; for what OSMO is and how staking works, see [The OSMO Token](/learn/osmo).

## How a proposal moves

The lifecycle follows the canonical Forum, Deposit, Voting, Tally, Execute flow (see [Staking and Governance](/learn/staking-and-governance) for the conceptual version):

1. **Forum.** Ideas are socialized on the [governance forum](https://forum.osmosis.zone) before going onchain, with a minimum discussion period of three days for the community to review and give feedback. This refines the proposal so it arrives at a vote already vetted. <!-- TODO(community): add the Discord governance channel once confirmed. -->
2. **Deposit.** The proposal is submitted onchain and stays in a deposit period until it reaches the minimum deposit, then advances to voting.
3. **Voting period.** Stakers vote `Yes`, `No`, `No with veto`, or `Abstain`. Voting power is proportional to staked OSMO.
4. **Tally.** When the voting period ends, votes are tallied against quorum, threshold, and veto.
5. **Execute.** If the proposal passes, it executes: a parameter change applies, an upgrade is scheduled, or funds are released.

If you do not vote yourself, your stake inherits your validator's vote unless you override it.

## How to vote

- **Web:** vote from the Osmosis interface or a governance dashboard with a connected wallet. <!-- TODO(community): link the canonical voting UI once confirmed. -->
- **CLI:** vote with `osmosisd`:

```bash
osmosisd tx gov vote <proposal-id> yes --from <key> --chain-id osmosis-1
```

See the [CLI guide](/build/developer-environment/cli) for setup.

## Submitting a proposal

A proposal needs a clear rationale, the onchain message it executes (for parameter or upgrade proposals), and a deposit. The minimum deposit to enter the voting period is 6000 OSMO for a standard proposal and 20000 OSMO for an expedited one. Socialize it on the forum first (the three-day minimum discussion period above applies); a proposal that arrives at a vote without prior discussion usually fails. <!-- TODO(community): link the proposal templates / submission guide once confirmed. -->

## Where to engage

- [Osmosis governance forum](https://forum.osmosis.zone): propose and discuss proposals before they go onchain.

<!-- TODO(community): add the Discord governance channel and any working-group calls once confirmed. -->

## Reference

- [Staking and Governance](/learn/staking-and-governance): how staking and voting power work conceptually.
- [Gov module](/build/chain/gov): the chain module that implements proposals, deposits, and tallying, with the CLI for each proposal type.
- [The OSMO Token](/learn/osmo): tokenomics, staking, and the role of OSMO in governance.
