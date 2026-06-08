---
description: How assets reach Osmosis over IBC and where to find channel and denom mappings.
title: IBC Channels
sidebar_position: 4
---

# IBC Channels

Assets reach Osmosis over IBC transfer channels, one per connected counterparty chain. A channel is identified by a pair of IDs (for example `channel-0` on Osmosis maps to `channel-141` on the Cosmos Hub), and the channel an asset arrives on is part of what makes its IBC denom unique.

Osmosis connects to dozens of chains and the channel set changes over time, so this page does not maintain a static table. The canonical, always-current mapping of chains, channels, and IBC denoms lives in the Cosmos Chain Registry and the Osmosis assetlists:

- **Chain Registry** (`cosmos/chain-registry`): the source of truth for chain metadata and IBC connections, at [github.com/cosmos/chain-registry](https://github.com/cosmos/chain-registry). See each chain's `chain.json` and the `_IBC/` folder for channel pairs.
- **Osmosis assetlists** (`osmosis-labs/assetlists`): the registered assets shown on the Osmosis frontend, with their IBC denoms and source channels, at [github.com/osmosis-labs/assetlists](https://github.com/osmosis-labs/assetlists).

To verify the channel and base denom behind a specific IBC asset on a running node, query its denom trace:

```sh
osmosisd query ibc-transfer denom-trace <hash>
```

where `<hash>` is the part after `ibc/` in the asset's denom.
