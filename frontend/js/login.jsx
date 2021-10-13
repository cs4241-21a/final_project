import React from "react";
import ReactDOM from "react-dom";
import LoginApp from "./LoginApp";
import "../css/style.css";

var mountNode = document.getElementById("loginapp");
ReactDOM.render(<LoginApp />, mountNode);