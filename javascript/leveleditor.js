


class levelEditor {
    constructor() {

        this.cameraPos = createVector(width/2, height/2);
        this.selection = -1;
        this.translateX = 0;
        this.translateY = 0;

        this.platforms = [];
        this.savedPlatforms = [];

        this.spikes = [];
        this.savedSpikes = [];

        this.savedGoals = [];
        this.goals = [];

        this.coins = [];
        this.savedCoins = [];


    }


    drawScene() {

        this.translateX = width/2-this.cameraPos.x;
        this.translateY = height/2-this.cameraPos.y;


        translate(this.translateX, this.translateY); //camera


        rectMode(CORNER);
        background(150, 230, 240); //BLUE sky


        noStroke();
        fill(100, 200, 75);
        rect(0, height-FLOOR_HEIGHT, width*5, height*5); //floor


        if (this.spikes.length > 0) {
            for (let i = 0; i < this.spikes.length; i++) {
                this.spikes[i].drawObstacle();
            }
        }


        if (this.platforms.length > 0) {
            for (let i = 0; i < this.platforms.length; i++) {
                this.platforms[i].drawPlatform();
            }
        }

        if (this.goals.length > 0) {
            for (let i = 0; i < this.goals.length; i++) {
                this.goals[i].drawGoal();
            }
        }

        if (this.coins.length > 0) {
            for (let i = 0; i < this.coins.length; i++) {
                this.coins[i].drawCoin();
            }
        }

        //window
        noFill();
        stroke(0);
        strokeWeight(15);
        rect(0, 0, width*5, height*2);

        this.sideBar();



    }


    sideBar() {
        rectMode(CENTER);

        //draw spike box
        strokeWeight(5);
        stroke(9);
        fill(200, 200, 200, 150);
        rect(this.cameraPos.x - 500, this.cameraPos.y - 400, 200, 200);
        imageMode(CENTER);
        image(spikes, this.cameraPos.x - 500, this.cameraPos.y - 400);


        //draw platform box
        rect(this.cameraPos.x - 250, this.cameraPos.y - 400, 200, 200);
        strokeWeight(20);
        stroke(150, 75, 0);
        line(this.cameraPos.x - 250 - 80, this.cameraPos.y - 400, this.cameraPos.x - 250 + 80, this.cameraPos.y - 400);



        strokeWeight(5);
        stroke(9);
        fill(200, 200, 200, 150);

        //draw goal box
        rect(this.cameraPos.x + 250, this.cameraPos.y - 400, 200, 200);
        image(goal, this.cameraPos.x + 250, this.cameraPos.y - 400, 150, 100);

        //draw coins box
        rect(this.cameraPos.x + 500, this.cameraPos.y - 400, 200, 200);
        image(coin, this.cameraPos.x + 500, this.cameraPos.y - 400);

        //save level box
        rect(this.cameraPos.x - 1000, this.cameraPos.y - 400, 200, 100);
        fill(0);
        strokeWeight(1);
        textSize(20);
        text("Save Level", this.cameraPos.x - 1000, this.cameraPos.y - 400);

        //load level box
        strokeWeight(5);
        stroke(9);
        fill(200, 200, 200, 150);
        rect(this.cameraPos.x - 1000, this.cameraPos.y - 150, 200, 100);
        fill(0);
        strokeWeight(1);
        textSize(20);
        text("Load Previous Level", this.cameraPos.x - 1000, this.cameraPos.y - 150);
        text("Press P: To play this level", this.cameraPos.x - 1000, this.cameraPos.y);
        text("Press R: To reset this level", this.cameraPos.x - 1000, this.cameraPos.y + 100);

        //text for mode warning
        textSize(40);
        noStroke();
        fill(0);
        text("LEVEL EDITOR MODE", this.cameraPos.x, this.cameraPos.y - 200);
        //text("SELECTION: " + this.selection, this.cameraPos.x, this.cameraPos.y - 100);
        this.showSelection();
    }


