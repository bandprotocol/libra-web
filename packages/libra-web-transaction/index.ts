import BigNumber from 'bignumber.js'
import { Uint64LE } from 'int64-buffer'
import { AccountAddress } from '../libra-web-account'
import { Program, TransactionArgument } from '../libra-web-net'

interface LibraGasConstraint {
  maxGasAmount: BigNumber
  gasUnitPrice: BigNumber
}

export class LibraTransaction {
  public program: Program
  public gasContraint: LibraGasConstraint
  public expirationTime: BigNumber
  public sendersAddress: AccountAddress
  public sequenceNumber: BigNumber

  /**
   * Create a new Transaction
   *
   * @param program
   * @param gasConstraint
   * @param expirationTime
   * @param sendersAddress
   * @param sequenceNumber
   */
  constructor(
    program: Program,
    gasConstraint: LibraGasConstraint,
    expirationTime: string | BigNumber,
    sendersAddress: Uint8Array,
    sequenceNumber: string | BigNumber,
  ) {
    this.program = program
    this.gasContraint = gasConstraint
    this.expirationTime = new BigNumber(expirationTime)
    this.sendersAddress = new AccountAddress(sendersAddress)
    this.sequenceNumber = new BigNumber(sequenceNumber)
  }
}

export class LibraTransactionFactory {
  public static createTransfer(
    senderAddress: Uint8Array,
    receipientAddress: Uint8Array,
    numCoins: BigNumber,
    gasConstraint: LibraGasConstraint = {
      maxGasAmount: new BigNumber('10000'),
      gasUnitPrice: new BigNumber('0'),
    },
    expirationTime: string | BigNumber = '1661898073',
    sequenceNumber: string | BigNumber = '-1',
  ): LibraTransaction {
    const program = new Program()
    program.setCode(
      new Uint8Array([
        76,
        73,
        66,
        82,
        65,
        86,
        77,
        10,
        1,
        0,
        7,
        1,
        74,
        0,
        0,
        0,
        4,
        0,
        0,
        0,
        3,
        78,
        0,
        0,
        0,
        6,
        0,
        0,
        0,
        12,
        84,
        0,
        0,
        0,
        5,
        0,
        0,
        0,
        13,
        89,
        0,
        0,
        0,
        4,
        0,
        0,
        0,
        5,
        93,
        0,
        0,
        0,
        41,
        0,
        0,
        0,
        4,
        134,
        0,
        0,
        0,
        32,
        0,
        0,
        0,
        7,
        166,
        0,
        0,
        0,
        13,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        2,
        0,
        1,
        3,
        0,
        2,
        0,
        2,
        4,
        2,
        3,
        2,
        4,
        2,
        6,
        60,
        83,
        69,
        76,
        70,
        62,
        12,
        76,
        105,
        98,
        114,
        97,
        65,
        99,
        99,
        111,
        117,
        110,
        116,
        4,
        109,
        97,
        105,
        110,
        15,
        112,
        97,
        121,
        95,
        102,
        114,
        111,
        109,
        95,
        115,
        101,
        110,
        100,
        101,
        114,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        2,
        0,
        4,
        0,
        12,
        0,
        12,
        1,
        17,
        1,
        2,
      ]),
    )

    const arg1 = new TransactionArgument()
    arg1.setType(TransactionArgument.ArgType.ADDRESS)
    arg1.setData(receipientAddress)

    const arg2 = new TransactionArgument()
    arg2.setType(TransactionArgument.ArgType.U64)
    arg2.setData(new Uint8Array(new Uint64LE(numCoins.toNumber()).toArray()))

    program.setArgumentsList([arg1, arg2])
    program.setModulesList([])

    return new LibraTransaction(program, gasConstraint, expirationTime, senderAddress, sequenceNumber)
  }
}
