---
sidebar_position: 1
sidebar_label: Theme Configuration
description: The theme configuration variables.
---

# Theme Configuration

This configuration allows you to use the brand style on the widget, through
the colours palette configuration.

### Theme

This is the colours palette affecting the theme. To better understand how the
palette is linked to the elements in the platform, you can give a look at the
corresponding 
[Theme Customization](../../customization-guide/theme-customization.md) page. 
From here you will see specifically which colour each element is linked to.

The `Theme` type of the object is the following: 

```js
Theme: {
    /**
    * Theme colors
    */
    colors: {
        primary: string;
        secondary: string;
        background: string;
        intermediate: string;
        error: string;
        success: string;
        text: string;
        'bg-elements': string;
        'text-button': string;
    };
    /**
    * Default font family for the theme, we only 
    * use medium and semibold font weight
    */
    fontFamily: string;
}
```