---
title: Governance Participation
description: How to discuss, vote on, and submit Osmosis governance proposals.
sidebar_position: 1
---

# Governance Participation

Osmosis is governed by its stakers. Anyone who stakes OSMO can vote on proposals, and proposals decide everything from parameter changes to software upgrades to treasury spending. This page is about participating in that process; for what OSMO is and how staking works, see [The OSMO Token](/learn/osmo).

## How a proposal moves

1. **Discussion.** Ideas are usually socialized in the community before going onchain, so they arrive at a vote already refined. <!-- TODO(community): link the canonical discussion venue (forum / Discord governance channel) once confirmed. -->
2. **Onchain proposal.** The proposal is submitted onchain with a deposit. Once the minimum deposit is met, it enters the voting period.
3. **Voting period.** Stakers vote `Yes`, `No`, `No with veto`, or `Abstain`. Voting power is proportional to staked OSMO.
4. **Outcome.** If quorum is met and the proposal passes, it executes (a parameter change applies, an upgrade is scheduled, funds are released).

If you do not vote yourself, your stake inherits your validator's vote unless you override it.

## How to vote

- **Web:** vote from the Osmosis interface or a governance dashboard with a connected wallet. <!-- TODO(community): link the canonical voting UI once confirmed. -->
- **CLI:** vote with `osmosisd`:

```bash
osmosisd tx gov vote <proposal-id> yes --from <key> --chain-id osmosis-1
```

See the [CLI guide](/build/developer-environment/cli) for setup.

## Submitting a proposal

A proposal needs a clear rationale, the onchain message it executes (for parameter or upgrade proposals), and a deposit. Socialize it in the community first; a proposal that arrives at a vote without prior discussion usually fails. <!-- TODO(community): link the proposal templates / submission guide and the current deposit + voting-period parameters once confirmed. -->

## Where to engage

<!-- TODO(community): list the canonical governance venues (forum URL, Discord governance channel, any working-group calls) once confirmed. Do not list placeholder links. -->

## Reference

- [The OSMO Token](/learn/osmo): tokenomics, staking, and the role of OSMO in governance.
