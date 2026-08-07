# `beaker wasm proposal`

:::danger These commands no longer work on Osmosis
The `beaker wasm proposal` subcommands submit legacy (gov v1beta1) wasm proposals. Current Osmosis networks no longer route these legacy proposal messages, so proposals submitted this way are rejected and cannot succeed. To store contract code through governance, use the flow in [Submit a CosmWasm Governance Proposal](/build/cosmwasm/submit-wasm-proposal) instead.
:::

## Subcommands

---

### `beaker wasm proposal store-code`

Proposal for storing .wasm on chain for later initialization

Arguments:

* `<CONTRACT_NAME>` Name of the contract to store

* `--permit-instantiate-only <PERMIT_INSTANTIATE_ONLY>`: Restricting the code to be able to instantiate/migrate only by given address, no restriction by default

* `-p / --proposal <PROPOSAL>`: Path to proposal file, could be either yaml / toml format

* `--title <TITLE>`: Proposal title (default: ``)

* `--description <DESCRIPTION>`: Proposal description (default: ``)

* `--deposit <DEPOSIT>`: Proposal deposit to activate voting

* `--unpin-code <UNPIN_CODE>`: Unpin code on upload (default: `false`)

* `-n / --network <NETWORK>`: Name of the network to broadcast transaction to, the actual endpoint / chain-id are defined in config (default: `local`)

* `--gas <GAS>`: Coin (amount and denom) you are willing to pay as gas eg. `1000uosmo`

* `--gas-limit <GAS_LIMIT>`: Limit to how much gas amount allowed to be consumed

* `--signer-account <SIGNER_ACCOUNT>`: Specifies predefined account as a tx signer

* `--signer-keyring <SIGNER_KEYRING>`: Use the OS secure store as backend to securely store your key. To manage them, you can find more information [here](./beaker_key.md)

* `--signer-mnemonic <SIGNER_MNEMONIC>`: Specifies mnemonic as a tx signer

* `--signer-private-key <SIGNER_PRIVATE_KEY>`: Specifies private_key as a tx signer (base64 encoded string)

* `-t / --timeout-height <TIMEOUT_HEIGHT>`: Specifies a block timeout height to prevent the tx from being committed past a certain height (default: `0`)

* `-a / --account-sequence <ACCOUNT_SEQUENCE>`: Account sequence number to use for the transaction, if not provided, sequence will be fetched from the chain. This is useful if there is an account sequence mismatch

---

### `beaker wasm proposal vote`

Vote for proposal

Arguments:

* `<CONTRACT_NAME>` Name of the contract to store

* `-o / --option <OPTION>`: Vote option, one of: yes, no, no_with_veto, abstain

* `-n / --network <NETWORK>`: Name of the network to broadcast transaction to, the actual endpoint / chain-id are defined in config (default: `local`)

* `--gas <GAS>`: Coin (amount and denom) you are willing to pay as gas eg. `1000uosmo`

* `--gas-limit <GAS_LIMIT>`: Limit to how much gas amount allowed to be consumed

* `--signer-account <SIGNER_ACCOUNT>`: Specifies predefined account as a tx signer

* `--signer-keyring <SIGNER_KEYRING>`: Use the OS secure store as backend to securely store your key. To manage them, you can find more information [here](./beaker_key.md)

* `--signer-mnemonic <SIGNER_MNEMONIC>`: Specifies mnemonic as a tx signer

* `--signer-private-key <SIGNER_PRIVATE_KEY>`: Specifies private_key as a tx signer (base64 encoded string)

* `-t / --timeout-height <TIMEOUT_HEIGHT>`: Specifies a block timeout height to prevent the tx from being committed past a certain height (default: `0`)

* `-a / --account-sequence <ACCOUNT_SEQUENCE>`: Account sequence number to use for the transaction, if not provided, sequence will be fetched from the chain. This is useful if there is an account sequence mismatch

---

### `beaker wasm proposal query`

[\> `beaker wasm proposal query`'s subcommands](./beaker_wasm_proposal_query.md)
