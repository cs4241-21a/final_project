Team Name: Bold Buffalos :) 

Group Members: 
- Christopher Vieira 
- Renee Sawka 
- Ashley Burke
- Elaine Chen 
- Stefano Jordhani 

General Project Description: 

  A majority of the courses that we have taken here at WPI have necessitated working in pairs or groups, where the students are usually responsible for team formation and choose their partners based on qualifiers they themselves determine. Many professors elect to adopt Piazza, Slack, Canvas, Discord, and other collaborative platforms to aid students in interacting with their peers as they look to connect with one another for coursework. These services, however, are primarily focused on real-time communication between users in a small number of course-specific threads, inconveniencing students in search of respective group members for different classes that may therefore need to use multiple software platforms or disconnected sections within a singular platform to contact their classmates.
  Our application aims to fill this need, with our project focused on assisting WPI students in finding homework partners, group members, studymates, and more for any of their classes through the use of a singular web application. Users will login using an OAuth supported account - giving them the ability to create a unique profile containing information related to the courses they have taken, skills they have, and areas they are interested in. Following the initial profile set up, students will have the ability to view and create posts searching for connections with fellow classmates. The corresponding information will be organized in a forum-style system where each initial thread post will exist as an entry on a page filled with threads. To see replies to a thread and reply to it, a thread can then be opened to also display any extra information (such as a section of text content) that may have not been displayed on the main forum page. To view the skill sets or information on members involved in the post, users can view other users’ profiles. While viewing the main forum page, users can sort the resulting posts using a variety of methods ranging from the class number, what they are looking for in other students (group mate, homework/study buddy, etc), and by skills the post authors may have. Given the many extra projects WPI students complete in their extra time, this service will also extend to allow additional sections such as personal research projects. To ensure forum pages never get cluttered with irrelevant information, posts will be created with the intent that they will be deleted once students have found their group members. A user will be encouraged to delete posts once they have found the other students they wished to connect with. To ensure this occurs, admin accounts will exist with the power to delete any post at any given time, and we will specify the logistics of how admin accounts will be distinguished with our final submission. 
  As a whole, we hope to create this web application in order to positively impact productivity and student communication at WPI. With the targeted users/stakeholders of this project being WPI students, we as a collective group have vested interest in creating an easily navigable, accessible system that unaffiliated students would be happy to see integrated in their courses and intend to use our combined knowledge of students’ platform preferences to achieve this goal (and avoid bandwagon hate like that of Workday).

Key Technologies/Libraries: 
- Hosting Platform: Glitch/Heroku (will decide as deadline gets closer) 
  - Ideally Heroku is used to prevent the initial time to start the server up for a given user
    - Due to Heroku being difficult to develop in, the group hopes to use glitch and visual studio code to develop the software and then put the software on heroku afterward if there is enough time to do so
- MERN stack 
  - MongoDB 
  - ExpressJS
  - ReactJS
  - NodeJS 
- Using JavaScript over TypeScript for front-end 
- CSS framework/library:
    - Material design as a starting template
    - The website is WPI focused resulting in WPI colors and fonts (copied from their website) being used
      - One group member made a similar theme for a3 at http://a3-christopher-vieira.herokuapp.com/ 
      - Raleway for text, Source Sans Pro for Headings
      - Use of WPI’s red (172, 43, 55), yellow (244, 212, 147), and grey (169, 176, 183) along with white (255, 255, 255) and black (0, 0, 0)
        - This allows us more options as these colors should have been vetted by WPI themselves
- OAuth (different platforms)
  - GitHub 
  - Google 
  - Outlook
  - Potentially others 
  - Will be developed in a manner in which an arbitrary number of OAuth methods can be used

