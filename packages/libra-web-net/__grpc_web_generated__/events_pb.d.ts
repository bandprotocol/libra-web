import * as jspb from "google-protobuf"

import * as access_path_pb from './access_path_pb';
import * as proof_pb from './proof_pb';

export class Event extends jspb.Message {
  getAccessPath(): access_path_pb.AccessPath | undefined;
  setAccessPath(value?: access_path_pb.AccessPath): void;
  hasAccessPath(): boolean;
  clearAccessPath(): void;

  getSequenceNumber(): number;
  setSequenceNumber(value: number): void;

  getEventData(): Uint8Array | string;
  getEventData_asU8(): Uint8Array;
  getEventData_asB64(): string;
  setEventData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Event.AsObject;
  static toObject(includeInstance: boolean, msg: Event): Event.AsObject;
  static serializeBinaryToWriter(message: Event, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Event;
  static deserializeBinaryFromReader(message: Event, reader: jspb.BinaryReader): Event;
}

export namespace Event {
  export type AsObject = {
    accessPath?: access_path_pb.AccessPath.AsObject,
    sequenceNumber: number,
    eventData: Uint8Array | string,
  }
}

export class EventWithProof extends jspb.Message {
  getTransactionVersion(): number;
  setTransactionVersion(value: number): void;

  getEventIndex(): number;
  setEventIndex(value: number): void;

  getEvent(): Event | undefined;
  setEvent(value?: Event): void;
  hasEvent(): boolean;
  clearEvent(): void;

  getProof(): proof_pb.EventProof | undefined;
  setProof(value?: proof_pb.EventProof): void;
  hasProof(): boolean;
  clearProof(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventWithProof.AsObject;
  static toObject(includeInstance: boolean, msg: EventWithProof): EventWithProof.AsObject;
  static serializeBinaryToWriter(message: EventWithProof, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventWithProof;
  static deserializeBinaryFromReader(message: EventWithProof, reader: jspb.BinaryReader): EventWithProof;
}

export namespace EventWithProof {
  export type AsObject = {
    transactionVersion: number,
    eventIndex: number,
    event?: Event.AsObject,
    proof?: proof_pb.EventProof.AsObject,
  }
}

export class EventsList extends jspb.Message {
  getEventsList(): Array<Event>;
  setEventsList(value: Array<Event>): void;
  clearEventsList(): void;
  addEvents(value?: Event, index?: number): Event;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventsList.AsObject;
  static toObject(includeInstance: boolean, msg: EventsList): EventsList.AsObject;
  static serializeBinaryToWriter(message: EventsList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventsList;
  static deserializeBinaryFromReader(message: EventsList, reader: jspb.BinaryReader): EventsList;
}

export namespace EventsList {
  export type AsObject = {
    eventsList: Array<Event.AsObject>,
  }
}

export class EventsForVersions extends jspb.Message {
  getEventsForVersionList(): Array<EventsList>;
  setEventsForVersionList(value: Array<EventsList>): void;
  clearEventsForVersionList(): void;
  addEventsForVersion(value?: EventsList, index?: number): EventsList;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventsForVersions.AsObject;
  static toObject(includeInstance: boolean, msg: EventsForVersions): EventsForVersions.AsObject;
  static serializeBinaryToWriter(message: EventsForVersions, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventsForVersions;
  static deserializeBinaryFromReader(message: EventsForVersions, reader: jspb.BinaryReader): EventsForVersions;
}

export namespace EventsForVersions {
  export type AsObject = {
    eventsForVersionList: Array<EventsList.AsObject>,
  }
}

