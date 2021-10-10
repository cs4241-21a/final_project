# Music Library

For our final project we created a music library. This web app allows users to add songs to the music library as well as comment on songs already added to their. Users are able to see the music library dashboard without an account, but they need an account to access any other functionallity of the web app. To create an account they just need to click the login button and then click sign up. Here they will set their username, display name, and password.

Once their account is created, they will be prompted to log in with those credentials and then they will be able to access the full functionallity of the web app. When a user is signed in they can access their user dashboard (My Songs). Here they can add songs not already included in the music library. The user can also remove any song they add to the library. Last but not least, the user can make comments on any song in the music library from the main dashboard (the home screen). Every user can see the comments of other users and when they where posted.

Here is the link to our project:
https://final-project-group-23.herokuapp.com/

No additional information is required to run our project. Just make sure to go to the sign up page (link in log in page) to make your own account so you can access the full functionality of the app.

The technologies we used were React, Express, MongoDB, Passport.JS, bcrypt, HTML, CSS, JS, EJS, and Shazam's API (RapidAPI). We used React, EJS, HTML, CSS, and JS to set up and style our frontend. We used MongoDB for storing user and music data in a NoSQL database. We used Express for our server as well as making API requests and keeping setting up a user session. We used Passport.JS to authenticate users on login and serializing usernames. We used bcrypt for encrypting users' passwords. We used Shazam's API to get data related to the song the user added to the library (title, artists, cover art).

We didn't face to many challenges when completing this project. One challenge was that we couldn't get an error message to display when the user put in the wrong username or password. We also had to learn how to use Shazam's API and properly filter the data we got from it. The other notbale challenge was the creation and updating of the dashboards (both main and user) with the proper song data.

We all worked together to come up with the design for the web app.

Ben and Bill worked on the dashboards pages (main and user), adding/deleting songs on the user dashboard, keeping them updated properly, and getting song data through Shazam's API.

Ke worked on setting up the login/sign up pages, authenticating the user, adding them to the database, and setting up most of the checks on user input for login/sign up.

Evan worked on ensuring that there were no duplicate songs in the database as well as adding a timestamp to the comments posted by users. He also helped Ke a bit with polishing the login/sign up pages and wrote this README file.

Link to video: Currently in project repo