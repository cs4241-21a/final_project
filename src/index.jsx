import React from "react";
import ReactDOM from "react-dom";
import MainRoute from "./routes/MainRoute";
import MenuContainer from "./components/MenuContainer";

ReactDOM.render(
    <MenuContainer />,
    document.querySelector("#contentContainer")
);

const mountNode = document.getElementById("app");
ReactDOM.render(<MainRoute name="test" />, mountNode);
