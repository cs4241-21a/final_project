### CS4241 Final Project

Group #: 21
Group Members: Aditya Kumar, Matthew Malone, William White
1. This project is a simple photo editor using Javascript. The user can upload an image, and then manipulate it. The user can crop, rotate, and transform the image. Various filter and color manipulation options are also offered. We created a custom function that allows a user to "Jpegify" an image and introduce artifacts in order to distort it. The website can be found hosted on glitch at [Meme Machine](https://group21-meme-machine.glitch.me).
2. Simply click the upload button and upload an image of reasonable size. The program will inform you if your image is too large. Note that because this uses the processing power of the client's computer, depending on the specs large images may cause lag or crashes, hence the automatic limiting of image sizes.
3. We used three different libraries to do the bulk of the work in the project. We also used a CSS library to do the styling.
   1. Canvas: We used canvas to display the image and make real time edits to it. This was difficult to implement as we had to make it dynamically update with any changes made to the photo, and keep it working with all the libraries.
   2. Cropper-JS: CropperJS was chosen as a cropping tool library because of its integration to canvas. This allows the user to crop out sections of an image, rotate, and transform images. This was difficult to get working because we needed to get it imported to the client somehow. We wound up having to use Helmet-CSP to get all our scripts working properly. We also had to dynamically program all the controls to enable/disable themselves as necessary.
   3. Caman: Caman is a third party library used to manipulate photos. It was chosen because of its easy integration to canvas. It was used to make all the sliders for editing brightness, contrast, etc. It was also used to apply several filters to the image. This was challenging to implement simply because the documentation wasn't that great, so we had to do a lot of experimentation to get it to work properly. It was implemented by use of buttons and sliders.
   4. We used basic javascript photo manipulation to add a button that repeatedly converts an image into a jpeg to introduce artifacts. This can be used to distort any image and can be found by clicking the JPEG button.
   5. Bootstrap was used to design the layout and styling of the websites. It was used to make buttons look nicer, and we also used it to style sliders and div containers.
   6. Helmet-CSP was used to set content security policy headers to allow inline scripts to be included from Javascript CDNs.
4. Challenges:
   1. The first challenge we found was getting the scripts to the client. We found out that we needed to set content security policy headers to get the Caman and CropperJS libraries included. We wound up using Helmet-CSP to set content security policy headers for the project.
   2. The second challenge we faced was getting the libraries to cooperate with canvas. Cropper for example is good for making edits to a photo file, but we needed to write code to dynamically update the canvas to reflect changes to the image data.
   3. Bootstrap was a completely new experience for us, so we needed to learn how to use it from scratch for this project.
5. What each team member was responsible for:
   1. Matthew Malone: Responsible for server backend, cropperJS implementation, and canvas setup. Creation of HTML controls for CropperJS.
   2. Aditya Kumar: Responsible for Caman setup and sliders/filters. Video creation and editing. Creation of HTML controls for CamanJS.
   3. Will White: Responsible for all styling of webpages. Learned and used bootstrap to accomplish styling of the editor.
6. [Project Video](TODO)