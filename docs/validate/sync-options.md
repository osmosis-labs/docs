---
title: Sync Options
description: Snapshot restore, state sync, and pruning vs archive configuration.
sidebar_position: 5
---

# Sync Options

A new node has to acquire the chain's state before it can validate. Syncing from genesis block by block is slow; in practice operators use a snapshot or state sync, and choose a pruning setting that matches what the node is for. This page covers the options and how to choose; for the install itself see [Install osmosisd](/validate/install-osmosisd).

:::caution Endpoints change over time
Snapshot contents and state-sync RPC servers change frequently. The snapshot providers below are current; always take the latest snapshot height from the provider's page, and confirm state-sync RPC servers before relying on them.
:::

## The options

| Option | What it does | Good for |
| --- | --- | --- |
| **Snapshot restore** | Download a recent compressed copy of the chain data and extract it | Fastest way to a working node; the common choice |
| **State sync** | Fetch a recent state snapshot from RPC peers and verify it against trusted block hashes | Minimal data transfer, no third-party archive needed |
| **Genesis sync** | Replay every block from genesis | Building an archive node, or when you need full history |

The `get.osmosis.zone` installer can set up a node from a snapshot; see [Install osmosisd](/validate/install-osmosisd).

## Pruning vs archive

`app.toml` controls how much historical state the node keeps (`pruning`). This is the single biggest determinant of disk usage:

- **Default / pruned:** keeps only recent state. Smallest disk footprint. Correct for a validator and most RPC nodes.
- **Archive (`pruning = "nothing"`):** keeps all historical state. Required for serving historical queries or taking a state export at an old height (for example, an [airdrop snapshot](/integrate/data-recipes/airdrops)). Large and growing disk footprint.

Choose pruned unless you specifically need history. Switching a node from pruned to archive later means re-syncing.

## Choosing for your use case

- **Validator:** snapshot restore + default pruning. You want to be synced and current, not serving history.
- **Public RPC / indexer:** snapshot restore, pruning sized to the queries you serve.
- **Archive (historical queries, old-height exports):** genesis sync or an archive snapshot, `pruning = "nothing"`.

## Snapshot providers

- **[snapshots.osmosis.zone](https://snapshots.osmosis.zone)**: the official Osmosis snapshots.
- **[Polkachu](https://www.polkachu.com/tendermint_snapshots/osmosis)**: community-maintained snapshots with restore instructions.

Each provider's page lists the current snapshot height, download URL, and the extract command for the latest data. Match the snapshot's pruning profile to your node's role (a pruned snapshot for a validator, an archive snapshot only if you need full history). Verify the download against the checksum the provider publishes before extracting it.

### Restoring a snapshot on a validator

Extracting a snapshot over a validator's data directory can overwrite `priv_validator_state.json` with the snapshot author's signing state. Before following a provider's restore instructions, stop the validator, preserve your own signing state, and verify the downloaded archive against the checksum published by the provider. Restore your signing state before restarting the validator.

:::danger One signer at a time
If you are migrating to a new host, the old signer must be fully stopped, not merely idle, before the new one starts. Downtime costs rewards; double-signing slashes 5% and tombstones the validator permanently.
:::

## Configuring state sync

State sync needs two things in `config.toml`: at least two trusted RPC servers for light-client verification, and a recent trust height with its block hash. The trust values go stale within the trust period, so compute them at sync time rather than copying them from anywhere.

Public RPC endpoints that serve this purpose:

- `https://rpc.osmosis.zone:443` (official)
- `https://osmosis-rpc.polkachu.com:443` (community; Polkachu also documents a dedicated [state-sync service](https://www.polkachu.com/state_sync/osmosis))
- `https://osmosis-rpc.publicnode.com:443` (community)

Endpoints change over time; confirm an endpoint responds to `/status` before relying on it.

:::caution Cross-check the trust hash
The trust height and hash are the root of trust for the whole sync. Do not take them from the same endpoint you then list as an RPC server: a single compromised endpoint could serve both the asserted root of trust and the data verified against it. Fetch the hash for your chosen height from at least two unrelated providers (or a source you already trust, such as your own archive node) and confirm they match before enabling state sync.
:::

Compute a trust height and hash a couple of thousand blocks behind the tip, then fill the `[statesync]` section:

```bash
RPC="https://rpc.osmosis.zone:443"
LATEST=$(curl -s "$RPC/status" | jq -r '.result.sync_info.latest_block_height')
TRUST_HEIGHT=$((LATEST - 2000))
TRUST_HASH=$(curl -s "$RPC/block?height=$TRUST_HEIGHT" | jq -r '.result.block_id.hash')
echo "trust_height=$TRUST_HEIGHT trust_hash=$TRUST_HASH"
```

```toml
[statesync]
enable = true
rpc_servers = "https://rpc.osmosis.zone:443,https://osmosis-rpc.polkachu.com:443"
trust_height = <TRUST_HEIGHT>
trust_hash = "<TRUST_HASH>"
trust_period = "168h0m0s"
```

The snapshots themselves arrive over P2P from peers that have snapshot serving enabled; the RPC servers are only used to verify what arrives. If discovery stalls, a snapshot restore is the more predictable path.

## Reference

- Hardware specs and installation: [Install osmosisd](/validate/install-osmosisd).
- Running a node: [Running a Node on Mainnet](/validate/joining-mainnet) / [Testnet](/validate/joining-testnet).
