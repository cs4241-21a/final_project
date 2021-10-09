import AccordianItem from "./AcordianItem";
import ContactsContext from "../../store/favoriteContext";
import { useState, useContext } from "react";

function BuildingList(props) {
  const favoriteContext = useContext(ContactsContext);
  const [expanded, setExpanded] = useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  console.log(favoriteContext.contacts);

  if (!props.showFavorites) {
    return (
      <div>
        {props.data.map((item, index) => {
          console.log(favoriteContext.contacts);
          return (
            <AccordianItem
              expanded={expanded}
              handleChange={handleChange}
              show={props.show}
              hide={props.onHide}
              key={index + 1}
              index={index + 1}
              item={item}
              favorite={favoriteContext.contacts.includes(item.humanname)}
              removeContactHandler={favoriteContext.removeContactHandler}
              addContactHandler={favoriteContext.addContactHandler}
            />
          );
        })}
      </div>
    );
  } else {
    const rawData = props.data;
    const filteredData = rawData.filter((item) =>
      favoriteContext.contacts.includes(item.humanname)
    );

    return (
      <div>
        {filteredData.map((item, index) => {
          console.log(favoriteContext.contacts);
          return (
            <AccordianItem
              expanded={expanded}
              handleChange={handleChange}
              show={props.show}
              hide={props.onHide}
              key={index + 1}
              index={index + 1}
              item={item}
              favorite={favoriteContext.contacts.includes(item.humanname)}
              removeContactHandler={favoriteContext.removeContactHandler}
              addContactHandler={favoriteContext.addContactHandler}
            />
          );
        })}
      </div>
    );
  }
}

export default BuildingList;
