class Segment {
    constructor(index, totalSegments) {
        this.index = index;
        this.progress = index / (totalSegments - 1);
        const sizeConfig = CONFIG.segment.size;
        this.size = map(sin(pow(this.progress, sizeConfig.distribution_factor) * PI), 0, 1, sizeConfig.min, sizeConfig.max);
        this.position = createVector(0, 0);
        this.angle = 0;
        this.limbs = [];
        const breathConfig = CONFIG.segment.breathing;
        this.breathing = random(breathConfig.min, breathConfig.max);
        
        this.createLimbs();
    }
    
    createLimbs() {
        for (let side = -1; side <= 1; side += 2) {
            let limb = new Limb(this, side, this.index);
            this.limbs.push(limb);
        }
    }
    
    update(spineProgress, globalBreathing) {
        const wave = CONFIG.segment.wave;
        let wave1 = sin(tGlobal * wave.freq1 + spineProgress * TWO_PI * wave.phase1) * wave.amp1;
        let wave2 = cos(tGlobal * wave.freq2 + spineProgress * TWO_PI * wave.phase2) * wave.amp2;
        let wave3 = sin(tGlobal * wave.freq3 + spineProgress * TWO_PI * wave.phase3) * wave.amp3;
        
        const pos = CONFIG.segment.position;
        this.position.x = wave1 + wave2 + wave3;
        this.position.y = spineProgress * pos.y_factor - pos.y_offset;
        
        const rot = CONFIG.segment.rotation;
        this.angle = sin(tGlobal * rot.freq + spineProgress * PI * rot.phase) * rot.amp;
        
        this.currentSize = this.size * globalBreathing * this.breathing;
        
        for (let limb of this.limbs) {
            limb.update();
        }
    }
    
    draw() {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.angle);
        
        const drawConfig = CONFIG.segment.drawing;
        fill(...drawConfig.fillColor);
        stroke(...drawConfig.strokeColor);
        strokeWeight(drawConfig.strokeWeight);
        ellipse(0, 0, this.currentSize, this.currentSize * drawConfig.size_y_factor);
        
        const glow = drawConfig.glow;
        fill(...glow.fillColor);
        noStroke();
        ellipse(0, 0, this.currentSize * glow.x_factor, this.currentSize * glow.y_factor);
        
        pop();
        
        for (let limb of this.limbs) {
            limb.draw();
        }
    }
} 