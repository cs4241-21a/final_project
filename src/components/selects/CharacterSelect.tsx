import * as React from 'react';

import { addPref, removePref, updatePref } from "../../functions/selectFunctions";

import CharacterProps from "../../types/props/CharacterProps";
import CharacterPrefs from "../../types/prefs/CharacterPrefs";

import SelectPrefButton from "../primitives/SelectPrefButton";

interface CharacterSelectProps {
  characters: CharacterProps[],
  preferences: CharacterPrefs[],
  setter: React.Dispatch<React.SetStateAction<CharacterPrefs[]>>,
  loading: boolean
}

const CharacterSelect = ({
  characters,
  preferences,
  setter,
  loading
}: CharacterSelectProps) : JSX.Element => { 
  // Add Pref using: characterPref = addCharacter(character);
  // character is a CharacterProp from characters
  const addCharacter = addPref(CharacterPrefs, preferences, setter);

  // Remove Pref using: removeCharacter(characterPref)
  // characterPref is the CharacterPrefs returned by addCharacter
  const removeCharacter = removePref(preferences, setter);

  // Update Pref using: updateCharacter(characterPref)
  // characterPref is the CharacterPrefs returned by addCharacter
  const updateCharacter = updatePref(preferences, setter);

  return (
    <>
      {characters.map((char) => {
        const imgSrc = `img/chara/${char.name}.png`;

        return (
          <SelectPrefButton<CharacterPrefs> 
            addPref={addCharacter}
            removePref={removeCharacter}
            preferences={preferences}  
            prop={char}
            loading={loading}
          >
            <img src={imgSrc} alt={`${char.name}-image`} width="100px" />
            <p>{char.name}</p>
          </SelectPrefButton>
        )
      })}
    </>
  );
}

export default CharacterSelect;
