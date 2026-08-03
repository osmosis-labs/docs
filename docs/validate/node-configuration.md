---
title: Node Configuration and Maintenance
description: Tuning app.toml and config.toml, and routine node maintenance.
sidebar_position: 6
---

# Node Configuration and Maintenance

A node is configured through two files in `$HOME/.osmosisd/config/`: `app.toml` (application settings) and `config.toml` (CometBFT/consensus and networking). This page covers the settings operators most often tune.

The keys below are stable, but peer and seed addresses rotate. Take those from the [Osmosis entry in the Cosmos chain registry](https://github.com/cosmos/chain-registry/blob/master/osmosis/chain.json) rather than from any hardcoded list, including the examples here.

## `app.toml`

- **`minimum-gas-prices`** is your node's own static mempool floor, not the network fee. It is separate from the [EIP-1559 style fee market](/learn/features/fee-market), which Osmosis applies independently during `CheckTx` using the live base fee (query it with `osmosisd query txfees base-fee`). v31 initializes this setting to `0uosmo`, which lets the dynamic fee do the work. Do not copy the current base fee into it: the base fee falls again after congestion, and a hardcoded elevated floor would leave your node rejecting transactions the network accepts. Set a non-zero value only as a deliberate local policy.
- **`pruning`** controls how much historical state is kept. See [Sync Options](/validate/sync-options) for pruned vs archive.
- **API and gRPC** (`[api]`, `[grpc]`) toggle the REST/gRPC endpoints. Enable only what you serve; a validator typically serves none publicly.

## `config.toml`

- **`persistent_peers` / `seeds`** define who your node connects to. `osmosisd init` writes the official Osmosis seeds (`seed.osmosis.zone:26656` and `seeds.polkachu.com:12556`). For the current full set of seeds and persistent peers, use the [Osmosis entry in the Cosmos chain registry](https://github.com/cosmos/chain-registry/blob/master/osmosis/chain.json) (its `peers` section), which is kept up to date by the community; peer addresses rotate, so prefer the registry over a hardcoded list.
- **`pex`**, **`max_num_inbound_peers` / `max_num_outbound_peers`** tune peer discovery and connection counts.
- **`[consensus]`** timeouts are network-tuned; do not change them on a validator without reason.

## Routine maintenance

- Keep the binary current with network upgrades; see [Chain Upgrades and Cosmovisor](/validate/upgrades).
- Monitor disk usage (pruned nodes still grow); see [Sync Options](/validate/sync-options).
- Watch node health and performance; see [Monitoring and Alerting](/validate/monitoring) and [Performance and Profiling](/validate/performance).
