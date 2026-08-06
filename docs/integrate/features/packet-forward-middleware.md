---
description: Route a single IBC transfer through Osmosis to another chain using the forward memo.
sidebar_position: 19
---

# Packet Forward Middleware

Osmosis runs [Packet Forward Middleware](https://github.com/cosmos/ibc-apps/tree/main/middleware/packet-forward-middleware) (PFM, `packet-forward-middleware` v8.2.0 from `cosmos/ibc-apps`) on its IBC transfer stack. PFM lets a single IBC transfer hop through Osmosis and continue to another chain, driven entirely by the transfer's `memo` field. The sender signs one transaction on the origin chain; no intermediate account on Osmosis has to be trusted, funded, or operated, and if any hop fails the tokens are refunded to the original sender.

A concrete example: a user on the Cosmos Hub wants ATOM on Juno. Without PFM this takes two transactions on two chains: transfer Hub to Osmosis, then sign a second transfer Osmosis to Juno from an Osmosis account. With PFM, the user sends one transfer from the Hub to Osmosis with a `forward` memo, and Osmosis automatically sends the tokens onward to the Juno address in the same packet flow.

PFM only acts on the receive path. Transfers sent from Osmosis, and transfers received without a `forward` memo, pass through it untouched.

## The forward memo

PFM triggers when the memo of an incoming ICS-20 transfer is a JSON object with a `forward` key. To forward ATOM from the Cosmos Hub through Osmosis to Juno, the sender submits a normal `MsgTransfer` on the Hub over the Hub's channel to Osmosis (`channel-141`), with this memo:

```json
{
  "forward": {
    "receiver": "juno1finalreceiveraddress",
    "port": "transfer",
    "channel": "channel-42",
    "timeout": "10m",
    "retries": 2
  }
}
```

The fields inside `forward`:

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `receiver` | string | yes | The final receiver address on the next chain (here, a Juno address). |
| `port` | string | yes | The port for the onward transfer, normally `transfer`. |
| `channel` | string | yes | The channel **on Osmosis** toward the next chain (here, Osmosis's `channel-42` to Juno), not the channel the incoming transfer arrived on. See [IBC Channels](/integrate/channels) for channel IDs. |
| `timeout` | duration | no | Timeout for the onward transfer. Accepts a Go duration string (`"10m"`) or a number of nanoseconds. Defaults to 10 minutes. |
| `retries` | integer | no | How many times Osmosis re-sends the onward transfer if it times out. Defaults to 0 on Osmosis: a single timed-out attempt fails the forward. |
| `next` | object | no | Becomes the memo of the onward transfer, enabling multi-hop routes and hook execution on the destination (see below). |

`receiver`, `port`, and `channel` are validated on receipt; a `forward` object that fails validation produces an error acknowledgement and the origin chain refunds the sender.

### Multi-hop routes with `next`

The `next` object is attached verbatim as the memo of the transfer Osmosis sends onward, so the next chain in the path interprets it with its own middleware. If that chain also runs PFM, `next` can contain another `forward`, chaining a second hop:

```json
{
  "forward": {
    "receiver": "pfm",
    "port": "transfer",
    "channel": "channel-123",
    "timeout": "10m",
    "retries": 2,
    "next": {
      "forward": {
        "receiver": "chain-d-bech32-address",
        "port": "transfer",
        "channel": "channel-234",
        "timeout": "10m",
        "retries": 2
      }
    }
  }
}
```

Because `next` is just the onward memo, it is not limited to more forwards. If the destination chain runs [IBC hooks](/build/chain/ibc-hooks) (as Osmosis itself does), `next` can carry a `wasm` object instead, so the tokens trigger a contract call when they land on the final chain. The same composition works in the other direction: a chain forwarding **to** Osmosis can put a `wasm` memo in its `next` so that Osmosis executes a contract on arrival.

On any single hop, one middleware handles the memo: a `forward` key is consumed by PFM on the chain receiving that hop, and a `wasm` key by IBC hooks. Use `next` to address the following hop rather than combining both keys in one memo level.

## What happens on Osmosis during a forward

When a transfer with a `forward` memo arrives, PFM does not deliver the tokens to the `receiver` named in the packet. It replaces the receiver with a deterministic intermediate address derived by hashing the receiving channel and the original sender (the first 20 bytes of the hash, bech32-encoded with the `osmo` prefix). The tokens land in that account momentarily, and PFM immediately sends them onward as a standard ICS-20 transfer to the `forward.receiver` over `forward.channel`. The intermediate account is sender-and-channel specific, so funds from different senders never mix.

Two consequences for integrators:

- **Set the packet receiver to an invalid address, by convention the literal string `pfm`.** The packet's `receiver` field is never used when the forward succeeds, and if the memo is malformed (for example a typo in the `forward` key) an ordinary transfer to the stated receiver is what executes instead. An invalid receiver makes that failure mode safe: the receive errors, an error acknowledgement is written, and the origin chain refunds the sender, rather than the tokens landing in a live account on Osmosis.
- **Denoms remain path-dependent.** The onward hop is a normal ICS-20 transfer, so standard denom rules apply: forwarding a token further from its origin adds a hop to its IBC denom trace (ATOM forwarded Hub to Osmosis to Juno arrives on Juno as a two-hop denom, not as Juno's direct-from-Hub ATOM), while forwarding back along the path it came unwinds it. Plan routes so tokens arrive as the denom the destination actually uses.

The memo is cleared on the intermediate receive, so nothing in the original memo executes on Osmosis itself; only the contents of `next` travel onward.

## Failure and refund behavior

The acknowledgement for the original transfer is only written back to the origin chain after the whole forward path has resolved, successfully or not. The sender's funds are never left in limbo on an intermediate chain:

- **Success**: every hop delivers, a success acknowledgement propagates back, and the origin chain releases its escrow accounting as with any completed transfer.
- **Failed or timed-out forward**: if the onward transfer from Osmosis is rejected by the next chain or times out (after exhausting `retries`), PFM writes an error acknowledgement for the original packet. The origin chain then refunds the original sender in full, exactly as if a direct transfer had failed.

This is what makes the intermediate hop trustless from the sender's perspective: the outcome is binary, tokens at the final receiver or tokens back in the sender's account.

## Position in the Osmosis transfer stack

In the Osmosis app wiring (`app/keepers/keepers.go`), the transfer stack is composed, from outermost to innermost on the receive path:

1. [IBC hooks](/build/chain/ibc-hooks) (`wasm` memo handling and acknowledgement callbacks)
2. [IBC rate limit](/build/chain/ibc-rate-limit)
3. Packet Forward Middleware
4. ICS-20 transfer module

So an incoming packet is checked against rate-limit quotas before PFM sees it, and the onward hop PFM dispatches is an ordinary outbound transfer from Osmosis, which is rate-limited like any other. A forward through Osmosis therefore consumes both inflow and outflow quota for the token, and can fail on either side if a quota is exhausted; a rate-limited forward fails like any other failed forward, refunding the original sender.

## Related pages

- [IBC Channels](/integrate/channels) for the channel IDs to use in `forward.channel`.
- [Cross-chain Swaps](/integrate/crosschain-swaps) for swap-and-forward flows; routing services like Skip:Go compose PFM and IBC hooks memos for you, and are the recommended path when a swap on Osmosis is part of the route.
- [IBC Hooks module](/build/chain/ibc-hooks) for the `wasm` memo format and execution guarantees.
- [IBC Rate Limit module](/build/chain/ibc-rate-limit) for how quotas are defined and queried.
