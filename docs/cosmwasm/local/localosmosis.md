---
title: Cosmwasm & LocalOsmosis
sidebar_position: 3
---

# CosmWasm & LocalOsmosis 

:::tip  
You can now deploy contracts to LocalOsmosis with [Beaker](https://github.com/osmosis-labs/beaker). The official tooling to deploy Osmosis Smartcontracts.
:::

The following is detailed guide that shows the basics of manually deploying a contract to a Osmosis local environment. It covers: 

- Initial Setup
    - Rust
    - LocalOsmosis via Osmosis installer. 
        - osmosisd binary automatically configured to connect to your localOsmosis
        - localOsmosis setup in the $HOME directory (~/localosmosis)
- Deploy a smart contract
    - Clone a base template contract
    - Compile contract
    - Optimize  contract
    - Create local key
    - Store contract
    - Initialize
    - Get contract address
    - Query contract
     - Increment contract's count
     - Reset contracts count
     - Get contract's state
     - Query contract info
     - List all contracts


## Initial Setup: Rust, Contract Environment, Beaker, and Osmosis

Before beginning, you must set up Rust, your contract environment, Beaker, and Osmosis with one of the two following options:

### Option 1: Automatic Setup

Start the installer with the following command, choose LocalOsmosis (option 3), and follow the prompts:

```bash
bash <(curl -sL https://get.osmosis.zone/run)
```
![](../../assets/local-installer.png)


### Option 2: Manual Setup

#### Rust

Install Rust using rustup with the following command and follow the prompts:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

#### Contact Environment

Set 'stable' as the default release channel:

```bash
rustup default stable
```

Add WASM as the compilation target:

```bash
rustup target add wasm32-unknown-unknown
```

Install the following packages to generate the contract:

```bash
cargo install cargo-generate --features vendored-openssl
cargo install cargo-run-scrip
```

#### Beaker

Install Beaker with the following command:

```bash
cargo install -f beaker
```

#### Osmosis

Setup v12.x Osmosis

```bash
cd $HOME
git clone https://github.com/osmosis-labs/osmosis.git
cd $HOME/osmosis
git checkout v12.x
make install
source ~/.profile
```

## Start LocalOsmosis

Inside a separate bash window start LocalOsmosis

```bash
cd ~/osmosis
make localnet-start
```
You will start seeing LocalOsmosis block activity in your terminal. Keep LocalOsmosis running while you perform the next steps in a new terminal window.

![](../../assets/localOsmosis.png)

In place of doing the above commands, you can instead start LocalOsmosis with pre-made pools by starting LocalOsmosis with the following commands:

```bash
cd ~/osmosis
make localnet-start-with-state
```

:::tip
To view the LocalOsmosis wallet information, visit the [LocalOsmosis accounts page](https://github.com/osmosis-labs/localosmosis#accounts). 
:::

## Deploy a smart contract
### Clone cw-tpl-osmosis 
For this example we will use the cw-tpl-osmosis (CosmWasm Template Osmosis) repo that was created with the [cw-template](https://github.com/InterWasm/cw-template) repo.

```
git clone https://github.com/osmosis-labs/cw-tpl-osmosis
```

### Compile the wasm contract with stable toolchain
```
rustup default stable
cargo wasm
```

After this compiles, it should produce a file in `target/wasm32-unknown-unknown/release/cw_tpl_osmosis.wasm.` A quick ls -lh should show around 1.8MB. This is a release build, but not stripped of all unneeded code. To produce a much smaller version, you can run this which tells the compiler to strip all unused code out:

```
RUSTFLAGS='-C link-arg=-s' 
cargo wasm 

```

This produces a file about 149kB. We will do further optimisation below.

### Optimized Compilation

To reduce gas costs, the binary size should be as small as possible. This will result in a less costly deployment, and lower fees on every interaction. Luckily, there is tooling to help with this. You can optimize production code using rust-optimizer. rust-optimizer produces reproducible builds of CosmWasm smart contracts. This means third parties can verify the contract is actually the claimed code.


```
sudo docker run --rm -v "$(pwd)":/code \
    --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
    --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
    cosmwasm/rust-optimizer:0.12.6
 
```

Binary will be at artifacts/osmosis_cw_tpl.wasm folder and its size will be 138k

### Created a local key 
Create a key using one of the seeds provided in localOsmosis. 

```
osmosisd keys add <unsafe-test-key-name> --recover
```
Example test1 key from [here](https://github.com/osmosis-labs/osmosis/tree/main/tests/localosmosis#localosmosis-accounts):

```
notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius
```

### Store to your localOsmosis chain

You can deploy the contract to localOsmosis or a testnet.  In this example we will deploy to localOsmosis.

```
cd artifacts
osmosisd tx wasm store cw_tpl_osmosis.wasm  --from <unsafe-test-key-name> --chain-id=<chain-id> --gas-prices 0.1uosmo --gas auto --gas-adjustment 1.3 -b block -y
```

`<unsafe-test-key-name>` = Name of your local key.
`<chain-id>` = localosmosis

Replace `<unsafe-test-key-name>` with the key name from your local keys. `osmosisd keys list`
Replace `<chain-id>` with localosmosis or osmo-test-5. 
Save the CODE_ID from the output of the command above as a local variable `CODE_ID=XX`

### Or Store CODE_ID 
Instead of looking for the code_id the command above, you can also run the following command to set the CODE_ID as a variable.
    
```
TX=$(osmosisd tx wasm store cw_tpl_osmosis.wasm  --from <unsafe-test-key-name> --chain-id=<chain-id> --gas-prices 0.1uosmo --gas auto --gas-adjustment 1.3 -b block --output json -y | jq -r '.txhash')
CODE_ID=$(osmosisd query tx $TX --output json | jq -r '.logs[0].events[-1].attributes[0].value')
echo "Your contract code_id is $CODE_ID"
```

If this is a brand new localOsmosis instance it should be `1`
    
    
### Instantiate the contract
 
```
INITIAL_STATE='{"count":100}'
osmosisd tx wasm instantiate $CODE_ID $INITIAL_STATE --amount 50000uosmo  --label "Counter Contract" --from <unsafe-test-key-name> --chain-id <chain-id> --gas-prices 0.1uosmo --gas auto --gas-adjustment 1.3 -b block -y --no-admin
```

Example
```
INITIAL_STATE='{"count":100}'
osmosisd tx wasm instantiate $CODE_ID $INITIAL_STATE --amount 50000uosmo  --label "Counter Contract" --from c1 --chain-id localosmosis --gas-prices 0.1uosmo --gas auto --gas-adjustment 1.3 -b block -y --no-admin
```

### Get contract address

```
CONTRACT_ADDR=$(osmosisd query wasm list-contract-by-code $CODE_ID --output json | jq -r '.contracts[0]')
```

## Query Contract

### Increment contract's count

```
INCREMENT_MSG='{"increment":{}}'
osmosisd tx wasm execute $CONTRACT_ADDR "$INCREMENT_MSG" --from c1
```

### Reset contracts count

```
RESET_MSG='{"reset":{"count":0}}'
osmosisd tx wasm execute $CONTRACT_ADDR "$RESET_MSG" --from c1
```

### Get contract's state

```
GET_STATE_MSG='{"get_count":{}}'
osmosisd query wasm contract-state smart  $CONTRACT_ADDR "$GET_STATE_MSG"
```

### Query contract info
    
```
osmosisd query wasm contract $CONTRACT_ADDR
```

### List all contracts

```
osmosisd query wasm list-code
```

Good job! It's now time to learn how to actually develop contracts. You can now visit the [official CosmWasm contracts](https://docs.cosmwasm.com/docs/1.0/getting-started/intro) and as you explore the docs you will understand how tio actually interact with the Osmosis Blockchain.
