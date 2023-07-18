---
sidebar_position: 4
sidebar_label: Build for Production
description: How to build for a production environment.
---

# Build for Production

Assuming you have completely followed the whole guide up to this point, you 
have your working and fully customized version of the platform. In such a 
scenario, to build the dApp for a production environment, you need to prepare 
the libraries builds and then build the web application.

### 1. Build prod for stencil library of web components:

```bash
nx run outpost-web-ui:build:production
```

### 2. Build prod for react library of UI components:

```bash
nx run outpost-web-ui-react:build:production
```

### 3. You can now proceed building your dApp for a production stage:

```bash
nx build web --configuration=production
```

And... you are ready to [deploy](https://nextjs.org/docs/deployment) your 
brand-new, fully customized platform, allowing your users to exchange their 
tokens with low effort and with a user experience all to envy!