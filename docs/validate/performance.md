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

1. Query the pprof endpoint on the node host (bound to loopback):
   * **CPU**: `curl -X GET localhost:6060/debug/pprof/profile?seconds=<number> > <filename>`
   * **Heap**: `curl -X GET localhost:6060/debug/pprof/heap > <filename>`
   * To query from your own machine instead, forward the port over SSH rather than binding pprof publicly: `ssh -L 6060:localhost:6060 <user>@<host>`, then curl `localhost:6060` locally.
2. If querying on the node host, SCP the file to yourself: `scp <user>@<host>:<path>/<filename> .`
   * ensure that your ISP or firewall is not blocking the file transfer
3. Run a web server and open up a browser`go tool pprof -http=localhost:8080 <filename>`
   * `graphviz` must be installed
### Memory

#### Causes
The following cause memory issues in Go
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
