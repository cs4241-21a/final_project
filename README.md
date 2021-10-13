# CS4241 - Webware Final Project
**Group 11**  
Jack Ayvazian, Jack Campanale, Federico Galbiati, Winnie Ly, Vansh Patel

## Memory Game
**Project:** https://team-11.herokuapp.com/
<br> <br>
**Video:** https://youtu.be/Vy2hAQ_6B7Y

### Description
<p>We created a memory game inspired by Simon, where a user has to repeat a given flashing sequence of four colored tiles (with sound effects). The sequence grows by one and speeds up slighly each round, making it more difficult as the game progresses.</p>

<p>Our landing page first prompts the user to authenticate via Github, and afterwards, they are redirected to the navigation page. From there, the user is shown a menu of four buttons: One to logout to the main screen, one to view the instructions of the game, one to view the leaderbaord which displays the highscores and gamesplayed of each user in the database, and finally one to play the game.</p>

<p>We played close attention to detail in our CSS styling with the four main Simon colors of red, yellow, green, and blue as our theme, with the use of dark gray to give contrast to the surrounding white background. We added shadows and hover effects for the main buttons, as well as custom SVG shapes and animations with Anime.js. The instructions transition from off screen when clicked, and the main navigation buttons seamlessly transition into the game board when clicking play as it redirects to a new page.</p>

### Technologies
#### MERN Stack
* MongoDB  
  * Stores user githubUsername and id 
  * Tracks highscore and games played for each user  
* Express (Server framework for Node.js)
* React
  * Front end follows a functional component structure with use of .jsx
  * App component broken down by page, with subcomponents such as the game tiles
* Node.js (JS runtime environment)

#### Other:
* Passport.js: Authenticates user with GitHub account  
* Anime.js: Library used for custom animations
* Figma: Website used to make custom SVGs used in site

### Challenges

* Creating and debugging the main game logic with React: While React hooks such as useState and useEffect were very useful for developing the game, there were a lot of different changing states to keep track of and modify. As setting state is asynchronous, it was difficult to track the changes in state while line-by-line debugging, since the page is not guaranteed to re-render on the line you expect it to.

### Group Responsibilities
* Jack Ayvazian: Developed the main game logic and React frontend  
* Jack Campanale: User Interface for game with Anime.js styling and animations  
* Federico Galbiati: Implemented Github authentication with Passport.js  
* Winnie Ly: Structured layout of HTML pages and CSS along with displaying Leaderboard data 
* Vansh Patel: Sorted player highscores and CSS layout for button hovers
