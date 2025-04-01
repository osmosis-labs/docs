---
title: Local Testing
sidebar_position: 3
---

# LocalOsmosis



## What is LocalOsmosis?

LocalOsmosis (a fork of LocalTerra) is a complete Osmosis testnet and ecosystem containerized with Docker and orchestrated with a simple `docker-compose` file. It simplifies the way smart-contract developers test their contracts in a sandbox before they deploy them on a testnet or mainnet.

LocalOsmosis comes preconfigured with opinionated, sensible defaults for standard testing environments. If other projects mention testing on LocalOsmosis, they are referring to the settings defined in this repo.

LocalOsmosis has the following advantages over a public testnet:

- Easily modifiable world states
- Quick to reset for rapid iterations
- Simple simulations of different scenarios
- Controllable validator behavior

## Prerequisites

- [`Docker`](https://www.docker.com/)
- [`docker-compose`](https://github.com/docker/compose)
- [`Osmosisd`](https://get.osmosis.zone)
  * Select option 3 (localosmosis), the installer will configure everything for you. 
  * The osmosisd daemon on your local computer is used to communicate with the localosmosis daemon running inside the Docker container. 
- Supported known architecture: x86_64
- 16+ GB of RAM is recommended

## Get started
## 1. LocalOsmosis - No Initial State

The following commands must be executed from the root folder of the Osmosis repository.

1. Make any change to the osmosis code that you want to test

2. Initialize LocalOsmosis:

```bash
make localnet-init
```

The command:

- Builds a local docker image with the latest changes
- Cleans the `$HOME/.osmosisd-local` folder

3. Start LocalOsmosis:

```bash
make localnet-start
```

> Note
>
> You can also start LocalOsmosis in detach mode with:
>
> `make localnet-startd`

4. (optional) Add your validator wallet and 9 other preloaded wallets automatically:

```bash
make localnet-keys
```

- These keys are added to your `--keyring-backend test`
- If the keys are already on your keyring, you will get an `"Error: aborted"`
- Ensure you use the name of the account as listed in the table below, as well as ensure you append the `--keyring-backend test` to your txs
- Example: `osmosisd tx bank send lo-test2 osmo1cyyzpxplxdzkeea7kwsydadg87357qnahakaks --keyring-backend test --chain-id localosmosis`

5. You can stop chain, keeping the state with

```bash
make localnet-stop
```

6. When you are done you can clean up the environment with:

```bash
make localnet-clean
```

## 2. LocalOsmosis - With Mainnet State

Running an osmosis network with mainnet state is now as easy as setting up a stateless localnet.

1. Set up a mainnet node and stop it at whatever height you want to fork the network at.

2. There are now two options you can choose from:

   - **Mainnet is on version X, and you want to create a testnet on version X.**

     On version X, run:

      ```bash
      osmosisd in-place-testnet localosmosis osmo12smx2wdlyttvyzvzg54y2vnqwq2qjateuf7thj
      ```

      Where the first input is the desired chain-id of the new network and the second input is the desired validator operator address (where you vote from).
      The address provided above is included in the localosmosis keyring under the name 'val'.

     You now have a network you own with the mainnet state on version X.

   - **Mainnet is on version X, and you want to create a testnet on version X+1.**

     On version X, run:

      ```bash
      osmosisd in-place-testnet localosmosis osmo12smx2wdlyttvyzvzg54y2vnqwq2qjateuf7thj --trigger-testnet-upgrade
      ```

      Where the first input is the desired chain-id of the new network and the second input is the desired validator operator address (where you vote from).
      The address provided above is included in the localosmosis keyring under the name 'val'.

     The network will start and hit 10 blocks, at which point the upgrade will trigger and the network will halt.

     Then, on version X+1, run:

      ```bash
      osmosisd start
      ```

You now have a network you own with the mainnet state on version X+1.

## Accounts

LocalOsmosis is pre-configured with one validator and 9 accounts with ION and OSMO balances. You can also manually add these keys using `make localnet-keys`

| Account   | Address                                                                                                  | Mnemonic                                                                                                                                                                   |
| --------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| lo-val | `osmo1phaxpevm5wecex2jyaqty2a4v02qj7qmlmzk5a`<br/>`osmovaloper1phaxpevm5wecex2jyaqty2a4v02qj7qm9v24r6` | `satisfy adjust timber high purchase tuition stool faith fine install that you unaware feed domain license impose boss human eager hat rent enjoy dawn`                    |
| lo-test1     | `osmo1cyyzpxplxdzkeea7kwsydadg87357qnahakaks`                                                           | `notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius`                       |
| lo-test2     | `osmo18s5lynnmx37hq4wlrw9gdn68sg2uxp5rgk26vv`                                                           | `quality vacuum heart guard buzz spike sight swarm shove special gym robust assume sudden deposit grid alcohol choice devote leader tilt noodle tide penalty`              |
| lo-test3     | `osmo1qwexv7c6sm95lwhzn9027vyu2ccneaqad4w8ka`                                                           | `symbol force gallery make bulk round subway violin worry mixture penalty kingdom boring survey tool fringe patrol sausage hard admit remember broken alien absorb`        |
| lo-test4     | `osmo14hcxlnwlqtq75ttaxf674vk6mafspg8xwgnn53`                                                           | `bounce success option birth apple portion aunt rural episode solution hockey pencil lend session cause hedgehog slender journey system canvas decorate razor catch empty` |
| lo-test5     | `osmo12rr534cer5c0vj53eq4y32lcwguyy7nndt0u2t`                                                           | `second render cat sing soup reward cluster island bench diet lumber grocery repeat balcony perfect diesel stumble piano distance caught occur example ozone loyal`        |
| lo-test6     | `osmo1nt33cjd5auzh36syym6azgc8tve0jlvklnq7jq`                                                           | `spatial forest elevator battle also spoon fun skirt flight initial nasty transfer glory palm drama gossip remove fan joke shove label dune debate quick`                  |
| lo-test7     | `osmo10qfrpash5g2vk3hppvu45x0g860czur8ff5yx0`                                                           | `noble width taxi input there patrol clown public spell aunt wish punch moment will misery eight excess arena pen turtle minimum grain vague inmate`                       |
| lo-test8     | `osmo1f4tvsdukfwh6s9swrc24gkuz23tp8pd3e9r5fa`                                                           | `cream sport mango believe inhale text fish rely elegant below earth april wall rug ritual blossom cherry detail length blind digital proof identify ride`                 |
| lo-test9     | `osmo1myv43sqgnj5sm4zl98ftl45af9cfzk7nhjxjqh`                                                           | `index light average senior silent limit usual local involve delay update rack cause inmate wall render magnet common feature laundry exact casual resource hundred`       |
| lo-test10    | `osmo14gs9zqh8m49yy9kscjqu9h72exyf295afg6kgk`                                                           | `prefer forget visit mistake mixture feel eyebrow autumn shop pair address airport diesel street pass vague innocent poem method awful require hurry unhappy shoulder`     |
