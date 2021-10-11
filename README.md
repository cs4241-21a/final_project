# Group 13 Anime Watch List

# Team Members:
- Qingbei Shang
- Maxine Shi
- Yonghua Wang
- Yang Lyu
- Jingyu Xie

Link to the project: Glitch, Heroku

# General Description

As we were brainstorming ideas for the final project, we realized we all share a love for anime. It led us into creating a website for anime-viewers to create and share their own anime lists. This is especially convenient for those times when someone complains about having nothing to watch. In this scenario, the user can log into the website and share their anime list with their friends instead of struggling to remember what they have watched before. 

The website allows users to log in with username/password or through Github authentication. In the homepage, users can edit their password; also, there is a data visualization graph(Radar Chart) that is generated based on the users’ preferred genres. This is convenient for when the user wants to know what they are into; they can do so at a glance. For the watchlist, the user can add, edit, and remove reviews for individual anime they have added. The watchlist will categorize the added anime to the corresponding anime list. There are five categories: adventure, love, suspense, slice of life, and fantasy. In addition, we implemented an anime search engine API from [Trace.moe API] (https://soruly.github.io/trace.moe-api/#/) in the search page, which allows the user to search for unknown animes based on screenshots. For the About Us page, we have listed the name of the team members who contributed to this project. Moreover, the user can use the CONTACT US button to send emails to us and receive a copy of the email immediately.

# Additional Instruction
Login with github or register with your own account
The rest should be self-evident


# Outline of Technologies Used
- During the entire development process, we utilized Github to collaborate with each other. 
- We implemented OAuth to provide Github Authentication to strengthen user account safety. 
- MongoDB is the primary database used to store user account information in addition to watchlist and review data. 
- Password in database is encrypted with bcrypt
- In terms of frameworks, we utilized VueJS and VuetifyJS for the visual aspect of the website, while using ExpressJS to route the different functions. 
- Additionally, we used Vue to create dynamic navigation bars that are simple and elegant to use. 
- PassportJS was used to allow Github Authentication for easy login and extra security. 
- We also utilized Trace.moe API, an anime search engine, to allow photo identification of different anime. 


# Challenges We Met
- Initially, we struggled to create a base for people to work on. The base would work on one’s local, but will not once someone else pulls the commit. 
  - As we later found out, gitignore should not be ignored. 
- Creating an organized work schedule was especially difficult as many of us were also in a hectic final week. 
  - This was remedied by regular communication and consistent meetings. 
  - It also forced us to pay extra attention to how we approach branch management via Github. 
- Expectation vs Reality
  - We wanted to implement a lot more functions in a much more detailed manner. While we were not able to 100 percent replicate our brainstorm, we managed to squeeze in all base functions we envisioned. 

# Group Member Responsibility
- Qingbei Shang: Watchlist page on add, remove, and modify, mongoDB watchlist model, basic framework
- Maxine Shi: Watchlist page on add, remove and website icon, embellishments to the website
- Yonghua Wang: Framework, github authentication, mongoDB user models, search page
- Yang Lyu: About Us, Contact US, embellish the CSS file
- Jingyu Xie: Homepage, attribute generator and pie chart, embellish the watchlist with pop up window, css, some user experience edition (eg. alerting)

# Project Showcase Link
