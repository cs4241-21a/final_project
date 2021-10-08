import React from 'react';
import Sidebar from './Sidebar';
import Calendar from './Calendar';
import '../css/App.css';
import databaseUtils from './databaseUtils';
import {GLOBAL_VARIABLES} from './globals';

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

databaseUtils.getUserID()
.then(userID => console.log(userID));

databaseUtils.getAllCalendars()
.then(userID => console.log(userID));

export default App;
