---
sidebar_position: 5
sidebar_label: Useful Information
description: Here there is other information which could be useful.
---

# Useful Information

The provided *platform interface* is written by using the 
[Next.js](https://github.com/vercel/next.js) framework - which uses the 
[React](https://github.com/facebook/react) framework and provides the 
server-side-rendering (SSR) functionality. 

It is powered by the 
[osmosis-outpost-ui](https://github.com/nabla-studio/osmosis-outposts-ui/tree/main/packages)
component library whose components are realized as *pure web components*, and 
it is also built to work with *react* and *vue*.

Such platform makes use of the 
[cosmos-kit library](https://github.com/cosmology-tech/cosmos-kit) in its 
logic, the [osmojs](https://github.com/osmosis-labs/osmojs) library to interact
with the blockchains, and the
[chakra-ui](https://github.com/chakra-ui/chakra-ui) library for the ui. 

The configuration list of the swappable tokens for each outpost platform is 
gathered by the 
[osmosis-outposts-assetlists](https://github.com/nabla-studio/osmosis-outposts-assetlists)
repository, where you should do a *Pull Request* to add your configuration.

To improve the data fetching operations of the platform, it uses the 
[TanStack Query](https://github.com/tanstack/query) library, enabling caching.

According to the transactions, since the platform needs to track IBC txs above 
multiple blockchains, it uses the 
[cosmos-txs-tracer](https://github.com/nabla-studio/cosmos-txs-tracer) library,
which, thanks to websocket connections, allows to track txs without the need 
to perform polling.