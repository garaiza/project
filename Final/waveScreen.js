/////// Interactive Background sketch


var yoff = 0.0;        // 2nd dimension of perlin noise
var stretchy;
var face;

function setup() {
  var myCanvas = createCanvas(1280, 800);
  myCanvas.parent('waveScreen')
  face = loadImage("bacteria/face_normal_0001.png");
  
  //Sometimes image sequences are not enough and you may want to 
  //use p5's drawing function while retaining the built-in features of the 
  //sprite class
  stretchy = createSprite(640, 400, 10, 10);
  
  //To do so you can override (overwrite) the draw() function of the sprite
  //and make it display anything you want in its current position.
  //In javascript function and methods can be assigned like variables
  
  stretchy.draw = function() {
    
    //the center of the sprite will be point 0,0
    //"this" in this function will reference the sprite itself
    fill(25.05,90.35,89.41);
    
    //make the ellipse stretch in the sprite direction
    //proportionally to its speed
    push();
    rotate(radians(this.getDirection()));
    ellipse(0, 0, 100+this.getSpeed(), 100-this.getSpeed());
    pop();
    
    //this.deltaX and this.deltaY are the position increment 
    //since the last frame, move the face image toward the direction
    image(face, this.deltaX*2,this.deltaY*1);
    }
  
  stretchy.maxSpeed = 8;
}


function draw() {
    colorMode(HSB, 360, 100, 100);
  background(255);

  fill(94.15, 34.17, 94.12);
  // We are going to draw a polygon out of the wave points
  beginShape(); 
  
  var xoff = 0;       // Option #1: 2D Noise
  // var xoff = yoff; // Option #2: 1D Noise
  
  // Iterate over horizontal pixels
  for (var x = 0; x <= width; x += 10) {
    // Calculate a y value according to noise, map to 
    
    // Option #1: 2D Noise
    var y = map(noise(xoff, yoff), 0, 1, 500,300);

    // Option #2: 1D Noise
    // var y = map(noise(xoff), 0, 1, 200,300);
    
    // Set the vertex
    vertex(x, y); 
    // Increment x dimension for noise
    xoff += 0.05;
  }
  // increment y dimension for noise
  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
    
    //mouse trailer, the speed is inversely proportional to the mouse distance
  stretchy.velocity.x = (mouseX-stretchy.position.x)/10;
  stretchy.velocity.y = (mouseY-stretchy.position.y)/10;
  
  drawSprites();
}