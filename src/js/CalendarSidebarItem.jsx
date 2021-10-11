import React from 'react';
import Popup from 'reactjs-popup';
import Collapsible from 'react-collapsible';

function CalendarSidebarItem(props) {
    let children = [];
    if(props.calendars[props.calendarId].children.length !== 0) {
      props.calendars[props.calendarId].children.forEach(child => {
        children.push(<CalendarSidebarItem calendars={props.calendars}
                                           calendarId={child}
                                           style={{'padding-left': '10px'}}
                                           delete={props.delete}
                                           modify={props.modify}
                                           handleChange={props.handleChange}
                                           customOnClick={props.customOnClick}
                                           addChild={props.addChild}/>)});
    }
  
    return (
      <div>
        <Collapsible trigger={<p style={{'margin-bottom': '0'}}>{props.calendars[props.calendarId].name}</p>} 
                     style={props.style} 
                     onOpening={() => props.customOnClick(props.calendarId)}
                     onClosing={() => props.customOnClick(props.calendarId)}>
            
          <Popup trigger={<button><i class="fas fa-plus"></i></button>} position="right center">
              {close => (
                <div classname="calendarSubmit">
                  <form>
                    <label htmlFor="name">New Calendar</label>
                    <input type='text' 
                           name='name'
                           placeholder="Calendar Name" 
                           onChange={props.handleChange}
                           required/>
                    <br />
                    <input type="color" name="color" onChange={props.handleChange} />
                    <button onClick={(e) => props.addChild(e, props.calendarId)}>Create Calendar</button>
                  </form>
                </div>
              )}
            </Popup>
          <button onClick={() => props.delete(props.calendarId)}><i class="far fa-trash-alt"></i></button>

          {children}
        </Collapsible>
      </div>
    );
}

export default CalendarSidebarItem;