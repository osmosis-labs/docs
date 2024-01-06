---
sidebar_position: 5
sidebar_label: Outpost Contract Configuration
description: The outpost contract configuration variables.
---

# Outpost Contract Configuration

This configuration allows you to set the value of the Osmosis smart contracts
you want to use in your platform implementation.

This configuration affects the logic of the platform.

### SWAPROUTER_CONTRACT_ADDRESS

This is the address to the **Osmosis** `swaprouter` *smart contract* you want
your platform uses.

> **__NOTE__**: The address in the following example is related to a contract 
instance on the Osmosis testnet chain.

```bash
NEXT_PUBLIC_SWAPROUTER_CONTRACT_ADDRESS=osmo1qw6npqrhgt0k4wvjecyggsyy0u492sg26wwtgttrmwc2xxelghgqkykpf9
```

### CROSSCHAIN_SWAPS_CONTRACT_ADDRESS

This is the address to the **Osmosis** `crosschain-swaps` *smart contract* you
want your platform uses.

> **__NOTE__**: The address in the following example is related to a contract 
instance on the Osmosis testnet chain.

```bash
NEXT_PUBLIC_CROSSCHAIN_SWAPS_CONTRACT_ADDRESS=osmo1efakw4was99usxve258p58a5a26f0yt072gvyej5zr4lv5r0hxqqsddqgg
```

## Useful Information
The following table resume the information for the Osmosis *mainnet* and 
*testnet* smart contracts at the time of writing.

> **__IMPORTANT__**: Please **ensure that you are using the right smart** 
**contract versions**! The following information **could be not up to date**, so do your own 
research to ensure you are on the right way.

| Contract         | Osmosis Testnet (osmo-test-5)                                     | Osmosis Mainnet                                                   |
| ---------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| swaprouter       | `osmo1qw6npqrhgt0k4wvjecyggsyy0u492sg26wwtgttrmwc2xxelghgqkykpf9` | `osmo1fy547nr4ewfc38z73ghr6x62p7eguuupm66xwk8v8rjnjyeyxdqs6gdqx7` |
| crosschain-swaps | `osmo1efakw4was99usxve258p58a5a26f0yt072gvyej5zr4lv5r0hxqqsddqgg` | `osmo1uwk8xc6q0s6t5qcpr6rht3sczu6du83xq8pwxjua0hfj5hzcnh3sqxwvxs` |
