---
sidebar_position: 3
sidebar_label: On Asset Change
description: An event fired when an asset changes.
---

# On Asset Change

This configuration allows you to configure a callback you want to trigger when
"from" or "to" tokens are changed.

### onAssetsChange

This is a function callback to which the event pass the "from" and "to" tokens
as parameters.

```js
onAssetsChange?: (from: SelectOption, to: SelectOption) => void;
```