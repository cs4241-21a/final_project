import * as React from 'react';

import { addPrefFunction } from "../../functions/selectFunctions";

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

  // Add Pref using: addArtifact(artifact, preferences, setter);
  const addArtifact = addPrefFunction(EnablablePrefs);
  
  // Example of it being used on page load
  React.useEffect(() => {
    const artifact = {
      name: "testArtifact"
    }
    addArtifact(artifact, preferences, setter);
  }, [])

  // Remove Pref

  // Enable Pref

  // Disable Pref

  return (
    // !!! TODO (UI): Create and implement JSX components for ArtifactSelect
    <></>
  );
}

export default ArtifactSelect;
