---
sidebar_position: 3
---

# Connect with Osmosis

Osmosis is a automated market maker blockchain. This means any IBC-enabled zone can add its token as an asset to be traded on Osmosis AMM completely permissionlessly. Because Osmosis is fundamentally designed as an IBC-native AMM that trades IBC tokens, rather than tokens issued on the Osmosis zone, there are additional nuances to understand and steps to be taken in order to ensure your asset is supported by Osmosis.

This document lays out the prerequisites and the process that is needed to ensure that your token meets the interchain UX standards set by Osmosis.

## Prerequisites
1. Zone must have IBC token transferred enabled (ICS20 standard).
2. Assets to be traded should be a fungible `sdk.Coins` asset.
3. Highly reliable, highly available altruistic (as in relay tx fees paid on behalf of user) relayer service.
4. Highly reliable, highly available, and scalable RPC/REST endpoint infrastructure.

## Enabling IBC transfers
Because only IBC assets that have been transferred to Osmosis can be traded on Osmosis, the native chain of the asset must have IBC transfers enabled. Cosmos defines the fungible IBC token transfer standard in [ICS20](https://github.com/cosmos/ibc/tree/master/spec/app/ics-020-fungible-token-transfer) specification.

At this time, only chains using Cosmos-SDK v0.40+ (aka Stargate) can support IBC transfers.

IBC transfers can be enabled:
1. as part of a software upgrade, or
2. via a `ParameterChange` governance proposal

To ensure a smooth user experience, Osmosis assumes all tokens will be transferred through a single designated IBC channel between Osmosis and the counterparty zone.

Recommended readings:
* [IBC Overview](https://ibc.cosmos.network/main/ibc/overview) - To understand IBC components, including clients, connections, proofs, paths, and channels.
* [How to Upgrade IBC Chains and their Clients](https://ibc.cosmos.network/main/ibc/upgrades/quick-guide)

### Not on a Cosmos-SDK chain?
Several intermediary chains are in use or being developed that link the IBC enabled Cosmos with other ecosystems.

For EVM chains, Osmosis [voted](https://www.mintscan.io/osmosis/proposals/206) to use [Axelar](https://axelar.network/) as its canonical bridge. This connects Osmosis to networks such as Ethereum, Avalanche, Arbitrum, Binance Smart Chain, Celo, Fantom, Polkadot and Polygon.

Any token added to the Axelar bridge is enabled for transfer to Osmosis and gains access to permissionless listing.

## Setting up and operating a relayer to Osmosis
Relayers are responsible of transferring IBC packets between Osmosis chain and the native chain of an asset. All Osmosis 'deposits' and 'withdrawals' are IBC transfers which dedicated relayers process.

To ensure fungibility amongst IBC assets, the frontend will assume social consensus have been achieved and designate one specific channel between Osmosis and the native chain as the primary channel for all IBC token transfers. Multiple relayers can be active on the same channel, and for the sake of redundancy and increased resilience we recommend having multiple relayers actively relaying packets. It is recommended to initialize the channel as an unordered IBC channel, rather than an ordered IBC channel.

Currently, there are three main Cosmos-SDK IBC relayer implementations:
* [Go relayer](https://github.com/cosmos/relayer): A Golang implementation of IBC relayer.
* [Hermes](https://hermes.informal.systems/): A Rust implementation of IBC relayer.
* [ts-relayer](https://github.com/confio/ts-relayer): A TypeScript implementation of IBC relayer.
* 
**Note: We are actively investigating issues regarding ts-relayer not working with Osmosis. In the meantime, we recommend using Hermes/Go relayer**

All relayers are compatible with IBC token transfers on the same channel. Each relayer implementation may have different configuration requirements, and have various configuration customizability.

At this time, Osmosis requires that all relayers to pay for the transaction fees for IBC relay transactions, and not the user.

If you prefer not to run your own chain's relayer to Osmosis, there may be various entities ([Cephalopod Equipment Corp.](https://cephalopod.equipment/), [Vitwit](https://www.vitwit.com/), etc) that provide relayers-as-a-service, or you may reach out to various validators in your ecosystem that may be able to operate a relayer. The Osmosis team does **not** provide relayer services for IBC assets.

## Register a bech32 Prefix onto SLIP173

CosmosSDK Chain addresses can be represented with a chain-specific string preceding a hash, which helps identify to which chain an address belongs. They are registered on [SLIP173](https://github.com/satoshilabs/slips/blob/master/slip-0173.md)

### Prerequisites

- Chain configured to use bech32 prefixes in wallet addresses
    - Note: A bech32 prefix may still be registered, even before the chain is configured to use the prefixes, but only if the configuration will happen soon.

### Requirements

- Chain data:
    - Chain name
    - Chain website
    - bech32 prefix(es)
        - Mainnet
        - Testnet (optional)
        - Regtest (optional)
        - Note: The bech32 prefix must be unique among all registered prefixes. E.g., a new mainnet prefix cannot match a prefix already registered as a testnet prefix.
- Basic understanding of GitHub, knowing how to fork, create a branch, commit changes, and submit a Pull Request

### Steps

1. Review the [SLIP173 Registry](https://github.com/satoshilabs/slips/blob/master/slip-0173.md):
2. Submit a pull request with necessary changes to the following:
    - `slip-0173.md`:
        - Add the chain name (as a link to the website) and prefix(es) into the *Registered human-readable parts* table
