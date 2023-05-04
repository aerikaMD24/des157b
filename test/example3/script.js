let vid;

function setup() {
    createCanvas(1280, 720);
    vid = createVideo('media/beach.mp4');
    vid.muted = true;
    vid.volume(0);
    vid.loop;
    vid.hide();
    noStroke();
    fill(0);
}

function draw() {
    background(255);
    vid.loadPixels();

    const stepSize = round(constrain(mouseX / 8, 6, 32));
    for (let y = 0; y < height; y += stepSize) {
        for (let x = 0; x < width; x += stepSize) {
            const i = y * width + x;
            const darkness = (255 - vid.pixels[i * 4] / 255);
            const radius = stepSize * darkness;
            ellipse(x, y, radius, radius);
        }
    }
    filter('invert');
}
