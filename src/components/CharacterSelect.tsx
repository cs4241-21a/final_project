import * as React from 'react';

import CharacterProps from "../props/api/CharacterProps";
import CharacterPrefProps from "../props/prefs/CharacterPrefProps";

interface CharacterSelectProps {
  characters: CharacterProps[],
  preferences: CharacterPrefProps[],
  setter: React.Dispatch<React.SetStateAction<CharacterPrefProps[]>>
}

const CharacterSelect = ({
  characters,
  preferences,
  setter
}: CharacterSelectProps) : JSX.Element => { 
  // !!! TODO (Nick): Create logic for setting character preferences using the setter

  return (
    // !!! TODO (UI): Create and implement JSX components for CharacterSelect
    <></>
  );
}

export default CharacterSelect;
