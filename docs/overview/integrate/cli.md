---
sidebar_position: 9
---

# Interact with CLI

## Using the CLI

Once osmosisd is [installed](../osmosis-core/osmosisd) and configured with the correct network, you can now send commands with it. In a new terminal window, start by running the following query command:

### Node status
```bash
osmosisd status
```

<details><summary>Output</summary>
<p>

#### This is the output from `osmosisd status`

```json
{
  "NodeInfo": {
    "protocol_version": {
      "p2p": "8",
      "block": "11",
      "app": "12"
    },
    "id": "4017c243549b8bb4ad2b4cfe5d685aea450dcbcd",
    "listen_addr": "209.34.206.35:26656",
    "network": "osmosis-1",
    "version": "0.34.21",
    "channels": "40202122233038606100",
    "moniker": "artifact-rpc",
    "other": {
      "tx_index": "on",
      "rpc_address": "tcp://0.0.0.0:26657"
    }
  },
  "SyncInfo": {
    "latest_block_hash": "FBA710794C5A9C61523D7CCE78F2F51C7CD7A6C33A154C078E423859D7243E30",
    "latest_app_hash": "EC15E54C7BF66EDC9FEF561969B756CAA58933598FCBF72FE7727DE78F0D8DCF",
    "latest_block_height": "6335644",
    "latest_block_time": "2022-10-07T08:45:15.929540892Z",
    "earliest_block_hash": "38EAF21C7C4A786D73FFAADA32FD3D4B2B683AF2050B41CF5E5924D20AF4EEBC",
    "earliest_app_hash": "808B1D7123C385D52E6A5BC544FD763D156526751DEB401DADB18C717D567DC0",
    "earliest_block_height": "6287475",
    "earliest_block_time": "2022-10-03T22:54:17.633996278Z",
    "catching_up": false
  },
  "ValidatorInfo": {
    "Address": "369E2DCC99CD68400753812BBDF54CD5380FBAC7",
    "PubKey": {
      "type": "tendermint/PubKeyEd25519",
      "value": "mhb68/B38wFLH/5pDgvPKNbKyKdwduIKxJySz0GV/uI="
    },
    "VotingPower": "0"
  }
}
```

</p>
</details>

### Node configuration
```bash
osmosisd config
```
Output:
```json
{
	"chain-id": "osmosis-1",
	"keyring-backend": "os",
	"output": "text",
	"node": "http://osmosis.artifact-staking.io:26657",
	"broadcast-mode": "sync",
	"grpc-concurrency": false
}
```
In this example when we install osmosisd as a client with the [installer](../osmosis-core/osmosisd), it connects to the `http://osmosis.artifact-staking.io:26657`.

### Change node

```
osmosis config node https://rpc.osmosis.zone:443
```

### Connect to the testnet

```bash
osmosisd config node https://rpc.testnet.osmosis.zone:443
osmosisd config chain-id osmo-test-5
```

To add a  new account on your local keyring
```bash
osmosisd keys add testaccount --keyring-backend test

# Put the generated address in a variable for later use.
MYACCOUNT=$(osmosisd keys show testaccount -a --keyring-backend test)
```

The command above creates a local key-pair that is not yet registered on the chain. An account is created the first time it receives tokens from another account.
 You can now send some tokens to this enw account. If you are connected to the testnet, you can get tokens from [https://faucet.osmosis.zone](https://faucet.osmosis.zone)

```bash
# Check that the testaccount account did receive the tokens.
osmosisd query bank balances $MYACCOUNT
```
![](../../assets/asset_list.png)

For more information about querying osmosisd via the CLI visit the [Cosmos documentation](https://hub.cosmos.network/main/hub-tutorials/gaiad.html).


