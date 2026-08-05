# IBC Rate Limit

The IBC Rate Limit module adds a governance-configurable rate limit to IBC transfers. It is a safety control intended to protect assets on Osmosis in the event of:

* a bug or exploit on Osmosis
* a bug or exploit on the counterparty chain
* a bug or exploit in IBC itself

The protection comes at the cost of a potential one-way bridge liveness tradeoff during periods of unusually high deposits or withdrawals.

The module is a minimal Go package implementing an [IBC Middleware](https://github.com/cosmos/ibc-go/blob/main/docs/docs/04-middleware/01-callbacks/01-overview.md) that wraps the [ICS20 transfer](https://ibc.cosmos.network/main/apps/transfer/overview.html) app and calls into a CosmWasm contract, which holds all of the rate limiting logic. The contract source is in the [`contracts`](https://github.com/osmosis-labs/osmosis/tree/main/x/ibc-rate-limit/contracts) package and its bytecode in the [`bytecode`](https://github.com/osmosis-labs/osmosis/tree/main/x/ibc-rate-limit/bytecode) directory. Implementing the logic in CosmWasm lets Osmosis governance change this safety control without a hard fork, so limits can be adapted quickly as threats change. Note the split: the middleware's contract address is a module parameter changed by parameter-change proposal, whereas the quotas, denom restrictions, roles, and timelocks are contract state changed by execute messages, sent either by governance or by an authorized role holder.

The module supports governance-settable rate limits for high value bridged assets, providing protection for high value IBC connections.

## Motivation

Rate limiting is motivated by bridge hacks where a rate limit would have substantially reduced the amount stolen:

- Polynetwork bridge, $611 million
- BNB bridge, $586 million
- Wormhole bridge, $326 million
- Nomad bridge, $190 million
- Harmony bridge, $100 million (a rate limit alone would not have been sufficient here; it also required monitoring)
- The Dragonberry IBC vulnerability, which was found and patched before exploitation

Given a software bug on Osmosis, in IBC itself, or on a counterparty chain, the objective is to prevent a bridged asset from fully depegging. A partial depeg is recoverable in a way that a total loss is not, and without a rate limit a bridged asset can go to zero as soon as a bug is exploited. A rate limit caps the damage and signals that something may have gone wrong, giving validators and developers time to analyse the situation and protect the remaining funds.

The tradeoff is deliberate: liveness is sacrificed in the rare case of legitimate demand to move extreme amounts of funds, in exchange for bounding worst-case loss. A rate limit is the simplest automated safety control rather than a complete one, and is intended to sit alongside other controls.

## Rate limit types

Rate limits are expressed over time-based periods, such as 6-hour, daily, and weekly intervals. Each period records the relevant amount of assets at its start, and the limit is defined as a percentage of that amount. Time windows are _not_ rolling: they have discrete start and end times.

Inflow and outflow limits are set separately. All limits are based on the _net flow_ of assets on a channel pair, which prevents a denial-of-service in which someone repeatedly sends assets back and forth to trigger a limit and break liveness.

Two kinds of rate limit are defined:

* **Per denomination**, supporting limits such as "at most 30% of STARS on Osmosis can flow out in one day" or "the amount of ATOM on Osmosis can at most double per day".
* **Per channel**, limiting total inflow and outflow on a given IBC channel in USDC-equivalent terms, using Osmosis as the price oracle.

Per-denomination limits are implemented, for native and non-native denoms alike; a denom's quota capacity is derived from its current total supply on Osmosis. Channel-wide limits denominated in USDC-equivalent terms are not implemented.

These rate limits automatically "expire" at the end of the quota duration.

## Denom restrictions

Quotas cap *how much* of a denom can move. A separate control caps *where* it can move: a denom
can be restricted to an allowlist of source channels, and outbound transfers over any other
channel are rejected outright regardless of quota headroom.

The restriction is set with `SetDenomRestrictions { denom, allowed_channels }` and removed with
`UnsetDenomRestrictions { denom }`. Four properties follow from the implementation:

* **Outbound only.** Inbound packets are never checked against the allowlist; the check returns
  early for receives.
* **Empty means unrestricted.** A denom with no entry, or an entry with an empty channel list, is
  not constrained. Restriction is opt-in per denom.
* **Allowlist, not a blocklist.** Once a denom has a non-empty list, only the channels in that
  list can send it. Everything else fails with a channel-blocked error.
* **Keyed on the raw packet denom.** The restriction check runs *before* the denom normalization
  that quota paths use, so it matches `packet.data.denom` verbatim.

:::warning
That last point is a footgun. Quotas key on the normalized local denom (`ibc/HASH` for a
non-native asset), but restrictions key on the denom exactly as it appears on the outgoing packet,
which for a non-native asset is the trace form `transfer/channel-X/base`. Registering a restriction
against the `ibc/...` hash silently matches nothing and leaves the transfer unrestricted. The live
entry on mainnet is stored as `transfer/channel-6897/usat` for this reason.
:::

This is the control to reach for when a denom is only ever meant to leave over the one channel it
arrived on, which is the common case for an asset whose issuer lives on a single counterparty
chain. It is enforced independently of quotas, so a restricted denom with no quota is still
channel-locked.

Query the current allowlist for a denom:

```bash
osmosisd query wasm contract-state smart osmo17r7qdw2zk6jyw62cvwm6flmhtj9q7zd26r8zc6sqyf0pnaq46cfss8hgxg \
  '{"get_denom_restrictions":{"denom":"transfer/channel-6897/usat"}}'
```


## Parameterizing the rate limit

A rate limit period should be long enough that a breach can be assessed within it. A one-hour limit is only appropriate if a breach could realistically be triaged within the hour.

### Handling rate limit boundaries

Because windows are discrete rather than rolling, an adversary could time an extraction across a window boundary to draw close to two full quotas in quick succession.

The mitigation is to define two quotas of duration `D` offset from each other by `D/2`, so that no single moment sits near both boundaries at once.

### Inflow parameterization

The "Inflow" side of a rate limit is essentially protection against unforeseen bug on a counterparty chain.
This can be quite conservative (e.g. bridged amount doubling in one week). This covers a few cases:

* Counter-party chain B having a token theft attack
* Counter-party chain B runaway mint
* IBC theft

Parameterization is less straightforward when the counterparty chain is itself a DEX, since legitimate flows are larger and more variable, but a conservative inflow limit still bounds the exposure.

### Outflow parameterization

The "Outflow" side of a rate limit is protection against a bug on Osmosis OR IBC.
Set too low, it blocks legitimate withdrawals during periods when many users withdraw the same asset at once, such as a volatility event.

Outflow parameterization therefore trades withdrawal liveness in high-volatility periods against protection in the event of an on-Osmosis bug.

## Deployed contract

The middleware holds a single `ContractAddress` parameter pointing at the CosmWasm contract that
carries the logic. On mainnet:

| | |
|---|---|
| Contract | [`osmo17r7qdw2zk6jyw62cvwm6flmhtj9q7zd26r8zc6sqyf0pnaq46cfss8hgxg`](https://celatone.osmosis.zone/osmosis-1/contracts/osmo17r7qdw2zk6jyw62cvwm6flmhtj9q7zd26r8zc6sqyf0pnaq46cfss8hgxg) |
| Code ID | `1383` |
| cw2 name and version | `crates.io:rate-limiter` `0.1.1` |
| Creator and admin | `osmo10d07y265gmmuvt4z0w9aw880jnsr700jjeq4qp` (gov module account) |
| Source | [`x/ibc-rate-limit/contracts/rate-limiter`](https://github.com/osmosis-labs/osmosis/tree/main/x/ibc-rate-limit/contracts/rate-limiter) |

Because the logic lives in a contract rather than the state machine, quotas and restrictions can
be changed by transaction rather than by chain upgrade.

### Roles

Management messages are gated by role-based access control rather than a single owner. Query who
holds roles, and what a given account may do:

```bash
osmosisd query wasm contract-state smart osmo17r7qdw2zk6jyw62cvwm6flmhtj9q7zd26r8zc6sqyf0pnaq46cfss8hgxg '"get_role_owners"'

osmosisd query wasm contract-state smart osmo17r7qdw2zk6jyw62cvwm6flmhtj9q7zd26r8zc6sqyf0pnaq46cfss8hgxg \
  '{"get_roles":{"owner":"<address>"}}'
```

Note that `get_role_owners` and `get_message_ids` take no arguments and are encoded as bare JSON
strings, not as objects.

On mainnet the roles are held by the gov module account and by a rate-limit subDAO
(`osmo186stuv8d8wt38a7n3mfldmjw34u0srq2p7sjhz84sdv38nefua0s0ysu5l`), which carries `AddRateLimit`, `RemoveRateLimit`, `ResetPathQuota`,
`EditPathQuota`, and `ManageDenomRestrictions`. The subDAO can therefore adjust limits without a
full governance proposal for each change.

An account with a configured timelock delay has its management messages queued rather than
executed immediately. Authorization is checked when the message enters the queue; once the delay
expires, `ProcessMessages` is permissionless and any account may trigger execution.

### Inspecting live quotas

`GetQuotas` takes a channel and a denom and returns each quota on that path together with its
current flow. Most live limits are registered against the pseudo-channel `any`, which is checked
on every transfer regardless of the channel actually used:

```bash
osmosisd query wasm contract-state smart osmo17r7qdw2zk6jyw62cvwm6flmhtj9q7zd26r8zc6sqyf0pnaq46cfss8hgxg \
  '{"get_quotas":{"channel_id":"any","denom":"<denom>"}}'
```

Each entry reports the quota (`name`, `max_percentage_send`, `max_percentage_recv`, `duration` in
seconds, and the `channel_value` cached at the start of the period) alongside the `inflow`,
`outflow`, and `period_end` of the current window. An asset commonly carries several quotas of
differing duration, for example a `DAY-1` of 86400s, a `DAY-2` of 129600s (36 hours), and a
`WEEK-1` of 604800s, so that both a short burst and a sustained drain are bounded.

These are independent repeating windows of differing length, not the equal-length offset scheme
described under [Handling rate limit boundaries](#handling-rate-limit-boundaries). Periods are also
not on a fixed schedule: a period only starts when a packet updates the flow, and an expired flow
restarts lazily on the next packet, so `period_end` drifts rather than aligning to a wall clock.

## Code structure

The Go code is a minimal ICS 20 wrapper that dispatches the relevant calls to a CosmWasm contract, which implements the rate limiting functionality.

### Go Middleware

To achieve this, the middleware  needs to implement  the `porttypes.Middleware` interface and the
`porttypes.ICS4Wrapper` interface. This allows the middleware to send and receive IBC messages by wrapping 
any IBC module, and be used as an ICS4 wrapper by a transfer module (for sending packets or writing acknowledgements).

Of those interfaces, just the following methods have custom logic:

* `ICS4Wrapper.SendPacket` forwards to the contract to track value sent over an IBC channel.
* `Middleware.OnRecvPacket` forwards to the contract to track value received over an IBC channel.
* `Middleware.OnAcknowledgementPacket` forwards to the contract to undo the tracking of a sent packet when the acknowledgement is not a success.
* `OnTimeoutPacket` forwards to the contract to undo the tracking of a sent packet when the packet times out and is not relayed.

All other methods from those interfaces are passthroughs to the underlying implementations.

#### Parameters

The middleware uses the following parameters:

| Key             | Type   |
|-----------------|--------|
| ContractAddress | string |

1. **ContractAddress** -
   The contract address is the address of an instantiated version of the contract provided under `./contracts/`

### Cosmwasm Contract Concepts

Each cell of the following matrix has to be reasoned about separately:

|     Native Token     |     Non-Native Token     |
|----------------------|--------------------------|
| Send Native Token    | Send Non-Native Token    |
| Receive Native Token | Receive Non-Native Token |
| Timeout Native Send  | Timeout Non-native Send  |

(Error ACK can reuse the same code as timeout)

The tracking contract uses the following concepts

1. **RateLimit** - tracks the value flow transferred and the quota for a path.
2. **Path** - is a (denom, channel) pair.
3. **Flow** - tracks the value that has moved through a path during the current time window.
4. **Quota** - is the percentage of the denom's total value that can be transferred through the path in a given period of time (duration)

#### Messages

The deployed contract interface is defined in
[`msg.rs`](https://github.com/osmosis-labs/osmosis/blob/main/x/ibc-rate-limit/contracts/rate-limiter/src/msg.rs).

##### Query

| Query | Purpose |
| --- | --- |
| `GetQuotas` | Returns the quotas for a denom and channel path. |
| `GetRoleOwners` | Returns every account that owns one or more roles. |
| `GetRoles` | Returns the roles held by an account. |
| `GetMessageIds` | Returns all queued message IDs. |
| `GetMessage` | Returns a queued message by ID. |
| `GetDenomRestrictions` | Returns the outbound channel restrictions for a denom. |

##### Exec

| Execute message | Purpose |
| --- | --- |
| `AddPath` | Adds one or more quotas for a denom and channel path. |
| `RemovePath` | Removes a rate-limited path. |
| `ResetPathQuota` | Resets the flow used by one quota on a path. |
| `SetDenomRestrictions` | Restricts outbound transfers of a denom to an allowlist of source channels. |
| `UnsetDenomRestrictions` | Removes the outbound channel restriction for a denom. |
| `GrantRole` | Gives an account one of the contract's management roles. |
| `RevokeRole` | Removes a management role from an account. |
| `EditPathQuota` | Changes a quota's duration or send and receive percentages without replacing the entire path. |
| `RemoveMessage` | Removes a pending message from the timelock queue. |
| `SetTimelockDelay` | Sets the delay, in hours, applied to management messages submitted by an account. |
| `ProcessMessages` | Executes eligible messages from the timelock queue. This operation is permissionless. |

Management executes are protected by role-based access control, and a signer with a
configured timelock has its message queued rather than executed immediately. See
[Roles](#roles) for the role list and the queue behaviour, and
[Denom restrictions](#denom-restrictions) for the channel allowlist semantics.

##### Sudo

Sudo messages can only be executed by the chain.

* `SendPacket` - Increments the amount used from the send quota and rejects sends that exceed the quota or a denom restriction.
* `RecvPacket` - Increments the amount used from the receive quota and rejects receives that exceed the quota.
* `UndoSend` - Removes the send from the flow when a packet fails or times out.

All of these messages receive the packet from the chain and extract the necessary information to process the packet and determine if it should be the rate limited. 

### Necessary information 

Determining whether a packet should be rate limited requires:

* Channel: The channel on the Osmosis side: `packet.SourceChannel` for sends, and `packet.DestinationChannel` for receives. 
* Denom: The denom of the token being transferred as known on the Osmosis side (more on that below)
* Channel Value: The total value of the channel denominated in `Denom` (i.e.: channel-17 is worth 10k osmo).  
* Funds: the amount being transferred

#### Notes on Channel
The contract also supports quotas on a custom channel called "any" that is checked on every transfer. If either the 
transfer channel or the "any" channel have a quota that has been filled, the transaction will be rate limited.

#### Notes on Denom
The denom is always the representation as it exists on Osmosis: the local denom for native assets, and the `ibc/` prefix followed by the sha256 hash of the denom trace for non-native assets.

##### Sends

For native denoms the denom in the packet is used directly. An invalid denom fails elsewhere in the transfer path. Example result: `uosmo`

For non-native denoms, the contract needs to hash the denom trace and append it to the `ibc/` prefix. The
contract always receives the parsed denom (i.e.: `transfer/channel-32/uatom` instead of
`ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2`). This is because of the order in which 
the middleware is called. When sending a non-native denom, the packet contains `transfer/source-channel/denom` as it
is built on the `relay.SendTransfer()` in the transfer module and then passed to the middleware. Example result: `ibc/<hash>`

##### Receives

This behaves slightly different if the asset is an Osmosis asset that was sent to the counterparty and is being
returned to the chain, or if the asset is being received by the chain and originates on the counterparty. In ibc this
is called being a "source" or a "sink" respectively.

If the chain is a sink for the denom, the local denom is built by prefixing the port and channel (`transfer/local-channel`) and hashing the result. Example result: `ibc/<hash>`

If the chain is the source for the denom, there are two possibilities:

* A native token: the prefix added by the counterparty is removed. Example result: `uosmo`
* A non-native token: the extra prefix is removed and the result hashed. Example result: `ibc/<hash>`

#### Notes on Channel Value
The intended strategy for calculating channel value is:

* For non-native tokens (`ibc/...`), the supply of those tokens on Osmosis.
* For native tokens, the total amount held in escrow across all IBC channels.

The latter yields lower limits that reflect the quantity of native tokens existing outside Osmosis, on the assumption that most native tokens remain on their native chain and that normal IBC transfer volume is proportional to the amount that has left it.
The escrow-based figure is not currently used, because IBC does not track the total amount of a token held
in escrow across all channels. Instead, the current supply on Osmosis is used for every denom, so native and
non-native tokens are treated the same way.

##### Caching

The channel value varies constantly, so it is cached at the start of each quota period. This gives predictable limits and prevents an infinite-mint bug from inflating the quota that is meant to constrain it.

For example, with a daily quota of 1% of the OSMO supply and a channel value of 1M OSMO at the start of the period, at most 10k OSMO can be transferred that day. If 10M OSMO were minted or transferred in during the period, the quota does not increase until the period expires, at which point it becomes 1% of the new channel value.

### Integration

The rate limit middleware wraps the `transferIBCModule` and is added as the entry route for IBC transfers.

The module is also provided to the underlying `transferIBCModule` as its `ICS4Wrapper`; previously, this would have 
pointed to a channel, which also implements the `ICS4Wrapper` interface.

This integration can be seen in [osmosis/app/keepers/keepers.go](https://github.com/osmosis-labs/osmosis/blob/main/app/keepers/keepers.go)
