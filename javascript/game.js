
let FLOOR_HEIGHT;
let player1;
let players = [];
let savedPlayers = [];
const TOTAL = 150;
let SIMSPEED = 1;

let img;
let obstacles = [];
let platforms = [];
let gameOver;
let newGame;
let leadingPlayer;
let highScore;
let madeIt;
let levelEditorMode;
let levelEditorClass;
let customLevel;
let customSetUp;
let goals = [];
let coins = [];
let originalCoins = [];
let followingPlayer;

function preload() {
    imgRight = loadImage('../img/knightRight.png');
    imgLeft = loadImage('../img/knightLeft.png');
    spikes = loadImage('../img/spikes.png');
    goal = loadImage('../img/goal.png');
    coin = loadImage('../img/coin.png');
}

function setup() {
    createCanvas(windowWidth - 20, windowHeight - 20);
    followingPlayer = false;
    customLevel = false;
    customSetUp = false;
    FLOOR_HEIGHT = height/6;
    levelEditorMode = false;
    tf.setBackend('cpu');
    rectMode(CORNER);
    textAlign(CENTER);
    player1 = new Player(0, 200);
    highScore = 0;
    madeIt = 0;
    //obstacles.push(new Obstacle(width/2, height-FLOOR_HEIGHT-75));
    obstacles.push(new Obstacle(width/2 + 300, height-FLOOR_HEIGHT-75));
    obstacles.push(new Obstacle(width/2 + 400, height-FLOOR_HEIGHT-75));
    obstacles.push(new Obstacle(width/2 + 600, height-FLOOR_HEIGHT-75));
    obstacles.push(new Obstacle(width/2 + 800, height-FLOOR_HEIGHT-75));
    obstacles.push(new Obstacle(width/2 + 900, height-FLOOR_HEIGHT-75));
    obstacles.push(new Obstacle(width/2 + 1700, height-FLOOR_HEIGHT-75));
    //obstacles.push(new Obstacle(width/2 + 1700, height-FLOOR_HEIGHT-75));
    gameOver = false;
    newGame = true;
    platforms.push(new Platform(width/2, height-FLOOR_HEIGHT-50));
    platforms.push(new Platform(width/2 + 300, height-FLOOR_HEIGHT-75));
    levelEditorClass = new levelEditor();
    goals.push(new Goal(width/2 + 2200, height-FLOOR_HEIGHT-75));
    coins.push(new Coin(width/2 + 2200, height-FLOOR_HEIGHT-75));

    for (let i = 0; i < TOTAL; i++) {
        players[i] = new AI();
    }
}



function draw() {
    keyPressed();
    if (gameOver && newGame) {
        menu();
    }

    if (levelEditorMode) {
        gameOver = false;
        newGame = false;
        levelEditorClass.drawScene();
        checkKey();
        mousePressed();
        keyPressed();
    }

    if (!gameOver && newGame) {
        game();
        camera.position.x = player1.x;
        camera.position.y = player1.y;
        //text("ALIVE" + players.length, width/2, height/2);
    }
    else if (gameOver && !newGame){
        textSize(50);
        text("GAME OVER", width/2, height/2);

        rectMode(CENTER);
        rect(width/2, height/2 + 75, 300, 75);
        textSize(42);
        text("GO TO MENU", width/2, height/2 + 90);
    }
}


function mousePressed() {
    // go to menu button
    if (gameOver && !newGame) {
        if (mouseX >= width/2 - 150 && mouseX <= width/2 + 150) {
            if (mouseY >= height/2 - 40 && mouseY <= width/2 + 40) {
                gameOver = true;
                newGame = true;
                console.log("pressed");
            }
        }
    }


}


function menu() {
    background(150, 230, 240);

    rectMode(CENTER);
    rect(width/2, height/2, width/5, width/12);
    textSize(45);
    text("MENU", width/2, height/2);
}

