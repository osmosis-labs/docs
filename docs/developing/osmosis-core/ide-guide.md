# Osmosis IDE Setup
Recommended IDE setup for developing on Osmosis in Go.

## Install Go and VSCode

First, install VSCode: [https://code.visualstudio.com/download](https://code.visualstudio.com/download)

Then, install Go: [https://go.dev/doc/install](https://go.dev/doc/install)

## Clone Osmosis and Cosmos SDK
To set up your local environment for Osmosis, clone the Osmosis repo:

```bash
git clone https://github.com/osmosis-labs/osmosis.git
```

The next step is not necessary, but it is extremely useful to have as a reference. For

Clone the Cosmos SDK repo:
```bash
git clone https://github.com/cosmos/cosmos-sdk.git
```

Now launch VSCode and open the Osmosis folder through `File -> Open`

Finally, add the Cosmos SDK to your workspace by selecting it in `File -> Add Folder to Workspace`

Both Osmosis and the Cosmos SDK should now show up on the same VSCode page!

## Add Relevant VSCode Extensions
Add the following extensions to your VSCode:
1. [Go by Google](https://marketplace.visualstudio.com/items?itemName=golang.Go)
2. [VSCode Proto 3 by zxh404](https://marketplace.visualstudio.com/items?itemName=zxh404.vscode-proto3)
3. [Git Lens by GitKraken](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
4. [Tabnine AI by Tabnine](https://marketplace.visualstudio.com/items?itemName=TabNine.tabnine-vscode)

## Vscode configuration

To make your environment run tests automatically every time you save"

Go to: `VSCode -> Preferences -> settings -> Extensions -> Go`

* Set `Go: Lint tool` to `golint`. You can use `staticcheck` if you'd like, it can just take lots of computational resources.
    * If you'd like to use the same configuration as osmosis code, use `golangci-lint` .
    * You will likely be prompted to install the linter you choose, click the install button.
* Set `Go: Format tool` to one of the following: `goreturns` or `gofumports`
    * You will likely be prompted to install the formatter you choose, click the install button.
* Check `Go: Test on Save`


At this point, your environment should be ready to go!

## License

This work is dual-licensed under Apache 2.0 and MIT.
You can choose between one of them if you use this work.

`SPDX-License-Identifier: Apache-2.0 OR MIT`
