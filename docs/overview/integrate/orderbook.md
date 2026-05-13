---
sidebar_position: 14
---

# Orderbook

The Osmosis orderbook is a CosmWasm contract that implements a sumtree-backed limit-order venue. Each market is its own contract instance with one quote denom and one base denom, and the contract participates in the chain's pool routing graph alongside CFMM and concentrated-liquidity pools.

This page covers the integration surface: how to discover live orderbook pools, place and cancel orders, query state, and connect to the orderbook from a routing layer such as SQS.

For the high-level mechanism (constant-time limit placements, log-time cancellations, tick math), see the [sumtree-orderbook repository](https://github.com/osmosis-labs/orderbook).

## Where the orderbook lives on-chain

Each orderbook market is a separately instantiated CosmWasm contract. Discovery options:

- **SQS**: the [`/pools`](https://docs.osmosis.zone/overview/integrate/sqs) endpoint returns orderbook pools alongside CFMM and concentrated-liquidity pools. This is the recommended path for any frontend or bot that needs to know the active orderbook markets.
- **On-chain via cosmwasm-pool module**: orderbooks are registered as `x/cosmwasmpool` pool types; their pool IDs are addressable through `osmosis.poolmanager.v1beta1.Query.Pool` like any other pool.
- **Direct contract address**: once you know an orderbook's contract address you can talk to it with `osmosisd query wasm contract-state smart <contract-addr> '<query-json>'`.

Code IDs for the canonical orderbook contract are governance-managed and may change with each upgrade. Read the live SQS pools list or chain-state at submission time rather than hardcoding a code ID in client code.

## Instantiation parameters

When a new orderbook market is instantiated, the parameters are:

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
    "claim_bounty": "0.001"
  }
}' --amount "1000000uusdc" --from <KEY> --gas auto --gas-prices 0.0025uosmo --gas-adjustment 1.3
```

Fields:

- `tick_id`: signed integer addressing the price tick at which to rest the order. Tick semantics match the CL convention; the corresponding price is derivable from the tick math in [`orderbook.rs`](https://github.com/osmosis-labs/orderbook/blob/main/contracts/sumtree-orderbook/src/orderbook.rs).
- `order_direction`: `"bid"` (offering quote to buy base) or `"ask"` (offering base to sell into quote).
- `quantity`: an integer string. For bids this is the quote-denom amount the order will spend if fully filled at `tick_id`; for asks it is the base-denom amount being offered.
- `claim_bounty` (optional, decimal string): the fraction of the order's payout the placer is willing to pay any third party that claims the filled order on their behalf. Enables the claimbot economic flywheel described below.

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
- `calc_out_amt_given_in { token_in, token_out_denom, swap_fee }`: quote a swap of an exact input.
- `get_total_pool_liquidity {}`: pool's aggregate liquidity in both denoms.
- `get_swap_fee {}`: the contract's swap fee parameter.

### Orderbook-specific queries

For book inspection and order lookup:

- `denoms {}`: returns the configured `base_denom` and `quote_denom`.
- `orderbook_state {}`: the full `Orderbook` struct including `next_bid_tick`, `next_ask_tick`, and active flag.
- `is_active {}`: returns `true` if the contract accepts new orders.
- `all_ticks { start_from, end_at, limit }`: paginated list of all ticks with state. Used by SQS to build its in-memory tick representation.
- `ticks_by_id { tick_ids }`: batch fetch specific ticks.
- `orders_by_owner { owner, start_from, end_at, limit }`: every order placed by an address.
- `orders_by_tick { tick_id, start_from, end_at, limit }`: every order resting at a tick.
- `get_maker_fee {}`: the configured maker fee.
- `get_unrealized_cancels { tick_ids }`: for advanced users tracking realized-vs-unrealized accounting.

## Routing through SQS

SQS implements a dedicated routable pool type for orderbooks in [`routable_cw_orderbook_pool.go`](https://github.com/osmosis-labs/sqs/blob/main/router/usecase/pools/routable_cw_orderbook_pool.go). This means an end-user swap routed through `/router/quote` can transparently use orderbook liquidity alongside CFMM and CL pools.

Operationally this means:

- A swap quote returned by SQS may include an orderbook pool in its route. The pool entry's `type` indicates the pool kind.
- The orderbook contract is queried with `calc_out_amt_given_in` to price the swap, and the actual fill happens via a standard `osmosis.poolmanager.v1beta1.MsgSwapExactAmountIn` against the orderbook's pool id.
- The router treats the orderbook like any other pool from the integrator's perspective; you do not need to construct a `place_limit` execute message yourself when swapping.

If you operate a new orderbook market and want it surfaced in SQS routing, the contract code id needs to be registered in the SQS deployment. Coordinate with the SQS team (see [Adding a custom CosmWasm pool to SQS](https://docs.osmosis.zone/overview/integrate/sqs#adding-a-custom-cosmwasm-pool-to-sqs)).

## Admin and moderator messages

The contract has a two-tier permissioned interface for administrative operations:

- **Admin**: can transfer adminship, set the maker fee, set the maker-fee recipient, and renounce. Adminship transfers go through a two-step `transfer_admin` then `claim_admin` flow with a separate `cancel_admin_transfer` and `reject_admin_transfer` for safety.
- **Moderator**: can pause the contract via `set_active { active: false }` to stop new orders. Used in incident response.

Both roles are settable via the `auth` execute submessage namespace. See [`msg.rs`](https://github.com/osmosis-labs/orderbook/blob/main/contracts/sumtree-orderbook/src/msg.rs) for the full `AuthExecuteMsg` and `AuthQueryMsg` enums.

## Repository references

- Contract: [`osmosis-labs/orderbook`](https://github.com/osmosis-labs/orderbook). Cargo workspace, single contract under `contracts/sumtree-orderbook/`.
- Claimbot: [`osmosis-labs/orderbook-claimbot`](https://github.com/osmosis-labs/orderbook-claimbot). Producer-consumer scanner that batches `batch_claim` transactions.
- SQS routing: [`router/usecase/pools/routable_cw_orderbook_pool.go`](https://github.com/osmosis-labs/sqs/blob/main/router/usecase/pools/routable_cw_orderbook_pool.go) in the SQS repo.
