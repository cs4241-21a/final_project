import React from "react";
import ReactDOM from "react-dom";
import GameApp from "./GameApp";
import "../css/style.css";

var mountNode = document.getElementById("gameapp");
ReactDOM.render(<GameApp />, mountNode);