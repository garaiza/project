///SPRITE ANIMATIONS ARE FROM P5 play library, will replace with own later. I might remove the scores as it is not necessary.


console.log("hello world");

//JQuery
$(document).ready(function () {

    // When the page loads the start up screen pops up
    console.log("load start screen");

    $(window).load(function () {
        $("section#startScreen").css('visibility', 'visible').delay(300).animate({
                opacity: 1
            },
            750,
            'swing',
            function () {
                $('section#mainMenu').css('visibility', 'visible').animate({
                        opacity: 1
                    },
                    750,
                    'swing'
                );
            });
    });

    //When you click on the start button the start screen goes away and you are left with the main menu

    $('nav#gameButton').click(function () {
        console.log('click start button');

        $('section#gameScreen').css('visibility', 'visible');
        $('section#startScreen').css('visibility', 'hidden');
        $('section#introductionPopUp').css('visibility', 'visible');
        $('section#mainMenu').css('visibility', 'hidden');
        //prevents page from reloading
        return false;
    });



    ///////////////////////////////////////////////////////////////////////////////////////////////////////////


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
    $('section#instPopUp section nav#play a').click(function () {
        console.log('close the instructions pop up');

        $('section#instPopUp').css('visibility', 'hidden');
        $('section#gameScreen').css('visibility', 'visible');

        //prevents page from reloading
        return false;
    });



    ////////////////////////////////////////////////////////////////////////////////////


    /////check out how to overlay the main maeu page over the game screen because it kepps poping up but behind it instead of in front.////////////////////

    $('section#mainMenu nav#extraInfo a:nth-child(2)').click(function () {
        console.log('click on info');

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

    $('section#mainMenu nav#extraInfo a:first-child').click(function () {
        console.log('click on scores');

        $('#scoresPopUp').css('visibility', 'visible').animate({
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////// opening and game menu

    $('section#gameScreen section#sideNav nav ul li').click(function () {
        console.log('click on orange menu button');

        $('section#gameMenuPopUp').css('visibility', 'visible').animate({
            height: '350px',
            left: '0',
        });
        return false;
    });


    ////////////////////////////////



    $('section#gameMenuPopUp section#gameMenu nav ul li:first-child').click(function () {
        console.log('clickdfsfsdf');


        $('section#gameMenuPopUp').css('visibility', 'hidden').css('height', '0px');


        //prevents page from reloading
        return false;
    });


    $('section#gameMenuPopUp section#gameMenu nav ul li:nth-child(2)').click(function () {
        console.log('click on game menu');
        $('section#gameMenuPopUp').css('visibility', 'hidden');
        $('section#gameScreen').css('visibility', 'hidden');
        $('section#startScreen').css('visibility', 'visible');
        $('section#mainMenu').css('visibility', 'visible');


        //prevents page from reloading
        return false;
    });



});


var obstacles;
var collectibles;
var player;
var dot;
var numberOfWhales;
var whaleMarginTop;
var whaleMarginBottom;
var whaleMarginLeft;
var whaleMarginRight;
var oilMarginTop;
var oilMarginBottom;
var oilMarginLeft;
var oilMarginRight;
var score;
var timer;
var gameDuration;
var secondsBefore;
var secondsAfter;
var oilsOnScreen;
var minOilsOnScreen;
var genStopSeconds;
var fr = 24; //starting FPS
var gameStarted;


function setup() {
    var myCanvas = createCanvas(900, 790);
    //link to my id mySketch from header tag
    myCanvas.parent('gameArea')
    smooth();
    colorMode(HSB, 360, 100, 100);

    frameRate(fr);

    numberOfWhales = 10;
    oilsOnScreen = 0;
    minOilsOnScreen = 50;

    // oil and whale margins
    whaleMarginTop = 75;
    whaleMarginBottom = 75;
    whaleMarginLeft = 75;
    whaleMarginRight = 150;
    oilMarginTop = 50;
    oilMarginBottom = 50;
    oilMarginLeft = 50;
    oilMarginRight = 100;

    // default score and timer values
    score = 0;
    gameDuration = 60;
    genStopSeconds = 15;
    timer = gameDuration;
    secondsBefore = second();
    secondsAfter = second();

    // create clear button
    startButton = createButton('Start Game');
    startButton.position(20, 345);
    startButton.style("font-family", "Century Gothic");
    startButton.style("background-color", "#81ad34");
    startButton.style("color", "#FFFFFF");
    startButton.style("font-size", "18pt");
    startButton.style("padding", "10px");
    startButton.style("border-radius", "15px");
    startButton.style("cursor", "pointer");
    startButton.mousePressed(startGame);

    // set gameStarted equal to false
    gameStarted = false;

    //create a user controlled sprite
    player = createSprite(400, 200);
    player.addAnimation("normal", "player_normal0001.png", "player_normal0002.png");
    player.addAnimation("eat", "player_eating0001.png", "player_eating0007.png");

    //create 2 groups
    //obstacles = new Group();
    collectibles = new Group();
    obstacles = new Group();

    for (var i = 0; i < numberOfWhales; i++) {
        var box = createSprite(random(whaleMarginLeft, width - whaleMarginRight), random(oilMarginTop, height - whaleMarginBottom));
        box.addAnimation("normal", "whale/whale_0001.png", "whale/whale_0007.png");
        obstacles.add(box);
    }

}

function draw() {
    background(94.15, 34.17, 94.12);

    if (timer <= 0) gameOver();

    if (gameStarted == true) {

        // hide start button
        startButton.hide();

        // display score
        fill(0);
        noStroke();
        textSize(24);
        text("Barrels of Oil: " + score, 30, 25);

        //convert seconds to MM:SS
        var mm = Math.floor(timer / 60);
        var ss = timer - mm * 60;
        if (mm < 10) {
            mm = "0" + mm;
        }
        if (ss < 10) {
            ss = "0" + ss;
        }
        var t = mm + ":" + ss;
        if (timer <= 0) {
            t = "00:00"
        }

        // display timer
        fill(0);
        noStroke();
        textSize(24);
        text("Timer: " + t, 735, 25);

        // If one second has lapsed
        secondsAfter = second();
        if (secondsAfter != secondsBefore) {

            // Decrease timer by one
            timer--;
            secondsBefore = secondsAfter;
        }

        //if no arrow input set velocity to 0
        player.velocity.x = (mouseX - player.position.x) / 10;
        player.velocity.y = (mouseY - player.position.y) / 10;

        if (oilsOnScreen < minOilsOnScreen && timer > genStopSeconds) {
            dot = createSprite(random(oilMarginLeft, width - oilMarginRight), random(oilMarginTop, height - oilMarginBottom));
            dot.addAnimation("oil1/one_oil_0001.png", "oil1/one_oil_0002.png", "oil1/one_oil_0003.png", "oil1/one_oil_0004.png", "oil1/one_oil_0005.png", "oil1/one_oil_0006.png", "oil1/one_oil_0007.png");
            collectibles.add(dot);

            dot = createSprite(random(oilMarginLeft, width - oilMarginRight), random(oilMarginTop, height - oilMarginBottom));
            dot.addAnimation("oil2/two_oil_0001.png", "oil2/two_oil_0002.png", "oil2/two_oil_0003.png", "oil2/two_oil_0004.png", "oil2/two_oil_0005.png", "oil2/two_oil_0006.png", "oil2/two_oil_0007.png");
            collectibles.add(dot);

            dot = createSprite(random(oilMarginLeft, width - oilMarginRight), random(oilMarginTop, height - oilMarginBottom));
            dot.addAnimation("oil3/three_oil_0001.png", "oil3/three_oil_0002.png", "oil3/three_oil_0003.png", "oil3/three_oil_0004.png", "oil3/three_oil_0005.png", "oil3/three_oil_0006.png", "oil3/three_oil_0007.png");
            collectibles.add(dot);

            dot = createSprite(random(oilMarginLeft, width - oilMarginRight), random(oilMarginTop, height - oilMarginBottom));
            dot.addAnimation("oil4/four_oil_0001.png", "oil4/four_oil_0002.png", "oil4/four_oil_0003.png", "oil4/four_oil_0004.png", "oil4/four_oil_0005.png", "oil4/four_oil_0006.png", "oil4/four_oil_0007.png");
            collectibles.add(dot);

            oilsOnScreen += 4;
        }
        //if mouse button is pressed then asterisk displaces all the sprites in the group obstacles
        //if mouse button is NOT pressed then asterisk collides against all the sprites in the group obstacles
        if (mouseIsPressed) {
            player.displace(obstacles);
            for (var i = 0; i < numberOfWhales; i++) {
                var w = obstacles[i];
                if (w.position.x < whaleMarginLeft) w.position.x = whaleMarginLeft;
                if (w.position.x > width - whaleMarginRight) w.position.x = width - whaleMarginRight;
                if (w.position.y < whaleMarginTop) w.position.y = whaleMarginTop;
                if (w.position.y > height - whaleMarginBottom) w.position.y = height - whaleMarginBottom;
            }
        } else {
            player.collide(obstacles);
        }

        //I can define a function to be called upon collision, overlap, displace or bounce
        //see collect() below no semicolon
        //asterisk.overlap(collectibles, collect)
        //if asterisk collides with oil then increase the score by one
        if (player.overlap(collectibles, collect)) {

            score++;
            oilsOnScreen--;
        }

        //if the animation is "stretch" and it reached its last frame
        if (player.getAnimationLabel() == "eat" && player.animation.getFrame() == player.animation.getLastFrame()) {
            player.changeAnimation("normal");
        }

        drawSprites();

    } else {

        // show start button
        startButton.show();

    }
}


function startGame() {
    // change gameStarted variable
    gameStarted = true;

}

function gameOver() {
    fill(0);
    noStroke();
    textSize(24);
    text("Your score is: " + score + "Barrels of oil cleaned", 400, 400);

    startButton.show();
    gameStarted = false;
    timer = gameDuration;
    score = 0;
    secondsBefore = second();
    secondsAfter = second();
}

//the first parameter will be the sprite (individual or from a group) 
//calling the function
//the second parameter will be the sprite (individual or from a group)
//against which the overlap, collide, bounce, or displace is checked
function collect(collector, collected) {
    //collector is another name for asterisk
    //show the animation
    collector.changeAnimation("eat");
    collector.animation.rewind();
    //collected is the sprite in the group collectibles that triggered 
    //the event
    collected.remove();
}