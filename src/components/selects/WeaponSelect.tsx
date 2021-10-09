import * as React from 'react';

import { addPref, removePref, updatePref } from "../../functions/selectFunctions";

import WeaponProps from "../../types/props/WeaponProps";
import EnablablePrefs from "../../types/prefs/EnablablePrefs";

import DebugButton from "../debug/DebugButton"; // Demo import !!!

interface WeaponSelectProps {
  weapons: WeaponProps[],
  preferences: EnablablePrefs[],
  setter: React.Dispatch<React.SetStateAction<EnablablePrefs[]>>
}

// Demo data !!!
let weaponPref: EnablablePrefs;
let weapon: WeaponProps = {
  name: "testWeapon"
};

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


  // Demo Functionality !!!
  const addClick = () => {
    console.log("Add click.");
    weaponPref = addWeapon(weapon);
  }
  const removeClick = () => {
    console.log("Remove click.");
    removeWeapon(weaponPref);
  }
  const updateClick = () => {
    console.log("Update click.");
    let temp = {...weaponPref};
    temp.enabled = !weaponPref.enabled;
    weaponPref = temp;
    updateWeapon(temp);
  }
  React.useEffect(() => {
    console.log(weaponPref);
    console.log(preferences);
  }, [preferences]);


  return (
    // !!! TODO (UI): Create and implement JSX components for WeaponSelect
    <>
      <DebugButton onClick={addClick} message="Add Weapon" />
      <DebugButton onClick={updateClick} message="Update Weapon" />
      <DebugButton onClick={removeClick} message="Remove Weapon" />
    </>
  );
}

export default WeaponSelect;
