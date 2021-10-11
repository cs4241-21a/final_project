CS 4241 Group 12 Final Project: FoldCal
Authors: Taylor Cox, Geoffrey Garsson, Garrett Sheehan
Project Link: https://final-project-group-12.glitch.me/

Our group created a calendar application displaying both events and tasks the user can use to keep track of what they need to do. A key feature of our calendars is being able to nest them, allowing for easier compartmentalization of events and the ability to avoid clutter that can plague particularly busy calendars. For example, if you have a classes calendar, you can put in calendars for each of your classes. If you make an event for one of the individual classes, it will show up in that individual class calendar alongside the general classes calendar. Likewise, events created in a parent calendar will not be shown to its children. All calendars and tasks are displayed in the left sidebar of the application.

Our project uses Github Authentication, requiring one to utilize their github account to use the calendar.

We used numerous technologies to enhance our calendar application. First up is React, which was used to create an object-oriented frontend for our project, which included our calendar, the weeks and days within our calendar, and a sidebar that allows the user to view their calendars and tasks. Our React hierarchy is rather complex, with days being deeply nested inside of calendars. We also used Mongoose alongside MongoDB, allowing us to organize our database functions more efficiently than standard expressJS mongoDB functions. Our login is handled by Github Authentification, allowing each user's calendar information to be tied to their github account.

The main challenge of the project was our scope. FoldCal ended up being wildly out of scope and complex considering the skillset of most of our team, leading to Taylor needing to help Garrett and Geoff a lot with many aspects of implementation. This immense complexity combined with all of us being drowned in work for other classes during the first week and a half of the project's development lead to a rather botched development cycle. Despite having to scale down considerably though, we managed to make a functional prototype of a product that has an interesting niche compared to mainstream calendar applications.

Project Responsibilies:
- Taylor: Github OAuth integration, Database, Add/Modify/Delete Calendar
- Geoff:  Add/Modify Tasks
- Garrett: CSS design, Add/Delete Events

Video Link:
https://youtu.be/sYE92Lx7pRM

