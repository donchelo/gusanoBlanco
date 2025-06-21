let tGlobal = 0;
let organism;

function setup() {
    createCanvas(windowWidth, windowHeight);
    organism = new Organism();
}

function draw() {
    // Fondo con ligero trailing
    background(0, 25);
    
    translate(width / 2, height / 2);
    tGlobal += 0.012;
    
    organism.update();
    organism.draw();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}