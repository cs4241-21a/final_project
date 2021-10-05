import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";

const App = (props) => {
  return (
    <div id='appDiv'>
      <header>Navigation Bar</header>

      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={Login}></Route>
      </Switch>

      <footer>Fortnite balls</footer>
    </div>
  );
};

export default App;
