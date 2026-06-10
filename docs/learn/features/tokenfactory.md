---
description: Permissionlessly create native tokens namespaced to your address.
sidebar_position: 7
---

# Token Factory

The Token Factory lets any account create its own token on Osmosis, permissionlessly. There is no approval process and no risk of name collisions, because every created token is namespaced under the address that made it.

## How it works conceptually

A token created through the factory has a [denom](/learn/terminology#denom) of the form `factory/{creator address}/{subdenom}`. Because the creator's address is part of the denom, two different creators can both make a token called, say, `mycoin` without conflict: they are distinct denoms (`factory/osmo1aaa.../mycoin` and `factory/osmo1bbb.../mycoin`). A single account can create as many tokens as it likes by choosing a different subdenom each time.

The creator of a denom is its admin and controls minting and burning, and can assign token metadata (such as the display symbol and [exponent](/learn/terminology#exponent)). This makes the factory the standard way to issue native assets on Osmosis, from stablecoins and project tokens to the alloyed-asset denoms.

A token's current admin is shown on its asset info page in the Osmosis app, so anyone can check who controls a given factory token (and whether the admin has been renounced).

## Launching a community token

You do not need to write any code to create a token factory token. [Start Cooking](https://start.cooking/) is a launchpad that walks you through creating a community token on Osmosis: it creates the factory denom, sets the metadata, and gets it ready to trade.

It also handles the token's initial liquidity. Rather than asking the creator to seed a pool upfront, a new token trades against a bonding curve: buyers trade into a virtual pool where the price rises along the curve as more is bought (starting around `0.001 OSMO` per token, with a 1% swap fee). Once the curve has accumulated enough OSMO (a fixed graduation threshold, around 15,000 OSMO), the token "graduates" and its accumulated liquidity becomes a real tradeable pool on Osmosis. This bootstraps liquidity from trading activity itself, so a community can launch a token without putting up initial capital.

For the module specification (the messages to create, mint, burn, and administer a denom, plus the bank hooks that let advanced tokens run logic before transfers), see the [Token Factory module page](/build/chain/tokenfactory) under Build.
