---
description: Definitions for the DeFi and Cosmos terms used throughout the docs.
sidebar_position: 90
---

# Glossary 

Use this glossary to learn about terms used in Osmosis and the Cosmos ecosystem.

## Active set

The validators in the active set (currently the top 70, set by governance) that participate in consensus and receive rewards.

## Airdrop

A transfer of free cryptocurrency from a crypto project into users' wallets in order to increase interest and incentivize the use of a new token.

## Alloyed asset

A single canonical Osmosis denom that represents several equivalent bridged versions of the same underlying asset (for example, the different bridged versions of BTC collapsed into `allBTC`). It lets liquidity that would otherwise be split across variants trade as one unit. See [Alloyed Assets](/learn/features/alloyed-assets).

## Arbitrage

To profit from price differences across different markets. Arbitrageurs buy coins in one market and sell them on another market for a higher price.

## Blockchain

An unchangeable ledger of transactions copied among a network of independent computer systems.

## Blocks

Groups of information stored on a blockchain. Each block contains transactions that are grouped, verified, and signed by validators.

## Bonded validator

A validator in the [active set](#active-set) participating in consensus. Bonded validators earn rewards.

## Bonding

When a user delegates OSMO to a validator to receive staking rewards and in turn obtain voting power. Validators never have ownership of a delegator's OSMO. Delegating, bonding, and staking generally refer to the same process.

## Burn

The permanent destruction of coins from the total supply.


## Commission

The percentage of staking rewards a validator will keep before distributing the rest of the rewards to delegators. Commission is a validator's income. Validators set their own commission rates. As of this writing, commission must be greater than or equal to 5% 

## Community pool

A special fund designated for funding community projects. Any community member can create a governance proposal to spend the tokens in the community pool. If the proposal passes, the funds are spent as specified in the proposal.

## Concentrated liquidity

A pool type that lets liquidity providers concentrate their capital within a chosen price range instead of spreading it across all prices. This makes each unit of capital far more efficient, so LPs earn more fees on the same deposit while the price stays in their range. See [Concentrated Liquidity](/learn/features/concentrated-liquidity).

## Consensus

A system used by validators or miners to agree that each block of transactions in a blockchain is correct. The Osmosis blockchain uses Tendermint consensus engine. Validators earn rewards for participating in consensus. Visit the [Tendermint official documentation site](https://docs.tendermint.com/) for more information.

## Cosmos-SDK

The open-source framework the Osmosis blockchain is built on. For more information, check out the [Cosmos SDK Documentation](https://docs.cosmos.network/).

## dApp

An application built on a decentralized platform (short for decentralized application).

## DDoS

Distributed Denial of Service attack. When an attacker floods a network with traffic or requests in order to disrupt service.

## DeFi

Decentralized finance. A movement away from traditional finance and toward systems that do not require financial intermediaries.

## Delegate

When a user bonds OSMO to a validator to receive staking rewards and in turn obtain voting power. Validators never have ownership of the bonded OSMO. Delegating, bonding, and staking generally refer to the same process.


## Delegator

A user who delegates, bonds, or stakes OSMO to a validator to earn rewards.

## Denom

The onchain identifier for an asset (short for denomination). Every asset is tracked by its base denom, which is usually the smallest unit: OSMO's base denom is `uosmo` (1 OSMO = 1,000,000 `uosmo`). Assets that arrive over IBC have a denom of the form `ibc/HASH`, and assets minted by the tokenfactory look like `factory/<address>/<subdenom>`. The base denom is distinct from the display symbol (`OSMO`) shown in interfaces. When integrating, always match on the full base denom, not the symbol, since different assets can share a symbol.

## Epoch

A recurring time interval the chain uses to batch periodic actions, such as distributing staking and liquidity rewards. Many processes that would be expensive to run every block instead run once per epoch (on Osmosis, typically once per day).

## Exponent

The number of decimal places between an asset's base [denom](#denom) and its display unit. OSMO has an exponent of 6, so 1 OSMO is 1,000,000 `uosmo`. Exponents differ between assets (some use 6, others 8 or 18), so never assume a value: read it from the asset's metadata or the chain registry before converting amounts.

## Fees

- **Gas**: Computed fees added on to all transactions to avoid spamming. Validators set minimum gas prices and reject transactions that have implied gas prices below this threshold.


## Full node

A computer connected to the Osmosis mainnet able to validate transactions and interact with the Osmosis blockchain. All active validators run full nodes.

## Gauge

A mechanism that streams liquidity incentives to a pool over time. Each gauge distributes rewards to liquidity providers who meet its conditions (for example, bonding their position for a set period). Anyone can permissionlessly create an external gauge to incentivize a pool, on top of the swap fees LPs already earn.

## Generalized Solidly Stableswap
Generalized Solidly Stableswap: A type of Stableswap that offers low slippage for multiple assets that are expected to maintain a tight correlation. It uses a mathematical formula to maintain a stable price ratio and reduce slippage, but there is still some price impact for each trade. If the liquidity becomes imbalanced, the slippage can increase. This Stableswap is implemented using the Solidly Stableswap curve and is generalized to support multiple assets.

## Governance

Governance is the democratic process that allows users and validators to make changes to the Osmosis protocol. Community members submit, vote, and implement proposals.

## Governance proposal

A written submission for a change or addition to the Osmosis protocol. Topics of proposals can vary from community pool spending, software changes, parameter changes, or any idea pertaining to the Osmosis protocol.

## Inactive set

Validators that are not in the [active set](#active-set). These validators do not participate in consensus and do not earn rewards.

## IBC

The inter-blockchain communication protocol (IBC) creates communication between independent blockchains. IBC achieves this by specifying a set of structures that can be implemented by any distributed ledger that satisfies a small number of requirements.
IBC facilitates cross-chain applications for token transfers, swaps, multi-chain contracts, and data sharding. At launch, Osmosis utilizes IBC for token transfers. Over time, Osmosis will add new features that are made possible through IBC.


## Impermanent Loss

Liquidity providers earn through fees and special pool rewards. However, they are also risking a scenario in which they would have been better off holding the assets rather than supplying them. This outcome is called impermanent loss.
Impermanent loss is the net difference between holding the asset verses providing liquidity. Liquidity provider (LP) rewards helps to offset impermanent loss for LPs.
When the price of the assets in the pool change at different rates, LPs end up owning larger amounts of the asset that increased less in price (or decreased more in price). For example, if the price of OSMO goes up relative to ATOM, LPs in the OSMO-ATOM pool end up with larger portions of the less valuable asset (ATOM).

Impermanent loss is mitigated in part by the transaction fees earned by LPs. When the profits made from swap fees outweigh an LP's impermanent loss, the pool is self-sustainable.

To further offset impermanent loss, particularly in the early stages of a protocol when volatility is high, AMMs utilize liquidity mining rewards. Liquidity rewards bootstrap the ecosystem as usage and fee revenues are still ramping up.

Osmosis has many new features and innovations in development to decrease impermanent loss.


## Jailed

Validators who misbehave are jailed or excluded from the validator set for a period amount of time.

## Liquidity Mining

Liquidity mining (also called yield farming) is when users earn tokens for providing liquidity to a DeFi protocol. This mechanism is used to offset the impermanent loss experienced by LPs. Liquidity mining rewards create an additional incentive for LPs besides transaction fees. These rewards are particularly useful for nascent protocols. Liquidity mining helps to bootstrap initial liquidity, facilitating increased usage and more fees for LPs.

## LP Tokens

When users deposit assets into a liquidity pool, they receive LP tokens. These tokens represent their share of the total pool.
For example, if Pool #1 is the OSMO&lt; >ATOM pool, users can deposit OSMO and ATOM tokens into the pool and receive back Pool1 share tokens. These tokens do not correspond to an exact quantity of tokens, but rather the proportional ownership of the pool.
When users remove their liquidity from the pool, they get back the percentage of liquidity that their LP tokens represent.
Since buying and selling from the pool changes the quantities of assets within a pool, users are highly unlikely to withdraw the same amount of each token that they initially deposited. They usually receive more of one and less of another, based on the trades executed from the pool.


## Market swap

A swap that executes immediately at the current pool price, taking whatever price the pool gives (subject to your [slippage](#slippage) tolerance), as opposed to a limit order that waits for a target price on the [orderbook](#orderbook).

## Module

A section of the Osmosis core that represents a particular function of the Osmosis protocol. 

## Pools

A liquidity pool is a shared reserve of two or more assets that traders swap against. Prices are set by the pool's formula from the ratio of its reserves, rather than by matching buyers to sellers. Liquidity providers supply the assets and earn the pool's swap fee ([spread factor](#spread-factor)). Osmosis supports several pool types, including weighted, [stableswap](#generalized-solidly-stableswap), and [concentrated liquidity](#concentrated-liquidity).

## Price impact

How much your own trade moves the price, because a swap changes the pool's reserves as it executes. Larger trades on shallower pools have more price impact. This is distinct from [slippage](#slippage): price impact is the move your trade itself causes, while slippage is the change between quote and execution from any cause.

## Proof of Stake

Proof of Stake. A style of blockchain where validators are chosen to propose blocks according to the number of coins they hold.


## Rewards

Revenue generated from fees given to validators and delegators.

## Route

The path a swap takes through one or more pools to get from the input asset to the output asset. When there is no direct pool, or when combining pools is cheaper, Osmosis routes through intermediate assets and can split a single swap across multiple paths (a split route) to get the best overall price.

## Scaling Factor
Scaling factors are introduced to set the expected price ratio for Stableswaps. Precision of pegged coins, differences in staking derivatives, and other issues make it difficult to simply rely on x_reserves ~= y_reserves. Scaling factors are used to map from raw coin units to AMM math units by dividing the raw units by the scaling factor. This mapping is done by rounding the result based on the rounding mode which has three options: RoundUp, RoundDown, and RoundBankers. All token inputs are scaled and the AMM equations must ensure that rounding is done correctly. The details of scaling and rounding are described in the [stableswap specification](https://github.com/osmosis-labs/osmosis/blob/main/x/gamm/pool-models/stableswap/README.md).

## Self-bond

The amount of OSMO a validator bonds to themselves. Also referred to as self-delegation.

## Slashing

Punishment for validators that misbehave.

## Slippage

The difference in a coin's price between the start and end of a transaction. You set a slippage tolerance when trading; if the price would move beyond it, the swap reverts rather than filling at a worse price. See also [price impact](#price-impact).

## Spot price

The current exchange rate between two assets in a pool, derived from the ratio of the pool's reserves. It is the price for an infinitesimally small trade, before any [price impact](#price-impact) from your own swap.

## Spread factor

A pool's swap fee: the percentage taken from each trade and paid to the pool's liquidity providers as compensation for supplying liquidity. Each pool sets its own spread factor. It is separate from the protocol-level [taker fee](#taker-fee).

## Stake

The amount of Osmo bonded to a validator.

## Staking

When a user or delegator delegates and bonds Osmo to an active validator in order to receive rewards. Bonded Osmo adds to a validator's stake. Validators provide their stakes as collateral to participate in the consensus process. Validators with larger stakes are chosen to participate more often. Validators receive staking rewards for their participation. A validator's stake can be slashed if the validator misbehaves. Validators never have ownership of a delegator's Osmo, even when staking.

## Taker fee

A small protocol-level fee charged on trades, 0.1% by default, with some routes reduced or exempt. It is separate from the pool's [spread factor](#spread-factor). Taker fees are split between OSMO stakers, OSMO buyback, and the community pool. See [The OSMO Token](/learn/osmo#taker-fees).

## Tendermint consensus

The consensus procedure used by the Osmosis protocol. First, a validator proposes a new block. Other validators vote on the block in two rounds. If a block receives a two-thirds majority or greater of yes votes in both rounds, it gets added to the blockchain. Validators get rewarded with the block's transaction fees. Proposers get rewarded extra. Each validator is chosen to propose based on their weight. Checkout the [Tendermint official documentation](https://docs.tendermint.com/) for more information.

## Orderbook

An onchain venue for limit orders, where you specify the exact price you want to trade at and your order rests until the market reaches it. Osmosis orderbook markets route alongside AMM pools, so an ordinary swap can fill against orderbook liquidity when that gives a better price. See [Orderbook](/learn/features/orderbook).

## Osmosis 

The official source code for the Osmosis protocol.

## Osmosis mainnet

The Osmosis protocol's blockchain network where all transactions take place.


## Osmosisd

The Osmosis node software. The same `osmosisd` binary runs a full node or validator and serves as the command-line interface for querying the chain and submitting transactions.

## Superfluid Staking

Staking that lets the OSMO portion of an eligible bonded liquidity position simultaneously help secure the chain. The position keeps earning trading fees and pool incentives, and the underlying OSMO is also delegated to a validator to earn staking rewards, so the same capital both provides liquidity and contributes to consensus. The chain module is still deployed, but the feature is not currently active for users: no pools are superfluid-enabled and it has been removed from the Osmosis frontend.

## Testnet

A version of the mainnet just for testing. The testnet does not use real coins. You can use the testnet to get familiar with transactions.

## Tick

A discrete price point in a [concentrated liquidity](#concentrated-liquidity) pool. Liquidity providers choose a price range bounded by ticks, and their liquidity is only active while the pool's price sits between those ticks. Ticks let a CL pool track liquidity at many specific prices rather than spreading it across the whole curve.

## Total stake

The total amount of Osmo bonded to a delegator, including self-bonded Osmo.

## TWAP

Time-weighted average price: an asset's average price over a window of time rather than at a single instant. Because it is averaged over many blocks, a TWAP is far more expensive to manipulate than a spot price, which makes it useful as an onchain price reference (for example, for other contracts that need a manipulation-resistant price).

## Unbonding

When a delegator decides to undelegate their OSMO from a validator. This process takes 14 days, during which no rewards accrue and the OSMO cannot be freely traded. An in-progress unbonding can be cancelled, which re-delegates the OSMO to the same validator.

## Undelegate

When a delegator no longer wishes to have their OSMO bonded to a validator. This starts the 14-day unbonding period; see [Unbonding](#unbonding).

## Uptime

The amount of time a validator has been active in a given timeframe. Validators with low up time may be slashed.

## Validator

A participant responsible for producing and verifying blocks on the Osmosis blockchain. Validators run programs called full nodes that allow them to participate in consensus, verify blocks, participate in governance, and receive rewards. The validators with the highest total stake, up to the governance-set active-set size (currently 70), can participate in consensus.

## Weight

The measure of a validator's total stake. Validators with higher weights get selected more often to propose blocks. A validator's weight is also a measure of their voting power in governance.










