

class Obstacle {

    constructor(x, y) {
        this.pos = createVector(x, y);
        this.damage = 100;

    }

    drawObstacle() {
        image(spikes, this.pos.x, this.pos.y);
    }
}