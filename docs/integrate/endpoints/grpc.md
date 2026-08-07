---
description: Query Osmosis over gRPC.
sidebar_position: 10
---

# Interact with gRPC Server

Osmosis exposes a public gRPC endpoint at:

```
grpc.osmosis.zone:443
```

The endpoint is **TLS-only**. The Cosmos SDK's own gRPC server has no transport security (a node's gRPC port always speaks plaintext); the TLS here is terminated by a reverse proxy on port 443, which forwards to a node's gRPC port behind it. Clients must therefore connect with transport security to port 443, while plaintext connections to `grpc.osmosis.zone:9090` (the form used in older examples) no longer work. Against your own node's gRPC port, plaintext remains the correct mode.

:::info Rate limits and reflection
The public endpoint sits behind a strict rate limit (about 5 requests per second) and automated banning of clients that exceed it. gRPC **server reflection** (what `grpcurl list` and `grpcurl describe` use, and what `grpcurl` performs internally before every call) bursts many requests at once, so reflection against `grpc.osmosis.zone:443` frequently times out. That is the rate limit working as intended, not an outage.

For interactive exploration with reflection, use your own node; against the public endpoint, work from local descriptor sets as shown below, and keep request volumes modest.
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

Against `grpc.osmosis.zone:443`, run grpcurl **without** the `-plaintext` flag so it negotiates TLS. By default grpcurl resolves every method through server reflection, and reflection's burst of requests trips the public endpoint's rate limit, timing out with `DeadlineExceeded`. That is expected behavior, not an outage: supply the Protobuf descriptors locally instead, and grpcurl never needs reflection.

#### Building a descriptor set

Build a descriptor set from the chain repo at the deployed release using [buf](https://buf.build/docs/installation) (it resolves the third-party imports from the repo's `buf.lock`; swap the tag for the current release):

```bash
git clone --depth 1 --branch v31.0.2 https://github.com/osmosis-labs/osmosis
cd osmosis/proto
buf build -o osmosis.protoset
```

This covers the `osmosis.*` services. For the SDK-level services the node also exposes (bank, auth, staking, tx, and so on), build a second set straight from the Buf Schema Registry, and pass as many `-protoset` flags as you need:

```bash
buf build buf.build/cosmos/cosmos-sdk -o cosmos-sdk.protoset
```

#### Listing and describing services

With a descriptor set, `list` and `describe` read the file locally, with no server round trip:

```bash
grpcurl -protoset osmosis.protoset list
grpcurl -protoset osmosis.protoset describe osmosis.poolmanager.v1beta1.Query
```

The Osmosis set contains every `osmosis.*` service, including:

```
osmosis.concentratedliquidity.v1beta1.Query
osmosis.cosmwasmpool.v1beta1.Query
osmosis.gamm.v1beta1.Query
osmosis.poolmanager.v1beta1.Query
osmosis.protorev.v1beta1.Query
osmosis.smartaccount.v1beta1.Query
osmosis.superfluid.Query
osmosis.tokenfactory.v1beta1.Query
osmosis.txfees.v1beta1.Query
...
```

The node itself exposes around 50 services once the `cosmos.*`, `ibc.*`, and `cosmwasm.*` ones are counted; those resolve from the cosmos-sdk set (and, for CosmWasm and IBC, the corresponding Buf Schema Registry modules).

#### Calling a method

An RPC call against the public endpoint, with the method resolved from the local descriptor set:

```bash
grpcurl -protoset osmosis.protoset grpc.osmosis.zone:443 osmosis.poolmanager.v1beta1.Query/Params
```

This returns the live poolmanager parameters as JSON (the pool creation fee in Noble USDC, the 0.1% default taker fee, and the fee distribution parameters).

#### Query for historical state using grpcurl

You may also query for historical data by passing some [gRPC metadata](https://github.com/grpc/grpc-go/blob/master/Documentation/grpc-metadata.md) to the query: the `x-cosmos-block-height` metadata should contain the block to query. Using the cosmos-sdk descriptor set from above:

```bash
grpcurl \
    -protoset cosmos-sdk.protoset \
    -H "x-cosmos-block-height: 68021983" \
    -d '{"address":"osmo19a7pmytd9vk26l57q8chacuprsmx05g23mg6yc"}' \
    grpc.osmosis.zone:443 \
    cosmos.bank.v1beta1.Query/AllBalances
```

The public node is pruned, so it serves only recent heights; pick a height within the retention window (the example height was recent when this page was verified) or the query returns a pruning error.

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
