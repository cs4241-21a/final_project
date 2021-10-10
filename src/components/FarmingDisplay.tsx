import * as React from "react";

import FarmingSpotProps from "../types/props/FarmingSpotProps";
import MaterialProps from "../types/props/MaterialProps";
import DayDisplay from "./primitives/DayDisplay";

interface FarmingDisplayProps {
  farmables: MaterialProps[];
  locations: FarmingSpotProps[];
}

const FarmingDisplay = ({
  farmables,
  locations,
}: FarmingDisplayProps): JSX.Element => {
  // !!! TODO (Nick): Create logic for displaying artifact preferences using the setter

  console.log(farmables);
  console.log(locations);

  const [monLocs, setMonLoc] = React.useState<FarmingSpotProps[]>(
    locations.filter(
      (e) => e.day_of_week.find((d) => d === "mon") !== undefined
    )
  );
  const [tueLocs, setTueLoc] = React.useState<FarmingSpotProps[]>(
    locations.filter(
      (e) => e.day_of_week.find((d) => d === "tue") !== undefined
    )
  );
  const [wedLocs, setWedLoc] = React.useState<FarmingSpotProps[]>(
    locations.filter(
      (e) => e.day_of_week.find((d) => d === "wed") !== undefined
    )
  );
  const [monFarm, setMonFarm] = React.useState<FarmableProps[]>(
    farmables.filter((e) => monLocs.some((l) => l.name === e.farm_at))
  );
  const [tueFarm, setTueFarm] = React.useState<FarmableProps[]>(
    farmables.filter((e) => tueLocs.some((l) => l.name === e.farm_at))
  );
  const [wedFarm, setWedFarm] = React.useState<FarmableProps[]>(
    farmables.filter((e) => wedLocs.some((l) => l.name === e.farm_at))
  );

  return (
    // !!! TODO (UI): Create and implement JSX components for FarmingDisplay
    <>
      <link rel="stylesheet" type="text/css" href="css/farmingdisplay.css" />
      <div id="farm" style={{ display: "flex", width: "100%", textAlign: "center" }}>
        <DayDisplay days={"Mon/Thu"} farmables={monFarm} locations={monLocs} />
        <DayDisplay days={"Tue/Fri"} farmables={tueFarm} locations={tueLocs} />
        <DayDisplay days={"Wed/Sat"} farmables={wedFarm} locations={wedLocs} />
        <DayDisplay days={"All"} farmables={farmables} locations={locations} />
      </div>
    </>
  );
};

export default FarmingDisplay;
