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



    //going back to the menu page from pop p
    $('section#gameMenuPopUp section#gameMenu nav ul li:nth-child(2)').click(function () {
        console.log('Go back to menu from game screen');
   $('section#gameMenuPopUp').css('visibility', 'hidden');
        $('section#gameScreen').css('visibility', 'hidden');
        $('section#mainMenu').css('visibility', 'visible');

        //prevents page from reloading
        return false;
    });



    /////check out how to overlay the main maeu page over the game screen because it kepps poping up but behind it instead of in front.////////////////////

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

    
    ////// opening and closing of game menu
    
      $('section#gameScreen section#sideNav nav ul li').click(function () {
        console.log('click on game menu pop up and it shows up');

        $('section#gameMenuPopUp').css('visibility', 'visible').animate({
            height: '800px',
            left: '0',
        });
        return false;
    });
    $('section#gameMenuPopUp section#gamMenu nav ul li:first-child').click(function () {
        console.log('click to go back to game');
        $('section#gameMenuPopUp').css('height', '0px').css('visibility', 'hidden');
        return false;
    });
    
   
     //this is affecting the visibility somewhow
    $('section#gameScreen section#sideNav nav ul li').click(function () {
        console.log('clicking on the game menu');

        $('section#gameScreen section#sideNav nav ul li:nth-child(3)').css('visibility', 'hidden');
        $('section#gameScreen').css('visibility', 'hidden');

        //prevents page from reloading
        return false;
    }); 
    
    
    
    
    
    


////clicking play at the menu and the page pops up

    $('section#mainMenu nav ul li:first-child').click(function () {
        console.log('click play at menu');

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
