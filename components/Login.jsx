import React from "react";
import { Redirect } from "react-router-dom";
import useUser from "../hooks/useUser";

import "./css/login_style.css";

const Login = (props) => {
  const [user, setUser] = useUser();

  const submitLogin = async (e) => {
    console.log("Submitting login");
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log({ username, password });

    const res = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 400) {
      alert("Bad login fuck u");
      return;
    }

    const userInfo = await res.json();
    setUser(userInfo);
  };

  if (user === "loading") return <div>Loading</div>;
  if (!user) {
    return (
      <div id="loginPage">
        <div id="logoDiv">
          <img
            id="logo"
            src="./components/resources/logo.jpg"
            alt="App Logo"
            width="300px"
            height="300px"
            title="App Logo"
          />
        </div>

        <form id="form" onsubmit="return false">
          <label for="username"> Username: </label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            required="required"
            pattern="[A-Za-z0-9]{1,20}"
          />{" "}
          <br />
          <label for="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            required="required"
            pattern="[A-Za-z0-9]{1,20}"
          />
          <br />
          <div class="buttonHolder">
            <button
              onClick={submitLogin}
              class="staticButtons"
              id="primaryButton"
            >
              Login
            </button>
            <a href="/signup" class="staticButtons" id="secondaryButton">
              Sign up
            </a>
          </div>
        </form>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Login;
