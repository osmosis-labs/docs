---
description: An onchain auction for the first transaction slots in each block.
sidebar_position: 12
---

# Top-of-Block Auction

The first transactions in a block are valuable: whoever executes first can capture arbitrage and other time-sensitive opportunities before anyone else. On most chains that priority is won through private deals or spam. Osmosis instead sells it openly, through an onchain top-of-block auction run by the [block-sdk](https://github.com/osmosis-labs/block-sdk) auction lane.

## How it works

Each block, searchers can submit a `MsgAuctionBid`: a bid amount wrapped around a bundle of up to five signed transactions. The single highest valid bid wins, and its bundle is executed atomically at the very top of the block, ahead of all normal transactions. Losing bids are not charged, and no bid persists beyond one block.

Bids are denominated in USDC, with a governance-set minimum bid and minimum increment. Front-running protection is enabled: the rules on who signs which transactions in a bundle prevent a bidder from sandwiching or front-running someone else's transaction within their bundle.

## Where the money goes

The winning bid is split between the block's proposer and a protocol escrow account, in a governance-set proportion. The proposer's share is currently zero, so the entire winning bid goes to the escrow account.

The auction complements [ProtoRev](/learn/features/protorev), which captures cyclic arbitrage inside the protocol itself: ProtoRev takes the arbitrage it can execute directly, and the auction prices the remaining top-of-block priority instead of giving it away. For building and submitting a bid, see the [integrator guide](/integrate/features/top-of-block-auction).
