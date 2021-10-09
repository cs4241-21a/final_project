import React from "react";
import Card_Row from "./Card_Row";

import "./css/movement_card_view.css";

const Movement_Card_View = (props) => {
  console.log(props.movement);
  console.log(props.parent);
  // return <div>movement card</div>;
  console.log("React Log page");

  const editEntry = () => {
    document.getElementById("addModifyButton").innerText = "Edit";
    document.getElementById("movementName").value = props.movement.movementName;
    document.getElementById("numberOfSets").value = props.movement.sets.length;

    props.parent.state.newNumSets = props.movement.sets.length;
    let setsDiv = document.getElementById("setsDiv");

    const movementName = props.movement.movementName;

    let children = "";

    for (let i = 0; i < props.movement.sets.length; ++i) {
      let newWeight = document.getElementById(
        `${movementName}weight${i}`
      ).innerHTML;
      let newReps = document.getElementById(
        `${movementName}reps${i}`
      ).innerHTML;
      let newRPE = document.getElementById(`${movementName}RPE${i}`).innerHTML;

      children += `<div id='set${i}'> 
                        <input id='weight${i}' placeholder="weight" value="${newWeight}"></input> 
                        <input id='reps${i}' placeholder="reps" value="${newReps}"></input> 
                        <input id='RPE${i}' placeholder="RPE" value="${newRPE}"></input> 
                    </div>`;
    }
    setsDiv.innerHTML = children;

    console.log("Children is: " + children);
  };

  let cardRows = [];
  for (let i = 0; i < props.movement.sets.length; ++i) {
    cardRows.push(
      <Card_Row
        exercise_name={props.movement.movementName}
        setNumber={i}
        set={props.movement.sets[i]}
      ></Card_Row>
    );
  }
  return (
    <div  id='movement_card'>
      <p id={props.movement.movementName}>{props.movement.movementName}</p>
      <table>
        <tr>
          <th>Weight</th>
          <th>Reps</th>
          <th>RPE</th>
        </tr>
        {cardRows}
      </table>
      <button onClick={editEntry}>Edit This Entry</button>
    </div>
  );
};

export default Movement_Card_View;
