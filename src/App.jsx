
import React from "react";
import Dashboard from "./Dashbord";

class App extends React.Component {
  constructor( props ) {
    super(props)
    this.state = {
      musicJson: {}
    }
    this.load()
  }
  load() {
    fetch(`/getMusicData`, {method:'get', 'no-cors':true})
      .then(res => res.json())
      .then(json => {
        this.setState({
          musicJson: json
        })
      }) 
  }

  render() {
    const { musicJson } = this.state;
    return (
      <>
        <Dashboard />
      </>
    );
  }
}

export default App;
