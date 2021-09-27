# Improving WPI's really bad no good laundry status pages
WPI has a serious problem. Say you want to check the status of a laundry room and see how busy it is. More specifically - on your phone. Wait, what's that? Do I hear the sounds of 2000s web design?

Here comes us making the laundry status page much, much better.

# What the project consists of
* A web scraper in Node.JS to get data from LaundryConnect. This sits on a server and runs every 5 minutes. One of our group members wrote a prototype web scraper in Python, so there's some familiarity of the system.
* A Web UI written in React to show the data. This Web UI will show general availability of laundry rooms (% of dryers/washers available), with the option to drill down into individual laundry rooms.
* The Web UI will also have the ability to sign up/log in so users can favorite certain laundry rooms to see on the Web UI.
* A server written in Node.JS

# Technologies we'll use

## MongoDB
MongoDB will be used to store the laundry data & user login data, plus Mongoose for accessing/writing data.

## Express
Express will host the server.

## React
React will be used for the main Web UI.

## Other technologies
* node-web-scraper to do the web scraping
* We'll think of other technologies that we'll use along the way.


