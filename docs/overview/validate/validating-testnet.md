# Validating On Testnet

## Synced Node

Before creating a testnet validator, ensure you have first followed the instructions on how to [join the testnet](/overview/endpoints)

## Initialize Wallet Keyring

If you decide you want to turn your node into a validator, you will first need to add a wallet to your keyring.

While you can add an existing wallet through your seed phrase, we will create a new wallet in this example (replace KEY_NAME with a name of your choosing):

```bash
osmosisd keys add KEY_NAME
```
Ensure you write down the mnemonic as you can not recover the wallet without it. To ensure your wallet was saved to your keyring, the WALLET_NAME is in your keys list:

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


Here is the empty command:

```bash
osmosisd tx staking create-validator \
--from=[KEY_NAME] \
--amount=[staking_amount_uosmo] \
--pubkey=$(osmosisd tendermint show-validator) \
--moniker="[moniker_id_of_your_node]" \
--security-contact="[security contact email/contact method]" \
--chain-id="[chain-id]" \
--commission-rate="[commission_rate]" \
--commission-max-rate="[maximum_commission_rate]" \
--commission-max-change-rate="[maximum_rate_of_change_of_commission]" \
--min-self-delegation="[min_self_delegation_amount]" \
```

Here is the same command but with example values:

```bash
osmosisd tx staking create-validator \
--from=wallet1 \
--amount=400000000uosmo \
--pubkey=$(osmosisd tendermint show-validator)  \
--moniker="Wosmongton" \
--security-contact="wosmongton@osmosis.labs" \
--chain-id="osmo-test-5" \
--commission-rate="0.1" \
--commission-max-rate="0.2" \
--commission-max-change-rate="0.05" \
--min-self-delegation="400000000" \
```

If you need further explanation for each of these command flags:
- the `from` flag is the KEY_NAME you created when initializing the key on your keyring
- the `amount` flag is the amount you will place in your own validator in uosmo (in the example, 500000000uosmo is 500osmo)
- the `pubkey` is the validator public key found earlier
- the `moniker` is a human readable name you choose for your validator
- the `security-contact` is an email your delegates are able to contact you at
- the `chain-id` is whatever chain-id you are working with (in the osmosis mainnet case it is osmosis-1)
- the `commission-rate` is the rate you will charge your delegates (in the example above, 10 percent)
- the `commission-max-rate` is the most you are allowed to charge your delegates (in the example above, 20 percent)
- the `commission-max-change-rate` is how much you can increase your commission rate in a 24 hour period (in the example above, 5 percent per day until reaching the max rate)
- the `min-self-delegation` is the lowest amount of personal funds the validator is required to have in their own validator to stay bonded (in the example above, 500osmo)
- the `gas-prices` is the amount of gas used to send this create-validator transaction

### Troubleshooting

If you inspect your `create-validator` transaction in the explorer, and see the following error:
```
out of gas in location: WritePerByte; gasWanted: 177140, gasUsed: 177979: out of gas
```

Please try substituting:
```
--gas="auto" \
--gas-prices="0.0025uosmo"
```

with

```
--gas=<value significantly larger than gasUsed value from the error>
```

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
osmosisd query slashing signing-info [validator-pubkey] --chain-id osmo-test-5
```

Example:

```bash
osmosisd query slashing signing-info '{"@type":"/cosmos.crypto.ed25519.PubKey","key":"HlixoxNZBPq4pBOYEimtSq9Ak4peBISVsIbI5ZHrEAU="}' --chain-id osmo-test-5
```
