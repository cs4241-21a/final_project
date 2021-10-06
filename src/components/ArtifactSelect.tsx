import * as React from 'react';

import ArtifactProps from "../props/api/ArtifactProps";
import EnablablePrefProps from "../props/prefs/EnablablePrefProps";

interface ArtifactSelectProps {
  artifacts: ArtifactProps[],
  preferences: EnablablePrefProps[],
  setter: React.Dispatch<React.SetStateAction<EnablablePrefProps[]>>
}

const ArtifactSelect = ({
  artifacts,
  preferences,
  setter
}: ArtifactSelectProps) : JSX.Element => { 
  // !!! TODO (Nick): Create logic for setting artifact preferences using the setter

  return (
    // !!! TODO (UI): Create and implement JSX components for ArtifactSelect
    <></>
  );
}

export default ArtifactSelect;
