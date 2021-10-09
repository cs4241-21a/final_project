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
      <div className="day">
        <div className="day-title">{props.days}</div>
        {props.locations.map(e => {
            let mats = props.farmables.filter(m => m.farm_at === e.name);
            /*let imgSrc = "/img/farmables/" + mats.name + ".png";*/
            return (
                <div className="loc">
                    <h2>{e.fullname.en}</h2>
                    {mats.map(mat => {
                        return (
                            <div>
                                {/* TODO: Have this get the image of that material */}
                                <img className="icon" src="/img/farmables/Adventurer.png" alt={mat.fullname.en}/>
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
