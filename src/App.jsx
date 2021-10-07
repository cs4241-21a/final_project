import React from 'react';
import Sidebar from './Sidebar';
import Calendar from './Calendar';
import './App.css'


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
