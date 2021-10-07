import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import NavigationBar from "./NavigationBar";
import Signup from "./Signup";
import Workout from "./Workout";

const App = (props) => {
  return (
    <div id="appDiv">
      <NavigationBar />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route path="/workout" component={Workout}></Route>
      </Switch>

      <div id="footerDiv">
        <footer>Fortnite balls</footer>
      </div>
    </div>
  );
};

export default App;
