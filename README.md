<div align="center">
  <h1>
    🦄 Libra Web
  </h1>

  <p>
    <strong>Unofficial Javascript Client for <a href="http://libra.org">Libra Blockchain</a></strong>

[![Twitter Follow](https://img.shields.io/twitter/follow/bandprotocol.svg?style=social)](https://twitter.com/BandProtocol)
[![NPM](https://img.shields.io/npm/l/libra-web.svg)](https://opensource.org/licenses/mit-license.php)
[![Dependency Status](https://david-dm.org/bandprotocol/libra-web.svg)](https://david-dm.org/bandprotocol/libra-web)
[![devDependency Status](https://david-dm.org/bandprotocol/libra-web/dev-status.svg)](https://david-dm.org/bandprotocol/libra-web#info=devDependencies)

  </p>
</div>

**`libra-web`** is an unofficial javascript client for [Libra blockchain](http://libra.org). The library allows javascript program to interact with Libra nodes with [protobuf](https://developers.google.com/protocol-buffers/) message through [grpc-web](https://grpc.io/). **It works in both Browser and Node.js environments**. Note that this library performs key management internally. No server required! (except HTTP/2 proxy served through TryLibra.org)

Much of this library borrows the code from [libra-core](https://github.com/perfectmak/libra-core), which does a lot of heavy-lifting already (kudos to [perfectmak](https://github.com/perfectmak)!)

# Installation

### 🔻via yarn

```sh
$ yarn add libra-web
```

### 🔻via CDN

```
Link TBD
```

# Usage

Below you can find example usages together with explanation. Note that this is an alpha software and interface can change all the time, especially when Libra's interface itself is not yet settle.

### 👛 LibraWallet

You can create a wallet using `LibraWallet` class. A wallet is like your masterkey and you can create almost infinitely many Libra accounts from it. Since we're using the same mnemonic scheme as libra-cli, you should be able to reuse the mnemonic exported from the official client and vice-versa.

```js
import { LibraWallet } from 'libra-web'

// Create a new random wallet
const wallet1 = LibraWallet.create()
console.log(wallet1.getMnemonic())

// Regenerate wallet from an existing Mnemonic
wallet2 = LibraWallet('student deliver dentist cat gorilla sleep proud naive gown fiber awkward weasel')
console.log(wallet2.getMnemonic())
```

### 🎫 Account

An `Account` can be created by calling `get_account` function on a wallet, with a nonce integer. You use any number (0, 1, 2, ...) to generate a new account under your wallet. This is similar to how [MetaMask](https://metamask.io) keeps track of account. An `Account` contains its `address`, `public_key`, and `private_key`.

```js
import { LibraWallet } from 'libra-web'

const wallet = LibraWallet.create()

const account1 = wallet.getAccount(0)
console.log(account1.getAddress().toHex())
console.log(account1.getPublicKey())
console.log(account1.getSecretKey())

const account2 = wallet.getAccount(1)
console.log(account2.getAddress().toHex())
console.log(account2.getPublicKey())
console.log(account2.getSecretKey())
```

### 📟 LibraClient

A `LibraClient` must be created in order to send protobuf message to a Libra node. You can create a client with the following code.

```js
import { LibraClient } from 'libra-web'

client1 = LibraClient() //  Default client connecting to the official testnet through TryLibra.org
client2 = LibraClient({
  protocol: 'http',
  host: 'localhost',
  port: '8080',
}) // Client connecting to a local node (see HTTP/2 Proxy below)
```

### 🕵️‍ Get Account State of an Address

You can query an account's state by using `get_account_state` function on `LibraClient`. The function returns an `AccountState`, which contains the address' sequence number, balance, and more. If an account has not been created yet (never received any funds), the function will return `None`.

```js
import { LibraWallet, LibraClient } from 'libra-web'

const client = LibraClient()
const wallet = LibraWallet('student deliver dentist cat gorilla sleep proud naive gown fiber awkward weasel')
const address = wallet.getAccount(0).getAddress()

// In an async function
// You can pass in a hex string address
const accountState = await client.getAccountState(address)
console.log(accountState.balance)
console.log(accountState.sequenceNumber)
console.log(accountState.authenticationKey)
console.log(accountState.sentEventsCount)
console.log(accountState.receivedEventsCount)
```

### 🌟 Mint Testnet Libra Token

You can mint testnet libra with `client.mintWithFaucet` function, which sends a HTTP GET request to [http://faucet.testnet.libra.org](http://faucet.testnet.libra.org). You can customize this URL by passing a key-value argument `faucet` when creating a `LibraClient` (for example, when you want to have your own faucet service). The second argument is the mini-libra amount which is `10^6` times the amount of Libra token. (e.g. `10000` mini-libra is `0.01` Libra token).

```js
import { LibraWallet, LibraClient } from 'libra-web'

const client = LibraClient()
const wallet = LibraWallet('student deliver dentist cat gorilla sleep proud naive gown fiber awkward weasel')
const address = wallet.getAccount(0).getAddress()

// Mint 0.01 Libra to the given address
client.mintWithFaucet(address, 10000)
```

### 🗣 Creating a Transfer Transaction Script and Sending the Transaction

Note that in the official testnet, the Libra node ONLY allows sending [the official transfer transaction script](https://github.com/libra/libra/blob/master/language/stdlib/transaction_scripts/peer_to_peer_transfer.mvir). In the future, this library can be extended to support more transaction scripts as well, as you can see that the logic of creating and sending a transaction is completely independent!

```js
import { LibraWallet, LibraClient, LibraTransactionFactory } from 'libra-web'

const client = LibraClient()
const wallet = LibraWallet('student deliver dentist cat gorilla sleep proud naive gown fiber awkward weasel')
const account1 = wallet.getAccount(0)
const account2 = wallet.getAccount(1)

// Create a transfer transaction object to send 0.001 Libra from account1 to account2
const tx = LibraTransactionFactory.createTransfer(account1.getAddress(), account2.getAddress(), 1000)

// You can send a transaction by calling `send_transaction` function, which takes a sender `Account` and a `Transaction` object. You can also optionally passed `max_gas_amount`, `gas_unit_price`, and `expiration_time`.
client.execute(tx, account1)
```

## HTTP/2 Proxy

Currently [gRPC-web](https://github.com/grpc/grpc-web) requires a proxy to communicate with gRPC-enabled Libra nodes. To run a local proxy, you need [Docker](https://www.docker.com/) and run:

```sh
$ yarn proxy
```

## License

This software is created by [Band Protocol](https://bandprotocol.com) and is released under [the MIT License](https://opensource.org/licenses/MIT).

## Contributing

Any and all contributions are welcome! The process is simple: fork this repo, make your changes, and submit a pull request.
