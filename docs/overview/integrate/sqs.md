---
sidebar_position: 13
---

# Sidecar Query Server (SQS)

The Sidecar Query Server is a Go service that runs alongside an Osmosis full node and exposes high-performance HTTP endpoints for the queries that are too expensive or too slow to run directly against the chain: most importantly **swap routing**, **batched pool data**, and **token price lookups**.

It is the query path used by [app.osmosis.zone](https://app.osmosis.zone) in production. If you are building a swap interface, a price oracle, an arbitrage bot, or any UI that needs current pool state without per-block chain queries, you should be reading SQS first and falling back to RPC/REST only when SQS does not expose the data you need.

## Why SQS exists

Routing a multi-hop swap on Osmosis requires knowing the balances, fees, and pool type of every relevant pool. Doing that onchain or through stateless RPC is too slow to drive a frontend. SQS subscribes to a full node, ingests pool state at the end of every block, holds it in memory, and serves routing answers in single-digit milliseconds.

The trade-off is that SQS is **eventually consistent** with the chain (by one block, in practice) and it does not cover every Cosmos SDK query. Use SQS for the operations it owns (routing, pool batch, prices) and use RPC/REST/gRPC for everything else.

## Production endpoints

| Environment | Host | Chain |
| --- | --- | --- |
| Mainnet | `https://sqs.osmosis.zone` | `osmosis-1` |
| Staging | `https://sqs.stage.osmosis.zone` | `osmosis-1` |
| Testnet | `https://sqs.testnet.osmosis.zone` | `osmo-test-5` |

The mainnet host is geo-distributed across three regions and front-ended by nginx, which rate-limits requests. Every endpoint documented on this page is reachable on the mainnet host; the testnet deployment is functionally equivalent and is the right environment for high-volume exploration without consuming the mainnet rate-limit budget.

Swagger reference: <https://sqs.osmosis.zone/swagger/index.html>.

## Get a swap quote

`GET /router/quote` returns the best route SQS can find for a swap, including any split routes that improve execution. The same endpoint serves both quote directions; the canonical direction is **exact-in** (out-given-in), and **exact-out** (in-given-out) is a separate request shape.

### Exact-in (canonical)

Specify the input amount; SQS returns the maximum output it can produce.

```bash
curl "https://sqs.osmosis.zone/router/quote?tokenIn=1000000uosmo&tokenOutDenom=uion" | jq .
```

```json
{
  "amount_in": { "denom": "uosmo", "amount": "1000000" },
  "amount_out": "2366",
  "route": [
    {
      "pools": [
        {
          "id": 1013,
          "type": 0,
          "spread_factor": "0.005000000000000000",
          "token_out_denom": "uion",
          "taker_fee": "0.008000000000000000",
          "liquidity_cap": "791"
        }
      ],
      "out_amount": "2366",
      "in_amount": "1000000"
    }
  ]
}
```

### Exact-out

Specify the output amount; SQS returns the minimum input required.

```bash
curl "https://sqs.osmosis.zone/router/quote?tokenOut=1000000uion&tokenInDenom=uosmo" | jq .
```

The response has `amount_in` as a string (the required input) and `amount_out` as an `sdk.Coin` (the target output). Do not invert an exact-in quote to estimate exact-out: call `/router/quote` with the exact-out parameter pair instead. Exact-out is a separate routing search internally and the optimal route may differ.

### Parameters

- `tokenIn` (exact-in): input amount as an `sdk.Coin` string, e.g. `1000000uosmo`.
- `tokenOutDenom` (exact-in): chain denom of the desired output token.
- `tokenOut` (exact-out): output amount as an `sdk.Coin` string, e.g. `1000000uion`.
- `tokenInDenom` (exact-out): chain denom of the input token.
- `singleRoute` (optional): set to `true` to disable split-route quoting. Defaults to `false`.
- `humanDenoms` (optional): set to `true` to pass human-readable denoms (`OSMO`, `USDC`) instead of chain denoms (`uosmo`, `ibc/...`).

### Fees

`amount_out` is the post-fee amount you would receive (for exact-in) or `amount_in` is the post-fee amount you must pay (for exact-out). Per-pool `spread_factor` and `taker_fee` are returned for transparency; do not subtract them again client-side.

## Quote a specific route

If you already know which pool(s) you want to route through (for example, when quoting against a contract-specific pool that the general router has filtered out), use `GET /router/custom-direct-quote`:

```bash
curl "https://sqs.osmosis.zone/router/custom-direct-quote?tokenIn=1000000uosmo&tokenOutDenom=uion&poolID=2" | jq .
```

This endpoint bypasses the router's minimum-liquidity filter, so it returns a quote as long as the pool exists onchain.

## Discover available routes

`GET /router/routes` enumerates every route SQS has cached between two tokens, without actually pricing a quote.

```bash
curl "https://sqs.osmosis.zone/router/routes?tokenIn=uosmo&tokenOutDenom=uion" | jq .
```

```json
{
  "Routes": [
    {
      "Pools": [
        { "ID": 1100, "TokenInDenom": "uosmo", "TokenOutDenom": "uion" }
      ],
      "IsCanonicalOrderboolRoute": false
    },
    {
      "Pools": [
        { "ID": 2, "TokenInDenom": "uosmo", "TokenOutDenom": "uion" }
      ],
      "IsCanonicalOrderboolRoute": false
    }
  ],
  "UniquePoolIDs": { "1100": {}, "2": {} },
  "ContainsCanonicalOrderbook": false
}
```

`UniquePoolIDs` is a set serialized as a JSON object: the keys are the pool ids referenced across all routes and the values are empty objects. Read the keys, not the values.

Useful for previewing what the router will consider before committing to a quote, or for surfacing every pool that connects two tokens.

## Fetch pool state

`GET /pools` returns hydrated pool data (chain model, balances, spread factor, pool type) for either a batch of pool IDs or all pools.

```bash
# Specific pools (returns a bare array)
curl "https://sqs.osmosis.zone/pools?IDs=1,2,1066" | jq '.[0]'

# All pools (returns a paginated { data, meta } wrapper)
curl "https://sqs.osmosis.zone/pools" | jq '.data[0]'
```

Two response shapes: `?IDs=…` returns a bare array of pool objects; the no-IDs path returns `{ "data": [...], "meta": {...} }` with pagination metadata. The all-pools response is large; cache it client-side rather than fetching it per request.

This is the preferred way to populate a frontend's pool list. It is much faster than iterating `osmosis.gamm.v1beta1.Query.Pools` or its `osmosis.poolmanager.v1beta1` equivalent and it returns balances in the same payload, saving a separate `cosmos.bank.v1beta1.Query.AllBalances` per pool.

## Canonical orderbook lookup

When multiple orderbook contracts exist for the same base/quote pair, SQS tracks which one has the highest liquidity cap and promotes it to "canonical" for that pair. Two endpoints expose this view:

`GET /pools/canonical-orderbook?base=<denom>&quote=<denom>` returns the canonical orderbook pool id and contract address for a single pair:

```bash
curl "https://sqs.osmosis.zone/pools/canonical-orderbook?base=factory/osmo1z6r6qdknhgsc0zeracktgpcxf43j6sekq07nw8sxduc9lg0qjjlqfu25e3/alloyed/allBTC&quote=ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4" | jq .
```

```json
{
  "base": "factory/osmo1z6r6qdknhgsc0zeracktgpcxf43j6sekq07nw8sxduc9lg0qjjlqfu25e3/alloyed/allBTC",
  "quote": "ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4",
  "pool_id": 1930,
  "contract_address": "osmo13zuafleemprax0csfddn8z8p8nt9a80tefg6cw0jlkqhzvt4h49sjxy0wm"
}
```

`GET /pools/canonical-orderbooks` returns the canonical orderbook for every supported pair as an array of the same shape.

These endpoints are the right entry point for any orderbook UI or bot that needs to know which contract address to talk to for a given trading pair. Non-canonical orderbooks for the same pair still appear in `/pools` and can be queried directly by pool id; they just are not the default routing target.

## Read token prices

`GET /tokens/prices` returns spot prices for a list of base denoms.

```bash
curl "https://sqs.osmosis.zone/tokens/prices?base=wbtc,dydx&humanDenoms=true" | jq .
```

Each base maps to a quote-denom map whose value is the spot price. Set `humanDenoms=true` to pass `wbtc` instead of the IBC hash. If a price cannot be determined onchain, SQS falls back to CoinGecko.

## Token metadata

`GET /tokens/metadata?denoms=<chainDenom>[,<chainDenom>...]` returns SQS's view of asset metadata for one or more chain denoms.

```bash
curl "https://sqs.osmosis.zone/tokens/metadata?denoms=uosmo,uion" | jq .
```

```json
{
  "uosmo": {
    "name": "Osmosis",
    "symbol": "OSMO",
    "coinMinimalDenom": "uosmo",
    "decimals": 6,
    "preview": false,
    "coingeckoId": "osmosis"
  },
  "uion": {
    "name": "Ion DAO",
    "symbol": "ION",
    "coinMinimalDenom": "uion",
    "decimals": 6,
    "preview": false,
    "coingeckoId": "ion"
  }
}
```

The response is keyed by the chain denom passed in. SQS reads this metadata from the [generated frontend assetlist](https://github.com/osmosis-labs/assetlists/blob/main/osmosis-1/generated/frontend/assetlist.json); the assetlist remains the canonical source if you are not running SQS yourself.

## Health, metrics, and version

| Endpoint | Use |
| --- | --- |
| `GET /healthcheck` | Returns 200 if the upstream node is reachable, not syncing, and the in-memory cache is within threshold of the chain tip. Wire this into your uptime monitoring. |
| `GET /metrics` | Prometheus-format metrics. |
| `GET /version` | Server version. |
| `GET /config` | Effective configuration, including router parameters. |

## When to use SQS vs RPC, REST, or gRPC

| Need | Use |
| --- | --- |
| Quote a swap (best route, with splits) | SQS `/router/quote` |
| Quote a swap through a specific pool | SQS `/router/custom-direct-quote` |
| List pools and their current state | SQS `/pools` |
| Spot prices for an arbitrary basket | SQS `/tokens/prices` |
| Read a single account balance | REST `/cosmos/bank/v1beta1/balances/{address}` |
| Subscribe to new blocks or txs | RPC websocket |
| Sign and broadcast a transaction | RPC `/broadcast_tx_sync` |
| Query historical state by block height | Archive RPC / REST |
| Module queries not in the SQS surface | gRPC reflection (`grpc.osmosis.zone:9090`) |

In short: SQS for cross-pool aggregation and routing, RPC/REST/gRPC for everything else. See [RPC](./rpc), [REST](./rest), and [gRPC](./grpc) for those paths.

## Adding a custom CosmWasm pool to SQS

If you operate a custom CosmWasm pool that you want SQS to handle, there are two integration paths. Background: SQS ingests `CosmWasmPoolModel` per block and routes against in-memory pool state, so any pool type that participates in route search must be cheap to quote in Go. See the SQS architecture note on [CosmWasm pools](https://github.com/osmosis-labs/sqs/blob/main/docs/architecture/COSMWASM_POOLS.MD) for the model.

1. **Implement a dedicated pool type in SQS.** Best when the pool's quote and spot-price logic is simple enough to mirror in Go. SQS gets enough state from the ingester each block to compute quotes in-process. See [`routable_cw_alloy_transmuter_pool.go`](https://github.com/osmosis-labs/sqs/blob/main/router/usecase/pools/routable_cw_alloy_transmuter_pool.go) (alloyed transmuter) or [`routable_cw_orderbook_pool.go`](https://github.com/osmosis-labs/sqs/blob/main/router/usecase/pools/routable_cw_orderbook_pool.go) (orderbook) as reference implementations. Requires a PR against `osmosis-labs/sqs` adding the new pool type alongside an entry in the relevant code-id list (`transmuter-code-ids`, `alloyed-transmuter-code-ids`, `orderbook-code-ids`).
2. **Register your code ID as a generalised CosmWasm pool.** Best when the pool logic is too complex to mirror in Go. Add your code ID to `pools.general-cosmwasm-code-ids` in the SQS deployment config (mainnet's runtime config is maintained by the SQS team; see [`config-testnet.json`](https://github.com/osmosis-labs/sqs/blob/main/config-testnet.json) for the schema). **Pools registered under `general-cosmwasm-code-ids` are opted out of SQS route search entirely.** SQS will not surface them in `/router/quote` results; they remain reachable only via `/router/custom-direct-quote` against a known pool id, where SQS queries the contract directly at quote time.

After the PR merges, the SQS team will deploy the updated config to production.

## Self-hosting

SQS is open-source at [osmosis-labs/sqs](https://github.com/osmosis-labs/sqs). To run your own deployment you need an Osmosis full node with `is-enabled = "true"` under the `[osmosis-sqs]` section of `app.toml`. See the repo's `README.md` for the development setup, ingest configuration, and Docker images.

## Reference

- Repository: <https://github.com/osmosis-labs/sqs>
- Production swagger: <https://sqs.osmosis.zone/swagger/index.html>
- Go client: [`osmosis-labs/sqs-go-client`](https://github.com/osmosis-labs/sqs-go-client), a first-party Go SDK wrapping the routing and price endpoints.
