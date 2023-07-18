---
sidebar_position: 5
sidebar_label: Outpost Chain Configuration
description: The outpost chain configuration variables.
---

# sourceConfigs

This configuration allows you to set the configuration value for your outpost 
chain. It allows you to switch between the **mainnet** and the **testnet**
configurations and to override the default endpoints and values used by 
*cosmos-kit*.

The `sourceConfigs` type of the object is the following: 

```js
sourceConfigs: {
    ChainConfig {
        id: string;
        name: string;
        rpc?: string;
        rest?: string;
    }
}
```

This configuration affects the logic of the platform.

### id

This is the chain id of your outpost chain you want to use.

```js
id: string;
```

### name

This is the chain name of your outpost chain you want to use.

```js
name: string;
```

The following parameters could be set to overwrite the default values set by 
*cosmos-kit*. If you do not want to overwrite them, simply comment or discard
the following lines.

### rpc

This is your outpost chain **RPC** you want to override to the default endpoint 
used by *cosmos-kit*.

```js
rpc?: string;
```

### rest

This is your outpost chain **LCD** you want to override to the default endpoint 
used by *cosmos-kit*.

```js
rest?: string;
```

## Useful Information
To get useful information about the various chain, you can give a look at the 
[cosmos/chain-registry](https://github.com/cosmos/chain-registry/) repository.