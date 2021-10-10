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
  const [monLocs, setMonLoc] = React.useState<FarmingSpotProps[]>([]);
  const [tueLocs, setTueLoc] = React.useState<FarmingSpotProps[]>([]);
  const [wedLocs, setWedLoc] = React.useState<FarmingSpotProps[]>([]);
  const [allLocs, setAllLoc] = React.useState<FarmingSpotProps[]>([]);
  const [monFarm, setMonFarm] = React.useState<MaterialProps[]>([]);
  const [tueFarm, setTueFarm] = React.useState<MaterialProps[]>([]);
  const [wedFarm, setWedFarm] = React.useState<MaterialProps[]>([]);
  const [allFarm, setAllFarm] = React.useState<MaterialProps[]>([]);

  React.useEffect(() => {
    setMonLoc(locations.filter(
      (e) => e.day_of_week.find((d) => d === "mon") !== undefined
    ))
    setTueLoc(locations.filter(
      (e) => e.day_of_week.find((d) => d === "tue") !== undefined
    ))
    setWedLoc(locations.filter(
      (e) => e.day_of_week.find((d) => d === "wed") !== undefined
    ))
    setAllLoc(locations.filter(
      (e) => e.day_of_week.length == 0
    ))

    console.log(locations);
    console.log(farmables);
  },[locations, farmables])

  React.useEffect(() => {
    setMonFarm(farmables.filter((e) => monLocs.some((l) => l.name === e.farm_at)))
    setTueFarm(farmables.filter((e) => tueLocs.some((l) => l.name === e.farm_at)))
    setWedFarm(farmables.filter((e) => wedLocs.some((l) => l.name === e.farm_at)))
    setAllFarm(farmables.filter((e) => allLocs.some((l) => l.name === e.farm_at)))
  }, [monLocs, tueLocs, wedLocs, allLocs])

  return (
    // !!! TODO (UI): Create and implement JSX components for FarmingDisplay
    <>
      <link rel="stylesheet" type="text/css" href="css/farmingdisplay.css" />
      <div id="farm" style={{ display: "flex", width: "100%", textAlign: "center" }}>
        <DayDisplay days={"Mon/Thu"} farmables={monFarm} locations={monLocs} />
        <DayDisplay days={"Tue/Fri"} farmables={tueFarm} locations={tueLocs} />
        <DayDisplay days={"Wed/Sat"} farmables={wedFarm} locations={wedLocs} />
        <DayDisplay days={"All"} farmables={allFarm} locations={allLocs} />
      </div>
    </>
  );
};

export default FarmingDisplay;
