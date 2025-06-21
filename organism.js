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
        const spinal = CONFIG.organism.spinal;
        stroke(...spinal.color);
        strokeWeight(spinal.strokeWeight);
        noFill();
        
        beginShape();
        for (let segment of this.segments) {
            curveVertex(segment.position.x, segment.position.y);
        }
        endShape();
        
        stroke(...spinal.glowColor);
        strokeWeight(spinal.glowStrokeWeight);
        beginShape();
        for (let segment of this.segments) {
            curveVertex(segment.position.x, segment.position.y);
        }
        endShape();
    }
    
    drawAtmosphericEffects() {
        const atmos = CONFIG.organism.atmosphere;
        fill(...atmos.color);
        noStroke();
        for (let i = 0; i < atmos.particleCount; i++) {
            let x = sin(tGlobal * atmos.x_freq + i) * atmos.x_amp + random(-atmos.x_rand, atmos.x_rand);
            let y = cos(tGlobal * atmos.y_freq + i * atmos.y_phase_factor) * atmos.y_amp + random(-atmos.y_rand, atmos.y_rand);
            circle(x, y, random(atmos.size_rand_min, atmos.size_rand_max));
        }
    }
}