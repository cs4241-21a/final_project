import * as React from 'react';

import WeaponProps from "../props/api/WeaponProps";
import EnablablePrefProps from "../props/prefs/EnablablePrefProps";

interface WeaponSelectProps {
  weapons: WeaponProps[],
  preferences: EnablablePrefProps[],
  setter: React.Dispatch<React.SetStateAction<EnablablePrefProps[]>>
}

const WeaponSelect = ({
  weapons,
  preferences,
  setter
}: WeaponSelectProps) : JSX.Element => { 
  // !!! TODO (Nick): Create logic for setting weapon preferences using the setter

  return (
    // !!! TODO (UI): Create and implement JSX components for WeaponSelect
    <></>
  );
}

export default WeaponSelect;
