import Bool "mo:base/Bool";
import Char "mo:base/Char";
import Hash "mo:base/Hash";
import List "mo:base/List";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Text "mo:base/Text";

actor {
  // Define types
  type CharacterId = Nat;
  type Character = {
    id: CharacterId;
    name: Text;
    job: Text;
  };

  // Store characters
  stable var nextCharacterId : CharacterId = 0;
  let characters = HashMap.HashMap<CharacterId, Character>(0, Nat.equal, Nat.hash);

  // List of all jobs in Final Fantasy 14
  let allJobs : [Text] = [
    "Paladin", "Warrior", "Dark Knight", "Gunbreaker",
    "White Mage", "Scholar", "Astrologian", "Sage",
    "Monk", "Dragoon", "Ninja", "Samurai", "Reaper",
    "Bard", "Machinist", "Dancer",
    "Black Mage", "Summoner", "Red Mage", "Blue Mage"
  ];

  // Add a new character
  public func addCharacter(name: Text, job: Text) : async CharacterId {
    let id = nextCharacterId;
    let character : Character = {
      id = id;
      name = name;
      job = job;
    };
    characters.put(id, character);
    nextCharacterId += 1;
    id
  };

  // Get all characters
  public query func getAllCharacters() : async [Character] {
    Iter.toArray(characters.vals())
  };

  // Update a character's job
  public func updateCharacterJob(id: CharacterId, newJob: Text) : async Bool {
    switch (characters.get(id)) {
      case (null) { false };
      case (?character) {
        let updatedCharacter : Character = {
          id = character.id;
          name = character.name;
          job = newJob;
        };
        characters.put(id, updatedCharacter);
        true
      };
    }
  };

  // Get all jobs
  public query func getAllJobs() : async [Text] {
    allJobs
  };
}
