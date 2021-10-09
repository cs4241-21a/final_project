import * as React from 'react';

import EnablablePrefs from '../../types/prefs/EnablablePrefs';

import NamedProps from "../../types/props/NamedProps";

import ToggableButton from "./ToggableButton"

interface SelectPrefButtonProps<PrefsType extends EnablablePrefs> {
  addPref: (instance: NamedProps) => PrefsType,
  removePref: (pref: PrefsType) => void,
  preferences: PrefsType[],
  prop: NamedProps,
  imgFolder: "farmables" | "chara" | "weapon"
}

const SelectPrefButton = <PrefsType extends EnablablePrefs>({
  addPref,
  removePref,
  preferences,
  prop,
  imgFolder
}: SelectPrefButtonProps<PrefsType>) : JSX.Element => {
  const [pref, setPref] = React.useState<PrefsType | undefined>(() => {
    return preferences.find((_pref) => (_pref.name==prop.name));
  }); 

  const onClickOn = () => {
    setPref(addPref(prop));
  }
  const onClickOff = () => {
    removePref(pref as PrefsType);
    setPref(undefined);
  }

  const imgSrc = `img/${imgFolder}/${prop.name}.png`;

  return (
    <ToggableButton 
      onClickOff={onClickOff}
      onClickOn={onClickOn}
      active={pref !== undefined}
    >
      <img src={imgSrc} alt={`${prop.name}-image`} width="100px" />
      <p>{prop.name}</p>
    </ToggableButton>
  );
}

export default SelectPrefButton;
