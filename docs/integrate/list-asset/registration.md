---
sidebar_position: 4
---
# Register your Asset
This guide intends to support teams looking to enlist their tokenized crypto asset onto the Osmosis Zone app. Assets need to be registered in several locations in order to be displayed correctly on all interfaces.

### Overview

At a very high level, the process is:

1. **Register chain and asset metadata to the Cosmos Chain Registry** (required), and ensure an IBC connection to Osmosis is registered there as well.
2. **Wait for auto-listing** on Osmosis. The [osmosis-labs/assetlists](https://github.com/osmosis-labs/assetlists) pipeline runs twice weekly (Tuesdays and Fridays at 15:00 UTC) and automatically detects new IBC-connected assets in the Cosmos Chain Registry, adds them to `osmosis.zone_assets.json`, and ships them to Osmosis Zone as **unverified** assets.
3. *(Optional)* **Submit a PR to `osmosis-labs/assetlists`** to configure advanced properties (categories, transfer methods, override metadata, etc.) and/or to request an upgrade to **verified status** once onchain liquidity criteria are met.

Note that the overall process may require collaboration from technical teams (to provide chain services and IBC relaying) and market-making entities (to provide initial liquidity needed for verified status).

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
  - Note that to be enlisted on Osmosis, an IBC connection will need to be set up and registered (in `/_IBC/`) at the Chain Registry.
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


## Step 2: Wait for Auto-Listing on Osmosis (or Configure Advanced Properties)

### Purpose

The Osmosis Labs' Assetlist Registry ([osmosis-labs/assetlists](https://github.com/osmosis-labs/assetlists)) serves the asset metadata displayed on the Osmosis Zone app. For the vast majority of new tokens, **no manual PR to this repo is required**, the assetlist pipeline picks up new assets from the Cosmos Chain Registry automatically.

### How auto-detection works

- A scheduled GitHub Actions workflow in `osmosis-labs/assetlists` runs regularly, currently twice weekly.
- It scans the Cosmos Chain Registry for assets whose source chain has an IBC connection to Osmosis.
- For each newly detected asset, the workflow generates an entry in `osmosis-1/osmosis.zone_assets.json` (and stubs the source chain into `osmosis.zone_chains.json` if it is not already present), opens a PR to the `update/assetlist_all` branch, runs validation, and auto-merges on success.
- The asset is then shipped to Osmosis Zone as **unverified**. Unverified assets are visible only to users who have toggled "Show Unverified Assets" on in the Osmosis Zone app.

For the full workflow detail (validation steps, IBC client health checks, endpoint validation, etc.), see the [assetlists README](https://github.com/osmosis-labs/assetlists/blob/main/README.md).

### Prerequisites for auto-listing

- Registered onto the Cosmos Chain Registry (see [Step 1](#step-1-register-to-the-cosmos-chain-registry)).
- An IBC connection exists between the source chain and Osmosis, and is **registered at the Cosmos Chain Registry** under `_IBC/`.
  - All native assets from a chain should normally go through a single connection, although some token types (e.g., CW20 tokens) may require another connection.
  - See: [Enabling IBC transfers](https://docs.osmosis.zone/overview/integrate/transfer#enabling-ibc-transfers) and [Setting up and operating a relayer to Osmosis](https://docs.osmosis.zone/overview/integrate/transfer#setting-up-and-operating-a-relayer-to-osmosis).

### Optional: Submit a manual PR for advanced configuration

You only need to open a PR against `osmosis-labs/assetlists` if you want to configure properties that the auto-detection pipeline cannot infer. Common reasons include:

- Assigning **categories** (e.g., stablecoin, defi, meme).
- Adding custom **transfer methods** (external bridges, integrated bridges, fiat onramps) for assets that require more than a plain IBC transfer.
- Providing custom RPC / REST endpoints for the source chain in `osmosis.zone_chains.json` (otherwise the chain entry is auto-stubbed from Chain Registry data).
- Marking the asset as `osmosis_unlisted` while you finalize configuration.
- Requesting an upgrade to verified status (covered in Step 3).

#### Where the changes go

- `osmosis-1/osmosis.zone_assets.json` — the asset entry.
- `osmosis-1/osmosis.zone_chains.json` — only when you need to provide custom chain services (RPC/REST/explorer); otherwise leave it alone.

#### Field reference

See [assetlists README — Asset Object Structure](https://github.com/osmosis-labs/assetlists/blob/main/README.md) for a full field-by-field reference, defaults, and decision guidance.

The minimum required shape for an asset object is:

```json
{
  "chain_name": "terra",
  "base_denom": "uluna",
  "path": "transfer/channel-72/uluna"
}
```

All other fields are optional and default to safe values (e.g., `osmosis_verified` defaults to `false`). Consult the assetlists README before adding any optional field.

#### Submitting the PR

- New Pull Requests will automatically initialize with a description template that includes a checklist — complete it as thoroughly as possible.
- Validation checks run automatically on the PR; address any failures before requesting review.
- Maintainers will review and merge once validation passes and the configuration is sound.

## Step 3 (optional): Request Verified Status

**Verified status** is what makes an asset visible to Osmosis Zone users by default (without requiring the "Show Unverified Assets" toggle). It is the recommended end state for any asset that has established meaningful onchain liquidity on Osmosis.

### Verification criteria

Verification is gated on objective criteria, most notably a minimum amount and depth of onchain liquidity in an Osmosis pool, plus metadata completeness on the Cosmos Chain Registry.

The authoritative criteria live in [LISTING.md](https://github.com/osmosis-labs/assetlists/blob/main/LISTING.md). Read it before opening the upgrade PR, the thresholds and requirements there are the source of truth and may change over time.

### How to request the upgrade

1. Ensure your asset meets every criterion listed in LISTING.md (liquidity, metadata completeness, etc.).
2. Create at least one liquidity pool on Osmosis that satisfies the liquidity requirements. A Supercharged pool type is recommended over a Weighted pool. See the [Pool Setup Guide](https://docs.osmosis.zone/overview/integrate/pool-setup).
3. Open a PR against [osmosis-labs/assetlists](https://github.com/osmosis-labs/assetlists) that sets `"osmosis_verified": true` on the asset entry in `osmosis-1/osmosis.zone_assets.json`.
4. In the PR description, include the **Pool ID(s)** that satisfy the liquidity requirements, and any other evidence requested by the PR template.

### What happens next

- Maintainers review the PR against the criteria in LISTING.md before merging.
- Once merged, the asset is shipped to Osmosis Zone as verified on the next assetlist publish.
