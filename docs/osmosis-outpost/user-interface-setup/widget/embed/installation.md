---
sidebar_position: 1
sidebar_label: Widget Installation
description: How to install the widget.
---

# Widget Installation

Since it is exported as a React component, you can embed the *widget* of 
**your Osmosis outpost** as a component on NextJS and other classic react apps. 

> **_NOTE_:**  The widget was realized using React 18. We strongly encourage 
> you to use this version of React to embed the widget.

To do this, you need to execute the following steps:

### 1. Install the peer dependencies

```bash
npm i @cosmos-kit/react @cosmos-kit/core osmojs @keplr-wallet/stores chain-registry cosmjs-types @cosmjs/stargate
```

### 2. Install the widget

Install the widget package:
<!-- TODO: add official name of the npm package -->
```bash
npm i @nabla-studio/outpost-widget-react
```

### 3. Embed the widget

The embedding process differs on whether you want to embed the widget directly
on a NextJS or a React application:

- For NextJS app, please follow the [NextJS embedding guide](./nextjs)
- For React app, please follow the [React embedding guide](./react)

> **_NOTE_:**  To get an example of a dApp embedding the widget, please give a
> look to our 
> [Frontend Platform Interface documentation](../frontend-platform-interface/getting-started.md).