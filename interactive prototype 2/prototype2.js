///SPRITE ANIMATIONS ARE FROM P5 play library, will replace with own later. I might remove the scores as it is not necessary.


console.log("hello world");

//JQuery
$(document).ready(function () {

    // When the page loads the start up screen pops up
    console.log("load start screen");

    $(window).load(function () {
        $("#startScreen").css('visibility', 'visible').delay(500).animate({
                opacity: 1
            },
            750,
            'swing');

    });

    //When you click on the start button the start screen goes away and you are left with the main menu

    $('nav#startButton').click(function () {
        console.log('click start button');

        $('section#mainMenu').css('visibility', 'visible');
        $('section#startScreen').css('visibility', 'hidden');
        //prevents page from reloading
        return false;
    });



    //going back to the menu page
    $('section#gameScreen section#sideNav nav ul li:nth-child(2)').click(function () {
        console.log('Go back to menu from game screen');

        $('section#gameScreen').css('visibility', 'hidden');
        $('section#mainMenu').css('visibility', 'visible');

        //prevents page from reloading
        return false;
    });

    //clicking on the scores page
    $('section#gameScreen section#sideNav nav ul li:nth-child(2)').click(function () {
        console.log('Go back to menu from game screen');

        $('section#introductonPopUp').css('visibility', 'hidden');
        $('section#gameScreen').css('visibility', 'hidden');
        $('section#mainMenu').css('visibility', 'visible');

        //prevents page from reloading
        return false;
    });

    /////check out how to close the introduction when you click to close it right away and then you go back to the main menu, because this is complicated a bit.////////////////////

    $('section#mainMenu nav:nth-child(2) a:nth-child(2)').click(function () {
        console.log('click on information');

        $('section#infoPopUp').css('visibility', 'visible').animate({
            height: '800px',
            left: '0',
        });
        return false;
    });
    $('section#infoPopUp nav.close').click(function () {
        console.log('click');
        $('section#infoPopUp').css('height', '0px').css('visibility', 'hidden');
        return false;
    });

    ///// opening and closing the pop up for scores

    $('section#mainMenu nav:nth-child(2) a:first-child').click(function () {
        console.log('click on scores');

        $('section#scoresPopUp').css('visibility', 'visible').animate({
            height: '800px',
            left: '0',
        });
        return false;
    });
    $('section#scoresPopUp nav.close').click(function () {
        console.log('click');
        $('section#scoresPopUp').css('height', '0px').css('visibility', 'hidden');
        return false;
    });




    //When you click on the first level you are directed to the 'pop up' introduction. $('section#introductionPopUp').css('visibility', 'visible').animate({
    //top: 0, // position must be absolute or relative in the css
    //height: 800
    // },
    // 5000,
    //'swing'); 

    $('section#mainMenu nav ul li:first-child').click(function () {
        console.log('click level 1');

        $('section#introductionPopUp').css('visibility', 'visible');
        $('section#mainMenu').css('visibility', 'hidden');

        //prevents page from reloading
        return false;
    });

    ///closing the introduction panel.

    $('section#introductionPopUp nav.close').click(function () {
        console.log('close the intro pop up');

        $('section#introductionPopUp').css('visibility', 'hidden');
        $('section#gameScreen').css('visibility', 'visible');

        //prevents page from reloading
        return false;
    });



    /////when you click on the continue page you get the instructions

    $('section#introductionPopUp nav a').click(function () {
        console.log('click continue button');

        $('section#instPopUp').css('visibility', 'visible');
        $('section#introductionPopUp').css('visibility', 'hidden');
        //prevents page from reloading
        return false;
    });

    ///closing the instructions panel.
    $('section#instPopUp nav.close').click(function () {
        console.log('close the instructions pop up');

        $('section#instPopUp').css('visibility', 'hidden');
        $('section#gameScreen').css('visibility', 'visible');

        //prevents page from reloading
        return false;
    });




});


//Collisions 
//Collision between groups
//function called upon collision

//var obstacles;
var collectibles;
var asterisk;

