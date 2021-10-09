# Synchronous MS Paint
## 1. A brief description of what you created, and a link to the project itself (two paragraphs of text)
   
    
   Link to project: [mspaint.edit2014.com](mspaint.edit2014.com)

   This project was designed to allow for real-time collaboration on an html canvas. Authenticated users can draw using brush strokes, add hollow or filled shapes, or clear the html canvas. Any changes to the state of the canvas will be mirrored on other authenticated users' pages, and any user that connects to the application will see the current state of the canvas.

   The following sections of this readme will detail different segments of the project's development and how to use our application. This team worked hard to make a functional application that evokes the nostalgia of opening up MSPaint on your parents' computer and drawing with friends. We hope it provides whomever uses it with a similar sense of joy.
   
## 2. Any additional instructions that might be needed to fully use your project (login information etc.)
   
You can make your own login, or use the below test account:
   
   ```
    Username: test
    Password: test
   ```

When you're done, click the X button in the upper-right corner of the app window to log out
   
Share the [link](mspaint.edit2014.com) with another person, or open the link in another browser tab to experience the simultaneous paint experience. 
## 3. An outline of the technologies you used and how you used them.
   
- Websockets
  - Used to handle client <--> server communications, specifically:
    - send drawn elements from client
    - send drawn elements to all other clients
- p5.js
  - Used to handle all drawing aspects of the canvas area
- MongoDB
  - Used to store usernames and passwords
- Express
  - Used to serve all pages
  - Stores the latest canvas file and recently drawn elements
  - Morgan was used to log all connections
  - cookie-session was used for authentication
  - serve-favicon was used to serve the favicon
  - serve-static was used to serve all static files

## 4. What challenges you faced in completing the project.
- Websockets
  - Converting canvas data and drawn elements into JSON-compatible formats for communicating to the server and clients
  - Heroku doesn't support unsecure websockets, so the project is hosted on an Ubuntu server, which doesn't care 
- 

## 5. What each group member was responsible for designing / developing.
Maddison Caten
- Implemented authentication

Lia Davis
- Researched and Implemented Websocket functionality
- Windows 98 Styling

Victoria Grasso
  - Implemented drawing shapes
  - Set up MongoDB

Maylee Gagnon
  - Implemented base drawing functionality
  - Developed methods for sending Real-Time data of drawn elements

Morgan Lee
  - Worked on the basic layout for drawing page
  - Implemented saving image data for load on refresh/new connection
  - Implemented favicon

## 6. A link to your project video.
[https://youtu.be/-fdLgF9Gk18](https://youtu.be/-fdLgF9Gk18)