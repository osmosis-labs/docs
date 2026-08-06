---
description: Query Osmosis over gRPC.
sidebar_position: 10
---

# Interact with gRPC Server

Osmosis exposes a public gRPC endpoint at:

```
grpc.osmosis.zone:443
```

The endpoint is **TLS-only**. It terminates TLS at a proxy on port 443 and forwards to a node's gRPC port behind it, so clients must connect with transport security to port 443. Plaintext connections to `grpc.osmosis.zone:9090` (the form used in older examples) no longer work.

:::info Rate limits and reflection
The public endpoint sits behind a strict rate limit (about 5 requests per second) and automated banning of clients that exceed it. gRPC **server reflection** (what `grpcurl list` and `grpcurl describe` use, and what `grpcurl` performs internally before every call) bursts many requests at once, so reflection against `grpc.osmosis.zone:443` frequently times out. That is the rate limit working as intended, not an outage.

For interactive exploration with reflection, use your own node or a third-party endpoint (an example is shown below), and reserve the public endpoint for clients with compiled Protobuf definitions making modest request volumes.
:::

## Enabling gRPC on a node

If you are running your own node, gRPC is configured in `~/.osmosisd/config/app.toml`:

* `grpc.enable = true|false` field defines if the gRPC server should be enabled. Defaults to `true`.
* `grpc.address = {string}` field defines the address (really, the port, since the host should be kept at `0.0.0.0`) the server should bind to. Defaults to `0.0.0.0:9090`.

A node's own gRPC port (`9090`) serves plaintext (h2c) by default; the TLS requirement above applies to the public `grpc.osmosis.zone` endpoint, not to a locally configured node.

## gRPC endpoints

