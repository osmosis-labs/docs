---
description: How Osmosis uses IBC to move assets across the interchain.
title: IBC Protocol
sidebar_position: 7
---

# Inter-Blockchain Communication Protocol (IBC)

The Inter-Blockchain Communication Protocol (IBC) is how sovereign blockchains move tokens and data between each other in a trust-minimized way. It is the foundation of the interchain, and it is how almost every asset on Osmosis arrives here. This page covers what IBC is and how Osmosis uses it; for the protocol internals, see the [Cosmos IBC documentation](https://ibc.cosmos.network/).

## How IBC works

IBC is a standardized protocol for authenticating and transporting packets between two chains. Unlike a trusted bridge, it does not introduce a third-party validator set: each chain runs a light client of the other and verifies the counterparty's consensus directly, so the security of an IBC transfer reduces to the security of the two chains involved.

The protocol is structured in two layers:

- **Transport (TAO):** establishes clients, connections, and channels, and authenticates the packets sent over them.
- **Application:** defines how a packet's contents are encoded and interpreted. Token transfers use the ICS-20 application; other applications carry arbitrary data (for example, [IBC hooks](/learn/features/ibc-hooks) trigger a contract call on arrival).

Because it is a standard rather than a Cosmos-specific feature, IBC can be implemented on any chain whose consensus a light client can verify.

## IBC assets on Osmosis

When an asset is transferred to Osmosis over IBC, it takes on an **IBC denomination** of the form `ibc/<HASH>`, derived from the channel path it travelled. The channel identifies the chain the asset came from: for example, ATOM from the Cosmos Hub arrives over `channel-0`. Always match assets on the full `ibc/<HASH>` denom, since the same symbol (for example, multiple bridged versions of USDC) can map to different denoms.

For the live list of supported assets and their channels, see the [IBC Channels](/integrate/channels) page. Several bridged versions of the same underlying asset can be unified into a single tradable denom; see [Alloyed Assets](/learn/features/alloyed-assets).

## Relaying

Chains do not push IBC packets to each other directly. A **relayer** is an off-chain process that watches for packets on open channels and submits them, along with the proofs the receiving chain's light client needs to verify them. Relayers are permissionless: anyone can run one, and they can also open new paths by creating clients, connections, and channels. For running relaying infrastructure, see the [Relayer Guide](/validate/relayer-guide).
