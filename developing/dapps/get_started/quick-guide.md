# Quick Guide


## Quickstart guide

Membrane is a Osmosis development environment for smart contracts.

This guide will walk you through setting up your environment, installing Membrane, and using the testnet or [LocalOsmosis](/developing/tools/localosmosis.html) to interact with a network.

For more information on Membrane, visit [Membrane's docs](/developing/tools/membrane.html).


# Initial setup

This tutorial uses a Osmosis specific development suite called Membrane.

Membrane will help you:

* Scaffold your dApp project
* Develop and deploy smart contracts
* Create custom tasks for blockchain and contract interaction
* Access a console (or REPL) for interacting with the Osmosis blockchain
* Create predefined functions used in tasks and in the console

## Prerequisites

- [Install Docker](https://www.docker.com/)
- [Install `docker-compose`](https://github.com/docker/compose)
- [Install NPM](https://www.npmjs.com/)
- [Install Node JS v16](https://nodejs.org/download/release/latest-v16.x/)

## 1. Set up Rust

Rust is the main programming language used for CosmWasm smart contracts. While WASM smart contracts can theoretically be written in any programming language, CosmWasm libraries and tooling work best with Rust.

First, install the latest version of [Rust](https://www.rust-lang.org/tools/install).  

Then run the following commands:

```sh
# 1. Set 'stable' as the default release channel:

rustup default stable

# 2. Add WASM as the compilation target:

rustup target add wasm32-unknown-unknown

# 3. Install the following packages to generate the contract:

cargo install cargo-generate --features vendored-openssl
cargo install cargo-run-script
```

## 2. Install Membrane

Use npm to install the terrain command-line tool globally:

```sh
npm install -g @osmosis-labs/membrane
```

 
### LocalOsmosis vs Testnet

Depending on your setup, you can either install LocalOsmosis or use the Osmosis testnet to power Membrane. 

LocalOsmosis is a development environment designed to make it easy for smart contract developers to test their contracts locally. Membrane can also interact with the Terra blockchain's live testing environment using the Osmosis testnet. 

::: warning
LocalOsmosis may not work properly on machines with less than 16 GB of RAM. Please use the [Osmosis testnet](/developing/network/join-testnet.html) if your device does not meet this requirement.
:::


## Membrane with the testnet

## Terrain with LocalTerra
