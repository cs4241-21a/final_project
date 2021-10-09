import * as React from 'react';

import { addPref, removePref, updatePref } from "../../functions/selectFunctions";

import CharacterProps from "../../types/props/CharacterProps";
import CharacterPrefs from "../../types/prefs/CharacterPrefs";

interface CharacterSelectProps {
  characters: CharacterProps[],
  preferences: CharacterPrefs[],
  setter: React.Dispatch<React.SetStateAction<CharacterPrefs[]>>
}

const CharacterSelect = ({
  characters,
  preferences,
  setter
}: CharacterSelectProps) : JSX.Element => { 
  // !!! TODO (Nick): Create logic for setting character preferences using the setter

  // Add Pref using: addCharacter(character);
  const addCharacter = addPref(CharacterPrefs, preferences, setter);

  // Remove Pref using: removeCharacter(characterPref)
  const removeCharacter = removePref(preferences, setter);

  // Update Pref using: updateCharacter(characterPref)
  const updateCharacter = updatePref(preferences, setter);


  return (
    // !!! TODO (UI): Create and implement JSX components for CharacterSelect
    <></>
  );
}

export default CharacterSelect;
