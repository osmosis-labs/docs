# Membrane


## What is membrane?

Membrane uses the Protostar SDK (more on this below) to build a development toolset that specializes in developing CosmWasm on Osmosis. We optimize for deeper integration with Osmosis to facilitate building the best dapps that really augment Osmosis.

CosmWasm is a multi-chain smart contract platform for the Cosmos ecosystem. While being powerful as it is, a lot of things need to be wired manually when developing CosmWasm contracts and dapps. To provide seamless CosmWasm development experience, Protostar is designed to be a swiss-army knife for building custom dev tools for CosmWasm on each specific blockchain.

Membrane includes CosmWasm deployment pipeline automation. It has support for:
- build / test / deploy / migration
- workspace support
- fast integration test support
- fuzzing support

## Dependency installation

### LocalOsmosis download

Clone the LocalOsmosis repo.

```sh
git clone https://github.com/terra-money/LocalOsmosis.git
```

Navigate to the newly created LocalOsmosis directory.

```sh
cd LocalTerra
```

Spin up an instance of the environment with docker-compose.

```sh
docker-compose up
```

### Rust setup

While WASM smart contracts can be written in any programming language, it is strongly recommended that you utilize Rust, as it is the only language for which mature libraries and tooling exist for CosmWasm. 

Set the default release channel used to update Rust to stable:

```sh
rustup default stable
```
Add wasm as the compilation target:

```sh
rustup target add wasm32-unknown-unknown
```

Install the necessary dependencies for generating contracts:

```sh
cargo install cargo-generate --features vendored-openssl
cargo install cargo-run-script
```

### Node JS & NPM 

To run Terrain, you will need to install Node.js and NPM. We recommend that you install [Node.js v16](https://nodejs.org/en/download/). Node Package Manager (NPM) is automatically installed along with your Node.js download. 
## Getting Started

After you have installed the dependencies, proceed with the following

Installs membrane globally.
```sh
npm install -g @osmosis-labs/membrane
```

Scaffolds a new dApp
```sh
membrane new my-osmo-dapp
```

```sh
cd my-osmo-dapp
```

Installs all dependencies for dApp.
```sh
npm install
```

## Running Contract Functions

Once you have successfully deployed your project, you can interact with the deployed contract and the underlying blockchain by utilizing functions defined in the `lib/index.js` file. You may also create your own abstractions in this file for querying or executing transactions. The default contents of the `lib/index.js` file are presented below:

```
// lib/index.js

module.exports = ({ wallets, refs, config, client }) => ({
  getCount: () => client.query("counter", { get_count: {} }),
  increment: (signer = wallets.test1) =>
    client.execute(signer, "counter", { increment: {} }),
});
```

You can call the functions defined above inside of the `membrane` console. An example of this using the counter contract is shown below.

```
membrane console
membrane > await lib.getCount()
{ count: 0 }
membrane > await lib.increment()
membrane > await lib.getCount()
{ count: 1 }
```

You can also specify which network you would like to interact with by utilizing the --network flag.

`membrane console --network NETWORK`

## Creating Tasks

You can also utilize the functions available inside of the `lib/index.js` file to create tasks. Tasks are utilized in order to automate the execution of sequential functions or commands. An example task is provided for you in the `tasks/example-with-lib.js` file in your project directory.

```
const { task } = require("@osmosis-labs/membrane");
const lib = require("../lib");

task(async (env) => {
  const { getCount, increment } = lib(env);
  console.log("count 1 = ", await getCount());
  await increment();
  console.log("count 2 = ", await getCount());
});
```

To run the example task shown above, which is located in the `tasks/example-with-lib.js` file, run the following command in the terminal.

```sh
membrane task:run example-with-lib
```
In order to create a new task, run the following command, replacing `<task-name>` with the desired name for your new task.

```sh
membrane task:new `<task-name>`
```

If you would like to utilize JavaScript in your functions or tasks, you can import Osmo.js. The `tasks/example-custom-logic.js` file contains an example of a task that utilizes Osmo.js functionality. 

```
// tasks/example-custom-logic.js

const { task, terrajs } = require("@osmois-labs/membrane");

task(async ({ wallets, refs, config, client }) => {
  console.log("creating new key");
  const key = osmojs.MnemonicKey();
  console.log("private key", key.privateKey.toString("base64"));
  console.log("mnemonic", key.mnemonic);
});
```

## Migrating contracts on Osmo

On Osmosis, it is possible to initilize contracts as migratable. A migratable contract allows an adminstrator to upload a new version of a contract and then send a migrate message to move to the new code.

### Adding MigrateMsg to the contract

In order for a contract to be migratable, it must satisfy the following two requirements:

- The smart contract handles the MigrateMsg transaction.
- The smart contract has an admininstrator set.

To implement support for MigrateMsg, add the message to the `msg.rs` file. To do so, navigate to `msg.rs` and place the following code just above the `InstantiateMsg` struct.

```
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct MigrateMsg {}
```

With `MigrateMsg` defined, update the `contract.rs` file. First, update the import from `crate::msg` to include MigrateMsg.

`
use crate::msg::{CountResponse, ExecuteMsg, InstantiateMsg, QueryMsg, MigrateMsg};
`

Next, add the following method above `instantiate`.

```
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn migrate(_deps: DepsMut, _env: Env, _msg: MigrateMsg) -> StdResult<Response> {
    Ok(Response::default())
}
```

### Migrating the Contract

We already deployed our contract, but didn't initialize it as migratable yet.

To do so, after adding `MigrateMsg` to the smart contract, we can redeploy the contract and add the `--set-signer-as-admin` flag. This allows the transaction signer to migrate the contract in the future.

`membrane deploy counter --signer test1 --set-signer-as-admin`

If you decide to make changes to the deployed contract, you can migrate to the updated code by executing the following command.

`membrane contract:migrate counter --signer test1`

## Membrane Commands

- membrane code:new NAME
- membrane code:store CONTRACT
- membrane console
- membrane contract:instantiate CONTRACT
- membrane contract:migrate [CONTRACT]
- membrane contract:updateAdmin CONTRACT ADMIN
- membrane deploy CONTRACT
- membrane help [COMMAND]
- membrane new NAME
- membrane sync-refs [FILE]
- membrane task:new [TASK]
- membrane task:run [TASK]
- membrane test CONTRACT-NAME
- membrane wallet:new

### membrane code:new NAME

Generate new contract.

```
USAGE
  $ terrain code:new [NAME] [--path <value>] [--version <value>]

FLAGS
  --path=<value>     [default: ./contracts] path to keep the contracts
  --version=<value>  [default: 0.16]

DESCRIPTION
  Generate new contract.

```

### membrane code:store CONTRACT
```
Store code on chain.

USAGE
  $ terrain code:store [CONTRACT] --signer <value> [--no-rebuild] [--network <value>] [--config-path <value>]
    [--refs-path <value>] [--keys-path <value>] [--code-id <value>]

FLAGS
  --code-id=<value>
  --config-path=<value>  [default: ./config.terrain.json]
  --keys-path=<value>    [default: ./keys.terrain.js]
  --network=<value>      [default: localterra]
  --no-rebuild
  --refs-path=<value>    [default: ./refs.terrain.json]
  --signer=<value>       (required)

DESCRIPTION
  Store code on chain.
```