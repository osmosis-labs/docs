---
title: Build a Dapp
description: Scaffold a frontend, connect a wallet, query Osmosis, and submit a swap.
sidebar_position: 1
---

# Build a Dapp

An end-to-end path for building a web app on Osmosis, tying the individual SDK pages into one walkthrough. Each tool has its own page with the full reference; this is the ordered happy path from scaffold to a working swap.

## 1. Scaffold

The quickest start is [create-cosmos-app](https://github.com/hyperweb-io/create-cosmos-app), which scaffolds a Cosmos dapp with wallet connection, signing, and proto support preconfigured:

```bash
npx create-cosmos-app
```

It wires up [CosmosKit](/build/frontend/cosmos-kit) and [OsmoJS](/build/frontend/osmojs) for you. You can also add them to an existing app:

```bash
npm install osmojs @cosmos-kit/react
```

## 2. Connect a wallet

[CosmosKit](/build/frontend/cosmos-kit) is the React wallet adapter for the Cosmos ecosystem (Keplr, Leap, mobile via WalletConnect). Wrap your app in its provider and use its hooks to connect and read the active account. See the [CosmosKit page](/build/frontend/cosmos-kit) for the provider setup and the `useChain` hook that gives you the connected address and a signing client.

## 3. Query chain data

For reading prices, pools, and routing quotes, use the [Sidecar Query Server (SQS)](/integrate/endpoints/sqs), the same service the production frontend uses, over plain HTTP. For querying module state directly, [OsmoJS](/build/frontend/osmojs) ships typed query clients generated from the chain protos.

## 4. Compose and broadcast a transaction

[OsmoJS](/build/frontend/osmojs) composes and broadcasts Osmosis and Cosmos messages with proto and amino encoding handled for you:

```ts
import { getSigningOsmosisClient } from 'osmojs';

const client = await getSigningOsmosisClient({ rpcEndpoint, signer });
```

From there, building a swap follows the standard flow: get a quote from SQS, compose `MsgSwapExactAmountIn` from the route with a slippage-guarded minimum output, and broadcast it with the signing client. See the [Integrate](/integrate) section for the canonical swap flow, the message shape, and the hazards (exact-in vs exact-out, denom and exponent handling, the mandatory minimum-output guard).

## Reference

- [OsmoJS](/build/frontend/osmojs): message composition, signing, broadcasting.
- [Telescope](/build/frontend/telescope): the codegen tool behind OsmoJS, if you need custom bindings.
- [CosmosKit](/build/frontend/cosmos-kit): wallet connection and account management.
- [Osmosis Frontend](/build/frontend/osmosis-frontend): the architecture of app.osmosis.zone itself.
- [Integrate](/integrate): the quote-to-broadcast swap flow and other integration paths.
