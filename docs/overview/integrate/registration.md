---
sidebar_position: 4
---
# Register your Asset
Assets need to be registered in several locations in order to be displayed correctly on interfaces. Without registration, assets will show as a long list of characters.

# Prerequisites

- Registered to [SLIP173](https://github.com/satoshilabs/slips/blob/master/slip-0173.md)
    - See: [How to register a bech32 prefix onto SLIP173](../integrate/transfer.md#how-to-register-a-bech32-prefix-onto-slip173)
- If coin type is not like ATOM, registered to [SLIP44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md)
    - Note: Coin Type 118 represents the Cosmos Hub's ATOM token, registered listed in [SLIP44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md); many projects also default to using this coin type, while some have registered their own.

## Step 1: Register onto the Cosmos Chain Registry

### Purpose

The Cosmos Chain Registry is used as a single source of truth and is used to look up chain and asset data

### Requirements

- Chain data--metadata, locations, network addresses, etc.
- Asset data--metadata, such as name, symbol, minimal denomination, decimal precision, etc.
    - CoinGecko ID
        - Refer to the latest [CoinGecko Coins List](https://api.coingecko.com/api/v3/coins/list)
- Basic understanding of GitHub, knowing how to fork a repository, create a branch, commit changes, and submit a Pull Request

### Steps

1. Review the [Cosmos Chain Registry](https://github.com/cosmos/chain-registry) docs:
    - Note: It is recommended to refer to another registration to serve as an example, such as [Osmosis' registration](https://github.com/cosmos/chain-registry/blob/master/osmosis/chain.json)
2. If registering a new Chain, submit a pull request with necessary changes to the `chain.json` file.
	- Follow the [chain.schema.json](https://github.com/cosmos/chain-registry/blob/master/chain.schema.json) format.
	- Be sure to include `bech32_prefix`
		- e.g., `"bech32_prefix": "cosmos",`
	- Be sure to include `slip44` (coin type)
		- e.g., `"slip44": 118,`
	- Be sure to include at least one RPC and one REST under `apis`
	- For explorers, opt for Mintscan, if available
3. If registering a new Asset, submit a pull request with necessary changes to the `assetlists.json` file.
	- Follow the [assetlist.schema.json](https://github.com/cosmos/chain-registry/blob/master/assetlist.schema.json) format.
	- The `name` of an asset refers to how the asset should be called in persoanl communication, while `symbol` is like a stock ticker, typically in ALL CAPS, and these values may differ.
		- e.g., `"name": graviton, "display": "graviton", "symbol": "GRAV"`
	- Be sure to include the CoinGecko ID for each asset where one exists
		- e.g., `"coingecko_id": "cosmos"`


## Step 2: Register an Asset onto the Osmosis Assetlists Registry

### Purpose

The Osmosis Assetlists Registry is used as a local source of truth for assets displayed on Osmosis' front end.

### Prerequisites

- Registered onto the Cosmos Chain Registry
    - See: [How to register onto the Cosmos Chain Registry](../integrate/registration.md#how-to-register-onto-the-cosmos-chain-registry)
- Opened IBC connection between the source chain and Osmosis
    - Selected a sole desigate IBC connection between the registering chain and Osmosis for this asset
        - All native assets from a chain should go through a single connection, but CW20 tokens can be sent through another connection
	- See: [Enabling IBC transfers](../integrate/registration.md#enabling-ibc-transfers) and [Setting up and operating relayer to Osmosis](../integrate/registration.md#setting-up-and-operating-relayer-to-osmosis)
- There is a liquidity pool on Osmosis.
	- See: [GAMM Module: Create pool](../../osmosis-core/modules/gamm/#create-pool) for the CLI command to create a pool
- Assets listed on CoinGecko (optional)
    - See: [How to enlist assets onto CoinGecko](../integrate/registration.md#how-to-enlist-an-asset-onto-coingecko)

### Requirements

- Designate IBC Connection details:
    - Source channel (Osmosis' channel to the registering chain)
    - Destination channel (Registering chain's channel to Osmosis)
- Asset data:
    - IBC denomination (when the asset is transferred to Osmosis, the base denomination looks like "ibc/...")
        - E.g., For ATOM: `"base": "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2",`
    - Name, symbol, exponent, etc.
    - CoinGecko ID (optional, but should be included if and when there is one)
        - Refer to the latest [CoinGecko Coins List](https://api.coingecko.com/api/v3/coins/list)
- Token Logo Image files (both .png and .svg is recommended)
    - Note: Currently, a .png is required to be able to render on [info.osmosis.zone](https://info.osmosis.zone)
- Basic understanding of GitHub, knowing how to fork a respository, create a branch, commit changes, and submit a Pull Request

### Steps

1. Review the [Osmosis Assetlists Registry](https://github.com/osmosis-labs/assetlists) docs:
    1. [README.md](https://github.com/osmosis-labs/assetlists/blob/main/README.md)
    2. [assetlist.schema.json](https://github.com/osmosis-labs/assetlists/blob/main/assetlist.schema.json)
2. Submit a pull request with necessary changes to the `osmosis-1/osmosis.zone_assets.json` file.
    - Be sure to include the CoinGecko ID if one exists


## Step 3: Register an Asset on the Osmosis Frontend Repository

### Prerequisites

Chain Data

- Chain registered onto the Cosmos Chain Registry
    - See: [How to register onto the Cosmos Chain Registry](https://docs.osmosis.zone/integrate/registration.html#how-to-register-onto-the-cosmos-chain-registry)
- Chain registered onto SLIP173
    - See: [How to Register onto SLIP173](https://docs.osmosis.zone/integrate/registration.html#how-to-register-a-bech32-prefix-onto-slip173)
- Relayer(s) set up to relay packets between chains
    - To set up a relayer, see the [Relaying Guide](https://docs.osmosis.zone/developing/relaying/relay.html)
    - Don't want to set up a Relayer? See: [Shop for a Relayer as a Service (RAAS) Provider](https://docs.osmosis.zone/developing/relaying/relayers.html) 
- IBC token transfer has been validated
    - Or else a functioning Bridge between Chains (only if regular IBC transfers are not possible)
- Chain has a block explorer, either:
    - Mintscan (preferred), or
    - Any other Block explorer, e.g., Big Dipper, Ping, or a chain-dedicated explorer

Asset Data

- Asset registered onto the Cosmos Chain Registry
    - See: [How to register onto the Cosmos Chain Registry](https://docs.osmosis.zone/integrate/registration.html#how-to-register-onto-the-cosmos-chain-registry)
- Asset price oracle added to Osmosis Zone (co-requisite)
    - See: [How to Specify Asset Price Oracle on Osmosis Zone (CoinGecko)](https://docs.osmosis.zone/integrate/frontend.html#how-to-specify-asset-price-oracle-on-osmosis-zone-coingecko)
    - See: [How to Specify Asset Price Oracle on Osmosis Zone (Liquidity Pool)](https://docs.osmosis.zone/integrate/frontend.html#how-to-specify-asset-price-oracle-on-osmosis-zone-liquidity-pool)
- Asset registered onto the Osmosis Assetlists Registry (post-requisite)
    - See: [How to register an Asset onto the Osmosis Assetlists Registry](https://docs.osmosis.zone/integrate/registration.html#how-to-register-an-asset-onto-the-osmosis-assetlists-registry)

### Requirements

- Chain data:
    - RPC and REST endpoints
    - Chain name, Chain id
    - BIP44 Coin type (slip44)
        - e.g., `coinType: 118,`
    - bech32 prefix (slip173)
    - At least one staking currency must be specified
    - At least one fee currency must be specified
    - Cosmos SDK version
    	- Used to determine which 'features' must be specified
    - Gas prices
        - The low, average, and high gas prices (per gas unit) so users can choose to either save on fees or expedite transactions using Keplr wallet
    - URL to a transation on a Block Explorer

- Asset data:
    - Denominations
        - Coin denomination (the denomination for a 'whole' token (e.g., 'ATOM'))
    	- Coin minimal denomination (base denom on originating chain (e.g., 'uatom')
		- For CW20 tokens:
			- The minimal denomination looks like `cw20:</CONTRACT ADDRESS>`
			- Will also need the CW20`<>`ICS20 contract address
		- For assets originally foreign to the integrating chain (multihop IBC tokens):
			- The minimal denomination is the 'ibc/...' denom on the registering chain
			- Will also need the entire IBC Transfer Path with the original denomination
    - Coin decimal places (e.g., 'ATOM' can be split into micro-ATOM, hence it has 6 decimal places--1 ATOM == 1,000,000 uatom)
    - Asset Price data (if available), either:
    	- CoinGecko ID (optional, but should be included if and when one exists), or
    		- Refer to the latest [CoinGecko Coins List](https://api.coingecko.com/api/v3/coins/list)
        - `pool:<coin minimal denomination>` (default alternative, if no CoinGecko ID exists yet), or
        	- The alternatives should only be used if there is an acceptable pool with the new asset
        	- See: [How to Specify Asset Price Oracle on Osmosis Zone (Liquidity Pool)](https://docs.osmosis.zone/integrate/frontend.html#how-to-specify-asset-price-oracle-on-osmosis-zone-liquidity-pool)
        - none
    - Token Logo Image files (both .png and .svg is recommended)
        - Note: Currently, a .png is required to be able to render on info.osmosis.zone
        - Note: image files shall be titled exactly with the token Symbol in lowercase. E.g., for 'ATOM', title the files `atom.png` and `atom.svg`
    - Whether the asset is a staking currency
    - Whether the asset is a fee currency
    - Designate IBC Connection details:
        - Source channel (Osmosis' channel to the registering chain)
        - Destination channel (Registering chain's channel to Osmosis) 
    - Bridge URL (only if regular IBC transfers are not possible)
        - Best to include URL parameters to pre-select the networks and assets on the bridge interface
- Enough OSMO for the pool creation fee (100 OSMO) and initial liquidity for an OSMO pool (at least 2000 OSMO-worth per pool)
- Basic understanding of GitHub, knowing how to fork, create a branch, commit changes, and submit a Pull Request

### Steps

1. Review the [Osmosis Frontend Repo](https://github.com/osmosis-labs/osmosis-frontend) docs:
    1. [README.md](https://github.com/osmosis-labs/osmosis-frontend/blob/master/README.md)
2. Submit a pull request branch with necessary changes to the following:
    - `osmosis-frontend/packages/web/public/tokens/`:
        - Add token logo images
    - `osmosis-frontend/packages/web/config/chain-infos.ts`:
        - Add chain data to the `chainInfos` onject
            - Include the optimal RPC and REST endpoints
            - Be sure to include coin type
            - Be sure to include bech32 prefix
            - List all currencies, including stake and fee currencies
                - For each currency, be sure to include the Asset Price Oracle as `CoinGeckoID:`
                    - opt for a real CoinGecko ID, if one exists
                    - alternatively, use `pool:<coin minimal denom>` if a pool exists
                    - or else none
            - Include features
                - 'stargate' -- must be specified if using Cosmos SDK v0.40+
                - 'ibc-transfer' -- must be specified if IBC transfers following the ICS20 standard have been enabled on the chain
                - 'no-legacy-stdTx' -- must be specified if using Cosmos SDK v0.43+, but still recommended to specify, regardless of Cosmos SDK version
                - 'ibc-go' -- must be specified if using Cosmos SDK v0.43+, and import the ibc-go repository
                - 'wasmd_0.24+' -- must be specified if it needs to append the /cosmwasm pathname (usually for cw20 tokens)
                - E.g., `features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],`
            - Include gas price step
            - Include chain explorer path
                - Opt for Mintscan, if available
                - Note: watch out for and remove any dollar sign ($) in the URL, which may be included in the Explorer URL in the Cosmos Chain Registry
	    - See examples below
    - `osmosis-frontend/packages/web/config/ibc-assets.ts`
        - Add assets to `IBCAssetInfos`
            - Be sure to include the external bridge URLs if an external site is required to bridge to assets to and from Osmosis
	    - See examples below
3. Validate the deposit and withdrawal of the asset(s) via the generated staging link

### Examples

Example of chain-infos.ts::chainInfos:
	- Juno chain, with native asset JUNO listed as a stake, fee, and currency token.
	- Note: CW20 assets have a the asset symbol appended to the contract address as the coinMinimalDenom.
```
{
	rpc: 'https://rpc-juno.keplr.app',
	rest: 'https://lcd-juno.keplr.app',
	chainId: 'juno-1',
	chainName: 'Juno',
	bip44: {
		coinType: 118,
	},
	bech32Config: Bech32Address.defaultBech32Config('juno'),
	currencies: [
		{
			coinDenom: 'JUNO',
			coinMinimalDenom: 'ujuno',
			coinDecimals: 6,
			coinGeckoId: 'juno-network',
			coinImageUrl: window.location.origin + '/public/assets/tokens/juno.svg',
			isStakeCurrency: true,
			isFeeCurrency: true,
		},
		{
			type: 'cw20',
			contractAddress: 'juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr',
			coinDenom: 'NETA',
			coinMinimalDenom: 'cw20:juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr:NETA',
			coinDecimals: 6,
			coinGeckoId: 'neta',
			coinImageUrl: window.location.origin + '/public/assets/tokens/neta.svg',
		},
		{
			type: 'cw20',
			contractAddress: 'juno1g2g7ucurum66d42g8k5twk34yegdq8c82858gz0tq2fc75zy7khssgnhjl',
			coinDenom: 'MARBLE',
			coinMinimalDenom: 'cw20:juno1g2g7ucurum66d42g8k5twk34yegdq8c82858gz0tq2fc75zy7khssgnhjl:MARBLE',
			coinDecimals: 3,
			coinGeckoId: 'pool:marble',
			coinImageUrl: window.location.origin + '/public/assets/tokens/marble.svg',
		},
	],
	gasPriceStep: {
		low: 0,
		average: 0,
		high: 0.035,
	},
	features: ['stargate', 'ibc-transfer'],
	explorerUrlToTx: 'https://www.mintscan.io/juno/txs/{txHash}',
},
```

Examples of ibc-assets.ts::IBCAssetInfos:
-  ATOM, a native token from Cosmos Hub:
```
    {
        counterpartyChainId: 'cosmoshub-4',
        sourceChannelId: 'channel-0',
        destChannelId: 'channel-141',
        coinMinimalDenom: 'uatom',
    },
```
- NETA, a CW20 token from Juno:
    - Note: *channel-42* is Osmosis' channel to Juno for native Juno assets, but channel-169 is Osmosis' channel to this CW20`<>`ICS20 contract on Juno, which currently accomodates NETA, MARBLE, BLOCK, HOPE, RACOON, and potentially other CW20 tokens in the future 
```
    {
        counterpartyChainId: 'juno-1',
        sourceChannelId: 'channel-169',
        destChannelId: 'channel-47',
        coinMinimalDenom: 'cw20:juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr',
        ics20ContractAddress: 'juno1v4887y83d6g28puzvt8cl0f3cdhd3y6y9mpysnsp3k8krdm7l6jqgm0rkn',
    },
```
- PSTAKE, an ICS20 token originating from Gravity Bridge chain, transfered through Persistence chain, and finally coming to Osmosis (i.e., not directly to Osmosis from Gravity Bridge):
    - Note: *channel-38* is Persistence chain's channel to Gravity bridge
    - Note: *gravity0xfB5...006* is Gravity Chain's denomination of PSTAKE (originally from Ethereum)
```
    {
        counterpartyChainId: 'core-1',
        sourceChannelId: 'channel-4',
        destChannelId: 'channel-6',
        coinMinimalDenom: 'ibc/A6E3AF63B3C906416A9AF7A556C59EA4BD50E617EFFE6299B99700CCB780E444',
        ibcTransferPathDenom: 'transfer/channel-38/gravity0xfB5c6815cA3AC72Ce9F5006869AE67f18bF77006',
    },
```
- INJ, the staking and fee token for Injective chain. Injective uses an external site to bridge tokens between Injective Chain and Osmosis, thus we specifiy a custom deposit and withdraw URL override:
```
{
	counterpartyChainId: 'injective-1',
	sourceChannelId: 'channel-122',
	destChannelId: 'channel-8',
	coinMinimalDenom: 'inj',
	depositUrlOverride: 'https://hub.injective.network/bridge/?destination=osmosis&origin=injective&token=inj',
	withdrawUrlOverride: 'https://hub.injective.network/bridge/?destination=injective&origin=osmosis&token=inj',
},
```





## How to Enlist an Asset onto CoinGecko

### Purpose

CoinGecko ([CoinGecko.com](https://coingecko.com)) is cryptocurrency price aggregator which can provide asset price data directly to Osmosis Zone via API. Check out their [FAQ](https://www.coingecko.com/en/faq) to learn more.

Osmosis embraces CoinGecko price feeds and uses these as a backup for pool spot prices on Osmosis Zone. If as asset is not yet registered on CoinGecko, it should aim to do so. This procedure will guide project administrators to register their Asset onto CoinGecko.

### Prerequisites

- Chain mainnet is live

From [coingecko.com/en/methodology](https://www.coingecko.com/en/methodology):
- Working, functional website that has sufficient information on cryptoasset that is being listed. Websites with no information on purpose, team or social media profiles will be considered as invalid.
    - Website must be owned by the project/maintaining team. Websites hosted on website builders (i.e Wix) will not be accepted.
- Working block explorer
- Listed on at least one (1) active exchanges where CoinGecko is integrated with.
    - Note: Because Osmosis is integrated with CoinGecko, this will automatically be fullfilled once a Liquidity Pool containing the new Asset is created on Osmosis.
    - See: [How to Add an Asset onto the Osmosis Assets Page](../integrate/frontend.md#how-to-add-an-asset-onto-the-osmosis-assets-page)

### Requirements

- Asset data:
    - Name (e.g., 'Cosmos Hub')
    - ID (e.g., 'cosmos')
    - Symbol (e.g., 'ATOM')
    - Circulating Supply
    - Total Supply
    - Osmosis Address (i.e., the 'ibc/...' denom on Osmosis)

### Steps

1. Review CoinGecko's [Methodology page](https://www.coingecko.com/en/methodology)
	1. Pay special attention to the following sections:
        - 'Listings',
        - 'Listing Criteria',
        - 'Do's and Don'ts for Listing Submission', and
        - 'Listing Process Flow'
2. Fill in and submit a 'CoinGecko Request Form' (a current link can be found on their 'Methodology' page)


### How to Specify Asset Price Oracle on Osmosis Zone (Liquidity Pool)

#### Purpose

This procedure will set up the default asset pricing mechanism for an asset to show its price throughout Osmosis Zone. If a CoinGecko Price feed exists, opt to use that instead. This pricing mechanism works by fetching the current spot price of the asset from a pool with an Asset of a known price. For exampe, we might not know the price of Foo coin directly, but we can assume it's price of, say, $2.00 by seeing that it's trading at 1 FOO per 2 UST in the FOO/UST pool.

#### Pre-requisites

- Asset is in a Pool
	- See: [How to create a Liquidity Pool](https://docs.osmosis.zone/developing/modules/spec-gamm.html#create-pool)
- Pool containing Asset is acceptable
	- The criteria for 'acceptable' pools are *roughly* as follows:
		- Contains only 2 tokens
		- Contains a common Base Asset (i.e., OSMO, ATOM, or UST)
		- 50/50 weighting
		- 0% exit fee
		- No future governor (set to blank (""))
		- 0.2-0.3% swap fee
		- Sufficient liquidity (at least USD $1000-worth)

#### Requirements

- Pool details
	- Number (Pool ID)
	- Assets
		- coin minimal denomination
		- source channel(s) (if Asset is foreign)
- Basic understanding of GitHub, knowing how to fork, create a branch, commit changes, and submit a Pull Request

#### Steps

1. Review the [Osmosis Frontend Repo](https://github.com/osmosis-labs/osmosis-frontend/tree/frontier) docs:
    1. [README.md](https://github.com/osmosis-labs/osmosis-frontend/blob/master/README.md)
2. Submit a pull request branch with necessary changes to the following:
	- `src/stores/root.ts`
		- Specify pool under `RootStore::constructor::priceStore::queriesStore`
			- `alternativeCoinId: 'pool:<minimal coin denom>'`
			- `poolID: '<pool number>',`
			- `spotPriceSourceDenom: <asset of known price::coin minimal denomination>`
			- `spotPriceDestDenom: <asset of unknown price::coin minimal denomination>`
			- `destCoinId: 'osmosis'`
			- See examples below
	- `src/config.ts`
		- Add the alternative coin Id under each specification of the Asset within `EmbedChainInfos: ChainInfoWithExplorer`
			- E.g., `coinGeckoId: 'pool:ugraviton'`
			- Note that many assets are listed as a staking currency, a fee payment currency, and as a trading currency for a chain; the coin Id should be added to each listing of the asset
			- See example below

#### Examples

- Pool 1:
```
{
	alternativeCoinId: 'pool:uosmo',
	poolId: '1',
	spotPriceSourceDenom: 'uosmo',
	spotPriceDestDenom: DenomHelper.ibcDenom([{ portId: 'transfer', channelId: 'channel-0' }], 'uatom'),
	destCoinId: 'cosmos',
},
```
- Pool 631:
	- This pool contains a foreign CW20 token. Note how `cw20:` prefixes the contract address.
```
{
	alternativeCoinId: 'pool:neta',
	poolId: '631',
	spotPriceSourceDenom: DenomHelper.ibcDenom(
		[{ portId: 'transfer', channelId: 'channel-169' }],
		'cw20:juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr'
	),
	spotPriceDestDenom: 'uosmo',
	destCoinId: 'osmosis',
},
```
- Pool 648:
	- This pool contains an IBC-multihop token. Note how all transfer paths are included.
```
{
	alternativeCoinId: 'pool:pstake',
	poolId: '648',
	spotPriceSourceDenom: DenomHelper.ibcDenom(
		[
			{ portId: 'transfer', channelId: 'channel-4' },
			{ portId: 'transfer', channelId: 'channel-38' },
		],
		'gravity0xfB5c6815cA3AC72Ce9F5006869AE67f18bF77006'
	),
	spotPriceDestDenom: 'uosmo',
	destCoinId: 'osmosis',
},
```

Example of osmosis-frontend/packages/web/config/chain-infos.ts::chainInfos:
- Umee chain info:
	- Note that `coinGeckoId: 'pool:uumee',` is specified three times, once under each listing of the currency
	- Note: once UMEE gets a listing and live price feed on CoinGecko, the values here should then be replaced with the CoinGeckoID, e.g., `coingGeckoId: 'umee'`  
```
{
	rpc: 'https://rpc.aphrodite.main.network.umee.cc',
	rest: 'https://api.aphrodite.main.network.umee.cc',
	chainId: 'umee-1',
	chainName: 'Umee',
	bip44: {
		coinType: 118,
	},
	bech32Config: Bech32Address.defaultBech32Config('umee'),
	currencies: [
		{
			coinDenom: 'UMEE',
			coinMinimalDenom: 'uumee',
			coinDecimals: 6,
			coinGeckoId: 'pool:uumee',
			coinImageUrl: window.location.origin + '/public/assets/tokens/umee.png',
			isStakeCurrency: true,
			isFeeCurrency: true,
		},
	],
	features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx'],
	explorerUrlToTx: 'https://www.mintscan.io/umee/txs/{txHash}',
},
```
