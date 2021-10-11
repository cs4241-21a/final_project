# Team 16 - *Bopify*
https://bopify.herokuapp.com/

#### Video Demo
https://youtu.be/aJn2yH5KZq8

### Team Members
* Nathan Klingensmith
* Bryan Lima
* Ashwin Pai
* River Yan

## Description
Bopify is an app for generating party playlists through Spotify. 
Users are able to choose from four genres and generate a custom playlist from popular song recommendations within the genre.
These songs are compiled into a public Spotify playlist that the user can access. Directly through Bopify, the user can listen to the songs, delete the songs they don't like, and open the playlist in Spotify to easily copy over to their own account.
The user can also reshuffle playlists to generate new song recommendations.

The app's front end is built using React with JSX for structure and functionality, and Sass for styles.
The client is integrated with the Spotify Web Playback SDK in order to turn the browser into a Spotify audio device.
The back-end consists of an Express Node.js server that integrates with both the public and private Spotify APIs for data retrieval and creation.
To circumvent requiring user authentication, all requests are channeled through Nathan's own premium Spotify account credentials.

## Instructions
* Select a genre to generate a playlist
* Hover over songs to expose their options
  * Click the `X` button to remove a song from the playlist
  * Click the `▶`/`⏸` buttons to play/pause a song
* Click the `View on Spotify` button to open the playlist with Spotify
* Click the `Reroll Playlist` button to generate a new playlist

## Technologies
* `React.js` React was used as our front-end framework to build a single-page web app with more complex functionality. An internal router is used to navigate between the genre selection page and the playlist page. 
* `Sass` Sass was implemented as our CSS pre-processor to improve style sheeting. This allowed for an easier time in creating standardized styles though variables and mixins. It also made it easier to create hierarchical styles based on the Block-Element-Modifier naming convention.
* `Node.js` Node was used for our back-end framework to create a decently complex Express server. This server is responsible for serving the React build files, communicating with the Spotify API, and enabling dev functions such as generating Spotify refresh tokens.
* `Spotify API` The Spotify API was used to build the core functionality of this app. Public API endpoints were used to generate song recommendations and retrieve available genres. Private API endpoints were used to create and modify playlists and play songs through the browser. Authentication for these resources required both client/secret credentials through the Spotify developer console and personal credentials using a continuation token.
* `Spotify Web Playback SDK` The Spotify Web Playback SDK was used to enable playing Spotify tracks directly in the browser. This SDK was used to create an audio device that could be hooked into by a Spotify account and controlled via API calls.
* `Figma` Figma was used as our prototyping software to create user interface mockups of the app before creating them with React. This allowed us to be more efficient when designing how we wanted the app to function, before building actually building it.

## Challenges
### 1. Spotify API Authentication
Authentication with the Spotify API was particularly tough, because Spotify only allows pre-authorized users to authenticate with an unpublished application.
This meant we had to find another way to access private Spotify API calls without requiring the user to authenticate.
We were able to achieve this by generating a refresh token for Nathan's own Spotify account to generate new access tokens for him indefinitely.
This allowed us to create public playlists on his account that could be used to share with other users. It also enabled playing music
through the browser by authenticating the Spotify Web Playback SDK.

### 2. Spotify Web Playback SDK
Getting the Spotify Web Playback SDK integrated into the React app turned out to be harder than expected.
In order to load the import script correctly, a package was used to spawn the script within the playlist page.
This allowed us to create a Spotify audio device only once the user created a playlist to use it with.
After that, we had to create an API endpoint for trigger specific songs on that newly generated audio device. 

### 3. React Hooks
Another challenge was building a React app that was properly structured to support reactive updates.
React.js updates a component whenever it detects changes inside its `props` or `state` variables. This
means tracking variable changes that are disjunct from the component can be very difficult. This became particularly a challenge
when integrating the Spotify Web Playback SDK. In order for each song to have its own play/pause button that changed
based on whether the song was playing, handlers had to get passed between the playlist page and song components to ensure `state` variables could
be updated accordingly.

### 4. Heroku Deployment
Deploying the React app and Node server was also not an easy feat. This is because normally, a React app and Node server deploy to their own respective ports, but on Heroku, only one port can be used to serve the app. In order to get this to work, a specific build script was written to automatically build the React client with all installed dependencies when first deploying to Heroku.
We were then able to point the Node server at these build files in order to serve the website. 

## Team Contributions
### Nathan Klingensmith
* Built core React app with JSX and SCSS
* Integrated Spotify Web Playback SDK into React app
* Authenticated Spotify SDK and API with client/secret credentials and an OAuth token
* Integrated API endpoints into React app

### Bryan Lima
* Built reroll playlist functionality
* Integrated API endpoints into React app
* Attempted to figure out Authentication with the Spotify API, so anybody could long into their personal account

### Ashwin Pai
* Worked on generating a playlist of suggested songs based on favorite artists
* Integrated the /recommendations endpoint for generating a playlist
* Worked on adding songs to a specific playlist

### River Yan
* Developed function for generating popular songs from a given genre
* Helped with generating recommendations for the user 
* Created API endpoints

## Design Achievements
* **Figma Designs**: Designed app interfaces with Figma before development.
  - Before creating the React app, Figma was used to mock up our designs for how we wanted the website to look. By doing this, were able to focus on making a user-friendly application with an accessible design.
  - Bopify Home Page Mockup: https://gyazo.com/f47dce95bf54a61c022c113cc53be8c1
  - Bopify Playlist Page Mockup: https://gyazo.com/f62a9b8248ec3217005b9523df219e33

## Technical Achievements
* **Spotify API**: Authenticated against and integrated with the Spotify API.
    - The Spotify API was used to give our app useful functionality by connecting with a real-world application.
    - Our `SpotifyService.js` file authenticates with Spotify using two different methods, accesses multiple endpoints for public data retrieval, and utilizes even more endpoints for data creation and manipulation.
- **Spotify Web Playback SDK**: Integrated with the Spotify Web Playback SDK to create an in-browser audio player.
  - By adding the Spotify Web Playback SDK, authenticating it using an OAuth refresh token, and connecting it with an API call to play songs, we were able to create a standalone Spotify web player directly in our app.
  - Although this currently in only works for one user, it shows that if we did publish this app with Spotify, any user could be enabled to log in, create playlists on their own account, and listen to them through Bopify.