An overview of all available gRPC endpoints shipped with Osmosis is available in the [Osmosis Protobuf documentation](https://buf.build/osmosis-labs/osmosis). There is also Cosmos SDK [Protobuf documentation](https://buf.build/cosmos/cosmos-sdk).

You can send requests to the gRPC server using a gRPC client such as [grpcurl](#grpcurl) or by browsing the [Buf Schema Registry](#buf-schema-registry).

Since the code generation library largely depends on your own tech stack, we will only present three alternatives:

### Buf Schema Registry

Osmosis publishes its gRPC and Protobuf service definitions to the [Osmosis Buf Schema Registry](https://buf.build/osmosis-labs/osmosis). Use it to browse the available services and message types, generate clients in your language, or look up the exact request and response shapes for a query.

### gRPCurl

[grpcurl](https://github.com/fullstorydev/grpcurl) is like `curl` but for gRPC. It is also available as a Go library, but we will use it only as a CLI command for debugging and testing purposes. Follow the instructions in the previous link to install it.

#### Connecting to the public endpoint

Against `grpc.osmosis.zone:443`, run grpcurl **without** the `-plaintext` flag so it negotiates TLS:

```bash
grpcurl grpc.osmosis.zone:443 cosmos.base.tendermint.v1beta1.Service/GetLatestBlock
```

Because grpcurl uses server reflection to resolve the method before calling it, even a single call like this can hit the public endpoint's rate limit and time out with `DeadlineExceeded`. If that happens, retry after a pause, supply the `.proto` files locally with grpcurl's `-proto`/`-import-path` flags to skip reflection, or use an endpoint without the strict limit as below.

#### Listing services with reflection

For reflection-heavy exploration, use your own node or a community endpoint. The example below uses Polkachu's public Osmosis gRPC endpoint, which serves plaintext gRPC and was verified working at the time of writing (note `-plaintext` here, since this endpoint does not terminate TLS):

```bash
grpcurl -plaintext osmosis-grpc.polkachu.com:12590 list
```

The output is the full list of Protobuf services the node exposes (50 on the current mainnet version), including:

```
cosmos.auth.v1beta1.Query
cosmos.bank.v1beta1.Query
cosmos.base.tendermint.v1beta1.Service
cosmos.staking.v1beta1.Query
cosmos.tx.v1beta1.Service
cosmwasm.wasm.v1.Query
grpc.reflection.v1alpha.ServerReflection
ibc.applications.transfer.v1.Query
osmosis.concentratedliquidity.v1beta1.Query
osmosis.gamm.v1beta1.Query
osmosis.poolmanager.v1beta1.Query
osmosis.smartaccount.v1beta1.Query
osmosis.superfluid.Query
osmosis.tokenfactory.v1beta1.Query
osmosis.txfees.v1beta1.Query
...
```

Each of these is a Protobuf service, and each service exposes multiple RPC methods you can query. To get a description of a service:

```bash
grpcurl -plaintext osmosis-grpc.polkachu.com:12590 describe osmosis.poolmanager.v1beta1.Query
```

#### Calling a method

An RPC call to query the node for information:

```bash
grpcurl -plaintext osmosis-grpc.polkachu.com:12590 cosmos.base.tendermint.v1beta1.Service/GetLatestBlock
```

This returns the latest block as JSON (block id, header with `chainId: "osmosis-1"` and the current height, transaction data, and the last commit). The same call works against `grpc.osmosis.zone:443` without `-plaintext`, subject to the rate-limit caveat above.

#### Query for historical state using grpcurl

You may also query for historical data by passing some [gRPC metadata](https://github.com/grpc/grpc-go/blob/master/Documentation/grpc-metadata.md) to the query: the `x-cosmos-block-height` metadata should contain the block to query. Using grpcurl as above, the command looks like:

```bash
grpcurl \
    -plaintext \
    -H "x-cosmos-block-height: 6312618" \
    -d '{"address":"osmo19a7pmytd9vk26l57q8chacuprsmx05g23mg6yc"}' \
    osmosis-grpc.polkachu.com:12590 \
    cosmos.bank.v1beta1.Query/AllBalances
```

Assuming the state at that block has not yet been pruned by the node, this query should return a non-empty response.

### Interacting with Go

The following snippet shows how to query the state using gRPC inside a Go program. The idea is to create a gRPC connection, and use the Protobuf-generated client code to query the gRPC server.

#### Install Cosmos SDK

```bash
go get github.com/cosmos/cosmos-sdk
```

```go
import (
    "context"
    "crypto/tls"
    "fmt"

    "google.golang.org/grpc"
    "google.golang.org/grpc/credentials"

    "github.com/cosmos/cosmos-sdk/codec"
    sdk "github.com/cosmos/cosmos-sdk/types"
    banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
)

func queryState() error {
    myAddress, err := sdk.AccAddressFromBech32("osmo1...")
    if err != nil {
        return err
    }

    // Create a connection to the gRPC server. The public endpoint is
    // TLS-only, so dial it with TLS transport credentials.
    grpcConn, err := grpc.Dial(
        "grpc.osmosis.zone:443",
        grpc.WithTransportCredentials(credentials.NewTLS(&tls.Config{})),
        // This instantiates a general gRPC codec which handles proto bytes. We pass in a nil interface registry
        // if the request/response types contain interface instead of 'nil' you should pass the application specific codec.
        grpc.WithDefaultCallOptions(grpc.ForceCodec(codec.NewProtoCodec(nil).GRPCCodec())),
    )
    if err != nil {
        return err
    }
    defer grpcConn.Close()

    // This creates a gRPC client to query the x/bank service.
    bankClient := banktypes.NewQueryClient(grpcConn)
    bankRes, err := bankClient.Balance(
        context.Background(),
        &banktypes.QueryBalanceRequest{Address: myAddress.String(), Denom: "uosmo"},
    )
    if err != nil {
        return err
    }

    fmt.Println(bankRes.GetBalance()) // Prints the account balance

    return nil
}
```

If you are targeting your own node's plaintext gRPC port instead (e.g. `127.0.0.1:9090`), swap the credentials for `insecure.NewCredentials()` from `google.golang.org/grpc/credentials/insecure`.

You can replace the query client (here we are using `x/bank`'s) with one generated from any other Protobuf service. The list of all available gRPC query endpoints is published to the [Osmosis Buf Schema Registry](https://buf.build/osmosis-labs/osmosis).

#### Query for historical state using Go

Querying for historical blocks is done by adding the block height metadata in the gRPC request.

```go
import (
    "context"
    "fmt"

    "google.golang.org/grpc"
    "google.golang.org/grpc/metadata"

    "github.com/cosmos/cosmos-sdk/codec"
    sdk "github.com/cosmos/cosmos-sdk/types"
    grpctypes "github.com/cosmos/cosmos-sdk/types/grpc"
    banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
)

func queryState() error {
    // --snip--

    var header metadata.MD
    bankRes, err = bankClient.Balance(
        metadata.AppendToOutgoingContext(context.Background(), grpctypes.GRPCBlockHeightHeader, "12"), // Add metadata to request
        &banktypes.QueryBalanceRequest{Address: myAddress.String(), Denom: "uosmo"},
        grpc.Header(&header), // Retrieve header from response
    )
    if err != nil {
        return err
    }
    blockHeight := header.Get(grpctypes.GRPCBlockHeightHeader)

    fmt.Println(blockHeight) // Prints the block height (12)

    return nil
}
```
