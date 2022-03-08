# Install Osmosisd

## Minimum Requirements

The minimum recommended specs for running a full osmosisd node is as follows:
- 8-core (4 physical core), x86_64 architecture processor
- 32 GB RAM (or equivalent swap file set up)
- 1 TB of storage space

You can check if you have enough memory to run osmosisd here: https://quicksync.io/networks/osmosis.html. 


## Quick Start

### Go to https://get.osmosis.zone/

Pull up your terminal and copy and paste in the command
```
curl -sL https://get.osmosis.zone/install > i.py && python3 i.py
```

The terminal screen should then look like this:


![initialscreen](https://i.ibb.co/VmdJ6tn/Osmo1.png)


Running a full node is easy and contributes to network decentralization! For ease of access, you can feel free to do a client node too.


You will then be asked whether if you want to run a mainnet or testnet node. 


![networkselection](https://i.ibb.co/bN3dJsy/Osmo6.png)

If you're running below the recommended specs, a warning will show up. Simply ignore it by pressing 1.


![ignorewarning](https://i.ibb.co/zmJxnZq/Osmo7.png)

Then select the default location: 


![defaultlocation](https://i.ibb.co/f2X0bhc/Osmo3.png)

Input your node name:


![networkname](https://i.ibb.co/NrSf79q/Osmo4.png)

Run this on default ports:


![portsettings](https://i.ibb.co/VtSJzns/Osmo8.png)

Choose default pruning settings:


![prunesettings](https://i.ibb.co/27tyDBv/Osmo9.png)

You may have to reboot your terminal for osmosisd to become available.

After choosing to download the snapshot from ChainLayer, choose the pruned sync-type:


![synctype](https://i.ibb.co/WfMfmxX/Osmo11.png)

The download will then start! Osmosisd will also be available as a terminal command after the download for further configuration.

## Manual Installation
### Update System

This guide will explain how to install the osmosisd binary onto your system.


On Ubuntu start by updating your system:
```bash
sudo apt update
```
```bash
sudo apt upgrade --yes
```

### Install Build Requirements

Install make and gcc.
```bash
sudo apt install git build-essential ufw curl jq snapd --yes
```

Install go:

```bash
wget -q -O - https://git.io/vQhTU | bash -s -- --version 1.17.2
```

After installed, open new terminal to properly load go

### Install Osmosis Binary

Clone the osmosis repo, checkout and install v7.0.3:

```bash
cd $HOME
git clone https://github.com/osmosis-labs/osmosis
cd osmosis
git checkout v7.0.3
make install
```
::: tip
If you came from the testnet node instruction, [click here to return](../network/join-testnet)

If you came from the mainnet node instruction, [click here to return](../network/join-mainnet)
:::