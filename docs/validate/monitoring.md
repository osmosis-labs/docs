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
prometheus_listen_addr = ":26660"
```

The node then serves metrics at that port for a Prometheus scraper. From there, Grafana dashboards visualize them and Alertmanager (or your alerting stack) fires on thresholds.

## What to alert on

The signals that matter most for a validator:

- **Missed blocks / not signing.** The earliest warning that something is wrong; a sustained miss leads to downtime slashing.
- **Block height stalled or falling behind peers.** The node is stuck or out of sync.
- **Peer count dropping toward zero.** Networking or connectivity failure.
- **Disk filling up.** A pruned node still grows; running out of disk halts the node.
- **Sentry/validator connectivity** (if using a sentry architecture); see [Validator Security](/validate/security).

<!-- TODO(operator): link the team's standard Grafana dashboards / alert rules and any hosted monitoring once confirmed. -->

## Reference

- One-time profiling and diagnosis: [Performance and Profiling](/validate/performance).
- CometBFT instrumentation: the `[instrumentation]` section of `config.toml`.
