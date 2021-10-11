# Final Project - Meeting Scheduler (When3Meet)

## Group 7 Team Members

- Aidan Pecorale
- Ben Staw
- Josh McKeen
- Matthew Spofford


## 1. Overview

Our project, when3meet is a tool to help people plan their schedules, make events, and coordinate those events with other users. On the home page, each user has access to a personal calendar which contains all of their events. Each user also has access to the events they are signed up for and their details in list form as well. From the home page, personal events can be added to a user's private calendar.

On the events page, a user can set up events involving more people. The user will have the option to add attendees to events as well as a range of possible dates and times. Once an event is created the attendees will be able to see it in their events list and update their availability for that event. Availability is initially filled in using your personal calendar but additional edits can be made. As the attendees add their availibility to the event the owner can select a time that everyone is available for on the availability table and confirm the final date and time.  Once confirmed, public events are automatically added to all invited user's personal calendars. When3meet is hosted on https://cs4241-final-project-group-7.herokuapp.com/

## 2.  Site Usage

To use the site, first create an account with a username and password and then sign in. The rest is pretty self explanatory.

## 3. Technologies

- NodeJS = Server backend logic
- EJS = Used for creating simple HTML layouts for all of our webpages, and enabling us to share multiple HTML elements across multiple pages (e.g. header, navbar, and footer).
- React = Used for dynamically rendering the event availability for invited events. It also was used to render the event date/time selection menu. This involved creating a main React app that encapsulated both the event availability component, and the event date/time selection menu.
  - react-schedule-selector = A 3rd party tool used for selecting event availibility and displaying it in colored blocks
- MongoDB/Mongoose = Database used for storing users, personal calendars, and events, Mongoose was used to organize the schema for elements in the database
- CSS Frameworks =
  - Bootstrap = used for some styling of elements
  - Sakura = primary styling used for page elements
- TavoCalendar = Calendar Library used for selecting date ranges on event creation page
- FullCalendarIO = Calendar Library used on home page for sorting and displaying personal calendar events
- ICS = standardized calender event creator to share with other calendar apps


## 4. Challenges
- Primary challenge was working with Date types in Javascript and getting those in the correct format to integrate with the the calendar libraries we were using. Often came accross problems with different timezones or not saving the date type correctly.

## 5. Task breakdown
- Matthew: Focused on get React componets with event availability and time selection working. Fixed general bugs on backend and little CSS styling.
- Aidan: Settup work for database and creating/editing/availability on events. Groundwork for interacting/changing values of events.
- Ben: Worked creating ICS files for the events and large amount of CSS work.
- Josh: Primarily worked on setting up the personal calendar and integrating that with automatically filling availability on the event invite.


## 6. Project video link
https://youtu.be/MgIiy-XE7hI
