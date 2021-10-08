import * as React from 'react';

import FarmableProps from "../types/props/FarmableProps";
import FarmingSpotProps from "../types/props/FarmingSpotProps";

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
