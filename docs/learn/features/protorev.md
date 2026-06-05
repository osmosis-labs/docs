---
description: In-protocol MEV capture that returns arbitrage value to the ecosystem.
sidebar_position: 8
---

# ProtoRev

ProtoRev is Osmosis's in-protocol MEV capture. On most blockchains, the profit from arbitrage (closing price gaps between pools) is taken by outside searchers and bots. ProtoRev captures that value for the protocol instead, and returns it to the Osmosis ecosystem.

## What it does

When a swap moves a pool's price out of line with the rest of the market, it creates a cyclic arbitrage opportunity: a path of trades that starts and ends in the same asset at a profit. ProtoRev detects these opportunities created by user trades and executes the optimal arbitrage in the same transaction, atomically. The captured profit is then distributed back to the ecosystem (burned as OSMO, or sent to the community pool for non-OSMO proceeds), as directed by governance.

Because the arbitrage runs inside the protocol rather than being auctioned to external searchers, the value stays with Osmosis and its stakers rather than leaking out as MEV. It also helps keep prices consistent across Osmosis liquidity sources.

For the module specification (the routing logic, state, messages, queries, and governance parameters), see the [ProtoRev module page](/build/chain/protorev) under Build. ProtoRev's role in OSMO tokenomics is covered on [The OSMO Token](/learn/osmo#protorev).
