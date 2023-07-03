---
sidebar_position: 11
sidebar_label: Wallet Connect Configuration
description: The wallet connect configuration variables.
---

# Wallet Connect Configuration

This configuration allows you to set the configuration parameter required by
cosmos-kit to enable the *wallet connect* protocol functionalities.

This configuration affects the logic of the platform.

## Configuration Parameters
The following parameters are configuration parameter, used to enable the 
connection of the dApp to a mobile wallet through Wallet Connect protocol.

### WALLET_CONNECT_PROJECT_ID

This is the ID of your project. You can create (or use an existing) project at
[cloud.walletconnect.com](https://cloud.walletconnect.com/).

```bash
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=
```

### WALLET_CONNECT_RELAY_URL

This is the url of your relay server. If you do not have your own relay server
leave the default url.

> **__HINT__**: Do not change if not strictly needed.

```bash
NEXT_PUBLIC_WALLET_CONNECT_RELAY_URL=wss://relay.walletconnect.org
```

## Metadata Parameters

The following parameters are metadata related to the dApp. These data allows
the mobile wallet connected to the dApp through WalletConnect protocol to
list correctly the dApp (using name, description, url and icon).

### WALLET_CONNECT_METADATA_NAME

This is the name of your dApp. It would be shown in a mobile wallet connected
to the dApp.

```bash
NEXT_PUBLIC_WALLET_CONNECT_METADATA_NAME=
```

### WALLET_CONNECT_METADATA_DESCRIPTION

This is the description of your dApp. It would be shown in a mobile wallet 
connected to the dApp.

```bash
NEXT_PUBLIC_WALLET_CONNECT_METADATA_DESCRIPTION=
```

### WALLET_CONNECT_METADATA_URL

This is the url of your dApp. It would be shown in a mobile wallet connected to
the dApp.

```bash
NEXT_PUBLIC_WALLET_CONNECT_METADATA_URL=
```

### WALLET_CONNECT_METADATA_ICON

This is the url to the icon of your dApp. It would be shown in a mobile wallet 
connected to the dApp.

```bash
NEXT_PUBLIC_WALLET_CONNECT_METADATA_ICON=
```