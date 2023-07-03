---
sidebar_position: 6
sidebar_label: Endpoint Options
description: The IBC configuration variables.
---

# Customization of Endpoint Options

This configuration allows you to override the default "chains endpoints" your
widget uses to work. Remember that you could need some other chain (more than 
your only outpost chain) when you perform the swap (give a look at the related
point in the [FAQs](http://localhost:3000/faq#how-can-i-add-assets-to-the-platform)).

### Endpoint Options

This is a variable which uses a type provided by `cosmos-kit`:
```js
endpointOptions: EnpointOptions;
```

More specifically, the type of the object is available at the 
`@cosmos-kit/core`:

```js
ChainName: string;

Endpoints {
    rpc?: (string | ExtendedHttpEndpoint)[];
    rest?: (string | ExtendedHttpEndpoint)[];
    isLazy?: boolean;
}

EndpointOptions {
    isLazy?: boolean;
    endpoints?: Record<ChainName, Endpoints>;
}
```