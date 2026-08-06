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
| **RPC** (port 26657) | WebSocket event subscriptions, consensus and block data (`/status`, `/block`, `/tx_search`), broadcasting | Bulk state reads, where the typed gRPC/REST query services are easier |
| **gRPC** (port 9090) | Typed module queries from a backend, streaming, generated clients, broadcasting via `cosmos.tx.v1beta1.Service/BroadcastTx` | Browsers, which cannot speak gRPC directly without a proxy |
| **REST / LCD** (port 1317) | Typed module queries over plain HTTP, quick curl checks, browser clients, broadcasting via `POST /cosmos/tx/v1beta1/txs` | Subscriptions, which it does not support |

All three can broadcast a signed transaction: the SDK's `cosmos.tx.v1beta1.Service` exposes
`BroadcastTx` over gRPC with a REST binding, alongside CometBFT's own RPC broadcast endpoints. The
distinction that matters is **subscriptions**, which only RPC offers. For routing quotes and batched
pool state, prefer the [Sidecar Query Server](./sqs) over all three.

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

The generated `ClientFactory` exposes a signing client that takes a wallet and handles the
sign-and-broadcast round trip over the RPC endpoint:

```javascript
import { cosmos, osmosis } from "./codegen";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";

const { send } = cosmos.bank.v1beta1.MessageComposer.fromPartial;

async function transfer() {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(process.env.MNEMONIC, {
    prefix: "osmo",
  });
  const [account] = await wallet.getAccounts();

  const client = await osmosis.ClientFactory.createRPCSigningClient({
    rpcEndpoint: "https://rpc.osmosis.zone",
    signer: wallet,
  });

  const msg = send({
    fromAddress: account.address,
    toAddress: "osmo1...",
    amount: [{ denom: "uosmo", amount: "1000" }], // 0.001 OSMO, base units
  });

  const fee = { amount: [{ denom: "uosmo", amount: "5000" }], gas: "200000" };
  const res = await client.signAndBroadcast(account.address, [msg], fee);

  if (res.code !== 0) throw new Error(`tx failed: ${res.rawLog}`);
  console.log(res.transactionHash);
}
```

`signAndBroadcast` polls until the transaction is included in a block and resolves to a
`DeliverTxResponse`, so a successful promise does **not** mean the transaction succeeded. Check
`res.code === 0` before treating it as settled, as above. If you want to return as soon as the
mempool accepts the transaction and track the result yourself, use `broadcastTxSync`, which resolves
to the transaction hash only.

:::warning
Never hold a mnemonic in source; load it from the environment or a keyring. Amounts are always in
base units, so convert using each asset's exponent rather than assuming 6.
:::

### Swaps need slippage protection

A bank transfer is used above because it has no price exposure. Swap messages do, and the protection
is the minimum-output field, `tokenOutMinAmount` on `MsgSwapExactAmountIn`. It must be derived from a
quote and an explicit slippage tolerance:

```javascript
// Quote first, then bound the output. Never hardcode a permissive minimum.
const quote = await fetch(
  "https://sqs.osmosis.zone/router/quote" +
    "?tokenIn=1000000uosmo" +
    "&tokenOutDenom=ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2"
).then((r) => r.json());

// Integer math only. `amount_out` is a base-unit string that can exceed
// Number.MAX_SAFE_INTEGER, so converting it to Number can silently lose precision.
// 9950/10000 is a 0.5% tolerance; use basis points to stay in BigInt.
const tokenOutMinAmount = ((BigInt(quote.amount_out) * 9950n) / 10000n).toString();
```

Setting `tokenOutMinAmount` to `1`, or to any value not derived from a live quote, accepts
effectively unlimited slippage and will be sandwiched on a real trade. Match the full `ibc/HASH`
denom rather than a stripped symbol, and read the output asset's exponent from its metadata rather
than assuming 6. See [Swap Integration](/integrate/swap) for the full quote-then-execute flow,
including split routes, and the [Sidecar Query Server](./sqs) for the routing API.

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



