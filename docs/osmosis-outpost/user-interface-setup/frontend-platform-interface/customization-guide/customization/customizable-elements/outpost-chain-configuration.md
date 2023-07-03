---
sidebar_position: 4
sidebar_label: Outpost Chain Configuration
description: The outpost chain configuration variables.
---

# Outpost Chain Configuration

This configuration allows you to set the configuration value for your outpost 
chain. It allows you to switch between the **mainnet** and the **testnet**
configurations and to override the default endpoints and values used by 
*cosmos-kit*.

This configuration affects the logic of the platform.

## Required

### SOURCE_CHAIN_ID_BASE

This is the chain id of your outpost chain you want to use.

```bash
NEXT_PUBLIC_SOURCE_CHAIN_ID_BASE=
```

### SOURCE_CHAIN_NAME_BASE

This is the chain name of your outpost chain you want to use.

```bash
NEXT_PUBLIC_SOURCE_CHAIN_NAME_BASE=
```

## Optional

The following parameters could be set to overwrite the default values set by 
*cosmos-kit*. If you do not want to overwrite them, simply comment or discard
the following lines.

### SOURCE_RPC

This is your outpost chain **RPC** you want to override to the default endpoint 
used by *cosmos-kit*.

```bash
NEXT_PUBLIC_SOURCE_RPC=
```

### SOURCE_REST

This is your outpost chain **LCD** you want to override to the default endpoint 
used by *cosmos-kit*.

```bash
NEXT_PUBLIC_SOURCE_REST=
```

## Useful Information
To get useful information about the various chain, you can give a look at the 
[cosmos/chain-registry](https://github.com/cosmos/chain-registry/) repository.