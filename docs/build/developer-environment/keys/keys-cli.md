---
description: Create, import, and manage keys with the CLI.
---

# Basic Key Management

Create, import, export and delete keys using the CLI keyring. 

For this guide, the osmosisd binary is required, which you can install from [here](/build/developer-environment/osmosisd).

## Create a new key

```
keys add <wallet_name>
```

You can create a new key with the name `Default` as in the following example:
<details>
<summary>Example: Create a new address</summary>

```bash
$ osmosisd keys add Default
- address: osmo1quw5r22pxy8znjtdkgqc65atrm3x5hg6vycm5n
  name: Default
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AtQ2XW3f5D2jkF9zg7Ml..."}'
  type: local

**Important** write this mnemonic phrase in a safe place.
It is the only way to recover your account if you ever forget your password.

spare leopard potato hospital series salt model myself bronze print despair please mutual rival battle lumber crater brain food artwork goose west talent ritual
```

</details>
The key comes with a "mnemonic phrase", which is serialized into a human-readable 24-word mnemonic. User can recover their associated addresses with the mnemonic phrase.

:::danger
It is important that you keep the mnemonic for address secure, as there is **no way** to recover it. You would not be able to recover and access the funds in the wallet if you forget the mnemonic phrase.
:::

## Restore existing key by seed phrase

```
keys add <key_name> --recover
```

You can restore an existing key with the mnemonic.

<details>
<summary>Example: Restore an existing key</summary>

```bash
$ osmosisd keys add Default_restore --recover
> Enter your bip39 mnemonic
## Enter your 24-word mnemonic here ##
```

</details>


## List your keys

```
keys list
```

Multiple keys can be created when needed. You can list all keys saved under the storage path.

<details>
<summary>Example: List all of your keys</summary>

```bash
$ osmosisd keys list
- address: ## Address of "Default" ##
  name: Default
  pubkey: ## Pubkey of "Default" ##
  type: local
- address: ## Address of "Default_restore" ##
  name: Default_restore
  pubkey: ## Pubkey of "Default_restore" ##
  type: local
```

</details>

## Retrieve key information

```
keys show <key_name>
```

You can retrieve key information by its name:

<details>
<summary>Example: Retrieve key information - Account Address and its public key</summary>

```bash
$ osmosisd keys show Default --bech acc
- address: osmo1quw5r22pxy8znjtdkgqc65atrm3x5hg6vycm5n
  name: Default
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AtQ2XW3f5D2jkF9zg7Ml..."}'
  type: local
```

</details>

<details>
<summary>Example: Retrieve key information - Validator Address and its public key</summary>

```bash
$ osmosisd keys show Default --bech val
- address: osmovaloper1zdlttjrqh9jsgk2l8tgn6f0kxlfy98s3prz35z
  name: Default
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AtQ2XW3f5D2jkF9zg7Ml..."}'
  type: local
```

</details>

<details>
<summary>Example: Retrieve key information - Consensus nodes Address and its public key</summary>

```bash
$ osmosisd keys show Default --bech cons
- address: osmovalcons1zdlttjrqh9jsgk2l8tgn6f0kxlfy98s34pfmlc
  name: Default
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AtQ2XW3f5D2jkF9zg7Ml..."}'
  type: local
```

</details>


## Delete a key

```
keys delete <key_name>
```

You can delete a key in your storage path.

:::danger
Make sure you have backed up the key mnemonic before removing any of your keys, as there will be no way to recover your key without the mnemonic.
:::

<details>
<summary>Example: Remove a key</summary>

```bash
$ osmosisd keys delete Default_restore1
Key reference will be deleted. Continue? [y/N]: y
Key deleted forever (uh oh!)
```

</details>

## Export private keys

```
keys export <key_name>
```

You can export and backup your key by using the `export` subcommand:

<details>
<summary>Example: Export your keys</summary>
Exporting the key _Default_ :

```bash
$ osmosisd keys export Default
Enter passphrase to encrypt the exported key: ## Insert passphrase (must be at least 8 characters)##
-----BEGIN TENDERMINT PRIVATE KEY-----
kdf: bcrypt
salt: ## Salt of the key ##
type: secp256k1

## Tendermint private key ##
-----END TENDERMINT PRIVATE KEY-----
```

</details>

## The keyring-backend option
Interacting with a node requires a public-private key pair. Keyring is the place holding the keys. The keys can be stored in different locations with specified backend type. 
```
$ osmosisd keys [subcommands] --keyring-backend [backend type]
```
### os backend
The default `os` backend stores the keys in operating system's credential sub-system, which are comfortable to most users, yet without compromising on security. 

Here is a list of the corresponding password managers in different operating systems:
- macOS (since Mac OS 8.6): [Keychain](https://support.apple.com/en-gb/guide/keychain-access/welcome/mac)
- Windows: [Credentials Management API](https://learn.microsoft.com/en-us/windows/win32/secauthn/credentials-management)
- GNU/Linux:
  - [libsecret](https://gitlab.gnome.org/GNOME/libsecret)
  - [kwallet](https://invent.kde.org/frameworks/kwallet)

### file backend
The `file` backend stores the encrypted keys inside the app's configuration directory. A password entry is required every time a user access it, which may also occur multiple times of repeated password prompts in one single command.

### test backend
The `test` backend is a password-less variation of the `file` backend. It stores unencrypted keys inside the app's configuration directory. It should only be used in testing environments and never be used in production.