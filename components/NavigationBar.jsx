import React from "react";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import "./css/navigation_style.css";
//import "./css/general_style.css";

const NavigationBar = (props) => {
  const { user, loggedOut, mutate, loading } = useUser();
  return (
    <div class="topNav" id="headerDiv">
      <Link to="/">Home</Link>

      {loggedOut ? (
        <Link to="/login">Login</Link>
      ) : loading ? (
        <div>Loading</div>
      ) : (
        <button>Log Out</button>
      )}
    </div>
  );
};

export default NavigationBar;
