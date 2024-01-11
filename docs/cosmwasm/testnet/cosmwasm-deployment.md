# Cosmwasm testnet deployment
The following is a quick guide that shows the basics of deploying a contract to a Osmosis Testnet (`osmo-test-5`). It covers:

- Initial Setup
    - Setup Rust
    - Setup Osmosis Testnet via Osmosis Installer
    - Setup Client
- Deploy a Smart Contract
    - Clone cw-template
    - Compile the wasm contract with stable toolchain
    - Optimized Compilation
    - Store to Osmosis Testnet chain
    - Instantiate the contract
- Execute the Contract
    - Get contract’s count
    - Increment contract’s count
    - Reset contract’s count
- Osmo Contract Explorer
    - Upload the code
    - Execute the contract

:::tip
Please note this a detailed guide on how to deploy via `osmosisd`, it also covers additional tooling and useful tips.  You can also deploy to testnet with [Beaker](./cosmwasm-beaker.md) with a couple of commands. 
:::


## Initial Setup

This tutorial uses a Osmosis specific development tools to deploy contracts to Osmosis Testnet(`osmo-test-5`).

### Setup Rust

Rust is the main programming language used for CosmWasm smart contracts. While WASM smart contracts can theoretically be written in any programming language, CosmWasm libraries and tooling work best with Rust.

