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

After that we can create new contract (this command uses template from (cw-template)[https://github.com/osmosis-labs/cw-tpl-osmosis])

```sh
cd counter-dapp
beaker wasm new counter
```

Deploy contract on LocalOsmosis
Make sure LocalOsmosis has been started (see: [LocalOsmosis Docs](https://docs.osmosis.zone/developing/tools/localosmosis.html)).

After that, counter contract can be deployed (build + store-code + instantiate) using the following command:

```sh
beaker wasm deploy counter --signer-account test1 --no-wasm-opt --raw '{ "count": 0 }'
```

The flag --no-wasm-opt is skipping rust-optimizer for faster development iteration. For mainnet deployment, use:

```sh
beaker wasm deploy counter --signer-account <ACCOUNT> --raw '{ "count": 0 }' --network mainnet
```

Instantiate message can be stored for later use:

```sh
mkdir contracts/counter/instantiate-msgs
echo '{ "count": 0 }' > contracts/counter/instantiate-msgs/default.json
beaker wasm deploy counter --signer-account test1 --no-wasm-opt
```

### Console
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

### Beaker.toml

[console]
account_namespace = false
contract_namespace = false
await counter.execute({ "increment": {}}).by(test1)
await counter.query({ "get_count": {}})

Beaker console is also allowed to deploy contract, so that you don't another terminal tab to do so.

```sh
.deploy counter -- --signer-account test1 --raw '{ "count": 999 }'
```

### Frontend
Beaker project template also come with frontend template.

```sh
cd frontend
yarn && yarn dev
```

Then open http://localhost:3000/ in the browser.

Note: to interact, you need to add LocalOsmosis to keplr.
