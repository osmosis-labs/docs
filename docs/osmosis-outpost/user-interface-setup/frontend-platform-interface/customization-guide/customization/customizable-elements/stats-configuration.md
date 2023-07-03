---
sidebar_position: 10
sidebar_label: Stats Configuration
description: The stats configuration variable.
---

# Stats Configuration

This configuration allows you to set the current base url for the current 
liquidity data source. At the moment, the logic is realized to only work 
with **imperator** as the unique *data source*. It would probably also be 
possible, with future updates, to provide other sources, **if needed**.

This configuration affects the logic of the platform.

### ANALYTICS_BASE_URL

This is a url to the *imperator api base url*. The default value is the 
following, as per the version available at the time of writing this 
documentation.

> **__HINT__**: Do not change if not strictly needed.

```bash
NEXT_PUBLIC_ANALYTICS_BASE_URL=https://api-osmosis.imperator.co/
```