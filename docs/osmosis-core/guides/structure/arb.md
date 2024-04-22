# Arbitrage

The transaction at index 1 of block 2836990 is an arbitrage transaction, swapping an exact amount in and (hopefully) getting a larger
amount out, via one or more counterparties.

Let's analyze the parts of the transaction `tx` field.

```json
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
```


* `@type`: Like all Cosmos transactions, this transaction is of type `/cosmos.tx.v1beta1.Tx`.
* `auth_info`: The sender of the message signed it with the public key `"ArVxHYy0VZ22LI7+o5HJwli+G4SoXVb2GjCejYUU//XX"` which is of key type `/cosmos.crypto.secp256k1.PubKey`.
* `body`: The original contents of the transaction sent by the client, in the form of one or more `messages`.

This transaction has a single message, whose contents are:

```json
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
```

The `@type` of this message is `"/osmosis.gamm.v1beta1.MsgSwapExactAmountIn"`. This means it is
a message on the Osmosis app, in the `gamm` module, version `v1beta`, with the message
[MsgSwapExactAmountIn](https://github.com/osmosis-labs/osmosis/blob/13531e5bcdbd262527c916d462974b0ef01ef7a9/x/gamm/types/tx.pb.go#L282-L287).

Each Cosmos SDK app implementation will have its own modules and therefore its own message types,
in addition to basic ones inherited from the Cosmos SDK.

The structure of the message reflects the actual message structure;

```go
type MsgSwapExactAmountIn struct {
	Sender            string                                 `protobuf:"bytes,1,opt,name=sender,proto3" json:"sender,omitempty" yaml:"sender"`
	Routes            []SwapAmountInRoute                    `protobuf:"bytes,2,rep,name=routes,proto3" json:"routes"`
	TokenIn           types.Coin                             `protobuf:"bytes,3,opt,name=tokenIn,proto3" json:"tokenIn" yaml:"token_in"`
	TokenOutMinAmount github_com_cosmos_cosmos_sdk_types.Int `protobuf:"bytes,4,opt,name=tokenOutMinAmount,proto3,customtype=github.com/cosmos/cosmos-sdk/types.Int" json:"tokenOutMinAmount" yaml:"token_out_min_amount"`
}
```

The properties of the message are those of the `MsgSwapExactAmountIn` struct.

`sender` is the account that is sending tokens in to swap:

```json
  "sender": "osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89",
```

`tokenIn` is the amount of tokens being sent in to swap, in this case 15000000 uosmo:

```json
"tokenIn": {
  "denom": "uosmo",
  "amount": "15000000"
},
```
`tokenOutMinAmount` is the minimal amount of tokens expected out, in this case 15000000:

```json
"tokenOutMinAmount": "15000000"
```

Finally, `routes` describes the pool(s) to be used to swap tokens:

```json
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
```

The pools, in this case, are [pool 1](https://app.osmosis.zone/pool/1) ATOM/OSMO, [pool 604](https://app.osmosis.zone/pool/604) STARS/OSMO,
and [pool 611](https://app.osmosis.zone/pool/611) ATOM/STARS.

When the Osmosis app, and specifically the target module `gamm` receives the message, it in turn does internal activities, including
sending various messages that comprise the fulfillment of the requested transaction. These are recorded in the `logs`.

### logs

The `logs` represent the various emitted messages that describe the internal components of fulfillment of the requested transaction.

Our transaction has just one message in `logs`, with a `msg_index` of `0`.

This transaction has a single client-sent message of type `"/osmosis.gamm.v1beta1.MsgSwapExactAmountIn"`,
leading to a single message in `logs`, with the following events.

#### First Event

The first event is `coin_received`:

```json
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
    {
      "key": "receiver",
      "value": "osmo1ejaswj8lcyh0zgnes8zt45e0w7tqm4mrxr74sfwgpdh72shp58ms4fdqsk"
    },
    {
      "key": "amount",
      "value": "289236271ibc/987C17B11ABC2B20019178ACE62929FE9840202CE79498E29FE8E5CB02B7C0A4"
    },
    {
      "key": "receiver",
      "value": "osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89"
    },
    {
      "key": "amount",
      "value": "3802225ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2"
    },
    {
      "key": "receiver",
      "value": "osmo1mw0ac6rwlp5r8wapwk3zs6g29h8fcscxqakdzw9emkne6c8wjp9q0t3v8t"
    },
    {
      "key": "amount",
      "value": "3802225ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2"
    },
    {
      "key": "receiver",
      "value": "osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89"
    },
    {
      "key": "amount",
      "value": "15003605uosmo"
    }
  ]
},
```

There are 12 attributes to the event. Each comes in pairs, with the first attribute pair indicating who received the coin,
and the second indicating the amount, including coin.

For example:

```json
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
```

Account `osmo1thscstwxp87g0ygh7le3h92f9ff4sel9y9d2eysa25p43yf43rysk7jp93` received `15000000uosmo`, while
account `osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89` received `289236271ibc/987C17B11ABC2B20019178ACE62929FE9840202CE79498E29FE8E5CB02B7C0A4`.

#### Second Event

The second event is of type `coin_spent`:

```json
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
    {
      "key": "spender",
      "value": "osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89"
    },
    {
      "key": "amount",
      "value": "289236271ibc/987C17B11ABC2B20019178ACE62929FE9840202CE79498E29FE8E5CB02B7C0A4"
    },
    {
      "key": "spender",
      "value": "osmo1ejaswj8lcyh0zgnes8zt45e0w7tqm4mrxr74sfwgpdh72shp58ms4fdqsk"
    },
    {
      "key": "amount",
      "value": "3802225ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2"
    },
    {
      "key": "spender",
      "value": "osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89"
    },
    {
      "key": "amount",
      "value": "3802225ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2"
    },
    {
      "key": "spender",
      "value": "osmo1mw0ac6rwlp5r8wapwk3zs6g29h8fcscxqakdzw9emkne6c8wjp9q0t3v8t"
    },
    {
      "key": "amount",
      "value": "15003605uosmo"
    }
  ]
},
```

The structure of the attributes here is similar to that of `coin_received`, except that the `key` is not `receiver`, but
rather `spender`.

Notice that there are exactly 6 `spender`s, which aligns with exactly 6 `receiver`s.

#### Third Event

The third event is simply of type `message`, indicating the message that is sent:

```json
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
    {
      "key": "sender",
      "value": "osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89"
    },
    {
      "key": "sender",
      "value": "osmo1ejaswj8lcyh0zgnes8zt45e0w7tqm4mrxr74sfwgpdh72shp58ms4fdqsk"
    },
    {
      "key": "sender",
      "value": "osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89"
    },
    {
      "key": "sender",
      "value": "osmo1mw0ac6rwlp5r8wapwk3zs6g29h8fcscxqakdzw9emkne6c8wjp9q0t3v8t"
    },
    {
      "key": "module",
      "value": "gamm"
    },
    {
      "key": "sender",
      "value": "osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89"
    }
  ]
},
```

#### Fourth Event

The fourth event is `tokens_swapped`. It summarizes the actual swaps that took place. Each set of 4 consecutive
attribute pairs goes together:

```json
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
      "value": "1"
    },
    {
      "key": "tokens_in",
      "value": "3802225ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2"
    },
    {
      "key": "tokens_out",
      "value": "15003605uosmo"
    }
  ]
},
```

The 3 groupings are:

1. The module `gamm` executed `15000000uosmo` from `osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89` swapped into `pool_id 604` in exchange for `289236271ibc/987C17B11ABC2B20019178ACE62929FE9840202CE79498E29FE8E5CB02B7C0A4`
2. The module `gamm` executed `289236271ibc/987C17B11ABC2B20019178ACE62929FE9840202CE79498E29FE8E5CB02B7C0A4` from `osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89` swapped into `pool_id 611` in exchange for `3802225ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2`
3. The module `gamm` executed `3802225ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2` from `osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89` swapped into `pool_id 1` in exchange for `15003605uosmo`

#### Fifth Event

The fifth - and final - event is `transfer`, with each tuple representing transfers from one account to another of a specified amount.

```json
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
    {
      "key": "recipient",
      "value": "osmo1ejaswj8lcyh0zgnes8zt45e0w7tqm4mrxr74sfwgpdh72shp58ms4fdqsk"
    },
    {
      "key": "sender",
      "value": "osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89"
    },
    {
      "key": "amount",
      "value": "289236271ibc/987C17B11ABC2B20019178ACE62929FE9840202CE79498E29FE8E5CB02B7C0A4"
    },
    {
      "key": "recipient",
      "value": "osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89"
    },
    {
      "key": "sender",
      "value": "osmo1ejaswj8lcyh0zgnes8zt45e0w7tqm4mrxr74sfwgpdh72shp58ms4fdqsk"
    },
    {
      "key": "amount",
      "value": "3802225ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2"
    },
    {
      "key": "recipient",
      "value": "osmo1mw0ac6rwlp5r8wapwk3zs6g29h8fcscxqakdzw9emkne6c8wjp9q0t3v8t"
    },
    {
      "key": "sender",
      "value": "osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89"
    },
    {
      "key": "amount",
      "value": "3802225ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2"
    },
    {
      "key": "recipient",
      "value": "osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89"
    },
    {
      "key": "sender",
      "value": "osmo1mw0ac6rwlp5r8wapwk3zs6g29h8fcscxqakdzw9emkne6c8wjp9q0t3v8t"
    },
    {
      "key": "amount",
      "value": "15003605uosmo"
    }
  ]
}
```

With 18 entries, each group of 3 makes 6 transfers, which aligns perfectly with the 6 `coin_spent` and 6 `coin_received` pairs.

Essentially, the original message was: "take 15000000uosmo, and using pools 1, 604, and 611, swap them.

The result was 6 transfers, represented by the 6 `coin_received` and 6 `coin_spent`, or, conversely, 6 `transfer`:

| From | To | Amount |
| --- | --- | --- |
| `osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89` | `osmo1thscstwxp87g0ygh7le3h92f9ff4sel9y9d2eysa25p43yf43rysk7jp93` | `15000000uosmo` |
| `osmo1thscstwxp87g0ygh7le3h92f9ff4sel9y9d2eysa25p43yf43rysk7jp93` | `osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89` |  `289236271ibc/987C17B11ABC2B20019178ACE62929FE9840202CE79498E29FE8E5CB02B7C0A4` |
| `osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89` | `osmo1ejaswj8lcyh0zgnes8zt45e0w7tqm4mrxr74sfwgpdh72shp58ms4fdqsk` | `289236271ibc/987C17B11ABC2B20019178ACE62929FE9840202CE79498E29FE8E5CB02B7C0A4` |
| `osmo1ejaswj8lcyh0zgnes8zt45e0w7tqm4mrxr74sfwgpdh72shp58ms4fdqsk` | `osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89` | `3802225ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2` |
| `osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89`  | `osmo1mw0ac6rwlp5r8wapwk3zs6g29h8fcscxqakdzw9emkne6c8wjp9q0t3v8t` | `3802225ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2` |
| `osmo1mw0ac6rwlp5r8wapwk3zs6g29h8fcscxqakdzw9emkne6c8wjp9q0t3v8t` | `osmo1l4u56l7cvx8n0n6c7w650k02vz67qudjlcut89` | `15003605uosmo` |

These align precisely with the `coin_spent` and `coin_received` entries.

This specific transaction was an arbitrage transaction. With one exact swap in/out, the initiator deposited 15000000uosmo and
received 15003605uosmo, a gain of 3605uosmo.
