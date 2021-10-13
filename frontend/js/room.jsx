import React from "react";
import ReactDOM from "react-dom";
import RoomApp from "./RoomApp";
import "../css/style.css";

var mountNode = document.getElementById("roomapp");
ReactDOM.render(<RoomApp />, mountNode);