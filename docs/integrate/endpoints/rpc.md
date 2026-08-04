---
description: Sign, broadcast, and subscribe over the chain's RPC endpoints.
sidebar_position: 12
---

# Interact with RPC endpoints

As shown on the RPC specifications, there are different endpoints to communicate with the Osmosis chain. Unlike the LCD rest api, the RPC endpoints provide generic endpoints to communicate with the various modules available. For example the ABCI Query operation in the [RPC reference](/api?v=RPC) allows you to query different data from Osmosis.

:::tip Looking for swap routing or aggregated pool data?
RPC is the right path for signing, broadcasting, and per-block subscriptions, but for routing quotes and batched pool state you almost certainly want the [Sidecar Query Server (SQS)](./sqs), the query path used by the production frontend.
:::

For more information, read about [generating, signing, and broadcasting transactions](https://docs.cosmos.network/v0.50/learn/advanced/transactions) in the cosmos-sdk docs.

## Choosing between RPC, gRPC, and REST

The chain exposes the same state three ways. Which one to use depends on what you are doing:

| | Use it for | Avoid it for |
|---|---|---|
| **RPC** (port 26657) | Broadcasting transactions, WebSocket event subscriptions, consensus and block data (`/status`, `/block`, `/tx_search`) | Bulk state reads, where the typed gRPC/REST query services are easier |
| **gRPC** (port 9090) | Typed module queries from a backend, streaming, generated clients | Browsers, which cannot speak gRPC directly without a proxy |
| **REST / LCD** (port 1317) | Typed module queries over plain HTTP, quick curl checks, browser clients | Subscriptions, which it does not support |

Only RPC offers WebSocket subscriptions, and only RPC accepts transaction broadcast. For routing
quotes and batched pool state, prefer the [Sidecar Query Server](./sqs) over all three.

## Querying the ABCI Query with Javascript via Telescope

If you are looking to query, sign and broadcast transactions using Javascript. Telescope and OsmoJS make this very easy. The following is a very simple example of you could accomplish this using Telescope.

## Setting up Telescope
```bash
# Install dependencies
yarn install
# Install Telescope
npm install -g @cosmology/telescope
# Select the chains you would like to interact with
telescope install
# Generate types 
yarn codegen
```
## Simple query example
Edit src/index.ts
```javascript 

import { osmosis } from "./codegen";
const { createRPCQueryClient } = osmosis.ClientFactory;


async function getBalance() {

    const client = await createRPCQueryClient({ rpcEndpoint: "https://rpc.osmosis.zone" });
    // // now you can query the cosmos modules
    const balance = await client.cosmos.bank.v1beta1
        .allBalances({ address: 'osmo1fl48vsnmsdzcv85q5d2q4z5ajdha8yu3aq6l09' });
}

async function getPools() {

    const client = await createRPCQueryClient({ rpcEndpoint: "https://rpc.osmosis.zone" });
    const pools = await client.osmosis.gamm.v1beta1.pools();
    console.log(pools);
}

getPools().catch(console.error);
getBalance().catch(console.error);

```

Run the code and see the responses from the rpc endpoint. 
```bash
yarn dev
```

## Signing and broadcasting a transaction

Broadcast goes through the RPC endpoint. The generated `ClientFactory` also exposes a signing
client, which takes a wallet and handles the sign-and-broadcast round trip:

```javascript
import { osmosis } from "./codegen";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";

const { swapExactAmountIn } = osmosis.poolmanager.v1beta1.MessageComposer.withTypeUrl;

async function swap() {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(process.env.MNEMONIC, {
    prefix: "osmo",
  });
  const [account] = await wallet.getAccounts();

  const client = await osmosis.ClientFactory.createRPCSigningClient({
    rpcEndpoint: "https://rpc.osmosis.zone",
    signer: wallet,
  });

  const msg = swapExactAmountIn({
    sender: account.address,
    routes: [{ poolId: 1n, tokenOutDenom: "uosmo" }],
    tokenIn: { denom: "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2", amount: "1000000" },
    tokenOutMinAmount: "1",
  });

  const fee = { amount: [{ denom: "uosmo", amount: "5000" }], gas: "300000" };
  const res = await client.signAndBroadcast(account.address, [msg], fee);
  console.log(res.transactionHash);
}
```

:::warning
`tokenOutMinAmount` is your slippage protection. Setting it to `1` as above accepts almost any
output and will be sandwiched on a real trade. Derive it from a quote and your slippage tolerance,
and remember amounts are in base units, so convert using each asset's exponent rather than assuming
6. Never hold a mnemonic in source; load it from the environment or a keyring.
:::

Broadcast returns as soon as the transaction is accepted into the mempool. That is not the same as
execution: check `res.code === 0` on the delivered result before treating a swap as settled.

## Subscribing to events over WebSocket

Subscriptions are RPC-only, over `wss://` at `/websocket`. The query uses the same CometBFT event
syntax as `osmosisd query txs --query`:

```javascript
const ws = new WebSocket("wss://rpc.osmosis.zone/websocket");

ws.onopen = () => {
  ws.send(JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "subscribe",
    params: { query: "tm.event='Tx' AND token_swapped.module='poolmanager'" },
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // The first message is the subscription ack and carries no result.
  if (data.result?.events) console.log(data.result.events);
};
```

Useful queries include `tm.event='NewBlock'` for every committed block and
`tm.event='Tx' AND transfer.recipient='<address>'` to watch one address. Public RPC nodes cap the
number of concurrent subscriptions and may drop idle connections, so reconnect on close and do not
assume you received every event; reconcile against a query if completeness matters.

For extended details and documentations, see the documentation for Telescope. 



