---
title: Validator Security and Recovery
description: Sentry architecture, key security, and backup/disaster recovery.
sidebar_position: 9
---

# Validator Security and Recovery

Running a validator on mainnet has two failure modes that ordinary nodes do not: it can be **slashed for downtime**, and it can be **slashed for double-signing**. Double-signing slashing is severe and is the failure this page is most concerned with preventing.

:::danger Double-signing is the cardinal risk
A validator must never sign two blocks at the same height with the same key. The most common way this happens by accident is running two nodes with a copy of the same `priv_validator_key.json` (for example, a "backup" validator brought online while the primary is still running, or a restored snapshot that includes a stale `priv_validator_state.json`). Treat the validator key as singular: exactly one process may sign with it at any time.
:::

## Key security

Protect the consensus signing key. Options, in increasing robustness:

- Keep `priv_validator_key.json` on the validator host with strict file permissions (baseline).
- Use a remote signer / KMS so the key never lives on the internet-facing node. See [Using TMKMS](/validate/tmkms).

## Sentry node architecture

A sentry setup puts the validator behind one or more full nodes (sentries): the validator only peers with its sentries, and the sentries face the public network. This hides the validator's address and absorbs DDoS at the sentry layer.

<!-- TODO(operator): document the team's actual sentry topology, the firewall/peering rules, and the DDoS posture. These are deployment-specific and must be confirmed before publishing as guidance. -->

## Backup and disaster recovery

The goal of validator DR is to restore service **without double-signing**.

- **`priv_validator_state.json`** tracks the last height/round/step the validator signed. It is what prevents the node from signing the same height twice after a restart. When restoring or migrating a validator, this file's handling is critical.

:::danger
Never start a second validator from a backup while the first is still signing, and never restore an old `priv_validator_state.json` that lags the chain in a way that lets the node re-sign a height. When in doubt, the safe failure mode is downtime (cheap), not double-signing (severe).
:::

<!-- TODO(operator): document the exact backup contents, the migration/failover runbook, and how priv_validator_state.json is handled during recovery, confirmed against the team's actual procedure. This is safety-critical and must not be guessed. -->

## Reference

- Key management with a remote signer: [Using TMKMS](/validate/tmkms).
- Monitoring for missed blocks (the early downtime warning): [Monitoring and Alerting](/validate/monitoring).
