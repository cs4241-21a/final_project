
import React from "react";
import Dashboard from "./Dashbord";
import Navbar from "./Navbar";

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
    <>
      <Navbar />
      <Dashboard />
    </>
    );
  }
}

export default App;
