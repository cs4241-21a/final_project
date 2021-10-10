import * as React from 'react';

import { addPref, removePref, updatePref } from "../../functions/selectFunctions";

import WeaponProps from "../../types/props/WeaponProps";
import EnablablePrefs from "../../types/prefs/EnablablePrefs";

import DebugButton from "../debug/DebugButton"; // Demo import !!!
import SelectPrefButton from '../primitives/SelectPrefButton';
import CharacterPrefs from '../../types/prefs/CharacterPrefs';

interface WeaponSelectProps {
  weapons: WeaponProps[],
  preferences: EnablablePrefs[],
  setter: React.Dispatch<React.SetStateAction<EnablablePrefs[]>>
}

const WeaponSelect = ({
  weapons,
  preferences,
  setter
}: WeaponSelectProps) : JSX.Element => { 
  // Add Pref using: weaponPref = addWeapon(weapon);
  // weapon is a WeaponProp from weapons
  const addWeapon = addPref(EnablablePrefs, preferences, setter);

  // Remove Pref using: removeWeapon(weaponPref)
  // weaponPref is the EnablablePrefs returned by addWeapon
  const removeWeapon = removePref(preferences, setter);

  // Update Pref using: updateWeapon(weaponPref)
  // weaponPref is the EnablablePrefs returned by addWeapon
  const updateWeapon = updatePref(preferences, setter);


  return (
    <>
      {weapons.map((wep) => {
        const imgSrc = `img/weapon/${wep.name}.png`;

        return (
          <SelectPrefButton<EnablablePrefs> 
            addPref={addWeapon}
            removePref={removeWeapon}
            preferences={preferences}  
            prop={wep}
          >
            <img src={imgSrc} alt={`${wep.name}-image`} width="100px" />
            <p>{wep.name}</p>
          </SelectPrefButton>
        )
      })}
    </>
  );
}

export default WeaponSelect;
