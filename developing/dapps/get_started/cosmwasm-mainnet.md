# Deploy Cosmwasm Contracts to Mainnet

The Osmosis mainnet is permissioned meaning that you will need to submit a governance proposal in order to deploy to it.

The following is detailed guide that shows the basics of deploying a contract to a Osmosis local environment, manually or with Beaker tooling.

## Initial Setup

First, in order to get a set of contracts ready for mainnet proposal we will have to:

* Have required dependencies installed (OsmosisD, Rust, Cargo, Beaker)
* Build the contracts and [test them on testnet](https://docs.osmosis.zone/developing/dapps/get_started/cosmwasm-testnet.html#deploy-contract-via-governance)
* (If using the beaker method) Create a `prop.yml` file with the contents of your proposal (title, description, etc.)
* Have a `500 OSMO` balance in a wallet (subject to change in future)

#### Proposal period 
As opposed to the `3 minutes` vote-time on the testnet, the mainnet proposal period is 5 days. See [here](https://www.mintscan.io/osmosis/proposals/304) for example:

```sh
Voting Start 2022-08-05 06:08:49
Voting End 2022-08-10 06:08:49
```

This means people must vote within the next 5 days for your proposal to pass. There will be an error message if you take longer than the proposal period to vote, indicating that voting period has passed.

### Best pre-deployment practices

Below are some best practices to make sure that your proposal will pass:

* Do not have your contracts contain CW20-related logics (for optimal dev experience, use native coin instead)
* Contracts should have enumerative query functions
* Ensure that your logic has been tested and is not unsafe.
* Ensure that you have optimized for gas savings
* Ensure that everyone who is working on deploying has the same hashes for your `.wasm` contracts.

## Deploying Cosmwasm Contracts to the mainnet manually

First, add a wallet to propose with. Make sure this wallet has enough OSMO balance. For alternatives on key management (e.g. using a keyring), check out docs [here](https://docs.osmosis.zone/developing/keys/keys-cli.html#the-keyring-backend-option).

```bash
# add wallets for testing
# --recover flag allows you to port your existing wallet through 
osmosisd keys add <wallet_name> --recover
```

### Build contract

Compile your contract:

```bash
# Set 'stable' as the default release channel:
rustup default stable
cargo wasm
```

### Construct, Submit, Query Proposal

When you have your compiled `.wasm` files, you can construct a proposal as seen below.

First, define the chain you want to deploy on and the contract you want to propose.
```
CHAIN_ID=mainnet
CONTRACT=replace_with_contract_name
PROPOSAL=proposal_id_here
```

Then, once you're satisfied with the state of your contracts (as per best practices recommendations), submit the proposal.

```sh
osmosisd tx gov submit-proposal wasm-store $CONTRACT.wasm --title "Add $CONTRACT" \
  --description "Let's upload this contract" --run-as $VAL \
  --from validator --keyring-backend test --chain-id $CHAIN_ID -y -b block \
  --gas 5000000 --gas-prices 0.025uosmo
```

You can then query proposals as follows:

```sh
osmosisd query gov proposal $PROPOSAL
```

You must then make a deposit on the proposal:

```sh
osmosisd tx gov deposit $PROPOSAL 10000000uosmo --from validator --keyring-backend test \
    --chain-id $CHAIN_ID -y -b block --gas 6000000 --gas-prices 0.025uosmo
```

Afterwards, you and others can vote manually for (or against) the proposal like below.
```sh
osmosisd tx gov vote $PROPOSAL yes --from validator --keyring-backend test \
    --chain-id $CHAIN_ID -y -b block --gas 600000 --gas-prices 0.025uosmo
```

## Deploying Cosmwasm Contracts to the mainnet with Beaker

With beaker, the process for deploying to mainnet is similar to that of deploying to testnet. However, instead of using a test account, you will be using an actually funded account.

### Build contract

First we build our contract:

```sh
beaker wasm build
```

### Governance proposal YAML

Then we create a governance proposal yaml file according to the following template:

```sh
title: Proposal to allow DappName to be enabled in Osmosis
description: |
            A lengthy proposal description
            goes here  
            we expect this to be many lines...
deposit: 500000000uosmo
code:
    repo:   https://github.com/osmosis-labs/beaker/
    rust_flags: -C link-arg=-s
    roptimizer: workspace-optimizer:0.12.6
```

### Propose and Query

Finally, we propose:

```sh
beaker wasm proposal store-code --proposal prop.yml --signer-account <INSERT NAME OF FUNDED ACCOUNT HERE> --network mainnet counter --gas 5000000uosmo --gas-limit 5000000
```

You can then check on the status of your contract proposal via. [Mintscan](https://www.mintscan.io/osmosis/proposals)

#### Gas limitations

Optimizing before deployment, as you may have experienced on testnet deployment, is critical to being able to fit your contract within gas limits.

All mainnet contracts, similar to those of the testnet, have a max deployment gas limit of 5000000. 

The gas limit is subject to change in the future, but we recommend organizing your contract sizing so that it doesn't exceed the above limit (e.g. by compartmentalizing your logic into two different contracts).

