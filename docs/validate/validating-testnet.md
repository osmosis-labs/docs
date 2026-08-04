---
description: Create a validator and go live on testnet.
sidebar_position: 11
---

# Validating on Testnet

## Synced Node

Before creating a testnet validator, ensure you have first followed the instructions on how to [join the testnet](./joining-testnet.md)

## Initialize Wallet Keyring

If you decide you want to turn your node into a validator, you will first need to add a wallet to your keyring.

While you can add an existing wallet through your seed phrase, we will create a new wallet in this example (replace KEY_NAME with a name of your choosing):

```bash
osmosisd keys add KEY_NAME
```
Ensure you write down the mnemonic as you can not recover the wallet without it. To ensure your wallet was saved to your keyring, check that KEY_NAME is in your keys list:

```bash
osmosisd keys list
```

## Validator Public Key

The last thing needed before initializing the validator is to obtain your validator public key which was created when you first initialized your node. To obtain your validator pubkey:

```bash
osmosisd tendermint show-validator
```

## Create Validator Command

Ensure you have a small amount of OSMO on the wallet address you are using on your keyring in order to successfully send a transaction. 
Once you have have a balance on the address on your keyring, you can now send the create-validator transaction. 

## Get OSMO via the Faucet
If you need testnet testnet OSMO you have two options.

- Use the faucet at [https://faucet.osmosis.zone](https://faucet.osmosis.zone)
- Join the osmosis discord, get the testnet role [here](https://canary.discord.com/channels/798583171548840026/842529004955500555), and then utilize the faucet bot [in the faucet channel](https://canary.discord.com/channels/798583171548840026/911309363464007741).


The validator details are supplied in a **JSON file**, not as command flags. Create `validator.json`:

```json
{
  "pubkey": {"@type":"/cosmos.crypto.ed25519.PubKey","key":"oWg2ISpLF405Jcm2vXV+2v4fnjodh6aafuIdeoW+rUw="},
  "amount": "400000000uosmo",
  "moniker": "Wosmongton",
  "identity": "",
  "website": "",
  "security": "security@example.com",
  "details": "",
  "commission-rate": "0.1",
  "commission-max-rate": "0.2",
  "commission-max-change-rate": "0.05",
  "min-self-delegation": "400000000"
}
```

The `pubkey` value is the whole JSON object printed by `osmosisd tendermint show-validator`, not the bech32 `osmovalconspub...` string. Paste it in verbatim.

Then submit it, passing the file path as the only argument:

```bash
osmosisd tx staking create-validator validator.json \
  --from=[KEY_NAME] \
  --chain-id="osmo-test-5" \
  --gas="auto" \
  --gas-adjustment=1.3 \
  --gas-prices="0.03uosmo"
```

What the JSON fields mean:

- `pubkey` is the validator consensus public key from `osmosisd tendermint show-validator`.
- `amount` is your self-delegation, in uosmo (in the example, `400000000uosmo` is 400 OSMO).
- `moniker` is a human readable name you choose for your validator.
- `security` is a contact your delegators can reach you at. `identity`, `website`, and `details` are optional and may be left as empty strings.
- `commission-rate` is the rate you charge your delegators (10 percent in the example).
- `commission-max-rate` is the most you are ever allowed to charge (20 percent in the example).
- `commission-max-change-rate` is how much you can raise the rate in a 24 hour period (5 percent per day in the example, until reaching the max).
- `min-self-delegation` is the lowest amount of your own funds the validator must keep self-delegated to stay bonded (400 OSMO in the example).

And the flags:

- `--from` is the KEY_NAME you created when initializing the key on your keyring.
- `--chain-id` is the network you are joining (`osmo-test-5` for this testnet).
- `--gas-prices` is the price per unit of gas in uosmo.

### Troubleshooting

If you inspect your `create-validator` transaction in the explorer, and see the following error:
```
out of gas in location: WritePerByte; gasWanted: 177140, gasUsed: 177979: out of gas
```

The simulated gas limit was too low. Increase `--gas-adjustment`, or replace `--gas="auto"` with a fixed limit above the reported `gasUsed` value. For the example above:

```
--gas=220000
```

`--gas-prices` controls the transaction fee, not the gas limit. Osmosis sets a dynamic minimum gas price via its [fee market](/learn/features/fee-market), so query the current base fee (`osmosisd query txfees base-fee`) and pass a value at or above it.

## Track Validator Active Set

To see the current validator active set:

```bash
osmosisd query staking validators --limit 300 -o json | jq -r '.validators[] |
[.operator_address, .status, (.tokens|tonumber / pow(10; 6)),
.commission.update_time[0:19], .description.moniker] | @csv' | column -t -s","
```

You can search for your specific moniker by adding grep MONIKER at the end:

```bash
osmosisd query staking validators --limit 300 -o json | jq -r '.validators[] |
[.operator_address, .status, (.tokens|tonumber / pow(10; 6)),
.commission.update_time[0:19], .description.moniker] | @csv' | column -t -s"," | grep Wosmongton
```

If your bond status is `BOND_STATUS_BONDED`, congratulations, your validator is part of the active validator set!

## Track Validator Signing

To track your validator's signing history, copy the validator public key:

```bash
osmosisd tendermint show-validator
```

Use your validators public key queried above:

```bash
osmosisd query slashing signing-info [validator-pubkey]
```

Example:

```bash
osmosisd query slashing signing-info '{"@type":"/cosmos.crypto.ed25519.PubKey","key":"HlixoxNZBPq4pBOYEimtSq9Ak4peBISVsIbI5ZHrEAU="}'
```
