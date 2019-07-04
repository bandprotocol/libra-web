import * as jspb from "google-protobuf"

export class VMValidationStatus extends jspb.Message {
  getCode(): VMValidationStatusCode;
  setCode(value: VMValidationStatusCode): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VMValidationStatus.AsObject;
  static toObject(includeInstance: boolean, msg: VMValidationStatus): VMValidationStatus.AsObject;
  static serializeBinaryToWriter(message: VMValidationStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VMValidationStatus;
  static deserializeBinaryFromReader(message: VMValidationStatus, reader: jspb.BinaryReader): VMValidationStatus;
}

export namespace VMValidationStatus {
  export type AsObject = {
    code: VMValidationStatusCode,
    message: string,
  }
}

export class VMVerificationStatusList extends jspb.Message {
  getStatusListList(): Array<VMVerificationStatus>;
  setStatusListList(value: Array<VMVerificationStatus>): void;
  clearStatusListList(): void;
  addStatusList(value?: VMVerificationStatus, index?: number): VMVerificationStatus;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VMVerificationStatusList.AsObject;
  static toObject(includeInstance: boolean, msg: VMVerificationStatusList): VMVerificationStatusList.AsObject;
  static serializeBinaryToWriter(message: VMVerificationStatusList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VMVerificationStatusList;
  static deserializeBinaryFromReader(message: VMVerificationStatusList, reader: jspb.BinaryReader): VMVerificationStatusList;
}

export namespace VMVerificationStatusList {
  export type AsObject = {
    statusListList: Array<VMVerificationStatus.AsObject>,
  }
}

export class VMVerificationStatus extends jspb.Message {
  getStatusKind(): VMVerificationStatus.StatusKind;
  setStatusKind(value: VMVerificationStatus.StatusKind): void;

  getModuleIdx(): number;
  setModuleIdx(value: number): void;

  getErrorKind(): VMVerificationErrorKind;
  setErrorKind(value: VMVerificationErrorKind): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VMVerificationStatus.AsObject;
  static toObject(includeInstance: boolean, msg: VMVerificationStatus): VMVerificationStatus.AsObject;
  static serializeBinaryToWriter(message: VMVerificationStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VMVerificationStatus;
  static deserializeBinaryFromReader(message: VMVerificationStatus, reader: jspb.BinaryReader): VMVerificationStatus;
}

export namespace VMVerificationStatus {
  export type AsObject = {
    statusKind: VMVerificationStatus.StatusKind,
    moduleIdx: number,
    errorKind: VMVerificationErrorKind,
    message: string,
  }

