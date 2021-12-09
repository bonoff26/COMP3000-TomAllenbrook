
var FLOOR_HEIGHT;
let player1;

let img;
let obstacles = [];
let gameOver;
let newGame;

function preload() {
    imgRight = loadImage('../img/knightRight.png');
    imgLeft = loadImage('../img/knightLeft.png');
    spikes = loadImage('../img/spikes.png');
}

function setup() {
    createCanvas(windowWidth - 20, windowHeight - 20);
    FLOOR_HEIGHT = height/6;
    rectMode(CORNER);
    textAlign(CENTER);
    player1 = new Player(0, 200);

    obstacles.push(new Obstacle(width/2, height-height/6-75));
    obstacles.push(new Obstacle(width/2 + 100, height-height/6-75));
    obstacles.push(new Obstacle(width/2 + 300, height-height/6-75));
    obstacles.push(new Obstacle(width/2 + 700, height-height/6-75));
    gameOver = false;
    newGame = true;

}



function draw() {
    if (gameOver && newGame) {
        menu();
    }

    if (!gameOver && newGame) {
        game();
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

}

function game() {
    rectMode(CORNER);
    background(150, 230, 240);
    noStroke();
    fill(100, 200, 75);
    rect(0, height-height/6, width, height);

    //window
    noFill();
    stroke(0);
    strokeWeight(15);
    rect(0, 0, width, height);

    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].drawObstacle();
    }
    if (player1.health <= 0) {
        gameOver = true;
        newGame = false;
    }



    checkKey();
    player1.drawPlayer();
}

function checkKey() {
    if (keyIsDown(65)) {
        player1.moveLeft();
        player1.slowLeft = false;
    }

    if (keyIsDown(68)) {
        player1.moveRight();
        player1.slowRight = false;
    }
}

function keyReleased() {
    if (keyCode === 65) {
        player1.slowLeft = true;
    }
    if (keyCode === 68) {
        player1.slowRight = true;
    }

}

function keyPressed() {
    if (key === 'w') {
        if (!player1.jumping) {
            player1.jumping = true;
        }
    }
}

