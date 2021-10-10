import * as React from 'react';

import { addPref, removePref, updatePref } from "../../functions/selectFunctions";

import WeaponProps from "../../types/props/WeaponProps";
import EnablablePrefs from "../../types/prefs/EnablablePrefs";

import SelectPrefButton from '../primitives/SelectPrefButton';

interface WeaponSelectProps {
  weapons: WeaponProps[],
  preferences: EnablablePrefs[],
  setter: React.Dispatch<React.SetStateAction<EnablablePrefs[]>>,
  loading: boolean
}

const WeaponSelect = ({
  weapons,
  preferences,
  setter,
  loading
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
            loading={loading}
          >
            <img src={imgSrc} alt={`${wep.fullname.en}-image`} width="100px" />
            <p>{wep.fullname.en}</p>
          </SelectPrefButton>
        )
      })}
    </>
  );
}

export default WeaponSelect;
