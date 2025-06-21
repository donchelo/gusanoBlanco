class SmallWorm extends Creature {
    constructor() {
        super();
        this.position = createVector(random(-width / 2, width / 2), random(-height / 2, height / 2));
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        
        const orgConf = CONFIG.organism;
        this.maxSpeed = orgConf.movement.maxSpeed * 1.5; // Faster
        this.numSegments = floor(orgConf.numSegments * 0.7); // Fewer segments
        this.noiseOffsetX = random(1000);
        this.noiseOffsetY = random(1000);
        this.bodyShapeSeed = random(1000);

        this.breath = {
            base: orgConf.breathing.base * 0.9,
            amplitude1: orgConf.breathing.amplitude1 * 0.8,
            frequency1: orgConf.breathing.frequency1 * 1.2,
            amplitude2: orgConf.breathing.amplitude2 * 0.8,
            frequency2: orgConf.breathing.frequency2 * 1.2,
        };

        this.segments = [];
        this.globalBreathing = 1;
        
        for (let i = 0; i < this.numSegments; i++) {
            // Pass a size multiplier and shape seed to the segment
            let segment = new Segment(i, this.numSegments, 0.7, this.bodyShapeSeed);
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
        
        // No atmospheric effects for the small one to differentiate it more
        // this.drawAtmosphericEffects(); 
    }
    
    drawSpinalConnections() {
        const spinal = CONFIG.palettes[CONFIG.currentPaletteIndex].spine;
        stroke(...spinal.color);
        strokeWeight(CONFIG.organism.spinal.strokeWeight * 0.7);
        noFill();
        
        beginShape();
        for (let segment of this.segments) {
            curveVertex(segment.position.x, segment.position.y);
        }
        endShape();
        
        stroke(...spinal.glowColor);
        strokeWeight(CONFIG.organism.spinal.glowStrokeWeight * 0.7);
        beginShape();
        for (let segment of this.segments) {
            curveVertex(segment.position.x, segment.position.y);
        }
        endShape();
    }
} 