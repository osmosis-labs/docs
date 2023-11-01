# Gov

The ```gov``` module enables on-chain governance which allows Osmosis token holders to participate in a community led decision-making process. For example, users can:

- Form an idea and seek feedback
- Create a proposal and adjust according to feedback as needed
- Submit a proposal along with an initial deposit
- Deposit tokens and fund an active proposal
- Vote for an active proposal



## Overview

### Network parameters

The network parameters for the gov module are:

- **```deposit_params```** - Deposit related parameters
  - **```min_deposit```**: Minimum deposit (in uOSMO) for a proposal to enter voting period
  - **```max_deposit_period```**: Maximum period (in nanoseconds) for OSMO holders to deposit on a proposal.

- **```voting_params```** - Voting related parameters
  - **```voting_period```**: The length of the voting period (in nanoseconds)

- **```tally_params```** - Tally related parameters
  - **```quorum```**: The minimum percentage (in decimal form) of voting power that needs to be casted on a proposal for the result to be valid
  - **```threshold```**: Minimum proportion (in decimal form) of Yes votes (excluding Abstain votes) for the proposal to be accepted
  - **```veto```**: Minimum value of Veto votes to total votes ratio (in decimal form) for proposal to be vetoed.


### The Governance Procedure

**Phase 0 - Post your proposal draft on the Governance forums**

