class Player {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

        this.gravity = createVector(0, 0.1);

        //this.speed = random(0.01, 0.15);
        this.speed = 1;

        this.speedMult = 40;
        this.onFloor = false;
        this.gravity = 5;
        this.jumpSpeed = 1;
        this.jumping = false;
        this.slowLeft = false;
        this.slowRight = false;
        this.movingLeft = false;
        this.movingRight = true;
        this.cooldown = false;
        this.health = 100;
        this.score = 0;
        this.fitness = 0;

    }



    moveLeft() {
        if (this.vel.x > -5) { //move left
            this.acc.set(-this.speed*SIMSPEED, 0);
            this.vel.add(this.acc);
            this.acc.set(0,0);
        }
        this.movingRight = false;
        this.movingLeft = true;

    }

    moveRight() {
        if (this.vel.x < 5) { //move right
            this.acc.set(this.speed*SIMSPEED, 0);
            this.vel.add(this.acc);
            this.acc.set(0,0);
        }
        this.movingLeft = false;
        this.movingRight = true;
    }


    slow() { //slow down left and right
        if (this.slowLeft && this.vel.x >= 0) {
            this.slowLeft = false;
            this.vel.x = 0;
        }
        if (this.slowRight && this.vel.x <= 0) {
            this.slowRight = false;
            this.vel.x = 0;
        }
        if (this.slowLeft) {
            this.acc.set(0.1*SIMSPEED, 0);
            this.vel.add(this.acc);
            this.acc.set(0,0);
        }
        if (this.slowRight) {
            this.acc.set(-0.1*SIMSPEED, 0);
            this.vel.add(this.acc);
            this.acc.set(0,0);
        }
    }

    onObstacle() {
        for (let i = 0; i < platforms.length; i++) {
            if (this.pos.x + 50 >= platforms[i].startPos - 25 && this.pos.x + 50 <= platforms[i].endPos + 25) {
                //console.log("DETECTED X");
                if (this.pos.y + 98 >= platforms[i].pos.y - platforms[i].ySize/2 && this.pos.y + 98 <= platforms[i].pos.y + platforms[i].ySize/2) {
                    //console.log("DETECTED Y");
                    return true;
                }
            }
        }
        return false;
    }

    fall() {



        if (!this.jumping) {
            if (this.pos.y >= (height-FLOOR_HEIGHT)-115 || this.onObstacle()) { //on floor
                if (!this.onObstacle()) {
                    this.pos.y = (height-FLOOR_HEIGHT)-93;
                }

                this.vel.y = 0;
                this.cooldown = false;
            }

            else if (this.pos.y <= (height-FLOOR_HEIGHT)-115 && this.vel.y <= 10) { //falling

                this.acc.set(0, 0.5);
                this.vel.add(this.acc);
                this.acc.set(0,0);
                this.cooldown = true;
            }
        }

    }


    jump() {
        if (this.cooldown === false) {
            if (this.jumping && this.vel.y >= -12) { //jump up
                this.acc.set(0, -1);
                this.vel.add(this.acc);
                this.acc.set(0,0);

            }
            if (this.jumping && this.vel.y <= -12) { //falling down
                this.jumping = false;
            }
        }
        if (this.cooldown === true) { //if tying to jump on a cool down, set jumping false
            if (this.jumping) {
                this.jumping = false;
            }
        }
    }

    collisionDetect() {
        for (let i = 0; i < obstacles.length; i++) {
            //console.log("loop");
            if (this.pos.x + 50 > obstacles[i].pos.x && this.pos.x < obstacles[i].pos.x + 50) {
                if (this.pos.y + 50 > obstacles[i].pos.y && this.pos.y < obstacles[i].pos.y + 75) {
                    //obstacles.splice(i, 1);
                    this.score = 0;
                    this.health = 0;
                }
            }
        }
    }

    healthBar(n) {
        //draw health bar
        stroke(1);
        strokeWeight(1);
        fill(255, 50, 50);
        rect(this.pos.x - 2, this.pos.y - 40, 100, 25);
        fill(50, 255, 50);
        stroke(1);
        strokeWeight(1);
        rect(this.pos.x - 2, this.pos.y - 40, map(this.health, 0, 100, 0, 100), 25);
        fill(255, 30, 30);
        let x = round(this.vel.x, 3);
        //text("VEL:"  + x, this.pos.x + 20, this.pos.y - 25);
    }


    drawPlayer() {

        this.healthBar();


        this.collisionDetect();

        this.slow();

        this.jump();


        this.fall();
        this.pos.add(this.vel);
        this.acc.set(0, 0);
        //rect(this.pos.x, this.pos.y, 20, 20);
        imageMode(CORNER);
        if (this.movingLeft) {
            image(imgLeft, this.pos.x, this.pos.y, 100, 100);
        }
        else if (this.movingRight) {
            image(imgRight, this.pos.x, this.pos.y, 100, 100);
        }

    }
}