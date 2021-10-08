import React from "react";
import Card_Row from "./Card_Row";

const Movement_Card_View = (props) => {
    console.log(props.movement)
    console.log(props.form)
  // return <div>movement card</div>;
  console.log("React Log page")

  const editEntry = () => {
      document.getElementById('addModifyButton').value = 'Edit'
      document.getElementById('movementName').value = props.movement.movementName

    movementName = document.getElementById('movementName').value;

    props.form.test()
  
    let children = [];

    for (let i = 0; i < props.state.newNumSets; ++i) {
        let newWeight = document.getElementById(movementName+'weight'+i)
        let newReps = document.getElementById(movementName+'reps'+i)
        let newRPE = document.getElementById(movementName+'RPE'+i)
        children.push(<Set setNumber={i} weight = {newWeight} reps = {newReps} RPE = {newRPE}></Set>);
      }

      props.form.setState({ newNumSets: e.target.value });
  }

    return <div>
        <p id={props.movement.movementName}>{props.movement.movementName}</p>
        <p id={props.movement.movementName +'numSets'}>{props.movement.sets.length}</p>
        <table>
            <tr>
                <th>Reps</th>
                <th>Weight</th>
                <th>RPE</th>
            </tr>
            {props.movement.sets.map((row, i) => <Card_Row exercise_name={props.movement.movementName} key={i} set={row}></Card_Row>)}
        </table>
        <button onClick = {editEntry}>Edit This Entry</button>
    </div>
};


export default Movement_Card_View;
