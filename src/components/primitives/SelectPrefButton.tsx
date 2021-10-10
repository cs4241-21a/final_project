import * as React from 'react';

import EnablablePrefs from '../../types/prefs/EnablablePrefs';
import NamedProps from "../../types/props/NamedProps";

import ToggableButton from "./ToggableButton"

interface SelectPrefButtonProps<PrefsType extends EnablablePrefs> {
  addPref: (instance: NamedProps) => PrefsType,
  removePref: (pref: PrefsType) => void,
  preferences: PrefsType[],
  prop: NamedProps,
  children: React.ReactNode,
  loading: boolean
}

const SelectPrefButton = <PrefsType extends EnablablePrefs>({
  addPref,
  removePref,
  preferences,
  prop,
  children,
  loading
}: SelectPrefButtonProps<PrefsType>) : JSX.Element => {
  const [pref, setPref] = React.useState<PrefsType | undefined>(undefined);

  const onClickOn = () => {
    setPref(addPref(prop));
  }
  const onClickOff = () => {
    removePref(pref as PrefsType);
    setPref(undefined);
  }

  React.useEffect(() => {
    setPref(preferences.find((_pref) => (_pref.name==prop.name)));
  }, [loading])

  React.useEffect(() => {
    console.log(`${prop.name} has: ${pref}`);
  }, [pref]);

  return (
    <ToggableButton 
      onClickOff={onClickOff}
      onClickOn={onClickOn}
      active={pref !== undefined}
    >
      {children}
    </ToggableButton>
  );
}

export default SelectPrefButton;
