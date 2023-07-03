---
sidebar_position: 1
sidebar_label: Assetlists Configuration
description: The assetlists configuration variables.
---

# Assetlists Configuration

This configuration allows you to set the assetlists for the platform. This 
configuration affects the logic of the platform, since the assets listed on
the platform are gathered from the those assetlists.

If you need to add new assets to the platform, please see the documentation
at the 
[Osmosis Outposts Assetlists](https://github.com/nabla-studio/osmosis-outposts-assetlists) 
and [Osmosis Assetlists](https://github.com/osmosis-labs/assetlists/)
repositories.

### ASSETLISTS_BASE_URL

This is a url to the **outpost chain** assets list (together with the IBCd 
tokens). The default value is the following, pointing to a *tailored* version 
of the official Cosmos Registry assetlist that enable a **custom listing** of 
*selected tokens*.

> **__HINT__**: Do not change if not strictly needed.

```bash
NEXT_PUBLIC_ASSETLISTS_BASE_URL=https://raw.githubusercontent.com/nabla-studio/osmosis-outposts-assetlists/main/configs/
```

### OSMOSIS_ASSETLISTS_BASE_URL

This is a url to the **Osmosis** assets list (together with the IBCd tokens).
The default value is the following, pointing to a custom version of the 
official *Osmosis assetlist* - using the same schema - since the default one was
not updated with the current testnet values.

> **__HINT__**: Do not change if not strictly needed.

```bash
NEXT_PUBLIC_OSMOSIS_ASSETLISTS_BASE_URL=https://raw.githubusercontent.com/nabla-studio/osmosis-outposts-assetlists/main/configs/
```