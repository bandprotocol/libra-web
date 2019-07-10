import BigNumber from 'bignumber.js'
import { SHA3 } from 'sha3'
import { CursorBuffer } from '../libra-web-core-utils/common/CursorBuffer'
import Addresses from '../libra-web-core-utils/constants/Addresses'
import { KeyPair } from '../libra-web-core-utils/crypto/Eddsa'

export type AccountStates = AccountState[]

/**
 * Contains all the information relevant to a particular users accounts.
 * Beware of stale data though. Will implement refresh logic soon.
 *
 *
 */
export class AccountState {
  /**
   * Returns an empty AccountState
   */
  public static default(address: AccountAddress): AccountState {
    return new AccountState(
      Uint8Array.from(address.toBytes()),
      new BigNumber(0),
      new BigNumber(0),
      new BigNumber(0),
      new BigNumber(0),
    )
  }

  public static from(bytes: Uint8Array): AccountState {
    const cursor = new CursorBuffer(bytes)

    const authenticationKeyLen = cursor.read32()
    const authenticationKey = cursor.readXBytes(authenticationKeyLen)
    const balance = cursor.read64()
    const receivedEventsCount = cursor.read64()
    const sentEventsCount = cursor.read64()
    const sequenceNumber = cursor.read64()

    return new AccountState(authenticationKey, balance, receivedEventsCount, sentEventsCount, sequenceNumber)
  }
  public readonly authenticationKey: Uint8Array
  public readonly balance: BigNumber
  public readonly receivedEventsCount: BigNumber
  public readonly sentEventsCount: BigNumber
  public readonly sequenceNumber: BigNumber

  private constructor(
    authenticationKey: Uint8Array,
    balance: BigNumber,
    receivedEventsCount: BigNumber,
    sentEventsCount: BigNumber,
    sequenceNumber: BigNumber,
  ) {
    this.balance = balance
    this.sequenceNumber = sequenceNumber
    this.authenticationKey = authenticationKey
    this.sentEventsCount = sentEventsCount
    this.receivedEventsCount = receivedEventsCount
  }
}

export class Account {
  public static fromSecretKeyBytes(secretKeyBytes: Uint8Array): Account {
    return new Account(KeyPair.fromSecretKey(secretKeyBytes))
  }

  public static fromSecretKey(secretKeyHex: string): Account {
    const keyBytes = new Uint8Array(Buffer.from(secretKeyHex, 'hex'))
    return Account.fromSecretKeyBytes(keyBytes)
  }

  public readonly keyPair: KeyPair
  private address?: AccountAddress

  constructor(keyPair: KeyPair) {
    this.keyPair = keyPair
  }

  public getAddress(): AccountAddress {
    if (this.address !== undefined) {
      return this.address
    }

    const sha3 = new SHA3(256)
    sha3.update(Buffer.from(this.keyPair.getPublicKey()))
    this.address = new AccountAddress(new Uint8Array(sha3.digest()))
    return this.address
  }

  public generateSignature(message: Buffer): Uint8Array {
    return this.keyPair.sign(message)
  }

  public getSecretKey(): Uint8Array {
    return this.keyPair.getSecretKey()
  }

  public getPublicKey(): Uint8Array {
    return this.keyPair.getPublicKey()
  }
}

/**
 * Represents a validated Account address
 *
 */
export class AccountAddress {
  public static isValidString(addressHex: string): boolean {
    const length = String(addressHex).replace(' ', '').length
    return length === Addresses.AddressLength * 2
  }

  public static isValidBytes(addressBytes: Uint8Array): boolean {
    return addressBytes.length === Addresses.AddressLength
  }

  public static default(): AccountAddress {
    return new AccountAddress(new Uint8Array(Addresses.AddressLength))
  }

  public static fromHex(addressHex: string): AccountAddress {
    return new AccountAddress(Uint8Array.from(Buffer.from(addressHex, 'hex')))
  }

  private readonly addressBytes: Uint8Array

  constructor(hash: Uint8Array) {
    if (!AccountAddress.isValidBytes(hash)) {
      throw new Error(`The address is of invalid length [${hash.length}]`)
    }
    this.addressBytes = hash.slice(0, Addresses.AddressLength)
  }

  public isDefault(): boolean {
    return AccountAddress.default().toHex() === this.toHex()
  }

  public toBytes(): Uint8Array {
    return this.addressBytes
  }

  public toHex(): string {
    return Buffer.from(this.addressBytes).toString('hex')
  }

  /**
   * Alias for toHex()
   */
  public toString(): string {
    return this.toHex()
  }
}
