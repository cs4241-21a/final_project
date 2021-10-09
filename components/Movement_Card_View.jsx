import React from "react";
import Card_Row from "./Card_Row";
import {Set} from "./Workout"

const Movement_Card_View = (props) => {
  console.log(props.movement);
  console.log(props.parent);
  // return <div>movement card</div>;
  console.log("React Log page");

  const editEntry = () => {
    const movementName = props.movement.movementName;
    const numSets = props.movement.sets.length;

    document.getElementById("addModifyButton").innerText = "Edit";
    document.getElementById("movementName").value = movementName;
    document.getElementById("numberOfSets").value = numSets;

    console.log('Performing editEntry')
    
    props.parent.state.sets = [];

    for (let i = 0; i < numSets; ++i) {
      props.parent.state.sets.push(<Set setNumber={i}></Set>)
    }

    props.parent.setState({ 
      oldNumSets: numSets,
      newNumSets: numSets
    });

    for (let i = 0; i < numSets; ++i) {
      let newWeight = document.getElementById(`${movementName}weight${i}`).innerHTML
      let newReps = document.getElementById(`${movementName}reps${i}`).innerHTML
      let newRPE = document.getElementById(`${movementName}RPE${i}`).innerHTML

      document.getElementById(`weight${i}`).value = newWeight
      document.getElementById(`reps${i}`).value = newReps
      document.getElementById(`RPE${i}`).value = newRPE
    }
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
    <div>
      <p id={props.movement.movementName}>{props.movement.movementName}</p>
      <p id={props.movement.movementName + "numSets"}>
        {props.movement.sets.length}
      </p>
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
