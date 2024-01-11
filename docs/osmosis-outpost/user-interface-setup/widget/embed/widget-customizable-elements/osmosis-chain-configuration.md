---
sidebar_position: 4
sidebar_label: Osmosis Chain Configuration
description: The Osmosis chain configuration variables.
---

# osmosisConfigs

This configuration allows you to set the configuration value for the Osmosis 
blockchain. It allows you to switch between the **mainnet** and the **testnet**
configurations and to override the default endpoints and values used by 
*cosmos-kit*.

The `osmosisConfigs` type of the object is the following: 

```js
osmosisConfigs: {
    ChainConfig {
        id: string;
        name: string;
        rpc?: string;
        rest?: string;
    }
}
```

### id

This is the chain id of the Osmosis chain you want to use.

> **__NOTE__**: The `chain-id` in the following example is the one of the 
Osmosis testnet chain.

```js
id:string;
```

### name

This is the chain name of the Osmosis chain you want to use.

> **__NOTE__**: The `chain-name` in the following example is the one of the 
Osmosis testnet chain.

```js
name:string;
```

### rpc

This is the Osmosis chain **RPC** url you want to override to the default 
endpoint used by *cosmos-kit*.

```js
rpc?:string;
```

### rest

This is the Osmosis chain **LCD** url you want to override to the default 
endpoint used by *cosmos-kit*.

```js
rest?: string;
```


## Useful Information
The following table resume the information for the Osmosis *mainnet* and 
*testnet* at the time of writing. To get deeper information, you can give a 
look at the 
[cosmos/chain-registry](https://github.com/cosmos/chain-registry/) repository.

| Value      | Osmosis Testnet (osmo-test-5)                                                   | Osmosis Mainnet                                         |
| ---------- | ------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Chain ID   | `osmo-test-5`                                                                   | `osmosis-1`                                             |
| Chain Name | `osmosistestnet`                                                                | `osmosis`                                               |
| RPC        | [https://rpc.testnet.osmosis.zone:443](https://rpc.testnet.osmosis.zone:443)    | [https://rpc.osmosis.zone](https://rpc.osmosis.zone)    |
| LCD        | [https://lcd.testnet.osmosis.zone](https://lcd.testnet.osmosis.zone)            | [https://lcd.osmosis.zone](https://lcd.osmosis.zone)    |