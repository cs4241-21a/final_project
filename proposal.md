 ## CS4241 Final Project - Proposal
Group 5: Paloma González Gálvez, Mark Forte, Ryan Stebe, Matt Johannesen

### Concept
A two-player implementation of the board game [Quoridor](https://en.wikipedia.org/wiki/Quoridor), played using two clients connected to a game server.

Quoridor is a relatively straightforward game, in which players move their pawn across a 9x9 board while hindering their opponent's progress by placing walls.  Aside from the game logic and interface, the major technical challenge of this project will be having the server accept and validate requests from more than one client, in a way that minimizes the chance of one client breaking the game.
    
### Libraries
-  Node.js
-  Express
-  p5.js - Board visuals
-  [Pathfinding](https://www.npmjs.com/package/pathfinding) (npm package) - Used by server to verify whether a player has a valid winning path (required by one of the game rules) 
-   Middleware to track which client is sending info
	-   Thinking of doing this with cookies
-   Middleware for tracking timeouts
-   Socket.IO?
	-   Unsure of this one - seems to be commonly used by browser games for client-server communication