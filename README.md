

Deploy your app, in the form of a webpage, to Glitch/Heroku/Digital Ocean or some other service; it is critical that the application functions correctly wherever you post it.

The README for your second pull request doesn’t need to be a formal report, but it should contain:


We created an application that allows users to login and register to a website. The user then will be redirected to a welcome page where they can create,delete, and edit tasks and subtasks.

You can regiister for an account and the website will automaticlly log you in.

Technologies
- cookies
- mongoDB
- @hapi/joi (login validation)
- mangoose
- Javascript
- EJS
- HTML
- CSS

What challenges you faced in completing the project.
-Some JS bugs when rendering
-Making sure subtasks were linked with there parent
-Visualization of subtasks

What each group member was responsible for designing / developing

Orest Ropi
- Login/Registration design and implementation. 
- Main tasks creation, deletion, and editing. (design and implementation)
- Documentation

9. A link to your project video.

**Design Acievements**
Design Achievement 1: (5 points) How site use CRAP principles in the Non-Designer's Design Book readings
Which element received the most emphasis (contrast) on each page?

The elements that received the most contrast were my buttons and title. They were what I wanted the user attention to be drawn to. Information about what they could do and how they can do it is the users main priority. I used dark blue for the title and black for the buttons because they contrasted the white background really well. In my log in page I also made the register and login buttons have a colored background. This is so the user can immediately locate them and use them. I had grey boxes in the login page to represent what sections were for login or registering, so the user could more easily differentiate between the two. Lastly I left the background white(on my login page and page with data) so the user would focus more on the application which they would be using, and not getting distracted by unnecessary images or colors.

How did you use proximity to organize the visual information on your page?

I used proximity to organize the visual information on your page by grouping together items that were related to one another. On my login page I had the user login information all together inside a box. This allowed the user to find everything he needed about logging in quickly. I also had the registration information all together inside a box. This allowed the user to find everything he needed about registering quickly. Putting these items in my logging page together also reduced clutter. In my page with the user data I grouped together all the information of a single contact together. In the user data page, I also grouped up the title with the table so the user knows exactly what they can put into the table, and what might not be allowed(such as duplicate contacts).

What design elements (colors, fonts, layouts, etc.) did you use repeatedly throughout your site?

I used the design elements of colors, fonts, and layout repeatedly throughout my site. I used colors to show similarities between logging in and registering. They both require a username and password to be inputted so I made their box, text, and background color the same. It also helps distinguish between the two options. This is since both have a similar color scheme and layout it is obvious that they are not interconnected. In my data page I repeatedly use blue color and large font to show important information. The user eventually gets used to the blue color and large font signifying important information that needs to be read. I also use bolded black on all my text in the labels of the tables. From this the user can concur that those are labels and not another data entry.

How did you use alignment to organize information and/or increase contrast for particular elements?

I used alignment to organize information and/or increase contrast for particular elements. For example, in the login page the login button and the header for the login button are both slightly to the left of the center of the screen. This allows the user to organize them together(i.e. they would organize 'Log in here!' and the log in button). Another example, in the login page the register button and the header for the register button are both slightly to the left of the center of the screen. This allows the user to organize them together(i.e. they would organize 'Register in here!' and register the button). I also aligned the buttons and headers towards the center, so they would still be close to the boxes were the user is putting the data. In my user data page all the elements in my table cells are aligned in the center so they are easier to see. This also makes the cells more distinguishable from one another giving an increased contrast between them.

**Technological Achievements**
Technological Achievement 1: (10 points)
We implemented one of our large stretch goals of creating login/register functionallity. We achieved this using cookies, happi joi, and mogoDB/mangooose.
