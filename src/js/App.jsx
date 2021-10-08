import React from 'react';
import Sidebar from './Sidebar';
import Calendar from './Calendar';
import '../css/App.css'


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <Calendar />
      </div>
    );
  }
}

export default App;
