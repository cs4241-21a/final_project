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
    <div class="topNav" id="headerDiv">
      <Link class = "topnavlink" to="/">Home</Link>
      {loggedOut ? (
        <Link class = "topnavlink" to="/login">Login</Link>
      ) : loading ? (
        <div>Loading</div>
      ) : (
        <div>
        <text>hello {user.username} </text>
        <button class = "topnavbutton" onClick={logOut}>Log Out</button>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
