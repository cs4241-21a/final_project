import React from "react";
import { Redirect } from "react-router-dom";
import useUser from "../hooks/useUser";
import Movement_Card_View from "./Movement_Card_View";

const Home = () => {
  const [user, setUser] = useUser();

  if (user === "loading") return <div>Loading</div>;
  if (!user) return <Redirect to="/login" />;

  // const user = useUser();
  let json = {
    exercise_name: "Squat",
    sets: [
      { reps: 10, weight: 85, rpe: 5.5 },
      { reps: 10, weight: 105, rpe: 7.5 },
      { reps: 8, weight: 125, rpe: 8.5 },
    ],
  };
  return <div>{<Movement_Card_View movement={json} />}</div>;
};

export default Home;
