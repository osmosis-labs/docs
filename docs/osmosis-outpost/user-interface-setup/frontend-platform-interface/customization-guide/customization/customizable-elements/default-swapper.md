---
sidebar_position: 7
sidebar_label: Default Swapper Configuration
description: The default swapper configuration variables.
---

# Default Swapper Configuration

This configuration allows you to set the **FROM** and the **TO** default tokens
to use when the users land on your platform. If you do not add these variables, 
the platform will get the first two assets from the assets list.

This configuration affects the logic of the platform.

### SWAP_FROM_DISPLAY

This is the **FROM** token you want to use as the default one. If you want to 
specify this value, you must use the token DENOM (e.g., **OSMO**).

```bash
NEXT_PUBLIC_SWAP_FROM_DISPLAY=
```

### SWAP_TO_DISPLAY

This is the **TO** token you want to use as the default one. If you want to 
specify this value, you must use the token DENOM (e.g., **OSMO**).

```bash
NEXT_PUBLIC_SWAP_TO_DISPLAY=
```