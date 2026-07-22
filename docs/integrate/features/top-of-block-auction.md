---
description: Build, encode, and submit a bid to the Osmosis top-of-block MEV auction.
sidebar_position: 18
---

# Top-of-Block Auction

Osmosis runs a top-of-block (ToB) auction through the [Skip block-sdk](https://github.com/osmosis-labs/block-sdk) MEV lane. A searcher submits a `MsgAuctionBid` that wraps a bid amount and a bundle of up to five signed transactions. The single highest valid bid each block is executed atomically at the very top of the block, ahead of all normal transactions. This page covers how to build, encode, and submit a bid.

For the in-protocol MEV mechanism that captures arbitrage value for the protocol, see [ProtoRev](/learn/features/protorev) in the Learn section.

## How the auction works

- You submit one `MsgAuctionBid` containing a bid amount and a bundle of signed transactions.
- During `PrepareProposal`, the MEV lane scans bids from highest to lowest, validates each in turn, and selects the first fully valid bid. Only one bid wins per block.
- The winning bid transaction and its bundle are included atomically at the top of the block, so the bundle executes before any other transaction in that block.
- Losing bids are not charged (see [Costs and validation](#costs-and-validation)).

## The `MsgAuctionBid` message

A bid is a `MsgAuctionBid` with three fields:

| Field | Type | Description |
| -- | -- | -- |
| `bidder` | string | The bidding account address. |
| `bid` | `Coin` | The bid amount and denom (Noble USDC, see below). |
| `transactions` | repeated bytes | The bundle: raw transaction bytes, in execution order. |

The bid denom is Noble USDC, `ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4` (base denom `uusdc`, 6 decimals, so `100000` = 0.1 USDC).

A bundle holds one to five transactions. Each transaction must be:

- a fully formed, signed Osmosis transaction,
- independently valid and executable,
- sequence-numbered as if executed in order (if the bidder signs `[tx1, tx2, tx3]` starting at sequence `N`, they must be `N`, `N+1`, `N+2`),
- compliant with the front-running rules below.

## Front-running protection

Front-running protection is currently enabled (a governance-toggleable parameter). It constrains the signer order of the bundle to prevent sandwich and front-running attacks. Any transactions not signed by the bidder must form a single contiguous run at the front of the bundle. Once a bidder-signed transaction appears, every following transaction must be signed by the bidder.

Valid bundles:

- All transactions signed by the bidder, for example `[bidder_tx1, bidder_tx2, bidder_tx3]`.
- A contiguous prefix signed by the same non-bidder, then the rest signed by the bidder, for example `[other_tx1, other_tx2, bidder_tx1, bidder_tx2]`.

Rejected bundles:

- Bidder transactions on both sides of a non-bidder transaction, for example `[bidder_tx1, other_tx2, bidder_tx3]` (the classic sandwich).
- A bidder transaction followed by non-bidder transactions, for example `[bidder_tx1, other_tx2, other_tx3]` (front-running).

## Timeout height

The bid and every bidder-signed transaction in the bundle must set `timeout_height` to the next block height. A bid is valid for exactly one block. Non-bidder prefix transactions are not required to match the bid's timeout.

## Encoding the bundle

`osmosisd tx encode signed.json` outputs base64 of a transaction's raw protobuf bytes. How you pass that to the auction depends on the submission path.

### Programmatic submission

When you construct `MsgAuctionBid` directly (CosmJS, Go, Python, a bot framework), the `transactions` field is raw bytes. Decode the base64 to bytes and set them directly. Do not hex-encode.

```ts
// transactions: Uint8Array[]
const bundle = innerTxBase64.map((tx) =>
  Uint8Array.from(Buffer.from(tx, "base64"))
);
```

### CLI submission (manual)

Because blocks are fast, manual CLI submission is only suitable for testing rather than production bidding.

The `auction-bid` command takes the bundle as a single comma-separated argument of hex strings, and hex-decodes each into raw bytes. Convert each base64 string to hex first:

```bash
# 1. Encode each signed tx to base64
osmosisd tx encode signed-tx1.json > tx1.b64

# 2. Convert base64 -> hex
python - <<'PY'
import base64, binascii
b64 = open("tx1.b64").read().strip()
print(binascii.hexlify(base64.b64decode(b64)).decode())
PY
```

Then submit. The transactions are one comma-separated argument, not separate arguments:

```bash
osmosisd tx auction auction-bid [BIDDER_ADDRESS] \
  100000ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4 \
  <hexTx1>,<hexTx2>,<hexTx3> \
  --from [BIDDER_KEY] \
  --gas=auto \
  --gas-prices=0.03uosmo \
  --gas-adjustment=1.3 \
  --timeout-height [NEXT_BLOCK_HEIGHT] \
  -y
```

## Costs and validation

Your bid must satisfy the following. All values are governance-mutable, so verify the current values at the params endpoint below.

- Bundle size at most `max_bundle_size` (currently `5`), and at least one transaction.
- Bid at least the `reserve_fee` (currently `100000` `uusdc`, 0.1 USDC).
- Bid exceeding the current highest bid by at least `min_bid_increment` (currently `100000` `uusdc`, 0.1 USDC).
- Timeout height set to the next block, matched across the bid and the bidder's bundled transactions.
- The bid plus the full bundle fit within the MEV lane's per-block size and gas limits.
- All bundled transactions valid, and the front-running rules satisfied.

The chain checks that the bidder holds sufficient funds during validation, but the bid is only deducted from the winning bid selected at block proposal. Losing bids are not charged. The winning bid is split between the proposer (per `proposer_fee`, currently `0`) and an escrow account. With `proposer_fee = 0` the entire bid goes to the escrow account, `osmo1jayxmrajq8nzw2knatgsjdkdhnkw8flkgqs84pvphs3ut2hts5xq9hacch`.

Verify the current parameters live:

```bash
curl https://lcd.osmosis.zone/block-sdk/auction/v1/params
```

## What happens to losing bids

- Invalid bids (malformed, underfunded, or with a bad bundle) are removed from the mempool during proposal.
- Valid but non-winning bids are not actively removed, but expire at the next block because their `timeout_height` is the next height.

Either way, no bid persists beyond one block.
