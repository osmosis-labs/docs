---
sidebar_position: 4
sidebar_label: FAQ
description: How to recover funds if the swap fails.
---

# Frequently Asked Questions

### What is a swap?
A swap involves **trading one token for a different one**. To perform such 
an operation you need an exchange. There exists both *Centralized Exchanges*
(like Binance) or *Decentralized Exchanges* (like Osmosis). 

### What exchange do I use to perform the swaps?
The Osmosis outposts use the **Osmosis decentralized exchange** to perform the
swaps. In fact, instead to build their own DEx, the outpost chains can use 
*this structure provided by Osmosis* and the *IBC technology* to increase the
*user experience* and *on-boarding process* of their platforms.

### What about the fees?
You will pay for the **IBC transaction costs** on the outpost chain and the 
**swap costs** on the Osmosis pools. The *costs for the transaction are shown*
*on the wallet you are using*, while the *costs for the swap are shown on the*
*interface*. 

### No route for this trade
If you want to perform a swap but the swap button is disabled and says 
"No route for this trade", there is no route available on the contract to 
perform this swap directly. You can try to break the operation in two 
sub-operations, or sub-swaps, maybe passing through the OSMO token.

### Not allowed
If you want to perform a swap but the swap button is disabled and says 
"Not allowed", this means that you denied the connection of the dApp to one of 
the chains involved in the swap operations. You can allow/deny such permissions
directly through your wallet (e.g., keplr).

### How can I add assets to the platform?
Assuming you have already performed all the necessary configuration on the 
**Osmosis smart contracts**, you can list new assets on the platforms by adding
them to the 
[Osmosis Outposts Assetlists](https://github.com/nabla-studio/osmosis-outposts-assetlists) 
repository.

#### ‼️ Important consideration about adding assets to the platform

The data provided through the assetlist are realized to be consumed by an
`outpost`.

For this reason, according to how an outpost is designed, you need to ensure
that all the tokens you are listing, are able to be swapped on Osmosis and
received from and sent to the `outpost chain`.
To do this, you need to list only the tokens who can reach your blockchain.

> E.g., if you are constructing the `Juno outpost` and `Stride blockchain` does
> not have configured the Packet Forward Middleware (PFM), you cannot list stride
> on your outpost, since you cannot receive your stride tokens back to the `Juno`
> `blockchain` automatically.
