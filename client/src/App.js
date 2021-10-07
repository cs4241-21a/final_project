import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    /*
    this.callBackendAPI()
        .then(res => this.setState({ data: res.express }))
        .catch(err => console.log(err));
    */
  }
  /*
  // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/api');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };
     */

  render() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/">
                    <HomePage />
                </Route>
            </Switch>
            <Footer />
        </Router>
    );
  }
}

export default App;
