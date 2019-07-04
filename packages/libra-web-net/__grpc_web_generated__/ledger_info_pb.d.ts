import * as jspb from "google-protobuf"

export class LedgerInfo extends jspb.Message {
  getVersion(): number;
  setVersion(value: number): void;

  getTransactionAccumulatorHash(): Uint8Array | string;
  getTransactionAccumulatorHash_asU8(): Uint8Array;
  getTransactionAccumulatorHash_asB64(): string;
  setTransactionAccumulatorHash(value: Uint8Array | string): void;

  getConsensusDataHash(): Uint8Array | string;
  getConsensusDataHash_asU8(): Uint8Array;
  getConsensusDataHash_asB64(): string;
  setConsensusDataHash(value: Uint8Array | string): void;

  getConsensusBlockId(): Uint8Array | string;
  getConsensusBlockId_asU8(): Uint8Array;
  getConsensusBlockId_asB64(): string;
  setConsensusBlockId(value: Uint8Array | string): void;

  getEpochNum(): number;
  setEpochNum(value: number): void;

  getTimestampUsecs(): number;
  setTimestampUsecs(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LedgerInfo.AsObject;
  static toObject(includeInstance: boolean, msg: LedgerInfo): LedgerInfo.AsObject;
  static serializeBinaryToWriter(message: LedgerInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LedgerInfo;
  static deserializeBinaryFromReader(message: LedgerInfo, reader: jspb.BinaryReader): LedgerInfo;
}

export namespace LedgerInfo {
  export type AsObject = {
    version: number,
    transactionAccumulatorHash: Uint8Array | string,
    consensusDataHash: Uint8Array | string,
    consensusBlockId: Uint8Array | string,
    epochNum: number,
    timestampUsecs: number,
  }
}

export class LedgerInfoWithSignatures extends jspb.Message {
  getSignaturesList(): Array<ValidatorSignature>;
  setSignaturesList(value: Array<ValidatorSignature>): void;
  clearSignaturesList(): void;
  addSignatures(value?: ValidatorSignature, index?: number): ValidatorSignature;

  getLedgerInfo(): LedgerInfo | undefined;
  setLedgerInfo(value?: LedgerInfo): void;
  hasLedgerInfo(): boolean;
  clearLedgerInfo(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LedgerInfoWithSignatures.AsObject;
  static toObject(includeInstance: boolean, msg: LedgerInfoWithSignatures): LedgerInfoWithSignatures.AsObject;
  static serializeBinaryToWriter(message: LedgerInfoWithSignatures, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LedgerInfoWithSignatures;
  static deserializeBinaryFromReader(message: LedgerInfoWithSignatures, reader: jspb.BinaryReader): LedgerInfoWithSignatures;
}

export namespace LedgerInfoWithSignatures {
  export type AsObject = {
    signaturesList: Array<ValidatorSignature.AsObject>,
    ledgerInfo?: LedgerInfo.AsObject,
  }
}

export class ValidatorSignature extends jspb.Message {
  getValidatorId(): Uint8Array | string;
  getValidatorId_asU8(): Uint8Array;
  getValidatorId_asB64(): string;
  setValidatorId(value: Uint8Array | string): void;

  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValidatorSignature.AsObject;
  static toObject(includeInstance: boolean, msg: ValidatorSignature): ValidatorSignature.AsObject;
  static serializeBinaryToWriter(message: ValidatorSignature, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ValidatorSignature;
  static deserializeBinaryFromReader(message: ValidatorSignature, reader: jspb.BinaryReader): ValidatorSignature;
}

export namespace ValidatorSignature {
  export type AsObject = {
    validatorId: Uint8Array | string,
    signature: Uint8Array | string,
  }
}