  export enum StatusKind { 
    SCRIPT = 0,
    MODULE = 1,
  }
}

export class AssertionFailure extends jspb.Message {
  getAssertionErrorCode(): number;
  setAssertionErrorCode(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AssertionFailure.AsObject;
  static toObject(includeInstance: boolean, msg: AssertionFailure): AssertionFailure.AsObject;
  static serializeBinaryToWriter(message: AssertionFailure, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AssertionFailure;
  static deserializeBinaryFromReader(message: AssertionFailure, reader: jspb.BinaryReader): AssertionFailure;
}

export namespace AssertionFailure {
  export type AsObject = {
    assertionErrorCode: number,
  }
}

export class ArithmeticError extends jspb.Message {
  getErrorCode(): ArithmeticError.ArithmeticErrorType;
  setErrorCode(value: ArithmeticError.ArithmeticErrorType): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ArithmeticError.AsObject;
  static toObject(includeInstance: boolean, msg: ArithmeticError): ArithmeticError.AsObject;
  static serializeBinaryToWriter(message: ArithmeticError, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ArithmeticError;
  static deserializeBinaryFromReader(message: ArithmeticError, reader: jspb.BinaryReader): ArithmeticError;
}

export namespace ArithmeticError {
  export type AsObject = {
    errorCode: ArithmeticError.ArithmeticErrorType,
  }

  export enum ArithmeticErrorType { 
    UnknownArithmeticError = 0,
    Underflow = 1,
    Overflow = 2,
    DivisionByZero = 3,
  }
}

export class DynamicReferenceError extends jspb.Message {
  getErrorCode(): DynamicReferenceError.DynamicReferenceErrorType;
  setErrorCode(value: DynamicReferenceError.DynamicReferenceErrorType): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DynamicReferenceError.AsObject;
  static toObject(includeInstance: boolean, msg: DynamicReferenceError): DynamicReferenceError.AsObject;
  static serializeBinaryToWriter(message: DynamicReferenceError, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DynamicReferenceError;
  static deserializeBinaryFromReader(message: DynamicReferenceError, reader: jspb.BinaryReader): DynamicReferenceError;
}

export namespace DynamicReferenceError {
  export type AsObject = {
    errorCode: DynamicReferenceError.DynamicReferenceErrorType,
  }

  export enum DynamicReferenceErrorType { 
    UnknownDynamicReferenceError = 0,
    MoveOfBorrowedResource = 1,
    GlobalRefAlreadyReleased = 2,
    MissingReleaseRef = 3,
    GlobalAlreadyBorrowed = 4,
  }
}

export class ExecutionStatus extends jspb.Message {
  getRuntimeStatus(): RuntimeStatus;
  setRuntimeStatus(value: RuntimeStatus): void;
  hasRuntimeStatus(): boolean;

  getAssertionFailure(): AssertionFailure | undefined;
  setAssertionFailure(value?: AssertionFailure): void;
  hasAssertionFailure(): boolean;
  clearAssertionFailure(): void;
  hasAssertionFailure(): boolean;

  getArithmeticError(): ArithmeticError | undefined;
  setArithmeticError(value?: ArithmeticError): void;
  hasArithmeticError(): boolean;
  clearArithmeticError(): void;
  hasArithmeticError(): boolean;

  getReferenceError(): DynamicReferenceError | undefined;
  setReferenceError(value?: DynamicReferenceError): void;
  hasReferenceError(): boolean;
  clearReferenceError(): void;
  hasReferenceError(): boolean;

  getExecutionStatusCase(): ExecutionStatus.ExecutionStatusCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecutionStatus.AsObject;
  static toObject(includeInstance: boolean, msg: ExecutionStatus): ExecutionStatus.AsObject;
  static serializeBinaryToWriter(message: ExecutionStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecutionStatus;
  static deserializeBinaryFromReader(message: ExecutionStatus, reader: jspb.BinaryReader): ExecutionStatus;
}

export namespace ExecutionStatus {
  export type AsObject = {
    runtimeStatus: RuntimeStatus,
    assertionFailure?: AssertionFailure.AsObject,
    arithmeticError?: ArithmeticError.AsObject,
    referenceError?: DynamicReferenceError.AsObject,
  }

  export enum ExecutionStatusCase { 
    EXECUTION_STATUS_NOT_SET = 0,
    RUNTIME_STATUS = 1,
    ASSERTION_FAILURE = 2,
    ARITHMETIC_ERROR = 3,
    REFERENCE_ERROR = 4,
  }
}

export class VMStatus extends jspb.Message {
  getValidation(): VMValidationStatus | undefined;
  setValidation(value?: VMValidationStatus): void;
  hasValidation(): boolean;
  clearValidation(): void;
  hasValidation(): boolean;

  getVerification(): VMVerificationStatusList | undefined;
  setVerification(value?: VMVerificationStatusList): void;
  hasVerification(): boolean;
  clearVerification(): void;
  hasVerification(): boolean;

  getInvariantViolation(): VMInvariantViolationError;
  setInvariantViolation(value: VMInvariantViolationError): void;
  hasInvariantViolation(): boolean;

  getDeserialization(): BinaryError;
  setDeserialization(value: BinaryError): void;
  hasDeserialization(): boolean;

  getExecution(): ExecutionStatus | undefined;
  setExecution(value?: ExecutionStatus): void;
  hasExecution(): boolean;
  clearExecution(): void;
  hasExecution(): boolean;

  getErrorTypeCase(): VMStatus.ErrorTypeCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VMStatus.AsObject;
  static toObject(includeInstance: boolean, msg: VMStatus): VMStatus.AsObject;
  static serializeBinaryToWriter(message: VMStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VMStatus;
  static deserializeBinaryFromReader(message: VMStatus, reader: jspb.BinaryReader): VMStatus;
}

export namespace VMStatus {
  export type AsObject = {
    validation?: VMValidationStatus.AsObject,
    verification?: VMVerificationStatusList.AsObject,
    invariantViolation: VMInvariantViolationError,
    deserialization: BinaryError,
    execution?: ExecutionStatus.AsObject,
  }

  export enum ErrorTypeCase { 
    ERROR_TYPE_NOT_SET = 0,
    VALIDATION = 1,
    VERIFICATION = 2,
    INVARIANT_VIOLATION = 3,
    DESERIALIZATION = 4,
    EXECUTION = 5,
  }
}

export enum VMValidationStatusCode { 
  UnknownValidationStatus = 0,
  InvalidSignature = 1,
  InvalidAuthKey = 2,
  SequenceNumberTooOld = 3,
  SequenceNumberTooNew = 4,
  InsufficientBalanceForTransactionFee = 5,
  TransactionExpired = 6,
  SendingAccountDoesNotExist = 7,
  RejectedWriteSet = 8,
  InvalidWriteSet = 9,
  ExceededMaxTransactionSize = 10,
  UnknownScript = 11,
  UnknownModule = 12,
  MaxGasUnitsExceedsMaxGasUnitsBound = 13,
  MaxGasUnitsBelowMinTransactionGasUnits = 14,
  GasUnitPriceBelowMinBound = 15,
  GasUnitPriceAboveMaxBound = 16,
}
export enum VMVerificationErrorKind { 
  UnknownVerificationError = 0,
  IndexOutOfBounds = 1,
  RangeOutOfBounds = 2,
  InvalidSignatureToken = 3,
  InvalidFieldDefReference = 4,
  RecursiveStructDefinition = 5,
  InvalidResourceField = 6,
  InvalidFallThrough = 7,
  JoinFailure = 8,
  NegativeStackSizeWithinBlock = 9,
  UnbalancedStack = 10,
  InvalidMainFunctionSignature = 11,
  DuplicateElement = 12,
  InvalidModuleHandle = 13,
  UnimplementedHandle = 14,
  InconsistentFields = 15,
  UnusedFields = 16,
  LookupFailed = 17,
  VisibilityMismatch = 18,
  TypeResolutionFailure = 19,
  TypeMismatch = 20,
  MissingDependency = 21,
  PopReferenceError = 22,
  PopResourceError = 23,
  ReleaseRefTypeMismatchError = 24,
  BrTypeMismatchError = 25,
  AssertTypeMismatchError = 26,
  StLocTypeMismatchError = 27,
  StLocUnsafeToDestroyError = 28,
  RetUnsafeToDestroyError = 29,
  RetTypeMismatchError = 30,
  FreezeRefTypeMismatchError = 31,
  FreezeRefExistsMutableBorrowError = 32,
  BorrowFieldTypeMismatchError = 33,
  BorrowFieldBadFieldError = 34,
  BorrowFieldExistsMutableBorrowError = 35,
  CopyLocUnavailableError = 36,
  CopyLocResourceError = 37,
  CopyLocExistsBorrowError = 38,
  MoveLocUnavailableError = 39,
  MoveLocExistsBorrowError = 40,
  BorrowLocReferenceError = 41,
  BorrowLocUnavailableError = 42,
  BorrowLocExistsBorrowError = 43,
  CallTypeMismatchError = 44,
  CallBorrowedMutableReferenceError = 45,
  PackTypeMismatchError = 46,
  UnpackTypeMismatchError = 47,
  ReadRefTypeMismatchError = 48,
  ReadRefResourceError = 49,
  ReadRefExistsMutableBorrowError = 50,
  WriteRefTypeMismatchError = 51,
  WriteRefResourceError = 52,
  WriteRefExistsBorrowError = 53,
  WriteRefNoMutableReferenceError = 54,
  IntegerOpTypeMismatchError = 55,
  BooleanOpTypeMismatchError = 56,
  EqualityOpTypeMismatchError = 57,
  ExistsResourceTypeMismatchError = 58,
  BorrowGlobalTypeMismatchError = 59,
  BorrowGlobalNoResourceError = 60,
  MoveFromTypeMismatchError = 61,
  MoveFromNoResourceError = 62,
  MoveToSenderTypeMismatchError = 63,
  MoveToSenderNoResourceError = 64,
  CreateAccountTypeMismatchError = 65,
  ModuleAddressDoesNotMatchSender = 66,
  NoModuleHandles = 67,
}
export enum VMInvariantViolationError { 
  UnknownInvariantViolationError = 0,
  OutOfBoundsIndex = 1,
  OutOfBoundsRange = 2,
  EmptyValueStack = 3,
  EmptyCallStack = 4,
  PCOverflow = 5,
  LinkerError = 6,
  LocalReferenceError = 7,
  StorageError = 8,
}
export enum BinaryError { 
  UnknownBinaryError = 0,
  Malformed = 1,
  BadMagic = 2,
  UnknownVersion = 3,
  UnknownTableType = 4,
  UnknownSignatureType = 5,
  UnknownSerializedType = 6,
  UnknownOpcode = 7,
  BadHeaderTable = 8,
  UnexpectedSignatureType = 9,
  DuplicateTable = 10,
}
export enum RuntimeStatus { 
  UnknownRuntimeStatus = 0,
  Executed = 1,
  OutOfGas = 2,
  ResourceDoesNotExist = 3,
  ResourceAlreadyExists = 4,
  EvictedAccountAccess = 5,
  AccountAddressAlreadyExists = 6,
  TypeError = 7,
  MissingData = 8,
  DataFormatError = 9,
  InvalidData = 10,
  RemoteDataError = 11,
  CannotWriteExistingResource = 12,
  ValueSerializationError = 13,
  ValueDeserializationError = 14,
  DuplicateModuleName = 15,
}
