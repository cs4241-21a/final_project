import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import useUser from "../hooks/useUser";

const Home = () => {
  const [user, setUser] = useUser();

  if (user === "loading") return <div>Loading</div>;
  if (!user) return <Redirect to="/login" />;

  return <div>{user.username}</div>;
};

export default Home;