function setup() {
    var myCanvas = createCanvas(900, 790);
    //link to my id mySketch from header tag
    myCanvas.parent('gameArea')
    smooth();
    colorMode(HSB, 360, 100, 100);  
  
  //create a user controlled sprite
  asterisk = createSprite(400, 200);
  asterisk.addAnimation("normal", "asterisk_normal0001.png", "asterisk_normal0003.png");
  
  asterisk.addAnimation("stretch", "asterisk_stretching0001.png", "asterisk_stretching0008.png");
  
  //create 2 groups
  //obstacles = new Group();
  collectibles = new Group();
  
  /*for(var i=0; i<4; i++)
    {
    var box = createSprite(random(0, width), random(0,height));
    box.addAnimation("normal", "assets/box0001.png", "assets/box0003.png");
    obstacles.add(box);
    } */
  
  for(var i=0; i<10; i++)
    {
    var dot = createSprite(random(0, width), random(0,height));
    dot.addAnimation("normal", "small_circle0001.png", "small_circle0001.png");
    collectibles.add(dot);
    }
  
}



function draw() {
  background(94.15, 34.17, 94.12);  
  
  //if no arrow input set velocity to 0
  asterisk.velocity.x = (mouseX-asterisk.position.x)/10;
  asterisk.velocity.y = (mouseY-asterisk.position.y)/10;

  //asterisk collides against all the sprites in the group obstacles
 // asterisk.collide(obstacles);
  
  //I can define a function to be called upon collision, overlap, displace or bounce
  //see collect() below
  asterisk.overlap(collectibles, collect)
  
  //if the animation is "stretch" and it reached its last frame
  if(asterisk.getAnimationLabel() == "stretch" && asterisk.animation.getFrame() == asterisk.animation.getLastFrame())
  {
    asterisk.changeAnimation("normal");
  }
  
  drawSprites();
}

//the first parameter will be the sprite (individual or from a group) 
//calling the function
//the second parameter will be the sprite (individual or from a group)
//against which the overlap, collide, bounce, or displace is checked
function collect(collector, collected)
{
  //collector is another name for asterisk
  //show the animation
  collector.changeAnimation("stretch");
  collector.animation.rewind();
  //collected is the sprite in the group collectibles that triggered 
  //the event
  collected.remove();
}






/*

//P5 JS canvas for game 

var stretchy;
var face;
var collectibles;

function setup() {
    var myCanvas = createCanvas(900, 790);
    //link to my id mySketch from header tag
    myCanvas.parent('gameArea')
    smooth();
    colorMode(HSB, 360, 100, 100);

    face = loadImage("face.png");

    stretchy = createSprite(400, 200, 10, 10);


////make the ellipse stretch in the sprite direction
    //proportionally to its speed
    stretchy.draw = function () {
        fill(25.05, 90.35, 89.41);

        push();
        rotate(radians(this.getDirection()));
        ellipse(0, 0, 100 + this.getSpeed(), 100 - this.getSpeed());

          //this.deltaX and this.deltaY are the position increment 
    //since the last frame, move the face image toward the direction
        image(face, this.deltaX * 2, this.deltaY * 2)

    }
    
    stretchy.maxSpeed = 10;

// oil group
    collectibles = new Group();
    
    for (var i = 0; i < 10; i++) {
        var dot = createSprite(random(0, width), random(0, height));
        dot.addAnimation("normal","small_circle0001.png", "small_circle0001.png");
        collectibles.add(dot);
    }


}

function draw() {
    background(149.12, 36.98, 74.12);

    //mouse trailer, the speed is inversely proportional to the mouse distance
    stretchy.velocity.x = (mouseX-stretchy.position.x)/10;
    stretchy.velocity.y = (mouseY-stretchy.position.y)/10;

     //see collect() below
  stretchy.overlap(collectibles, collect)
   
    
    
    drawSprites();

}

function collect(collector, collected) {
    //collector is another name for asterisk
    //show the animation


    //collected is the sprite in the group collectibles that triggered 
    //the event
    collected.remove();
}


