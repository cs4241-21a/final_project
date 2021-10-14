We created an application that allows users to login and register to a website. The user then will be redirected to a welcome page where they can create,delete, and edit tasks and subtasks to track items they need to keep track of in their life.

You can register for an account and the website will automaticlly log you in. Username must be at least 3 charachters long and password must be at leat 6 characters long

Technologies
- cookies: Keep the user logged in after they refresh the page
- mongoDB: Database to store information
- @hapi/joi: login validation
- mongoose: Provides schemas for working with the Database
- Javascript: Code to run commands when users perform actions
- EJS: Helped format HTML and reduce the overall amount of HTML that had to be written
- Water: CSS Framework providing styling for our site
- HTML

What challenges you faced in completing the project.(fixed most rendering bugs)
-Some JS bugs when rendering items on page which we did not have time to identify the cause of and fix
-Making sure subtasks were linked with their parent. Some minor mistakes early on when initially setting up the project caused serious complications for implementing subtasks, as these seemingly innocent decisions made tracking which item we were working on exceedingly difficult.
-Visualization of subtasks. Displaying the subtasks as visually distinct from the main tasks was harder than expected and as a result we did not have time to implement this change
-**When clicking anywhere on a main task, even the Create Subtask button, it will hide/show existing subtasks. Clicking create subtask when there is exactly 1 subtask looks like the one subtask is being replaced. It's not. The one subtask is being hidden while another is being created.**

What each group member was responsible for designing / developing

Orest Ropi
- Login/Registration design and implementation. 
- Main tasks creation, deletion, and editing. (design and implementation)
- CSS style
- Fixed bugs/testing
- Documentation

Keval Ashara
- Intial project setup
- Setup key technologies used in the project
- Helped implement subtasks

Daniel Stusalitus
- Implemented subtasks
- Updated existing code to work with subtasks
- Fixed bugs/testing
- Created database

**Link to Project Video**
https://youtu.be/gQYvom4qQxo
**Link to Glitch Page**
https://group20-final.glitch.me/


**Design Acievements**
Design Achievement 1: 
(5 points) How site use CRAP principles in the Non-Designer's Design Book readings
Which element received the most emphasis (contrast) on each page?

The elements that received the most contrast were my buttons and title. They were what I wanted the user attention to be drawn to. Information about what they could do and how they can do it is the users main priority. I used dark blue for the title and black for the buttons because they contrasted the white background really well. In my log in page I also made the register and login buttons have a colored background. This is so the user can immediately locate them and use them. I had grey boxes in the login page to represent what sections were for login or registering, so the user could more easily differentiate between the two. Lastly I left the background white(on my login page and page with data) so the user would focus more on the application which they would be using, and not getting distracted by unnecessary images or colors.

How did you use proximity to organize the visual information on your page?

I used proximity to organize the visual information on your page by grouping together items that were related to one another. On my login page I had the user login information all together inside a box. This allowed the user to find everything he needed about logging in quickly. I also had the registration information all together inside a box. This allowed the user to find everything he needed about registering quickly. Putting these items in my logging page together also reduced clutter. In my page with the user data I grouped together all the information of a single contact together. In the user data page, I also grouped up the title with the table so the user knows exactly what they can put into the table.

What design elements (colors, fonts, layouts, etc.) did you use repeatedly throughout your site?

I used the design elements of colors, fonts, and layout repeatedly throughout my site. I used colors to show similarities between logging in and registering. They both require a username and password to be inputted so I made their box, text, and background color the same. It also helps distinguish between the two options. This is since both have a similar color scheme and layout it is obvious that they are not interconnected. In my data page I repeatedly use blue color and large font to show important information. The user eventually gets used to the blue color and large font signifying important information that needs to be read. I also use bolded black on all my text in the labels of the tables. From this the user can concur that those are labels and not another data entry.

How did you use alignment to organize information and/or increase contrast for particular elements?

I used alignment to organize information and/or increase contrast for particular elements. For example, in the login page the login button and the header for the login button are both slightly to the left of the center of the screen. This allows the user to organize them together(i.e. they would organize 'Log in here!' and the log in button). Another example, in the login page the register button and the header for the register button are both slightly to the left of the center of the screen. This allows the user to organize them together(i.e. they would organize 'Register in here!' and register the button). I also aligned the buttons and headers towards the center, so they would still be close to the boxes were the user is putting the data. In my user data page all the elements in my table cells are aligned in the center so they are easier to see. This also makes the cells more distinguishable from one another giving an increased contrast between them.

Design Achievement 2:
(5 points per person, with a max of 10 points) Test your user interface with other students in the class. Define a specific task for them to complete (ideally something short that takes <10 minutes), and then use the think-aloud protocol to obtain feedback on your design (talk-aloud is also find). Important considerations when designing your study:

Task: Register for an account, create some tasks, create some subtasks, edit some tasks, edit some subtasks, delete some tasks, and delete some subtasks.

(5 points)Provide the last name of each person you conduct the evaluation with. Ropi (This was my brother, not sure if this is allowed but i dont know anyone else in the class)

What problems did the user have with your design? He said he did not like how the background of the webpage was completely white. He called the login page "boring". Creating a subtasks was weird at first for him, as the create a task button and create a subtask button both used the same input text field.

What comments did they make that surprised you? He said it was really easy to accomplish his task, due to abillity to read the content on the screen very clearly. Font was large and colors were complementary.

What would you change about the interface based on their feedback? I would add something to make the user feel excited about the website at the login page. For example, maybe an animation or a small game that could serve as a "wow factor". I would also make it so that creating a subtask would be done through another input text field or a pop-up.


**Technological Achievements**
Technological Achievement 1: (10 points)
We implemented one of our large stretch goals of creating login/register functionallity. We achieved this using cookies, happi joi, and mogoDB/mangooose.

