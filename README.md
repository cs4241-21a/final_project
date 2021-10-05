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

### Deliverables

#### Turning in Your Outline / Project
Submit a second PR on the final project repo to turn in your app and code. Again, only one pull request per team.

Deploy your app, in the form of a webpage, to Glitch/Heroku/Digital Ocean or some other service; it is critical that the application functions correctly wherever you post it.

The README for your second pull request doesn’t need to be a formal report, but it should contain:

1. A brief description of what you created, and a link to the project itself (two paragraphs of text)
2. Any additional instructions that might be needed to fully use your project (login information etc.)
3. An outline of the technologies you used and how you used them.
4. What challenges you faced in completing the project.
5. What each group member was responsible for designing / developing.
6. A link to your project video.

Think of 1,3, and 4 in particular in a similar vein to the design / tech achievements for A1—A4… make a case for why what you did was challenging and why your implementation deserves a grade of 100%.

## Group 19: Ezra W, Lorenzo L, Eva L, Alexis C

# DeAd MeMe HuH?
A meme relevancy tracker to making sure you’re hip with the kids

## Concept:
When a user goes on the site they are shown a picture of a meme template (like Bad Luck Brian or “It’s all __? Always has been”) and examples of the meme. A user needs to vote on whether they believe the meme is dead or not then they will be asked if they think it is funny. Once they have done that, they are shown the overall statistics for how dead the community has voted the meme to be as well as if people think it’s funny. They can then move to the next meme and vote again.

## Views:
Home screen -> 
Button that says show me random meme
Search a meme from database
Meme image view : side next to meme statistics 
Cascading animation for meme’s to appear on screen after hitting yes or no to differentiate how the meme will appear on screen. 
Examples of meme with the template
After you answer the prompt it will show the percentage of yeses vs nos
Stats sidebar that shows the memes in least dead (most relevant) to most dead
After hitting yes or no that question fades out and another (do you think its funny anyway) fades in. after answering that the stats on both questions fades in.



## Functionality:
Google trend widget for meme usage

## Planned Libraries to Use:
MongoDB (https://www.mongodb.com/)
store meme databases, we will need to populate as part of the project.
TailwindCSS (https://tailwindcss.com/)
Slick 
Fully accessible with arrow key navigation, add or remove image slides
Allow users to click through example scenarios the meme is used in
link: https://kenwheeler.github.io/slick/
Chart.js
delightful JavaScript library for designers and developers to add beautiful charts to a site
https://www.chartjs.org/
https://www.npmjs.com/package/emoji-picker-react

