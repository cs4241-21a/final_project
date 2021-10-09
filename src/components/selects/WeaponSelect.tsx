import * as React from 'react';

import { addPref, removePref, updatePref } from "../../functions/selectFunctions";

import WeaponProps from "../../types/props/WeaponProps";
import EnablablePrefs from "../../types/prefs/EnablablePrefs";

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
  // Add Pref using: addWeapon(weapon);
  const addWeapon = addPref(EnablablePrefs, preferences, setter);

  // Remove Pref using: removeWeapon(weaponPref)
  const removeWeapon = removePref(preferences, setter);

  // Update Pref using: updateWeapon(weaponPref)
  const updateWeapon = updatePref(preferences, setter);

  return (
    // !!! TODO (UI): Create and implement JSX components for WeaponSelect
    <></>
  );
}

export default WeaponSelect;
