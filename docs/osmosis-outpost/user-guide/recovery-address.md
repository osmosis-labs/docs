---
sidebar_position: 3
sidebar_label: Set recovery address
description: How to set a custom recovery address.
---

# How to set a custom recovery address

Since some steps could fail during the swap process and, *once they are 
swapped* but not received, the *tokens which are guarded by the smart contract*
can be recovered by a recovery address, you can set it *through the user*
*interface*. 

> **_IMPORTANT:_**  The recovery address can be set for the next swap. It 
cannot be modified once the swap started.

By default, it is set to the **osmosis address** associated to the
**connected wallet**.

> **_IMPORTANT:_**  If the recovery address is associated to a wallet you do 
not own, you will not be able to recover funds if the swap process fails.

### 1. Access the settings

To set a custom recovery address you need to access the **settings** of the 
dApp. To do this, you must click on the *settings icon* in the top right corner
of the interface.

![Access the settings image](/img/user-guide/settings/settings.jpg "access the settings")

### 2. Enter the custom recovery address

At this point, you can set any valid osmosis address as the recovery address. 
Despite this, however, it is **important** that you remember the fact that 
*if you do not own the wallet associated with the address you are setting up*, 
**you will not be able to access the funds** if an error occur in the swap 
process.

![Enter recovery address image](/img/user-guide/settings/enter-address.jpg "enter the recovery address")

### 3. Save the modification

Now you have to save the edits you performed, close the settings and... then 
you're done!

![Save and Close image](/img/user-guide/settings/save-and-close.jpg "save and close the settings")