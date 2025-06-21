class Limb {
    constructor(parentSegment, side, segmentIndex) {
        this.parent = parentSegment;
        this.side = side; // -1 izquierda, 1 derecha
        this.segmentIndex = segmentIndex;
        this.walkPhase = segmentIndex * CONFIG.limb.walkPhaseFactor;

        this.joints = [];
        this.createJoints();
    }

    createJoints() {
        const jointConfig = CONFIG.limb.joints;
        const numJoints = jointConfig.count;
        const baseLength = jointConfig.baseLength;

        // Get a reversed slice of fibonacci sequence, e.g. for 4 joints -> [5, 3, 2, 1]
        const fibSequence = CONFIG.fibonacci.slice(1, numJoints + 1).reverse();
        const fibSum = fibSequence.reduce((sum, val) => sum + val, 0);

        for (let i = 0; i < numJoints; i++) {
            let joint = {
                length: baseLength * (fibSequence[i] / fibSum),
                baseAngle: (i * jointConfig.angleIncrement),
                phase: random(TWO_PI),
                filaments: this.createFilaments(i)
            };
            this.joints.push(joint);
        }
    }

    createFilaments(jointIndex) {
        let filaments = [];
        let numFilaments = max(0, CONFIG.limb.filaments.count_base - jointIndex * CONFIG.limb.filaments.count_factor);

        for (let i = 0; i < numFilaments; i++) {
            filaments.push({
                angle: random(CONFIG.limb.filaments.angle_min, CONFIG.limb.filaments.angle_max),
                length: random(CONFIG.limb.filaments.length_min, CONFIG.limb.filaments.length_max),
                phase: random(TWO_PI),
                weight: random(CONFIG.limb.filaments.weight_min, CONFIG.limb.filaments.weight_max)
            });
        }
        return filaments;
    }

    update() {
        const walk = CONFIG.limb.walkCycle;
        this.walkCycle = sin(tGlobal * walk.freq1 + this.walkPhase) * walk.amp1 +
                         cos(tGlobal * walk.freq2 + this.walkPhase * walk.phase_factor) * walk.amp2;

        const breath = CONFIG.limb.breathing;
        this.breathingScale = breath.base + breath.amp * sin(tGlobal * breath.freq + this.segmentIndex * breath.phase_factor);
    }

    draw() {
        push();
        translate(this.parent.position.x, this.parent.position.y);

        let currentPos = createVector(0, 0);
        let cumulativeAngle = this.side * (CONFIG.limb.drawing.baseAngle + this.walkCycle);

        for (let i = 0; i < this.joints.length; i++) {
            let joint = this.joints[i];
            const drawConfig = CONFIG.limb.drawing;

            let dynamicAngle = cumulativeAngle +
                             joint.baseAngle * this.side +
                             sin(tGlobal * drawConfig.joint_wave_freq + joint.phase + this.segmentIndex) * drawConfig.joint_wave_amp;

            let segmentLength = joint.length * this.breathingScale;
            let nextPos = createVector(
                currentPos.x + cos(dynamicAngle) * segmentLength,
                currentPos.y + sin(dynamicAngle) * segmentLength
            );

            let thickness = map(i, 0, this.joints.length - 1, drawConfig.thickness_map_start, drawConfig.thickness_map_end);

            stroke(255, 255, 255, drawConfig.color_base - i * drawConfig.color_factor);
            strokeWeight(thickness);
            line(currentPos.x, currentPos.y, nextPos.x, nextPos.y);

            stroke(255, 255, 255, drawConfig.glow_color_base - i * drawConfig.glow_color_factor);
            strokeWeight(thickness + 2);
            line(currentPos.x, currentPos.y, nextPos.x, nextPos.y);

            this.drawFilaments(nextPos, dynamicAngle, joint.filaments, i);

            currentPos = nextPos;
            cumulativeAngle = dynamicAngle;
        }

        pop();
    }

    drawFilaments(position, baseAngle, filaments, jointIndex) {
        const filConfig = CONFIG.limb.filaments.draw;
        for (let filament of filaments) {
            let filAngle = baseAngle + filament.angle +
                          sin(tGlobal * filConfig.wave_freq + filament.phase + this.segmentIndex) * filConfig.wave_amp;

            let filLength = filament.length * this.breathingScale;
            let endX = position.x + cos(filAngle) * filLength;
            let endY = position.y + sin(filAngle) * filLength;

            stroke(255, 255, 255, filConfig.color_base - jointIndex * filConfig.color_factor);
            strokeWeight(filament.weight);
            line(position.x, position.y, endX, endY);

            fill(...filConfig.end_point_color);
            noStroke();
            circle(endX, endY, filConfig.end_point_size);
        }
    }
} 