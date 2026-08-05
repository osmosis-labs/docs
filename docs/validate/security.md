---
title: Validator Security and Recovery
description: Sentry architecture, key security, and backup/disaster recovery.
sidebar_position: 9
---

# Validator Security and Recovery

Running a validator on mainnet has two failure modes that ordinary nodes do not: it can be **jailed for downtime**, and it can be **slashed for double-signing**. The two penalties are not equivalent, and the difference matters when you decide how to run your setup.

On mainnet at the time of writing, `slash_fraction_downtime` is `0`: missing too many blocks in the signing window jails the validator and costs it rewards while jailed, but does not slash stake. Double-signing is slashed at 5% (`slash_fraction_double_sign`) and tombstones the validator. Both are governance-mutable, so query the live values rather than trusting a figure in docs:

```bash
osmosisd query slashing params
```

Double-signing is the severe, irreversible failure, and it is what this page is most concerned with preventing.

:::danger Double-signing is the cardinal risk
A validator must never sign two blocks at the same height with the same key. The most common way this happens by accident is running two nodes with a copy of the same `priv_validator_key.json` (for example, a "backup" validator brought online while the primary is still running, or a restored snapshot that includes a stale `priv_validator_state.json`). Treat the validator key as singular: exactly one process may sign with it at any time.
:::

## The keys a validator has

Four separate things get called "the validator key," and they have different jobs and different protections. Confusing them is how operators end up protecting one and losing another.

| Key | What it does | If it leaks |
| -- | -- | -- |
| **Consensus key** (`priv_validator_key.json`) | Signs blocks. This is the key TMKMS protects. | An attacker can double-sign and get you slashed and tombstoned. |
| **Operator account** (`osmo1...` in your keyring) | Sends validator transactions: create/edit validator, unjail, withdraw commission, and it holds your self-delegation. | An attacker can move your funds and change or unbond your validator. TMKMS does not protect this. |
| **Node identity key** (`node_key.json`) | Identifies the node to peers on the p2p network. | Peer impersonation. Not fund-bearing, but do not share it between nodes. |
| **TMKMS key material** | Whatever backs your remote signer (softsign file, HSM, YubiHSM). | Equivalent to the consensus key leaking. |

## Consensus key security

Protect the consensus signing key. Options, in increasing robustness:

- Keep `priv_validator_key.json` on the validator host with strict file permissions (baseline).
- Use a remote signer / KMS so the key never lives on the internet-facing node. See [Using TMKMS](/validate/tmkms).

## Operator account security

The operator account is a separate risk from the consensus key, and a remote signer does nothing for it. It authorizes validator transactions and holds your self-delegation, so treat it as a high-value wallet rather than an operational convenience:

- Keep it out of the validator host's keyring where practical. Sign validator transactions from a machine that is not the one exposed to the p2p network.
- Use a hardware wallet or an offline keyring for it, and back up its mnemonic the way you would any custodial key.
- Losing it means losing the ability to edit, unjail, or withdraw from your validator. Leaking it means someone else can.

## Sentry node architecture

A sentry setup puts the validator behind one or more full nodes (sentries): the validator only peers with its sentries, and the sentries face the public network. This hides the validator's address and absorbs DDoS at the sentry layer. The specific topology, peering rules, and firewalling are deployment decisions each operator makes for their own infrastructure.

## Backup and disaster recovery

The goal of validator DR is to restore service **without double-signing**.

- **`priv_validator_state.json`** tracks the last height/round/step the validator signed. It is what prevents the node from signing the same height twice after a restart. When restoring or migrating a validator, this file's handling is critical.

:::danger
Never start a second validator from a backup while the first is still signing, and never restore an old `priv_validator_state.json` that lags the chain in a way that lets the node re-sign a height. When in doubt, the safe failure mode is downtime (cheap), not double-signing (severe).
:::

Your backup should cover `priv_validator_key.json`, the node key, and your configuration; your failover procedure is your own, but it must respect the rule above: stop the old signer fully before the replacement signs.

## Querying the live parameters

Every figure that governs jailing, slashing, and unbonding is governance-mutable, so read it from the chain rather than from documentation:

```bash
# Jailing and slashing: signed_blocks_window, min_signed_per_window,
# downtime_jail_duration, slash_fraction_downtime, slash_fraction_double_sign
osmosisd query slashing params

# Active set size, unbonding period, bond denom
osmosisd query staking params

# Your own signing info: missed blocks, jailed status, tombstoned
osmosisd query slashing signing-info $(osmosisd tendermint show-validator)
```

At the time of writing the active set is the top 70 validators and the unbonding period is 14 days, but treat both as values to check rather than constants.

## Reference

- Key management with a remote signer: [Using TMKMS](/validate/tmkms).
- Monitoring for missed blocks (the early downtime warning): [Monitoring and Alerting](/validate/monitoring).
