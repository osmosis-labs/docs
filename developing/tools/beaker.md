# Beaker

Beaker is CosmWasm development tooling that makes it easy to scaffold and bootstrap a new CosmWasm app!

Beaker has all of the dependencies for Osmosis hooked up, and a sample front-end at the ready.

## Getting Started

First, please install [Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html)

Install Beaker with 

```sh
cargo install beaker.
```

Then create a new project with:

```sh
beaker new counter-dapp
```

After that we can create new contract (this command uses template from [cw-template](https://github.com/osmosis-labs/cw-tpl-osmosis).

```sh
cd counter-dapp
beaker wasm new counter
```

### Project structure

```
.
├── frontend
├── contracts
├── Cargo.toml
├── Beaker.toml
├── .gitignore
└── .beaker
```

### Deploy contract on LocalOsmosis

Make sure LocalOsmosis has been started (see: [LocalOsmosis Docs](https://docs.osmosis.zone/developing/tools/localosmosis.html)).

After that, counter contract can be deployed (build + store-code + instantiate) using the following command:

```sh
beaker wasm deploy counter --signer-account test1 --no-wasm-opt --raw '{ "count": 0 }'
```

The flag --no-wasm-opt is skipping rust-optimizer for faster development iteration. 

The above command is equivalent to a series of commands used to build and store a .wasm file, reading the .wasm file and storing the contract code in the beaker state, and finally instantiating the contract.

For testnet or mainnet deployment, use:

```sh
beaker wasm deploy counter --signer-account <ACCOUNT> --raw '{ "count": 0 }' --network testnet
beaker wasm deploy counter --signer-account <ACCOUNT> --raw '{ "count": 0 }' --network mainnet
```

Instantiate message can be stored for later use:

```sh
mkdir contracts/counter/instantiate-msgs
echo '{ "count": 0 }' > contracts/counter/instantiate-msgs/default.json
beaker wasm deploy counter --signer-account test1 --no-wasm-opt
```

### Beaker Console
After deployed, you can play with the deployed contract using:

```sh
beaker console
```
This will launch custom node repl, where contract, account are available. contract contains deployed contract. account contains pre-defined accounts in localosmosis.

So you can interact with the recently deployed contract like this:

```sh
await contract.counter.execute({ "increment": {}}).by(account.test1)
await contract.counter.query({ "get_count": {}})
```

You can remove contract and/or account namespace by changing config.

```toml
#In beaker.toml
account_namespace = false
contract_namespace = false
```

Try it out by input the following into the console!

```sh
await counter.execute({ "increment": {}}).by(test1)
await counter.query({ "get_count": {}})
```

Beaker console is also allowed to deploy contract, so that you don't another terminal tab to do so.

```sh
.deploy counter -- --signer-account test1 --raw '{ "count": 999 }'
```

`.build`, `.storecode`, and `.instantiate` commands are also available.

These commands have `--no-wasm-opt` by default since they're intended for use in the development phase.

### Config

The primary configuration files for Beaker consist of `Beaker.toml` & `Cargo.toml`. Beaker-state related configs are located in `.beaker`.

#### Cargo.toml

The cargo.toml specifies cargo workspace.

```toml
[workspace]

members = [
  'contracts/*',
]

[profile.release]
...
```

All the crates (rust packages) in contracts directory are included, with unified release profile. 

With this, when we have to optimize multiple contracts deterministically, we can do that with ease

#### Beaker.toml

A config file specifically for beaker that we use to change contract templates or to modify contract interaction commands in the beaker console.

#### `.beaker`

Last but not least, `.beaker` contains beaker related state such as `address`, `code-id`, `label` for each contract on each network for later use. It contains 2 files:

```
├── state.json
└── state.local.json
```

While `state.json` is there for mainnet and testnet state. `state.local.json` is intended to use locally and _being gitignored_ since its state will not make any sense on other's machine.

### Frontend
Beaker project template also come with frontend template.

```sh
cd frontend
yarn && yarn dev
```

Then open http://localhost:3000/ in the browser.

Note: to interact, you need to add LocalOsmosis to keplr.

### Customization

If you would like to use another contract template, feel free to change the configuration

```toml
# In Beaker.toml, change the template_repo to whatever you want.

[wasm]
template_repo = "https://github.com/osmosis-labs/osmosis-bindings.git"
```

### Specified flag commands

#### `beaker`: 

* `--help`: Print help information

* `--version`: Print version information

#### `beaker new`: 

Arguments:

* `<name>` Workspace name

* `-t/--target-dir <target-dir>` : Path to store generated workspace

* `-b/--branch <branch>` : Template's branch, using main if not specified

#### `beaker wasm`

Variations:

* `beaker wasm new`: Create new CosmWasm contract from boilerplate
* `beaker wasm build`: Build .wasm for storing contract code on the blockchain
* `beaker wasm store-code`: Store .wasm on chain for later initialization
* `beaker wasm instantiate`: Instantiate .wasm stored on chain
* `beaker wasm deploy`: Build, Optimize, Store code, and instantiate contract

There are many more flags for each of these variations `beaker wasm` that can be located [here](https://github.com/osmosis-labs/beaker/blob/main/cli/docs/beaker_wasm.md).

#### `beaker console`

Arguments:

* `-n/--network <network>` (default: local)
