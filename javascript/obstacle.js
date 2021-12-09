

class Obstacle {

    constructor(x, y) {
        this.pos = createVector(x, y);
        this.damage = 100;
        this.size = 150;

    }

    drawObstacle() {
        image(spikes, this.pos.x, this.pos.y);
    }
}


class Platform {

    constructor(x, y) {
        this.pos = createVector(x, y);
        this.size = 200;
        this.startPos = this.pos.x - this.size/2;
        this.endPos = this.pos.x + this.size/2;
        this.ySize = 20;
    }


    drawPlatform() {
        strokeWeight(20);
        stroke(150, 75, 0);
        line(this.startPos, this.pos.y, this.endPos, this.pos.y);
    }

}



