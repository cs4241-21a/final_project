import { Redirect } from "react-router-dom";
import React from "react";
import useUser from "../hooks/useUser";
import queryString from "query-string";
import Movement_Card_View from "./Movement_Card_View";

const Workout = (props) => {
  const { user, loading, loggedOut } = useUser();
  const parsed = queryString.parse(props.location.search);

  //console.log(parsed);

  if (loading) return <div>Loading</div>;
  if (loggedOut) return <Redirect to="/login" />;
  if (!parsed._id) return <Redirect to="/" />;

  const workoutRes = user.workouts.find(
    (workout) => workout._id === parsed._id
  );

  const newMovement = async () => {
    console.log("Adding new movement");
  };

  if (!workoutRes) {
    console.log("All workouts: ");
    console.log(user.workouts.map((workout) => workout._id));
    console.log("Couldn't find this workout, redirecting to /");
    return <Redirect to="/" />;
  } else {
    return (
      <>
        <h1>{workoutRes.name}</h1>
        {workoutRes.movements.length === 0 ? (
          <div>You have no movements yet :(</div>
        ) : (
          workoutRes.movements.map((movement) => (
            <Movement_Card_View movement={movement} />
          ))
        )}
        <button onClick={newMovement}>New Movement</button>
      </>
    );
  }
};

export default Workout;
