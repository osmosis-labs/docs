---
sidebar_position: 2
sidebar_label: Theme Customization
description: How the widget is linked to colours.
---

# Theme Customization

The set of custom *colours and contents* are linked to the configuration theme.
In this scenario, you can see how the elements in the widget are linked to the 
**colours palette**.

To see how to edit the style of the Figma design file of this widget, please 
give a look at the related **Platform interface** customizations, in
[its documentation](../../frontend-platform-interface/customization-guide/design-customization).

### Swap screen
The first screen of the widget is the swap one. Here you can see, as the main
elements, the two boxes containing the token selectors and the numeric value 
inputs, and a "speaking" button, which helps the user performing some actions
like connect the wallet and swap the tokens.

![Swap screen image](/img/user-interface-setup/widget/customizability/1.png "swap screen")

* * *

### Token selector
When you need to select the "from" and "to" tokens from the widget, you access
the token selector screen. Here, you can identify, as main elements, a 
searchbar, and a list of tokens.
![Token Selector screen image](/img/user-interface-setup/widget/customizability/2.png "select token screen")

* * *

### Transaction Status
Once you start a swap, you can track the status of the operations by clicking 
on the txs icon in the top right of the widget. Here, you can see the status of
the swap, by looking at all the steps.

![Transaction status screen image](/img/user-interface-setup/widget/customizability/3.png "transaction status screen")

* * *

### Recover Tokens
If something happens after the tokens are swapped and they cannot be shipped to
your account, they are guarded by the Osmosis smart contract. You can recover 
them by through a tx done with the associated *recovery account*. Here, you can
see which tokens you are able to recover, and there is a button to recover them.

![Recover tokens screen image](/img/user-interface-setup/widget/customizability/4.png "recover tokens screen")

* * *

### Settings
You can set the *slippage tolerance* and the recovery address. You can perform 
this action through the settings screen. Here, you can see a list of buttons 
that allow you to select one of the default values available for the slippage 
tolerance, and a numeric input box that let you insert a custom value. In the 
bottom of the page, you have the ability to set a valid osmosis address as the
recovery address. Please, read carefully 
[this](./../../../user-guide/recovery-address) page before to change this value.

![Settings screen image](/img/user-interface-setup/widget/customizability/5.png "settings screen")

> **_NOTE:_** If you are looking for the **Platform interface** customizations, please give
> a look at 
> [its documentation](../../frontend-platform-interface/customization-guide/theme-customization).
