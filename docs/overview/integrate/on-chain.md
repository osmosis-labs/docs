---
sidebar_position: 3
---

# Concentrated Liquidity Integration


Concentrated liquidity is a novel Automated Market Maker (AMM) design introduced by Uniswap that allows for more efficient use of capital. The improvement is achieved by providing liquidity in specific price ranges chosen by the user.

For instance, a pool with stablecoin pairs like USDC/USDT has a spot price that should always be trading near 1. As a result, Liquidity Providers (LPs) can focus their capital in a small range around 1, rather than the full range from 0 to infinity. This approach leads to an average of 200-300x higher capital efficiency. Moreover, traders benefit from lower price impact because the pool incentivizes greater depth around the current price.

Concentrated liquidity also opens up new opportunities for providing liquidity rewards to desired strategies. For example, it's possible to incentivize LPs based on their position's proximity to the current price and the time spent within that position. This design also allows for a new "range order" type, similar to a limit order with order-books.


The following information is meant to provide Vaul Creators with all the information needed to interact and develop concentrated liquidity vaults. 

# Index

1. [Concentrated liquidity for On-chain Vault Creators](#On-chain-Vault-Creators)
3. [Clients](#clients)
   - [JS Client - (OsmoJS)](#js-client---osmojs)
     - [Install OsmoJS](#install-osmojs)
     - [Start Client](#start-client)
   - [CosmWasm - (`osmosis-std`)](#CosmWasm---osmosis-std)
   - [Hummingbot client](#hummingbot-client)
4. [Concentrated Liquidity Module Messages](#concentrated-liquidity-module-messages)
   - [MsgCreatePosition](#msgcreateposition)
   - [MsgWithdrawPosition](#msgwithdrawposition)
   - [MsgCreatePool](#msgcreatepool)
   - [MsgCollectSpreadRewards](#msgcollectspreadrewards)
   - [MsgFungifyChargedPositions](#msgfungifychargedpositions)
5. [Incentives](#incentives)
   - [Incentive Creation and Querying](#incentive-creation-and-querying)
   - [Reward Splitting Between Classic and CL Pools](#reward-splitting-between-classic-and-cl-pools)
6. [Parameters](#parameters)
7. [Listeners](#listeners)
   - [AfterConcentratedPoolCreated](#afterconcentratedpoolcreated)
   - [AfterInitialPoolPositionCreated](#afterinitialpoolpositioncreated)
   - [AfterLastPoolPositionRemoved](#afterlastpoolpositionremoved)
   - [AfterConcentratedPoolSwap](#afterconcentratedpoolswap)
8. [State Entries and KV Store Management](#state-entries-and-kv-store-management)
9. [Terminology](#terminology)
10. [TWAP Integration](#twap-integration)
11. [External Sources](#external-sources)



# Clients
The following clients are available to interact with the Concentrated liquidity modules in Osmosis.
 - [JS Client - (OsmoJS)](#js-client---osmojs)
 - [Osmosis-rust Client (Cosmwasm)](#osmosis-rust-client-cosmwasm)
 - [Hummingbot client](#hummingbot-client)
   
## JS Client - (OsmoJS)
Concentrated liquidity is available on the OsmoJS package. For more information please visit: https://github.com/osmosis-labs/osmojs


## CosmWasm - (`osmosis-std`)

Concentrated liquidity types and querier are available on [`osmosis-std` create.](https://crates.io/crates/osmosis-std/)

### Install `osmosis-std`
```bash
cargo add osmosis-std
```

### Usage

The following is an example of how you might use types and querier in your CosmWasm contract, for more info, see the crate's [doc.rs](https://docs.rs/osmosis-std/osmosis_std/types/osmosis/concentratedliquidity/index.html).

Note that queries are only available if they are [whitelisted here](https://github.com/osmosis-labs/osmosis/blob/main/wasmbinding/stargate_whitelist.go).

```rs
use osmosis_std::types::osmosis::concentratedliquidity::v1beta1 as cl;


/// Create a copied position where owner of the position is this contract
/// and as desired amount might not be met, token_min_amount0 and token_min_amount1 are required
fn copy_position(
    deps: DepsMut,
    env: Env,
    position_id: u64,
    token_min_amount0: Uint128,
    token_min_amount1: Uint128,
) -> Result<Response, ContractError> {
    // construct concentrated liquidity querier
    let cl_querier = cl::ConcentratedliquidityQuerier::new(&deps.querier);

    // query position by id
    let cl::QueryPositionByIdResponse { position } = cl_querier.position_by_id(position_id)?;
    let position_with_breakdown =
        position.ok_or_else(|| StdError::not_found("Position with breakdown"))?;

    let position = position_with_breakdown
        .position
        .ok_or_else(|| StdError::not_found("Position"))?;

    // create position with the same parameters
    let msg_create_position = cl::MsgCreatePosition {
        pool_id: position.pool_id,
        sender: env.contract.address.to_string(),
        lower_tick: position.lower_tick,
        upper_tick: position.upper_tick,
        token_desired0: position_with_breakdown.asset0,
        token_desired1: position_with_breakdown.asset1,
        token_min_amount0: token_min_amount0.to_string(),
        token_min_amount1: token_min_amount1.to_string(),
    };

    Ok(Response::new()
        .add_message(msg_create_position)
        .add_attribute("method", "copy_position")
        .add_attribute("position_id", position_id.to_string())
        .add_attribute("token_min_amount0", token_min_amount0.to_string())
        .add_attribute("token_min_amount1", token_min_amount1.to_string()))
}
```

# Concentrated Liquidity Module Messages

### `MsgCreatePosition`

- **Request**

This message allows LPs to provide liquidity between `LowerTick` and `UpperTick`
in a given `PoolId`. The user provides the amount of each token desired. Since
LPs are only allowed to provide liquidity proportional to the existing reserves,
the actual amount of tokens used might differ from requested. As a result, LPs
may also provide the minimum amount of each token to be used so that the system fails
to create position if the desired amounts cannot be satisfied.

Three KV stores are initialized when a position is created:

1. `Position ID -> Position` - This is a mapping from a unique position ID to a
position object. The position ID is a monotonically increasing integer that is
incremented every time a new position is created.
2. `Owner | Pool ID | Position ID -> Position ID` - This is a mapping from a
composite key of the owner address, pool ID, and position ID to the position ID.
This is used to keep track of all positions owned by a given owner in a given pool.
3. `Pool ID -> Position ID` - This is a mapping from a pool ID to a position ID.
This is used to keep track of all positions in a given pool.

```go
type MsgCreatePosition struct {
 PoolId          uint64
 Sender          string
 LowerTick       int64
 UpperTick       int64
 TokenDesired0   types.Coin
 TokenDesired1   types.Coin
 TokenMinAmount0 github_com_cosmos_cosmos_sdk_types.Int
 TokenMinAmount1 github_com_cosmos_cosmos_sdk_types.Int
}
```

- **Response**

On successful response, we receive the actual amounts of each token used to
create the liquidityCreated number of shares in the given range.

```go
type MsgCreatePositionResponse struct {
 PositionId  uint64
 Amount0 github_com_cosmos_cosmos_sdk_types.Int
 Amount1 github_com_cosmos_cosmos_sdk_types.Int
 JoinTime google.protobuf.Timestamp
 LiquidityCreated github_com_cosmos_cosmos_sdk_types.Dec

}
```

This message should call the `createPosition` keeper method that is introduced
in the `"Liquidity Provision"` section of this document.

### `MsgWithdrawPosition`

- **Request**

This message allows LPs to withdraw their position via their position ID,
potentially in partial amount of liquidity. It should fail if the position ID
does not exist or if attempting to withdraw an amount higher than originally
provided. If an LP withdraws all of their liquidity from a position, then the
position is deleted from state along with the three KV stores that were
initialized in the `MsgCreatePosition` section. However, the spread factor accumulators
associated with the position are still retained until a user claims them manually.

```go
type MsgWithdrawPosition struct {
 PositionId      uint64
 Sender          string
 LiquidityAmount github_com_cosmos_cosmos_sdk_types.Dec
}
```

- **Response**

On successful response, we receive the amounts of each token withdrawn
for the provided share liquidity amount.

```go
type MsgWithdrawPositionResponse struct {
 Amount0 github_com_cosmos_cosmos_sdk_types.Int
 Amount1 github_com_cosmos_cosmos_sdk_types.Int
}
```

This message should call the `withdrawPosition` keeper method that is introduced
in the `"Liquidity Provision"` section of this document.

### `MsgCreatePool`

This message is responsible for creating a concentrated-liquidity pool.
It propagates the execution flow to the `x/poolmanager` module for pool id
management and for routing swaps.

```go
type MsgCreateConcentratedPool struct {
 Sender                    string
 Denom0                    string
 Denom1                    string
 TickSpacing               uint64
 SpreadFactor                   github_com_cosmos_cosmos_sdk_types.Dec
}
```

- **Response**

On successful response, the pool id is returned.

```go
type MsgCreateConcentratedPoolResponse struct {
 PoolID uint64
}
```

### `MsgCollectSpreadRewards`

This message allows collecting rewards from spreads for multiple position IDs from a
single owner.

The spread factor collection is discussed in more detail in the "Spread Rewards" section of this document.

```go
type MsgCollectSpreadRewards struct {
 PositionIds    []uint64
 Sender         string
}
```

- **Response**

On successful response, the collected tokens are returned.
The sender should also see their balance increase by the returned
amounts.

```go
type MsgCollectSpreadRewardsResponse struct {
 CollectedSpreadRewards []types.Coin
}
```

### `MsgFungifyChargedPositions`

This message allows fungifying the fully charged unlocked positions belonging to the same owner
and located in the same tick range.
MsgFungifyChargedPosition takes in a list of positionIds and combines them into a single position.
It validates that all positions belong to the same owner, are in the same ticks and are fully charged.
Fails if not. Otherwise, it creates a completely new position P. P's liquidity equals to the sum of all
liquidities of positions given by positionIds. The uptime of the join time of the new position equals
to current block time - max authorized uptime duration (to signify that it is fully charged).
The previous positions are deleted from state. Prior to deleting, the rewards are claimed.
The old position's unclaimed rewards are transferred to the new position.
The new position ID is returned.

```go
type MsgFungifyChargedPositions struct {
 PositionIds    []uint64
 Sender         string
}
```

- **Response**

On successful response, the new position id is returned.

```go
type MsgFungifyChargedPositionsResponse struct {
 NewPositionId uint64
}
```


# Incentives
At launch, Osmosis's CL incentives will primarily be in the format described [here](https://github.com/osmosis-labs/osmosis/blob/main/x/concentrated-liquidity/README.md) while we iron out a mechanism that achieves the remaining two properties predictably and effectively. As a piece of foreshadowing, the primary problem space we will be tackling is the following: status quo incentives advantage LPs who keep their liquidity off the books until a trade happens, ultimately pushing liquidity off of the DEX and creating ambiguity around the "real" liquidity depth. This forces traders to make uninformed decisions about where to trade their assets (or worse, accept worse execution on an inferior venue).

In other words, instead of having incentives go towards bootstrapping healthy liquidity pools, they risk going towards adversely pushing volume to other exchanges at the cost of the DEX, active LPs, and ultimately traders.

Note on supported and authorized uptimes
If you dig through our incentives logic, you might find code dealing with notions of Supported Uptimes and Authorized Uptimes. These are for an uptime incentivization mechanism we are keeping off at launch while we refine a more sophisticated version. We leave the state-related parts in core logic to ensure that if we do decide to turn the feature on (even if just to experiment), it could be done by a simple governance proposal (to add more supported uptimes to the list of authorized uptimes) and not require a state migration for pools. At launch, only the 1ns uptime will be authorized, which is roughly equivalent to status quo CL incentives with the small difference that positions that are created and closed in the same block are not eligible for any incentives.

For the sake of clarity, this mechanism functions very similarly to status quo incentives, but it has a separate accumulator for each supported uptime and ensures that only liquidity that has been in the pool for the required amount of time qualifies for claiming incentives.


## Incentive Creation and Querying

While it is technically possible for Osmosis to enable the creation of incentive records directly in the CL module, incentive creation is currently funneled through existing gauge infrastructure in the `x/incentives` module. This simplifies UX drastically for frontends, external incentive creators, and governance, while making CL incentives fully backwards-compatible with incentive creation and querying flows that everyone is already used to. As of the initial version of Osmosis's CL, all incentive creation and querying logic will be handled by respective gauge functions (e.g. the `IncentivizedPools` query in the `x/incentives` module will include CL pools that have internal incentives on them).

To create a gauge dedicated to the concentrated liquidity pool, run a `MsgCreateGauge` message in the `x/incentives` module with the following parameter constraints:
- `PoolId`: The ID of the CL pool to create a gauge for.
- `DistrTo.LockQueryType` must be set to `locktypes.LockQueryType.NoLock`
- `DistrTo.Denom` must be an empty string.

The rest of the parameters can be set according to the desired configuration of the gauge. Please read the `x/incentives` module documentation for more information on how to configure gauges.

Note, that the created gauge will start emitting at the first epoch after the given `StartTime`. During the epoch, a `x/concentrated-liquidity`
module `IncentiveRecord` will be created for every denom in the gauge. This incentive record will be configured to emit all given incentives
over the period of an epoch. If the gauge is non-perpetual (emits over several epochs), the distribution will be split evenly between the epochs.
and a new `IncentiveRecord` will be created for each denom every epoch with the emission rate and token set to finish emitting at the end of the epoch.

## Reward Splitting Between Classic and CL pools

While we want to nudge Classic pool LPs to transition to CL pools, we also want to ensure that we do not have a hard cutoff for incentives where past a certain point it is no longer worth it to provide liquidity to Classic pools. This is because we want to ensure that we have a healthy transition period where liquidity is not split between Classic and CL pools, but rather that liquidity is added to CL pools while Classic pools are slowly drained of liquidity.

To achieve this in a way that is difficult to game and efficient for the chain to process, we will be using a **reward-splitting** mechanism that treats _bonded_ liquidity in a Classic pool that is paired by governance to a CL pool (e.g. for the purpose of migration) as a single full-range position on the CL pool for the purpose of calculating incentives. Note that this _does not affect spread reward distribution_ and only applies to the flow of incentives through a CL pool.

One implication of this mechanism is that it moves the incentivization process to a higher level of abstraction (incentivizing _pairs_ instead of _pools_). For internal incentives (which are governance managed), this is in line with the goal of continuing to push governance to require less frequent actions, which this change ultimately does.

To keep a small but meaningful incentive for LPs to still migrate their positions, we have added a **discount rate** to incentives that are redirected to Classic pools. This is initialized to 5% by default but is a governance-upgradable parameter that can be increased in the future. A discount rate of 100% is functionally equivalent to all the incentives staying in the CL pool.



# Parameters

- `AuthorizedQuoteDenoms` []string

This is a list of quote denoms that can be used as token1 when creating a pool.
We limit the quote assets to a small set for the purposes of having convenient
price increments stemming from tick to price conversion. These increments are
in a human readable magnitude only for token1 as a quote. For limit orders in
the future, this will be a desirable property in terms of UX as to allow users
to set limit orders at prices in terms of token1 (quote asset) that are easy
to reason about.

This goes in-hand with centralized exchanges that limit the quote asset set
to only a few denoms.

Our list at launch is expected to consist of OSMO, DAI and USDC. These are set
in the v16 upgrade handler.

- `IsPermisionlessPoolCreationEnabled` bool

The flag indicating whether permissionless pool creation is enabled or not. For
launch, we have decided to disable permissionless pool creation. It will still
be enabled via governance. This is because we want to limit the number of pools
for risk management and want to avoid fragmenting liquidity for major denom
pairs with configurations of tick spacing that are not ideal.

# Listeners

## `AfterConcentratedPoolCreated`

This listener executes after the pool is created.

At the time of this writing, it is only utilized by the `x/twap` module.
The twap module is expected to create twap records where the last error time
is set to the block time of when the pool was created. This is because there
is no liquidity in the pool at creation time.

## `AfterInitialPoolPositionCreated`

This listener executes after the first position is created in a concentrated
liquidity pool.

At the time of this writing, it is only utilized by the `x/twap` module.

## `AfterLastPoolPositionRemoved`

This listener executes after the last position is removed in a concentrated
liquidity pool.

At the time of this writing, it is only utilized by the `x/twap` module.

## `AfterConcentratedPoolSwap`

This listener executes after a swap in a concentrated liquidity pool.

At the time of this writing, it is only utilized by the `x/twap` module.


## State entries and KV store management
The following are the state entries (key and value pairs) stored for the concentrated liquidity module. 

- structs
  - TickPrefix + pool ID + tickIndex ➝ Tick Info struct
  - PoolPrefix + pool id ➝ pool struct
  - IncentivePrefix | pool id | min uptime index | denom | addr ➝ Incentive Record body struct
- links
  - positionToLockPrefix | position id ➝ lock id
  - lockToPositionPrefix | lock id ➝ position id
  - PositionPrefix | addr bytes | pool id | position id ➝ boolean
  - PoolPositionPrefix | pool id | position id ➝ boolean

Note that for storing ticks, we use 9 bytes instead of directly using uint64, first byte being reserved for the Negative / Positive prefix, and the remaining 8 bytes being reserved for the tick itself, which is of uint64. Although we directly store signed integers as values, we use the first byte to indicate and re-arrange tick indexes from negative to positive.


# Terminology

We will use the following terms throughout the document and our codebase:

- `Tick` - a unit that has a 1:1 mapping with price

- `Bucket` - an area between two initialized ticks.

- `Tick Range` - a general term to describe a concept with lower and upper bound.
  * Position is defined on a tick range.
  * Bucket is defined on a tick range.
  * A trader performs a swap over a tick range.

- `Tick Spacing` - the distance between two ticks that can be initialized. This is
what defines the minimum bucket size.

Note that ticks are defined inside buckets. Assume tick spacing is 100. A liquidity provider
creates a position with amounts such that the current tick is 155 between ticks 100 and 200.

Note, that the current tick of 155 is defined inside the bucket over a range of 100 to 200.

# Liquidity Depths Calculation
Please refer to https://github.com/osmosis-labs/osmosis/pull/5673 for liquidity depths calculation for CL Pools. (This is just a place holder, will link correct link for doc once merged to main)


# TWAP Integration

In the context of twap, concentrated liquidity pools function differently from
CFMM pools.

There are 2 major differences that stem from how the liquidity is added and
removed in concentrated-liquidity.

The first one is given by the fact that a user does not provide liquidity at
pool creation time. Instead, they have to issue a separate message post-pool
creation. As a result, there can be a time where there is no valid spot price
initialized for a concentrated liquidity pool. When a concentrated liquidity pool
is created, the `x/twap` module still initializes the twap records. However, these
records are invalidated by setting the "last error time" field to the block time
at pool creation. Only adding liquidity to the pool will initialize the spot price
and twap records correctly. One technical detail to note is that adding liquidity
in the same block as pool creation will still set the "last error time" field to
the block time despite spot price already being initialized. Although we fix an
error within that block, it still occurs. As a result, this is deemed acceptable.
However, this is a technical trade-off for implementation simplicity and not an
intentional design decision.

The second difference from balancer pools is focused around the fact that
liquidity can be completely removed from a concentrated liquidity pool,
making its spot price be invalid.

To recap the basic LP functionality in concentrated liquidity, a user adds
liqudity by creating a position. To remove liquidity, they withdraw their
position. Contrary to CFMM pools, adding or removing liquidity does not affect
the price in 99% of the cases in concentrated liquidity. The only two exceptions
to this rule are:

**Creating the first position in the pool.**

In this case, we transition from invalid state where there is no liqudity, and
the spot price is uninitialized to the state where there is some liqudity, and
as a result a valid spot price.

Note, that if there is a pool where liqudiity is completely drained and re-added,
the TWAP's last error time will be pointing at the time when the liquidity was drained.
This is different from how twap functions in CFMM pool where liquidity cannot
be removed in-full.

**Removing the last position in the pool.**

In this case, we transition from a valid state with liquidity and spot price to
an invalid state where there is no liquidity and, as a result, no valid spot
price anymore. The last spot price error will be set to the block time of when
the last position was removed.

To reiterate, the above two exceptions are the only cases where twap is updated
due to adding or removing liquidity.

The major source of updates with respect to twap is the swap logic. It functions
similarly to CFMM pools where upon the completion of a swap, a listener `AfterConcentratedPoolSwap`
propagates the execution to the twap module for the purposes of tracking state updates
necessary to retrieve the spot price and update the twap accumulators
(more details in x/twap module).

Lastly, see the "Listeners" section for more details on how twap is enabled by
the use of these hooks.


## External Sources

- [Uniswap V3 Whitepaper](https://uniswap.org/whitepaper-v3.pdf)
- [Technical Note on Liquidity Math](https://atiselsts.github.io/pdfs/uniswap-v3-liquidity-math.pdf)


