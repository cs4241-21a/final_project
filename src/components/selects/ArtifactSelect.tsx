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
  // !!! TODO (Nick): Create logic for setting artifact preferences using the setter

  // Add Pref using: addArtifact(artifact);
  const addArtifact = addPref(EnablablePrefs, preferences, setter);

  // Remove Pref using: removeArtifact(artifactPref)
  const removeArtifact = removePref(preferences, setter);

  // Update Pref using: updateArtifact(artifactPref)
  const updateArtifact = updatePref(preferences, setter);

  // Enable Pref

  // Disable Pref

  return (
    // !!! TODO (UI): Create and implement JSX components for ArtifactSelect
    <></>
  );
}

export default ArtifactSelect;
