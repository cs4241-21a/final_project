import * as React from "react";

import FarmableProps from "../types/props/FarmableProps";
import FarmingSpotProps from "../types/props/FarmingSpotProps";
import DayDisplay from "./primitives/DayDisplay";

interface FarmingDisplayProps {
  farmables: FarmableProps[];
  locations: FarmingSpotProps[];
}

const FarmingDisplay = ({
  farmables,
  locations,
}: FarmingDisplayProps): JSX.Element => {
  // !!! TODO (Nick): Create logic for displaying artifact preferences using the setter

  const [monLocs, setMonLoc] = React.useState<FarmingSpotProps[]>(
    locations.filter(
      (e) => e.day_of_week.find((d) => d === "mon") !== undefined
    )
  );
/*  const [tueLocs, setTueLoc] = React.useState<FarmingSpotProps[]>(
    locations.filter(
      (e) => e.day_of_week.find((d) => d === "tue") !== undefined
    )
  );
  const [wedLocs, setWedLoc] = React.useState<FarmingSpotProps[]>(
    locations.filter(
      (e) => e.day_of_week.find((d) => d === "wed") !== undefined
    )
  );*/
  const [monFarm, setMonFarm] = React.useState<FarmableProps[]>(
    farmables.filter((e) => monLocs.some((l) => l.name === e.farm_at))
  );
/*  const [tueFarm, setTueFarm] = React.useState<FarmableProps[]>(
    farmables.filter((e) => tueLocs.some((l) => l.name === e.farm_at))
  );
  const [wedFarm, setWedFarm] = React.useState<FarmableProps[]>(
    farmables.filter((e) => wedLocs.some((l) => l.name === e.farm_at))
  );*/

    const [wedLocs, setWedLoc] = React.useState<FarmingSpotProps[]>(
        [
            {
                fullname: { en: "Domain" },
                day_of_week: ["wed, sat"],
                resin: 5,
                name: "test",
                type: "idk"
            },
            {
                fullname: { en: "Domain 2" },
                day_of_week: ["wed, sat"],
                resin: 3,
                name: "test2",
                type: "idk"
            }
        ]
    );

    const [tueLocs, setTueLoc] = React.useState<FarmingSpotProps[]>(
        [
            {
                fullname: { en: "Domain" },
                day_of_week: ["tue, fri"],
                resin: 5,
                name: "test",
                type: "idk"
            },
            {
                fullname: { en: "Domain 2" },
                day_of_week: ["tue, fri"],
                resin: 3,
                name: "test2",
                type: "idk"
            }
        ]
    );

    const [wedFarm, setWedFarm] = React.useState<FarmableProps[]>(
        [
            {
                name: "farmable1",
                fullname: { en: "Emblem of Severed Fate" },
                farm_at: "test",
            },
            {
                name: "farmable3",
                fullname: { en: "Farmable Three" },
                farm_at: "test",
            },
            {
                name: "farmable4",
                fullname: { en: "Farmable Four" },
                farm_at: "test2",
            },
        ]
    );

    const [tueFarm, setTueFarm] = React.useState<FarmableProps[]>(
        [
            {
                name: "farmable1",
                fullname: { en: "Emblem of Severed Fate" },
                farm_at: "test",
            },
            {
                name: "farmable2",
                fullname: { en: "Farmable Two" },
                farm_at: "test",
            },
            {
                name: "farmable3",
                fullname: { en: "Farmable Three" },
                farm_at: "test",
            },
            {
                name: "farmable4",
                fullname: { en: "Farmable Four" },
                farm_at: "test2",
            },
            {
                name: "farmable5",
                fullname: { en: "Farmable Five" },
                farm_at: "test2",
            },
        ]
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
