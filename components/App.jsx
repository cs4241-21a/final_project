import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";

const App = (props) => {
  return (
    <div id='appDiv'>
      <div id='headerDiv'>
        <header>Navigation Bar</header>
      </div>
      

      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={Login}></Route>
      </Switch>

      <div id='footerDiv'>
        <footer>Fortnite balls</footer>
      </div>
    </div>
  );
};

export default App;