    clickDetect (x, y, w, h) { //detect if clicked within button
        if (mouseX >= x - w/2 && mouseX <= x + w/2) {
            if (mouseY >= y - h/2 && mouseY <= y + h/2) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }

    checkClick() {
        if (this.clickDetect(width/2-500, height/2-400, 200, 200)) { //SPIKES
            this.selection = 1;
            console.log("spikes");
        }
        else if (this.clickDetect(width/2-250, height/2-400, 200, 200)) { //PLATFORM
            this.selection = 2;
            console.log("platform");
        }
        else if (this.clickDetect(width/2+250, height/2-400, 200, 200)) { //GOAL
            this.selection = 3;
            console.log("goal");
        }
        else if (this.clickDetect(width/2+500, height/2-400, 200, 200)) { //COIN
            this.selection = 4;
            console.log("coin");
        }
        else if (this.clickDetect(width/2 - 1000, height/2 - 400, 200, 100)) { //SAVE LEVEL
            //if (this.spikes.length > 0 && this.platforms.length > 0 && this.goals.length > 0 && this.coins.length > 0) {
                console.log("execute save level");
                this.saveLevel();
            //}


        }
        else if (this.clickDetect(width/2 - 1000, height/2 - 150, 200, 100)) { //LOAD LEVEL
            this.loadLevel();
        }
    }

    httpGet (url, callback) {
        const request = new XMLHttpRequest();

        request.open('get', url, true);
        request.onload = function () {
            callback(request);
        }

        request.send();
    }

    loadLevel() {
        //build ajax
        var ajax = new XMLHttpRequest();
        var method = "GET";
        var url = "/javascript/loadlevel.php";
        var asynchronous = true;

        ajax.open(method, url, asynchronous);

        ajax.send();

        //create objects arrays
        this.spikes = [];
        this.platforms = [];
        this.goals = [];
        this.coins = [];



        ajax.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                //parse into an array
                console.log(this.responseText);
                var data = JSON.parse(this.responseText);


                //parse each separate array
                let spikeArray = JSON.parse(data[0].spikes);
                let platformArray = JSON.parse(data[0].platforms);
                let goalArray = JSON.parse(data[0].goals);
                let coinArray = JSON.parse(data[0].coins);

                //move in pairs of coordinates
                for (let i = 0; i < spikeArray.length; i+=2) {
                    levelEditorClass.spikes.push(new Obstacle(spikeArray[i], spikeArray[i+1]));
                }
                for (let i = 0; i < platformArray.length; i+=2) {
                    levelEditorClass.platforms.push(new Platform(platformArray[i], platformArray[i+1]));
                }
                for (let i = 0; i < goalArray.length; i+=2) {
                    levelEditorClass.goals.push(new Goal(goalArray[i], goalArray[i+1]));
                }
                for (let i = 0; i < coinArray.length; i+=2) {
                    levelEditorClass.coins.push(new Coin(coinArray[i], coinArray[i+1]));
                }

            }
        }


    }

    saveLevel() {
        var ajax = new XMLHttpRequest();
        var method = "POST";
        var url = "savelevel.php";
        var asynchronous = true;


        ajax.open(method, url, asynchronous);

        let spikes = [];
        let platforms = [];
        let coins = [];
        let goals = [];


        //save X and Y positions to arrays
        for (let i = 0; i < this.spikes.length; i++) {
            spikes.push(this.spikes[i].pos.x);
            spikes.push(this.spikes[i].pos.y);
        }
        for (let i = 0; i < this.platforms.length; i++) {
            platforms.push(this.platforms[i].pos.x);
            platforms.push(this.platforms[i].pos.y);
        }
        for (let i = 0; i < this.coins.length; i++) {
            coins.push(this.coins[i].pos.x);
            coins.push(this.coins[i].pos.y);
        }
        for (let i = 0; i < this.goals.length; i++) {
            goals.push(this.goals[i].pos.x);
            goals.push(this.goals[i].pos.y);
        }


        //turn them into strings
        let spikesToSend = JSON.stringify(spikes);
        let platformsToSend = JSON.stringify(platforms);
        let coinsToSend = JSON.stringify(coins);
        let goalsToSend = JSON.stringify(goals);



        //put them into an array
        let locationsToSend = [spikesToSend, platformsToSend, goalsToSend, coinsToSend];
        console.log(locationsToSend);

        //send array as a string
        ajax.open("POST", "/javascript/savelevel.php");
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify(locationsToSend));

    }

    //show image of current selection on the mouse
    showSelection() {

        if (this.selection === 1) {
            imageMode(CENTER);
            image(spikes, mouseX - this.translateX, mouseY - this.translateY);
        }
        else if (this.selection === 2) {
            strokeWeight(20);
            stroke(150, 75, 0);
            line(mouseX - 80 - this.translateX, mouseY - this.translateY, mouseX + 80 - this.translateX, mouseY - this.translateY);
        }
        else if (this.selection === 3) {
            image(goal, mouseX - this.translateX, mouseY - this.translateY);
        }
        else if (this.selection === 4) {
            image(coin, mouseX - this.translateX, mouseY - this.translateY);
        }

    }

    clickedOnSaveOrLoad() {
        if (this.clickDetect(width/2 - 1000, height/2 - 400, 200, 100) || (this.clickDetect(width/2 - 1000, height/2 - 150, 200, 100))) {
            return true;
        }
    }

}



function mouseClicked() {
    if (levelEditorMode) {
        levelEditorClass.checkClick();
    }

    if (levelEditorMode && !levelEditorClass.clickedOnSaveOrLoad()) {
        if (levelEditorClass.selection === 1 && !levelEditorClass.clickDetect(width/2-500, height/2-400, 200, 200)) {
            levelEditorClass.spikes.push(new Obstacle(mouseX - levelEditorClass.translateX - 75, mouseY - levelEditorClass.translateY - 75/2));
        }
        if (levelEditorClass.selection === 2 && !levelEditorClass.clickDetect(width/2-250, height/2-400, 200, 200)) {
            levelEditorClass.platforms.push(new Platform(mouseX - levelEditorClass.translateX, mouseY - levelEditorClass.translateY));
        }
        if (levelEditorClass.selection === 3 && !levelEditorClass.clickDetect(width/2+250, height/2-400, 200, 200)) {
            levelEditorClass.goals.push(new Goal(mouseX - levelEditorClass.translateX, mouseY - levelEditorClass.translateY));
        }
        if (levelEditorClass.selection === 4 && !levelEditorClass.clickDetect(width/2+500, height/2-400, 200, 200)) {
            levelEditorClass.coins.push(new Coin(mouseX - levelEditorClass.translateX, mouseY - levelEditorClass.translateY));
        }
    }

}


