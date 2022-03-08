# Osmosis Web Interface
Frontend React app for Osmosis AMM.

![](../assets/welcome.png)

## Install global dependencies
To run or build the app, first, need to install `Node.js` and `Yarn` globally;

First Install Node from https://nodejs.org/;

Then install Yarn;
```bash
npm install -g yarn
# OR
sudo npm install -g yarn
```

## Install project dependencies
First clone the repo;
```bash
git clone https://github.com/osmosis-labs/osmosis-frontend.git && cd osmosis-frontend
```

Then install project dependencies;
```bash
yarn
```

## Build
To build the static assets;
```bash
yarn build
```
This should produce `prod` folder with static assets.

Currently, Osmosis frontend app is SPA with entry point: `prod/index.html`

## Development
To spin up the local dev server;
```bash
yarn dev
```
The app should be live at http://localhost:8081

## License

This work is dual-licensed under Apache 2.0 and MIT.
You can choose between one of them if you use this work.

`SPDX-License-Identifier: Apache-2.0 OR MIT`

## Core Functionalities
### Modules
Osmosis' key backend functions are maintained through modules, located under the "x" folder of https://github.com/osmosis-labs/osmosis. Each module manages distinct states but can call on each other's functions. To know more specifics about each module and how they work on Osmosis mainnet, check out https://docs.osmosis.zone/developing/modules/#module-accounts.

### Pages 
Contains 

### Components
Contains tools for connecting account (ConnectAccountButton) and for token swapping / token pair selecting.

### Hooks
Osmosis' hooks currently provide max gas-fees settings solutions (FakeFeeConfig), account connection/disconnection logic(BasicAmountConfig / useAccountCreation), and pool financial data(usePoolFinancialData).
### Configs

### Dialogs
