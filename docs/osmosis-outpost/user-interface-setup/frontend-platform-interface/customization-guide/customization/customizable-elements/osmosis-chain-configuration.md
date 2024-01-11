---
sidebar_position: 3
sidebar_label: Osmosis Chain Configuration
description: The Osmosis chain configuration variables.
---

# Osmosis Chain Configuration

This configuration allows you to set the configuration value for the Osmosis 
blockchain. It allows you to switch between the **mainnet** and the **testnet**
configurations and to override the default endpoints and values used by 
*cosmos-kit*.

This configuration affects the logic of the platform.

## Required

### OSMOSIS_CHAIN_ID_BASE

This is the chain id of the Osmosis chain you want to use.

> **__NOTE__**: The `chain-id` in the following example is the one of the 
Osmosis testnet chain.

```bash
NEXT_PUBLIC_OSMOSIS_CHAIN_ID_BASE=osmo-test-5
```

### OSMOSIS_CHAIN_NAME_BASE

This is the chain name of the Osmosis chain you want to use.

> **__NOTE__**: The `chain-name` in the following example is the one of the 
Osmosis testnet chain.

```bash
NEXT_PUBLIC_OSMOSIS_CHAIN_NAME_BASE=osmosistestnet
```

## Optional

The following parameters could be set to overwrite the default values set by 
*cosmos-kit*. If you do not want to overwrite them, simply comment or discard
the following lines.

### OSMOSIS_RPC

This is the Osmosis chain **RPC** url you want to override to the default 
endpoint used by *cosmos-kit*.

```bash
NEXT_PUBLIC_OSMOSIS_RPC=
```

### OSMOSIS_REST

This is the Osmosis chain **LCD** url you want to override to the default 
endpoint used by *cosmos-kit*.

```bash
NEXT_PUBLIC_OSMOSIS_REST=
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