# Install Osmosisd

## Minimum Requirements

The minimum recommended specs for running osmosisd is as follows:
- 8-core (4 physical core), x86_64 architecture processor
- 32 GB RAM (or equivalent swap file set up)
- 1 TB of storage space

You can check if you have enough storage to run osmosisd [here](https://quicksync.io/networks/osmosis.html).


## Quick Start

Go to [https://get.osmosis.zone/](https://get.osmosis.zone/) or copy and past the following into your terminal, then follow the onscreen instructions:

```
curl -sL https://get.osmosis.zone/install > i.py && python3 i.py
```

![](../../assets/installer.png)


## Manual Installation
### Update System

This guide will explain how to install the osmosisd binary onto your system.


On Ubuntu, start by updating your system:
```bash
sudo apt update
```
```bash
sudo apt upgrade --yes
```

## Install Build Requirements

Install make and gcc.
```bash
sudo apt install git build-essential ufw curl jq snapd --yes
```

Install go:

```bash
wget -q -O - https://git.io/vQhTU | bash -s -- --version 1.17.2
```

After installed, open new terminal to properly load go

## Install Osmosis Binary

Clone the osmosis repo, checkout and install v7.0.3:

```bash
cd $HOME
git clone https://github.com/osmosis-labs/osmosis
cd osmosis
git checkout v7.0.3
make install
```
::: tip Note
If you came from the testnet node instruction, [click here to return](../network/join-testnet)

If you came from the mainnet node instruction, [click here to return](../network/join-mainnet)
:::