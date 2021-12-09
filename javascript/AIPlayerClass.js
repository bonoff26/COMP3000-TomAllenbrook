

class AI extends Player{

    constructor(brain) {
        super(0, 0);
        //this.speed = 0.05;

        if (brain) {
            this.brain = brain.copy();
        } else {
            //console.log("CREATED NN");
            this.brain = new NeuralNetwork(6, 16, 2);
        }
    }

    dispose() {
        this.brain.dispose();
    }

    mutate() {
        this.brain.mutate(0.05);
    }

    up() {
        this.jumping = true;
    }

    think(spikes, platforms, points, goal) {
        this.score = this.pos.x*10;
        // Find the closest spike
        //text("S: "  + round(this.score, 2), this.pos.x + 30, this.pos.y + 5);
        let closest = null;
        let closestD = Infinity; //distance
        for (let i = 0; i < spikes.length; i++) {
            let d = spikes[i].pos.x - (this.pos.x + 50);
            if (d < closestD && d > 0) {
                //console.log("CLOSEST = " + i);
                closest = spikes[i];
                closestD = d;
            }
        }

        let closestPlatform = null;
        let closestPd = Infinity;

        for (let i = 0; i < platforms.length; i++) {
            let d = platforms[i].startPos - 25 - (this.pos.x + 50);
            if (d < closestPd && d > 0) {
                //console.log("CLOSEST = " + i);
                closestPlatform = platforms[i];
                closestPd = d;
            }
        }
        if (closestPlatform === null) {
            closestPlatform = platforms[platforms.length-1];
        }

        if (closest === null) {
            //madeIt = players.length;
            closest = spikes[spikes.length];

            for (let i = 0; i < players.length; i++) {
                //players[i].score += 100000;
               // savedPlayers.push(players.splice(i,1)[0]);
            }
            //nextGeneration();
        }


        else {
            let inputs = [];
            inputs[0] = this.pos.x / width;
            inputs[1] = closest.pos.x / width;
            inputs[2] = this.pos.y / height;
            inputs[3] = closest.pos.y / height;
            inputs[4] = this.vel.y / 10;
            inputs[5] = this.vel.x / 10;
            //inputs[6] = closestPlatform.startPos - 25 / width;
            //inputs[7] = closestPlatform.pos.y / height;
            let output = this.brain.predict(inputs);
            //console.log(inputs[0]);

            //if (output[0] > output[1] && this.velocity >= 0) {
            if (output[0] > output[1] && this.jumping === false) {
                //console.log(output[0] + " | " + output[1]);
                //console.log("Closest: " + closestD);
                //console.log("JUMP");
                this.up();
                this.moveRight();

            }
        }

//score based on position not time bruh

    }

}