function game() {


    if (customLevel && customSetUp === false) {
        obstacles = levelEditorClass.savedSpikes;
        platforms = levelEditorClass.savedPlatforms;
        goals = levelEditorClass.savedGoals;
        coins = levelEditorClass.savedCoins;
        originalCoins = levelEditorClass.savedCoins;
        customSetUp = true;
    }

    if (players.length === 0) {
        nextGeneration();
    }
    rectMode(CORNER);
    background(150, 230, 240); //BLUE sky
    //translate(width/2-player1.pos.x, height/1.7-player1.pos.y); //camera

    let leadingPlayer = players[0];

    for (let i = 0; i < players.length; i++) {
        if (players[i].pos.x >= leadingPlayer.pos.x) {
            leadingPlayer = players[i];
        }
    }


    if (leadingPlayer.pos.x > highScore) {
        highScore = leadingPlayer.pos.x;
    }

    textSize(40);
    text("HIGH SCORE: " + highScore, width/2, height/7);
    text("ALIVE: " + players.length, width/2, height/7 + 50);
    text("MADE IT: " + madeIt, width/2, height/7 + 100);
    textSize(20);
    text("Press L: for level editor", width/8, height/7 + 100);
    text("Press F: to follow player", width/8, height/7 + 150);
    text("Press R: to reset AI & player", width/8, height/7 + 200);

    if (!followingPlayer) {
        translate(width/2-leadingPlayer.pos.x, height/1.7-leadingPlayer.pos.y); //camera
    }
    else {
        translate(width/2-player1.pos.x, height/1.7-player1.pos.y); //camera
    }



    noStroke();
    fill(100, 200, 75);
    rect(0, height-FLOOR_HEIGHT, width*5, height*5); //floor

    //window
    noFill();
    stroke(0);
    strokeWeight(15);
    rect(0, 0, width*5, height*2);

    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].drawObstacle();
    }
    for (let i = 0; i < platforms.length; i++) {
        platforms[i].drawPlatform();
    }
    for (let i = 0; i < goals.length; i++) {
        goals[i].drawGoal();
    }
    for (let i = 0; i < coins.length; i++) {
        coins[i].drawCoin();
    }
    if (player1.health <= 0) {
        //gameOver = true;
        //newGame = false;
    }

    for (let i = 0; i < players.length; i++) {



        players[i].think(obstacles, platforms, coins, goals);
        players[i].drawPlayer();
        //players[i].moveRight();



        for (let g = 0; g < goals.length; g++) {
            if (players[i].pos.x > goals[g].pos.x) {
                players[i].score += 15000;
                madeIt++;
                players[i].health = 0;
                //nextGeneration();
            }
        }




        //check if hit coin
        if (coins.length > 0) {
            for (let j = 0; j < coins.length; j++) {
                if (players[i].pos.x >= coins[j].pos.x - 50 && players[i].pos.x <= coins[j].pos.x + 50) {
                    if (players[i].pos.y >= coins[j].pos.y - 150 && players[i].pos.x <= coins[j].pos.x + 100) {
                        players[i].score += 1000;
                    }
                }
            }
        }


        //remove player to saved players if dead
        if (players[i].health <= 0) {
            savedPlayers.push(players.splice(i,1)[0]);
            //players.splice(i, 1);
        }
        else {
            if (players[i].pos.x <= 2500 && savedPlayers.length > 1 && players[i].vel.x < 1) { //if slow delete player
                savedPlayers.push(players.splice(i,1)[0]);
            }
        }


    }



    checkKey(); //check if key is pressed
    player1.drawPlayer(); //draw the player









}

function checkKey() {

    //A and D movement left and right for the player
    if (keyIsDown(65) && !levelEditorMode) {
        player1.moveLeft();
        player1.slowLeft = false;
    }

    if (keyIsDown(68) && !levelEditorMode) {
        player1.moveRight();
        player1.slowRight = false;
    }

    //WASD setup
    if (keyIsDown(87) && levelEditorMode) {
        levelEditorClass.cameraPos.y -= 10;
    }
    if (keyIsDown(65) && levelEditorMode) {
        levelEditorClass.cameraPos.x -= 10;
    }
    if (keyIsDown(83) && levelEditorMode) {
        levelEditorClass.cameraPos.y += 10;
    }
    if (keyIsDown(68) && levelEditorMode) {
        levelEditorClass.cameraPos.x += 10;
        console.log("right");
    }
    if (keyIsDown(82) && levelEditorMode) {
        levelEditorClass.spikes = [];
        levelEditorClass.platforms = [];
        levelEditorClass.goals = [];
        levelEditorClass.coins = [];
    }


}

function keyReleased() {
    if (keyCode === 65) {
        player1.slowLeft = true;
    }
    if (keyCode === 68) {
        player1.slowRight = true;
    }

    if (key === 'f' && !levelEditorMode) {
        if (followingPlayer) {
            followingPlayer = false;
        }
        else {
            followingPlayer = true;
        }
    }

    if (key === 'r' && !levelEditorMode) {
        for (let i = 0; i < players.length; i++) {
            player1.health = 100;
            player1.pos.x = 100;
            savedPlayers.push(players.splice(i,1)[0]);
        }
        players = [];
        //nextGeneration();
    }

}

function keyPressed() {
    //console.log("KEY PRESSED");
    if (key === 'w' && !levelEditorMode) {
        if (!player1.jumping) {
            player1.jumping = true;
        }
    }




    if (key === 'l' && !levelEditorMode) {
        gameOver = true;
        levelEditorMode = true;
        newGame = false;
    }



    //transfer level editor objects into the main game
    if (key === 'p' && levelEditorMode) {
        levelEditorClass.savedPlatforms = levelEditorClass.platforms;
        levelEditorClass.savedSpikes = levelEditorClass.spikes;
        levelEditorClass.savedGoals = levelEditorClass.goals;
        levelEditorClass.savedCoins = levelEditorClass.coins;
        gameOver = false;
        newGame = true;
        customLevel = true;
        customSetUp = false;
        levelEditorMode = false;
        nextGeneration();
    }


}

