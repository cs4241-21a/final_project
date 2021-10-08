import * as React from 'react';

import { addPrefFunction } from "../../functions/selectFunctions";

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

  // Add Pref using: addCharacter(character, preferences, setter);
  const addCharacter = addPrefFunction(CharacterPrefs);

  // Example of it being used on page load
  React.useEffect(() => {
    const character = {
      name: "testCharacter"
    }
    addCharacter(character, preferences, setter);
  }, [])
  

  // Remove Pref

  // Enable Pref

  // Disable Pref


  return (
    // !!! TODO (UI): Create and implement JSX components for CharacterSelect
    <></>
  );
}

export default CharacterSelect;
