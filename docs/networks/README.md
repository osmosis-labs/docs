# Osmosis Network
Recommended API Endpoints and Frontend URLs for Osmosis Network, Chain Registry, and Other Providers.

## Official public endpoints
These following API's are recommended for development purposes. For maximun control and reliability it's recommended to run your own node. This can be easility accomplsihed by using the get.osmosis.zone installer. 


|        | Mainnet                                     | Testnet                               |
|---------------|---------------------------------------------|--------------------------------------------|
| Chain ID      | osmosis-1                                   | osmo-test-5                                |
| Endpoints     | gRPC endpoint: `grpc.osmosis.zone:9090`<br/> gRPC-gateway: `https://rpc.osmosis.zone:443` <br/> LCD endpoint: `https://lcd.osmosis.zone` | gRPC endpoint: `grpc.osmotest5.osmosis.zone` <br/> gRPC-gateway: `https://rpc.osmotest5.osmosis.zone`<br/> LCD endpoint: `https://lcd.osmotest5.osmosis.zone/` |
| Explorer      | https://lcd.osmosis.zone                   | https://explorer.osmotest5.osmosis.zone/   |
| Utilities  | ...                                         | [https://explorer.osmotest5.osmosis.zone/](https://osmotest5.osmosis.zone/) |
| API Reference | [RPC API Reference](/api)<br/> [LCD API Reference](/api/?v=LCD) | [RPC API Reference](/api)<br/> [LCD API Reference](/api/?v=LCD) |
| Swagger       | [LCD Swagger](https://lcd.osmosis.zone/swagger/)<br/> [RPC Swagger](https://rpc-docs.osmosis.zone/) | [LCD Swagger](https://lcd.osmotest5.osmosis.zone/swagger/)<br/> [RPC Swagger](https://rpc-docs.osmosis.zone/) |
| Faucet        | Not Available                                   | [faucet.osmosis.zone](https://faucet.osmosis.zone/) |


## Networks
Osmosis now offers several testnets and devnets, to learn more go to the https://github.com/osmosis-labs/testnets repo.

## Frontend URLs
The Osmosis front-end can be accessed by anyone, and there are several places where it can be found. Additionally, you can run the Osmosis front-end on your own computer by following the instructions provided [ here](https://docs.osmosis.zone/frontend/osmosis-frontend)

| Network | URL | Network ID | Explorer | Contract Explorer | 
| -------- | -------- | -------- | -------- | -------- | 
| Mainnet | [app.osmosis.zone](https://app.osmosis.zone/) | osmosis-1  | [Mintscan](https://www.mintscan.io/osmosis), [Big Dipper](https://bigdipper.live/osmosis), [Ping.pub](https://ping.pub/osmosis) | [Celatone](https://celatone.osmosis.zone/), [Mintscan](https://www.mintscan.io/osmosis/wasm) |
| Mainnet | [akash.osmosis.zone](https://app.osmosis.zone/) | osmosis-1  | "" | ""
| Mainnet | [flux.osmosis.zone](https://app.osmosis.zone/) | osmosis-1  | "" | ""
| New Testnet | [testnet.osmosis.zone](https://testnet.osmosis.zone/) | osmo-test-5  | [Mintscan](https://testnet.mintscan.io/osmosis-testnet), [Ping.pub](https://explorer.osmotest5.osmosis.zone/)| [Celatone](https://celatone.osmosis.zone/testnet), [Mintscan](https://testnet.mintscan.io/osmosis-testnet/contract) |
| Legacy Testnet | [testnet.osmosis.zone](https://testnet.osmosis.zone/) | osmo-test-4  | [Ping.pub](https://explorer.osmotest5.osmosis.zone/) | None |


### API Docs

Please visit the [API reference](/api) to interact with these endpoints. 


## Chain Registry

This repo contains a chain.json and assetlist.json for a number of cosmos-sdk based chains. A chain.json contains data that makes it easy to start running or interacting with a node. 
- [Chain Registry](https://github.com/cosmos/chain-registry) : `https://github.com/cosmos/chain-registry`

:::tip
Did you know there is also an NPM package that fetch chain-registry data? <br/>
**Learn more** : [https://www.npmjs.com/package/chain-registry](https://www.npmjs.com/package/chain-registry) 
:::


## Infrastructure Providers

- [All That Node](https://www.allthatnode.com/osmosis.dsrv) : `https://www.allthatnode.com/osmosis.dsrv`
  - Features
    - Unlimited access to archive data
    - Faucet available
    - Automated updates
    - Technical support

- [DataHub](https://datahub.figment.io) : `https://datahub.figment.io`

- [OnFinality](https://onfinality.io/) is a blockchain infrastructure platform that saves Web3 builders time and makes their lives easier. OnFinality delivers scalable API endpoints for the biggest blockchain networks and empowers developers to automatically test, deploy, scale and monitor their own blockchain nodes in minutes. OnFinality offers free and premium (Pay-as-you-go or subsription-based) API [services for Osmosis](https://onfinality.io/networks/osmosis). Public RPC Endpoint for Osmosis: `https://osmosis.api.onfinality.io/public`

