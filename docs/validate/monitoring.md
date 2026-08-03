---
title: Monitoring and Alerting
description: Prometheus metrics and alerting for a production validator.
sidebar_position: 7
---

# Monitoring and Alerting

A production validator needs continuous monitoring, not just one-off diagnosis. This page covers the ongoing metrics-and-alerts setup; for one-time profiling of a slow node, see [Performance and Profiling](/validate/performance).

## Prometheus metrics

CometBFT exposes Prometheus metrics. Enable them in `config.toml`:

```toml
[instrumentation]
prometheus = true
# Bind to loopback or a private interface, not every interface.
prometheus_listen_addr = "127.0.0.1:26660"
```

A bare `:26660` listens on every interface. Bind the metrics endpoint to loopback (scraping locally) or to a private interface reachable only by your Prometheus host, and firewall the port otherwise. Metrics leak operational detail about your node and are not something to serve publicly.

The node then serves metrics at that port for a Prometheus scraper. From there, Grafana dashboards visualize them and Alertmanager (or your alerting stack) fires on thresholds.

## What to alert on

The signals that matter most for a validator:

- **Missed blocks / not signing.** The earliest warning that something is wrong; a sustained miss gets the validator jailed for downtime (and costs rewards while jailed). See [Validator Security](/validate/security) for how downtime and double-sign penalties differ, and how to query the live values.
- **Block height stalled or falling behind peers.** The node is stuck or out of sync.
- **Peer count dropping toward zero.** Networking or connectivity failure.
- **Disk filling up.** A pruned node still grows; running out of disk halts the node.
- **Sentry/validator connectivity** (if using a sentry architecture); see [Validator Security](/validate/security).
- **Clock skew.** CometBFT rejects blocks whose timestamps fall outside an acceptable window, so a drifting clock can take a validator out of consensus. Run `ntpd` or `chrony` and alert on offset.

## The metrics to use

CometBFT exports these under the `cometbft_` prefix. The ones worth building alerts on:

| Metric | Use |
| -- | -- |
| `cometbft_consensus_validator_last_signed_height` | The height you last signed. Compare it against current height to detect that you have stopped signing. |
| `cometbft_consensus_validator_missed_blocks` | Missed-block counter for your validator. |
| `cometbft_consensus_height` | The node's current consensus height. Flat means stalled. |
| `cometbft_consensus_latest_block_height` | Latest known block height. |
| `cometbft_consensus_block_interval_seconds` | Time between blocks; rising means the chain or your node is struggling. |
| `cometbft_consensus_validators_power` / `cometbft_consensus_validator_power` | Total and your own voting power, for confirming you are in the active set. |
| `cometbft_consensus_byzantine_validators` | Non-zero indicates equivocation evidence in blocks. |
| `cometbft_p2p_peers` | Connected peer count. |

Example alert expressions, as starting points to tune against your own baseline:

```promql
# Not signing: last signed height falling behind the chain.
cometbft_consensus_height - cometbft_consensus_validator_last_signed_height > 50

# Height not advancing for two minutes.
increase(cometbft_consensus_height[2m]) == 0

# Peers dropping toward zero.
cometbft_p2p_peers < 5

# Missed blocks accelerating.
increase(cometbft_consensus_validator_missed_blocks[10m]) > 10
```

Size the missed-block thresholds against the live liveness window rather than these numbers: jailing depends on `signed_blocks_window` and `min_signed_per_window`, which you can read with `osmosisd query slashing params`. With a large window, a slow leak of missed blocks matters as much as a short outage.

Whatever alerting stack you use, test the notification path deliberately (fire a synthetic alert and confirm it reaches a human). An untested alerting path is indistinguishable from a healthy validator.

## Reference

- One-time profiling and diagnosis: [Performance and Profiling](/validate/performance).
- CometBFT instrumentation: the `[instrumentation]` section of `config.toml`.
