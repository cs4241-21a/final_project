import AccordianItem from "./AcordianItem";

import * as React from "react";

function BuildingList(props) {
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      {props.data.map((item, index) => {
        return (
          <AccordianItem
            expanded={expanded}
            handleChange={handleChange}
            show={props.show}
            hide={props.onHide}
            key={index + 1}
            index={index + 1}
            item={item}
          />
        );
      })}
    </div>
  );
}

export default BuildingList;
