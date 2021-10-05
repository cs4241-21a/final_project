import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
<<<<<<< HEAD
import NavigationBar from "./NavigationBar";

const App = (props) => {
  return (
    <div>
        <NavigationBar></NavigationBar>
=======
import Signup from "./Signup";

const App = (props) => {
  return (
    <div id='appDiv'>
      <div id='headerDiv'>
        <header>Navigation Bar</header>
      </div>
      
>>>>>>> origin/user-backend-jack

      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/signup" component={Signup}></Route>
      </Switch>

      <div id='footerDiv'>
        <footer>Fortnite balls</footer>
      </div>
    </div>
  );
};

export default App;
