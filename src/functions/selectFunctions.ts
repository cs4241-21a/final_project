import * as React from 'react';

import EnablablePrefs from "../types/prefs/EnablablePrefs";
import NamedProps from "../types/props/NamedProps";

type AConstructorTypeOf<T> = new (...args:any[]) => T;

const addPrefFunction = <PrefsType extends EnablablePrefs>(Ctor: AConstructorTypeOf<PrefsType>) => {
    return (instance: NamedProps, preferences: PrefsType[], setter: React.Dispatch<React.SetStateAction<PrefsType[]>>): void => {
      const newPref = new Ctor(instance.name);
      const tempPrefs = [...preferences];
      tempPrefs.push(newPref);
      setter(tempPrefs);
    };
};

export {
  addPrefFunction
};
