# OsmoJS


## What is OsmoJS?
Osmo.js is a JavaScript SDK for writing applications that interact with the Osmosis blockchain from either Node.js, browser, or React Native environments and provides simple abstractions over core data structures, serialization, key management, and API request generation.

## Installation

Grab the latest version off NPM:

```sh
npm install @osmosis-labs/osmo.js
```

## Usage

### Getting blockchain data

```
import { LCDClient, Coin } from '@osmosis-labs/osmo.js';

// connect to testnet
const osmo = new LCDClient({
  URL: '<Osmosis testnet RPCURL>',
  chainID: 'osmo-test-4',
});

// To use LocalOsmosis
// const osmo = new LCDClient({
//   URL: 'http://localhost:1317',
//   chainID: 'localosmosis'
// });

// get the current swap rate
const offerCoin = new Coin('osmo', '1000000');
osmo.market.swapRate(offerCoin, 'atom').then(c => {
  console.log(`${offerCoin.toString()} can be swapped for ${c.toString()}`);
});
```

### Transaction broadcasting

First, get some testnet tokens via. LocalOsmosis.
Then:

```
import { LCDClient, MsgSend, MnemonicKey } from '@osmosis-labs/osmo.js';

// create a key out of a mnemonic
const mk = new MnemonicKey({
  mnemonic:
    'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius',
});

// connect to testnet
const osmo = new LCDClient({
  URL: '<Osmosis testnet RPCURL>',
  chainID: 'osmo-test-4',
});

// To use LocalOsmosis
// const osmo = new LCDClient({
//   URL: 'http://localhost:1317',
//   chainID: 'localosmosis'
// });

// a wallet can be created out of any key
// wallets abstract transaction building
const wallet = osmo.wallet(mk);

// create a simple message that moves coin balances
const send = new MsgSend(
  '<toaddr>',
  '<fromaddr>',
  { <tokens> }
);

wallet
  .createAndSignTx({
    msgs: [send],
    memo: 'test from osmo.js!',
  })
  .then(tx => osmo.tx.broadcast(tx))
  .then(result => {
    console.log(`TX hash: ${result.txhash}`);
  });
```

### OsmoJS in the browser

You can access all the objects of the `@osmosis-labs/osmo.js` from the global `Osmo` object if you load osmo.js with a `<script>` tag.

Include the following in your browser:

```
<script
  crossorigin
  src="https://unpkg.com/@osmosis-labs/osmo.js/dist/bundle.js"
></script>
```

### OsmoJS in React Native

In order to use Terra.js inside React Native, you need to add the `node-libs-react-native` package and `react-native-get-random-values` package to your React Native app's `package.json`.

```sh
yarn add node-libs-react-native react-native-get-random-values
```

You will need to register Node.js native modules in an entry point of your application, such as `index.tsx`:

```
import 'node-libs-react-native/globals';
import 'react-native-get-random-values';
```

Also, add resolvers to your `metro.config.js`

```
module.exports {
  // ...
  resolver: {
    // ...
    extraNodeModules: require('node-libs-react-native'),
  },
  // ...
}
```