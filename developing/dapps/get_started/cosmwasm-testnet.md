# Cosmwasm with Testnet
## Deploying Cosmwasm Contracts to the testnet with Beaker

The following guide will show you how to create and deploy a Cosmwasm smart contract to the Osmosis testnet. The testnet is permisonless by default to allow developers to test their contracts on a live environment. The Osmosis mainnet is permissioned meaning that you will need to submit a governance proposal in order to deploy to it. 

### Requirements
- [Rust](https://www.rust-lang.org/tools/install)
- [Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html) 

### Install Beaker

Beaker is available via [cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html) which is a rust toolchain. Once cargo is ready on your machine, run:


```sh
cargo install beaker
```

### Scaffolding your new dapp project

In the directory you want your project to reside, run:

```sh
beaker new counter-dapp
```

For detailed information about Beaker [click here](https://github.com/osmosis-labs/beaker/edit/main/README.md).

### Your first CosmWasm contract with Beaker

After that we can create new contract (the command uses template from [cw-template](https://github.com/InterWasm/cw-template))

```sh
cd counter-dapp
beaker wasm new counter
```

### Deploy contract on permisionless network
The testnet is permisionless by default in order to allow developers to easyly deploy contracts. 

```sh
beaker wasm deploy counter --signer-account test1 --network testnet --no-wasm-opt --raw '{ "count": 0 }' --label 'My first Beaker Contract'
```

Note how we added `--network testnet` to tell beaker to deploy to the testnet Osmosis chain. 


