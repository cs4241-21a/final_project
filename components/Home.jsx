import React, { useCallback } from "react";
import { Redirect, Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import Movement_Card_View from "./Movement_Card_View";

import "./css/home.css";

const Home = () => {
  const { user, loggedOut, loading, mutate } = useUser();

  if (loggedOut) return <Redirect to="/login" />;
  if (loading || !user.username) return <div>Loading</div>;

  const newWorkout = async () => {
    const workoutRes = await fetch("/workout", { method: "POST" });
    mutate();
  };

  //console.log(user);

  // const user = useUser();
  /*
  let json = [{

    exercise_name: "Squat",
    sets: [
      { reps: 10, weight: 85, rpe: 5.5 },
      { reps: 10, weight: 105, rpe: 7.5 },
      { reps: 8, weight: 125, rpe: 8.5 },
    ],

  };
  */
  return (
    <div>
      <div>{user.username}</div>

      <button class = "addWorkout" onClick={newWorkout}>New Workout</button>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {user.workouts.map((workout) => (
          <div class = "workoutEntry">
            <Link to={`/workout?_id=${workout._id}`}>{workout.name}</Link>
            <button
              onClick={async () => {
                await fetch(`/workout?_id=${workout._id}`, {
                  method: "DELETE",
                });
                mutate();
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
