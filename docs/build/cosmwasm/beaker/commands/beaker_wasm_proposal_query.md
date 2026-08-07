# `beaker wasm proposal query`

:::danger These commands no longer work on Osmosis
The `beaker wasm proposal` subcommands rely on legacy (gov v1beta1) wasm proposals, which current Osmosis networks no longer route, so there are no such proposals to query. To store contract code through governance, use the flow in [Submit a CosmWasm Governance Proposal](/build/cosmwasm/submit-wasm-proposal) instead.
:::

## Subcommands

---

### `beaker wasm proposal query store-code`

Proposal for storing .wasm on chain for later initialization

Arguments:

* `<CONTRACT_NAME>` Name of the contract to store

* `-n / --network <NETWORK>` (default: `local`)
