import * as React from 'react';

import EnablablePrefs from "../types/prefs/EnablablePrefs";
import NamedProps from "../types/props/NamedProps";

type AConstructorTypeOf<T> = new (...args:any[]) => T;

// Create a function for adding prefs based off any NamedProp interface
const addPref = <PrefsType extends EnablablePrefs>(
  Ctor: AConstructorTypeOf<PrefsType>,
  preferences: PrefsType[], 
  setter: React.Dispatch<React.SetStateAction<PrefsType[]>>
) => {
  return (instance: NamedProps): PrefsType => {
    const newPref = new Ctor(instance.name);
    const tempPrefs = [...preferences];
    tempPrefs.push(newPref);
    setter(tempPrefs);
    return newPref;
  };
};

// Create a function for removing the given pref
const removePref = <PrefsType extends EnablablePrefs>(
  preferences: PrefsType[], 
  setter: React.Dispatch<React.SetStateAction<PrefsType[]>>
) => {
  return (pref: PrefsType): void => {
    const tempPrefs = [...preferences];
    const index = tempPrefs.indexOf(pref);
    if (index === -1) {
      console.warn(`${pref.name} is not in current preferences, nothing to remove.`);
    } else {
      tempPrefs.splice(index, 1);
      setter(tempPrefs);
    }
  };
};

// Create a function for updating prefs based off the updated preferences
const updatePref = <PrefsType extends EnablablePrefs>(
  preferences: PrefsType[], 
  setter: React.Dispatch<React.SetStateAction<PrefsType[]>>
) => {
  return (pref: PrefsType): void => {
    const tempPrefs = [...preferences];
    const index = tempPrefs.findIndex(_pref => {
      return (pref.name == _pref.name);
    });
    if (index === -1) {
      console.warn(`${pref.name} is not in current preferences, nothing to update.`);
    } else {
      tempPrefs.splice(index, 1, pref);
      setter(tempPrefs);
    }
  };
};


export {
  addPref,
  removePref,
  updatePref
};
