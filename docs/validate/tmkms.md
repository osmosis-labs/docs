---
description: Production validator key security with the Tendermint KMS.
sidebar_position: 10
---

# Using TMKMS

The Tendermint Key Management System (or TMKMS) should be used by any validator currently or intending to be in the active validator set. This application mitigates the risk of double-signing and provides high-availability to validator keys while keeping these keys on a separate physical host. While TMKMS can be used on the same machine as the validator, it is recommended to be on a separate host.

TMKMS is not the only remote signer in production use. [Horcrux](https://github.com/strangelove-ventures/horcrux) splits the consensus key into threshold shares across several signer nodes, so no single host holds the whole key and the signer itself is highly available. Consider it if you need signer redundancy; this page covers TMKMS.

## Prepare TMKMS Dependencies

Start by opening the node you intend to run TMKMS (not the node you validate on) and install the following dependencies:

**Rust**

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

```sh
source $HOME/.cargo/env
```

**GCC**

<Tabs>
<TabItem value="ubuntu" label="Ubuntu" default>

```sh
sudo apt update
```

```sh
sudo apt install git build-essential ufw curl jq snapd --yes
```

</TabItem>
<TabItem value="mac" label="Mac">

```sh
brew install gcc
```

</TabItem>
</Tabs>

**Libusb**

<Tabs>
<TabItem value="ubuntu" label="Ubuntu" default>

```sh
apt install libusb-1.0-0-dev
```

</TabItem>
<TabItem value="mac" label="Mac">

```sh
brew install libusb
```

</TabItem>
</Tabs>

If on x86_64 architecture:

```sh
export RUSTFLAGS=-Ctarget-feature=+aes,+ssse3
```

## Setup TMKMS

In this example, we will be installing tmkms from crates.io using the `--features=softsign` flag, however you may use `--features=yubihsm` if you want to use a yubikey (ledger support is not working properly at the moment, and this guide will not go into using yubihsm).

```sh
mkdir -p $HOME/tmkms
cd $HOME/tmkms
cargo install tmkms --version 0.15.0 --features=softsign --locked
tmkms init config
tmkms softsign keygen ./config/secrets/secret_connection_key
```

Now we will transfer your validator private key from your validator to your VM running TMKMS. You can do this manually or through SCP. I will use SCP in this example (the validator has the private IP address `10.0.0.5`):

```sh
scp user@10.0.0.5:~/.osmosisd/config/priv_validator_key.json ~/tmkms/config/secrets
```

Then, import the private validator key into tmkms:

```sh
tmkms softsign import $HOME/tmkms/config/secrets/priv_validator_key.json $HOME/tmkms/config/secrets/priv_validator_key
```

Please note at this point, you could delete the `priv_validator_key.json` from both your validator node and tmkms node and store it safely offline in case of an emergency. This newly created `priv_validator_key` will be what TMKMS will use to sign for your validator.

Now, modify the `tmkms.toml` file

```sh
nano $HOME/tmkms/config/tmkms.toml
```

In this example, my validator has the private IP address `10.0.0.5` and we will be using port 26659 to feed the validator key to the validator. We will also be using chain_id `osmosis-1`, but if you are doing this on the testnet be sure to use `osmo-test-5` instead.

tmkms does not expand `~` or environment variables in this file, so the three paths must be absolute. `tmkms init config` already wrote them for your home directory; the example below is for a user whose home is `/home/user`:

```toml
# Tendermint KMS configuration file

## Chain Configuration

### Cosmos Hub Network

[[chain]]
id = "osmosis-1"
key_format = { type = "bech32", account_key_prefix = "osmopub", consensus_key_prefix = "osmovalconspub" }
state_file = "/home/user/tmkms/config/state/priv_validator_state.json"

## Signing Provider Configuration

### Software-based Signer Configuration

[[providers.softsign]]
chain_ids = ["osmosis-1"]
key_type = "consensus"
path = "/home/user/tmkms/config/secrets/priv_validator_key"

## Validator Configuration

[[validator]]
chain_id = "osmosis-1"
addr = "tcp://10.0.0.5:26659"
secret_key = "/home/user/tmkms/config/secrets/secret_connection_key"
protocol_version = "v0.38"
reconnect = true
```

Now, modify your validators `config.toml` to use the port you selected in the `tmkms.toml` file:

```sh
nano $HOME/.osmosisd/config/config.toml
```

Bind this listener to the private address the TMKMS host connects over, not to every interface:

```toml
priv_validator_laddr = "tcp://10.0.0.5:26659"
```

:::danger This is the consensus signing interface
`priv_validator_laddr` is how the signer is fed consensus votes. Never bind it to `0.0.0.0`, which exposes it on every interface including the public one. Bind it to a private or VPN interface reachable only by the TMKMS host, and add a default-deny firewall rule that permits `26659` only from that host's address. Treat the firewall rule as part of the setup, not an optional hardening step afterwards.
:::

It is also recommended to comment out the `priv_validator_key_file` line and the `priv_validator_state_file` line:

```toml
# Path to the JSON file containing the private key to use as a validator in the consensus protocol
# priv_validator_key_file = "config/priv_validator_key.json"

# Path to the JSON file containing the last sign state of a validator
# priv_validator_state_file = "data/priv_validator_state.json"
```

Next, stop the validator. Move back to your VM running TMKMS and start it:

```sh
tmkms start -c $HOME/tmkms/config/tmkms.toml
```

tmkms loads the key and then repeatedly logs a connection-refused error, because the validator is not yet listening. This is expected at this point. An illustrative excerpt (exact formatting varies by version):

```
INFO tmkms::commands::start: tmkms starting up...
INFO tmkms::keyring: [keyring:softsign] added consensus Ed25519 key: osmovalconspub1...
ERROR tmkms::client: [osmosis-1@tcp://10.0.0.5:26659] I/O error: Connection refused (os error 111)
```

Now, start your osmosis validator on the validator node:

```sh
osmosisd start
```

Success looks like this: tmkms connects to the validator and then logs a signed vote at each new, increasing height. An illustrative excerpt (exact formatting varies by version):

```
INFO tmkms::session: [osmosis-1@tcp://10.0.0.5:26659] connected to validator successfully
INFO tmkms::session: [osmosis-1@tcp://10.0.0.5:26659] signed PreCommit:<nil> at h/r/s 3399910/0/2 (0 ms)
INFO tmkms::session: [osmosis-1@tcp://10.0.0.5:26659] signed PreCommit:<nil> at h/r/s 3399911/0/2 (0 ms)
```

You should now be signing blocks! If you cancel the TMKMS process, you will no longer sign blocks and will stop syncing. If you restart the TMKMS process, your validator node will continue to sync from where it left off.

## Final Notes

Please note that this is a bare minimum setup. More robust settings such as setting up a firewall to only allow your TMKMS node to get through the priv_validator_laddr port would make your validator even more secure.
