---
sidebar_position: 5
---

# Pool Setup Guide

## Overview

A key step to integrating a project with Osmosis is ensuring there is at least one liquidity pool offering the token to the market. This page is intended to guide integrating teams on setting up pools for their tokens.

There are several different types of liquidity pools on Osmosis, each with unique benefits; the main ones are:

- Weighted Pool
- Stableswap Pool
- Liquidity Bootstrapping Pool (LBP)
- Supercharged Liquidity (Concentrated Liquidity) Pool, and
- CosmWasm Pools (e.g., Transmuter and Alloyed Assets)

Note: As of [Proposal 699](https://www.mintscan.io/osmosis/proposals/699), a pool creation fee of 20 USDC is required.
*[fee taken automatically when transaction has been sent via CLI]*

Note: Sometimes there is no way to find the Pool ID of a pool via a block explorer using the transaction hash. osmosisd CLI will show the Pool ID of the new pool in response when creating the pool via CLI; otherwise, the only way to get a Pool ID is to search among the most recently created pools, or else look on a list (that shows Pool ID) of all pools for matching specifications.

Note: When specifying token denominations that are represented as `ibc/<hash>` via CLI, be sure to always use uppercase letters within the hash portion of the denomination, or else the pool will not function correctly. E.g., use `ibc/A1B2C3…`, but do NOT use `ibc/a1b2c3…`.

## Weighted Pool

Weighted Pools on Osmosis are essentially a copy of [Balancer’s v1 implementation](https://balancer.fi/whitepaper.pdf) of a Liquidity Pool, which uses the weighted constant product formula: `k = x^wx * y^wy`.

### Create Pool

#### Osmosis Zone

To create a Classic Pool on Osmosis via the Osmosis Zone app:

- Go to app.osmosis.zone
- Connect a Wallet
- Go to Pools page
- Create New Pool button
- Choose Weighted pool
- Next
- Add new token (only shows tokens available in the connected wallet)
- Assign token weight and repeat until all tokens have been added; ensure weights add to 100%
- Next
- Enter a >0 amount of each token to add to the pool upon creation
- Next
- Set Swap Fee
- Tick ‘I understand that creating a new pool will cost 20 USDC
- Create Pool
- Continue to approve the transaction with the connected wallet.

#### CLI Command

The command to create a pool with osmosisd CLI is: `osmosisd tx gamm create-pool [flags]`

Note that it is recommended to always first show the associated help/information before executing any command by using the --help, -h flag. Note that what is shown will correspond to the version of osmosisd that you have installed, and doesn’t necessarily reflect the parameter requirements of the current version of the Osmosis chain.

Start with: `osmosisd tx gamm create-pool -h`

Sample pool JSON file contents for balancer:

```json
{
  "weights": "4uatom,4osmo,2uakt",
  "initial-deposit": "100uatom,5osmo,20uakt",
  "swap-fee": "0.001",
  "exit-fee": "0.001",
  "future-governor": "168h"
}
```

There are recommendations for creating balancer pools:

- Number of tokens: For most cases, add only two constituent tokens for best user familiarity, even though the pool is capable of more
- Weights: Use an equal amount of each token, thereby making it a balanced 50/50 pool (or 33/33/33, if three tokens, etc.). The absolute numbers are not of great importance, but rather the relative values; both 5uosmo,5uion and 1000000uosmo,1000000uion would create a 50/50 pool.
- Initial deposit: Use a high amount of liquidity.
  - Although a very low initial deposit allows a team to create a small pool and confirm the pool parameters with lower risk of drainage, it also risks that some other accounts and bots can quickly throw off the intended balance of supply in the pool before the initiating team has had a chance to add the remainder (and often the vast majority) of the liquidity intended for the pool. Manually rebalancing the pool to an exact ratio can be challenging, especially when trying to do so via a multisig account.
  - In contrast, a very high initial deposit means that fewer transactions are needed and allows the team to add all the intended liquidity into it right away(, without needing to rebalance). Note, this carries a (very uncommon) risk of unintentionally making the new token available for absurdly cheap (by accidentally using an unfavorable weighting), potentially compromising the security and value of the new token.
- Swap fee: 0.2% or 0.3% swap fee for most pairs. Sometimes a lower fee makes sense for stablecoin:stablecoin pairs.
  - Note that the swap fee argument is not provided as a percentage, but as a multiplier (where a value of 1 is equivalent to 100%). So, a 0.2% swap fee, for example, must be specified in the argument as 0.002.
- Exit fee: Always choose 0%--this parameter is now obsolete and should be set to 0.
- Future governor: This parameter has no current usage. It is recommended to leave it blank (“”), which will default to “168h” when queried thereafter.

## Stableswap Pool

[Stableswap Pools on Osmosis](https://osmosis.zone/blog/osmosis-dex-stableswap) are inspired by [Curve’s StableSwap implementation](https://berkeley-defi.github.io/assets/material/StableSwap.pdf), allowing for a targeted flat section of the price curve where the relative values of the tokens are meant to be consistent (e.g., with a pair of USD stablecoins because both are meant to be worth $1.00 USD), although technically uses a slightly different(, and more computationally efficient,) formula: k = xy(x^2 + y^2)

### Create Pool

#### Osmosis Zone

To create a Stableswap Pool on Osmosis via the Osmosis Zone app:

- Go to app.osmosis.zone
- Connect a Wallet
- Go to Pools page
- Create New Pool
- Choose Stable pool
- Next
- Add new token (only shows tokens available in the connected wallet).
- Assign token scaling factor<sup>1</sup>
- Repeat until all tokens have been added; ensure weights add to 100%
- Next
- Enter a >0 amount of each token to add to the pool upon creation
- Next
- Set Swap Fee
- Set scaling factor controller (optional)<sup>2</sup>
- Tick ‘I understand that creating a new pool will cost 20 USDC.
- Create Pool
- Continue to approve the transaction with the connected wallet.

Notes:

1. Scaling factor is used to adjust for differences in token precision or relative value. (e.g., if 4 $QUARTER is meant to be equal in value to 1 $USDC, then we’d use a scaling factor of 4:1). The most common usage of scaling factor is to equate like-value tokens (e.g., USDC and DAI) whose minimum denominations have differing precision; e.g., USDC’s minimum denomination is micro-usdc (1,000,000 uusdc == 1 USDC) and DAI’s minimum denomination is atto-DAI (where 1,000,000,000,000,000,000 attodai == 1 DAI), so a scaling factor such as 10^6:10^18 (or 1:10^12) is used.
2. Scaling factor controller allows a contract be the administrator over the scaling factor, and is often used to handle a constantly changing scaling factor, such as where a liquid staking token/derivative projects a constantly increasing relative value to its underlying staked token (e.g., Stride’s stOSTMO will slowly increase in value measured in OSMO, so a scaling factor controller slowly adjusts the scaling factor accordingly to reap the benefits of a Stableswap pool).

#### CLI Command

The command to create a pool with osmosisd CLI is: `osmosisd tx gamm create-pool [flags]`

Note that it is recommended to always first show the associated help/information before executing any command by using the --help, -h flag. Note that what is shown will correspond to the version of osmosisd that you have installed, and doesn’t necessarily reflect the parameter requirements of the current version of the Osmosis chain.

Start with: `osmosisd tx gamm create-pool -h`

For stableswap (demonstrating need for a 1:1000 scaling factor, see doc):

```json
{
  "initial-deposit": "1000000uusdc,1000miliusdc",
  "swap-fee": "0.001",
  "exit-fee": "0.00",
  "future-governor": "168h",
  "scaling-factors": "1000,1"
}
```

See the recommended parameter values for Weighted pools above, as many of those recommendations apply to Stableswap pools as well.

## Liquidity Bootstrapping Pool

A Liquidity Bootstrapping Pool (LBP) is a weighted pool that begins with linearly adjusting weights until they reach a desired final weighting, and then behaves as a normal weighted pool from then onward. This allows for natural price discovery, as well as aids with liquidity bootstrapping. Nowadays, LBPs have become much less popular than they used to be; the current recommendation for liquidity bootstrapping and price discovery for a new token is a StreamSwap stream on Osmosis, with the frontend interface hosted by Omniflix.

## Supercharged Liquidity (a.k.a. Concentrated Liquidity) Pool

A Supercharged Pool is Osmosis’ Implementation of [Uniswap’s Concentrated Liquidity](https://docs.uniswap.org/concepts/protocol/concentrated-liquidity). In addition to full-range positions, liquidity providers can also ‘concentrate’ their liquidity to only apply within a defined price range. When the market price is within the defined price range, the liquidity earns comparatively more swap fees and incentives at the cost of increased impermanent loss; but when the market price is outside of the defined price range, the position doesn’t earn any swap fees (or incentives).

On Osmosis, for technical and UX reasons, some parameters are restricted to a limited set of governance-approved values. For example, the allowable quote assets are limited to a small set of tokens, meaning that all CL pools must contain at least one of these authorized tokens (which are listed below). The same applies to spread factor–basically the same thing as swap fee–and tick spacing–used for refining the granularity of possible positions.

### Create Pool

#### Osmosis Zone

As of writing, Supercharged Liquidity Pools cannot be created via the Osmosis Zone app.

#### CLI Command

The command to create a pool with osmosisd CLI is: `osmosisd tx concentratedliquidity create-pool [flags]`

Note that it is recommended to always first show the associated help/information before executing any command by using the --help, -h flag. Note that what is shown will correspond to the version of osmosisd that you have installed, and doesn’t necessarily reflect the parameter requirements of the current version of the Osmosis chain.

Start with: `osmosisd tx concentratedliquidity create-pool --help`

Usage:

```bash
osmosisd tx concentratedliquidity create-pool [denom-0] [denom-1] [tick-spacing] [spread-factor] [flags]`

denom-1 (the quote denom), tick spacing, and spread factors must all be authorized by the concentrated liquidity module
```

Example:

```bash
osmosisd tx concentratedliquidity create-pool ibc/... uosmo 100 0.01 --from val --chain-id osmosis-1 -b block --gas auto --gas-adjustment 1.3 --gas-prices 0.025uosmo
```

There are recommendations for creating CL pools:

- As mentioned in the help text, denom-1 (the quote denom), tick spacing, and spread factors must all be authorized by the concentrated liquidity module, and these can be confirmed by querying the chain: `osmosisd query concentratedliquidity params`
- denom-1: Must be from a set of authorized ‘quote’ assets, which, as of writing, are:
  - ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4 (noble.USDC)
  - ibc/4ABBEF4C8926DDDB320AE5188CFD63267ABBCEFC0583E4AE05D6E5AA2401DDAB (kava.USDT)
  - ibc/0CD3A0285E1341859B5E86B6AB7682F023D03E97607CCC1DC95706411D866DF7 (DAI.axl)
  - ibc/EA1D43981D5C9A1C4AAEA9C23BB1D4FA126BA9BC7020A25E0AE4AA841EA25DC5 (wETH.axl)
  - factory/osmo1z0qrq605sjgcqpylfl4aa6s90x738j7m58wyatt0tdzflg2ha26q67k743/wbtc (WBTC)
  - ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2 (ATOM)
  - ibc/D79E7D83AB399BFFF93433E54FAA480C191248FC556924A2A8351AE2638B3877 (TIA)
  - uosmo (OSMO)
- ...and on Testnet (osmo-test-5) are:
  - uosmo (OSMO)
  - ibc/A8C2D23A1E6F95DA4E48BA349667E322BD7A6C996D8A4AAE8BA72E190F3D1477 (ATOM)
  - ibc/8E2FEFCBD754FA3C97411F0126B9EC76191BAA1B3959CB73CECF396A4037BBF0 (unregistered denom)
  - ibc/6F34E1BD664C36CE49ACC28E60D62559A5F96C4F9A6CCE4FC5A67B2852E24CFE (aUSDC.axl)
- tick-spacing: Must be from a set of authorized values: 1, 10, 100, and 1000
  - It is recommended to use a tick spacing of 100, which nearly all current Supercharged pools use; this effectively sets positions as being definable at any `0.01%` interval.
  - Since passing each initialized tick carries a computational cost(, and therefore requires more gas), a smaller tick spacing will require higher transaction fees, while a larger tick spacing will have lower transaction fees (but less precise positions).
- spread-factor: Mimics the bid-ask spread, and is comparable to Swap Fee. Must be from a set of authorized values:
  - 0
  - 0.0001 (0.01%)
  - 0.0005 (0.05%)
  - 0.001 (0.1%)
  - 0.002 (0.2%)
  - 0.003 (0.3%)
  - 0.005 (0.5%)
  - Generally, the lower fees are used for like-value stablecoin pairs, since those theoretically have a lower risk of impermanent loss.

### Join Pool

When Supercharged Liquidity pools are created, they initially have no liquidity. It is recommended that the team creating the pool should also create the first liquidity position.

#### CLI Command

The command to join a CL pool with osmosisd CLI is:

```bash
osmosisd tx concentratedliquidity create-position [pool-id] [lower-tick] [upper-tick] [tokensProvided] [token-0-min-amount] [token-1-min-amount] [flags]
```

Note that it is recommended to always first show the associated help/information before executing any command by using the --help, -h flag. Note that what is shown will correspond to the version of osmosisd that you have installed, and doesn’t necessarily reflect the parameter requirements of the current version of the Osmosis chain.

Start with the following command to create or add to existing concentrated liquidity position: `osmosisd tx concentratedliquidity create-position -h`

Usage:

```bash
osmosisd tx concentratedliquidity create-position [pool-id] [lower-tick] [upper-tick] [tokensProvided] [token-0-min-amount] [token-1-min-amount] [flags]
```

Example:

```bash
osmosisd tx concentratedliquidity create-position 1 "[-108000000]" 342000000 10000ibc/...,10000uosmo 100 100 --from val --chain-id osmosis-1 -b block --gas auto --gas-adjustment 1.3 --gas-prices 0.025uosmo
```

For parameter values:

- The first argument is the `pool-id`; all pools have a unique identifier
- For lower and upper tick, start with the lower tick first, then the upper tick.
  - If a tick has a negative value, then surround it with brackets ([]) and double quotes (“”) so the hyphen/dash can be interpreted as a negative sign
  - Tick 0 is a 1:1 ratio of assets
  - A full-range position in a Supercharged pool is currently defined as a lower tick of `-108000000` and an upper tick of  `342000000`, which sufficiently approximates infinity in both directions for all practical purposes. Creating this position can be the easiest way to establish initial liquidity in a pool and enable visibility on the Osmosis Zone frontend app.
- Based on the current price/balance of tokens in the pool, (and the defined tick boundary,) the amount of each token that can be added must be at a precise ratio; the exact ratio would be difficult to calculate, and can also change frequently, which is why the command asks for maximum and minimum amounts of tokens to add rather than exact amounts.
- `tokensProvided` requires a list of (maximum) token amounts approved for addition. Both constituent tokens must be specified with an amount, even if the amount is 0, and must be separated by a comma. Generally these should be supplied in alphabetical order.
- `token-0-min-amount` and `token-1-min-amount` refer to the minimum amount of token-0 and token-1, respectively, that must be added to the position. These values must also be less than the corresponding amounts of tokensProvided because the transaction cannot add more tokens than were approved for addition.
  - To find out which is token-0, and which is token-1, query: `osmosisd query poolmanager <pool-id>`. If you created the pool in the previous step (when adding liquidity for the first time to the pool), the pool ID will be in the `create-pool` output.
  - If you don't know the pool ID is, to find out which is token-0, and which is token-1, use the query: `osmosisd query concentratedliquidity pools`, and search for the pool among the returned list of pools. Note: this query command paginates, so if the pool ID you were expected is not returned, append `--page N` (.e.g., `--page 2`) to paginate through all pools.

## CosmWasm Pools

CosmWasm Pools are pools written with CosmWasm code and implement custom functionality. For example, a CosmWasm pool could be used to establish a floor price for an NFT. A couple examples of types of CosmWasm pools that are important currently are: the Transmuter and Alloyed Asset Pool types.

### Contract Code

All CosmWasm pools must refer to a Contract via a Code ID. The CosmWasm contract defines the logic of how the pool works, and must be approved for upload and whitelisting by Osmosis governance via a UploadCosmWasmPoolCodeAndWhiteListProposal before any pool instantiating that logic can be created. Instructions on how to write and upload Contract Code is out of scope for the guide. Once the contract is uploaded, it is assigned a Code ID, which must be referenced when creating the CosmWasm pool. It is possible to check for whitelisted code IDs with this command: `osmosisd q cosmwasmpool params`

### Transmuter/Alloyed Asset Pools

A Transmuter Pool is a type of multi-asset constant sum zero-fee pool, meant to allow for the feeless conversion of like-origin token variants, such as USDC.axl and noble.USDC. It may contain more than two assets, but must be at a 1:1 (or 1:1:1, or 1:1:1:1, etc.) ratio, so it cannot properly handle tokens with differing decimal precision. It also accepts an administrator address, which can freeze all swapping, joining, and exiting of the pool, and can also pass the role of administrator onto another address. If no administrator address is provided, it will default to using the executing account as the administrator.

The creation of transmuter pools requires osmosisd version v19.2.0 or later. The Transmuter pools on Osmosis that were created before the release of v19.2.0 were co-created using a custom branch of osmosisd by Osmosis Labs and the author of the Transmuter CosmWasm code.

The code-id for Transmuter pools on Osmosis chains are as follows:

- osmosis-1 (mainnet): 148
- osmo-test-5 (testnet): 3084

Alloyed Asset Pools have not yet been finalized.

### Create Pool

For now, since CosmWasm pools are custom and can be created many different ways, complete instructions on how to create each type is considered out of scope for this guide.

Note: for creating CosmWasm pools, it is recommended to use osmosisd v19.2.0 or later, as earlier versions do not correctly encode the JSON instantiate message, and interpret it as a list of token denominations.

#### CLI Command

The command to create a pool with osmosisd CLI is: `osmosisd tx cosmwasmpool create-pool [code-id] [instantiate-msg] [flags]`

Note that it is recommended to always first show the associated help/information before executing any command by using the --help, -h flag. Note that what is shown will correspond to the version of osmosisd that you have installed, and doesn’t necessarily reflect the parameter requirements of the current version of the Osmosis chain.

Start with: `osmosisd tx cosmwasmpool create-pool -h`

Usage:

```bash
osmosisd tx cosmwasmpool create-pool [code-id] [instantiate-msg] [flags]
```

Example:

```bash
osmosisd tx cosmwasmpool create-pool 1 '{"pool_assets_denom":["uion","uosmo"]}' --from lo-test1 --keyring-backend test --chain-id localosmosis --fees 875uosmo -b block
```

For parameter values:

- `code-id`: See the Contract Code section above for more about Code ID.
- `instantiate-msg`: the required JSON encoded instantiate message depends on which type of pool is being created. For example, the transmuter pool type requires a denom list and an administrator, but other pool types might require a different instantiate message.

Once created, the transaction hash can be used to query the pool’s contract address.

### Join Pool

When CosmWasm pools are created, they may initially have no liquidity. It is recommended that the team creating the pool should also create the first liquidity position.

#### CLI Command

The command to join a CosmWasm pool with osmosisd CLI is: `osmosisd tx wasm execute [contract_addr_bech32] [json_encoded_send_args] --amount [coins,optional] [flags]`

Note that it is recommended to always first show the associated help/information before executing any command by using the --help, -h flag. Note that what is shown will correspond to the version of osmosisd that you have installed, and doesn’t necessarily reflect the parameter requirements of the current version of the Osmosis chain.

Start with: `osmosisd tx wasm execute -h`

Usage (to execute a command on a wasm contract):

```bash
osmosisd tx wasm execute [contract_addr_bech32] [json_encoded_send_args] --amount [coins,optional] [flags]
```

For parameter values:

- `contract_addr_bech32`: the address of the contract specific to the pool
  - I.e., the contract of the instance of the pool, NOT the contract of the type of pool
- `json_encoded_send_args`: should be `'{"join_pool":{}}'`
  - Note that the single quote must not be vertical ('') , and not angled (‘’)
- `--amount [coins,optional]`: the amount of each token being added to the pool.
  - E.g., `--amount 10000ibc/8242AD24008032E457D2E12D46588FD39FB54FB29680C6C7663D296B383C37C4,10000ibc/4ABBEF4C8926DDDB320AE5188CFD63267ABBCEFC0583E4AE05D6E5AA2401DDAB`
