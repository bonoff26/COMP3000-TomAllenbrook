function nextGeneration() {
    console.log('next generation');


    calculateFitness();
    for (let i = 0; i < TOTAL; i++) {
        players[i] = pickOne();
    }




    for (let i = 0; i < savedPlayers.length; i++) {
        savedPlayers[i].dispose();
    }
    savedPlayers = [];
}


function pickOne() {
    //console.log(savedPlayers);
    let index = 0;
    let r = random(1);
    while (r > 0 && savedPlayers[index] != null) {
        r = r - savedPlayers[index].fitness;
        index++;
    }
    index--;
    let newPlayer = savedPlayers[index];
    let child = new AI(newPlayer.brain);
    child.mutate();
    return child;
}

function calculateFitness() {
    let sum = 0;
    for (let AI of savedPlayers) {
        sum += AI.score;
    }
    for (let AI of savedPlayers) {
        AI.fitness = AI.score / sum;
        //console.log(AI.fitness);
    }
}