# Final Project Proposal - Meeting Scheduler

## Group 7 Team Members

- Aidan Pecorale
- Ben Staw
- Josh McKeen
- Matthew Spofford

## Outline

The goal of this application is to create a meeting scheduler to assess availability and create meetings easily. Users will create accounts where they will be able to create events and share those events with other individuals. Users fill out availability on a shared event calendar. Event creators will be able to set specific meeting times and send invites (.ics) to all attendees. Later implementations may allow users to create personal calendars and potentially utilize those times to auto-populate event availability when invited. 

## Technologies

- React
- Calendar WebComponents (still looking)
- NodeJS
- Express
- Passport.JS
- MongoDB (potentially with Mongoose)

## Workflow

1. User A can create a schedule(s) under their account
    1. Creating a new schedule
        1. Can keep track of individual days
    2. Duplicate existing schedules if desired
    3. Potential connection to Google Calendar API?
2. User B can create a new event
    1. Maximum time frame for an event is a week (to make things easy)
3. User B attaches one of their schedules to the event
4. This event can be shared with User A
    1. This could be done through a public link
    2. Or shared directly with the user through some sort of portal?
5. User A attaches one of their schedules to the event
6. The event will now display any time conflicts, or optimal times, similar to when2meet
7. User A (the owner of the event) can then choose the finalized time for the meeting
    1. Could create a .ics file for this event as well
