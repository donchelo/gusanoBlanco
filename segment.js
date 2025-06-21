class Segment {
    constructor(index, totalSegments, sizeMultiplier = 1, bodyShapeSeed = 0) {
        this.index = index;
        this.progress = index / (totalSegments - 1);
        
        const sizeConfig = CONFIG.segment.size;
        
        // Symmetrical base shape using the golden ratio distribution
        let symmetricalFactor = sin(pow(this.progress, sizeConfig.distribution_factor) * PI);
        
        // Organic variation using Perlin noise, seeded for each creature
        let noiseFactor = noise(bodyShapeSeed + this.progress * sizeConfig.noise_freq);
        
        // Combine them to get an organic, but still structured, shape.
        // We give more weight to the symmetrical factor to maintain a recognizable body form
        // while adding noise for natural-looking "lumps".
        let combinedFactor = symmetricalFactor * 0.6 + noiseFactor * 0.4;
        
        this.size = map(combinedFactor, 0, 1, sizeConfig.min, sizeConfig.max);
        this.size *= sizeMultiplier; // Apply global size multiplier for Big/Small worms
        
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
    
    follow(target) {
        let dir = p5.Vector.sub(target, this.position);
        let d = dir.mag();
        // The distance between segments. Let's use a fraction of the segment's size.
        let spacing = this.size * 0.5; 
        if (d > spacing) {
            dir.setMag(d - spacing);
            this.position.add(dir);
        }
    }
    
    update(spineProgress, globalBreathing) {
        // The wave calculation is no longer needed for positioning
        /*
        const wave = CONFIG.segment.wave;
        let n1 = noise(tGlobal * wave.freq1 + spineProgress * wave.phase1);
        let n2 = noise(tGlobal * wave.freq2 + spineProgress * wave.phase2 + 100);
        let n3 = noise(tGlobal * wave.freq3 + spineProgress * wave.phase3 + 200);
        
        let wave1 = map(n1, 0, 1, -wave.amp1, wave.amp1);
        let wave2 = map(n2, 0, 1, -wave.amp2, wave.amp2);
        let wave3 = map(n3, 0, 1, -wave.amp3, wave.amp3);
        
        const pos = CONFIG.segment.position;
        this.position.x = wave1 + wave2 + wave3;
        this.position.y = spineProgress * pos.y_factor - pos.y_offset;
        */

        const rot = CONFIG.segment.rotation;
        let rot_noise = noise(tGlobal * rot.freq + spineProgress * rot.phase + 500);
        this.angle = map(rot_noise, 0, 1, -rot.amp, rot.amp);
        
        this.currentSize = this.size * globalBreathing * this.breathing;
        
        for (let limb of this.limbs) {
            limb.update();
        }
    }
    
    draw() {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.angle);
        
        const pal = CONFIG.palettes[CONFIG.currentPaletteIndex].segment;
        const drawConfig = CONFIG.segment.drawing;
        let baseColor = lerpColor(color(...pal.color_start), color(...pal.color_end), this.progress);

        let fillColor = color(baseColor);
        fillColor.setAlpha(180);
        let strokeColor = color(baseColor);
        strokeColor.setAlpha(pal.stroke_alpha);

        fill(fillColor);
        stroke(strokeColor);
        strokeWeight(drawConfig.strokeWeight);
        ellipse(0, 0, this.currentSize, this.currentSize * drawConfig.size_y_factor);
        
        // Glow effect
        const glow = drawConfig.glow;
        let glowColor = color(baseColor);
        glowColor.setAlpha(pal.glow_alpha);
        fill(glowColor);
        noStroke();
        ellipse(0, 0, this.currentSize * glow.x_factor, this.currentSize * glow.y_factor);
        
        pop();
        
        for (let limb of this.limbs) {
            limb.draw();
        }
    }
} 