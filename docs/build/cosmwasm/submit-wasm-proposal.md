---
description: Store a contract via a CosmWasm governance proposal.
sidebar_position: 6
---

# Submit a Cosmwasm Governance Proposal

The following is a quick guide to provide a basic example on how submit a wasm binary proposal in Osmosis. This particular example will be with localOsmosis but it can also be used with testnet.

## Localosmosis
The easiest way to setup your localOsmosis is by downloading the [automated installer](https://get.osmosis.zone/). You can learn more about localOsmosis by reading the [README](https://github.com/osmosis-labs/localosmosis) in the official repo. 

Run the following and choose option #3.
```
curl -sL https://get.osmosis.zone/install > i.py && python3 i.py
```
![](https://hackmd.io/_uploads/SybyH7A8q.png)



### Start localOsmosis

Inside a separate bash window, start LocalOsmosis from a checkout of the Osmosis repo:

```
cd ~/osmosis
make localnet-start
```
You will start seeing LocalOsmosis block activity in your terminal. Keep LocalOsmosis running while you perform the next steps in a new terminal window.

:::tip
See [CosmWasm & LocalOsmosis](/build/cosmwasm/localosmosis) for the full local setup, including the automatic installer option.
::: 

## Download sample contract

``` 
curl -s -L -O https://github.com/CosmWasm/cw-plus/releases/download/v1.1.2/cw20_base.wasm
```

## Define variables 

```
CHAIN_ID=localosmosis
CONTRACT=cw20_base
```

## Define proposal ID
We cannot really do this programmatically. Proposal `1` will come out after submitting it for the first time on a new chain. You can always update this manually when testing multiple times on the same state.

```
PROPOSAL=1
```

## Create local wallet from seed
Note that this seed is already part of localOsmosis as shown [here](https://github.com/osmosis-labs/localosmosis#accounts).
```
echo "satisfy adjust timber high purchase tuition stool faith fine install that you unaware feed domain license impose boss human eager hat rent enjoy dawn" | osmosisd keys add validator --keyring-backend test --recover
VAL=$(osmosisd keys show -a validator --keyring-backend test)
```

## Submit proposal

Storing code on a permissioned network goes through `x/wasm`'s own governance proposal command, `tx wasm submit-proposal store-wasm` (the older `tx gov submit-proposal wasm-store` form, and the `--description` flag, were removed in newer SDK/wasmd versions; metadata is now `--title` plus `--summary`):

```
osmosisd tx wasm submit-proposal store-wasm $CONTRACT.wasm \
  --title "Add $CONTRACT" --summary "Let's upload this contract" --run-as $VAL \
  --from validator --keyring-backend test --chain-id $CHAIN_ID -y -b sync \
  --gas 9000000 --gas-prices 0.05uosmo
```

## Query proposal
```
osmosisd query gov proposal $PROPOSAL
```

## Deposit on proposal
```
osmosisd tx gov deposit $PROPOSAL 10000000uosmo --from validator --keyring-backend test \
    --chain-id $CHAIN_ID -y -b sync --gas 6000000 --gas-prices 0.05uosmo
```

## Vote
```
osmosisd tx gov vote $PROPOSAL yes --from validator --keyring-backend test \
    --chain-id $CHAIN_ID -y -b sync --gas 600000 --gas-prices 0.05uosmo
```

## Check the results
Wait 1 or two minutes for the results to show up. 

```
osmosisd query wasm list-code
```

### Learn more:
[https://github.com/CosmWasm/wasmd/blob/main/x/wasm/Governance.md](https://github.com/CosmWasm/wasmd/blob/main/x/wasm/Governance.md)
