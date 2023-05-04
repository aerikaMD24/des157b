console.log("this is mysketch.js comment");

let ghx, ghy, elx, ely, erx, ery, d; //groundhogX and Y, eyeleftX and Y, eyerightX and Y, diameter

function setup() {
    const myCanvas = createCanvas(800, 250);
    //has to parent to an id
    myCanvas.parent('mySketch');
    //initialize groundhog body and eye locations
    ghx = width / 2;
    ghy = height - 60;
    elx = ghx + 128;
    ely = ghy - 130;
    erx = ghx + 175;
    ery = ghy - 130;
    d = 20;

    colorMode(HSB, 360, 100, 100);
}

function draw() {
    drawBackground();
    noStroke();
    drawCharacter();
    moveEyes();
}

function drawBackground() {
    for (let i = 0; i < height+50; i++) {
        //create gradient from h346 to h280
        stroke(360 - i / 4, 90, 100);
        line(0, i, width, i-50);
    }
}

function drawCharacter() {
    //draw shadow
    fill(21, 90, 30);
    quad(ghx - 50, ghy, ghx, ghy, ghx + 250, ghy + 50, ghx + 50, ghy + 50);
    //draw figure
    fill(21, 80, 50);
    quad(ghx + 100, ghy - 150, ghx + 200, ghy - 150, ghx + 250, ghy + 50, ghx + 50, ghy + 50);
}

function moveEyes() {

//left eye
push();
//put the center of the screen at the left eye
translate (elx-d, ely);

fill(0);
//map values of x axis to width and y axis to height
//I'm multiplying the mouseX and mouseY by 30 to give
//a movement distance of 30 pixels
ellipse(mouseX*30/width, mouseY*30/height, d, d);
pop();

//right eye
push();
translate (erx-20, ery);

fill(0);
//map values of x axis to width and y axis to height
ellipse(mouseX*30/width, mouseY*30/height, d, d);
pop();
}