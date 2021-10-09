import * as React from "react";
import FarmableProps from "../../types/props/FarmableProps";
import FarmingSpotProps from "../../types/props/FarmingSpotProps";

const DayDisplay = (props: {
  days: String;
  farmables: FarmableProps[];
  locations: FarmingSpotProps[];
}): JSX.Element => {

  return (
    <>
      <div id="day">
        <div id="day-title">{props.days}</div>
        {props.locations.map(e => {
            let mats = props.farmables.filter(m => m.farm_at === e.name);
            return (
                <div id="loc">
                    <h2>{e.fullname}</h2>
                    {mats.map(mat => {
                        return <p>{mat.fullname}</p>
                    })}
                </div>
            )
        })}
      </div>
    </>
  );
};

export default DayDisplay;
