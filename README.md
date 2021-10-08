# Final Project

## Group 1 | Renee Sawka, Christopher Vieira, Stefano Jordhani, Ashley Burke, Elaine Chen

Link to project:

### 1. Description of Project
For our last assignment of this term, our group worked to create a fully functional web application that enables WPI Computer Science students to easily find partners for projects, studying, and homework. While every class currently uses their own distinct method for grouping students, our Tech Teammate Tagup application encapsulates the functionality for all courses into a single platform that can be embedded into Canvas or whichever education content hosting site a given class uses. Users initially are presented with a login page, where they can login with existing Outlook, GitHub, Google, and Discord accounts. If the student is a newly registered user, one that has not logged into the application before, they will be redirected to a profile page, where they will be asked to fill in some basic information about themself - first name, last name, grade, optional bio, optional phone number, CS courses they have taken, and computer science specific skills they would attribute to themselves. After officially registering their profile with the system, or in instances where the user logging in is not new to the application, users will be redirected to the dashboard. Here users can create posts, view all posts, or delete posts that they created. Post creation requires a user to specify a title, which class it is for (or alternatively if it is for a side research project), which skills it entails/requires, and a short description.

Throughout the application, users can easily navigate between the profile, login, and dashboard page. In order to avoid students perceiving this platform as having to learn how to use yet another web technology, we styled our application in a manner that is reminiscent of WPI pages. The familiarity of the color palette and font selection will further cement our application as one that could be conveniently incorporated with existing course infrastructure. With our implementation we took the creative liberty of looking into new HTML features, such as an animated kebab menu and a filtering menu, in order to make our user interface more similar in capability and design to applications they have experience using. We also implemented more React for our frontend, supporting a more organized website with more dynamic features.

### 2. Additional Instructions
In order to utilize this web application, users must have a preexisting account registered with Microsoft Outlook, Google, GitHub, and/or Discord. Users should note that if they were to login with Outlook, logout, then login again with GitHub, these would be treated as separately registered accounts and the profile and post information will not transfer over.

### 3. Technologies
- Throughout the development process we utilized Visual Studio Code to build our implementation and used a GitHub repository to facilitate collaboration and version tracking.
- We hosted our web application on the Glitch platform.
- For our web app we implemented the MERN stack
  - We used MongoDB in order to manage all of our collections of data
  - The profile collection keeps track of all of the application’s users, holding information related to an individual such as their bio, first and last name, grade, phone number, and a unique ID that is generated and linked with their profile.
  - The post collection keeps track of all of the application’s posts, holding information related to an individual post such as the content, header, date of posting, which user it was posted by, and which class the post was created for.
  - The skill collection holds all of the computer science skills, categorized by programming skills and languages, that various features of the web application need access to.
  - The post skill collection keeps track of all of the different skills that are relevant to a given post.
  - The student skill relation collection keeps track of all the different skills that a given user chooses to attribute to themself.
  - The class collection keeps track of all of the different CS courses offered at WPI.
  - The student class relation collection keeps track of all the different classes that a given user has taken.
  - The admin collection keeps track of profile IDs for users that have administrative access, which corresponds to the ability to delete any post in the dashboard, not just ones they created.
- We used the ExpressJS framework to organize our application’s routing
- For our dashboard of posts we used ReactJS to create dynamic custom components for the user interface.
- We used Javascript as our client-side scripting language.
- We used the NodeJS framework to control all server side communication and computation and handle OAuth authentication.
- We took advantage of predefined CSS frameworks and libraries and used Material Design as our starting template. We then added our own custom styling for certain elements and ensured that our web application maintained a consistent aesthetic throughout page navigation.
- We used PassportJS, an authentication middleware for NodeJS in order to allow users to securely login with Microsoft Outlook, GitHub, Google, or Discord.

While implementing these technologies relied on and built off past experiences with assignments A1-A4, it was a challenging task to implement on a wider scale.

In order to accurately represent our data, we created a relational model to use in Mongodb. Initially this was done to ensure we could accurately and efficiently store our data without having any redundancy. To do this, we created an ERD and relational schema (shown below). 

While familiarity with relational models assisted in structuring data, the model was very complex in nature and led to several conflicts down the line as Mongodb does not support relational models, especially for joining data. There are several queries, such as the joins to connect profiles to posts that require these joinings of tables to get all of the necessary data. Though the model used for storing data does accomplish what we intended, it does lead to more work on the server side to maintain its structure and highlights one of the lengths we went to in order for our application to be realized as intended.

<img width="913" alt="Screen Shot 2021-10-08 at 10 46 22 AM" src="https://user-images.githubusercontent.com/64321589/136577297-6edb1de4-cbe2-4922-b1ee-9fb3a8882647.png">

#### Relational Schema
- PostStudentRelation(_id, postCommentID PK FK, studentProfileID PK FK)StudentProfile(_id, profileID PK, linkToProfilePic, bio, firstName, lastName, grade, phoneNum)
- Admin(_id, profileID PK FK)
- Skills(_id, skillName PK, skillTopic)
- Class(_id, coursNumber PK, courseDepartment PK)
- Post(_id PK, PostCommentHeader FK, forClass FK)
- PostComment(_id PK, bodyContent, header, date, postedByProfileID FK, postID FK)

- StudentSkillRelation(_id, studentProfileID PK FK, skillName PK FK)
- StudentClassRelation(_id, studentProfileID PK FK, classCourseNumber PK FK, classDepartment PK FK)
- PostSkillRelation(_id, postID PK FK, skillName PK FK)






