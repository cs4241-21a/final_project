import React from "react";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import "./css/navigation_style.css";
//import "./css/general_style.css";

const NavigationBar = (props) => {
  const { user, loggedOut, mutate, loading } = useUser();

  const logOut = async () => {
    console.log("Logout");
    await fetch("/me", { method: "DELETE" });
    mutate();
    window.location.href = "/";
  };

  return (
    <nav class="topNav" id="headerDiv">
      <Link class = "topnavlink" to="/">Home</Link>
      {loggedOut ? (
        <Link class = "topnavlink" to="/login">Log In</Link>
      ) : loading ? (
        <div>Loading</div>
      ) : (
        <div>
        <text >Hello, {user.username} </text>
        <button onClick={logOut}>Log Out</button>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
