class Organism {
    constructor() {
        this.position = createVector(0, 0);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.maxSpeed = CONFIG.organism.movement.maxSpeed;
        this.noiseOffsetX = random(1000);
        this.noiseOffsetY = random(1000);

        this.segments = [];
        this.numSegments = CONFIG.organism.numSegments;
        this.globalBreathing = 1;
        
        for (let i = 0; i < this.numSegments; i++) {
            let segment = new Segment(i, this.numSegments);
            this.segments.push(segment);
        }
    }
    
    updateMovement() {
        // Perlin noise for steering
        let angle = noise(this.noiseOffsetX) * TWO_PI * 4;
        let steeringForce = p5.Vector.fromAngle(angle);
        steeringForce.mult(0.1);
        this.acceleration.add(steeringForce);

        // Self-avoidance
        for (let i = 5; i < this.segments.length; i++) {
            let segment = this.segments[i];
            let d = p5.Vector.dist(this.position, segment.position);
            
            if (d > 0 && d < segment.currentSize * 4) { 
                let repulsion = p5.Vector.sub(this.position, segment.position);
                repulsion.normalize();
                repulsion.div(d); // Closer segments apply stronger force
                this.acceleration.add(repulsion.mult(CONFIG.organism.movement.repulsionForce));
            }
        }

        // Update velocity and position
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0); // Reset acceleration

        // Boundary avoidance
        let margin = 100;
        let turnForce = 0.2;
        if (this.position.x < -width / 2 + margin) {
            this.acceleration.add(createVector(turnForce, 0));
        }
        if (this.position.x > width / 2 - margin) {
            this.acceleration.add(createVector(-turnForce, 0));
        }
        if (this.position.y < -height / 2 + margin) {
            this.acceleration.add(createVector(0, turnForce));
        }
        if (this.position.y > height / 2 - margin) {
            this.acceleration.add(createVector(0, -turnForce));
        }

        this.noiseOffsetX += 0.01;
        this.noiseOffsetY += 0.01;
    }
    
    update() {
        this.updateMovement();

        const breath = CONFIG.organism.breathing;
        this.globalBreathing = breath.base + breath.amplitude1 * sin(tGlobal * breath.frequency1) + 
                              breath.amplitude2 * cos(tGlobal * breath.frequency2);
        
        // Head follows the organism's main position
        this.segments[0].follow(this.position);
        this.segments[0].update(0, this.globalBreathing);

        // Other segments follow the previous one
        for (let i = 1; i < this.segments.length; i++) {
            let leader = this.segments[i - 1];
            this.segments[i].follow(leader.position);
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