import React from 'react';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <div className='sidebar'>
        <div className='sidebar-calendars'>
          <p>Calendars</p>
        </div>
      </div>
      );
  }
}

export default Sidebar;