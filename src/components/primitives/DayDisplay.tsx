import * as React from "react";
import FarmableProps from "../../types/props/FarmableProps";
import FarmingSpotProps from "../../types/props/FarmingSpotProps";

const DayDisplay = (props: { days: String, farmables: FarmableProps[], locations: FarmingSpotProps[] }): JSX.Element => {



  return (
    // !!! TODO (UI): Create and implement JSX components for FarmingDisplay
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: 'black 1px solid',
          flex: '1'
        }}
      >
        <div
          style={{
            width: "100%",
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
            border: 'black 1px solid'
          }}
        >
          {props.days}
        </div>
      </div>
    </>
  );
};

export default DayDisplay;
