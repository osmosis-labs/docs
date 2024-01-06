---
sidebar_position: 2
sidebar_label: Configuration Example
description: An example of configuration for the env file of the outpost.
---

# Configuration Example

A configuration example of the `.env` file provided together with the code in 
the repository follows. It allows to prepare a demo of the platform with the 
*nabla branded style*, as an example.

```bash
# Assetlists configuration
NEXT_PUBLIC_ASSETLISTS_BASE_URL=https://raw.githubusercontent.com/nabla-studio/osmosis-outposts-assetlists/main/configs/
NEXT_PUBLIC_OSMOSIS_ASSETLISTS_BASE_URL=https://raw.githubusercontent.com/nabla-studio/osmosis-outposts-assetlists/main/configs/

# Coingecko
NEXT_PUBLIC_COINGECKO_BASE_URL=https://api.coingecko.com/api/v3/

# Osmosis Chain Configuration Overwrite
NEXT_PUBLIC_OSMOSIS_CHAIN_ID_BASE=osmo-test-5
NEXT_PUBLIC_OSMOSIS_CHAIN_NAME_BASE=osmosistestnet

# Source Chain Configuration Overwrite
NEXT_PUBLIC_SOURCE_CHAIN_ID_BASE=uni-6
NEXT_PUBLIC_SOURCE_CHAIN_NAME_BASE=junotestnet

# Oupost contract Configuration
NEXT_PUBLIC_SWAPROUTER_CONTRACT_ADDRESS=osmo1qw6npqrhgt0k4wvjecyggsyy0u492sg26wwtgttrmwc2xxelghgqkykpf9
NEXT_PUBLIC_CROSSCHAIN_SWAPS_CONTRACT_ADDRESS=osmo1efakw4was99usxve258p58a5a26f0yt072gvyej5zr4lv5r0hxqqsddqgg

# IBC Info
NEXT_PUBLIC_IBC_SRC_PORT=transfer
NEXT_PUBLIC_IBC_SRC_CHANNEL=channel-140
NEXT_PUBLIC_IBC_DST_PORT=transfer
NEXT_PUBLIC_IBC_DST_CHANNEL=channel-3316

# Swapper configs
NEXT_PUBLIC_SWAP_FROM_DISPLAY=JUNOX
NEXT_PUBLIC_SWAP_TO_DISPLAY=OSMO

# Theme configs
NEXT_PUBLIC_THEME_PRIMARY_COLOR=#FFFFFF
NEXT_PUBLIC_THEME_SECONDARY_COLOR=#242424
NEXT_PUBLIC_THEME_BACKGROUND_COLOR=#121212
NEXT_PUBLIC_THEME_INTERMEDIATE_COLOR=#888888
NEXT_PUBLIC_THEME_ERROR_COLOR=#E94141
NEXT_PUBLIC_THEME_SUCCESS_COLOR=#0EAB60
NEXT_PUBLIC_THEME_TEXT_COLOR=#FFFFFF
NEXT_PUBLIC_THEME_BG_ELEMENTS_COLOR=#0A0A0A
NEXT_PUBLIC_THEME_TEXT_BUTTON_COLOR=#000000
NEXT_PUBLIC_THEME_BG_PRIMARY_GRADIENT_COLOR=#FFFFFF
NEXT_PUBLIC_THEME_BG_SECONDARY_GRADIENT_COLOR=#6B6B6B
NEXT_PUBLIC_THEME_LOGO=/images/nabla.svg

# Social configs
NEXT_PUBLIC_ANALYTICS_LINK=https://info.osmosis.zone/
NEXT_PUBLIC_DOCS_LINK=https://docs.osmosis.zone/
NEXT_PUBLIC_GITHUB_LINK=https://github.com/nabla-studio
NEXT_PUBLIC_EXTRA_LINK=https://nabla.studio
NEXT_PUBLIC_EXTRA_TITLE=Look at nabla
NEXT_PUBLIC_EXTRA_SUBTITLE=We enable companies to web3.

# Metrics and Stats
NEXT_PUBLIC_ANALYTICS_BASE_URL=https://api-osmosis.imperator.co/

# Wallet connect
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=
NEXT_PUBLIC_WALLET_CONNECT_RELAY_URL=wss://relay.walletconnect.org
NEXT_PUBLIC_WALLET_CONNECT_METADATA_NAME=Cosmos Swap
NEXT_PUBLIC_WALLET_CONNECT_METADATA_DESCRIPTION=Cosmos Swap Outpost
NEXT_PUBLIC_WALLET_CONNECT_METADATA_URL=https://cosmosswap.com/
NEXT_PUBLIC_WALLET_CONNECT_METADATA_ICON=https://example.com/favicon-96x96.png

# Metadata
NEXT_PUBLIC_METADATA_TITLE=nabla Outpost
NEXT_PUBLIC_METADATA_DESCRIPTION=The nabla outpost
NEXT_PUBLIC_METADATA_KEYWORDS=nabla, osmosis, web3
NEXT_PUBLIC_METADATA_OG_SITENAME=nabla Outpost
NEXT_PUBLIC_METADATA_OG_TITLE=nabla Outpost
NEXT_PUBLIC_METADATA_OG_DESCRIPTION=The nabla outpost
NEXT_PUBLIC_METADATA_OG_URL=https://outpost.nabla.studio
NEXT_PUBLIC_METADATA_OG_IMAGE=https://outpost.nabla.studio/twitter_image.png
NEXT_PUBLIC_METADATA_OG_IMAGE_WIDTH=1200
NEXT_PUBLIC_METADATA_OG_IMAGE_HEIGHT=600
NEXT_PUBLIC_METADATA_TWITTER_SITE=@nablaoutpost
NEXT_PUBLIC_METADATA_TWITTER_TITLE=nabla Outpost
NEXT_PUBLIC_METADATA_TWITTER_DESCRIPTION=The nabla outpost
NEXT_PUBLIC_METADATA_TWITTER_CREATOR=@nablaoutpost
NEXT_PUBLIC_METADATA_TWITTER_IMAGE=https://outpost.nabla.studio/twitter_image.png
NEXT_PUBLIC_METADATA_TWITTER_IMAGE_ALT=nabla Outpost
```