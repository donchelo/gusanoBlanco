let tGlobal = 0;
let organism;

function setup() {
    createCanvas(windowWidth, windowHeight);
    organism = new Organism();
}

function draw() {
    // Fondo con ligero trailing
    // background(0, 25);
    drawBackground();
    
    translate(width / 2, height / 2);
    tGlobal += 0.008;
    
    organism.update();
    organism.draw();
}

function drawBackground() {
    let palette = CONFIG.palettes[CONFIG.currentPaletteIndex];
    let bgColor = color(...palette.background);
    
    // Create a dynamic gradient based on the background color
    let topColor = lerpColor(bgColor, color(255), 0.1);
    let bottomColor = lerpColor(bgColor, color(0), 0.1);

    push();
    noFill();
    for(let i=0; i<=height; i++){
        let inter = map(i, 0, height, 0, 1);
        let c = lerpColor(topColor, bottomColor, inter);
        stroke(c);
        line(0, i, width, i);
    }
    pop();

    // Add a transparent layer for the trailing effect
    fill(...palette.background, 25);
    noStroke();
    rect(0, 0, width, height);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
    CONFIG.currentPaletteIndex = (CONFIG.currentPaletteIndex + 1) % CONFIG.palettes.length;
}