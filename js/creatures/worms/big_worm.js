class BigWorm extends Creature {
    constructor() {
        super();
        this.position = createVector(random(-width / 2, width / 2), random(-height / 2, height / 2));
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        
        const orgConf = CONFIG.organism;
        this.maxSpeed = orgConf.movement.maxSpeed * 3.0; // Twice as fast
        this.numSegments = floor(orgConf.numSegments * 1.5); // More segments
        this.noiseOffsetX = random(1000);
        this.noiseOffsetY = random(1000);
        this.bodyShapeSeed = random(1000);

        this.breath = {
            base: orgConf.breathing.base * 1.1,
            amplitude1: orgConf.breathing.amplitude1 * 1.2,
            frequency1: orgConf.breathing.frequency1 * 0.8,
            amplitude2: orgConf.breathing.amplitude2 * 1.2,
            frequency2: orgConf.breathing.frequency2 * 0.8,
        };

        this.segments = [];
        this.globalBreathing = 1;
        
        for (let i = 0; i < this.numSegments; i++) {
            // Pass a size multiplier and shape seed to the segment
            let segment = new Segment(i, this.numSegments, 1.5, this.bodyShapeSeed);
            this.segments.push(segment);
        }
    }
    
    updateMovement(allCreatures) {
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
                repulsion.div(d);
                this.acceleration.add(repulsion.mult(CONFIG.organism.movement.repulsionForce));
            }
        }

        // Avoid other creatures
        for (let other of allCreatures) {
            if (other === this) continue;

            for (let segment of other.segments) {
                let d = p5.Vector.dist(this.position, segment.position);
                if (d > 0 && d < segment.currentSize * 4) {
                    let repulsion = p5.Vector.sub(this.position, segment.position);
                    repulsion.normalize();
                    repulsion.div(d);
                    this.acceleration.add(repulsion.mult(CONFIG.organism.movement.repulsionForce));
                }
            }
        }

        // Update velocity and position
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        // Boundary avoidance
        let margin = 150; // Larger margin for larger worm
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
    
    update(allCreatures) {
        this.updateMovement(allCreatures);

        const b = this.breath;
        this.globalBreathing = b.base + b.amplitude1 * sin(tGlobal * b.frequency1) + 
                              b.amplitude2 * cos(tGlobal * b.frequency2);
        
        this.segments[0].follow(this.position);
        this.segments[0].update(0, this.globalBreathing);

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
        strokeWeight(CONFIG.organism.spinal.strokeWeight * 1.5);
        noFill();
        
        beginShape();
        for (let segment of this.segments) {
            curveVertex(segment.position.x, segment.position.y);
        }
        endShape();
        
        stroke(...spinal.glowColor);
        strokeWeight(CONFIG.organism.spinal.glowStrokeWeight * 1.5);
        beginShape();
        for (let segment of this.segments) {
            curveVertex(segment.position.x, segment.position.y);
        }
        endShape();
    }
    
    drawAtmosphericEffects() {
        // Big worms might have a stronger atmospheric effect
        const atmos = CONFIG.organism.atmosphere;
        const atmos_color = CONFIG.palettes[CONFIG.currentPaletteIndex].atmosphere.color;
        
        noStroke();
        for (let i = 0; i < atmos.particleCount * 1.5; i++) {
            let noiseX = noise(tGlobal * atmos.x_freq + i * 10);
            let noiseY = noise(tGlobal * atmos.y_freq + i * 10 + 100);

            let x = map(noiseX, 0, 1, -atmos.x_amp, atmos.x_amp) + this.position.x;
            let y = map(noiseY, 0, 1, -atmos.y_amp, atmos.y_amp) + this.position.y;
            
            let size = random(atmos.size_rand_min, atmos.size_rand_max) * 1.5;
            let alphaNoise = noise(tGlobal * 0.5 + i * 20);
            let c = color(...atmos_color);
            c.setAlpha(map(alphaNoise, 0, 1, 20, 100));
            fill(c);

            circle(x, y, size);
        }
    }
} 