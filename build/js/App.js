import React from "../_snowpack/pkg/react.js";
import Sidebar from "./Sidebar.js";
import Calendar from "./Calendar.js";
import "../css/App.css.proxy.js";
import databaseUtils from "./databaseUtils.js";
import {GLOBAL_VARIABLES} from "./globals.js";
class App extends React.Component {
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: "App"
    }, /* @__PURE__ */ React.createElement(Sidebar, null), /* @__PURE__ */ React.createElement(Calendar, null));
  }
}
databaseUtils.getUserID().then((userID) => console.log(userID));
databaseUtils.getAllCalendars().then((userID) => console.log(userID));
export default App;
