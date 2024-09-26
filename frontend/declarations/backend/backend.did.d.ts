import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Character {
  'id' : CharacterId,
  'job' : string,
  'startingCity' : string,
  'name' : string,
  'race' : string,
  'gender' : string,
}
export type CharacterId = bigint;
export interface Hero { 'name' : string, 'description' : string }
export interface Job { 'name' : string, 'description' : string }
export interface _SERVICE {
  'addCharacter' : ActorMethod<
    [string, string, string, string, string],
    CharacterId
  >,
  'getAllCharacters' : ActorMethod<[], Array<Character>>,
  'getAllJobs' : ActorMethod<[], Array<Job>>,
  'getAllRaces' : ActorMethod<[], Array<string>>,
  'getAllStartingCities' : ActorMethod<[], Array<string>>,
  'getFFHero' : ActorMethod<[], Hero>,
  'updateCharacterJob' : ActorMethod<[CharacterId, string], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
