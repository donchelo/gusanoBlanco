class Organism {
    constructor() {
        this.segments = [];
        this.numSegments = CONFIG.organism.numSegments;
        this.globalBreathing = 1;
        
        for (let i = 0; i < this.numSegments; i++) {
            let segment = new Segment(i, this.numSegments);
            this.segments.push(segment);
        }
    }
    
    update() {
        const breath = CONFIG.organism.breathing;
        this.globalBreathing = breath.base + breath.amplitude1 * sin(tGlobal * breath.frequency1) + 
                              breath.amplitude2 * cos(tGlobal * breath.frequency2);
        
        for (let i = 0; i < this.segments.length; i++) {
            let progress = i / (this.segments.length - 1);
            this.segments[i].update(progress, this.globalBreathing);
        }
    }
    
    draw() {
        this.drawSpinalConnections();
        
        for (let segment of this.segments) {
            segment.draw();
        }
        
        this.drawAtmosphericEffects();
    }
    
    drawSpinalConnections() {
        const spinal = CONFIG.palettes[CONFIG.currentPaletteIndex].spine;
        stroke(...spinal.color);
        strokeWeight(CONFIG.organism.spinal.strokeWeight);
        noFill();
        
        beginShape();
        for (let segment of this.segments) {
            curveVertex(segment.position.x, segment.position.y);
        }
        endShape();
        
        stroke(...spinal.glowColor);
        strokeWeight(CONFIG.organism.spinal.glowStrokeWeight);
        beginShape();
        for (let segment of this.segments) {
            curveVertex(segment.position.x, segment.position.y);
        }
        endShape();
    }
    
    drawAtmosphericEffects() {
        const atmos = CONFIG.organism.atmosphere;
        const atmos_color = CONFIG.palettes[CONFIG.currentPaletteIndex].atmosphere.color;
        
        noStroke();
        for (let i = 0; i < atmos.particleCount; i++) {
            // using noise for more organic movement
            let noiseX = noise(tGlobal * atmos.x_freq + i * 10);
            let noiseY = noise(tGlobal * atmos.y_freq + i * 10 + 100);

            let x = map(noiseX, 0, 1, -atmos.x_amp, atmos.x_amp);
            let y = map(noiseY, 0, 1, -atmos.y_amp, atmos.y_amp);
            
            let size = random(atmos.size_rand_min, atmos.size_rand_max);
            // make particles blink
            let alphaNoise = noise(tGlobal * 0.5 + i * 20);
            let c = color(...atmos_color);
            c.setAlpha(map(alphaNoise, 0, 1, 10, 80));
            fill(c);

            circle(x, y, size);
        }
    }
}