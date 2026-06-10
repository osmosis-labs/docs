---
description: Trigger a smart contract call from an IBC transfer, enabling cross-chain swaps.
sidebar_position: 5
---

# IBC Hooks

IBC Hooks let an IBC token transfer also trigger a smart contract call on Osmosis, in the same step. Normally an IBC transfer just moves tokens from one chain to another. With IBC hooks, the transfer can carry an instruction that runs a CosmWasm contract the moment the tokens arrive.

## Why it matters

This turns a cross-chain transfer into a cross-chain action. The clearest example is a **cross-chain swap**: from another chain, you can send tokens to Osmosis and, in the same packet, instruct Osmosis to swap them and forward the result, without the user needing an Osmosis account or a separate transaction. The same primitive powers many cross-chain interactions where moving tokens and doing something with them should happen atomically.

Because the contract call is attached to the transfer itself, it either all succeeds or the transfer is undone, so funds are not left stranded mid-flight.

For the module specification (the packet memo format, execution flow, and acknowledgement callbacks), see the [IBC Hooks module page](/build/chain/ibc-hooks) under Build.
