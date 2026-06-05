---
description: Permissionlessly create native tokens namespaced to your address.
sidebar_position: 7
---

# Token Factory

The Token Factory lets any account create its own token on Osmosis, permissionlessly. There is no approval process and no risk of name collisions, because every created token is namespaced under the address that made it.

## How it works conceptually

A token created through the factory has a [denom](/learn/terminology#denom) of the form `factory/{creator address}/{subdenom}`. Because the creator's address is part of the denom, two different creators can both make a token called, say, `mycoin` without conflict: they are distinct denoms (`factory/osmo1aaa.../mycoin` and `factory/osmo1bbb.../mycoin`). A single account can create as many tokens as it likes by choosing a different subdenom each time.

The creator of a denom is its admin and controls minting and burning, and can assign token metadata (such as the display symbol and [exponent](/learn/terminology#exponent)). This makes the factory the standard way to issue native assets on Osmosis, from stablecoins and project tokens to the alloyed-asset denoms.

For the module specification (the messages to create, mint, burn, and administer a denom, plus the bank hooks that let advanced tokens run logic before transfers), see the [Token Factory module page](/build/chain/tokenfactory) under Build.
