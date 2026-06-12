---
title: Sync Options
description: Snapshot restore, state sync, and pruning vs archive configuration.
sidebar_position: 5
---

# Sync Options

A new node has to acquire the chain's state before it can validate. Syncing from genesis block by block is slow; in practice operators use a snapshot or state sync, and choose a pruning setting that matches what the node is for. This page covers the options and how to choose; for the install itself see [Install osmosisd](/validate/install-osmosisd).

:::caution Operator verification required
The recommended snapshot providers, their URLs, and the current state-sync RPC servers change over time. Confirm the current sources before using them. The mechanisms below are stable; the specific endpoints are not.
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

<!-- TODO(operator): list the current recommended snapshot provider(s) and URLs, and the current state-sync RPC servers, once confirmed. -->

## Reference

- Hardware specs and installation: [Install osmosisd](/validate/install-osmosisd).
- Running a node: [Running a Node on Mainnet](/validate/joining-mainnet) / [Testnet](/validate/joining-testnet).
