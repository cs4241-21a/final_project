import * as React from 'react';

import FarmableProps from "../types/props/FarmableProps";
import FarmingSpotProps from "../types/props/FarmingSpotProps";
import DayDisplay from './primitives/DayDisplay';

interface FarmingDisplayProps {
  farmables: FarmableProps[],
  locations: FarmingSpotProps[]
}

const FarmingDisplay = ({
  farmables,
  locations
}: FarmingDisplayProps) : JSX.Element => { 
  // !!! TODO (Nick): Create logic for displaying artifact preferences using the setter

  // Sort locations / farmables by day and then put them into each day
  const monLocs : FarmingSpotProps[] = locations.filter(e => e.day_of_week.find(d => d === 'mon') !== undefined);
  const tueLocs : FarmingSpotProps[] = locations.filter(e => e.day_of_week.find(d => d === 'tue') !== undefined);
  const wedLocs : FarmingSpotProps[] = locations.filter(e => e.day_of_week.find(d => d === 'wed') !== undefined);

  return (
    // !!! TODO (UI): Create and implement JSX components for FarmingDisplay
    <>
      <div style={{display: 'flex', width: '100%', textAlign: 'center'}}>
        <DayDisplay days={"Mon/Thu"} farmables={} locations={monLocs} /> 
        <DayDisplay days={"Tue/Fri"} farmables={} locations={tueLocs} /> 
        <DayDisplay days={"Wed/Sat"} farmables={} locations={wedLocs} /> 
        <DayDisplay days={"All"} farmables={farmables} locations={locations} /> 
      </div>
    </>
  );
}

export default FarmingDisplay;
