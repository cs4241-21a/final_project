import React from "react";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import "./css/navigation_style.css";
//import "./css/general_style.css";

const NavigationBar = (props) => {
  const [user, setUser] = useUser();
  return (
    <div class="topNav" id="headerDiv">
      <Link to="/">Home</Link>

      {user === null ? (
        <Link to="/login">Login</Link>
      ) : user === "loading" ? (
        <div>Loading</div>
      ) : (
        <button>Log Out</button>
      )}
    </div>
  );
};

export default NavigationBar;
