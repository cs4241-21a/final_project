
import React from "react";

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
        <h1>
          Hello {musicJson}
        </h1>
      </>
    );
  }
}

export default App;
