
# Infrastructure

Please use the links below to reference architectures for common osmosis infrastructure setups. 
The reference architecture is specified ad Infrastructure As Code (IAC) using [Terraform](https://www.terraform.io/) and can be used as a starting point to deploy blockchain nodes.

::: tip
 Our goal is to create Cloud Agnostic infrastructure, We are starting with DigitalOcean first as the it is the easiest way to get up and running.
 :::
 
 ## Resources
 <div class="cards twoColumn" >
   <a href="https://github.com/osmosis-labs/infrastructure" class="card">
     <img src="/img/infra.svg" class="filter-icon" />
     <div class="title">
     Infrastructure
     </div>
     <div class="text">
    Main repository containing all of the open sourced infrastructure.
     </div>
   </a>
</div>

## DigitalOcean Terraform Modules
<div class="cards twoColumn" >

  <a href="do/single-rpc" class="card">
    <img src="/img/do.svg" class="filter-icon" />
    <div class="title">
    Single RPC node
    </div>
    <div class="text">
        Runs a single-rpc node with the latest osmosisd binary and automatically syncs the state from a pruned snapshot.
    </div>
  </a>
  <a href="do/single-rpc-with-monitor-alerts" class="card">
    <img src="/img/do.svg" class="filter-icon" />
    <div class="title">
    Single RPC node with Monitor Alerts
    </div>
    <div class="text">
        Runs the latest osmosisd binary and automatically syncs the state from a pruned snapshot with monitor alerts.
    </div>
  </a>
  
  <a href="do/single-rpc-with-floating-ip" class="card">
    <img src="/img/do.svg" class="filter-icon" />
    <div class="title">
    Single RPC with floating IP
    </div>
    <div class="text">
        Runs the latest osmosisd binary and automatically with pruned snapshot syncs behind a floating IP.
    </div>
  </a>
  
  <a href="do/loadbalanced-rpc" class="card">
    <img src="/img/do.svg" class="filter-icon" />
    <div class="title">
    Load Balanced RPC node
    </div>
    <div class="text">
        Runs the latest osmosisd binary and automatically syncs the state from a pruned snapshot behind a load balancer.
    </div>
  </a>
  
  <a href="do/loadbalanced-rpc-with-monitor-alerts" class="card">
    <img src="/img/do.svg" class="filter-icon" />
    <div class="title">
    Load Balanced RPC node with Monitor Alerts
    </div>
    <div class="text">
        Runs the latest osmosisd binary and automatically syncs the state from a pruned snapshot behind a load balancer.
    </div>
  </a>

 </div>
