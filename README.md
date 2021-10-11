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
View the images here in google docs - https://docs.google.com/document/d/1bMv7plXMPmSIIITZAykPUUnefPlw9rqQ6PdeSVBhUtg/edit?usp=sharing 

We created a website where you can create wish lists for items you wish to buy in the future. The user can create different lists with different purposes (ex: one for clothes, one for shoes, etc). The user can add as many items to each list as wanted. 

https://final-project-wishlist.herokuapp.com/ (sometimes the link doesn't work, let us know if it doesn't, please reach out to us via email or discord and we will redeploy it)

To use the page: first, the user starts at a page where they can either log in or register an account. To register an account, you need to input a username and password (Image 1). The same information is then needed when you login after registering (Image 2). After logging in, the user is taken to the homepage. The homepage lists all of the current wish lists that the user has created(Image 3). There is also a button for the user to create a new list. When clicked, it takes you to a new page. It asks for a name for the new list, as well as a description of the list (Image 4). Then, once the information for the new list is submitted, you can head back to the home page by clicking the logo. Now, you can view all of the lists associated with your account (Image 5). If you click on one of them, you can see all of the items that have been added to the list. The page also includes a button to add a new item to the list. Once you click the add item button, it takes you to a new page. You must input the name of the item, where it is from, the link to the item, the price, and a picture of the item. Then, you return to the list page and see all of the items. 

Image 1: Registering a New User 

Image 2: Login Page

Image 3: Home Page for New User

Image 4: Adding a New List

Image 5: New List Added to Home Page

The only tip we have for our project is when you upload an item, make sure you have a picture downloaded - and it should be in a PNG format! Otherwise, you can just register yourself as a new user to log in and have fun! 

We used an array of different technologies, middlewares and templating tools for our project. First of all, we used Handlebars to template and generate our HTML files. These .hbs files were stylized and templated with Bootstrap by using different components (e.x Jumbotron, cards, header, forms, and different form input types). The middleware packages used in this project were the following:
All post and get requests were done through app.get() and app.post() for easier routing
app.use(express.json()) to automatically convert incoming requests into json.
app.engine to enable handlebars
app.set to set my handlebars
app.use(express.static("public")) allows access to the rest of my files in public
Used bcrypt to hash and dehash user passwords
Our project’s database is set based on MySQL. We tried to use WPI’s SQL server, but this server would not allow us to deploy in Heroku. Therefore, we created a new database with the ClearDB MySQL add-on that Heroku provides. That way, once we modified our code to handle this new database, the deployment was successful. 

With our project, we definitely faced a couple challenges. To start off, we had a few issues with the database, as well as learning the hard lesson that the WPI database only works when you are on campus using campus wifi. However, as mentioned before, the WPI SQL database stopped working for us anyway, so we created our own  using ClearDB MySQL (which now works! yay). We also had a tough time working to get SELECT to send information from the database to javascript as well. The three members of our group are pretty new to Node.js, express, Bootstrap, and request/response methods. Some implementations and errors took more than others due to our novice experience with these technologies. 

Carlos Velasquez - Carlos made the register user and log in pages and functionality, as well as hooked them up to the database. He templated the HTML files with Bootstrap, that would give them a cleaner look. He also deployed the app and database to Heroku.
Lauren Wasserman - Lauren, created an ERD and schema for the diagram, and set up the database and MySQL tables. She also handled the sql insert statements for adding lists and items to the database. The user can do this by accessing the addList and addItem pages, which she made. She has done a lot of the connecting of the front end to the server end, by implementing the GET/POST functions on the server side and in the js files for each html page that allow for the functionality of our page and handle the data that the user is storing, or has previously stored. Part of this involved making sure that the home screen displayed the correct lists created by the currentUser. She also worked on keeping track of the currentUser.
Kate Sincaglia - Kate came up with the overall theme for the site. This includes the font used, the color scheme, and the main design choices found all over the site (including creating the website logo). She also worked with the team to create the primary sketches of the site, as well as listing what needed to be included in each page (data and user input wise). She also did most of the writing. 

