---
title: Verify
description: Get your asset verified so it shows by default on the Osmosis frontend.
sidebar_position: 8
---

# Verify

## List onto the Osmosis Frontend

Once an asset is [registered](/integrate/list-asset/registration) and auto-listed, it appears on the frontend as an **unverified** asset. From there, meeting the verification criteria upgrades it to **verified**, which is what makes it visible by default. The two tiers are described below.

:::info Frontend data dependencies
The production frontend at [app.osmosis.zone](https://app.osmosis.zone) reads pool state, routing quotes, and token prices from the [Sidecar Query Server (SQS)](../endpoints/sqs) (`sqs.osmosis.zone`), not directly from chain RPC. If you are running a fork of the frontend or building anything that needs to mirror its data, point at SQS first.
:::

## Unverified assets

Listing an asset as unverified is close to permissionless: nearly any registered asset is accepted, subject to anti-scam screening (it cannot imitate another asset's name, symbol, or logo, and the submitting GitHub account should have a real contribution history). An unverified asset is hidden by default; users see it only after toggling **Show Unverified Assets** on in the settings (Cog) menu.

![](@site/docs/assets/asset_list.png)

## Verified assets

**Verified** status is what makes an asset visible by default, including on the Swap page, without the unverified toggle. It is permissioned: a maintainer validates the asset, and it must meet liquidity and quality criteria. As of writing, these include sufficient onchain liquidity (on the order of $10k total, with at least $1,000-worth of each asset in the pool and a minimum bid/ask depth) and a pool of an approved type (concentrated liquidity, stableswap, or an alloyed-asset transmuter).

Because these criteria change, treat [LISTING.md](https://github.com/osmosis-labs/assetlists/blob/main/LISTING.md) in the assetlists repo as the source of truth, and see [Liquidity](/integrate/list-asset/liquidity) for how to source the required liquidity. To request the upgrade, open a PR setting `osmosis_verified: true` for the asset, citing a qualifying pool ID.