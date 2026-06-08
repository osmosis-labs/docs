---
description: "Custom transaction authentication: session keys, spend limits, and more."
sidebar_position: 10
---

# Smart Accounts

The `x/smart-account` module lets a regular Osmosis account opt into custom transaction-authentication logic on top of (or instead of) the standard "one key signs everything" check. The account stays an ordinary account at the keeper level; what changes is how its transactions are authenticated.

This is the primitive that closes the gap between the basic wallet model and the UX users expect from the rest of the web: rotating keys without losing the account, granting a single device or session limited spending power, using a hardware key for high-value actions while a hot key handles trading, and recovering from a lost device without seed-phrase gymnastics. The module does not ship any of those as features directly. It provides composable building blocks, and products like One Click Trading on the Osmosis frontend assemble them into something user-facing.

In practice a single account can verify against multiple keys or signature schemes, compose rules with `AllOf` and `AnyOf`, restrict authentication to specific message types or contents, or delegate authentication entirely to a CosmWasm contract. That last option is how policy engines like spend limits and time-bounded session keys are built. Authentication is opt-in per transaction: by default the standard signature check runs, and a transaction only routes through a chosen authenticator when it explicitly selects one.

For the integrator surface (the messages to manage authenticators, the authenticator types registered onchain, the transaction flow, the available queries, and how the frontend wires One Click Trading), see [Smart Accounts and Authenticators](/integrate/features/smart-accounts) in the Integrate section.