First, [install rustup](https://rustup.rs/).

Then run the following commands:

```bash
# 1. Set 'stable' as the default release channel:
rustup default stable
cargo version
# If this is lower than 1.50.0+, update
rustup update stable

# 2. Add WASM as the compilation target:
rustup target list --installed
rustup target add wasm32-unknown-unknown

# 3. Install the following packages to generate the contract:
cargo install cargo-generate --features vendored-openssl
cargo install cargo-run-script
```

### Setup Osmosis Testnet

You can easily set up an Osmosis Testnet environment using the [Osmosis Installer](https://github.com/osmosis-labs/osmosis-installer). 

Run the following and choose option #2 (Client Node) and #2 (Testnet) in order.

```bash
curl -sL https://get.osmosis.zone/install > i.py && python3 i.py
```
Now you have successfully completed setting up an Osmosis client node in Testnet. In order to use `osmosisd` from the cli, either reload your terminal or refresh your profile with : `‘source ~/.profile’`

### Setup the Client

First, create a wallet with the command following:

```bash
# add wallets for testing
osmosisd keys add wallet
```

When you run the commands above, `osmosisd` will prompt you all the information related to that wallet in YAML (.yml) format.

```bash
- name: wallet
  type: local
  address: osmo1v9yrqx8aaddlna29zxngr4ye3jnxtpprrej532
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AmKFqbczx7j/sYlqO2irXUSsQMdEN9Ugg1W2AOm7knh3"}'
  mnemonic: ""

**Important** write this mnemonic phrase in a safe place.
It is the only way to recover your account if you ever forget your password.

divert cliff issue spirit penalty chief improve neck enjoy pipe sing loop inherit behind space next tourist acid axis easy never ball enemy moment
```

You need some tokens named `OSMO`(`uosmo`) in your address to interact with the network.

### faucet

#### Official Faucet
You can request tokens from the official faucet at [faucet.osmosis.zone](https://faucet.osmosis.zone) 

#### Discord Faucet
Youcan also participate in the [Osmosis discord](https://discord.com/invite/osmosis) to request a faucet of the Osmosis Testnet. After gaining access to the testnet channel on the `#roles` channel of the discord, you can request a testnet token by sending the following message on the `#faucet` channel:

```bash
$request <address>
```
![](https://user-images.githubusercontent.com/70956926/172293039-b832fd96-d62d-44de-9889-ee400a9ec815.png)
![](https://user-images.githubusercontent.com/70956926/172293080-aee186ad-ef51-43bb-ac6e-1a8b65c9ce04.png)


Then, you can check that your faucet request has been successful by checking the balance of your wallet bank account by trying the command:

```bash
osmosisd query bank balances $(osmosisd keys show -a wallet)
```

- `osmosisd query bank balances [address]` commands query the total balance of an account.
- `osmosisd keys show -a wallet` commands returns the address of the wallet that you created.



## Deploy a Smart Contract
### Clone cw-template

For this example, we will use the [**cw-template**](https://github.com/osmosis-labs/cw-tpl-osmosis) repo with counter example.

```bash
cargo generate --git https://github.com/osmosis-labs/cw-tpl-osmosis.git --name my-first-contract
cd my-first-contract
```

### Compile the wasm contract with stable toolchain

To deploy smart contracts, you must compile the code and make it an executable wasm binary file. We will compile the wasm contract with stable toolchain. 

Compile using the command below:

```bash
# Set 'stable' as the default release channel:
rustup default stable
cargo wasm
```

- `toolchain` means the compiler of  Rust, and rust has three release channels: `stable`, `beta`, and `nightly`, of which the `stable` channel is the most recently released version. `rustup` helps you manage these different versions easily.
- `cargo` is the *Rust package manager*. In the [.cargo/config](https://github.com/InterWasm/cw-template/blob/main/.cargo/config), you can view the wasm compilation options as follows:
    
    ```bash
    wasm = "build --release --target wasm32-unknown-unknown"
    ```
    
    So when we run the `cargo wasm` command, the `cargo build --release —-target wasm32-unknown-unknown` command is executed according to the option in the config file above.
    

After this compiles, it should produce a file in `target/wasm32-unknown-unknown/release/my_first_contract.wasm`.  If you check the size of the file by using the `ls -lh` command, it shows around `1.8M`. This is a release build, but not stripped of all unneeded code. To produce a much smaller version, you can run this which tells the compiler to strip all unused code out:

```bash
RUSTFLAGS='-C link-arg=-s' cargo wasm
```

This produces a file about `155K`. To reduce gas costs, the binary size should be as small as possible. This will result in a less costly deployment, and lower fees on every interaction.

Also, if you don’t use compilation optimization, CosmWasm smart contract will not be deployed well due to `exceeds limit` error.

### Optimized Compilation

You can do further optimization using [rust-optimizer](https://github.com/CosmWasm/rust-optimizer). **rust-optimizer** produces reproducible builds of CosmWasm smart contracts and does heavy optimization on the build size, using binary stripping and `wasm-opt`.

```bash
sudo docker run --rm -v "$(pwd)":/code \
    --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
    --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
    cosmwasm/rust-optimizer:0.12.6
```

Binary file will be at `artifacts/my_first_contract.wasm` folder and its size will be about `130K`, which is more smaller than when only RUTFLAGS was used.

### Store to Osmosis Testnet chain

We have the wasm binary executable ready. Now it is time to store the code to the Osmosis Testnet blockchain. 

```bash
# store the code on chain
RES=$(osmosisd tx wasm store artifacts/my_first_contract.wasm --from wallet --gas-prices 0.1uosmo --gas auto --gas-adjustment 1.3 -y --output json -b block)
```

- `osmosisd tx wasm store` : upload a wasm binary
- `--from` : name or address of private key with which to sign.
- `--gas-prices` : gas prices in decimal format to determine the transaction fee.
- `--gas` : gas limit to set per-transaction. set to "`auto`" to calculate sufficient gas automatically
- `--gas-adjustment` : adjustment factor to be multiplied against the estimate returned by the tx simulation.
- `-y` : to skip tx broadcasting prompt confirmation.
- `--output` : output format.
- `-b` : transaction broadcasting mode

![](https://user-images.githubusercontent.com/70956926/172293654-7beba11b-ce5f-4979-94e2-19156c6e5b27.png)

Once that is complete, you can get the `CODE_ID` easily using `jq`.

`jq` is an open source that helps extract data from JSON. Install it according to your OS using the following command:

```bash
# Linux
sudo apt-get install jq

# Mac
brew install jq
```

If you are using an operating system other than the one listed above, please refer to the [official document](https://stedolan.github.io/jq/download/).

Run the following command to set the `CODE_ID` as a variable:

```bash
# get CODE_ID
CODE_ID=$(echo $RES | jq -r '.logs[0].events[-1].attributes[0].value')
echo $CODE_ID
```

![](https://user-images.githubusercontent.com/70956926/172293774-e60b8d0b-a5c3-48db-9c79-4f4f427eb59b.png)

### Instantiate the contract

We can now create an instance of this wasm contract. First, set the initial state of the instance in the `INIT` variable and run the `instantiate` command.

```bash
# set the initial state of the instance
INIT='{"count":100}'

# instantiate the contract
osmosisd tx wasm instantiate $CODE_ID "$INIT" \
    --from wallet --label "my first contract" --gas-prices 0.025uosmo --gas auto --gas-adjustment 1.3 -b block -y --no-admin
```

- `osmosisd tx wasm instantiate` : instantiate a wasm contract using CODE_ID of the uploaded binary.
- `--label` : human-readable name for this contract in lists.
- `--no-admin` : you must set this explicitly if you don’t want an admin.

If you have succeeded in instantiating the contract, you can search for output `txhash` in [Osmosis Explorer](https://testnet.ping.pub/osmosis) to verify your deployment.

Get the contract address using the command following:

```bash
CONTRACT_ADDR=$(osmosisd query wasm list-contract-by-code $CODE_ID --output json | jq -r '.contracts[0]')
```

- `osmosisd query wasm list-contract-by-code` : list wasm all bytecode on the chain for given code id

## Execute the Contract

Now, let's see if the contract we deployed works well.

### Get contract’s count

Send a `get_count` query to check the count value. The previously set `INIT` state is output as it is.: `{"data":{"count":100}}`

```bash
QUERY='{"get_count":{}}'
osmosisd query wasm contract-state smart $CONTRACT_ADDR "$QUERY" --output json
```

- `osmosisd query wasm contract-state smart` : calls contract with given address with query data and prints the returned result

![](https://user-images.githubusercontent.com/70956926/172295110-e3ae455c-9681-41a4-abf2-ac33288bb13c.png)

### Increment contract’s count

This time, let's send an `increment` transaction that increases the count value by +1. Because the transaction changes the internal state of the contract, you must pay gas fees.

If you run the `get_count` query again after sending the `increment` transaction, you can see that +1 has increased from the previous count value.

```bash
TRY_INCREMENT='{"increment": {}}'
osmosisd tx wasm execute $CONTRACT_ADDR "$TRY_INCREMENT" --from wallet --gas-prices 0.025uosmo --gas auto --gas-adjustment 1.3 -y --chain-id osmo-test-5
```

- `osmosisd tx wasm execute` : execute a command on a wasm contract

![](https://user-images.githubusercontent.com/70956926/172295183-89016c41-7832-41c4-b4c7-a2cf9d441256.png)

### Reset contract’s count

Lastly, let’s send a `reset` transaction. Like increment, reset transaction also changes the internal state of contract, so you must pay gas fees.

```bash
RESET='{"reset": {"count": 0}}'
osmosisd tx wasm execute $CONTRACT_ADDR "$RESET" --from wallet --gas-prices 0.025uosmo --gas auto --gas-adjustment 1.3 -y
```

![](https://user-images.githubusercontent.com/70956926/172295239-ddf95369-5b9a-4096-a84d-aecc1ef30484.png)

## Osmo Contract Explorer

You can also instantiate the contract using intuitive GUI in [Osmo Contract Explorer](https://osmosis-contracts.web.app/#/codes).

Let’s do it together


### Upload the code

When you access the site, you will see a list of the code we uploaded to the chain and the contract instances created using the corresponding CODE_ID.

![](https://user-images.githubusercontent.com/70956926/172296987-b8df32a4-f50e-4546-8773-a257a21fb92d.png)

First, Login by connecting your wallet. Then click the `Create a Contract` button and enter the initial state of the instance in `Instantiate Message`. After also entering label and admin, you can easily create a contract instance by clicking the `Instantiate Contract` button.

![](https://user-images.githubusercontent.com/70956926/172297151-64146bba-d7d4-444f-9a57-06dd55f62db8.png)

### Execute the contract

Now, let's send a transaction to the contract to see if the contract works well.

You can send a query in the `Read Contract` section and you can send transactions that change the internal state of the contract in the `Write Contract` section.

![](https://user-images.githubusercontent.com/70956926/172298609-95a0269d-ae58-472b-b02e-c2b1b5f3c4e6.png)

#### get_count

In the Read Contract section, type `get_count` messages and press the `Run query` button to get the count value.

![](https://user-images.githubusercontent.com/70956926/172300337-eda6f76a-ad31-45d3-a5a1-8d324c2bc966.png)

#### increment

In the Write Contract section, type `increment` messages and the OSMO to pay and click the `Execute Contract` button to execute the transaction.

![](https://user-images.githubusercontent.com/70956926/172300637-bb29452d-1d23-4c30-8cbb-d72f358b490e.png)

#### reset

![](https://user-images.githubusercontent.com/70956926/172300485-4d66b5a9-1082-48da-ba1c-b979206f277e.png)

Congratulations! Now you deployed your wasm smart contract on Osmosis Testnet successfully.