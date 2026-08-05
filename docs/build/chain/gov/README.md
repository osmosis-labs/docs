# Governance

The `gov` module enables onchain governance which allows Osmosis token holders to participate in a community led decision-making process. For example, users can:

- Form an idea and seek feedback
- Create a proposal and adjust according to feedback as needed
- Submit a proposal along with an initial deposit
- Deposit tokens and fund an active proposal
- Vote for an active proposal

## Overview

### Network parameters

The gov module exposes the following parameters. Coin amounts are in the
minimal denomination, `uosmo`. Durations use the protobuf duration format.

| Parameter | Purpose | Current mainnet value |
| --- | --- | --- |
| `min_deposit` | Total deposit required for a regular proposal to enter voting | `30000000000uosmo` (30,000 OSMO) |
| `max_deposit_period` | Maximum time allowed to reach the required deposit | `1209600s` (14 days) |
| `voting_period` | Voting period for a regular proposal | `432000s` (5 days) |
| `quorum` | Minimum fraction of bonded voting power that must participate | `0.3` (30%) |
| `threshold` | Minimum Yes share of non-abstaining votes required to pass | `0.5` (50%) |
| `veto_threshold` | NoWithVeto share at which a proposal is vetoed | `0.334` (33.4%) |
| `min_initial_deposit_ratio` | Minimum initial deposit as a fraction of the applicable minimum deposit | `0.25` (25%) |
| `proposal_cancel_ratio` | Portion of the proposal deposit charged when the proposer cancels it | `1.0` (100%) |
| `proposal_cancel_dest` | Optional destination for the cancellation charge; an empty value burns the charge | Empty |
| `expedited_voting_period` | Voting period for an expedited proposal | `86400s` (1 day) |
| `expedited_threshold` | Minimum Yes share of non-abstaining votes required for an expedited proposal | `0.8` (80%) |
| `expedited_min_deposit` | Total deposit required for an expedited proposal to enter voting | `100000000000uosmo` (100,000 OSMO) |
| `burn_vote_quorum` | Whether to burn deposits when a proposal fails quorum | `false` |
| `burn_proposal_deposit_prevote` | Whether to burn deposits when a proposal fails to enter voting | `false` |
| `burn_vote_veto` | Whether to burn deposits when a proposal is vetoed | `true` |
| `min_deposit_ratio` | Minimum accepted individual deposit as a fraction of the applicable minimum deposit | `0.01` (1%) |

The regular minimum initial deposit is therefore 7,500 OSMO. The expedited
minimum initial deposit is 25,000 OSMO. Subsequent deposits must be at least
300 OSMO for a regular proposal or 1,000 OSMO for an expedited proposal.

### The Governance Procedure

**Phase 0 - Post your proposal draft on the Governance forums**

