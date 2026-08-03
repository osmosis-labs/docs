---
description: Create a validator and go live on mainnet.
sidebar_position: 12
---

# Validating on Mainnet

## Synced Node

Before creating a mainnet validator, ensure you have first followed the instructions on how to [join the mainnet](../validate/joining-mainnet.md)

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

Ensure you have a small amount of OSMO on the wallet address you are using on your keyring in order to successfully send a transaction. Once you have a balance on the address on your keyring, you can send the create-validator transaction.

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
  --chain-id="osmosis-1" \
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
- `--chain-id` is the network you are joining (`osmosis-1` for mainnet).
- `--gas-prices` is the price per unit of gas in uosmo. It must be at or above the current fee-market base fee, which you can query with `osmosisd query txfees base-fee`.

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

Please note, you must be in the active validator set (currently the top 70, a governance-set parameter) to be bonded, meaning you must have more OSMO delegated to your validator than the lowest-ranked validator currently in the set. If you did everything above correctly but do not have enough delegated to break into the active set, you will stay unbonded. Query the live size with `osmosisd query staking params` (`max_validators`).

## Track Validator Signing

To track your validator's signing history, copy the validator public key:

```bash
osmosisd tendermint show-validator
```

Use your validators public key queried above as the validator-pubkey below:


```bash
osmosisd query slashing signing-info [validator-pubkey]
```

Example:

```bash
osmosisd query slashing signing-info '{"@type":"/cosmos.crypto.ed25519.PubKey","key":"HlixoxNZBPq4pBOYEimtSq9Ak4peBISVsIbI5ZHrEAU="}'
```
