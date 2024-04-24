---
title: Run LocalOsmosis with mainnet state
sidebar_position: 3
---
## LocalOsmosis with Mainnet State

Running LocalOsmosis with mainnet state is resource intensive and can take a bit of time. It is recommended to only use this method if you are testing a new feature that must be thoroughly tested before pushing to production.

A few things to note before getting started. The below method will only work if you are using the same version as mainnet. In other words, if mainnet is on v8.0.0 and you try to do this on a v9.0.0 tag or on main, you will run into an error when initializing the genesis. (yes, it is possible to create a state exported testnet on a upcoming release, but that is out of the scope of this tutorial)

Additionally, this process requires 64GB of RAM. If you do not have 64GB of RAM, you will get an OOM error.

1. Set up a node on mainnet (easiest to use the [get.osmosis.zone](https://get.osmosis.zone) tool). This will be the node you use to run the state exported testnet, so ensure it has at least 64GB of RAM.

```sh
curl -sL https://get.osmosis.zone/install > i.py && python3 i.py
```

2. Once the installer is done, ensure your node is hitting blocks.

```sh
source ~/.profile
journalctl -u osmosisd.service -f
```

3. Stop your Osmosis daemon

```sh
systemctl stop osmosisd.service
```

4. Take a state export snapshot with the following command:

```sh
cd $HOME
osmosisd export 2> testnet_genesis.json
```

After a while (~15 minutes), this will create a file called `testnet_genesis.json` which is a snapshot of the current mainnet state.

5. Copy the `testnet_genesis.json` to the localosmosis folder within the osmosis repo

```sh
cp -r $HOME/testnet_genesis.json $HOME/osmosis/tests/localosmosis
```

6. Ensure you have docker and docker compose installed/running:
Docker

```sh
sudo apt-get remove docker docker-engine docker.io
sudo apt-get update
sudo apt install docker.io -y
```

Docker Compose

```sh
sudo apt install docker-compose -y
```

7. Compile the local:osmosis-se docker image (~15 minutes, since this process modifies the testnet genesis you provided above). You may change the exported ID to whatever you want the chain-id to be. In this example, we will use the chain-id of localosmosis.

```sh
cd $HOME/osmosis
export ID=local
make localnet-build-state-export
```

8. Start the local:osmosis-se docker image

```sh
make localnet-start-state-export
```

You will then go through the genesis initialization process. This will take ~15 minutes. You will then hit the first block (not block 1, but the block number after your snapshot was taken), and then you will just see a bunch of p2p error logs with some KV store logs. **This will happen for about 1 hour**, and then you will finally hit blocks at a normal pace.

9. On your host machine, add this specific wallet which holds a large amount of osmo funds

```sh
echo "bottom loan skill merry east cradle onion journey palm apology verb edit desert impose absurd oil bubble sweet glove shallow size build burst effort" | osmosisd keys add wallet --recover --keyring-backend test
```

You now are running a validator with a majority of the voting power with the same mainnet state as when you took the snapshot.

10. On your host machine, you can now query the state export testnet like so:

```sh
osmosisd status
```

11. Here is an example command to ensure complete understanding:

```sh
osmosisd tx bank send wallet osmo1nyphwl8p5yx6fxzevjwqunsfqpcxukmtk8t60m 10000000uosmo --chain-id testing1 --keyring-backend test
```

12. To stop the container and remove its data:

```sh
make localnet-remove-state-export
```

Note: At some point, all the validators (except yours) will get jailed at the same block due to them being offline. When this happens, it make take a little bit of time to process. Once all validators are jailed, you will continue to hit blocks as you did before. If you are only running the validator for a short period of time (< 24 hours) you will not experience this.