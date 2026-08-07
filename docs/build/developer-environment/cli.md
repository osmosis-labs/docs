---
description: Query and submit transactions with the osmosisd CLI.
title: Interact with the CLI
sidebar_position: 4
---

# Interact with the CLI

## Using the CLI

Once osmosisd is [installed](./osmosisd) and configured with the correct network, you can now send commands with it. In a new terminal window, start by running the following query command:

### Node status
```bash
osmosisd status
```

<details>
<summary>Output</summary>

#### This is the output from `osmosisd status`

```json
{
  "node_info": {
    "protocol_version": {
      "p2p": "8",
      "block": "11",
      "app": "0"
    },
    "id": "6f6f68362b6fcb3a4a968f667df7dbbd7523072d",
    "listen_addr": "tcp://0.0.0.0:26656",
    "network": "osmosis-1",
    "version": "0.38.22",
    "channels": "40202122233038606100",
    "moniker": "osmosis",
    "other": {
      "tx_index": "on",
      "rpc_address": "tcp://0.0.0.0:26657"
    }
  },
  "sync_info": {
    "latest_block_hash": "5DC6FBEF446B685FEF456581B91A2A14C7B86FE2247839E920CCBDFF09788D61",
    "latest_app_hash": "885E25FC2F464C5BBAAB20ABC7278B3E898A54B6801841D199F650502F781C02",
    "latest_block_height": "67949994",
    "latest_block_time": "2026-08-06T13:14:31.550833105Z",
    "earliest_block_hash": "27B370EF5765769CAF697E3874014C8D57AD08F179E38A5F3619A82A01DF2AEC",
    "earliest_app_hash": "C33F4FA2B66F87AF4F98BAED8E2DEA3E8FE47E67C4926A100A358EAB71AD975B",
    "earliest_block_height": "66171492",
    "earliest_block_time": "2026-07-12T19:59:48.446672466Z",
    "catching_up": false
  },
  "validator_info": {
    "address": "3BD8DD32674B0CC6552E22BEDC30FB7609A5ED4A",
    "pub_key": {
      "type": "tendermint/PubKeyEd25519",
      "value": "2B7ZI70OV4BIz5i6W0dfTNOzcim/xo+K4t3eGXeia+o="
    },
    "voting_power": "0"
  }
}
```

</details>

### Node configuration

The client-side settings (chain id, RPC node, keyring backend) live in the `client.toml` file, which is managed with the `osmosisd config` subcommands. To view the full client configuration:

```bash
osmosisd config view client
```
Output:
```toml
# This is a TOML config file.
# For more information, see https://github.com/toml-lang/toml

###############################################################################
###                           Client Configuration                          ###
###############################################################################

# The network chain ID
chain-id = "osmosis-1"
# The keyring's backend, where the keys are stored (os|file|kwallet|pass|test|memory)
keyring-backend = "os"
# CLI output format (text|json)
output = "text"
# <host>:<port> to CometBFT RPC interface for this chain
node = "tcp://localhost:26657"
# Transaction broadcasting mode (sync|async)
broadcast-mode = "sync"
```

To read a single value, such as the RPC node the CLI sends queries and transactions to:

```bash
osmosisd config get client node
```

### Change node

```bash
osmosisd config set client node https://rpc.osmosis.zone:443
```

### Connect to the testnet

```bash
osmosisd config set client node https://rpc.testnet.osmosis.zone:443
osmosisd config set client chain-id osmo-test-5
```

To add a  new account on your local keyring
```bash
osmosisd keys add testaccount --keyring-backend test

# Put the generated address in a variable for later use.
MYACCOUNT=$(osmosisd keys show testaccount -a --keyring-backend test)
```

The command above creates a local key-pair that is not yet registered on the chain. An account is created the first time it receives tokens from another account.
 You can now send some tokens to this new account. If you are connected to the testnet, you can get tokens from [https://faucet.osmosis.zone](https://faucet.osmosis.zone)

```bash
# Check that the testaccount account did receive the tokens.
osmosisd query bank balances $MYACCOUNT
```
![](@site/docs/assets/asset_list.png)

For more information about querying osmosisd via the CLI visit the [Cosmos SDK documentation](https://docs.cosmos.network/).


