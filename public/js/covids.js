let stars = []	//create empty list of stars
let numOfStars = 10

function generateStars(){
	for (let i = 0; i < numOfStars; i++) {
	    let star = {}; //Define star locally
	    star.x = random(0, 500); //Add info as before
	    star.y = random(0, 500);
	    star.diam = random(1,3);
	    stars.push(star); //Now add the star to the list
	}
}

function setup() {
  createCanvas(500, 500);
  generateStars();
}

function draw() {

  background(0);

  stroke(255);
  strokeWeight(3);

  for (let i = 0; i < 10; i++) {
    stars[i].x = stars[i].x + 
    stars[i].y++
	  point(stars[i].x, stars[i].y);
  }

}

