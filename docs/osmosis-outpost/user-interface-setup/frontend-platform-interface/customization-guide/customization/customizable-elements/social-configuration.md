---
sidebar_position: 9
sidebar_label: Social Configuration
description: The social configuration variables.
---

# Social Configuration

This configuration allows you to set information related to your project in the
platform.

## Tooltip links

The following links are related to the label contained inside the Tooltip 
element showing when you click in the top right button of the platform "...".

### ANALYTICS_LINK

This is a url to add as link to the label "Analytics". We recommend you to use 
a link to your DeFi project analytics, as the one provided by the 
[info.osmosis.zone](https://info.osmosis.zone) service.

E.g., for the Osmosis project, we recommend you to use
[info.osmosis.zone/token/OSMO](https://info.osmosis.zone/token/OSMO).

```bash
NEXT_PUBLIC_ANALYTICS_LINK=
```

### DOCS_LINK

This is a url to add as link to the label "Documentation". We recommend you to 
use a link to your project documentation.

E.g., for the Osmosis project, we recommend you to use
[docs.osmosis.zone](https://docs.osmosis.zone).

```bash
NEXT_PUBLIC_DOCS_LINK=
```

### GITHUB_LINK

This is a url to add as link to the label "GitHub". Use the link to your 
GitHub organization/project.

E.g., for the Osmosis project, we recommend you to use
[github.com/osmosis-labs](https://github.com/osmosis-labs).

```bash
NEXT_PUBLIC_GITHUB_LINK=
```

## Extra link

The following links are related to the elements contained inside the banner 
showing below the swap widget in the platform.

### EXTRA_LINK

This is a url to add as link to the banner below the swap widget in the 
platform. Here you can set any link you want.

```bash
NEXT_PUBLIC_EXTRA_LINK=
```

### EXTRA_TITLE

This is a label to use as title in the banner below the swap widget in the 
platform. Here you can set any text you want.

> **__HINT__**: Keep the text shorter than 50 chars.

```bash
NEXT_PUBLIC_EXTRA_TITLE=
```

### EXTRA_SUBTITLE

This is a label to use as subtitle in the banner below the swap widget in the 
platform. Here you can set any text you want.

> **__HINT__**: Keep the text shorter than 70 chars.

```bash
NEXT_PUBLIC_EXTRA_SUBTITLE=
```