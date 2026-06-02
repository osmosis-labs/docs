beaker

# beaker

## Table of contents

### Classes

- [Account](classes/Account.md)
- [Contract](classes/Contract.md)

### Functions

- [extendWith](README.md#extendwith)
- [getAccounts](README.md#getaccounts)
- [getContracts](README.md#getcontracts)

## Functions

### extendWith

▸ **extendWith**(`properties`): (`context`: `Record`&lt;`string`, `unknown`>) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `properties` | `Record`&lt;`string`, `unknown`> |

#### Returns

`fn`

▸ (`context`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Record`&lt;`string`, `unknown`> |

##### Returns

`void`

#### Defined in

[src/utils.ts:21](https://github.com/osmosis-labs/beaker/blob/f40f408/ts/beaker-console/src/utils.ts#L21)

___

### getAccounts

▸ **getAccounts**(`conf`, `network`): `Promise`&lt;&#123; `[k: string]`: `T`;  &#125;>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conf` | `Config` |
| `network` | `string` |

#### Returns

`Promise`&lt;&#123; `[k: string]`: `T`;  &#125;>

#### Defined in

[src/account.ts:92](https://github.com/osmosis-labs/beaker/blob/f40f408/ts/beaker-console/src/account.ts#L92)

___

### getContracts

▸ **getContracts**(`client`, `state`, `sdk`): `Record`&lt;`string`, `unknown`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `CosmWasmClient` |
| `state` | `Record`&lt;`string`, `unknown`> |
| `sdk` | `Record`&lt;`string`, `Record`&lt;`string`, `Function`>> |

#### Returns

`Record`&lt;`string`, `unknown`>

#### Defined in

[src/contract.ts:63](https://github.com/osmosis-labs/beaker/blob/f40f408/ts/beaker-console/src/contract.ts#L63)
