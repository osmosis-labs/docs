---
sidebar_position: 14
---

# Orderbook

The Osmosis orderbook is a CosmWasm contract that implements a sumtree-backed limit-order venue. Each market is its own contract instance with one quote denom and one base denom, and the contract participates in the chain's pool routing graph alongside CFMM and concentrated-liquidity pools.

This page covers the integration surface: how to discover live orderbook pools, place and cancel orders, query state, and connect to the orderbook from a routing layer such as SQS.

## Where the orderbook lives onchain

Each orderbook market is a separately instantiated CosmWasm contract. Discovery options:

- **SQS**: the [`/pools`](https://docs.osmosis.zone/overview/integrate/sqs) endpoint returns orderbook pools alongside CFMM and concentrated-liquidity pools. This is the recommended path for any frontend or bot that needs to know the active orderbook markets.
- **Onchain via cosmwasm-pool module**: orderbooks are registered as `x/cosmwasmpool` pool types; their pool IDs are addressable through `osmosis.poolmanager.v1beta1.Query.Pool` like any other pool.
- **Direct contract address**: once you know an orderbook's contract address you can talk to it with `osmosisd query wasm contract-state smart <contract-addr> '<query-json>'`.

Code IDs for the canonical orderbook contract are governance-managed and may change. Read the live SQS pools list or chain-state at submission time rather than hardcoding a code ID in client code.

## Instantiation parameters

When a new orderbook market is instantiated, the parameters follow the format:

```json
{
  "base_denom": "uatom",
  "quote_denom": "uusdc"
}
```

The quote denom is the asset that prices are expressed in; the base denom is the asset being bought or sold. A single orderbook contract pairs exactly one quote denom against one base denom. To support a different pair, instantiate a new contract from the same code ID.

## Placing an order

Limit orders are placed with `ExecuteMsg::PlaceLimit`:

```bash
osmosisd tx wasm execute <ORDERBOOK_CONTRACT_ADDR> '{
  "place_limit": {
    "tick_id": 123456,
    "order_direction": "bid",
    "quantity": "1000000",
    "claim_bounty": "0.0001"
  }
}' --amount "1000000uusdc" --from <KEY> --gas auto --gas-prices 0.0025uosmo --gas-adjustment 1.3
```

Fields:

- `tick_id`: signed integer addressing the price tick at which to rest the order. Tick semantics match the CL convention; the corresponding price is derivable from the tick math in [`orderbook.rs`](https://github.com/osmosis-labs/orderbook/blob/main/contracts/sumtree-orderbook/src/orderbook.rs).
- `order_direction`: `"bid"` (offering quote to buy base) or `"ask"` (offering base to sell into quote).
- `quantity`: an integer string. For bids this is the quote-denom amount the order will spend if fully filled at `tick_id`; for asks it is the base-denom amount being offered.
- `claim_bounty` (optional, decimal string): the fraction of the order's payout the placer is willing to pay any third party that claims the filled order on their behalf. Enables the claimbot economic flywheel described below. The Osmosis frontend currently sets this to `0.0001` (0.01%) for every limit order it places.

The `--amount` flag must equal `quantity` of the appropriate denom for the side of the order (quote for bids, base for asks). The contract returns the assigned `order_id` for the placed order in the execution response.

## Cancelling an order

```bash
osmosisd tx wasm execute <ORDERBOOK_CONTRACT_ADDR> '{
  "cancel_limit": {
    "tick_id": 123456,
    "order_id": 42
  }
}' --from <KEY> --gas auto --gas-prices 0.0025uosmo --gas-adjustment 1.3
```

Only the original order placer can cancel. Cancelling a partially-filled order returns the unfilled remainder; the filled portion remains claimable.

## Claiming filled orders

Once an order is fully filled, it remains in the contract until claimed. The original placer can claim it themselves:

```bash
osmosisd tx wasm execute <ORDERBOOK_CONTRACT_ADDR> '{
  "claim_limit": { "tick_id": 123456, "order_id": 42 }
}' --from <KEY>
```

Or a third party can claim on the placer's behalf via `batch_claim`, capturing the `claim_bounty` if one was set when the order was placed:

```bash
osmosisd tx wasm execute <ORDERBOOK_CONTRACT_ADDR> '{
  "batch_claim": {
    "orders": [[123456, 42], [123457, 43]]
  }
}' --from <KEY>
```

The `batch_claim` flow is what [orderbook-claimbot](https://github.com/osmosis-labs/orderbook-claimbot) automates: scan ticks past `next_bid_tick` and before `next_ask_tick`, push their order ids onto a queue, batch up to 100 per transaction, and capture any configured bounty as revenue. The repo's README is the canonical reference for the scanning logic and architecture.

## Querying state

The contract exposes both CosmWasm-pool-compatible queries (for routing) and orderbook-specific queries (for UIs and bots). Run them with `osmosisd query wasm contract-state smart <contract-addr> '<query-json>'`.

### Pool-compatible queries

These match the interface that the `x/cosmwasmpool` module expects so the orderbook can participate in chain-level routing:

- `spot_price { quote_asset_denom, base_asset_denom }`: current best price.
- `calc_out_amount_given_in { token_in, token_out_denom, swap_fee }`: quote a swap of an exact input.
- `get_total_pool_liquidity {}`: pool's aggregate liquidity in both denoms.
- `get_swap_fee {}`: the contract's swap fee parameter.

### Orderbook-specific queries

For book inspection and order lookup:

- `denoms {}`: returns the configured `base_denom` and `quote_denom`.
- `orderbook_state {}`: returns the orderbook's denoms and the current tick cursors as flat fields: `quote_denom`, `base_denom`, `current_tick`, `next_bid_tick`, `next_ask_tick`.
- `is_active {}`: returns `true` if the contract accepts new orders.
- `all_ticks { start_from, end_at, limit }`: paginated list of all ticks with state. Used by SQS to build its in-memory tick representation.
- `ticks_by_id { tick_ids }`: batch fetch specific ticks.
- `orders_by_owner { owner, start_from, end_at, limit }`: every order placed by an address. Returns `{ orders, count }` where `count` is the number of orders in the response (useful for paginating).
- `orders_by_tick { tick_id, start_from, end_at, limit }`: every order resting at a tick. Returns `{ orders, count }` where `count` is the number of orders in the response.
- `get_maker_fee {}`: the configured maker fee.
- `get_unrealized_cancels { tick_ids }`: for advanced users tracking realized-vs-unrealized accounting.

## Routing through SQS

SQS implements a dedicated routable pool type for orderbooks in [`routable_cw_orderbook_pool.go`](https://github.com/osmosis-labs/sqs/blob/main/router/usecase/pools/routable_cw_orderbook_pool.go). This means an end-user swap routed through `/router/quote` can transparently use orderbook liquidity alongside CFMM and CL pools.

### Discovery

SQS recognises a CosmWasm pool as an orderbook by matching its `code_id` against a configured list (`OrderbookCodeIDs` in [`domain/config.go`](https://github.com/osmosis-labs/sqs/blob/main/domain/config.go)). Once a market is instantiated on chain from a recognised code id, SQS picks it up automatically as soon as it has ingested the pool state, without any operator action.

When multiple orderbook contracts exist for the same base/quote pair, SQS continuously tracks which one has the highest liquidity cap and promotes it to "canonical" for that pair. Two dedicated endpoints expose this view:

- `GET /pools/canonical-orderbook?base=<denom>&quote=<denom>` returns the canonical orderbook pool id for a single pair.
- `GET /pools/canonical-orderbooks` returns the canonical orderbook for every supported pair.

The non-canonical orderbooks still appear in `/pools` and remain reachable through direct-quote queries; they just are not the default routing target.

### Quote and fill flow

- A swap quote returned by SQS may include an orderbook pool in its route. The pool entry's `type` indicates the pool kind.
- SQS quotes orderbook swaps in-process. It walks the orderbook's ticks in Go and prices each tick locally via `TickToPrice`, using state ingested from the chain. It does not call `calc_out_amount_given_in` on the contract at quote time.
- The actual fill happens via a standard `osmosis.poolmanager.v1beta1.MsgSwapExactAmountIn` against the orderbook's pool id, not a CosmWasm execute message. The router treats the orderbook like any other pool from the integrator's perspective; you do not need to construct a `place_limit` execute message yourself when swapping.

### When a new orderbook code id needs registering

A brand-new orderbook *contract instance* spawned from an already-registered code id needs no SQS action. A brand-new *code id* (a new orderbook contract version, typically tied to a chain upgrade) does: it has to be added to `OrderbookCodeIDs` in the SQS deployment config and the service redeployed. See [Adding a custom CosmWasm pool to SQS](https://docs.osmosis.zone/overview/integrate/sqs#adding-a-custom-cosmwasm-pool-to-sqs).

## Admin and moderator messages

The contract has two privileged roles, each with its own offer-and-claim transfer flow. All admin and moderator messages are sent through the `auth` execute namespace, for example:

```bash
osmosisd tx wasm execute <ORDERBOOK_CONTRACT_ADDR> '{
  "auth": { "set_active": { "active": false } }
}' --from <KEY>
```

The contract sets its admin and moderator at instantiation and are hardcoded:
- **Admin** is set to `osmo10d07y265gmmuvt4z0w9aw880jnsr700jjeq4qp`, the Osmosis governance module account. Adminship can only be transferred by an onchain governance proposal that executes `auth { transfer_admin }` followed by the recipient calling `claim_admin`.
- **Moderator** is set to `osmo1peuxfjj66n2qt2v5jmqlvzz8neakjgduez7vttvemw58uug6546sr60ngl`, a DAODAO subDAO designated as a circuit breaker.

### Admin

Permissions verified by [`ensure_is_admin`](https://github.com/osmosis-labs/orderbook/blob/main/contracts/sumtree-orderbook/src/auth.rs) in `auth.rs`. Admin-only execute messages:

- `transfer_admin { new_admin }`: writes the address into the admin-offer slot. Does not change the active admin.
- `cancel_admin_transfer {}`: admin clears their own pending offer.
- `renounce_adminship {}`: removes the admin entirely. After this the contract has no admin.
- `offer_moderator { new_moderator }`: writes the address into the moderator-offer slot. The offered address still has to claim it (see below).
- `set_maker_fee { fee }`: updates the contract's maker fee. Despite living in the enum's "Shared messages" section, the dispatcher enforces admin-only.
- `set_maker_fee_recipient { recipient }`: updates the maker-fee recipient. Also admin-only despite the enum categorisation.

Messages callable by the *address offered admin*, not the current admin:

- `claim_admin {}`: the offered address accepts the offer and becomes admin.
- `reject_admin_transfer {}`: the offered address rejects the offer.

### Moderator

The moderator role exists for incident response; it can pause new orders without giving the holder economic privileges over the orderbook.

- `set_active { active }`: pause or unpause the contract. This is the only "shared" message that actually accepts both admin and moderator (`ensure_is_admin_or_moderator`).
- `claim_moderator {}`: the address offered moderatorship accepts the offer and becomes the moderator.
- `reject_moderator_offer {}`: the offered address rejects.

Note that moderator transfer is one-sided: the admin offers via `offer_moderator`, and only the offered address can accept or reject. There is no `cancel_moderator_offer` message; the admin can overwrite a pending offer by calling `offer_moderator` again.

### Auth queries

`AuthQueryMsg` exposes four read-only queries through the `auth` query namespace: `admin`, `admin_offer`, `moderator`, `moderator_offer`. Each returns the current address holding that slot (or `null` if empty).

See [`msg.rs`](https://github.com/osmosis-labs/orderbook/blob/main/contracts/sumtree-orderbook/src/msg.rs) for the complete `AuthExecuteMsg` and `AuthQueryMsg` definitions and [`auth.rs`](https://github.com/osmosis-labs/orderbook/blob/main/contracts/sumtree-orderbook/src/auth.rs) for the dispatchers.

## Repository references

- Contract: [`osmosis-labs/orderbook`](https://github.com/osmosis-labs/orderbook). Cargo workspace, single contract under `contracts/sumtree-orderbook/`.
- Claimbot: [`osmosis-labs/orderbook-claimbot`](https://github.com/osmosis-labs/orderbook-claimbot). Producer-consumer scanner that batches `batch_claim` transactions.
- SQS routing: [`router/usecase/pools/routable_cw_orderbook_pool.go`](https://github.com/osmosis-labs/sqs/blob/main/router/usecase/pools/routable_cw_orderbook_pool.go) in the SQS repo.
