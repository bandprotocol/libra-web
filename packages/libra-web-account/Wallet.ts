import { Account } from './Accounts'
import { KeyFactory, Seed } from './KeyFactory'
import { Mnemonic } from './Mnemonic'

export class LibraWallet {
  private readonly mnemonic: string[]
  private keyFactory: KeyFactory

  static create(): LibraWallet {
    return new LibraWallet(new Mnemonic().toString())
  }

  constructor(_mnemonic: string) {
    if (!_mnemonic) {
      throw new Error(
        'Mnemonic is required for initialing LibraWallet. Use LibraWallet.create() for creating a new one.',
      )
    }

    this.mnemonic = _mnemonic.trim().split(' ')
    const seed = Seed.fromMnemonic(this.mnemonic, 'LIBRA')
    this.keyFactory = new KeyFactory(seed)
  }

  public getAccount(depth: number = 0): Account {
    if (isNaN(depth)) {
      throw new Error(`LibraWallet depth [${depth}] must be a number`)
    }
    const account = new Account(this.keyFactory.generateKey(depth))

    return account
  }

  public getMnemonic() {
    return this.mnemonic
  }
}

export default LibraWallet
