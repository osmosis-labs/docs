---
sidebar_position: 2
sidebar_label: NextJS Embedding
description: How to embed the widget on a NextJS app.
---

# NextJS Embedding

After the installation of the npm package as outlined in the 
[related documentation](./installation), to add the widget to your NextJS app,
you need to transpile the module.

Assuming you are using **NextJS 13**, you can automatically transpile and 
bundle dependencies from local packages or from external dependencies. 
This procedure replaces the next-transpile-modules package.

To do this, you have to add the corresponding configuration in the 
nextConfig inside the `next.config.js` file:

<!-- TODO: add official name of the npm package -->
```js
const nextConfig = {
    transpilePackages: ['@nabla-studio/outpost-widget-react'],
    ...
}
```

To continue the embedding operations, you can follow the 
[related documentation](./react).