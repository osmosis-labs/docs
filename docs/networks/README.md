# Public endpoints

These following API's are recommended for development purposes. For maximun control and reliability it's recommended to run your own node. This can be easility accomplsihed by using the get.osmosis.zone installer. 

### Important Notice

> **During April**, `osmo-test-4` will remain the official testnet while `osmo-test-5` will be in public beta.
>
> **During May**, `osmo-test-4` will be deprecated (but not removed) and the official testnet will become `osmo-test-5`.
>
> **On June 1st**, `osmo-test-4` will be deleted.
>
> For now, the official testnet is `osmo-test-4`. Unless bugs are discovered, in May we will promote `osmo-test-5` as the official testnet.
>
> `osmo-test-5` is not a fork of mainnet, it has started with no state. The rationale is to treat it like a separate production environment, with its own relayers and pools. Forking mainnet creates a lot of unusable chain state (with pools and IBC channels that are now unusable) and makes configuring the frontend complicated.
>
> We will also release a devnet publicly, which will be a fork of mainnet.


## Official public endpoints 

| Network | Mainnet | Current Testnet | New Testnet (Coming soon) | 
| -------- | -------- | -------- | -------- | 
| **Chain ID**  | osmosis-1 | osmo-test-5 | osmo-test-4
| **gRPC endpoint**  | grpc.osmosis.zone:9090 | grpc.osmotest5.osmosis.zone | grpc-test.osmosis.zone:443 
| **gRPC-gateway**  | https://rpc.osmosis.zone:443  | https://rpc.osmotest5.osmosis.zone/ | https://rpc.testnet.osmosis.zone:443 
| **LCD endpoint**  | https://lcd.osmosis.zone | https://lcd.osmotest5.osmosis.zone/ | https://lcd-test.osmosis.zone  
| **Explorer**  | https://lcd.osmosis.zone | https://explorer.osmotest5.osmosis.zone/ | https://lcd-test.osmosis.zone  
| **Landing Page**  | ... | [https://explorer.osmotest5.osmosis.zone/](https://osmotest5.osmosis.zone/) | ... 
| **RPC API Reference**  |  [API Reference](/api) | [API Reference](/api) | ... 
| **LCD API Reference**  |  [API Reference](/api/?v=LCD) | [API Reference](/api/?v=LCD) | ... 
| **LCD Swagger**  |  [Swagger](https://lcd.osmosis.zone/swagger/) |  ... | [Swagger](https://lcd-test.osmosis.zone/swagger/)  
| **RPC Swagger**  |  [Swagger](https://rpc-docs.osmosis.zone/) | ... | [Swagger](https://rpc-docs.osmosis.zone/)  
| **Faucet** | I wish 🤑 | [faucet.osmotest5.osmosis.zone/](https://faucet.osmotest5.osmosis.zone/) | [faucet.osmosis.zone](https://faucet.osmosis.zone/) 



### API Docs

Please visit the [API reference](/api) to interact with these endpoints. 


## Chain Registry

This repo contains a chain.json and assetlist.json for a number of cosmos-sdk based chains. A chain.json contains data that makes it easy to start running or interacting with a node. 
- [Chain Registry](https://github.com/cosmos/chain-registry) : `https://github.com/cosmos/chain-registry`

:::tip
Did you know there is also an NPM package that fetch chain-registry data? <br/>
**Learn more** : [https://www.npmjs.com/package/chain-registry](https://www.npmjs.com/package/chain-registry) 
:::


## Other providers

- [All That Node](https://www.allthatnode.com/osmosis.dsrv) : `https://www.allthatnode.com/osmosis.dsrv`
  - Features
    - Unlimited access to archive data
    - Faucet available
    - Automated updates
    - Technical support

- [DataHub](https://datahub.figment.io) : `https://datahub.figment.io`

- [OnFinality](https://onfinality.io/) is a blockchain infrastructure platform that saves Web3 builders time and makes their lives easier. OnFinality delivers scalable API endpoints for the biggest blockchain networks and empowers developers to automatically test, deploy, scale and monitor their own blockchain nodes in minutes. OnFinality offers free and premium (Pay-as-you-go or subsription-based) API [services for Osmosis](https://onfinality.io/networks/osmosis). Public RPC Endpoint for Osmosis: `https://osmosis.api.onfinality.io/public`
