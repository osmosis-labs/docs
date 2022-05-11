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

### Transaction broadcasting

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