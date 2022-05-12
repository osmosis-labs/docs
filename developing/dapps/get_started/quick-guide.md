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

Use npm to install the Membrane command-line tool globally:

```sh
npm install -g @osmosis-labs/membrane
```

 
### LocalOsmosis vs Testnet

Depending on your setup, you can either install LocalOsmosis or use the Osmosis testnet to power Membrane. 

LocalOsmosis is a development environment designed to make it easy for smart contract developers to test their contracts locally. Membrane can also interact with the Osmosis blockchain's live testing environment using the Osmosis testnet. 

::: warning
LocalOsmosis may not work properly on machines with less than 16 GB of RAM. Please use the [Osmosis testnet](/developing/network/join-testnet.html) if your device does not meet this requirement.
:::


## Membrane with the testnet

## Membrane with LocalOsmosis

### Use Membrane with LocalOsmosis

LocalOsmosis is a complete Osmosis testnet and ecosystem containerized with Docker. Use LocalOsmosis to simulate transactions in a test environment.

#### Prerequisites

- [Docker](https://www.docker.com/)
- [`docker-compose`](https://github.com/docker/compose)
- At least 16 GB of RAM
- [Keplr Wallet extension](https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en)
- Node.js version 16

::: warning
Use LTS Node.js 16 if you encounter the following error code:  
`error:0308010C:digital envelope routines::unsupported`
:::


::: details Running NPM on M1 Macs

Some M1 macs may need to use the latest LTS version of Node to complete this tutorial. Consider using a node version manager such as [NVM](https://github.com/nvm-sh/nvm/blob/master/README.md). 
After installing NVM, run the following to install and use the latest LTS version of node:

```sh
nvm install --lts
nvm use --lts
```

The `nvm use --lts` command will need to be run every time you open a new terminal to use the LTS version of node. 

To default to the LTS version of node when restarting your terminal, run the following:

```sh
nvm alias default <INSERT NODE VERSION HERE>
```
:::

### Install and run LocalOsmosis 

There are two ways to install localOsmosis. 

#### Manual download 
 - Download LocalOsmosis, run the following commands:

   ```sh
   cd ~/
   git clone --depth 1 https://github.com/osmosis-labs/localosmosis
   ```
   
#### Or Automatic download with Osmosis daemon configuration.
 - Uses the installer to configure the `osmosisd` daemon and automatically download localOsmosis

   ```sh
   curl -sL https://get.osmosis.zone/install > i.py && python3 i.py
   ```
- Select option (3) and follow the prompts. 
   ![](../../../assets/local-installer.png)

#### Start LocalOsmosis by running the following:

   ```sh
   cd ~/localOsmosis
   docker-compose up
   ```

You will start seeing LocalOsmosis block activity in your terminal. Keep LocalOsmosis running while you perform the next steps in a new terminal window.
![](../../../assets/localOsmosis.png)



::: tip 
LocalOsmosis Accounts
To view the LocalOsmosis wallet information, visit the [LocalOsmosis accounts page](developing/tools/localosmosis.html#accounts). 
For more configuration options, visit the [LocalOsmosis configuration page](/developing/tools/localosmosis.html#what-is-localosmosisd). 
:::


::: warning 
The following sections are WIP. Just place holders. 
:::

### Counter tutorial 

After installing LocalOsmosis, you are ready to use Membrane. This short tutorial walks you through setting up your project and creating a simple counter. 

#### 1. Scaffold your dApp

With Membrane installed you can now scaffold your new application in a new terminal window:

1. Create a new folder for your dApp:

   ```sh
   membrane new my-osmosis-dapp
   ```

2. Scaffold your dApp:

   ```sh
   cd my-osmosis-dapp
   npm install
   ```

#### Project structure

The following structure shows your scaffolded project:

```
.
├── contracts              # The contracts' source code.
│   ├── counter
│   └── ...                # Add more contracts here.
├── frontend               # The front-end application.
├── lib                    # Predefined functions for task and console.
├── tasks                  # Predefined tasks.
├── keys.membrane.js        # Keys for signing transactions.
├── config.membrane.json    # Config for connections and contract deployments.
└── refs.membrane.json      # Deployed code and contract references.
```

#### 2. Deploy

To deploy the application, run the following command:

```sh
membrane deploy counter --signer test1
```

The deploy command performs the following steps automatically:

* Builds the counter smart contract.
* Optimizes the counter smart contract.
* Uploads counter smart contract to LocalOsmosis.
* Instantiates the deployed smart contract.

::: details Increase Docker memory

If you are running LocalOsmosis and the previous `deploy` command is not working, try increasing Docker's memory allowance by clicking on the Docker icon. Click **Preferences** and then **Resources**. Increase the memory to at least 4 gigs. Click **Apply & Restart**. Run the deploy command again. You can increase again to 6 gigs if you are still having trouble. 
:::

#### 3. Interact with the deployed contract

The template comes with several predefined helpers in `lib/index.js`. Use them to start interacting with your smart contract:

1. Run the following:

   ```sh
   membrane console
   ```

2. With the console open, increment the counter by running the following:

   ```JavaScript
   await lib.increment()
   ```

3. You can get the current count by using:

   ```JavaScript
   await lib.getCount()
   ```

4. After incrementing once, `await lib.getCount()` will return:

   ```json
   { count: 1 }
   ```

:::{tip}
Before proceeding to the next section, kill the running command in your terminal by entering "Ctrl + C" . 
:::

#### 4. Front-end scaffolding

Membrane also scaffolds a very simple front-end:

:::: warning
WIP, this integration with Keplr will need some work.
::::

1. Open the [Osmosis Keplr extension](https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en), click the gear icon, and switch the network to LocalOsmosis.

2. To use the front end, run the following commands in order. The `membrane sync-refs` command copies your deployed contract addresses to the front-end part of the codebase.

   ```
   membrane sync-refs
   cd frontend
   npm install
   npm start
   ```

3. Open the Keplr wallet extension and click **Add a wallet**. Click **Recover wallet** and input the following seed phrase to access the sole validator on the LocalOsmosis network and gain funds to get started with smart contracts:

   ```
   satisfy adjust timber high purchase tuition stool faith fine install that you unaware feed domain license impose boss human eager hat rent enjoy dawn
   ```

4. With LocalOsmosis selected in Osmosis Station and the local seed phrase imported, you can now increment and reset the counter from the front end.

#### Demo

:::: warning
WIP, this demo needs work.
::::

