# Osmosis Zone Front End

## How to Add Assets onto the Osmosis Assets Page

Add assets to the [Osmosis frontend repo](https://github.com/osmosis-labs/osmosis-frontend) to have the Asset appear on the [Assets page of app.osmosis.zone](https://app.osmosis.zone/assets) or the [Osmosis Frontier](https://frontier.osmosis.zone/assets).

Note that Osmosis will temporarily utilize an alternate front end interface for listing new and unverified assets: [frontier.osmosis.zone](https://frontier.osmosis.zone); once a pool containing the asset has been onboarded into receiving Osmosis Liquidity Mining incentives, the Asset will then be added to the main [app.osmosis.zone](https://app.osmosis.zone/) site; although, there are some exceptions of unincentivized assets being listed directly on the main site if the assets are well-established and part of an ecosystem with a large market capitalization.

![image](https://i.ibb.co/1bhLSx3/Screen-Shot-2022-03-16-at-8-59-21-AM.png)

To be able to list assets, Osmosis also requires data about the blockchain from which the assets originate. This data is also used for Keplr's [Suggest Chain API](https://docs.keplr.app/api/suggest-chain.html) to add the chain to the user's wallet upon attempting to deposit or withdraw assets from Osmosis( wherever an external bridge is not used). If the assets being added are the first from the chain to be added to Osmosis, first add the chain data, and then add the asset data within the chain data. If chain data is already added, skip ahead to adding asset data.

Trade Page

Although any asset in a liquidity pool can be traded when a user specifies the pool, an Asset will only be listed on the Trade page if it is in a pool containing at least 1000 OSMO, 1000 ATOM, or 10 ION.

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
			- The minimal denomination looks like `cw20:<CONTRACT ADDRESS>`
			- Will also need the CW20<>ICS20 contract address
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
    - Note: *channel-42* is Osmosis' channel to Juno for native Juno assets, but channel-169 is Osmosis' channel to this CW20<>ICS20 contract on Juno, which currently accomodates NETA, MARBLE, BLOCK, HOPE, RACOON, and potentially other CW20 tokens in the future 
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

## How to Specify Asset Price Oracle on Osmosis Zone (Liquidity Pool)

### Purpose

This procedure will set up the default asset pricing mechanism for an asset to show its price throughout Osmosis Zone. If a CoinGecko Price feed exists, opt to use that instead. This pricing mechanism works by fetching the current spot price of the asset from a pool with an Asset of a known price. For exampe, we might not know the price of Foo coin directly, but we can assume it's price of, say, $2.00 by seeing that it's trading at 1 FOO per 2 UST in the FOO/UST pool.

### Pre-requisites

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

### Requirements

- Pool details
	- Number (Pool ID)
	- Assets
		- coin minimal denomination
		- source channel(s) (if Asset is foreign)
- Basic understanding of GitHub, knowing how to fork, create a branch, commit changes, and submit a Pull Request

### Steps

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

### Examples

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

## How to Add External Incentive Gauges onto the Osmosis Pools Page

### Purpose

Projects can permissionlessly add external incentive gauges for bonded LP positions. To learn more about external Liquidity Mining Incentives, see [Liquidity Mining Incentives: External Incentives](https://docs.osmosis.zone/integrate/incentives.html#external-incentives).

This procedure instructs how to display those incentive gauges on a pool's page as extra rewards. Shown below is an example of external incentives added to the CHEQ / OSMO pool.

![image](https://user-images.githubusercontent.com/95667791/157994437-a2a90c29-1f88-475f-afff-7c64b9060e54.png)

### Pre-requisites

- Asset has been added to the Osmosis Zone Assets page
	- See: [How to Add an Asset onto the Osmosis Assets page](https://docs.osmosis.zone/integrate/frontend.html#how-to-add-an-asset-onto-the-osmosis-assets-page)
- Pool has been created
	- See: [How to Create a Liquidity Pool](https://docs.osmosis.zone/developing/modules/spec-gamm.html#create-pool)
- External Incentive Gauge(s) have been created
	- See: [How to Add an External Incentive Gauge to a Liquidity Pool](https://docs.osmosis.zone/developing/modules/spec-incentives.html#overview)

### Requirements

- External Incentive Gauge(s) details:
	- Gauge ID
	- Destributed Token Denomination (e.g., 'ibc/...')
	- Pool Number
- Basic understanding of GitHub, knowing how to fork, create a branch, commit changes, and submit a Pull Request

### Steps

1. Review the [Osmosis Frontend Repo](https://github.com/osmosis-labs/osmosis-frontend/) docs:
    1. [README.md](https://github.com/osmosis-labs/osmosis-frontend/blob/master/README.md)
2. Submit a pull request branch with necessary changes to the following:
	- `osmosis-frontend/packages/web/config/feature-flag.ts`
		- Add a container for the pool under `ExternalIncentiveGaugeAllowList`
			- E.g., `'602': []`
			- Within the pool container, add the External Incentive Gauges
				- For each External Incentive Gaugue, include:
					- Gauge ID, and
					- Distributed Token Denomination
						- (must be the 'ibc/...' denomination)
					- E.g., `{ gaugeId: '2127', denom: 'ibc/7A08C6F11EF0F59EB841B9F788A87EC9F2361C7D9703157EC13D940DC53031FA', },`
			- See example below

### Examples

Example of Cheq External Incentives for pool #602, under feature-flag.ts::ExternalIncentiveGaugeAllowList:
```
	'602': [
		{
			gaugeId: '2127',
			denom: 'ibc/7A08C6F11EF0F59EB841B9F788A87EC9F2361C7D9703157EC13D940DC53031FA',
		},
		{
			gaugeId: '2128',
			denom: 'ibc/7A08C6F11EF0F59EB841B9F788A87EC9F2361C7D9703157EC13D940DC53031FA',
		},
	],
```
