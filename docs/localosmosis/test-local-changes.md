---
title: Testing Local Changes
sidebar_position: 2
---
## Use LocalOsmosis to Test Local Changes

You can now quickly test your changes to Osmosis with just a few commands:

1. Make any change to the osmosis code that you want to test

2. From the Osmosis home folder, run `make localnet-build`
    - This compiles all your changes to docker image called local:osmosis (~60 seconds)

3. Once complete, run `make localnet-start`
    - You will now be running a local network with your changes!
    - The files in `tests/e2e/localosmosis/.osmosisd` that are produced
    by this command can only be removed by running `make localnet-remove`
    - That will reset the chain to genesis

4. To add your validator wallet and 9 other preloaded wallets automatically, run `make localnet-keys`
    - These keys are added to your --keyring-backend test
    - If the keys are already on your keyring, you will get an "Error: aborted"
    - Ensure you use the name of the account as listed in the table below, as well as ensure you append the `--keyring-backend test` to your txs
        - Example: `osmosisd tx bank send lo-test2 osmo1cyyzpxplxdzkeea7kwsydadg87357qnahakaks --keyring-backend test --chain-id localosmosis`

5. To remove all block history and start from scratch, run `make localnet-remove`

6. To stop the chain but keep the state, run `make localnet-stop`