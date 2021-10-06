import * as React from 'react';

import FarmableProps from "../props/api/FarmableProps";
import FarmingSpotProps from "../props/api/FarmingSpotProps";

interface FarmingDisplayProps {
  farmables: FarmableProps[],
  locations: FarmingSpotProps[]
}

const FarmingDisplay = ({
  farmables,
  locations
}: FarmingDisplayProps) : JSX.Element => { 
  // !!! TODO (Nick): Create logic for displaying artifact preferences using the setter

  return (
    // !!! TODO (UI): Create and implement JSX components for FarmingDisplay
    <></>
  );
}

export default FarmingDisplay;
