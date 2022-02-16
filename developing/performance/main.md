# Profiling with pprof

1. Query the pprof cpu endpoint on the node host: 
   * **CPU**: `curl -X GET localhost:6060/debug/pprof/profile?seconds=<number> > <filename>`
   * **Heap**: `curl -X GET localhost:6060/debug/debug/pprof/heap?seconds=<number> > <filename>`
   * can query from your local machine by substituting localhost with the IP of the node, depending on your network setup. By doing this, can skip step 2.
2. If querying on the node host, SCP the file to yourself: `scp <filename> <user>@<host>:<path>`
   * E.g. `scp <filename> root@143.182.133.71:/home/roman/osmosis/pprof`
   * ensure that your ISP or firewall is not blocking the file transfer
3. Run a web server and open up a browser`go tool pprof -http=localhost:8080 <filename>`
   * `graphviz` must be installed

#### Useful links:
- [https://pkg.go.dev/net/http/pprof](https://pkg.go.dev/net/http/pprof)
- [https://graphviz.org/download/](https://graphviz.org/download/)
- [Using SCP](https://linuxize.com/post/how-to-use-scp-command-to-securely-transfer-files/)
