---
title: LocalOsmosis
---

## What is LocalOsmosis?

LocalOsmosis (a fork of LocalTerra) is a complete Osmosis testnet and ecosystem containerized with Docker and orchestrated with a simple `docker-compose` file. It simplifies the way smart-contract developers test their contracts in a sandbox before they deploy them on a testnet or mainnet.

LocalOsmosis comes preconfigured with opinionated, sensible defaults for standard testing environments. If other projects mention testing on LocalOsmosis, they are referring to the settings defined in this repo.

LocalOsmosis has the following advantages over a public testnet:

- Easily modifiable world states
- Quick to reset for rapid iterations
- Simple simulations of different scenarios
- Controllable validator behavior

## Prerequisites

- [Docker](https://www.docker.com/)
```
sudo apt-get remove docker docker-engine docker.io
sudo apt-get update
sudo apt install docker.io -y
```
- [`docker-compose`](https://github.com/docker/compose)
```
sudo apt install docker-compose -y
```
- [Osmosisd](https://get.osmosis.zone)
  * We will be using osmosisd outside of the Docekr container in order to easily communicate with the local network
- Supported known architecture: x86_64
- 16+ GB of RAM is recommended

## Install LocalOsmosis

1. Run the following commands::

```sh
git clone https://github.com/czarcas7ic/LocalOsmosis.git
cd LocalOsmosis
```

2. Make sure your Docker daemon is running in the background and [`docker-compose`](https://github.com/docker/compose) is installed.

## Start, stop, and reset LocalOsmosis

- Start LocalOsmosis:

```sh
docker-compose up
```

Your environment now contains:

- [osmosisd](http://github.com/osmosis-labs/osmosis) RPC node running on `tcp://localhost:26657`
- LCD running on http://localhost:1317


Stop LocalOsmosis:

```sh
$ docker-compose stop
```

Reset the world state:

```sh
$ docker-compose rm
```

## Integrations

### osmosisd

1. Ensure the same version of `osmosisd` and LocalOsmosis are installed.

2. Use `osmosisd` to talk to your LocalOsmosis `osmosisd` node:

```sh
osmosisd status
```

This command automatically works because `osmosisd` connects to `localhost:26657` by default.

The following command is the explicit form:
```sh
osmosisd status --node=tcp://localhost:26657
```

3. Run any of the `osmosisd` commands against your LocalOsmosis network, as shown in the following example:

```sh
osmosisd query account osmo1l0jjmvdtj4c3f8cxzzgfhq0zhdzf2x8cgpg056
```

## Configure LocalOsmosis

The majority of LocalOsmosis is implemented through a `docker-compose.yml` file, making it easily customizable. You can use LocalOsmosis as a starting template point for setting up your own local Osmosis testnet with Docker containers.

Out of the box, LocalOsmosis comes preconfigured with opinionated settings such as:

- ports defined for RPC (26657) and LCD (1317)
- standard [accounts](#accounts)

### Modifying node configuration

You can modify the node configuration of your validator in the `config/config.toml` and `config/app.toml` files.

#### Pro tip: Speed Up Block Time

To decrease block time, edit the `[consensus]` parameters in the `config/config.toml` file, and specify your own values.

The following example configures all timeouts to `200ms`:

```diff
##### consensus configuration options #####
[consensus]

wal_file = "data/cs.wal/wal"
- timeout_propose = "3s"
- timeout_propose_delta = "500ms"
- timeout_prevote = "1s"
- timeout_prevote_delta = "500ms"
- timeout_precommit_delta = "500ms"
- timeout_commit = "5s"
+ timeout_propose = "200ms"
+ timeout_propose_delta = "200ms"
+ timeout_prevote = "200ms"
+ timeout_prevote_delta = "200ms"
+ timeout_precommit_delta = "200ms"
+ timeout_commit = "200ms"
```

Additionally, you can use the following single line to configure timeouts:

```sh
sed -E -i '/timeout_(propose|prevote|precommit|commit)/s/[0-9]+m?s/200ms/' config/config.toml
```

### Modifying genesis

You can change the `genesis.json` file by altering `config/genesis.json`. To load your changes, restart your LocalOsmosis.

## Accounts

LocalOsmosis is pre-configured with one validator and 10 accounts with ION and OSMO balances.

| Account   | Address                                                                                                  | Mnemonic                                                                                                                                                                   |
| --------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| validator | `osmo1phaxpevm5wecex2jyaqty2a4v02qj7qmlmzk5a`<br/>`osmovaloper1phaxpevm5wecex2jyaqty2a4v02qj7qm9v24r6` | `satisfy adjust timber high purchase tuition stool faith fine install that you unaware feed domain license impose boss human eager hat rent enjoy dawn`                    |
| test1     | `osmo1cyyzpxplxdzkeea7kwsydadg87357qnahakaks`                                                           | `notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius`                       |
| test2     | `osmo18s5lynnmx37hq4wlrw9gdn68sg2uxp5rgk26vv`                                                           | `quality vacuum heart guard buzz spike sight swarm shove special gym robust assume sudden deposit grid alcohol choice devote leader tilt noodle tide penalty`              |
| test3     | `osmo1qwexv7c6sm95lwhzn9027vyu2ccneaqad4w8ka`                                                           | `symbol force gallery make bulk round subway violin worry mixture penalty kingdom boring survey tool fringe patrol sausage hard admit remember broken alien absorb`        |
| test4     | `osmo14hcxlnwlqtq75ttaxf674vk6mafspg8xwgnn53`                                                           | `bounce success option birth apple portion aunt rural episode solution hockey pencil lend session cause hedgehog slender journey system canvas decorate razor catch empty` |
| test5     | `osmo12rr534cer5c0vj53eq4y32lcwguyy7nndt0u2t`                                                           | `second render cat sing soup reward cluster island bench diet lumber grocery repeat balcony perfect diesel stumble piano distance caught occur example ozone loyal`        |
| test6     | `osmo1nt33cjd5auzh36syym6azgc8tve0jlvklnq7jq`                                                           | `spatial forest elevator battle also spoon fun skirt flight initial nasty transfer glory palm drama gossip remove fan joke shove label dune debate quick`                  |
| test7     | `osmo10qfrpash5g2vk3hppvu45x0g860czur8ff5yx0`                                                           | `noble width taxi input there patrol clown public spell aunt wish punch moment will misery eight excess arena pen turtle minimum grain vague inmate`                       |
| test8     | `osmo1f4tvsdukfwh6s9swrc24gkuz23tp8pd3e9r5fa`                                                           | `cream sport mango believe inhale text fish rely elegant below earth april wall rug ritual blossom cherry detail length blind digital proof identify ride`                 |
| test9     | `osmo1myv43sqgnj5sm4zl98ftl45af9cfzk7nhjxjqh`                                                           | `index light average senior silent limit usual local involve delay update rack cause inmate wall render magnet common feature laundry exact casual resource hundred`       |
| test10    | `osmo14gs9zqh8m49yy9kscjqu9h72exyf295afg6kgk`                                                           | `prefer forget visit mistake mixture feel eyebrow autumn shop pair address airport diesel street pass vague innocent poem method awful require hurry unhappy shoulder`     |
