# Mint

The `mint` module is responsible for creating tokens in a flexible way to reward
validators, incentivize providing pool liquidity, provide funds for Osmosis governance,
and pay developers to maintain and improve Osmosis.

The module is also responsible for reducing the token creation and distribution by a set period
until it reaches its maximum supply (see `reduction_factor` and `reduction_period_in_epochs`)

The module uses time basis epochs supported by the `epochs` module.

## Contents

1. **[Concept](#concepts)**
2. **[State](#state)**
3. **[Begin Epoch](#begin-epoch)**
4. **[Parameters](#network-parameters)**
5. **[Events](#events)**
6. **[Queries](#queries)**

## Concepts

The `x/mint` module is designed to handle the regular printing of new
tokens within a chain. The design taken within Osmosis is to

- Mint new tokens once per epoch (default one week)
- To have a "Reductioning factor" every period, which reduces the number of
  rewards per epoch. (default: period is 3 years, where a
  year is 52 epochs. The next period's rewards are 2/3 of the prior
  period's rewards)

### Reduction factor

This is a generalization over the Bitcoin-style halvenings. Every year, the number
of rewards issued per week will reduce by a governance-specified
factor, instead of a fixed `1/2`. So
`RewardsPerEpochNextPeriod = ReductionFactor * CurrentRewardsPerEpoch)`.
When `ReductionFactor = 1/2`, the Bitcoin halvenings are recreated. We
default to having a reduction factor of `2/3` and thus reduce rewards
at the end of every year by `33%`.

The implication of this is that the total supply is finite, according to
the following formula:

`Total Supply = InitialSupply + EpochsPerPeriod * { {InitialRewardsPerEpoch} / {1 - ReductionFactor} }`

## State

### Minter

The [`Minter`](https://github.com/osmosis-labs/osmosis/blob/main/proto/osmosis/mint/v1beta1/mint.proto#L12) is an abstraction for holding current rewards information.

```go
type Minter struct {
    EpochProvisions sdk.Dec   // Rewards for the current epoch
}
```

### Params

Minting [`Params`](https://github.com/osmosis-labs/osmosis/blob/main/proto/osmosis/mint/v1beta1/mint.proto) are held in the module's parameter store.

### LastReductionEpoch

Last reduction epoch stores the epoch number when the last reduction of
coin mint amount per epoch has happened.

## Begin-Epoch

Minting parameters are recalculated and inflation is paid at the beginning
of each epoch. An epoch is signaled by x/epochs

### NextEpochProvisions

The target epoch provision is recalculated on each reduction period
(default 3 years). At the time of the reduction, the current provision is
multiplied by the reduction factor (default `2/3`), to calculate the
provisions for the next epoch. Consequently, the rewards of the next
period will be lowered by a `1` - reduction factor.

### EpochProvision

Calculate the provisions generated for each epoch based on current epoch
provisions. The provisions are then minted by the `mint` module's
`ModuleMinterAccount`. These rewards are transferred to a
`FeeCollector`, which handles distributing the rewards per the chain's needs.
This fee collector is specified as the `auth` module's `FeeCollector` `ModuleAccount`.

## Network Parameters

The minting module contains the following parameters:

| Key                                        | Type         | Example                                  |
| ------------------------------------------ | ------------ | ---------------------------------------- |
| mint_denom                                 | string       | "uosmo"                                  |
| genesis_epoch_provisions                   | string (dec) | "500000000"                              |
| epoch_identifier                           | string       | "weekly"                                 |
| reduction_period_in_epochs                 | int64        | 156                                      |
| reduction_factor                           | string (dec) | "0.6666666666666"                        |
| distribution_proportions.staking           | string (dec) | "0.4"                                    |
| distribution_proportions.pool_incentives   | string (dec) | "0.3"                                    |
| distribution_proportions.developer_rewards | string (dec) | "0.2"                                    |
| distribution_proportions.community_pool    | string (dec) | "0.1"                                    |
| weighted_developer_rewards_receivers       | array        | `[{"address": "osmoxx", "weight": "1"}]` |
| minting_rewards_distribution_start_epoch   | int64        | 10                                       |

Below are all the network parameters for the `mint` module:

- **`mint_denom`** - Token type being minted
- **`genesis_epoch_provisions`** - Amount of tokens generated at the epoch to the distribution categories (see distribution_proportions)
- **`epoch_identifier`** - Type of epoch that triggers token issuance (day, week, etc.)
- **`reduction_period_in_epochs`** - How many epochs must occur before implementing the reduction factor
- **`reduction_factor`** - What the total token issuance factor will reduce by after the reduction period passes (if set to 66.66%, token issuance will reduce by 1/3)
- **`distribution_proportions`** - Categories in which the specified proportion of newly released tokens are distributed to
  - **`staking`** - Proportion of minted funds to incentivize staking OSMO
  - **`pool_incentives`** - Proportion of minted funds to incentivize pools on Osmosis
  - **`developer_rewards`** - Proportion of minted funds to pay developers for their past and future work
  - **`community_pool`** - Proportion of minted funds to be set aside for the community pool
- **`weighted_developer_rewards_receivers`** - Addresses that developer rewards will go to. The weight attached to an address is the percent of the developer rewards that the specific address will receive
- **`minting_rewards_distribution_start_epoch`** - What epoch will start the rewards distribution to the aforementioned distribution categories

### Notes

1. `mint_denom` defines denom for minting token - uosmo
2. `genesis_epoch_provisions` provides minting tokens per epoch at genesis.
3. `epoch_identifier` defines the epoch identifier to be used for the mint module e.g. "weekly"
4. `reduction_period_in_epochs` defines the number of epochs to pass to reduce the mint amount
5. `reduction_factor` defines the reduction factor of tokens at every `reduction_period_in_epochs`
6. `distribution_proportions` defines distribution rules for minted tokens, when the developer
   rewards address is empty, it distributes tokens to the community pool.
7. `weighted_developer_rewards_receivers` provides the addresses that receive developer
   rewards by weight
8. `minting_rewards_distribution_start_epoch` defines the start epoch of minting to make sure
   minting start after initial pools are set

## Events

The minting module emits the following events:

### End of Epoch

| Type | Attribute Key    | Attribute Value     |
| ---- | ---------------- | ------------------- |
| mint | epoch_number     | `{epochNumber}`     |
| mint | epoch_provisions | `{epochProvisions}` |
| mint | amount           | `{amount}`          |

## Queries

### params

Query all the current mint parameter values

```sh
osmosisd query mint params
```

<details>
<summary>Example</summary>

List all current mint parameters in json format by:

```bash
osmosisd query mint params -o json | jq
```

Example Osmosis mainnet output, queried on 2026-08-04:

```json
{
  "params": {
    "mint_denom": "uosmo",
    "genesis_epoch_provisions": "821917808219.178082191780821917",
    "epoch_identifier": "day",
    "reduction_period_in_epochs": "730",
    "reduction_factor": "0.666666666666666666",
    "distribution_proportions": {
      "staking": "0.080000000000000000",
      "pool_incentives": "0.000000000000000000",
      "developer_rewards": "0.250000000000000000",
      "community_pool": "0.670000000000000000"
    },
    "weighted_developer_rewards_receivers": [
      {
        "address": "osmo1f3w7ved2murkx4rg9qw8fyk5mfk2285hzzsxh5",
        "weight": "1.000000000000000000"
      }
    ],
    "minting_rewards_distribution_start_epoch": "1"
  }
}
```

</details>

### epoch-provisions

Query the current epoch provisions

```sh
osmosisd query mint epoch-provisions
```

<details>
<summary>Example</summary>

List the current epoch provisions:

```bash
osmosisd query mint epoch-provisions
```

Example Osmosis mainnet response, queried on 2026-08-04:

```yaml
epoch_provisions: "121765601217.656011811263318112"
```

The current value decreases by `reduction_factor` after each
`reduction_period_in_epochs`; it is not the same as
`genesis_epoch_provisions` after the first reduction.
</details>

### inflation

Query the current annualized minting inflation:

```bash
osmosisd query mint inflation
```

Example Osmosis mainnet response, queried on 2026-08-04:

```yaml
inflation: "0.018717643501583930"
```

## Appendix

### Mainnet Configuration Snapshot

`mint` **module: Network parameter effects and configuration queried on 2026-08-04**

The following tables show overall effects on different configurations of the `mint` related network parameters:

|                       | `mint_denom` | `genesis_epoch_provisions` | `epoch_identifier` | `reduction_period_in_epochs` |
| --------------------- | ------------- | -------------------------- | ------------------ | ---------------------------- |
| Type                  | string        | decimal                    | string             | integer                      |
| Higher                | N/A           | Higher initial issuance    | N/A                | More time between reductions |
| Lower                 | N/A           | Lower initial issuance     | N/A                | Less time between reductions |
| Constraints           | Valid denom   | Positive                   | Valid epoch identifier | Positive                  |
| Current configuration | `uosmo`       | `821917808219.178082191780821917` | `day` | `730`                 |

The live params query is authoritative for mutable distribution proportions
and reward receiver addresses. The current epoch provision and inflation are
derived values exposed by their respective queries.
