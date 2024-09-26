import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Character {
  'id' : CharacterId,
  'job' : string,
  'name' : string,
}
export type CharacterId = bigint;
export interface _SERVICE {
  'addCharacter' : ActorMethod<[string, string], CharacterId>,
  'getAllCharacters' : ActorMethod<[], Array<Character>>,
  'getAllJobs' : ActorMethod<[], Array<string>>,
  'updateCharacterJob' : ActorMethod<[CharacterId, string], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
