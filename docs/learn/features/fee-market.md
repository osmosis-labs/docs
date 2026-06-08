---
description: A dynamic base fee that adjusts transaction costs with network congestion.
sidebar_position: 3
---

# Fee Market

Osmosis uses an EIP-1559 style fee market: instead of a fixed minimum transaction fee, the network sets a **base fee** that rises when blocks are full and falls when they are empty. This keeps fees low in normal conditions while pricing out spam when the network is congested.

## Why it matters

A fixed minimum fee has to be set high enough to deter spam at peak load, which means users overpay the rest of the time. A dynamic base fee solves this: it tracks how full recent blocks have been and adjusts automatically. When demand for block space is high the base fee increases, so only transactions willing to pay get in; when demand falls the base fee drops back down, so ordinary transactions stay cheap.

A transaction whose gas price is below the current base fee is rejected, so wallets and apps read the current base fee at submission time and price slightly above it. Because the fee floats, you do not hardcode a gas price.

## What you need to know

- The base fee moves block by block within a fixed minimum and maximum, so it cannot spike without bound or fall to zero.
- You can pay it in tokens other than OSMO thanks to [fee abstraction](/learn/features/fee-abstraction).
- If you are building an integration and need to query the base fee and set gas prices, see [Fees and Gas](/integrate) under Integrate.
- For the exact adjustment formula and the current parameters (target block gas, change rate, and the min/max base fee), see the [Txfees module page](/build/chain/txfees) under Build.
