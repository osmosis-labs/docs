# Transaction Structure

Each block on a blockchain, including Cosmos-based ones like Osmosis, are constructed of a series
of transactions.

Each transaction, in turn, has its own internal structure. This document describes the structure
of those transactions.

## Retrieving a block

You can retrieve a single block by any one of:

* using the RPC API
* using the REST API
* running a full node (using `osmosisd`)

For our examples, we use `osmosisd` to retrieve a single block:

```sh
osmosisd query block 2836990
```

The above retrieves the block `2836990`. The result generally is in json without any formatting,
so we run it through `jq` to clean it up:

```sh
osmosisd query block 2836990 | jq '.'
```

The result is a large json file. To keep this document readable, we will not reproduce the whole thing here,
only its structure. The entire file is available at [block-2836990.json](block-2836990.md).

The main outline is as follows:

<details><summary>Outline</summary>

```json
{
  "block_id": {
    "hash": "CC3F7B8C711393E0A6BF42F743C1E96A5E147C03CD2ACF50E15DF93515E4DCC5",
    "parts": {
      "total": 2,
      "hash": "EB26807B983730D1B87D821D4A7E8BFDC83E78CDB4E5B89DD5A28C78CAE1931E"
    }
  },
  "block": {
    "header": {
      "version": {
        "block": "11",
        "app": "1"
      },
      "chain_id": "osmosis-1",
      "height": "2836990",
      "time": "2022-01-17T17:14:01.589129908Z",
      "last_block_id": {
        "hash": "10419816E363D36492987AA2FBC1F09653DB026B2A6787F01B69C98EA54ADAEF",
        "parts": {
          "total": 3,
          "hash": "468EAE52F145F55319BD41B6A62629E2424CF53B91D7AE28BD7E2C07D9B2F7B3"
        }
      },
      "last_commit_hash": "D17D43C66F440B7B0FD23D085A195B839D022D8365B318B27484DACACC718F30",
      "data_hash": "4C5F9C3A26A245945D5F6C7BB3854C2A8E8A2A54C3459DA135E93C5A5F916D6F",
      "validators_hash": "6CE355CD08D5B5C775845B87F04C295E6F35FA6FD5353DA668482406B7360F45",
      "next_validators_hash": "DE379515F7B35ABB57E5FECA27EB485731058EE045F26DE8AB9C8555B3FFD83D",
      "consensus_hash": "A967D55FACBBA19AB96149048F2476C4657EC03D25B78A81AF5B8F0A08F61DFF",
      "app_hash": "7356565B67989D373662FC5553E97A206BB8A58385FF42698F1A411C698555F3",
      "last_results_hash": "DE3F62111363F655A6596B6DE8E1348FF46FE9A7859F695CCE59E4EA0F98253F",
      "evidence_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
      "proposer_address": "1B002B6EBEB8653C721301B1B56472B1B4DE7247"
    },
    "data": {
      "txs": [
        "Cp0CCpoCCiovb3Ntb3Npcy5nYW1tLnYxYmV0YTEuTXNnU3dhcEV4YWN0QW1vdW50SW4S6wEKK29zbW8xZTBkbXpkeGRtcnd5ZjQ2bmNtNXNxY2xrZGFuM21hcTVrNWp2ZHgSSQjcBBJEaWJjLzk4N0MxN0IxMUFCQzJCMjAwMTkxNzhBQ0U2MjkyOUZFOTg0MDIwMkNFNzk0OThFMjlGRThFNUNCMDJCN0MwQTQSSQjjBBJEaWJjLzI3Mzk0RkIwOTJEMkVDQ0Q1NjEyM0M3NEYzNkU0QzFGOTI2MDAxQ0VBREE5Q0E5N0VBNjIyQjI1RjQxRTVFQjISCQgBEgV1b3NtbxoRCgV1b3NtbxIIMTUwMDAwMDAiCDE1MDAwMDAwEmYKUgpGCh8vY29zbW9zLmNyeXB0by5zZWNwMjU2azEuUHViS2V5EiMKIQI3Vc8hzNbQdpBrbHj8hELzzBskwVqQrad15VgsFn1RtBIECgIIARi+9AMSEAoKCgV1b3NtbxIBMBCAiXoaQD9uPzOcom2NJGzrHEkgytg585ybULi93PnLNKMsECGCNH5gH46Cmiv504ULlyMsTfiyYInMGo39jYIahbDcDLk=",
        "Cp0CCpoCCiovb3Ntb3Npcy5nYW1tLnYxYmV0YTEuTXNnU3dhcEV4YWN0QW1vdW50SW4S6wEKK29zbW8xbDR1NTZsN2N2eDhuMG42Yzd3NjUwazAydno2N3F1ZGpsY3V0ODkSSQjcBBJEaWJjLzk4N0MxN0IxMUFCQzJCMjAwMTkxNzhBQ0U2MjkyOUZFOTg0MDIwMkNFNzk0OThFMjlGRThFNUNCMDJCN0MwQTQSSQjjBBJEaWJjLzI3Mzk0RkIwOTJEMkVDQ0Q1NjEyM0M3NEYzNkU0QzFGOTI2MDAxQ0VBREE5Q0E5N0VBNjIyQjI1RjQxRTVFQjISCQgBEgV1b3NtbxoRCgV1b3NtbxIIMTUwMDAwMDAiCDE1MDAwMDAwEmYKUgpGCh8vY29zbW9zLmNyeXB0by5zZWNwMjU2azEuUHViS2V5EiMKIQK1cR2MtFWdtiyO/qORycJYvhuEqF1W9howno2FFP/11xIECgIIARjM8wMSEAoKCgV1b3NtbxIBMBCAiXoaQHCrHmPW89D7BdROgVeDs0Uz4jz95MW/abhLOrsOT/fdS6UQ+Qvzj+htQe7TtKYGRfuK9UsyjcV6gIN7I8K0fbQ=",
        "CpsCCpgCCiovb3Ntb3Npcy5nYW1tLnYxYmV0YTEuTXNnU3dhcEV4YWN0QW1vdW50SW4S6QEKK29zbW8xZTBkbXpkeGRtcnd5ZjQ2bmNtNXNxY2xrZGFuM21hcTVrNWp2ZHgSSQjcBBJEaWJjLzk4N0MxN0IxMUFCQzJCMjAwMTkxNzhBQ0U2MjkyOUZFOTg0MDIwMkNFNzk0OThFMjlGRThFNUNCMDJCN0MwQTQSSQjjBBJEaWJjLzI3Mzk0RkIwOTJEMkVDQ0Q1NjEyM0M3NEYzNkU0QzFGOTI2MDAxQ0VBREE5Q0E5N0VBNjIyQjI1RjQxRTVFQjISCQgBEgV1b3NtbxoQCgV1b3NtbxIHMTUwMDAwMCIHMTUwMDAwMBJmClIKRgofL2Nvc21vcy5jcnlwdG8uc2VjcDI1NmsxLlB1YktleRIjCiECN1XPIczW0HaQa2x4/IRC88wbJMFakK2ndeVYLBZ9UbQSBAoCCAEYv/QDEhAKCgoFdW9zbW8SATAQgIl6GkD7MtpJPRKqLCvv6b+1LXPjwq+tx/dk5qZDh9AIFbGdDDTptSLBuId7tzXeIqf9hXt6UqOzxbU/OrMAJ/LvOnEY",
        "Cu8DCuwDCiovb3Ntb3Npcy5nYW1tLnYxYmV0YTEuTXNnU3dhcEV4YWN0QW1vdW50SW4SvQMKK29zbW8xMDI2anQycjl5ZnhtbmMzcm12cDBoZ2VlOWd3a215azl1M2t0aHESSQjQAxJEaWJjLzFEQzQ5NUZDRUZEQTA2OEEzODIwRjkwM0VEQkQ3OEI5NDJGQkQyMDREN0U5M0QzQkEyQjQzMkU5NjY5RDFBNTkSSQjNAxJEaWJjLzU5NzNDMDY4NTY4MzY1RkZGNDBERURDRjFBMUNCNzU4MkI2MTE2QjczMUNEMzFBMTIyMzFBRTI1RTIwQjg3MUYSCgjhAxIFdW9zbW8SSAgHEkRpYmMvN0M0RDYwQUE5NUU1QTc1NThCMEEzNjQ4NjA5NzlDQTM0QjdGRjhBQUYyNTVCODdBRjlFODc5Mzc0NDcwQ0VDMBJICAgSRGliYy8yNzM5NEZCMDkyRDJFQ0NENTYxMjNDNzRGMzZFNEMxRjkyNjAwMUNFQURBOUNBOTdFQTYyMkIyNUY0MUU1RUIyGk8KRGliYy8yNzM5NEZCMDkyRDJFQ0NENTYxMjNDNzRGMzZFNEMxRjkyNjAwMUNFQURBOUNBOTdFQTYyMkIyNUY0MUU1RUIyEgcxMDAwMDAwIgcxMDAwMDAwEloKUgpGCh8vY29zbW9zLmNyeXB0by5zZWNwMjU2azEuUHViS2V5EiMKIQNutTEMkmT7rngHNX19j0uA2419X1nPhqlDkZ/cqAk2exIECgIIARjMig8SBBCAiXoaQIoIWm3CI9esFCLaeQF9Aj6bEjgm1WItBdDnHeye5DJgEBBbaoc8iQQ3oC1pCX+BtxZVP8NpTLCeW6O/pW84jds=",
        ...
        ...

        "CqQDCqEDCiovb3Ntb3Npcy5nYW1tLnYxYmV0YTEuTXNnU3dhcEV4YWN0QW1vdW50SW4S8gIKK29zbW8xNng5cmhqeTZ0ZjJkNDJ2MzRucXBna3B1d2tzY2d2dG0yYTBndDISSAgKEkRpYmMvRTY5MzFGNzgwNTdGN0NDNURBMEZENkNFRjgyRkYzOTM3M0E2RTA0NTJCRjFGRDc2OTEwQjkzMjkyQ0YzNTZDMRIJCAkSBXVvc21vEkkI3AQSRGliYy85ODdDMTdCMTFBQkMyQjIwMDE5MTc4QUNFNjI5MjlGRTk4NDAyMDJDRTc5NDk4RTI5RkU4RTVDQjAyQjdDMEE0EkkI4wQSRGliYy8yNzM5NEZCMDkyRDJFQ0NENTYxMjNDNzRGMzZFNEMxRjkyNjAwMUNFQURBOUNBOTdFQTYyMkIyNUY0MUU1RUIyGk8KRGliYy8yNzM5NEZCMDkyRDJFQ0NENTYxMjNDNzRGMzZFNEMxRjkyNjAwMUNFQURBOUNBOTdFQTYyMkIyNUY0MUU1RUIyEgc0MDg5MzU0Igc0MDg5MzU0EloKUgpGCh8vY29zbW9zLmNyeXB0by5zZWNwMjU2azEuUHViS2V5EiMKIQMQpu8Flaqd04iiBIBzIIqj4QDB8Lvgf8aMsLlQeX33nBIECgIIARjV5AsSBBCAiXoaQBFa9dKWBzls4GjqeEukgDTNZ9UYoXEa7vLfD5dzJ+HHFkZKGLsTP9brRdSOlMuq0iF9EGvMnoInd7leRYMQEl0="
      ]
    },
    "evidence": {
      "evidence": null
    },
    "last_commit": {
      "height": "2836989",
      "round": 0,
      "block_id": {
        "hash": "10419816E363D36492987AA2FBC1F09653DB026B2A6787F01B69C98EA54ADAEF",
        "parts": {
          "total": 3,
          "hash": "468EAE52F145F55319BD41B6A62629E2424CF53B91D7AE28BD7E2C07D9B2F7B3"
        }
      },
      "signatures": [
        {
          "block_id_flag": 2,
          "validator_address": "CB5A63B91E8F4EE8DB935942CBE25724636479E0",
          "timestamp": "2022-01-17T17:14:01.597493021Z",
          "signature": "/HG0b07XVaIDfBScZyT1tQ4iWvIvvvOeFAD58VvF46QMDh7F9ytxXlviso60bPmvrN/RXblgRB5G7XVEH0s9Cg=="
        },
        {
          "block_id_flag": 2,
          "validator_address": "16A169951A878247DBE258FDDC71638F6606D156",
          "timestamp": "2022-01-17T17:14:01.679151429Z",
          "signature": "cOh/DCVUfRMjhz5uEjmPUvr6YzM0rrjBSPYrcCIYExB+R2B/PmoctvE3HrYsXTTvPQOKEEGNpYf2Z9TaanyPDQ=="
        },
        ...
        {
          "block_id_flag": 2,
          "validator_address": "A677203440E86562D6DD475D0C2CA555EC01F803",
          "timestamp": "2022-01-17T17:14:01.620734893Z",
          "signature": "zONA/uGCfiOaRpHTMkMCtsnwUqmo1NnjRdQketHTZq6iCNbiGM5lI4QmPZtyg3bmk0GMNZ1kW06p1jrdAojkCQ=="
        }
      ]
    }
  }
}
```
<p/>
</details>


