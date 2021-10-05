import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import useUser from "../hooks/useUser";

import "./css/signup_style.css";


const Signup = (props) => {
  const [user, setUser] = useUser();
  const [state, setState] = useState({ errorMsg: "" }); //setState({errorMsg: ""})

  const signup = async (e) => {
    // prevent default form action from being carried out*/
    e.preventDefault();

    const userIn = document.querySelector("#user");
    const passwordIn = document.querySelector("#passwordone");
    const passwordCopy = document.querySelector("#passwordtwo");

    console.log(passwordIn.value);
    console.log(passwordCopy.value);

    if (
      userIn.value === "" ||
      passwordIn.value === "" ||
      passwordCopy.value === ""
    ) {
      console.log("Passwordsblank.");
      return false;
    } else if (!(passwordIn.value === passwordCopy.value)) {
      setState({ errorMsg: "Passwords do not match." });
      console.log("Passwords do not match.");
      return false;
    }

    let json = {
      username: userIn.value,
      password: passwordIn.value,
    };

    let body = JSON.stringify(json);

    const res = await fetch("/signup", {
      method: "POST",
      body: body,
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 400) {
      setState({ errorMsg: "Someone has already taken that username" });
      return;
    }

    const userInfo = await res.json();
    console.log(userInfo);
    setUser(userInfo);
  };

  if (user === "loading") return <div>Loading</div>;
  if (!user) {
    return (
      <div id = 'signupPage'>
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

          <form onsubmit="return false">
            <h1>Sign Up</h1>
            <p id="Error message">{state.errorMsg}</p>
            <input type="text" id="user" placeholder="username" />
            <input type="password" id="passwordone" placeholder="password" />
            <input
              type="password"
              id="passwordtwo"
              placeholder="repeat password"
            />
            <div class = 'buttonHolder'>
              <button class="staticButtons" id="signup" onClick={signup}>
                Sign Up
              </button>
            </div>
            
          </form>
      </div>
    );
  } else return <Redirect to="/" />;
};

export default Signup;
