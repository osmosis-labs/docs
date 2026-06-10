---
title: Cross-chain Swaps
description: Swap into or out of an asset on another chain in one flow.
sidebar_position: 4
---

# Cross-chain Swaps

A cross-chain swap moves an asset from another chain, trades it on Osmosis, and (optionally) sends the result onward, ideally as a single user action rather than a manual bridge-then-swap. There are two ways to do this: a routing service that orchestrates it for you, and the underlying onchain primitive.

## Recommended: Skip:Go

For most integrations, use **[Skip:Go](https://docs.skip.build/go)**. It is a routing API and SDK that plans and executes cross-chain transfers and swaps across IBC and other bridges, handling path-finding, the transfers, and the swap on Osmosis. It is the same routing layer the Osmosis frontend uses for cross-chain transfers, so building on it matches the production app's behavior.

Use Skip:Go when you want to:

- Let a user swap an asset they hold on another chain into an Osmosis asset (or vice versa) without a separate manual bridge step.
- Get a quote and route for a cross-chain trade and broadcast it from your app.

See the [Skip:Go documentation](https://docs.skip.build/go) for the API, SDK, and supported routes.

## The underlying primitive: IBC hooks

Cross-chain swaps are possible because of **IBC hooks**: an incoming IBC transfer can carry a `memo` that triggers a contract call on Osmosis when the tokens arrive, so the transfer and the swap happen atomically. This is the protocol-level mechanism that a routing service like Skip builds on top of.

If you need the low-level approach (constructing the `memo` and the contract call yourself rather than going through a routing service), see:

- [IBC Hooks](/learn/features/ibc-hooks) for the concept and the `memo` format.
- [IBC Hooks module](/build/chain/ibc-hooks) under Build for the packet flow and execution guarantees.

For a same-chain swap (no cross-chain leg), see [Swap Integration](/integrate/swap). For how assets arrive over IBC in the first place, see [IBC Channels](/integrate/channels).
