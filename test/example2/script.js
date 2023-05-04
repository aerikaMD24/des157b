function setup() {
    const myCanvas = createCanvas(1200, 750);
    myCanvas.parent('mySketch');
    background(49, 166, 205);
}

function draw() {
    if (mouseIsPressed) {
        fill(0);
    } else {
        fill(255);
    }
    ellipse(mouseX, mouseY, 60, 60);
}

