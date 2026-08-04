---
title: Quickstart
description: Scaffold, build, and deploy your first CosmWasm contract on Osmosis.
sidebar_position: 1
---

# CosmWasm Quickstart

The fastest path from nothing to a deployed contract on Osmosis. Each step links to the page with the full detail; this page is the ordered happy path.

## 1. Scaffold a contract

Use `cargo generate` with the official CosmWasm template to create a working contract and build system:

```bash
cargo install cargo-generate --features vendored-openssl
cargo generate --git https://github.com/CosmWasm/cw-template.git --name my-contract
cd my-contract
```

This gives you a cargo project with a sample contract (the standard `counter`), an entry-point layout, and a build setup you can customize.

## 2. Add cw-orchestrator

[cw-orchestrator](/build/cosmwasm/cw-orch) is the actively maintained tool for building, deploying, and testing CosmWasm contracts, and the recommended path on Osmosis. Add it to the contract crate as an optional dependency:

```bash
cargo add --optional cw-orch
```

Adding it as optional and enabling it behind an `interface` feature flag keeps `cw-orch` out of the compiled wasm artifact. You then define a typed interface for the contract and use it to write deploy and test scripts that run unchanged against a local chain, a testnet, or mainnet. See [Scripts and Tests with cw-orchestrator](/build/cosmwasm/cw-orch) for the feature setup, the interface macro, and the full workflow.

## 3. Build and test locally

Develop against a local chain. Spin up [LocalOsmosis](/build/cosmwasm/localosmosis):

```bash
make localnet-start    # from a checkout of the osmosis repo
```

Then build, upload, and instantiate the contract against it from a cw-orch script:

```rust
let counter = CounterContract::new(chain);
counter.upload()?;
counter.instantiate(&InstantiateMsg { count: 0 }, None, &[])?;
```

cw-orchestrator also runs the same scripts against [cw-multi-test](https://github.com/CosmWasm/cw-multi-test) and [Osmosis Test Tube](https://github.com/osmosis-labs/test-tube) for fast unit and integration tests with no node running. See [CosmWasm & LocalOsmosis](/build/cosmwasm/localosmosis) for the local accounts and full workflow.

## 4. Deploy to testnet

When the contract works locally, point the same cw-orch script at a public testnet, or upload with `osmosisd` directly (see [testnet deployment](/build/cosmwasm/cosmwasm-deployment)). Storing code on a network where governance gates it goes through a [governance proposal](/build/cosmwasm/submit-wasm-proposal).

> Beaker was a popular all-in-one scaffolding and deployment tool, but it is no longer actively maintained (last release 2023). The [Beaker pages](/build/cosmwasm/beaker) remain for existing projects; new contracts should use the workflow above.

## Next steps

- **Verify** your deployed contract reproducibly: [Verifying Smart Contracts](/build/cosmwasm/cosmwasm-verify-contract).
- **Call the contract from an app:** the [JavaScript guide](/build/cosmwasm/javascript), or build a full frontend with [Frontend & SDKs](/build/frontend).
