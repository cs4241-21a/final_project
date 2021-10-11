import * as React from "react";
import FarmingSpotProps from "../../types/props/FarmingSpotProps";
import MaterialProps from "../../types/props/MaterialProps";

const DayDisplay = (props: {
  days: String;
  farmables: MaterialProps[];
  locations: FarmingSpotProps[];
}): JSX.Element => {

  return (
    <>
      <div className="day">
        <div className="day-title">{props.days}</div>
        {props.locations.map(e => {
            let mats = props.farmables.filter(m => m.farm_at === e.name);
            return (
                <div className="loc">
                    <h2>{e.fullname.en}</h2>
                    {mats.map(mat => {
                        return (
                            <div>
                                {/* TODO: Have this get the image of that material */}
                                <img className="icon" src={"/img/farmables/"+mat.name+".png"} /> 
                                <p>{mat.fullname.en}</p>
                            </div>
                        )
                    })}
                </div>
            )
        })}
      </div>
    </>
  );
};

export default DayDisplay;
