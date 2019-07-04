import * as jspb from "google-protobuf"

import * as get_with_proof_pb from './get_with_proof_pb';
import * as transaction_pb from './transaction_pb';
import * as proof_pb from './proof_pb';
import * as ledger_info_pb from './ledger_info_pb';
import * as vm_errors_pb from './vm_errors_pb';
import * as mempool_status_pb from './mempool_status_pb';

export class SubmitTransactionRequest extends jspb.Message {
  getSignedTxn(): transaction_pb.SignedTransaction | undefined;
  setSignedTxn(value?: transaction_pb.SignedTransaction): void;
  hasSignedTxn(): boolean;
  clearSignedTxn(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubmitTransactionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SubmitTransactionRequest): SubmitTransactionRequest.AsObject;
  static serializeBinaryToWriter(message: SubmitTransactionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubmitTransactionRequest;
  static deserializeBinaryFromReader(message: SubmitTransactionRequest, reader: jspb.BinaryReader): SubmitTransactionRequest;
}

export namespace SubmitTransactionRequest {
  export type AsObject = {
    signedTxn?: transaction_pb.SignedTransaction.AsObject,
  }
}

export class SubmitTransactionResponse extends jspb.Message {
  getVmStatus(): vm_errors_pb.VMStatus | undefined;
  setVmStatus(value?: vm_errors_pb.VMStatus): void;
  hasVmStatus(): boolean;
  clearVmStatus(): void;
  hasVmStatus(): boolean;

  getAcStatus(): AdmissionControlStatus;
  setAcStatus(value: AdmissionControlStatus): void;
  hasAcStatus(): boolean;

  getMempoolStatus(): mempool_status_pb.MempoolAddTransactionStatus;
  setMempoolStatus(value: mempool_status_pb.MempoolAddTransactionStatus): void;
  hasMempoolStatus(): boolean;

  getValidatorId(): Uint8Array | string;
  getValidatorId_asU8(): Uint8Array;
  getValidatorId_asB64(): string;
  setValidatorId(value: Uint8Array | string): void;

  getStatusCase(): SubmitTransactionResponse.StatusCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubmitTransactionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SubmitTransactionResponse): SubmitTransactionResponse.AsObject;
  static serializeBinaryToWriter(message: SubmitTransactionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubmitTransactionResponse;
  static deserializeBinaryFromReader(message: SubmitTransactionResponse, reader: jspb.BinaryReader): SubmitTransactionResponse;
}

export namespace SubmitTransactionResponse {
  export type AsObject = {
    vmStatus?: vm_errors_pb.VMStatus.AsObject,
    acStatus: AdmissionControlStatus,
    mempoolStatus: mempool_status_pb.MempoolAddTransactionStatus,
    validatorId: Uint8Array | string,
  }

  export enum StatusCase { 
    STATUS_NOT_SET = 0,
    VM_STATUS = 1,
    AC_STATUS = 2,
    MEMPOOL_STATUS = 3,
  }
}

export enum AdmissionControlStatus { 
  Accepted = 0,
  Blacklisted = 1,
  Rejected = 2,
}
