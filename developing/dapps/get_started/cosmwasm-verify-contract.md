# Verifying Smart Contracts

The following are the steps needed to verify any contract from the chain. In this particular example a brand new contract uploaded to the testnet. 


### Create new contract
Follow [this guide]( https://docs.osmosis.zone/developing/dapps/get_started/cosmwasm-testnet.html) to create a new contract with Beaker.

Output:

<img width="686" alt="image" src="https://user-images.githubusercontent.com/13665117/176251934-121d6422-808b-4d42-b482-98ac792af633.png">


Once the contract is created query the contract information. Assuming you are connected to the testnet. 

### Contract info
```
osmosisd query wasm contract osmo1mpf0guu0t363xrshhedandypq003ahzaxvsxzgu69n3ej03mh2zqx5gk8l

```
Output:

<img width="1190" alt="image" src="https://user-images.githubusercontent.com/13665117/176260093-1fc8ac27-dbd6-4f3b-86c8-341112496db4.png">


### Contract version
Get the contract version by running the following command
```
osmosisd query wasm contract-state raw osmo1mpf0guu0t363xrshhedandypq003ahzaxvsxzgu69n3ej03mh2zqx5gk8l 636F6E74726163745F696E666F --node https://rpc-test.osmosis.zone:443 --output json | jq  -r .data | base64 -d | jq
```
What in the world is `636F6E74726163745F696E666F`? 😕 

ContractInfo is must be stored under "contract_info" key which translates to "636F6E74726163745F696E666F" in hex format. As documented [here](https://lib.rs/crates/cw2).

Output:

<img width="1210" alt="image" src="https://user-images.githubusercontent.com/13665117/176259801-3b961c4c-c757-4a80-a9b1-c893c6306789.png">

### Downloading the Contract from the network

```
osmosisd query wasm code 205 205_code.wasm --node https://rpc-test.osmosis.zone:443
```
Output:

<img width="713" alt="image" src="https://user-images.githubusercontent.com/13665117/176260453-0a1ed7c4-e850-4c0d-8e88-3a7de5a7aef9.png">

### Getting the hash
```
sha256sum 205_code.wasm
```

Output:

<img width="805" alt="image" src="https://user-images.githubusercontent.com/13665117/176260874-546f1efe-84ee-470c-b050-bff49c2e7d16.png">

`0b662785042cd938d0f0e8142f69d2d23fdf0addec965d1fbeacf44080330016`

### Verify hash

Now it's time to verify the hash with the source repos. All contracts should provide a repository with a hash for their contracts the same way that [cw-plus](https://github.com/CosmWasm/cw-plus/releases) does on their checksum as shown below:

````
10bc1a8cf82055106b26136f26137d6bf132df99c2d2098a75d03b64e7fe75a5  cw1155_base.wasm
539b62678532596c73b27764186623a2bb868f5e67c3e588508c4a28e105e8c9  cw1_subkeys.wasm
b67bc69fef770c28d48730feb800ea9c91eaae1a608e3ea7819aac64a6e99d92  cw1_whitelist.wasm
....

````






