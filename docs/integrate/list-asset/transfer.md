---
description: Connect your asset to Osmosis over an IBC transfer channel.
sidebar_position: 3
---

# Connect with Osmosis

Osmosis is a automated market maker blockchain. This means any IBC-enabled zone can add its token as an asset to be traded on Osmosis AMM completely permissionlessly. Because Osmosis is fundamentally designed as an cross-chain AMM that trades tokens issued on the Osmosis chain as well as across IBC and other bridges, there are additional nuances to understand and steps to be taken in order to ensure your asset is supported by Osmosis.

This document lays out the prerequisites and the process that is needed to ensure that your token meets the interchain UX standards set by Osmosis. This primarily refers to tokens that are connecting via IBC. Alternative bridges may have their own permissioned transfer methods.

## Prerequisites
1. Zone must have IBC token transferred enabled (ICS20 standard) or reach Osmosis via a contract mint for alternative bridges.
2. The asset must be fungible. Osmosis trades fungible tokens, and the asset reaches Osmosis as an IBC, tokenfactory, or bridged denom regardless of its source type (the Cosmos Chain Registry classifies assets as `sdk.coin`, `cw20`, `erc20`, `ics20`, and others). Non-fungible assets cannot be traded on the AMM.
3. Highly reliable, highly available altruistic (as in relay tx fees paid on behalf of user) relayer service.
4. Highly reliable, highly available, and scalable RPC/REST endpoint infrastructure.

## Enabling IBC transfers
Because only assets that have been transferred to Osmosis can be traded on Osmosis, the native chain of the asset must have IBC transfers enabled. Cosmos defines the fungible IBC token transfer standard in [ICS20](https://github.com/cosmos/ibc/tree/master/spec/app/ics-020-fungible-token-transfer) specification.

The counterparty chain must support IBC transfers (any IBC-enabled Cosmos chain does).

IBC transfers can be enabled:
1. as part of a software upgrade, or
2. via a `ParameterChange` governance proposal

To ensure a smooth user experience, Osmosis assumes all tokens will be transferred through a single designated IBC channel between Osmosis and the counterparty zone.

Recommended readings:
* [IBC Overview](https://ibc.cosmos.network/main/ibc/overview) - To understand IBC components, including clients, connections, proofs, paths, and channels.
* [How to Upgrade IBC Chains and their Clients](https://ibc.cosmos.network/main/ibc/upgrades/quick-guide)

### Not on a Cosmos-SDK chain?
Assets from non-Cosmos ecosystems (such as EVM chains) reach Osmosis through bridges rather than a direct IBC connection. Osmosis supports several bridge providers, including [Axelar](https://axelar.network/) (adopted via [Proposal 206](https://www.mintscan.io/osmosis/proposals/206)), Squid, Wormhole, and others, which between them cover Ethereum and other major networks.

A token bridged in this way arrives on Osmosis as a fungible denom and can then be listed and traded like any other asset.

## Setting up and operating a relayer to Osmosis
Relayers are responsible of transferring IBC packets between Osmosis chain and the native chain of an asset. All Osmosis 'deposits' and 'withdrawals' are IBC transfers which dedicated relayers process.

To ensure fungibility amongst IBC assets, the frontend will assume social consensus have been achieved and designate one specific channel between Osmosis and the native chain as the primary channel for all IBC token transfers. Multiple relayers can be active on the same channel, and for the sake of redundancy and increased resilience we recommend having multiple relayers actively relaying packets. It is recommended to initialize the channel as an unordered IBC channel, rather than an ordered IBC channel.

The two actively maintained Cosmos-SDK IBC relayer implementations are:
* [Hermes](https://hermes.informal.systems/): a Rust implementation of an IBC relayer.
* [Go relayer](https://github.com/cosmos/relayer) (`rly`): a Go implementation of an IBC relayer.

Both are compatible with IBC token transfers on the same channel. Each relayer implementation may have different configuration requirements, and have various configuration customizability.

At this time, Osmosis requires that all relayers to pay for the transaction fees for IBC relay transactions, and not the user.

If you prefer not to run your own chain's relayer to Osmosis, [Solva](https://solva.solutions/) provides relaying-as-a-service and is a good first point of contact. Other providers exist, and you can also reach out to validators in your ecosystem who may be able to operate a relayer. The Osmosis team does **not** provide relayer services for IBC assets.

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
