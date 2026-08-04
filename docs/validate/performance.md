---
description: Profile and diagnose the performance of a running node.
title: Performance and Profiling
sidebar_position: 8
---
# Performance & Profiling

## Profiling with pprof

:::caution Keep pprof private
The pprof endpoint exposes internal process state and profiling it adds load. Leave it bound to loopback on the node and reach it over an SSH tunnel. Do not expose it on a public interface. CPU profiling in particular costs measurable performance while it runs, so profile deliberately rather than leaving it enabled.
:::

### Enabling pprof

pprof is **off by default**: `pprof_laddr` under `[rpc]` in `~/.osmosisd/config/config.toml` is
empty. Bind it to loopback only, then restart the node:

```toml
[rpc]
# pprof listen address (https://golang.org/pkg/net/http/pprof)
pprof_laddr = "localhost:6060"
```

```bash
sudo systemctl restart cosmovisor
```

Confirm it is listening, and that it is not reachable from outside the host:

```bash
ss -ltnp | grep 6060
```

The address must show as `127.0.0.1:6060`, not `0.0.0.0:6060`. Turn it back off by clearing the value
once you have finished profiling.

### Collecting a profile

1. Query the pprof endpoint on the node host (bound to loopback):
   * **CPU**: `curl -X GET localhost:6060/debug/pprof/profile?seconds=<number> > <filename>`
   * **Heap**: `curl -X GET localhost:6060/debug/pprof/heap > <filename>`
   * To query from your own machine instead, forward the port over SSH rather than binding pprof publicly: `ssh -L 6060:localhost:6060 <user>@<host>`, then curl `localhost:6060` locally.
2. If querying on the node host, SCP the file to yourself: `scp <user>@<host>:<path>/<filename> .`
   * ensure that your ISP or firewall is not blocking the file transfer
3. Run a web server and open up a browser`go tool pprof -http=localhost:8080 <filename>`
   * `graphviz` must be installed
### What to profile on an Osmosis node

Choose a profiling duration that spans the behaviour you are chasing. A CPU profile of
`seconds=30` covers several blocks and is usually enough for steady-state work; extend it to
`seconds=120` or more when investigating something that only appears intermittently. Longer
profiles cost more performance while running, so avoid leaving one going indefinitely on a
validator.

Osmosis-specific things worth knowing before you conclude a node is unhealthy:

- **Epoch blocks are slow by design.** Once per day the epoch hook distributes incentives, prunes
  TWAP records, and updates the ProtoRev highest-liquidity routes. That block takes far longer than
  a normal one. If your profile or your block-time alerting was captured across the epoch boundary,
  the spike is expected rather than a regression. Compare against a non-epoch block before
  investigating further.
- **Pruning settings dominate disk and memory behaviour.** An archive node holds far more state than
  a pruned one, and the `pruning-*` values in `app.toml` matter more than most Go-level tuning. See
  [Node Configuration](/validate/node-configuration).
- **Check block times against the network first.** If the whole network is slow, the cause is not
  local. Compare your node's block interval to a public node before profiling.

For where to look when a node is falling behind, and which metrics to alert on, see
[Monitoring](/validate/monitoring).

### Memory

#### Common causes in Go
- Creating substrings and subslices.
- Wrong use of the defer statement.
- Unclosed HTTP response bodies (or unclosed resources in general).
- Orphaned hanging go routines.
- Global variables.

#### Interpreting Output
- `inuse_space`: Means pprof is showing the amount of memory allocated
and not yet released.
- `inuse_objects`: Means pprof is showing the amount of objects allocated
and not yet released.
- `alloc_space`: Means pprof is showing the amount of memory allocated,
regardless if it was released or not.
- `alloc_objects`: Means pprof is showing the amount of objects allocated,
regardless if they were released or not.

- `flat`: Represents the memory allocated by a function and still held by that
function.
- `cum`: Represents the memory allocated by a function or any other function
that is called down the stack.


### Useful links
- [Pprof Doc](https://pkg.go.dev/net/http/pprof)
- [Graphviz Download](https://graphviz.org/download/)
- [Using SCP](https://linuxize.com/post/how-to-use-scp-command-to-securely-transfer-files/)
- [Advanced Go Profiling Talk (YouTube)](https://www.youtube.com/watch?v=xxDZuPEgbBU)
- [Notes from the talk above](https://github.com/bradfitz/talk-yapc-asia-2015/blob/master/talk.md)
- [Memory Leaking Scenarios](https://go101.org/article/memory-leaking.html)
- [Great blogpost about profiling heap](https://jvns.ca/blog/2017/09/24/profiling-go-with-pprof/)
