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


### Deploy contract on permissioned network
We can also deploy the contract via governance on the testnet before going to mainnet. There are a couple of steps as described in the manual process via CLI[here](https://docs.osmosis.zone/developing/dapps/get_started/submit_wasm_proposal.html), more details also available on the [official CosmWasm Docs](https://github.com/CosmWasm/wasmd/blob/main/x/wasm/Governance.md). 

The steps are: 

- Submit proposal
- Deposit on proposal
- Vote on proposal

### Submit proposal

```sh
beaker wasm proposal store-code --title "Testnet Contract" --description "Testnet Contract" --signer-account test1 --network testnet counter --gas 25000000uosmo 
```

-- Notes
- Remove gas settings (mainnet wont be more than 1 osmo)
- Check testnet (minimum-gas-prices = "0uosmo"), you will pay the max of min-gas-price-for-high-gas-tx = ".0025" 
- check max-gas-wanted-per-tx = "25000000"
- check hash and see how much gas it took, try uploading bigger contract. Check if our gas limit is too low in mainnet. 
- hardcode maximun gas (--gas-limit 25000000)

-- proposal.yml
- github
- title
- description
- code review process
-   who did the review
- gas
    

-----------
Pick contract and deploy to mainnet as a test
- ex: stargaze (public, reviewed already)

### Query proposal

```
beaker wasm proposal query store-code --network testnet counter
```

## Deposit on proposal



## Vote on proposal

On the testnet we can accomplish these three parts with the help of the Osmosis faucet which has a function to vote on a proposal for you. In mainnet the proposal would have to go trough governance in order to be accepted. 

- make sure it's a wasm proposal




