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
    race: Text;
    gender: Text;
    startingCity: Text;
  };

  type Job = {
    name: Text;
    description: Text;
  };

  type Hero = {
    name: Text;
    description: Text;
  };

  // Store characters
  stable var nextCharacterId : CharacterId = 0;
  let characters = HashMap.HashMap<CharacterId, Character>(0, Nat.equal, Nat.hash);

  // List of all jobs in Final Fantasy XIV with descriptions
  let allJobs : [Job] = [
    { name = "Paladin"; description = "A tank job that uses sword and shield." },
    { name = "Warrior"; description = "A tank job that wields a great axe." },
    { name = "Dark Knight"; description = "A tank job that uses a greatsword and dark magic." },
    { name = "Gunbreaker"; description = "A tank job that uses a gunblade." },
    { name = "White Mage"; description = "A healer job that uses nature-based magic." },
    { name = "Scholar"; description = "A healer job that uses a fairy companion and barriers." },
    { name = "Astrologian"; description = "A healer job that uses star magic and tarot cards." },
    { name = "Sage"; description = "A healer job that uses magitek nouliths." },
    { name = "Monk"; description = "A melee DPS job that uses hand-to-hand combat." },
    { name = "Dragoon"; description = "A melee DPS job that uses a lance and jump attacks." },
    { name = "Ninja"; description = "A melee DPS job that uses daggers and ninjutsu." },
    { name = "Samurai"; description = "A melee DPS job that uses a katana." },
    { name = "Reaper"; description = "A melee DPS job that uses a scythe and void magic." },
    { name = "Bard"; description = "A ranged physical DPS job that uses a bow and songs." },
    { name = "Machinist"; description = "A ranged physical DPS job that uses firearms and gadgets." },
    { name = "Dancer"; description = "A ranged physical DPS job that uses throwing weapons and dances." },
    { name = "Black Mage"; description = "A magical ranged DPS job that uses destructive magic." },
    { name = "Summoner"; description = "A magical ranged DPS job that summons primals." },
    { name = "Red Mage"; description = "A magical ranged DPS job that balances white and black magic." },
    { name = "Blue Mage"; description = "A limited job that learns monster abilities." }
  ];

  // List of races in Final Fantasy XIV
  let allRaces : [Text] = [
    "Hyur", "Elezen", "Lalafell", "Miqo'te", "Roegadyn",
    "Au Ra", "Hrothgar", "Viera"
  ];

  // List of starting cities in Final Fantasy XIV
  let allStartingCities : [Text] = [
    "Limsa Lominsa", "Gridania", "Ul'dah"
  ];

  // Final Fantasy hero
  let ffHero : Hero = {
    name = "Warrior of Light";
    description = "The main protagonist of Final Fantasy XIV, also known as the Warrior of Light, is a customizable player character who serves as the primary hero in the game's story."
  };

  // Add a new character
  public func addCharacter(name: Text, job: Text, race: Text, gender: Text, startingCity: Text) : async CharacterId {
    let id = nextCharacterId;
    let character : Character = {
      id = id;
      name = name;
      job = job;
      race = race;
      gender = gender;
      startingCity = startingCity;
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
          race = character.race;
          gender = character.gender;
          startingCity = character.startingCity;
        };
        characters.put(id, updatedCharacter);
        true
      };
    }
  };

  // Get all jobs with descriptions
  public query func getAllJobs() : async [Job] {
    allJobs
  };

  // Get all races
  public query func getAllRaces() : async [Text] {
    allRaces
  };

  // Get all starting cities
  public query func getAllStartingCities() : async [Text] {
    allStartingCities
  };

  // Get the Final Fantasy hero
  public query func getFFHero() : async Hero {
    ffHero
  };
}
