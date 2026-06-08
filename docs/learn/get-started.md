---
description: Set up a wallet and deposit your first funds onto Osmosis.
sidebar_position: 3
---
# Getting Started

<!-- TODO(accuracy, MTN-113): the screenshots on this page date to 2022 and show
     the pre-redesign app UI, which no longer matches app.osmosis.zone. They need
     recapturing against the current UI (see the PR description for the list). -->

This page gets you set up: install a wallet, connect to the app, and deposit funds onto Osmosis over IBC. Once you have funds, see [How Trading Works](/learn/how-trading-works) to make your first swap and [Providing Liquidity](/learn/providing-liquidity) to start earning.

## Set up a Wallet

Before opening the app, install a Cosmos wallet such as [Keplr](https://www.keplr.app/).

## Open the App

Go to [app.osmosis.zone](https://app.osmosis.zone/).

![The Osmosis app](@site/docs/assets/started-trade-page.png)

## Connect Wallet

Connect your wallet and click Approve. This confirms you are connecting to app.osmosis.zone on the chain `osmosis-1`. Always check the app name and network (`osmosis-1`) in the approval popup before approving.

![Connecting a wallet to Osmosis](@site/docs/assets/connect-wallet.png)

## Deposit Funds

Most assets reach Osmosis over IBC from their home chain. To bring funds in:

1. Go to the Portfolio page and click the deposit link next to the asset you want to bring in. For this example we deposit ATOM.
2. Accept the connection to the asset's home chain (here, `cosmoshub-4`).

![Depositing an asset from the Portfolio page](@site/docs/assets/started-portfolio-page.png)

3. Choose the amount to deposit and click Deposit, then approve the transaction in your wallet.
4. Once the transfer completes, a series of confirmation notifications appears, including the IBC confirmation. Your balance is then available on Osmosis.

![A completed deposit with IBC confirmation](@site/docs/assets/confirm-2.png)

## Next steps

You are ready to use Osmosis. From here:

- **Trade:** [How Trading Works](/learn/how-trading-works) explains pools, price impact, slippage, and fees, then make a swap from the Trade page.
- **Earn:** [Providing Liquidity](/learn/providing-liquidity) covers supplying assets to a pool and earning fees and incentives.
- **Stake and vote:** [Staking and Governance](/learn/staking-and-governance) covers delegating OSMO and participating in governance.
