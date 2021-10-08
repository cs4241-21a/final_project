import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PlaylistPage from "./pages/PlaylistPage/PlaylistPage";

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
            <div className="page">
                <Switch>
                    <Route path="/playlist/:genre">
                        <PlaylistPage />
                    </Route>
                    <Route path="/">
                        <HomePage />
                    </Route>
                </Switch>
            </div>
            <Footer />
        </Router>
    );
  }
}

export default App;
