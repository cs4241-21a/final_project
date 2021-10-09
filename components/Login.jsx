import React from "react";
import { Redirect } from "react-router-dom";
import useUser from "../hooks/useUser";
import useSWR from "swr";

import "./css/login_style.css";

const Login = (props) => {
  const { user, mutate, loading, loggedOut } = useUser();

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
      alert("Bad login");
      return;
    }

    const userInfo = await res.json();
    mutate("/me", userInfo, false);
  };

  if (loading) return <div>Loading</div>;
  if (loggedOut) {
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
          <input
            type="text"
            id="username"
            name="username"
            required="required"
            pattern="[A-Za-z0-9]{1,20}"
            placeholder="username"
          />{" "}
          <input
            type="password"
            id="password"
            name="password"
            required="required"
            pattern="[A-Za-z0-9]{1,20}"
            placeholder="password"
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
