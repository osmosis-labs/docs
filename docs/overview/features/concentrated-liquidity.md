---
sidebar_position: 2
---

# Concentrated Liquidity
## Background

Concentrated liquidity is a novel Automated Market Maker (AMM) design introduced
by Uniswap that allows for more efficient use of capital. The improvement is
achieved by providing liquidity in specific price ranges chosen by the user.

For instance, a pool with stablecoin pairs like USDC/USDT has a spot price that
should always be trading near 1. As a result, Liquidity Providers (LPs) can
focus their capital in a small range around 1, rather than the full range from 0
to infinity. This approach leads to an average of 200-300x higher capital
efficiency. Moreover, traders benefit from lower price impact because the pool
incentivizes greater depth around the current price.

Concentrated liquidity also opens up new opportunities for providing liquidity
rewards to desired strategies. For example, it's possible to incentivize LPs
based on their position's proximity to the current price and the time spent
within that position. This design also allows for a new "range order" type,
similar to a limit order with order-books.

For comprehensive technical information, we highly recommend reading the complete README of concentrated liquidity, available at https://github.com/osmosis-labs/osmosis/blob/main/x/concentrated-liquidity/README.md


## Our Implementation
At launch, Osmosis's CL incentives will primarily be in the format described [here](https://github.com/osmosis-labs/osmosis/blob/main/x/concentrated-liquidity/README.md) while we iron out a mechanism that achieves the remaining two properties predictably and effectively. As a piece of foreshadowing, the primary problem space we will be tackling is the following: status quo incentives advantage LPs who keep their liquidity off the books until a trade happens, ultimately pushing liquidity off of the DEX and creating ambiguity around the "real" liquidity depth. This forces traders to make uninformed decisions about where to trade their assets (or worse, accept worse execution on an inferior venue).

In other words, instead of having incentives go towards bootstrapping healthy liquidity pools, they risk going towards adversely pushing volume to other exchanges at the cost of the DEX, active LPs, and ultimately traders.

Note on supported and authorized uptimes
If you dig through our incentives logic, you might find code dealing with notions of Supported Uptimes and Authorized Uptimes. These are for an uptime incentivization mechanism we are keeping off at launch while we refine a more sophisticated version. We leave the state-related parts in core logic to ensure that if we do decide to turn the feature on (even if just to experiment), it could be done by a simple governance proposal (to add more supported uptimes to the list of authorized uptimes) and not require a state migration for pools. At launch, only the 1ns uptime will be authorized, which is roughly equivalent to status quo CL incentives with the small difference that positions that are created and closed in the same block are not eligible for any incentives.

For the sake of clarity, this mechanism functions very similarly to status quo incentives, but it has a separate accumulator for each supported uptime and ensures that only liquidity that has been in the pool for the required amount of time qualifies for claiming incentives.


### Incentive Creation and Querying

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

### Reward Splitting Between Classic and CL pools

While we want to nudge Classic pool LPs to transition to CL pools, we also want to ensure that we do not have a hard cutoff for incentives where past a certain point it is no longer worth it to provide liquidity to Classic pools. This is because we want to ensure that we have a healthy transition period where liquidity is not split between Classic and CL pools, but rather that liquidity is added to CL pools while Classic pools are slowly drained of liquidity.

To achieve this in a way that is difficult to game and efficient for the chain to process, we will be using a **reward-splitting** mechanism that treats _bonded_ liquidity in a Classic pool that is paired by governance to a CL pool (e.g. for the purpose of migration) as a single full-range position on the CL pool for the purpose of calculating incentives. Note that this _does not affect spread reward distribution_ and only applies to the flow of incentives through a CL pool.

One implication of this mechanism is that it moves the incentivization process to a higher level of abstraction (incentivizing _pairs_ instead of _pools_). For internal incentives (which are governance managed), this is in line with the goal of continuing to push governance to require less frequent actions, which this change ultimately does.

To keep a small but meaningful incentive for LPs to still migrate their positions, we have added a **discount rate** to incentives that are redirected to Classic pools. This is initialized to 5% by default but is a governance-upgradable parameter that can be increased in the future. A discount rate of 100% is functionally equivalent to all the incentives staying in the CL pool.