Osmosis governance defined a requirement for waiting periods before going to chain to allow feedback and refinement on proposals in [Proposal 438](https://www.mintscan.io/osmosis/proposals/438).

Post any drafts on the [Governance forum](https://gov.osmosis.zone/) as a first step.

**Phase 1 - Submit a proposal along with an initial deposit**

Users submits a proposal with an initial deposit. The proposal will then become "active" and enters the deposit period.

**Phase 2 - Deposit period**

During the deposit period, users can deposit and support an active proposal. Once the deposit of the proposal reaches the ```min_deposit```, it will enter the voting period. Otherwise, if the proposal is not successfully funded within ```max_deposit_period```, It will become inactive and **all the deposits will be burned**.

**Phase 3 - Voting period**

During the voting period, staked (bonded) tokens will be able to participate in the voting process. Users can choose one of the following options: ```yes```, ```no```, ```no_with_veto``` and ```abstain```.

After the ```voting_period``` has passed, the proposal will be considered "Rejected" and **the funds deposited in the deposit period will be burned if**:

- Votes do not reach the ```quorum```
- Enough vote ```no_with_veto``` when compared with total votes to meet the veto to total votes ratio specified in ```tally_params```

The proposal will be considered "Rejected" and **the funds deposited in the deposit period will be returned if**

- No one votes (or everyone votes to ```abstain```)
- More than ```threshold``` of non-abstaining voters vote ```no```

Otherwise, the proposal will be accepted and changes will be implemented according to the proposal.



## Transactions

### submit-proposal

Submit a proposal along with an initial deposit

```
osmosisd tx gov submit-proposal [flags]
```

typical flags would be:  
* `--gas=auto --gas-prices 0.0025uosmo --gas-adjustment 1.3` to auto-calculate gas required
* `--from WALLET_ADDRESS` to set the running wallet
* `--deposit=400000000uosmo` to provide the initial 400 OSMO (25% of total) deposit for putting a proposal on chain

There are different types of proposal submission types, including 
* [`text`](https://docs.osmosis.zone/osmosis-core/modules/gov#submit-proposal-text)
* [`param-change`](https://docs.osmosis.zone/osmosis-core/modules/gov#submit-proposal-param-change)
* [`community-pool-spend`](https://docs.osmosis.zone/osmosis-core/modules/gov#submit-proposal-community-pool-spend)
* [`software-upgrade`](https://docs.osmosis.zone/osmosis-core/modules/gov#submit-proposal-software-upgrade) and [`cancel-software-upgrade`](https://docs.osmosis.zone/osmosis-core/modules/gov#submit-proposal-cancel-software-upgrade)
* [`update-pool-incentives`](https://docs.osmosis.zone/osmosis-core/modules/gov#submit-proposal-update-pool-incentives)
* [`set-superfluid-asset`](https://docs.osmosis.zone/osmosis-core/modules/gov#submit-proposal-set-superfluid-asset) and [`remove-superfluid-asset`](https://docs.osmosis.zone/osmosis-core/modules/gov#submit-proposal-community-pool-spend)
* [`wasm-store`](https://docs.osmosis.zone/osmosis-core/modules/gov#submit-proposal-wasm-store)
* [`update-unpool-whitelist`](https://docs.osmosis.zone/osmosis-core/modules/gov#submit-proposal-update-unpool-whitelist)

We will go over each of these submission types in detail now:

### submit-proposal (text)

Text proposals differ from other proposal submission types in that after it passes, no logic is automatically executed. This is good for proposing changes to Osmosis that are not linked to a specific daemon parameter.

```bash
osmosisd tx gov submit-proposal --type=text --title="" --description="" --from WALLET_ADDRESS --deposit=400000000uosmo [flags]
```
**Example**

Create a text signaling proposals to match external incentives for a `DOGE/OSMO` and `DOGE/ATOM` pair.

```bash
osmosisd tx gov submit-proposal --type=text --title="Match External Incentives for DOGE/OSMO and DOGE/ATOM pairs" --description="Input description" --from WALLET_ADDRESS --deposit=400000000uosmo --gas=auto --gas-prices 0.0025uosmo --gas-adjustment 1.3
```

### submit-proposal (param change)

Submit a proposal to modify network parameters during run time, ideally these should be tested on Testnet before proposing.

```bash
osmosisd tx gov submit-proposal param-change [proposal-file] --from WALLET_ADDRESS [flags]
```

**Example**

Change the parameter MaxValidators (maximum number of validator) in the staking module:
 
```bash
osmosisd tx gov submit-proposal param-change proposal.json --from WALLET_ADDRESS --gas=auto --gas-prices 0.0025uosmo --gas-adjustment 1.3
```
The proposal.json file would look as follows:

```json
{
  "title": "Staking Param Change",
  "description": "Update max validators",
  "changes": [
    {
      "subspace": "staking",
      "key": "MaxValidators",
      "value": 150
    }
  ],
  "deposit": "400000000uosmo"
}
```

### submit-proposal (community pool spend)

Request funds from the community pool to support projects or other activities.

```bash
osmosisd tx gov submit-proposal community-pool-spend [proposal-file] --from WALLET_ADDRESS [flags]
```

**Example**

Submit a proposal to use community funds to fund a DAO:

```bash
osmosisd tx gov submit-proposal community-pool-spend proposal.json --from WALLET_ADDRESS --gas=auto --gas-prices 0.0025uosmo --gas-adjustment 1.3
```

The proposal.json would look as follows:

```json
{
  "title": "Osmosis DAO",
  "description": "Establish a DAO for Osmosis. Potentially add external links for more information or allow discussion",
  "recipient": "osmo1r9pjvsuahxwkxg8cnhacd6alkmxq330fl9pqqt",
  "amount": "10000000000uosmo",
  "deposit": "400000000uosmo"
}
```
If passed, the requested community funds would be sent to the recipient address provided in the json file.

### submit-proposal (software upgrade)

Submit an upgrade proposal and suggest a software upgrade at a specific block height.

```bash
osmosisd tx gov submit-proposal software-upgrade [proposal-file] --from WALLET_ADDRESS [flags]
```

**Example**

Update Osmosis to V11:

```bash
osmosisd tx gov submit-proposal software-upgrade v11 --upgrade-height 5432450 --upgrade-info https://raw.githubusercontent.com/osmosis-labs/osmosis/main//osmosis-1/upgrades/v11/mainnet/upgrade_11_binaries.json  --title="Osmosis v11 Upgrade" --description="" --from WALLET_ADDRESS --gas=auto --gas-prices 0.0025uosmo --gas-adjustment 1.3
```

### submit-proposal (cancel upgrade)

Cancel the planned software upgrade before the upgrade height is reached.

```bash
osmosisd tx gov submit-proposal cancel-software-upgrade --title="" --description"" --from WALLET_ADDRESS --gas=auto --gas-prices 0.0025uosmo --gas-adjustment 1.3
```

The software upgrade does not have to be specified, as this will cancel the currently active software upgrade proposal. 


### submit-proposal (update pool incentives)

Update the weight of specified pool gauges in regards to their share of incentives.

```bash
osmosisd tx gov submit-proposal update-pool-incentives [gaugeIDs] [weights] --from WALLET_ADDRESS --gas=auto --gas-prices 0.0025uosmo --gas-adjustment 1.3
```

**Example**

Update the pool incentives weights for `gauge_id` 0 and 1 to be 5000 and 20,000.

```bash
osmosisd tx gov submit-proposal update-pool-incentives 0,1 5000,20000 --from WALLET_ADDRESS --chain-id CHAIN_ID
```


### submit-proposal (set superfluid asset)

Enable a pool as eligible for Superfluid Staking, allowing a portion of the OSMO within the pool to be staked - providing additional security for Osmosis as well as staking rewards and voting power for Liquidity Providers

```bash
osmosisd tx gov submit-proposal set-superfluid-assets-proposal --superfluid-assets= [GAMM] --from WALLET_ADDRESS --gas=auto --gas-prices 0.0025uosmo --gas-adjustment 1.3
```

**Example**

Add Superfluid Staking to Pool 831.

```bash
osmosisd tx gov submit-proposal set-superfluid-assets-proposal --superfluid-assets="gamm/pool/831" --from WALLET_ADDRESS --gas=auto --gas-prices 0.0025uosmo --gas-adjustment 1.3
```

### submit-proposal (remove superfluid asset)

Disable a pool as eligible for Superfluid Staking, this prevents OSMO in a pool from being able to also be staked.

```bash
osmosisd tx gov submit-proposal remove-superfluid-assets-proposal --superfluid-assets= [GAMM] --from WALLET_ADDRESS --gas=auto --gas-prices 0.0025uosmo --gas-adjustment 1.3
```

**Example**

Remove Superfluid Staking from Pool 831.

```bash
osmosisd tx gov submit-proposal remove-superfluid-assets-proposal --superfluid-assets="gamm/pool/831" --from WALLET_ADDRESS --gas=auto --gas-prices 0.0025uosmo --gas-adjustment 1.3
```

### submit-proposal (wasm-store)

Upload a CosmWasm contract to Osmosis for subsequent instantiation.

```bash
osmosisd tx gov wasm-store [contract.wasm] --title="" --description="" --code-hash [checksum] --code-source-url [source] --builder [builder] --from WALLET_ADDRESS --gas=auto --gas-prices 0.0025uosmo --gas-adjustment 1.3
```

**Example**
Upload Crosschain Swaps contract.

```bash
osmosisd tx gov submit-proposal wasm-store crosschain_swaps.wasm --title="Upload Crosschain Swaps contract" --description="" --code-hash e7cfd4ec2cf594de9d15863c6e324025045de39236186c03483af7c9e06d4949 --code-source-url "https://github.com/osmosis-labs/osmosis/raw/v15.x/tests/ibc-hooks/bytecode/crosschain_swaps.wasm" --builder "cosmwasm/workspace-optimizer:0.12.10" --from WALLET_ADDRESS --gas=auto --gas-prices 0.0025uosmo --gas-adjustment 1.3
```

### submit-proposal (update unpool whitelist)

Enable immediate unpooling on a pool, allowing users to choose to freeze their impermanent loss during the unbonding period in the event of unexpected severe conditions.

```bash
osmosisd tx gov submit-proposal update-unpool-whitelist --pool-ids [PoolIDs] --title="" --description="" --from WALLET_ADDRESS --gas=auto --gas-prices 0.0025uosmo --gas-adjustment 1.3
```

**Example**

Allow immediate unpooling of pools 1, 2 and 3.

```bash
osmosisd tx gov submit-proposal update-unpool-whitelist --pool-ids "1, 2, 3" --title="Allow Immediate Unpooling of Pools 1, 2 and 3" --description="" --from WALLET_ADDRESS --gas=auto --gas-prices 0.0025uosmo --gas-adjustment 1.3
```

### deposit

Deposit tokens for an active proposal

```bash
osmosisd tx gov deposit [proposal-id] [deposit] --from WALLET_ADDRESS --gas=auto --gas-prices 0.0025uosmo --gas-adjustment 1.3
``` 

**Example**

If proposal number 12 is in the deposit period and you would like to help bring it to a vote, you could deposit 1200 OSMO to that proposal as follows:

```bash
osmosisd tx gov deposit 12 1200000000uosmo --from WALLET_ADDRESS --gas=auto --gas-prices 0.0025uosmo --gas-adjustment 1.3
```

### vote

Vote for an active proposal

```bash
osmosisd tx gov vote [proposal-id] [option] --from WALLET_ADDRESS --gas=auto --gas-prices 0.0025uosmo --gas-adjustment 1.3
```

Valid value of ```option``` field is ```yes```, ```no```, ```no_with_veto``` and ```abstain```. 

**Example**

To vote yes for proposal 12:

```bash
osmosisd tx gov vote 12 yes --from WALLET_ADDRESS --gas=auto --gas-prices 0.0025uosmo --gas-adjustment 1.3
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

In the above example, there is only one proposal with ```"proposal_id": "1"```, with the title: ```"Staking Param Change"``` that change the ```MaxValidators``` parameter of the ```staking``` module to ```150```. We can also see that the status of the proposal is ```"PROPOSAL_STATUS_PASSED"```, which means that this proposal has been passed. In reality, the output would be much longer with all proposals listed.


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
  "voting_params": {
    "voting_period": "432000000000000",
    "proposal_voting_periods": null,
    "expedited_voting_period": "86400000000000"
  },
  "tally_params": {
    "quorum": "0.200000000000000000",
    "threshold": "0.500000000000000000",
    "veto_threshold": "0.334000000000000000",
    "expedited_threshold": "0.666666666666666667"
  },
  "deposit_params": {
    "min_deposit": [
      {
        "denom": "uosmo",
        "amount": "1600000000"
      }
    ],
    "max_deposit_period": "1209600000000000",
    "min_expedited_deposit": [
      {
        "denom": "uosmo",
        "amount": "5000000000"
      }
    ],
    "min_initial_deposit_ratio": "0.250000000000000000"
  }
}
```

See the network parameters section for a detailed explanation of the above parameters.


## Appendix

### Current Configuration

```gov``` **module: Network Parameter effects and current configuration**

The following tables show overall effects on different configurations of the ```gov``` related network parameters:

<table><thead><tr><th></th> 
<th><code>min_deposit</code></th> 
<th><code>max_deposit_period</code></th> 
<th><code>voting_period</code></th></tr></thead> <tbody>
<tr><td>Type</td> 
<td>array (coins)</td> 
<td>string (time ns)</td> 
<td>string (time ns)</td></tr> 
<tr><td>Higher</td> 
<td>More collateral required to bring a proposal to vote</td> 
<td>More time to solicit funds to reach <code>min_deposit</code> </td> 
<td>Longer voting period</td></tr> 
<tr><td>Lower</td> 
<td>Less collateral required to bring a proposal to vote</td> 
<td>Less time to solicit funds to reach <code>min_deposit</code></td> 
<td>Shorter voting period</td></tr> 
<tr><td>Constraints</td> 
<td>Value has to be a positive integer</td> 
<td>Value has to be positive</td> 
<td>Value has to be positive</td></tr> 
<tr><td>Current configuration</td> 
<td><code>1600000000</code> (1600 OSMO)</td> <td><code>1209600000000000</code> (2 weeks)</td> <td><code>432000000000000</code> (5 days)</td></tr>
</tbody></table>

<table><thead><tr><th></th> 
<th><code>quorum</code></th> 
<th><code>threshold</code></th> 
<th><code>veto</code></th></tr></thead> 
<tbody><tr><td>Type</td> 
<td>string (dec)</td> 
<td>string (dec)</td> 
<td>string (dec)</td></tr> 
<tr><td>Higher</td> 
<td>Easier for a proposal to be passed</td> 
<td>Easier for a proposal to be passed</td> 
<td>Easier for a proposal to be passed</td></tr> 
<tr><td>Lower</td> 
<td>Harder for a proposal to be passed</td> 
<td>Harder for a proposal to be passed</td> 
<td>Harder for a proposal to be passed</td></tr> 
<tr><td>Constraints</td> 
<td>Value has to be less or equal to <code>1</code></td> 
<td>Value has to be less or equal to <code>1</code></td> 
<td>Value has to be less or equal to <code>1</code></td></tr> 
<tr><td>Current configuration</td> 
<td><code>0.2</code> (20%)</td> 
<td><code>0.5</code> (50%)</td> 
<td><code>0.334</code> (33.4%)</td></tr>
</tbody></table>

<table><thead><tr><th></th> 
<th><code>min_expedited_deposit</code></th> 
<th><code>expedited_threshold</code></th> 
<th><code>expedited_voting_period</code></th></tr></thead> 
<tbody><tr><td>Type</td> 
<td>string (time ns)</td> 
<td>string (dec)</td> 
<td>string (dec)</td></tr> 
<tr><td>Higher</td> 
<td>More collateral required to bring an expedited proposal to vote</td> 
<td>Easier for an expedited proposal to be passed</td> 
<td>Longer expedited voting period</td></tr> 
<tr><td>Lower</td> 
<td>Less collateral required to bring an expedited proposal to vote</td> 
<td>Harder for an expedited proposal to be passed</td> 
<td>Shorter expedited voting period</td></tr> 
<tr><td>Constraints</td> 
<td>Value has to be a positive integer</td> 
<td>Value has to be less or equal to <code>1</code></td> 
<td>Value has to be positive</td></tr> 
<tr><td>Current configuration</td> 
<td><code>5000000000</code> (5000 OSMO)</td> 
<td><code>0.666666666666666667</code> (66.6%)</td> 
<td><code>86400000000000</code> (1 day)</td></tr>
</tbody></table>