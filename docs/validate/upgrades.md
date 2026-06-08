---
title: Chain Upgrades and Cosmovisor
description: Handle network upgrades automatically with Cosmovisor.
sidebar_position: 4
---

# Chain Upgrades and Cosmovisor

Osmosis upgrades through governance: a software-upgrade proposal sets an upgrade height, and at that height every node must switch to the new `osmosisd` binary. If your node is still running the old binary at the upgrade height, it halts. [Cosmovisor](https://docs.cosmos.network/main/build/tooling/cosmovisor) automates the binary swap so you do not have to be awake at the block.

:::caution Operator verification required
The upgrade-height procedure, the exact binary versions, and the recovery steps for a missed upgrade are network- and release-specific. Confirm the current values for each upgrade against the [Osmosis releases](https://github.com/osmosis-labs/osmosis/releases) page and the governance proposal before acting. The commands below are the general Cosmovisor pattern, not a substitute for the per-upgrade instructions.
:::

## How an upgrade works

1. A software-upgrade proposal passes governance, naming an upgrade **name** and a target **height**.
2. The chain runs normally until that height.
3. At the height, the node needs the new binary. Cosmovisor detects the upgrade and swaps the binary automatically; a manually-run node must be stopped and restarted on the new binary by the operator.

## Cosmovisor layout

Cosmovisor expects binaries under a directory structure rooted at `DAEMON_HOME` (typically `~/.osmosisd`):

```
$DAEMON_HOME/cosmovisor/
  genesis/bin/osmosisd            # the current binary
  upgrades/<upgrade-name>/bin/osmosisd   # the binary for each named upgrade
```

The key environment variables:

```bash
export DAEMON_NAME=osmosisd
export DAEMON_HOME=$HOME/.osmosisd
export DAEMON_ALLOW_DOWNLOAD_BINARIES=false   # pre-stage binaries yourself for production
export DAEMON_RESTART_AFTER_UPGRADE=true
```

:::caution
`DAEMON_ALLOW_DOWNLOAD_BINARIES=true` lets Cosmovisor auto-download the upgrade binary from the proposal's metadata. For a production validator, prefer `false` and pre-stage the verified binary into `upgrades/<name>/bin/` yourself, so you are not trusting a download at the upgrade height. Confirm the binary checksum against the release.
:::

## Preparing for an upgrade

1. When a software-upgrade proposal passes, note the **upgrade name** and **height**.
2. Build or download the new `osmosisd` for that release (verify the version against the [releases page](https://github.com/osmosis-labs/osmosis/releases)).
3. Place it at `$DAEMON_HOME/cosmovisor/upgrades/<upgrade-name>/bin/osmosisd`.
4. Confirm Cosmovisor is the process supervising your node (typically under systemd).

At the upgrade height Cosmovisor stops the node, swaps to the staged binary, and restarts.

## Recovering from a missed upgrade

If the node halted because the new binary was not staged, install the correct binary and restart. <!-- TODO(operator): document the exact recovery steps and any state-handling caveats for Osmosis specifically. -->

## Reference

- Cosmovisor: [Cosmos SDK docs](https://docs.cosmos.network/main/build/tooling/cosmovisor).
- Osmosis releases and upgrade tags: [github.com/osmosis-labs/osmosis/releases](https://github.com/osmosis-labs/osmosis/releases).
