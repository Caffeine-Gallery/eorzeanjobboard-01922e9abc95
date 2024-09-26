export const idlFactory = ({ IDL }) => {
  const CharacterId = IDL.Nat;
  const Character = IDL.Record({
    'id' : CharacterId,
    'job' : IDL.Text,
    'startingCity' : IDL.Text,
    'name' : IDL.Text,
    'race' : IDL.Text,
    'gender' : IDL.Text,
  });
  return IDL.Service({
    'addCharacter' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [CharacterId],
        [],
      ),
    'getAllCharacters' : IDL.Func([], [IDL.Vec(Character)], ['query']),
    'getAllJobs' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getAllRaces' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getAllStartingCities' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'updateCharacterJob' : IDL.Func([CharacterId, IDL.Text], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
