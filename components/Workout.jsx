import { Redirect } from "react-router-dom";
import React from "react";
import useUser from "../hooks/useUser";
import queryString from "query-string";
import Movement_Card_View from "./Movement_Card_View";

import "./css/workouts_style.css";
import { mutate } from "swr";

class AddNewSetComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onSetsChange = this.onSetsChange.bind(this);
  }

  onSetsChange = function (e) {
    console.log("Performing Number Of Sets Have Changed");
    console.log(
      `Old value of sets=${this.props.parent.state.oldNumSets}, new value=${this.props.parent.state.newNumSets}`
    );

    this.props.parent.state.oldNumSets = this.props.parent.state.newNumSets;
    this.props.parent.state.newNumSets = e.target.value;
    if (this.props.parent.state.newNumSets < 1) {
      this.props.parent.state.newNumSets = 1;
      e.target.value = 1;
    }

    let children = [];

    if (this.props.parent.state.oldNumSets < this.props.parent.state.newNumSets) {
      for (let i = this.props.parent.state.oldNumSets; i < this.props.parent.state.newNumSets; ++i) {
        children.push(<Set setNumber={i} ></Set>);
      }
    } else {
      for (let i = this.props.parent.state.newNumSets; i < this.props.parent.state.oldNumSets; ++i) {
        children.pop();
      }
    }
    this.props.parent.setState({ newNumSets: e.target.value });
  };

  addModifyButtonAction = async () => {
    console.log("Adding new movement");

    //const formElement = document.getElementById("addNewMovementForm");

    const movementName = document.getElementById("movementName").value;
    let numSets = this.props.parent.state.newNumSets;
    const sets = [];
    for (let i = 0; i < numSets; i++) {
      const set = {
        weight: document.getElementById(`weight${i}`).value,
        reps: document.getElementById(`reps${i}`).value,
        rpe: document.getElementById(`RPE${i}`).value,
      };
      sets.push(set);
    }

    if(document.getElementById('addModifyButton').innerHTML === 'Add New Movement') {
      const res = await fetch(`/movement?workout_id=${this.props.workout_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movementName, numSets, sets }),
      });
    }else if (document.getElementById('addModifyButton').innerHTML === 'Edit') {
      const res = await fetch(`/movement?workout_id=${this.props.workout_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movementName, numSets, sets }),
      });
    }
  };


 

  render() {
    const children = [];
    console.log(
      `Performing render where newNumSets = ${this.props.parent.state.newNumSets}`
    );

    for (var i = 0; i < this.props.parent.state.newNumSets; i += 1) {
      children.push(<Set setNumber={i} />);
    }

    return (
      <div id="addNewMovementForm">
        <form onsubmit="return false" id="addNewMovementForm">
          <input type="text" placeholder="name" id="movementName" />
          <input
            type="number"
            placeholder="number of sets"
            id="numberOfSets"
            onChange={this.onSetsChange}
          />
          <div id="setsDiv">{children}</div>
        </form>
        <button id = 'addModifyButton' onClick={this.addModifyButtonAction} onChange = {this.copyMovementData}>Add New Movement</button>
      </div>
    );
  }
}

const Set = (props) => (
  <div id={"set" + props.setNumber}>
    <input id={"weight" + props.setNumber} placeholder="weight">{props.weight}</input>
    <input id={"reps" + props.setNumber} placeholder="reps">{props.reps}</input>
    <input id={"RPE" + props.setNumber} placeholder="RPE">{props.RPE}</input>
  </div>
);

class WrapperClass extends React.Component {
  constructor(props) {
    super(props);
    this.user = props.user;
    this.parsed= props.parsed;
  }

  state = {
    oldNumSets: 0,
    newNumSets: 0,
  };

  render() {
    
    const workoutRes = this.user.workouts.find(
      (workout) => workout._id === this.parsed._id
    );

    if (!workoutRes) {
      console.log("All workouts: ");
      console.log(this.user.workouts.map((workout) => workout._id));
      console.log("Couldn't find this workout, redirecting to /");
      return <Redirect to="/" />;
    } else {

      return (      
      <div id="workoutPage">
          <h1>{workoutRes.name}</h1>
          {workoutRes.movements.length === 0 ? (
            <div>You have no movements yet :(</div>
          ) : (
            workoutRes.movements.map((movement) => (
              <Movement_Card_View movement={movement} parent={this} />
            ))
          )}
          <AddNewSetComponent workout_id={this.parsed._id} parent={this}/>
        </div>
      );
    }
  }
}

const Workout = (props) => {
    const parsed = queryString.parse(props.location.search);
    const { user, loading, loggedOut } = useUser();

    //console.log(parsed);

    if (loading || !user.username) return <div>Loading</div>;
    if (loggedOut) return <Redirect to="/login" />;
    if (!parsed._id) return <Redirect to="/" />;
    return (
      <WrapperClass user={user} parsed={parsed}/>
    );
};

export default Workout;
