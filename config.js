const phi = 1.618;

const CONFIG = {
    phi: phi,
    currentPaletteIndex: 0,
    palettes: COLOR_PALETTES,
    organism: {
        numSegments: 21,
        movement: {
            maxSpeed: 2,
            repulsionForce: 2.0
        },
        breathing: {
            base: 0.85,
            amplitude1: 0.25,
            frequency1: 0.7,
            amplitude2: 0.1,
            frequency2: 1.3,
        },
        spinal: {
            color: [255, 255, 255, 150],
            strokeWeight: 4,
            glowColor: [255, 255, 255, 60],
            glowStrokeWeight: 8,
        },
        atmosphere: {
            particleCount: 30,
            x_freq: 0.2,
            x_amp: 250,
            x_rand: 0,
            y_freq: 0.1,
            y_phase_factor: 1.5,
            y_amp: 200,
            y_rand: 0,
            size_rand_min: 0.5,
            size_rand_max: 2.5,
            color: [255, 255, 255, 30],
        }
    },
    segment: {
        size: {
            min: 10,
            max: 60,
            distribution_factor: phi,
        },
        breathing: {
            min: 0.8,
            max: 1.2,
        },
        wave: {
            amp1: 40,
            freq1: 0.6,
            phase1: 5,
            amp2: 25,
            freq2: 0.4,
            phase2: 8,
            amp3: 15,
            freq3: 0.9,
            phase3: 12,
        },
        position: {
            y_factor: 400,
            y_offset: 200,
        },
        rotation: {
            freq: 0.3,
            phase: 4,
            amp: 0.2,
        },
        drawing: {
            fillColor: [255, 255, 255, 180],
            strokeColor: [255, 255, 255, 220],
            strokeWeight: 2,
            size_y_factor: 1,
            glow: {
                fillColor: [255, 255, 255, 40],
                x_factor: 1.8,
                y_factor: 1.8,
            }
        }
    },
    limb: {
        walkPhaseFactor: 0.3,
        joints: {
            count: 5,
            baseLength: 70,
            angleIncrement: Math.PI / 12,
        },
        filaments: {
            count_factor: 2,
            count_base: 8,
            angle_min: -Math.PI / 3,
            angle_max: Math.PI / 3,
            length_min: 8,
            length_max: 25,
            weight_min: 0.5,
            weight_max: 1.2,
            draw: {
                color_base: 80,
                color_factor: 15,
                end_point_color: [255, 255, 255, 100],
                end_point_size: 1.5,
                wave_freq: 2,
                wave_amp: 0.4,
            }
        },
        walkCycle: {
            freq1: 2.5,
            amp1: 0.4,
            freq2: 1.8,
            phase_factor: 1.5,
            amp2: 0.2,
        },
        breathing: {
            base: 0.9,
            amp: 0.2,
            freq: 0.6,
            phase_factor: 0.5,
        },
        drawing: {
            baseAngle: Math.PI / 3,
            joint_wave_freq: 1.5,
            joint_wave_amp: 0.3,
            thickness_map_start: 3.5,
            thickness_map_end: 0.8,
            color_base: 200,
            color_factor: 25,
            glow_color_base: 60,
            glow_color_factor: 10,
        }
    },
    fibonacci: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
}; 