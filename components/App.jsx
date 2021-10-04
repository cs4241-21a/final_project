import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

const App = (props) => {
  return (
    <div>
      <header>Navigation Bar</header>

      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/signup" component={Signup}></Route>
      </Switch>

      <footer>Fortnite balls</footer>
    </div>
  );
};

export default App;
