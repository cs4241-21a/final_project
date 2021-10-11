For test push
# Final Project
*Due before the start of class, October 11th (final day of the term)*

For your final project, you'll implement a web application that exhibits understanding of the course materials. 
This project should provide an opportunity to both be creative and to pursue individual research and learning goals.

## General description
Your project should consist of a complete Web application, exhibiting facets of the three main sections of the course material:

- Static Web page content and design. You should have a project that is accessible, easily navigable, and features significant content.
- Dynamic behavior implemented with JavaScript (TypeScript is also allowed if your group wants to explore it).
- Server-side programming *using Node.js*. Typically this will take the form of some sort of persistent data (database), authentication, and possibly server-side computation. 
- A video (less than five minutes) where each group member explains some aspect of the project. An easy way to produce this video is for you all the groups members to join a Zoom call that is recorded; each member can share their screen when they discuss the project or one member can "drive" the interface while other members narrate (this second option will probably work better.) The video should be posted on YouTube or some other accessible video hosting service. Make sure your video is less than five minutes, but long enough to successfully  explain your project and show it in action. There is no minimum video length.

## Project ideation
Excellent projects typically serve someone/some group; for this assignment you need to define your users and stakeholders. I encourage you to identify projects that will have impact, either artistically, politically, or in terms of productivity. 

## Logistics
### Team size
Students are will work in teams of 3-5 students for the project; teams of two can be approved with the permission of the instructor. Working in teams should help enable you to build a good project in a limited amount of time.  Use the `#project-logistics` channel in Discord to pitch ideas for final projects and/or find fellow team members as needed.

Teams must be in place by end of day on Saturday, September 25th. If you have not identified a team at this point, you will be assigned a team. You will be given some class time on Monday to work on your proposal, but please plan on reserving additional time as needed.

### Deliverables

__Proposal:__ 
Provide an outline of your project direction and the names of associated team members. 
The outline should have enough detail so that staff can determine if it meets the minimum expectations, or if it goes too far to be reasonable by the deadline. Please include a general description of a project, and list of key technologies/libraries you plan on using (e.g. React, Three.js, Svelte, TypeScript etc.). Name the file proposal.md and submit a pull request.
Submit a PR to turn it in by Monday, September 27th at11:59 PM. Only one pull request is required per team.

There are no other scheduled checkpoints for your project. 

#### Turning in Your Outline / Project
Submit a second PR on the final project repo to turn in your app and code. Again, only one pull request per team.

Deploy your app, in the form of a webpage, to Glitch/Heroku/Digital Ocean or some other service; it is critical that the application functions correctly wherever you post it.

The README for your second pull request doesn’t need to be a formal report, but it should contain:

1. Our group created a calendar application displaying both events and tasks the user can use to keep track of what they need to do. A key feature of our calendars is being able to nest them, allowing for easier compartmentalization of events and the ability to avoid clutter that can plague particularly busy calendars. For example, if you have a classes calendar, you can put in calendars for each of your classes. If you make an event for one of the individual classes, it will show up in that individual class calendar alongside the general classes calendar. Likewise, events created in a parent calendar will not be shown to its children. All calendars and tasks are displayed in the left sidebar of the application.
2. Project uses Github Authentication, requiring one to use their github account to use the calendar.
3. We used React to create an object-oriented frontend for our project, which included our calendar, the weeks and days within our calendar, and a sidebar that allows the user to view their calendars and tasks. Our React hierarchy is rather complex, with days being deeply nested inside of calendars. We also used Mongoose alongside MongoDB, allowing us to organize our database functions more efficiently than standard expressJS mongoDB functions. Our login is handled by Github Authentification, allowing each user's calendar information to be tied to their github account.
4. The project ended up being wildly out of scope and complex considering the skillset of most of our team, leading to Taylor needing to help Garrett and Geoff a lot with many aspects of implementation. This immense complexity combined with all of us being drowned in work for other classes during the first week and a half of the project's development lead to a rather botched development cycle. Despite having to scale down considerably though, we managed to make a functional prototype of a product that has an interesting niche compared to mainstream calendar applications.
5.Responsibilies:
- Taylor: Github OAuth integration, Database, Add/Modify/Delete Calendar
- Geoff:  Add/Modify Tasks
- Garrett: CSS design, Add/Delete Events
6. https://youtu.be/sYE92Lx7pRM

Think of 1,3, and 4 in particular in a similar vein to the design / tech achievements for A1—A4… make a case for why what you did was challenging and why your implementation deserves a grade of 100%.

