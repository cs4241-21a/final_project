import React from "./_snowpack/pkg/react.js";
import Sidebar from "./Sidebar.js";
import Calendar from "./Calendar.js";
import "./App.css.proxy.js";
class App extends React.Component {
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: "App"
    }, /* @__PURE__ */ React.createElement(Sidebar, null), /* @__PURE__ */ React.createElement(Calendar, null));
  }
}
export default App;
