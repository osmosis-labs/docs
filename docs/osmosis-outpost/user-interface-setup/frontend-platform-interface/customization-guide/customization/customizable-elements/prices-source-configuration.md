---
sidebar_position: 2
sidebar_label: Prices Source Configuration
description: The prices source configuration variable.
---

# Prices Source Configuration

This configuration allows you to set the current base url for the price source.
At the moment, the logic is realized to only work with **coingecko** as the 
unique *price source*. It would probably also be possible, with future updates,
to provide other price sources, if needed.

This configuration affects the logic of the platform.

### COINGECKO_BASE_URL

This is a url to the *coingecko api base url*. The default value is the 
following, as per the version 3, which is available at the time of writing this
documentation.

> **__HINT__**: Do not change if not strictly needed.

```bash
NEXT_PUBLIC_COINGECKO_BASE_URL=https://api.coingecko.com/api/v3/
```