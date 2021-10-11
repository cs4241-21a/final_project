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
                <div class="col-sm-5 m-4 p-3">
                    <h2>My Events</h2>
                    <hr/>
                    <OwnedEventList/>
                </div>

                {/* Force next columns to break to new line */}
                <div class="w-100"></div>

                <div class="col-sm-5 m-4 p-3">
                    <h2>Pending Event Invites:</h2>
                    <hr/>
                    <PendingEventsList/>
                </div>
            </>
        )
    }
}

export default EventsApp;