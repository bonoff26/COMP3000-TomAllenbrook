class Goal {
    constructor(x, y) {
        this.pos = createVector(x, y);
    }


    drawGoal() {
        imageMode(CENTER);
        image(goal, this.pos.x, this.pos.y);
    }
}


class Coin {
    constructor(x, y) {
        this.pos = createVector(x, y);
    }


    drawCoin() {
        imageMode(CENTER);
        image(coin, this.pos.x, this.pos.y);
    }
}