As the purpose of this document is to describe the transaction structure, rather than the block structure, we
will not spend too much time on the block structure.

Briefly, the important points are:

* `.block_id`: contains the hash of the block
* `.block`: the block data itself
* `.block.header`: important information about the block, especially:
  * `.block.header.chain_id`
  * `.block.header.height`
  * `.block.header.last_block_id`
* `.block.data.txs`: the transactions on which we will focus
* `.block.last_commit`: information about the last commit prior to this one

The transactions themselves are in `.block.data.txs`. This is an array, each entry
of which is an individual transaction.

The block we have chosen, 2836990, contains 64 transactions:

```sh
$ osmosisd query block 2836990 | jq -r '.block.data.txs | length'
64
```

Each transaction is base64-encoded data. For example, the first two are:

```json
"Cp0CCpoCCiovb3Ntb3Npcy5nYW1tLnYxYmV0YTEuTXNnU3dhcEV4YWN0QW1vdW50SW4S6wEKK29zbW8xZTBkbXpkeGRtcnd5ZjQ2bmNtNXNxY2xrZGFuM21hcTVrNWp2ZHgSSQjcBBJEaWJjLzk4N0MxN0IxMUFCQzJCMjAwMTkxNzhBQ0U2MjkyOUZFOTg0MDIwMkNFNzk0OThFMjlGRThFNUNCMDJCN0MwQTQSSQjjBBJEaWJjLzI3Mzk0RkIwOTJEMkVDQ0Q1NjEyM0M3NEYzNkU0QzFGOTI2MDAxQ0VBREE5Q0E5N0VBNjIyQjI1RjQxRTVFQjISCQgBEgV1b3NtbxoRCgV1b3NtbxIIMTUwMDAwMDAiCDE1MDAwMDAwEmYKUgpGCh8vY29zbW9zLmNyeXB0by5zZWNwMjU2azEuUHViS2V5EiMKIQI3Vc8hzNbQdpBrbHj8hELzzBskwVqQrad15VgsFn1RtBIECgIIARi+9AMSEAoKCgV1b3NtbxIBMBCAiXoaQD9uPzOcom2NJGzrHEkgytg585ybULi93PnLNKMsECGCNH5gH46Cmiv504ULlyMsTfiyYInMGo39jYIahbDcDLk=",
"Cp0CCpoCCiovb3Ntb3Npcy5nYW1tLnYxYmV0YTEuTXNnU3dhcEV4YWN0QW1vdW50SW4S6wEKK29zbW8xbDR1NTZsN2N2eDhuMG42Yzd3NjUwazAydno2N3F1ZGpsY3V0ODkSSQjcBBJEaWJjLzk4N0MxN0IxMUFCQzJCMjAwMTkxNzhBQ0U2MjkyOUZFOTg0MDIwMkNFNzk0OThFMjlGRThFNUNCMDJCN0MwQTQSSQjjBBJEaWJjLzI3Mzk0RkIwOTJEMkVDQ0Q1NjEyM0M3NEYzNkU0QzFGOTI2MDAxQ0VBREE5Q0E5N0VBNjIyQjI1RjQxRTVFQjISCQgBEgV1b3NtbxoRCgV1b3NtbxIIMTUwMDAwMDAiCDE1MDAwMDAwEmYKUgpGCh8vY29zbW9zLmNyeXB0by5zZWNwMjU2azEuUHViS2V5EiMKIQK1cR2MtFWdtiyO/qORycJYvhuEqF1W9howno2FFP/11xIECgIIARjM8wMSEAoKCgV1b3NtbxIBMBCAiXoaQHCrHmPW89D7BdROgVeDs0Uz4jz95MW/abhLOrsOT/fdS6UQ+Qvzj+htQe7TtKYGRfuK9UsyjcV6gIN7I8K0fbQ=",
```

