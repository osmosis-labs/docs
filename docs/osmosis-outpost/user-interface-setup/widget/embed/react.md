---
sidebar_position: 3
sidebar_label: React Embedding
description: How to embed the widget on a React app.
---

# React Embedding

After the installation of the npm package as outlined in the 
[related documentation](./installation), add the widget to your React app:

<!-- TODO: add official name of the npm package -->

```js
import {SwapWidget} from "@nabla-studio/outpost-widget-react";
// ...

<SwapWidget 
    theme = {
        // Theme configuration
    },

    from = {
        // Default "from" token
    },

    to = {
        // Default "to" token
    },
    
    onAssetsChange = {
        // Function to be called when the asset changes
    },

    osmosisConfigs = {
        // Osmosis chain configurations
    },

    sourceConfigs = {
        // Outpost chain configurations
    },

    endpointOptions = {
        // Cosmos-kit endpoint options configuration
    },
    
    assetsListBaseUrl = {
        // Base url for the specific outpost assets list
    },
    
    osmosisAssetsListBaseUrl = {
        // Base url for the osmosis assets list
    },
    
    coingeckoBaseUrl = {
        // Base url for the coingecko services
    }

/>
```