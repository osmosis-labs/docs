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

The mainnet host is geo-distributed across three regions and front-ended by nginx, which rate-limits and restricts which endpoints are publicly reachable. In production, only the following endpoints are exposed:

- `/router/quote`
- `/router/custom-direct-quote`
- `/tokens/prices`
- `/pools`
- `/pools/canonical-orderbook`
- `/pools/canonical-orderbooks`
- Health / metrics / version / config

The testnet deployment exposes every endpoint and is the right environment to develop against if you need access to less-common routes such as `/router/routes` or `/tokens/metadata`.

Swagger reference for the production surface: <https://sqs.osmosis.zone/swagger/index.html>.

## Get a swap quote

`GET /router/quote` returns the best route SQS can find for a token-in / token-out pair, including any split routes that improve execution.

```bash
curl "https://sqs.osmosis.zone/router/quote?tokenIn=1000000uosmo&tokenOutDenom=uion" | jq .
```

```json
{
  "amount_in": { "denom": "uosmo", "amount": "1000000" },
  "amount_out": "1803",
  "route": [
    {
      "pools": [
        {
          "id": 2,
          "type": 0,
          "spread_factor": "0.005000000000000000",
          "token_out_denom": "uion",
          "taker_fee": "0.001000000000000000"
        }
      ],
      "out_amount": "1803",
      "in_amount": "1000000"
    }
  ],
  "effective_fee": "0.006000000000000000"
}
```

Parameters:

- `tokenIn`: the input amount as an `sdk.Coin` string (e.g. `1000000uosmo`).
- `tokenOutDenom`: the chain denom of the desired output token.
- `singleRoute` (optional): set to `true` to disable split-route quoting and return only the best single-path execution. Defaults to `false`.
- `humanReadable` (optional): set to `true` if you are passing human-readable denoms (`OSMO`, `USDC`) instead of chain denoms (`uosmo`, `ibc/...`).

`effective_fee` is the combined spread factor plus taker fee that the quote would pay if executed in the next block.

## Quote a specific route

If you already know which pool(s) you want to route through (for example, when quoting against a contract-specific pool that the general router has filtered out), use `GET /router/custom-direct-quote`:

```bash
curl "https://sqs.osmosis.zone/router/custom-direct-quote?tokenIn=1000000uosmo&tokenOutDenom=uion&poolID=2" | jq .
```

This endpoint bypasses the router's minimum-liquidity filter, so it returns a quote as long as the pool exists on chain.

## Discover available routes

`GET /router/routes` enumerates every route between two tokens. The mainnet deployment does not expose this endpoint; use the testnet host or a self-hosted SQS for exploration.

```bash
curl "https://sqs.testnet.osmosis.zone/router/routes?tokenIn=uosmo&tokenOutDenom=uion" | jq .
```

## Fetch pool state

`GET /pools` returns hydrated pool data (chain model, balances, spread factor, pool type) for either a batch of pool IDs or all pools.

```bash
# Specific pools
curl "https://sqs.osmosis.zone/pools?IDs=1,2,1066" | jq .

# All pools (large response; cache responsibly)
curl "https://sqs.osmosis.zone/pools" | jq '.[0]'
```

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

Each base maps to a quote-denom map whose value is the spot price. Set `humanDenoms=true` to pass `wbtc` instead of the IBC hash. If a price cannot be determined on chain, SQS falls back to CoinGecko.

## Token metadata

`GET /tokens/metadata` returns chain denom, human denom, and precision for a list of denoms. The mainnet host does not expose this endpoint; use the testnet host or a self-hosted SQS.

```bash
curl "https://sqs.testnet.osmosis.zone/tokens/metadata/statom" | jq .
```

```json
{
  "chain_denom": "ibc/C140AFD542AE77BD7DCC83F13FDD8C5E5BB8C4929785E6EC2F4C636F98F17901",
  "human_denom": "statom",
  "precision": 6
}
```

For mainnet integrators, the canonical source for this metadata is the [generated frontend assetlist](https://github.com/osmosis-labs/assetlists/blob/main/osmosis-1/generated/frontend/assetlist.json). SQS reads from the same data.

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

If you operate a custom CosmWasm pool that you want SQS routing to use, there are two integration paths:

1. **Implement a dedicated pool type in SQS.** Best when the pool's quote and spot-price logic is simple enough to mirror in Go. See the [transmuter routable pool](https://github.com/osmosis-labs/sqs/blob/main/router/usecase/pools/routable_transmuter_pool.go) as a reference implementation. Requires a PR against `osmosis-labs/sqs`.
2. **Register your code ID as a generalized CosmWasm pool.** Best when the pool logic is complex enough that SQS would need to delegate quotes back to the chain. Add your code ID to `general-cosmwasm-code-ids` in [`config.json`](https://github.com/osmosis-labs/sqs/blob/main/config.json). Routes containing such pools are restricted to direct quotes (no splits) for performance reasons.

After the PR merges, the SQS team will deploy the updated config to production.

## Self-hosting

SQS is open-source at [osmosis-labs/sqs](https://github.com/osmosis-labs/sqs). To run your own deployment you need an Osmosis full node with `is-enabled = "true"` under the `[osmosis-sqs]` section of `app.toml`. See the repo's `README.md` for the development setup, ingest configuration, and Docker images.

## Reference

- Repository: <https://github.com/osmosis-labs/sqs>
- Production swagger: <https://sqs.osmosis.zone/swagger/index.html>
- Go client: [`osmosis-labs/sqs-go-client`](https://github.com/osmosis-labs/sqs-go-client), a first-party Go SDK wrapping the routing and price endpoints.
