---
sidebar_position: 4
---
# Register your Asset
This guide intends to support teams looking to enlist their tokenized crypto asset onto the Osmosis Zone app. Assets need to be registered in several locations in order to be displayed correctly on all interfaces.

### Overview

At a very high level, the process entails three main steps:
 - Registering to the Cosmos Chain Registry,
 - Registering to Osmosis Labs’ Assetlist Registry, and
 - Establishing markets for the asset on Osmosis.
Note that the overall process could require collaboration from knowledgeable technical teams to provide information or services, as well as market-making entities to provide funding for initial liquidity or incentive programs.

To ensure a complete integration with Osmosis Zone and related apps, see the [Osmosis Labs' Assetlist Repository's LISTING.md Document](https://github.com/osmosis-labs/assetlists/blob/main/LISTING.md).

### Required Skills

Basic understanding of GitHub, knowing how to fork a repository, create a branch, commit changes, and submit a Pull Request

## Step 1: Register to the Cosmos Chain Registry

### Purpose

The Cosmos Chain Registry is meant to be a public good, used as a single source of truth for chain and asset metadata, as well as IBC connections, interfaces, and tooling supporting Cosmos chains.

### Prerequisites

- Registered to [SLIP173](https://github.com/satoshilabs/slips/blob/master/slip-0173.md)
- Registered to [SLIP44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md)
    - Note: Coin Type 118 represents the Cosmos Hub's ATOM token, listed in [SLIP44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md); many projects also default to using this coin type, while some have registered their own.

### Requirements

- Chain data--metadata, locations, network addresses, etc.
- Asset data--metadata, such as name, symbol, minimal denomination, decimal precision, etc.
    - CoinGecko ID
        - Refer to [CoinGecko's Coins List API (v3)](https://api.coingecko.com/api/v3/coins/list)
- Basic understanding of GitHub, knowing how to fork a repository, create a branch, commit changes, and submit a Pull Request

### Steps

1. Review the [Cosmos Chain Registry](https://github.com/cosmos/chain-registry) docs:
    - Note: It is recommended to refer to another registration to serve as an example, such as [Osmosis' registration](https://github.com/cosmos/chain-registry/blob/master/osmosis/chain.json)
2. If registering a new Chain, submit a pull request with necessary changes to the `chain.json` file.
	- Follow the [chain.schema.json](https://github.com/cosmos/chain-registry/blob/master/chain.schema.json) format.
	  - Be sure to include `bech32_prefix`.
		  - e.g., `"bech32_prefix": "cosmos",`
	  - Be sure to include `slip44` (coin type).
		  - e.g., `"slip44": 118,`
	  - Be sure to include at least one RPC and one REST under `apis`.
    - Be sure to include at least one working Block Explorer.
  - Note that to enlisted on Osmosis, an IBC connection will need to be set up and registered (in `/_IBC/`) at the Chgain Registry.
3. If registering a new Asset, submit a pull request with necessary changes to the `assetlists.json` file.
	- Follow the [assetlist.schema.json](https://github.com/cosmos/chain-registry/blob/master/assetlist.schema.json) format.
	  - `name` refers to how the asset should be called when spoken in conversation.
    - `symbol` refers to ticker symbol, like how a stock or other securities use a shortened representation. Typically in ALL CAPS.
      - e.g., TSLA for Telsa stock, or ATOM for Cosmos Hub's Atom.
    - `description` provides a brief description of the asset.
      - e.g., "Atom is the native staking and fee token of Cosmos Hub."
    - `extended_description` provides additional context about the project in which the asset participates.
    - `socials` allows for registering a website and X (formerly Twitter) profile.
	  - `coingecko_id` if one exists
		  - e.g., `"coingecko_id": "cosmos"`
  - Be sure to include a high quality logo image.


## Step 2: Register an Asset to the Osmosis Labs' Assetlist Registry

### Purpose

The Osmosis Labs' Assetlist Registry is used to serve asset metadata displayed on the Osmosis Zone app.

### Prerequisites

- Registered onto the Cosmos Chain Registry
    - See: [How to register onto the Cosmos Chain Registry](https://docs.osmosis.zone/overview/integrate/registration#step-1-register-onto-the-cosmos-chain-registry)
- IBC Connection
  - Established an IBC connection between the source chain and Osmosis
    - All native assets from a chain should go through a single connection, although some token types (e.g., CW20 tokens) may require another connection
	  - See: [Enabling IBC transfers](https://docs.osmosis.zone/overview/integrate/transfer#enabling-ibc-transfers) and [Setting up and operating relayer to Osmosis](https://docs.osmosis.zone/overview/integrate/transfer#setting-up-and-operating-a-relayer-to-osmosis)
  - Registered IBC Connection at the Cosmos Chain Registry.
- There exists liquidity of the asset on Osmosis.
	- See: [Pool Setup Guide](https://docs.osmosis.zone/overview/integrate/pool-setup) for the CLI command to create a pool.
- Assets listed on CoinGecko (optional, but highly recommended)
    - See: [How to enlist assets onto CoinGecko](../integrate/registration.md#how-to-enlist-an-asset-onto-coingecko)

### Requirements

- Chain data and services:
  - [Chain Registry] `chain_name`.
    - E.G., `cosmoshub` is the registered chain_name for Cosmos Hub.
  - Block Explorer Transaction URL
    - Mintscan is a preferred default
  - Working RPC and REST endpoints
    - Must not block the Osmosis Domain.
      - Note that many Cosmos SDK RPC Nodes have CORS blocking by default
    - RPC node must have Secure Web Sockets (wss://) protocol enabled.
- Asset data:
  - Base denomination on source chain
    - e.g., 'uatom' is the `base_denom` (i.e., the unique and immutable indivisible denomination unit) of ATOM
  - IBC Path
    - Generally describes to the 'path' (IBC hops) that the asset takes to get to Osmosis
      - Every IBC hop is described in the path, including destination chain port and destination chain channel-id
    - Used as input for the IBC Hash function to determine the asset denomination on the destination chain.
      - IBC denoms always appear as: 'ibc/{SHA256 HASH of IBC Path}'
    - In some rare cases, some characters in the source chain's base_denom or replaced with other characters.
  - Whether the Asset is bridged (not referring to IBC transfers)

### Steps

1. Review the [Osmosis Assetlists Registry](https://github.com/osmosis-labs/assetlists) docs and schema:
    1. [README.md](https://github.com/osmosis-labs/assetlists/blob/main/README.md)
    2. [LISTING.md](https://github.com/osmosis-labs/assetlists/blob/main/LISTING.md)
    3. [assetlist.schema.json](https://github.com/osmosis-labs/assetlists/blob/main/assetlist.schema.json)
2. Submit a pull request with necessary changes to enlist the asset:
  - Ensure the source chain in included in `osmosis-1/osmosis.zone_chains.json`.
    - If not yet registered, add the chain object to the end of the `chains` array.
    - Include `chain_name`, `rpc`, `rest`, `explorer_tx_url`, and `keplr_features`.
      - E.G.,
        
      ```
        {
          "chain_name": "osmosis",
          "rpc": "https://rpc-osmosis.keplr.app",
          "rest": "https://lcd-osmosis.keplr.app",
          "explorer_tx_url": "https://www.mintscan.io/osmosis/txs/${txHash}",
          "keplr_features": [
            "ibc-go",
            "ibc-transfer",
            "cosmwasm",
            "wasmd_0.24+",
            "osmosis-txfees"
          ]
        }
      ```
  - Add the asset to the `osmosis-1/osmosis.zone_assets.json` file.
    - Add the new asset object to the end of the `assets` array.
    - Include `base_denom`, `chain_name`, and `path`.
    - New additions always must always start with `"osmosis_unlisted": true
      - This allows the Osmosis team to validate via preview mode that the asset appears and behaves correctly on Osmosis Zone.
    - New additions always default with having `"osmosis_verified": false
      - Once assets are fully integrated, the asset can then be upgraded to "Verified" status.
      - See [LISTING.md](https://github.com/osmosis-labs/assetlists/blob/main/LISTING.md) for details on upgrading an asset to Verified status.
    - If adding a stablecoin, please include the `peg_mechanism`
      - E.G., `"peg_mechanism": "collateralized"`
    - If transferring the asset is not a simple IBC transfer, but requires another bridging/transfer interface, provide the URL(s) for the Deposit and Withdraw functions in the `transfer_methods` array within the asset's object.
    - E.G.,
      
    ```
    {
      "chain_name": "terra",
      "base_denom": "uluna",
      "path": "transfer/channel-72/uluna",
      "osmosis_verified": true,
      "override_properties": {
        "name": "Luna Classic"
      },
      "transfer_methods": [
        {
          "name": "Terra Bridge",
          "type": "external_interface",
          "deposit_url": "https://bridge.terra.money",
          "withdraw_url": "https://bridge.terra.money"
        }
      ]
    },
    ```
  - In the Pull Request, briefly describe the change, and complete the checklist as thoroughly as possible.
    - New Pull Requests will automatically initialize with a description template that includes the checklist.
    - Be sure to describe the plan for onchain liquidity, and provide a Pool ID once one exists.
    - The PR reviewers will assist with any questions.
    - If requested, a preview link to Osmosis Zone that shows the new asset can be provided.
      - From the preview, a Weighted liquidity pool can be created. However, note that a Supercharged (or newer) pool type is recommended.
    - Be sure to check back to the PR regularly to check for any questions, comments, and additional action items required to complete the listing process.


## Step 3 (optional): Complete the Asset Integration

To create an ideal user experience when interacting with an Asset on Osmosios Zone, it is best to ensure that all metadata is registered, dependent data sources have all data about the asset, and that there is sufficient and efficient liquidity of the asset on Osmosis. See [LISTING.md](https://github.com/osmosis-labs/assetlists/blob/main/LISTING.md) for details.
