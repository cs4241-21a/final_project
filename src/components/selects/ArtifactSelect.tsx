import * as React from 'react';

import { addPref, removePref, updatePref } from "../../functions/selectFunctions";

import ArtifactProps from "../../types/props/ArtifactProps";
import EnablablePrefs from '../../types/prefs/EnablablePrefs';

interface ArtifactSelectProps {
  artifacts: ArtifactProps[],
  preferences: EnablablePrefs[],
  setter: React.Dispatch<React.SetStateAction<EnablablePrefs[]>>
}

const ArtifactSelect = ({
  artifacts,
  preferences,
  setter
}: ArtifactSelectProps) : JSX.Element => { 
  // Add Pref using: artifactPref = addArtifact(artifact);
  // artifact is an ArtifactProp from artifacts
  const addArtifact = addPref(EnablablePrefs, preferences, setter);

  // Remove Pref using: removeArtifact(artifactPref)
  // artifactPref is the EnablablePrefs returned by addArtifact
  const removeArtifact = removePref(preferences, setter);

  // Update Pref using: updateArtifact(artifactPref)
  // artifactPref is the EnablablePrefs returned by addArtifact
  const updateArtifact = updatePref(preferences, setter);

  return (
    // !!! TODO (UI): Create and implement JSX components for ArtifactSelect
    <></>
  );
}

export default ArtifactSelect;
