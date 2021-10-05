import React from "react";
import ReactDOM from "react-dom";
import MainRoute from "./routes/MainRoute";

const mountNode = document.getElementById("app");
ReactDOM.render(<MainRoute name="test" />, mountNode);
