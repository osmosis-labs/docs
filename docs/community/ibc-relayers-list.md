---
description: Where to find the relayers connecting Osmosis to the interchain.
title: IBC Relayers
sidebar_position: 4
---

# IBC Relayers

Osmosis is connected to the rest of the interchain by IBC relayers: independent operators that watch for outbound packets on one chain and submit them on the other. Relaying is permissionless, so the active set changes continuously and is not centrally registered.

## Finding active relayers

Rather than a hand-maintained directory (which goes stale quickly as operators and channels change), use live sources:

- **[Mintscan's relayers view](https://www.mintscan.io/osmosis/relayers)** shows live relaying activity per channel pair (transaction counts and volume), though it does not name the operator behind each relayer address.
- **[Cosmos chain registry](https://github.com/cosmos/chain-registry/blob/master/osmosis/chain.json)** lists the canonical peers and the [IBC channel definitions](https://github.com/cosmos/chain-registry/tree/master/_IBC) between Osmosis and each counterparty chain.
- **[Map of Zones](https://mapofzones.com/zones/osmosis-1)** visualizes Osmosis's IBC connections and relative transfer volume across the interchain.

No public dashboard currently names the operator behind each relayer address. Hermes lets operators set an identifying transaction memo, and many do, so inspecting a relayer's recent transactions on an explorer is usually the quickest way to attribute one.

## Running a relayer

If you want to relay for Osmosis yourself, the maintained production implementation is [Hermes](https://hermes.informal.systems/) (Rust, maintained by Informal Systems); the [Go relayer](https://github.com/cosmos/relayer) still works but its repository is archived and no longer maintained. Both read channel and chain metadata from the chain registry. Coordinate with other operators in the [Osmosis Discord](https://discord.com/invite/osmosis).

## Reference

- [Joining Mainnet](/validate/joining-mainnet): running an Osmosis node, the prerequisite for relaying.
- [Relayer guide](/validate/relayer-guide): operational guidance for relaying with Osmosis.
