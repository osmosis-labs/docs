# Public endpoints

Osmosis supports the following  RPC protocols:

- URI over HTTP
- JSON-RPC 2.0 over HTTP
- JSON-RPC 2.0 over websockets (might be deprecated in the future).

Anyone can setup a node exposing endpoints to communicate with the Osmosis blockchain, for convenience there are also some public endpoints available for querying the chain. These are recommended for development and testing purposes. For maximun control and reliability it's recommended to run your own node. This can be easility accomplsihed by using the get.osmosis.zone installer. 

## Official endpoints 

|  | Mainnet | Testnet | 
| -------- | -------- | -------- | 
| **Network** | Mainnet | Testnet|
| **Chain ID**  | osmosis-1 | osmo-test-4  |
| **GRPC endpoint**  | grpc.osmosis.zone | grpc-test.osmosis.zone |
| **RPC endpoint**  | rpc.osmosis.zone  | rpc-test.osmosis.zone |
| **RPC Docs**  |  [Swagger](https://rpc-docs.osmosis.zone/) | [Swagger](https://rpc-docs.osmosis.zone/) |
| **LCD endpoint**  | lcd.osmosis.zone | lcd-test.osmosis.zone  |
| **LCD Docs**  |  [Swagger](https://lcd.osmosis.zone/swagger/) |  [ Swagger](https://lcd-test.osmosis.zone/swagger/) |
| **Faucet** | I wish 🤑 | [faucet.osmosis.zone](https://faucet.osmosis.zone/) |


### RPC URI over HTTP Example

```sh
curl https://rpc.osmosis.zone/abci_info?
```
or simply open [this url](https://rpc.osmosis.zone/abci_info?) on your browswer 

### JSON-RPC 2.0 over HTTP Example

```sh
curl --header "Content-Type: application/json" --request POST --data '{"method": "block", "params": ["4261881"], "id": 1}' https://rpc.osmosis.zone:443
```

### LCD URI over HTTP example
```
curl -X GET "https://lcd.osmosis.zone/osmosis/gamm/v1beta1/pools" -H "accept: application/json"
```
or simply open [this url](https://lcd.osmosis.zone/osmosis/gamm/v1beta1/pools) on your browswer. 

## Chain Registry

This repo contains a chain.json and assetlist.json for a number of cosmos-sdk based chains. A chain.json contains data that makes it easy to start running or interacting with a node. 
- [https://github.com/cosmos/chain-registry](https://github.com/cosmos/chain-registry)

::: tip
Did you know there is also an NPM package that fetch chain-registry data?
**Learn more** : [https://www.npmjs.com/package/chain-registry](https://www.npmjs.com/package/chain-registry) 
:::


## Other providers

- [DataHub](https://datahub.figment.io) : `https://datahub.figment.io`
