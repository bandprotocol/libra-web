import axios from 'axios'
import BigNumber from 'bignumber.js'
import { SHA3 } from 'sha3'

import {
  AccountStateBlob,
  AccountStateWithProof,
  AdmissionControlClient,
  SubmitTransactionRequest,
  SubmitTransactionResponse,
  GetAccountStateRequest,
  GetAccountStateResponse,
  RequestItem,
  ResponseItem,
  UpdateToLatestLedgerRequest,
  RawTransaction,
  SignedTransaction,
} from 'libra-web-net'
import { CursorBuffer } from 'libra-web-core-utils/common/CursorBuffer'
import PathValues from 'libra-web-core-utils/constants/PathValues'
import { LibraTransaction, LibraTransactionFactory } from 'libra-web-transaction'
import { Account, AccountAddress, AccountState, AccountStates } from 'libra-web-account'

export enum LibraNetwork {
  Testnet = 'testnet',
  Mainnet = 'mainnet',
  Local = 'local',
}

interface LibralLibConfig {
  port: string
  host: string
  protocol: string
  network?: LibraNetwork
  faucetServerHost?: string
  validatorSetFile?: string
}

const DefaultFaucetServerHost = 'faucet.testnet.libra.org'

const DefaultProxyServer: LibralLibConfig =
  process.env.NODE_ENV === 'test'
    ? {
        protocol: 'http',
        host: 'localhost',
        port: '8080',
        network: LibraNetwork.Local,
      }
    : {
        protocol: 'http',
        host: 'testnet.trylibra.org',
        port: '80',
        network: LibraNetwork.Testnet,
      }

export class LibraClient {
  private readonly config: LibralLibConfig
  private readonly client: AdmissionControlClient

  constructor(config?: LibralLibConfig) {
    this.config = config || DefaultProxyServer

    const connectionAddress = `${this.config.protocol}://${this.config.host}:${this.config.port}`
    this.client = new AdmissionControlClient(connectionAddress, null, null)
  }

  /**
   * Fetch the current state of an account.
   *
   *
   * @param {string} address Accounts address
   */
  public async getAccountState(address: AccountAddress): Promise<AccountState> {
    const result = await this.getAccountStates([address])
    return result[0]
  }

  /**
   * Fetches the current state of multiple accounts.
   *
   * @param {string[]} addresses Array of users addresses
   */
  public async getAccountStates(addresses: AccountAddress[]): Promise<AccountStates> {
    for (const address of addresses) {
      if (!AccountAddress.isValidString(address.toHex())) {
        throw new Error(`[${address}] is not a valid address`)
      }
    }

    const request = new UpdateToLatestLedgerRequest()

    addresses.forEach(address => {
      const requestItem = new RequestItem()
      const getAccountStateRequest = new GetAccountStateRequest()
      getAccountStateRequest.setAddress(Uint8Array.from(address.toBytes()))
      requestItem.setGetAccountStateRequest(getAccountStateRequest)
      request.addRequestedItems(requestItem)
    })

    return new Promise<AccountStates>((resolve, reject) => {
      this.client.updateToLatestLedger(request, undefined, (error, response) => {
        if (error) {
          return reject(error)
        }

        resolve(
          response.getResponseItemsList().map((item: ResponseItem, index: number) => {
            const stateResponse = item.getGetAccountStateResponse() as GetAccountStateResponse
            const stateWithProof = stateResponse.getAccountStateWithProof() as AccountStateWithProof
            if (stateWithProof.hasBlob()) {
              const stateBlob = stateWithProof.getBlob() as AccountStateBlob
              const blob = stateBlob.getBlob_asU8()
              const accountState = this._decodeAccountStateBlob(blob)
              return accountState
            }

            return AccountState.default(addresses[index])
          }),
        )
      })
    })
  }

  /**
   * Uses the faucetService on testnet to mint coins to be sent
   * to receiver.
   *
   * Returns the sequence number for the transaction used to mint
   *
   * Note: `numCoins` should be in base unit i.e microlibra (10^6 I believe).
   */
  public async mintWithFaucet(
    receiver: AccountAddress | string,
    numCoins: BigNumber | string | number,
    waitForConfirmation: boolean = true,
  ): Promise<string> {
    const serverHost = this.config.faucetServerHost || DefaultFaucetServerHost
    const coins = new BigNumber(numCoins).toString(10)
    const address = receiver.toString()
    const response = await axios.get(`http://${serverHost}?amount=${coins}&address=${address}`)

    if (response.status !== 200) {
      throw new Error(`Failed to query faucet service. Code: ${response.status}, Err: ${response.data.toString()}`)
    }
    const sequenceNumber = response.data as string

    if (waitForConfirmation) {
      await this.waitForConfirmation(AccountAddress.default(), sequenceNumber)
    }

    return sequenceNumber
  }