We can decode these by passing them through a base64 decoder. The correct arguments depend on your
platform, but generally are of the form `base64 -D`. We do **not** recommend simply passing them through
to the terminal, as this is binary-encoded data, specifically [protobufs](https://developers.google.com/protocol-buffers).

```sh
osmosisd query block 2836990 | jq '.block.data.txs[0]' | base64 -D > outfile
```

The `outfile` will contain raw protobuf data.
Protobuf data does not contain its own structure with it. It requires the `.proto` file to understand
and interpret the fields, including converting them to a readable json format.

Fortunately, `osmosisd` provides some basic tools for querying individual transactions. It does not,
however, let you retrieve any arbitrary transaction, as you must pass it "events":

```sh
osmosisd query txs --events '<type>.<key>=<value>' [--height <height>]
```

If you already know the events, you can retrieve individual transactions.
Fortunately, if you are dealing with an individual block, you can get the transactions - and have `osmosisd`
decode the protobufs for you - by making the event be the block height:

```sh
osmosisd query txs --height 2836990 --events 'tx.height=2836990' -o json
```

The results should match the number of transactions we have in the block:

```json
{
  "total_count": "64",
  "count": "30",
  "page_number": "1",
  "page_total": "3",
  "limit": "30",
  "txs": [
      ...
```

The `total_count` is 64, as we expected. `osmosisd query txs` is paginated, so it only returned the first 30 of 64,
with this being page 1.

By passing the total transactions to retrieve, we can avoid the pagination:

```sh
osmosisd query txs --height 2836990 --events 'tx.height=2836990' -o json --limit 64
```

For convenience, we also will pass it through `jq` for formatting, and save the results to a file:

```sh
osmosisd query txs --height 2836990 --events 'tx.height=2836990' -o json --limit 64 | jq '.' > outfile.json
```

The entire block's transactions is available at [txs-block-2836990.json](txs-block-2836990.md).

We now have the ability to look at transactions:

```sh
# to see all transactions
cat outfile.json | jq '.txs'
# to see an individual transaction
cat outfile.json | jq '.txs[1]'
```

Below is part of the transaction at index 1 of the above block.

<details><summary>transaction 1</summary>

```json
{
  "height": "2836990",
  "txhash": "5BBC27779EA33FC99C319D74CFE730DC2A3102277D75410E75F2F9F5ED259BFE",
  "codespace": "",
  "code": 0,
  "data": "0A2C0A2A2F6F736D6F7369732E67616D6D2E763162657461312E4D7367537761704578616374416D6F756E74496E",
  "raw_log": "<raw data>",
  "logs": [
    {
      "msg_index": 0,
      "log": "",
      "events": [
        {
          "type": "coin_received",
          "attributes": [
            {
              "key": "receiver",
              "value": "osmo1thscstwxp87g0ygh7le3h92f9ff4sel9y9d2eysa25p43yf43rysk7jp93"
            },
            {
              "key": "amount",
              "value": "15000000uosmo"
            },
            {
              "key": "receiver",
              "value": "osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89"
            },
            {
              "key": "amount",
              "value": "289236271ibc/987C17B11ABC2B20019178ACE62929FE9840202CE79498E29FE8E5CB02B7C0A4"
            },
            ...
          ]
        },
        {
          "type": "coin_spent",
          "attributes": [
            {
              "key": "spender",
              "value": "osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89"
            },
            {
              "key": "amount",
              "value": "15000000uosmo"
            },
            {
              "key": "spender",
              "value": "osmo1thscstwxp87g0ygh7le3h92f9ff4sel9y9d2eysa25p43yf43rysk7jp93"
            },
            {
              "key": "amount",
              "value": "289236271ibc/987C17B11ABC2B20019178ACE62929FE9840202CE79498E29FE8E5CB02B7C0A4"
            },
            ...
          ]
        },
        {
          "type": "message",
          "attributes": [
            {
              "key": "action",
              "value": "/osmosis.gamm.v1beta1.MsgSwapExactAmountIn"
            },
            {
              "key": "sender",
              "value": "osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89"
            },
            {
              "key": "sender",
              "value": "osmo1thscstwxp87g0ygh7le3h92f9ff4sel9y9d2eysa25p43yf43rysk7jp93"
            },
            ...
          ]
        },
        {
          "type": "token_swapped",
          "attributes": [
            {
              "key": "module",
              "value": "gamm"
            },
            {
              "key": "sender",
              "value": "osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89"
            },
            {
              "key": "pool_id",
              "value": "604"
            },
            {
              "key": "tokens_in",
              "value": "15000000uosmo"
            },
            {
              "key": "tokens_out",
              "value": "289236271ibc/987C17B11ABC2B20019178ACE62929FE9840202CE79498E29FE8E5CB02B7C0A4"
            },
            {
              "key": "module",
              "value": "gamm"
            },
            {
              "key": "sender",
              "value": "osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89"
            },
            {
              "key": "pool_id",
              "value": "611"
            },
            {
              "key": "tokens_in",
              "value": "289236271ibc/987C17B11ABC2B20019178ACE62929FE9840202CE79498E29FE8E5CB02B7C0A4"
            },
            {
              "key": "tokens_out",
              "value": "3802225ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2"
            },
            ...
          ]
        },
        {
          "type": "transfer",
          "attributes": [
            {
              "key": "recipient",
              "value": "osmo1thscstwxp87g0ygh7le3h92f9ff4sel9y9d2eysa25p43yf43rysk7jp93"
            },
            {
              "key": "sender",
              "value": "osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89"
            },
            {
              "key": "amount",
              "value": "15000000uosmo"
            },
            {
              "key": "recipient",
              "value": "osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89"
            },
            {
              "key": "sender",
              "value": "osmo1thscstwxp87g0ygh7le3h92f9ff4sel9y9d2eysa25p43yf43rysk7jp93"
            },
            {
              "key": "amount",
              "value": "289236271ibc/987C17B11ABC2B20019178ACE62929FE9840202CE79498E29FE8E5CB02B7C0A4"
            },
            ...
          ]
        }
      ]
    }
  ],
  "info": "",
  "gas_wanted": "2000000",
  "gas_used": "183726",
  "tx": {
    "@type": "/cosmos.tx.v1beta1.Tx",
    "body": {
      "messages": [
        {
          "@type": "/osmosis.gamm.v1beta1.MsgSwapExactAmountIn",
          "sender": "osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89",
          "routes": [
            {
              "poolId": "604",
              "tokenOutDenom": "ibc/987C17B11ABC2B20019178ACE62929FE9840202CE79498E29FE8E5CB02B7C0A4"
            },
            {
              "poolId": "611",
              "tokenOutDenom": "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2"
            },
            {
              "poolId": "1",
              "tokenOutDenom": "uosmo"
            }
          ],
          "tokenIn": {
            "denom": "uosmo",
            "amount": "15000000"
          },
          "tokenOutMinAmount": "15000000"
        }
      ],
      "memo": "",
      "timeout_height": "0",
      "extension_options": [],
      "non_critical_extension_options": []
    },
    "auth_info": {
      "signer_infos": [
        {
          "public_key": {
            "@type": "/cosmos.crypto.secp256k1.PubKey",
            "key": "ArVxHYy0VZ22LI7+o5HJwli+G4SoXVb2GjCejYUU//XX"
          },
          "mode_info": {
            "single": {
              "mode": "SIGN_MODE_DIRECT"
            }
          },
          "sequence": "63948"
        }
      ],
      "fee": {
        "amount": [
          {
            "denom": "uosmo",
            "amount": "0"
          }
        ],
        "gas_limit": "2000000",
        "payer": "",
        "granter": ""
      }
    },
    "signatures": [
      "cKseY9bz0PsF1E6BV4OzRTPiPP3kxb9puEs6uw5P991LpRD5C/OP6G1B7tO0pgZF+4r1SzKNxXqAg3sjwrR9tA=="
    ]
  },
  "timestamp": "2022-01-17T17:14:01Z"
}
```

</details>

Each transaction has an identical structure. The differences are in the details inside each structure:

<details><summary>transaction 2</summary>

```json
{
  "height": "2836990",
  "txhash": "5BBC27779EA33FC99C319D74CFE730DC2A3102277D75410E75F2F9F5ED259BFE",
  "codespace": "",
  "code": 0,
  "data": "0A2C0A2A2F6F736D6F7369732E67616D6D2E763162657461312E4D7367537761704578616374416D6F756E74496E",
  "raw_log": "<raw data>",
  "logs": [
    {
      "msg_index": 0,
      "log": "",
      "events": [
        { ... },
        { ... },
        ...
      ]
    }
  ],
  "info": "",
  "gas_wanted": "2000000",
  "gas_used": "183726",
  "tx": {
    "@type": "/cosmos.tx.v1beta1.Tx",
    "body": {
      "messages": [
        {
          "@type": "/osmosis.gamm.v1beta1.MsgSwapExactAmountIn",
          "sender": "osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89",
          "routes": [
            {
              "poolId": "604",
              "tokenOutDenom": "ibc/987C17B11ABC2B20019178ACE62929FE9840202CE79498E29FE8E5CB02B7C0A4"
            },
            {
              "poolId": "611",
              "tokenOutDenom": "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2"
            },
            {
              "poolId": "1",
              "tokenOutDenom": "uosmo"
            }
          ],
          "tokenIn": {
            "denom": "uosmo",
            "amount": "15000000"
          },
          "tokenOutMinAmount": "15000000"
        }
      ],
      "memo": "",
      "timeout_height": "0",
      "extension_options": [],
      "non_critical_extension_options": []
    },
    "auth_info": {
      "signer_infos": [
        {
          "public_key": {
            "@type": "/cosmos.crypto.secp256k1.PubKey",
            "key": "ArVxHYy0VZ22LI7+o5HJwli+G4SoXVb2GjCejYUU//XX"
          },
          "mode_info": {
            "single": {
              "mode": "SIGN_MODE_DIRECT"
            }
          },
          "sequence": "63948"
        }
      ],
      "fee": {
        "amount": [
          {
            "denom": "uosmo",
            "amount": "0"
          }
        ],
        "gas_limit": "2000000",
        "payer": "",
        "granter": ""
      }
    },
    "signatures": []
  },
  "timestamp": "2022-01-17T17:14:01Z"
}
```

</details>


Each transaction is structured of the following key elements. The more complex ones will be described in detail below.

* `height`: height of the block in which the transaction is included
* `txhash`: hash of the transaction, obviously excluding the `txhash` itself
* `raw_log`: raw data of the messages; compressed, original format of all of the content of `.logs`
* `logs`: array of individual log messages that make up the contents of the transaction; details below
* `gas_wanted`: how much gas the transaction sender allowed
* `gas_used`: how much gas actually was used
* `tx`: the originally sent transaction, from the sender; this, in turn, triggered the various messages that comprise the transaction; will be described in detail below
* `timestamp`: timestamp of the original transaction

Let's explore the parts that require more detail. In addition, for practical examples,
we will link to individual analyses of several transactions.

## tx

The `tx` field contains the original transaction that was sent to the blockchain that triggered the
rest of the messages.

This `tx` could be something simple - transfer 10osmo from account A to account B - or something more
complex, like swapping tokens via a liquidity pool or bonding.

When you use the [Osmosis Web App](https://app.osmosis.zone/) or `osmosisd` to send a transaction, it
composes and sends the single message in the `tx` field.

```json
"@type": "/cosmos.tx.v1beta1.Tx",
"body": {
  "messages": [
    {
      "@type": "<transaction type>",
      "sender": "<sender account>",
      ...
      // fields that are unique to the transaction type
    }
  ],
  "memo": "",
  "timeout_height": "0",
  "extension_options": [],
  "non_critical_extension_options": []
},
"auth_info": {
  "signer_infos": [
    {
      "public_key": {
        "@type": "/cosmos.crypto.secp256k1.PubKey",
        "key": "ArVxHYy0VZ22LI7+o5HJwli+G4SoXVb2GjCejYUU//XX"
      },
      "mode_info": {
        "single": {
          "mode": "SIGN_MODE_DIRECT"
        }
      },
      "sequence": "63948"
    }
  ],
  "fee": {
    "amount": [
      {
        "denom": "uosmo",
        "amount": "0"
      }
    ],
    "gas_limit": "2000000",
    "payer": "",
    "granter": ""
  }
},
"signatures": []
```

Exploring the fields:

* `@type`: the base transaction type. In our block, every single one of the transactions has the same base type, `/cosmos.tx.v1beta1.Tx`. This is defined by the cosmos SDK.
* `body`: the core body of the transaction.
* `auth_info`: who signed this message when it was sent to the chain?

### signer

The `auth_info` field contains the signer. This normally will be signed by a Cosmos public key
signified by `auth_info.signer_infos[0].public_key.@type`, while the `.key` field will give the public key.

This public key should match the sender of the messages in the `body`, and is checked by the chain upon submission.

### body

The `body` contains the original transaction. It contains one or more `messages`, all of which must succeed
for the transaction to succeed, i.e. a transaction. Most of the transactions are likely to have a single message, but more can exist.

The fields of message always will contain at least two fields:

* `@type`: the specific type of the message within the application, for example, `/osmosis.gamm.v1beta1.MsgSwapEactAmountIn`
* `sender`: the sender of the message

The rest of the fields are specific to the `@type` of message. Once you know the type of message, you can look in the
source code for the protobuf definition of the message type.

Each Cosmos SDK app implementation will have its own modules and therefore its own message types,
in addition to basic ones inherited from the Cosmos SDK.

When the Cosmos app, in this example osmosisd, and specifically the target module, in our example `gamm`, receives the message, it in turn
does internal activities, including
sending various messages that comprise the fulfillment of the requested transaction. These are recorded in the `logs`.

### logs

The `logs` represent the various emitted messages that describe the internal components of fulfillment of the requested transaction.

There can be 0, 1 or multiple entries in the `logs` field.

Each message in `logs` has just 3 properties:

* `msg_index`: increments from 0 for messages within the transaction; if there are multiple messages, each will have an incremented `msg_index`, although the 0th index may be optional.
* `log`: often blank
* `events`: events emitted by the application

Each entry in `events` has just two properties:

* `type`: the type of event, which has meaning solely to the application
* `attributes`: an array of key-value structures

The `type` is a simple string, which has meaning only in the context of the application, for example:

```json
"type": "coin_received",
```

The `attributes` are an array of key-value structures, with just two keys: `key` and `value`. For example:

```json
{
  "key": "receiver",
  "value": "osmo1thscstwxp87g0ygh7le3h92f9ff4sel9y9d2eysa25p43yf43rysk7jp93"
},
```

Since the attributes are an array of objects with two properties - `key` and `value` - applications may use
several of them in series to complete a message. Check out the analyzed transactions below for a better understanding.

Sample transactions:

* [Arbitrage SwapIn](arb.md)