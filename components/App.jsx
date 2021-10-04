import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import NavigationBar from "./NavigationBar";

const App = (props) => {
  return (
    <div>
        <NavigationBar></NavigationBar>

      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={Login}></Route>
      </Switch>

      <footer>Fortnite balls</footer>
    </div>
  );
};

export default App;
