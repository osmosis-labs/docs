---
description: Sync and run a full Osmosis node on mainnet.
sidebar_position: 3
---



# Running a Node on Mainnet

## Osmosis Installer

Join a network by using Osmosis Installer from [https://get.osmosis.zone](https://get.osmosis.zone) 


![](@site/docs/assets/installer_11.png)

Simply run:

```
curl -sL https://get.osmosis.zone/install > i.py && python3 i.py
```



## Or Install Osmosis Binary manually

Make sure you have [installed the Osmosis Binary CLI](/build/developer-environment/osmosisd#minimum-requirements) prior to following the below instructions.


## Initialize Osmosis Node

Use osmosisd to initialize your node (replace the ```NODE_NAME``` with a name of your choosing):

```bash
osmosisd init NODE_NAME --chain-id=osmosis-1
```

Download and place the genesis file in the osmosis config folder:

```
wget -O ~/.osmosisd/config/genesis.json https://github.com/osmosis-labs/networks/raw/main/osmosis-1/genesis.json
```

## Node Requirements and Cosmovisor Setup

### Go Requirement

You will need to be running go1.23.4 for this version of Osmosis. You can check if you are running go1.23.4 with the following command:

```{.sh}
go version
```

If this does not say go1.23.4, you need to upgrade/downgrade. One of the many ways to upgrade/downgrade to/from go1.23.4 on linux is as follows:

```{.sh}
sudo rm -rvf /usr/local/go/
wget https://golang.org/dl/go1.23.4.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.23.4.linux-amd64.tar.gz
rm go1.23.4.linux-amd64.tar.gz
```
### Memory Requirements

The [minimum recommended specs](/build/developer-environment/osmosisd) are 32 GB of RAM. For a mainnet validator, 64 GB is recommended to give headroom under load. 

### Set Up Cosmovisor

Set up cosmovisor to ensure any future upgrades happen flawlessly. To install Cosmovisor:

```bash
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@latest
```

(You may also refer to the Cosmovisor [installation instructions](https://github.com/cosmos/cosmos-sdk/tree/main/tools/cosmovisor#installation).)

Create the required directories:

```bash
mkdir -p ~/.osmosisd/cosmovisor
mkdir -p ~/.osmosisd/cosmovisor/genesis
mkdir -p ~/.osmosisd/cosmovisor/genesis/bin
mkdir -p ~/.osmosisd/cosmovisor/upgrades
```

Set the environment variables:

```bash
echo "# Setup Cosmovisor" >> ~/.profile
echo "export DAEMON_NAME=osmosisd" >> ~/.profile
echo "export DAEMON_HOME=$HOME/.osmosisd" >> ~/.profile
echo "export DAEMON_ALLOW_DOWNLOAD_BINARIES=false" >> ~/.profile
echo "export DAEMON_LOG_BUFFER_SIZE=512" >> ~/.profile
echo "export DAEMON_RESTART_AFTER_UPGRADE=true" >> ~/.profile
echo "export UNSAFE_SKIP_BACKUP=true" >> ~/.profile
source ~/.profile
```
You may leave out `UNSAFE_SKIP_BACKUP=true`, however the backup takes a decent amount of time and public snapshots of old states are available.

Copy the current osmosisd binary into the cosmovisor/genesis folder:

```bash
cp $GOPATH/bin/osmosisd ~/.osmosisd/cosmovisor/genesis/bin
```

To check your work, ensure the version of cosmovisor and osmosisd are the same:

```bash
cosmovisor version
osmosisd version
```

## Download Chain Data

Download the latest chain data from a snapshot provider. The official source is <a href="https://snapshots.osmosis.zone/" target="_blank">https://snapshots.osmosis.zone/</a>, which publishes `osmosis-1` mainnet snapshots in both pruned (regular node) and archive (full history) forms. The snapshot URL is timestamped and rotates, so copy the current one from that page rather than hardcoding it.

Download liblz4-tool to handle the compressed file:

```bash
sudo apt-get install wget liblz4-tool aria2 -y
```

Pick a pruned or archive snapshot from [snapshots.osmosis.zone](https://snapshots.osmosis.zone/) and extract it into the data directory. Replace `<SNAPSHOT_URL>` with the current URL copied from that page:

```bash
wget -q -O - <SNAPSHOT_URL> | lz4 -d | tar -C $HOME/.osmosisd -xvf -
```

## Set Up Osmosis Service

Set up a service to allow cosmovisor to run in the background as well as restart automatically if it runs into any problems:

```bash
echo "[Unit]
Description=Cosmovisor daemon
After=network-online.target
[Service]
Environment="DAEMON_NAME=osmosisd"
Environment="DAEMON_HOME=${HOME}/.osmosisd"
Environment="DAEMON_RESTART_AFTER_UPGRADE=true"
Environment="DAEMON_ALLOW_DOWNLOAD_BINARIES=false"
Environment="DAEMON_LOG_BUFFER_SIZE=512"
Environment="UNSAFE_SKIP_BACKUP=true"
User=$USER
ExecStart=${HOME}/go/bin/cosmovisor run start
Restart=always
RestartSec=3
LimitNOFILE=infinity
LimitNPROC=infinity
[Install]
WantedBy=multi-user.target
" >cosmovisor.service
```

Move this new file to the systemd directory:

```bash
sudo mv cosmovisor.service /etc/systemd/system/cosmovisor.service
```

:::note
Previously, this documentation suggested to move the systemd unit file to:

    /lib/systemd/system/cosmovisor.service

If dealing with a server that may have followed older instructions, you may consider looking there.
:::

## Start Osmosis Service

Reload and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl restart systemd-journald
sudo systemctl start cosmovisor
```

Check the status of the service:

```bash
sudo systemctl status cosmovisor
```

To see live logs of the service:

```bash
journalctl -u cosmovisor -f
```

## Updating Cosmovisor for the Next Chain Upgrade

To allow osmosisd to upgrade automatically when the chain hits the next upgrade height, prepare the upgrade binary in advance. Replace `<UPGRADE_VERSION>` and `<UPGRADE_HEIGHT>` below with the values from the latest [Osmosis release](https://github.com/osmosis-labs/osmosis/releases) and the corresponding onchain governance proposal.

```{.sh}
# Example: upgrading from v31 -> v32 at height 99999999
# Replace the placeholders with the values for the next upgrade.
mkdir -p ~/.osmosisd/cosmovisor/upgrades/<UPGRADE_VERSION>/bin
cd $HOME/osmosis
git pull
git checkout <UPGRADE_VERSION>
make build
cp build/osmosisd ~/.osmosisd/cosmovisor/upgrades/<UPGRADE_VERSION>/bin
```

Cosmovisor will switch to the new binary automatically when the chain reaches `<UPGRADE_HEIGHT>`.
