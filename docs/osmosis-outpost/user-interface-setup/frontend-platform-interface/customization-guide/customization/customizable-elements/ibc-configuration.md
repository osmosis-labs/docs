---
sidebar_position: 6
sidebar_label: IBC Configuration
description: The IBC configuration variables.
---

# IBC Configuration

This configuration allows you to set the value to allow the dApp to communicate
with your **outpost chain** and the **Osmosis chain** through IBC protocol. 

This configuration affects the *logic* of the platform.

> **__NOTE__**: **This is a fallback configuration**. The platform will try to
get the information directly from the *chain-registry*. If no information is 
found, the app will use the value you inserted.

To better understand what is source and destination, you can think that we talk
about the **source**, when the *outpost chain acts as the source element* in the 
IBC communication; vice versa, we talk about the **destination**, when the 
*outpost chain acts as the destination element* in the IBC communication.

E.g., in the Juno <-> Osmosis mainnets IBC communication, the **SRC_CHANNEL=0**
(from Juno to Osmosis), and **DST_CHANNEL=42** (from Osmosis to Juno).

## IBC Source

### IBC_SRC_PORT

```bash
NEXT_PUBLIC_IBC_SRC_PORT=
```

### IBC_SRC_CHANNEL

```bash
NEXT_PUBLIC_IBC_SRC_CHANNEL=
```

## IBC Destination

### IBC_DTS_PORT

```bash
NEXT_PUBLIC_IBC_DST_PORT=
```

### IBC_DTS_CHANNEL

```bash
NEXT_PUBLIC_IBC_DST_CHANNEL=
```

## Useful Information
To get deeper information, you can give a look at the 
[cosmos/chain-registry](https://github.com/cosmos/chain-registry/) repository.