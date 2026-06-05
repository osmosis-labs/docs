---
description: A configurable safety cap on how much of an asset can move over IBC.
sidebar_position: 6
---

# IBC Rate Limit

IBC rate limiting is a safety control on how much of an asset can move across IBC in a given window of time. It is a circuit breaker for the bridge: if something goes wrong, it caps the damage.

## Why it matters

Most of the assets on Osmosis arrive over IBC, so a bug or exploit, whether in Osmosis, a counterparty chain, or IBC itself, could in the worst case try to drain large amounts of an asset quickly. A rate limit puts a ceiling on the net flow of each asset per time period. A transfer that would exceed the limit is rejected rather than executed, which buys time to respond to an incident instead of losing funds instantly.

The limits are configurable by governance per asset, and are set as a percentage of the asset's total on Osmosis, with separate inflow and outflow thresholds. Under normal conditions the limits are well above ordinary volume, so regular users never notice them; they only bite during abnormal, potentially malicious spikes.

For the module specification (rate limit types, parameterization, and how the quotas are tracked), see the [IBC Rate Limit module page](/build/chain/ibc-rate-limit) under Build.
