
import React from "react";
import Dashboard from "./Dashbord";
import './styles.css'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
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
