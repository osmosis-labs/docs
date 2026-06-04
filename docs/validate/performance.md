---
title: Performance and Profiling
sidebar_position: 9
---
# Performance & Profiling

## Profiling with pprof

1. Query the pprof cpu endpoint on the node host: 
   * **CPU**: `curl -X GET localhost:6060/debug/pprof/profile?seconds=<number> > <filename>`
   * **Heap**: `curl -X GET localhost:6060/debug/pprof/heap?seconds=<number> > <filename>`
   * can query from your local machine by substituting localhost with the IP of the node, depending on your network setup. By doing this, can skip step 2.
2. If querying on the node host, SCP the file to yourself: `scp <filename> <user>@<host>:<path>`
   * E.g. `scp <filename> root@143.182.133.71:/home/roman/osmosis/pprof`
   * ensure that your ISP or firewall is not blocking the file transfer
3. Run a web server and open up a browser`go tool pprof -http=localhost:8080 <filename>`
   * `graphviz` must be installed
### Memory

#### Causes
The following cause memory issues in Go
– Creating substrings and subslices.
– Wrong use of the defer statement.
– Unclosed HTTP response bodies (or unclosed resources in general).
– Orphaned hanging go routines.
– Global variables.

#### Interpreting Output
– `inuse_space`: Means pprof is showing the amount of memory allocated
and not yet released.
– `inuse_objects`: Means pprof is showing the amount of objects allocated
and not yet released.
– `alloc_space`: Means pprof is showing the amount of memory allocated,
regardless if it was released or not.
– `alloc_objects`: Means pprof is showing the amount of objects allocated,
regardless if they were released or not.

– `flat`: Represents the memory allocated by a function and still held by that
function.
– `cum`: Represents the memory allocated by a function or any other function
that is called down the stack.


### Useful links
- [Pprof Doc](https://pkg.go.dev/net/http/pprof)
- [Graphviz Download](https://graphviz.org/download/)
- [Using SCP](https://linuxize.com/post/how-to-use-scp-command-to-securely-transfer-files/)
- [Advanced Go Profiling Talk (YouTube)](https://www.youtube.com/watch?v=xxDZuPEgbBU)
- [Notes from the talk above](https://github.com/bradfitz/talk-yapc-asia-2015/blob/master/talk.md)
- [Memory Leaking Scenarios](https://go101.org/article/memory-leaking.html)
- [Great blogpost about profiling heap](https://jvns.ca/blog/2017/09/24/profiling-go-with-pprof/)

## Benchmarking

### Best practices

- Running the benchmarks on an idle machine not running on battery
- Use `-benchmem` to also get stats on allocated objects and space
- Use `benchstat` to compare performance across different git branches
- Adding -run='$^' or -run=- to each go test command to avoid running the tests too

Benchstat sample output for illustration:
```
name                old time/op    new time/op    delta
Decode-4               2.20s ± 0%     1.54s ± 0%   ~     (p=1.000 n=1+1)
```

For benchstat specifically:
- Using higher -count values if the benchmark numbers aren't stable
   * if you don't, your sample size would be too small and `delta` might not be reported (like in example above) because it is not significant enough.
   * if you do, might take longer since you need multiple runs to get a good sample size
   * people recommend 5 as a good enough sample size


Adding -run='$^' or -run=- to each go test command to avoid running the tests too

### Example
Let's assume that we are working on branch `osmosis/string` and added some performance improvements to `tree.String()`.

As a result, we would like to bench test like in [the following](https://github.com/osmosis-labs/iavl/blob/141d98dba805ca1960160b1ec98c6f243792e25c/nodedb_test.go#L33-L46) in iavl.

To get a nice bench summary we would follow these steps:

1. Checkout the `master` branch and get the output of the benchmark:
```
git checkout master

go test -benchmem -run=^$ -bench ^BenchmarkTreeString$ -benchmem -count 5 github.com/cosmos/iavl > bench_string_old.txt
```

2. Checkout our `osmosis/string` branch and get the output of the benchmark:
```
git checkout master

go test -benchmem -run=^$ -bench ^BenchmarkTreeString$ -benchmem -count 5 github.com/cosmos/iavl > bench_string_new.txt
```

3. Compare the two outputs with `benchstat`:
```
benchstat bench_string_old.txt bench_string_new.txt
```

4. Evaluate the output and attach to your PR, if needed


### Useful links:
- [Benchstat Doc](https://pkg.go.dev/golang.org/x/perf/cmd/benchstat)
- [Tips for Newcomers](https://github.com/golang/go/issues/23471)