  /**
   * Keeps polling the account state of address till sequenceNumber is computed.
   *
   */
  public async waitForConfirmation(
    accountAddress: AccountAddress,
    transactionSequenceNumber: number | string | BigNumber,
  ): Promise<void> {
    const sequenceNumber = new BigNumber(transactionSequenceNumber)
    let maxIterations = 50

    const poll = (resolve: (value?: void | PromiseLike<void>) => void, reject: (reason?: Error) => void) => {
      setTimeout(() => {
        maxIterations--
        this.getAccountState(accountAddress)
          .then(accountState => {
            if (accountState.sequenceNumber.gte(sequenceNumber)) {
              return resolve()
            }

            if (maxIterations === -1) {
              reject(new Error(`Confirmation timeout for [${accountAddress.toHex()}]:[${sequenceNumber.toString(10)}]`))
            } else {
              poll(resolve, reject)
            }
          })
          .catch(reject)
      }, 500)
    }

    return new Promise((resolve, reject) => {
      poll(resolve, reject)
    })
  }

  /**
   * Transfer coins from sender to receipient.
   * numCoins should be in libraCoins based unit.
   *
   * @param sender
   * @param receipientAddress
   * @param numCoins
   */
  public async transferCoins(
    sender: Account,
    receipientAddress: AccountAddress | string,
    numCoins: number | string | BigNumber,
  ): Promise<SubmitTransactionResponse> {
    if (typeof receipientAddress === 'string') receipientAddress = AccountAddress.fromHex(receipientAddress)
    const response = await this.execute(
      LibraTransactionFactory.createTransfer(
        sender.getAddress().toBytes(),
        Uint8Array.from(receipientAddress.toBytes()),
        new BigNumber(numCoins),
      ),
      sender,
    )

    return response
  }

  /**
   * Execute a transaction by sender.
   *
   * @param transaction
   * @param sender
   */
  public async execute(transaction: LibraTransaction, sender: Account): Promise<SubmitTransactionResponse> {
    let senderAddress = transaction.sendersAddress
    if (senderAddress.isDefault()) {
      senderAddress = sender.getAddress()
    }
    let sequenceNumber = transaction.sequenceNumber
    if (sequenceNumber.isNegative()) {
      const senderAccountState = await this.getAccountState(senderAddress)
      sequenceNumber = senderAccountState.sequenceNumber
    }

    const rawTransaction = new RawTransaction()
    rawTransaction.setSenderAccount(senderAddress.toBytes())
    rawTransaction.setSequenceNumber(sequenceNumber.toNumber())
    rawTransaction.setProgram(transaction.program)
    rawTransaction.setMaxGasAmount(transaction.gasContraint.maxGasAmount.toNumber())
    rawTransaction.setGasUnitPrice(transaction.gasContraint.gasUnitPrice.toNumber())
    rawTransaction.setExpirationTime(transaction.expirationTime.toNumber())

    const signedTransaction = new SignedTransaction()
    signedTransaction.setSenderPublicKey(sender.keyPair.getPublicKey())

    const sha3 = new SHA3(256)
    // Magic number provided by Libra
    sha3.update('46f174df6ca8de5ad29745f91584bb913e7df8dd162e3e921a5c1d8637c88d16', 'hex')
    sha3.update(new Buffer(rawTransaction.serializeBinary()))

    signedTransaction.setSenderSignature(sender.generateSignature(sha3.digest()))
    signedTransaction.setRawTxnBytes(rawTransaction.serializeBinary())

    const request = new SubmitTransactionRequest()
    request.setSignedTxn(signedTransaction)
    return new Promise((resolve, reject) => {
      this.client.submitTransaction(request, undefined, (error: any | null, response: SubmitTransactionResponse) => {
        if (error) {
          return reject(error)
        }
        resolve(response)
      })
    })
  }

  private _decodeAccountStateBlob(blob: Uint8Array): AccountState {
    const cursor = new CursorBuffer(blob)
    const blobLen = cursor.read32()

    const state: { [key: string]: Uint8Array } = {}

    for (let i = 0; i < blobLen; i++) {
      const keyLen = cursor.read32()
      const keyBuffer = new Uint8Array(keyLen)
      for (let j = 0; j < keyLen; j++) {
        keyBuffer[j] = cursor.read8()
      }

      const valueLen = cursor.read32()
      const valueBuffer = new Uint8Array(valueLen)
      for (let k = 0; k < valueLen; k++) {
        valueBuffer[k] = cursor.read8()
      }

      state[Buffer.from(keyBuffer).toString('hex')] = valueBuffer
    }

    return AccountState.from(state[PathValues.AccountStatePath])
  }
}

export default LibraClient
