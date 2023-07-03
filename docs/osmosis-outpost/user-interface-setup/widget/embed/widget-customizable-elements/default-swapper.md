---
sidebar_position: 2
sidebar_label: Default Swapper Configuration
description: The default swapper configuration variables.
---

# Default Swapper Configuration

This configuration allows you to set the **FROM** and the **TO** default tokens
to use when the dApp loads your widget. If you do not add these variables, 
the widget will get the first two assets from the assets list.

### From

This is the **FROM** token you want to use as the default one. If you want to 
specify this value, you must use the token DENOM (e.g., **OSMO**).

```js
from?: string;
```

### To

This is the **TO** token you want to use as the default one. If you want to 
specify this value, you must use the token DENOM (e.g., **OSMO**).

```js
to?: string;
```