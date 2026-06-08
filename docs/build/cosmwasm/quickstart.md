---
title: Quickstart
description: Scaffold, build, and deploy your first CosmWasm contract on Osmosis.
sidebar_position: 1
---

# CosmWasm Quickstart

The fastest path from nothing to a deployed contract on Osmosis. Each step links to the page with the full detail; this page is the ordered happy path.

## 1. Install Beaker

[Beaker](/build/cosmwasm/beaker) is the recommended scaffolding and deployment tool. It is a Rust toolchain binary, installed with cargo:

```bash
cargo install -f beaker
```

## 2. Scaffold a project

Create a new workspace and add a contract to it:

```bash
beaker new my-dapp
cd my-dapp
beaker wasm new counter
```

This gives you a cargo workspace with a contract, an interactive console, and a sample frontend wired up. See [Beaker](/build/cosmwasm/beaker) for the project layout and configuration.

## 3. Build and test locally

Build the contract and develop against a local chain. Spin up [LocalOsmosis](/build/cosmwasm/localosmosis):

```bash
make localnet-start    # from a checkout of the osmosis repo
```

Then build and deploy your contract to it with Beaker:

```bash
beaker wasm build --no-wasm-opt
beaker wasm deploy counter --signer-account test1 --no-wasm-opt --raw '{ "count": 0 }'
```

`deploy` stores the code and instantiates it in one step. See [CosmWasm & LocalOsmosis](/build/cosmwasm/localosmosis) for the local accounts and full workflow.

## 4. Deploy to testnet

When the contract works locally, deploy to a public testnet, either with Beaker (see [CosmWasm & Beaker](/build/cosmwasm/cosmwasm-beaker)) or with `osmosisd` directly (see [testnet deployment](/build/cosmwasm/cosmwasm-deployment)). Storing code on a network where governance gates it goes through a [governance proposal](/build/cosmwasm/submit-wasm-proposal).

## Next steps

- **Script and test across environments** with [cw-orchestrator](/build/cosmwasm/cw-orch).
- **Verify** your deployed contract reproducibly: [Verifying Smart Contracts](/build/cosmwasm/cosmwasm-verify-contract).
- **Call the contract from an app:** the [JavaScript guide](/build/cosmwasm/javascript), or build a full frontend with [Frontend & SDKs](/build/frontend).
