---
sidebar_position: 8
sidebar_label: Theme Configuration
description: The theme configuration variables.
---

# Theme Configuration

This configuration allows you to use the brand style on the platform, through
the colours and logo selection.

This configuration affects the style of the platform.

### THEME_COLOURS

This is the colours palette affecting the theme. To better understand how the
palette is linked to the elements in the platform, you can give a look at the
corresponding [Theme Customization](../../theme-customization) page. From here
you will see specifically which colour each element is linked to.

The following values are the example ones used to construct the nabla branded 
version of the platform.

```bash
NEXT_PUBLIC_THEME_PRIMARY_COLOR=#FFFFFF
NEXT_PUBLIC_THEME_SECONDARY_COLOR=#242424
NEXT_PUBLIC_THEME_BACKGROUND_COLOR=#121212
NEXT_PUBLIC_THEME_INTERMEDIATE_COLOR=#888888
NEXT_PUBLIC_THEME_ERROR_COLOR=#E94141
NEXT_PUBLIC_THEME_SUCCESS_COLOR=#0EAB60
NEXT_PUBLIC_THEME_TEXT_COLOR=#FFFFFF
NEXT_PUBLIC_THEME_BG_ELEMENTS_COLOR=#0A0A0A
NEXT_PUBLIC_THEME_TEXT_BUTTON_COLOR=#000000
NEXT_PUBLIC_THEME_BG_PRIMARY_GRADIENT_COLOR=#FFFFFF
NEXT_PUBLIC_THEME_BG_SECONDARY_GRADIENT_COLOR=#6B6B6B
```

### THEME_LOGO

This is the relative path to the logo to use in the platform. It is generated
following the
[logo generation guidelines](../../design-customization#how-to-provide-the-logo).

```bash
NEXT_PUBLIC_THEME_LOGO=/images/nabla-bg.svg
```

You need to add it at `apps/web/public/images/your-logo.svg`.

### Favicon

To provide a **favicon** to the platform, you need to add it at the following path:

```bash
apps/web/public/images/favicon.ico
```