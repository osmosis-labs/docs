---
sidebar_position: 7
sidebar_label: Assetlists Configuration
description: The assetlists configuration variables.
---

# Assetlists Configuration

This configuration allows you to set the assetlists for the widget. This 
configuration affects the logic of the widget, since the assets listed on
the widget are gathered from the those assetlists.

If you need to add new assets to the widget, please see the documentation
at the 
[Osmosis Outposts Assetlists](https://github.com/nabla-studio/osmosis-outposts-assetlists) 
and [Osmosis Assetlists](https://github.com/osmosis-labs/assetlists/)
repositories.

### Assets List Base URL

This is a url to the **outpost chain** assets list (together with the IBCd 
tokens). The default value is the following, pointing to a *tailored* version 
of the official Cosmos Registry assetlist that enable a **custom listing** of 
*selected tokens*.

> **__HINT__**: The default value at the time of writing is the following:
>[https://raw.githubusercontent.com/nabla-studio/osmosis-outposts-assetlists/main/configs/](https://raw.githubusercontent.com/nabla-studio/osmosis-outposts-assetlists/main/configs/)

```js
assetsListBaseUrl: string;
```

### Osmosis Assets List Base URL

This is a url to the **Osmosis** assets list (together with the IBCd tokens).
The default value is the following, pointing to a custom version of the 
official *Osmosis assetlist* - using the same schema - since the default one was
not updated with the current testnet values.

> **__HINT__**: The default value at the time of writing is the following:
>[https://raw.githubusercontent.com/nabla-studio/osmosis-outposts-assetlists/main/configs/](https://raw.githubusercontent.com/nabla-studio/osmosis-outposts-assetlists/main/configs/)

```js
osmosisAssetsListBaseUrl: string;
```