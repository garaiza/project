console.log("hello world");

function setup() {
  var myCanvas=createCanvas(1000,790);
    //link to my id mySketch from header tag
    myCanvas.parent('gameArea')
  colorMode (HSB, 360, 100, 100);
  smooth();
}


// x position variable
var xpos = 200;
 
// y position variable
var ypos = 100;
 
// numPixels variable
var numPixels = 10;
 

function draw() 
{
  // clear background
  background(181, 20, 90);
 
  // set the fill color
  fill(15, 100, 100);
 
  // black outline
  stroke(0);
 
  // set the ellipse mode
  ellipseMode(CENTER);
 
  // draw a circle
  ellipse(xpos, ypos, 25, 25);	
}
 
function keyPressed()
{
  // UP key
  if(keyCode == UP_ARROW)
  {
    ypos = ypos - numPixels; 
  }
 
  // DOWN key
  if(keyCode == DOWN_ARROW)
  { 
    ypos = ypos + numPixels; 
  }
 
  // RIGHT key
  if(keyCode == RIGHT_ARROW)
  {
    xpos = xpos + numPixels; 
  }
 
  // LEFT key
  if(keyCode == LEFT_ARROW)
  {
    xpos = xpos - numPixels; 
  }
}
