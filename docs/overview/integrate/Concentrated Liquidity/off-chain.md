# Off chain Integration

## Intro
Concentrated liquidity is a novel Automated Market Maker (AMM) design introduced by Uniswap that allows for more efficient use of capital. The improvement is achieved by providing liquidity in specific price ranges chosen by the user.

For instance, a pool with stablecoin pairs like USDC/USDT has a spot price that should always be trading near 1. As a result, Liquidity Providers (LPs) can focus their capital in a small range around 1, rather than the full range from 0 to infinity. This approach leads to an average of 200-300x higher capital efficiency. Moreover, traders benefit from lower price impact because the pool incentivizes greater depth around the current price.

Concentrated liquidity also opens up new opportunities for providing liquidity rewards to desired strategies. For example, it’s possible to incentivize LPs based on their position’s proximity to the current price and the time spent within that position. This design also allows for a new “range order” type, similar to a limit order with order-books.

The following information is meant to provide Vaul Creators with all the information needed to interact and develop concentrated liquidity vaults.

# Clients
The following clients are available to interact with the Concentrated liquidity modules in Osmosis.
 - [JS Client - (OsmoJS)](#js-client---osmojs)
 - [Osmosis-rust Client (Cosmwasm)](#osmosis-rust-client-cosmwasm)
 - [Hummingbot client](#hummingbot-client)
   
