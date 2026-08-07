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

### Osmosis-specific `app.toml` settings

`osmosisd init` writes several settings on top of the standard Cosmos SDK template.

**`[osmosis-mempool]`** tunes the node's local mempool. These are CheckTx-time policies of your own node, not consensus rules:

- **`max-gas-wanted-per-tx`** (default `"60000000"`): the maximum gas any single transaction may request. Applied only in the local mempool at CheckTx.
- **`arbitrage-min-gas-fee`** (default `".1"`): the minimum gas fee any arbitrage transaction must pay, denominated in uosmo per gas. At the default, an arbitrage transaction using 1,000,000 gas costs 0.1 OSMO.
- **`min-gas-price-for-high-gas-tx`** (default `".0025"`): the minimum gas fee for any transaction with high gas demand, denominated in uosmo per gas.
- **`adaptive-fee-enabled`** (default `"true"`): enables the EIP-1559 style fee market logic in the mempool.

**IAVL keys** (top-level, Osmosis-tuned):

- **`iavl-cache-size`**: the IAVL tree cache size in number of nodes. `osmosisd` initializes it to `781250` (about 128 MB).
- **`iavl-disable-fastnode`** (default `false`): disables the IAVL fast node index when `true`.
- **`iavl-fastnode-module-whitelist`** (default `["lockup"]`): when populated (and fast nodes are not disabled), only the listed modules use fast nodes; when empty, all modules do.

**`[wasm]`** configures the CosmWasm engine:

- **`query_gas_limit`** (default `3000000`): the maximum gas a smart query contract call may use.
- **`memory_cache_size`** (default `100`): the in-memory cache for Wasm contracts, in MiB; `0` disables it.
- **`simulation_gas_limit`** (commented out by default): the maximum gas for a transaction simulation call; when unset, the consensus max block gas is used instead.

`osmosisd init` also writes `[osmosis-sqs]`, `[osmosis-indexer]`, and `[otel]` sections for the sidecar query server, indexer, and OpenTelemetry integrations; all three are disabled by default and are not needed for an ordinary node or validator.

:::note `osmosisd start` rewrites some of these values
Unless started with `--reject-config-defaults`, `osmosisd start` overwrites a small set of keys with recommended defaults on every start: `minimum-gas-prices = "0uosmo"`, `arbitrage-min-gas-fee = "0.1"`, `max-gas-wanted-per-tx = "60000000"`, and `[wasm] memory_cache_size = 1000` in `app.toml`, plus several p2p and consensus timeouts in `config.toml` (`flush_throttle_timeout = "80ms"`, `timeout_commit = "400ms"`, `timeout_propose = "1.4s"`, `peer_gossip_sleep_duration = "50ms"`). If you deliberately set one of these keys to something else, pass the flag or your edit is silently reverted at startup.
:::

## `config.toml`

- **`persistent_peers` / `seeds`** define who your node connects to. `osmosisd init` writes the official Osmosis seeds (`seed.osmosis.zone:26656` and `seeds.polkachu.com:12556`). For the current full set of seeds and persistent peers, use the [Osmosis entry in the Cosmos chain registry](https://github.com/cosmos/chain-registry/blob/master/osmosis/chain.json) (its `peers` section), which is kept up to date by the community; peer addresses rotate, so prefer the registry over a hardcoded list.
- **`pex`**, **`max_num_inbound_peers` / `max_num_outbound_peers`** tune peer discovery and connection counts.
- **`[consensus]`** timeouts are network-tuned; do not change them on a validator without reason.

## Routine maintenance

- Keep the binary current with network upgrades; see [Chain Upgrades and Cosmovisor](/validate/upgrades).
- Monitor disk usage (pruned nodes still grow); see [Sync Options](/validate/sync-options).
- Watch node health and performance; see [Monitoring and Alerting](/validate/monitoring) and [Performance and Profiling](/validate/performance).
