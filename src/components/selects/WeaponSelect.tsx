import * as React from 'react';

import { addPrefFunction } from "../../functions/selectFunctions";

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
  // !!! TODO (Nick): Create logic for setting weapon preferences using the setter

  // Add Pref using: addWeapon(weapon, preferences, setter);
  const addWeapon = addPrefFunction(EnablablePrefs);

  // Example of it being used on page load
  React.useEffect(() => {
    const weapon = {
      name: "testWeapon"
    }
    addWeapon(weapon, preferences, setter);
  }, [])
  
  // Remove Pref

  // Enable Pref

  // Disable Pref


  return (
    // !!! TODO (UI): Create and implement JSX components for WeaponSelect
    <></>
  );
}

export default WeaponSelect;
