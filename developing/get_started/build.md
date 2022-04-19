# Build and Test Osmosis Source Code


## Install Go 1.18

Currently, Osmosis uses Go 1.18 to compile the code.

Install [Go 1.18](https://go.dev/doc/install) by following instructions there.

Verify the installation by typing `go version` in your terminal.

```sh
$ go version
go version go1.18.1 darwin/amd64
```

## Build Osmosis

In order to build Flink you need the source code. Either [download the source of a release](https://github.com/osmosis-labs/osmosis/releases) or [clone the git repository](https://github.com/osmosis-labs/osmosis).

Build Osmosis from the source code:

```sh
cd osmosis
make build
```

After building, you should see a new executable file `osmosis/build/osmosisd`.

## Run Tests

Run tests from the source code:

```sh
cd osmosis
make test
```
