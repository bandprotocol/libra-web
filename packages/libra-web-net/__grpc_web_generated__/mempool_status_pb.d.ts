import * as jspb from "google-protobuf"

export enum MempoolAddTransactionStatus { 
  Valid = 0,
  InsufficientBalance = 1,
  InvalidSeqNumber = 2,
  MempoolIsFull = 3,
  TooManyTransactions = 4,
  InvalidUpdate = 5,
}
