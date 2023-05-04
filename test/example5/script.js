let capture;

function setup() {
    createCanvas(1080, 720);
    capture =  createCapture(VIDEO);
    capture.size(1080, 720);
    capture.hide();
}

function draw() {
    background(0);
    capture.loadPixels();

    const stepSize = round(constrain(mouseX / 8, 5, 32));
    for (let y = 0; y < height; y += stepSize) {
        for (let x = 0; x < width; x += stepSize) {
            const i = y * width + x;
            const darkness = (255 - capture.pixels[i * 4] / 255);
            const radius = stepSize * darkness;
            ellipse(x, y, radius, radius);
        }
    }
}