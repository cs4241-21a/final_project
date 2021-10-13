import React from "react";
import ReactDOM from "react-dom";
import LeaderboardApp from "./LeaderboardApp";
import "../css/style.css";

var mountNode = document.getElementById("leaderboardapp");
ReactDOM.render(<LeaderboardApp />, mountNode);