Osmosis governance defined a requirement for waiting periods before going to chain to allow feedback and refinement on proposals in [Proposal 438](https://www.mintscan.io/osmosis/proposals/438).

Post any drafts on the [Governance forum](https://gov.osmosis.zone/) as a first step.

**Phase 1 - Submit a proposal along with an initial deposit**

Users submits a proposal with an initial deposit. The proposal will then become "active" and enters the deposit period.

**Phase 2 - Deposit period**

During the deposit period, users can deposit and support an active proposal. Once the deposit reaches the applicable regular or expedited minimum, the proposal enters the voting period. If it does not reach that minimum within `max_deposit_period`, the proposal becomes inactive. Osmosis currently refunds these deposits because `burn_proposal_deposit_prevote` is `false`.

If the proposer cancels before voting ends, the current
`proposal_cancel_ratio` charges the full deposit. Because
`proposal_cancel_dest` is empty, that charge is burned.

**Phase 3 - Voting period**

During the voting period, staked (bonded) tokens will be able to participate in the voting process. Users can choose one of the following options: `yes`, `no`, `no_with_veto` and `abstain`.

After the voting period, a rejected proposal's deposit is normally refunded.
This includes rejection because participation did not reach `quorum`, since
`burn_vote_quorum` is currently `false`. Deposits are burned when the
`no_with_veto` share reaches `veto_threshold`, since `burn_vote_veto` is
currently `true`.

A proposal is also rejected, with its deposit refunded, when the Yes share of
non-abstaining votes does not reach `threshold` or `expedited_threshold` as
applicable.

Otherwise, the proposal will be accepted and changes will be implemented according to the proposal.

## Transactions

### submit-proposal

Submit a proposal along with an initial deposit

```
osmosisd tx gov submit-proposal [flags]
```

typical flags would be:

- `--gas=auto --gas-prices 0.05uosmo --gas-adjustment 1.3` to auto-calculate gas required. The `--gas-prices` value is illustrative: Osmosis sets a dynamic minimum gas price via its [fee market](/learn/features/fee-market), so query the current base fee (`osmosisd query txfees base-fee`) and pass a value at or above it.
- `--from WALLET_ADDRESS` to set the running wallet
- `--deposit=7500000000uosmo` to provide the minimum initial deposit of 7,500 OSMO for a regular proposal

On the Cosmos SDK gov module that Osmosis runs (`v1`), proposals are submitted in one of two ways:

- **`submit-proposal`** takes a single JSON file describing one or more `sdk.Msg`s to execute if the proposal passes. This is the current path for anything expressible as a message, including `MsgSoftwareUpgrade`, `MsgCommunityPoolSpend`, and module parameter updates via each module's `MsgUpdateParams`.
- **`submit-legacy-proposal`** submits a legacy content-based proposal. This is still how the older Osmosis content types are submitted (text, legacy param-change, and the module handlers that remain registered on the gov router: pool-incentives, superfluid, protorev, txfees, gamm, concentrated-liquidity, cosmwasmpool, poolmanager, incentives).

To avoid hand-writing the JSON, generate it interactively:

```bash
osmosisd tx gov draft-proposal
```

This prompts for the proposal type and fields and writes a ready-to-submit `draft_proposal.json` (plus a `draft_metadata.json`).

### submit-proposal (message-based)

Submit a proposal from a JSON file containing a `messages` array. Each message is proto-JSON with an `@type`.

```bash
osmosisd tx gov submit-proposal proposal.json --from WALLET_ADDRESS --gas=auto --gas-prices 0.05uosmo --gas-adjustment 1.3
```

The `proposal.json` file has this shape:

```json
{
  "messages": [
    {
      "@type": "/cosmos.distribution.v1beta1.MsgCommunityPoolSpend",
      "authority": "osmo10d07y265gmmuvt4z0w9aw880jnsr700jjeq4qp",
      "recipient": "osmo1r9pjvsuahxwkxg8cnhacd6alkmxq330fl9pqqt",
      "amount": [{ "denom": "uosmo", "amount": "10000000000" }]
    }
  ],
  "metadata": "ipfs://CID",
  "deposit": "7500000000uosmo",
  "title": "Community pool spend",
  "summary": "Fund a project from the community pool",
  "expedited": false
}
```

The `authority` on a governance message is the gov module account, `osmo10d07y265gmmuvt4z0w9aw880jnsr700jjeq4qp`. Set `"expedited": true` for an expedited proposal (higher deposit and threshold, shorter voting period). Module parameter changes use that module's `MsgUpdateParams` as the message; `draft-proposal` lists the available types.

### submit-proposal (software upgrade)

A software upgrade is a message-based proposal wrapping `MsgSoftwareUpgrade`:

```json
{
  "messages": [
    {
      "@type": "/cosmos.upgrade.v1beta1.MsgSoftwareUpgrade",
      "authority": "osmo10d07y265gmmuvt4z0w9aw880jnsr700jjeq4qp",
      "plan": {
        "name": "v31",
        "height": "12345678",
        "info": "https://raw.githubusercontent.com/osmosis-labs/osmosis/main/networks/osmosis-1/upgrades/v31/mainnet/upgrade_binaries.json"
      }
    }
  ],
  "deposit": "7500000000uosmo",
  "title": "Osmosis v31 Upgrade",
  "summary": "Upgrade the chain to v31 at the specified height"
}
```

To cancel a pending upgrade, submit a proposal wrapping `MsgCancelUpgrade` (same `authority`).

### submit-legacy-proposal

Legacy content-based proposals (text, and the Osmosis module content handlers) are submitted with `submit-legacy-proposal` and a proposal file.

```bash
osmosisd tx gov submit-legacy-proposal --proposal proposal.json --from WALLET_ADDRESS --gas=auto --gas-prices 0.05uosmo --gas-adjustment 1.3
```

A text (signaling) proposal file:

```json
{
  "title": "ProtoRev usage: OSMO revenue as Burn Mechanism",
  "description": "This proposal signals that OSMO revenue generated from the ProtoRev module should be permanently removed from circulating supply by transfer to the null address. Nothing is executed onchain if this passes; it records community direction for follow-up work.",
  "type": "Text",
  "deposit": "7500000000uosmo"
}
```

The Osmosis content types that remain on the gov router (superfluid asset set/remove, update pool incentives, update unpool whitelist, and the per-module content handlers) are also submitted this way. Run `osmosisd tx gov draft-proposal` to see the currently registered proposal types and generate the correct file for each.

### Uploading a CosmWasm contract

Storing contract code via governance is a `wasm` module command, not a `gov` subcommand:

```bash
osmosisd tx wasm submit-proposal wasm-store crosschain_swaps.wasm \
  --title "Upload Crosschain Swaps contract" \
  --summary "Store the crosschain swaps contract code" \
  --deposit 7500000000uosmo \
  --from WALLET_ADDRESS --gas=auto --gas-prices 0.05uosmo --gas-adjustment 1.3
```

See [Uploading a contract via governance](/build/cosmwasm/submit-wasm-proposal) for the full flow including code verification metadata.

### deposit

Deposit tokens for an active proposal

```bash
osmosisd tx gov deposit [proposal-id] [deposit] --from WALLET_ADDRESS --gas=auto --gas-prices 0.05uosmo --gas-adjustment 1.3
```

**Example**

If proposal number 12 is in the deposit period and you would like to help bring it to a vote, you could deposit 1200 OSMO to that proposal as follows:

```bash
osmosisd tx gov deposit 12 1200000000uosmo --from WALLET_ADDRESS --gas=auto --gas-prices 0.05uosmo --gas-adjustment 1.3
```

### vote

Vote for an active proposal

```bash
osmosisd tx gov vote [proposal-id] [option] --from WALLET_ADDRESS --gas=auto --gas-prices 0.05uosmo --gas-adjustment 1.3
```

Valid value of `option` field is `yes`, `no`, `no_with_veto` and `abstain`.

**Example**

To vote yes for proposal 12:

```bash
osmosisd tx gov vote 12 yes --from WALLET_ADDRESS --gas=auto --gas-prices 0.05uosmo --gas-adjustment 1.3
```

## Queries

### proposals

Query all proposals

```bash
osmosisd query gov proposals [proposal-id]
```

**Example**

We can list all proposals in json format by:

```bash
osmosisd query gov proposals -o json | jq
```

An example of the output:

```json
  {
    "proposals": [
      {
        "proposal_id": "1",
        "content": {
          "@type": "/cosmos.params.v1beta1.ParameterChangeProposal",
          "title": "Staking Param Change",
          "description": "Update max validators",
          "changes": [
            {
              "subspace": "staking",
              "key": "MaxValidators",
              "value": "150"
            }
          ]
        },
        "status": "PROPOSAL_STATUS_PASSED",
        "final_tally_result": {
          "yes": "50040000000000",
          "abstain": "0",
          "no": "0",
          "no_with_veto": "0"
        },
        "submit_time": "2021-10-15T10:05:49.996956080Z",
        "deposit_end_time": "2021-10-15T22:05:49.996956080Z",
        "total_deposit": [
          {
            "denom": "uosmo",
            "amount": "100000000"
          }
        ],
        "voting_start_time": "2021-10-15T10:14:56.958963929Z",
        "voting_end_time": "2021-10-15T22:14:56.958963929Z"
      }
    ],
    "pagination": {
      "next_key": null,
      "total": "0"
    }
  }
...
```

In the above example, there is only one proposal with `"proposal_id": "1"`, with the title: `"Staking Param Change"` that change the `MaxValidators` parameter of the `staking` module to `150`. We can also see that the status of the proposal is `"PROPOSAL_STATUS_PASSED"`, which means that this proposal has been passed. In reality, the output would be much longer with all proposals listed.

### proposal

Query details of a single proposal

```bash
osmosisd query gov proposal [proposal-id]
```

**Example**

To check proposal 13 and list in json format:

```bash
osmosisd query gov proposal 13 -o json | jq
```

### tally

Get the tally of a proposal vote that shows how the community voted on a specific proposal.

```bash
query gov tally [proposal-id]
```

**Example**

To check the tally of proposal 13 and output in json:

```bash
osmosisd query gov tally 13 -o json | jq
```

Which outputs:

```json
{
  "yes": "11126523145952",
  "abstain": "58623193556",
  "no": "44915148922",
  "no_with_veto": "5194297427"
}
```

### params

Query the current gov parameters

```bash
osmosisd query gov params
```

**Example**

To check the current gov parameters and output in json:

```bash
osmosisd query gov params --output json | jq
```

Which outputs:

```json
{
  "params": {
    "min_deposit": [
      {
        "denom": "uosmo",
        "amount": "30000000000"
      }
    ],
    "max_deposit_period": "1209600s",
    "voting_period": "432000s",
    "quorum": "0.300000000000000000",
    "threshold": "0.500000000000000000",
    "veto_threshold": "0.334000000000000000",
    "min_initial_deposit_ratio": "0.250000000000000000",
    "proposal_cancel_ratio": "1.000000000000000000",
    "proposal_cancel_dest": "",
    "expedited_voting_period": "86400s",
    "expedited_threshold": "0.800000000000000000",
    "expedited_min_deposit": [
      {
        "denom": "uosmo",
        "amount": "100000000000"
      }
    ],
    "burn_vote_quorum": false,
    "burn_proposal_deposit_prevote": false,
    "burn_vote_veto": true,
    "min_deposit_ratio": "0.010000000000000000"
  }
}
```

See the network parameters section for a detailed explanation of the above parameters.

## Appendix

### Current Configuration

`gov` **module: Network Parameter effects and current configuration**

The following tables show overall effects on different configurations of the `gov` related network parameters:

|                       | `min_deposit`                                        | `max_deposit_period`                              | `voting_period`            |
| --------------------- | ---------------------------------------------------- | ------------------------------------------------- | -------------------------- |
| Type                  | array (coins)                                        | string (time ns)                                  | string (time ns)           |
| Higher                | More collateral required to bring a proposal to vote | More time to solicit funds to reach `min_deposit` | Longer voting period       |
| Lower                 | Less collateral required to bring a proposal to vote | Less time to solicit funds to reach `min_deposit` | Shorter voting period      |
| Constraints           | Value has to be a positive integer                   | Value has to be positive                          | Value has to be positive   |
| Current configuration | `30000000000` (30,000 OSMO)                           | `1209600s` (2 weeks)                              | `432000s` (5 days)         |

|                       | `quorum`                             | `threshold`                          | `veto_threshold`                     |
| --------------------- | ------------------------------------ | ------------------------------------ | ------------------------------------ |
| Type                  | string (dec)                         | string (dec)                         | string (dec)                         |
| Higher                | Harder for a proposal to be passed   | Harder for a proposal to be passed   | Easier for a proposal to be vetoed   |
| Lower                 | Easier for a proposal to be passed   | Easier for a proposal to be passed   | Harder for a proposal to be vetoed   |
| Constraints           | Value has to be less or equal to `1` | Value has to be less or equal to `1` | Value has to be less or equal to `1` |
| Current configuration | `0.3` (30%)                          | `0.5` (50%)                          | `0.334` (33.4%)                      |

|                       | `expedited_min_deposit`                                         | `expedited_threshold`                         | `expedited_voting_period`       |
| --------------------- | --------------------------------------------------------------- | --------------------------------------------- | ------------------------------- |
| Type                  | array (coins)                                                   | string (dec)                                  | string (dec)                    |
| Higher                | More collateral required to bring an expedited proposal to vote | Harder for an expedited proposal to be passed | Longer expedited voting period  |
| Lower                 | Less collateral required to bring an expedited proposal to vote | Easier for an expedited proposal to be passed | Shorter expedited voting period |
| Constraints           | Value has to be a positive integer                              | Value has to be less or equal to `1`          | Value has to be positive        |
| Current configuration | `100000000000` (100,000 OSMO)                                  | `0.8` (80%)                                   | `86400s` (1 day)                |
