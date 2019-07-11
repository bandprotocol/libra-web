import * as jspb from "google-protobuf"

export class MempoolAddTransactionStatus extends jspb.Message {
  getCode(): MempoolAddTransactionStatusCode;
  setCode(value: MempoolAddTransactionStatusCode): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MempoolAddTransactionStatus.AsObject;
  static toObject(includeInstance: boolean, msg: MempoolAddTransactionStatus): MempoolAddTransactionStatus.AsObject;
  static serializeBinaryToWriter(message: MempoolAddTransactionStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MempoolAddTransactionStatus;
  static deserializeBinaryFromReader(message: MempoolAddTransactionStatus, reader: jspb.BinaryReader): MempoolAddTransactionStatus;
}

export namespace MempoolAddTransactionStatus {
  export type AsObject = {
    code: MempoolAddTransactionStatusCode,
    message: string,
  }
}

export enum MempoolAddTransactionStatusCode { 
  Valid = 0,
  InsufficientBalance = 1,
  InvalidSeqNumber = 2,
  MempoolIsFull = 3,
  TooManyTransactions = 4,
  InvalidUpdate = 5,
}