## TWAP Integration

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

## Precision Issues With Price

There are precision issues that we must be considerate of in our design.

Consider the balancer pool between `arb` base unit and `uosmo`:

```bash
osmosisd q gamm pool 1011
pool:
  '@type': /osmosis.gamm.v1beta1.Pool
  address: osmo1pv6ffw8whyle2nyxhh8re44k4mu4smqd7fd66cu2y8gftw3473csxft8y5
  future_pool_governor: 24h
  id: "1011"
  pool_assets:
  - token:
      amount: "101170077995723619690981"
      denom: ibc/10E5E5B06D78FFBB61FD9F89209DEE5FD4446ED0550CBB8E3747DA79E10D9DC6
    weight: "536870912000000"
  - token:
      amount: "218023341414"
      denom: uosmo
    weight: "536870912000000"
  pool_params:
    exit_fee: "0.000000000000000000"
    smooth_weight_change_params: null
    swap_fee: "0.002000000000000000"
  total_shares:
    amount: "18282469846754434906194"
    denom: gamm/pool/1011
  total_weight: "1073741824000000"
```

Let's say we want to migrate this into a CL pool where `uosmo` is the quote
asset and `arb` base unit is the base asset.

Note that quote asset is denom1 and base asset is denom0.
We want quote asset to be `uosmo` so that limit orders on ticks
have tick spacing in terms of `uosmo` as the quote.

Note:
- OSMO has precision of 6. 1 OSMO = 10**6 `uosmo`
- ARB has precision of 18. 1 ARB = 10**18 `arb` base unit

Therefore, the true price of the pool is:
```python
>>> (218023341414 / 10**6)  / (101170077995723619690981 / 10**18)
2.1550180224553714
```

However, in our core logic it is represented as:

```python
218023341414 / 101170077995723619690981
2.1550180224553714e-12
```

or

```python
osmosisd q gamm spot-price 1011 uosmo ibc/10E5E5B06D78FFBB61FD9F89209DEE5FD4446ED0550CBB8E3747DA79E10D9DC6
spot_price: "0.000000000002155018"
```

As a protocol, we need to accommodate prices that are very far apart.
In the example above, the difference between `10**6 and 10**18`

Most of the native precision is 10**6. However, most of the ETH
precision is 10**18.

This starts to matter for assets such as `upepe`. That have
a precision of 18 and a very low price level relative to
the quote asset that has precision of 6 (e.g `uosmo` or `uusdc`).

The true price of PEPE in USDC terms is `0.0000009749`.

In the "on-chain representation", this would be:
`0.0000009749 * 10**6 / 10**18 = 9.749e-19`

Note that this is below the minimum precision of `sdk.Dec`.

Additionally, there is a problem with tick to sqrt price conversions
where at small price levels, two sqrt prices can map to the same
tick.

As a workaround, we have decided to limit min spot price to 10^-12
and min tick to `-108000000`. It has been shown at at price levels
below 10^-12, this issue is most apparent. See this issue for details:
<https://github.com/osmosis-labs/osmosis/issues/5550>

Now, we have a problem that we cannot handle pairs where
the quote asset has a precision of 6 and the base asset has a
precision of 18.

Note that this is not a problem for pairs where the quote asset
has a precision of 18 and the base asset has a precision of 6.
E.g. OSMO/DAI.

### Solution

At launch, pool creation is permissioned. Therefore, we can
ensure correctness for the initial set of pools.

Long term, we will implement a wrapper contract around concentrated liquidity
that will handle the precision issues and scale the prices to all have a precision of at most 12.

The contract will have to handle truncation and rounding to determine
how to handle dust during this process. The truncated amount can be significant.
That being said, this problem is out of scope for this document.

## Terminology

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


## External Sources

- [Uniswap V3 Whitepaper](https://uniswap.org/whitepaper-v3.pdf)
- [Technical Note on Liquidity Math](https://atiselsts.github.io/pdfs/uniswap-v3-liquidity-math.pdf)

## Repository
For more an in-depth docs and implementation, please visit: https://github.com/osmosis-labs/osmosis/tree/main/x/concentrated-liquidity