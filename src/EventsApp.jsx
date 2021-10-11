import React from "react";
import OwnedEventList from "./OwnedEventList";
import PendingEventsList from "./PendingEventList"

class EventsApp extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <div>
                    <h2>My Events</h2>
                    <hr/>
                    <OwnedEventList/>
                </div>

                {/* Force next columns to break to new line */}
                <div class="w-100"></div>

                <div>
                    <h2>Event Invites:</h2>
                    <hr/>
                    <PendingEventsList/>
                </div>
            </>
        )
    }
}

export default EventsApp;