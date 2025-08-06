---
sidebar_position: 7
---
# Liquidity Incentives

Liquidity Providers on Osmosis receive swap fees by default, but can receive additional liquidity incentives through the permissionless creation of external liquidity mining gauges, allowing projects to add their own rewards to further incentivize users to provide liquidity into a pool.

## How to add External Incentives to a pool

External Incentives are an effective way to incentivize users to provide liquidity by enabling an additional reason to provide liquidity apart from swap fees.

Creating an incentive gauge is permissionless, anyone can deposit tokens into a gauge to be distributed as bonding incentives.

There is a small fee in OSMO to create a gauge, which is transferred from the running wallet's balance to the Osmosis Community Pool. At the time of writing this is 50 OSMO.

### Classic and Stableswap Pool Distribution mechanism
In Classic and Stableswap pools, it is possible to add incentives to 14-day gauges*. As long as a provider bonds liquidity for at least the time that is specified, they will receive a share of incentives at epoch. 

* 1 and 7 day gauges are also possible through the SDK, but this is **not** suggested and may be removed entirely in the near future

### Supercharged Pool Distribution mechanism
In Supercharged pools, incentives are distributed block by block according to the ratio of liquidity provision to the active tick.
For example, if 14,400 FOO per day is allocated to the pool, with an average of six seconds per block, there will be 1 FOO distributed per block.

In this example Wosmongton and Amelia are both providing the same quantity of tokens to the Supercharged pool.

Wosmongton provides liquidity across a nine times wider range than Amelia. Therefore, Amelia is providing nine times the liquidity at the active tick. 

Wosmongton receives 0.1 FOO per block, while Amelia receives 0.9 FOO per block. Amelia's liquidity is more efficiently used, but may require adjusting more frequently and so would be subject to impermanent loss and trading fees in order to establish a new position around the new active tick.


### Creating an External Incentives Gauge
Currently, the only way to create an external incentive gauge is to use the [CLI](https://docs.osmosis.zone/osmosis-core/osmosisd).

The command to run takes the format:
`osmosisd tx incentives create-gauge [lockup_denom] [reward] [poolId] [flags]`

`[lockup_denom]` takes the form of the pool's GAMM token such as gamm/pool/1, this can be set to 0 for Supercharged pools

`[reward]` is the quantity of the base denom that you are adding to the pool, such as 1355000000uosmo for 1355 OSMO tokens.

`[poolId]` is the pool ID of the Supercharged pool, this should be set to 0 for Classic and Stableswap pools

`[flags]` required specific to this transaction are 

`--duration` 

 * In Classic or Stableswap pools this specifies the length of time that a provider must be bonded for to receive incentives. This is typically 336h.

 * In Supercharged pools this specifies the length of time that a position must be in place to receive incentives. Permitted values are 1ns, 60s, 1h and 24h. Typical values are 60s or 1h for a volatile pairing, and 1h or 24h for a highly correlated pairing. If not specified this defaults to 1 minute.

`--epochs` which specifies the number of days that these incentives will be distributed over

`--start-time` which specifies a Unix timestamp to begin incentives on, they will begin distribution the epoch after this time

**Example Supercharged command**

`osmosisd tx incentives create-gauge 0 1355000000uosmo 1081 --epochs 30 --duration 60s --start-time 1698328800 --from Wosmongton --gas=auto --gas-prices 0.0025uosmo --gas-adjustment 1.3`

**Example Classic Pool command**

`osmosisd tx incentives create-gauge gamm/pool/1 1355000000uosmo 0 --duration 336h --epochs 30 --start-time 1698328800 --from Wosmongton --gas=auto --gas-prices 0.0025uosmo --gas-adjustment 1.3`