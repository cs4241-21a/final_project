import React from "react";
import ReactDOM from "react-dom";
import PendingEventList from "../PendingEventList";

var pendEventList = document.getElementById("pendEventList");
ReactDOM.render(<PendingEventList/>, pendEventList);