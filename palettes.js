const COLOR_PALETTES = [
    // Paleta 1: Azul-Naranja (Complementarios fríos-cálidos)
    {
        background: [0, 5, 15],
        spine: {
            color: [30, 120, 255, 150],
            glowColor: [255, 140, 30, 80],
        },
        segment: {
            color_start: [10, 80, 200],
            color_end: [255, 120, 0],
            stroke_alpha: 240,
            glow_alpha: 60,
        },
        limb: {
            color_start: [80, 150, 255],
            color_end: [255, 160, 40],
        },
        filament: {
            color: [240, 250, 255, 120],
            end_point_color: [255, 255, 255, 180],
        },
        atmosphere: {
            color: [20, 60, 120, 25],
        }
    },
    
    // Paleta 2: Rojo-Verde (Complementarios clásicos)
    {
        background: [15, 0, 0],
        spine: {
            color: [255, 30, 30, 150],
            glowColor: [30, 255, 30, 80],
        },
        segment: {
            color_start: [200, 0, 0],
            color_end: [0, 200, 80],
            stroke_alpha: 240,
            glow_alpha: 70,
        },
        limb: {
            color_start: [255, 80, 80],
            color_end: [80, 255, 120],
        },
        filament: {
            color: [255, 250, 240, 120],
            end_point_color: [255, 255, 255, 180],
        },
        atmosphere: {
            color: [80, 20, 20, 25],
        }
    },
    
    // Paleta 3: Amarillo-Púrpura (Complementarios luminosos)
    {
        background: [10, 0, 15],
        spine: {
            color: [255, 255, 30, 150],
            glowColor: [150, 30, 255, 80],
        },
        segment: {
            color_start: [100, 0, 150],
            color_end: [255, 220, 0],
            stroke_alpha: 240,
            glow_alpha: 65,
        },
        limb: {
            color_start: [180, 100, 255],
            color_end: [255, 255, 100],
        },
        filament: {
            color: [255, 255, 240, 120],
            end_point_color: [255, 255, 255, 180],
        },
        atmosphere: {
            color: [40, 10, 60, 25],
        }
    },
    
    // Paleta 4: Cian-Magenta (Complementarios electrónicos)
    {
        background: [0, 0, 0],
        spine: {
            color: [0, 255, 255, 150],
            glowColor: [255, 0, 255, 80],
        },
        segment: {
            color_start: [0, 150, 200],
            color_end: [200, 0, 150],
            stroke_alpha: 250,
            glow_alpha: 80,
        },
        limb: {
            color_start: [100, 255, 255],
            color_end: [255, 100, 255],
        },
        filament: {
            color: [255, 255, 255, 140],
            end_point_color: [255, 255, 255, 200],
        },
        atmosphere: {
            color: [100, 50, 150, 30],
        }
    },
    
    // Paleta 5: Verde-Magenta (Naturaleza vs Neón)
    {
        background: [0, 10, 5],
        spine: {
            color: [0, 255, 100, 150],
            glowColor: [255, 50, 200, 85],
        },
        segment: {
            color_start: [0, 180, 60],
            color_end: [220, 0, 140],
            stroke_alpha: 245,
            glow_alpha: 75,
        },
        limb: {
            color_start: [50, 255, 150],
            color_end: [255, 100, 220],
        },
        filament: {
            color: [240, 255, 245, 125],
            end_point_color: [255, 255, 255, 185],
        },
        atmosphere: {
            color: [30, 80, 50, 28],
        }
    },
    
    // Paleta 6: Naranja-Índigo (Fuego vs Profundidad)
    {
        background: [5, 0, 20],
        spine: {
            color: [255, 100, 0, 150],
            glowColor: [50, 0, 150, 85],
        },
        segment: {
            color_start: [180, 60, 0],
            color_end: [30, 0, 120],
            stroke_alpha: 245,
            glow_alpha: 70,
        },
        limb: {
            color_start: [255, 140, 50],
            color_end: [100, 50, 200],
        },
        filament: {
            color: [255, 245, 230, 125],
            end_point_color: [255, 255, 255, 185],
        },
        atmosphere: {
            color: [120, 30, 60, 28],
        }
    },
    
    // Paleta 7: Lima-Violeta (Ácido vs Místico)
    {
        background: [8, 0, 12],
        spine: {
            color: [150, 255, 0, 150],
            glowColor: [120, 0, 200, 85],
        },
        segment: {
            color_start: [100, 180, 0],
            color_end: [80, 0, 140],
            stroke_alpha: 245,
            glow_alpha: 65,
        },
        limb: {
            color_start: [180, 255, 50],
            color_end: [160, 50, 220],
        },
        filament: {
            color: [250, 255, 230, 125],
            end_point_color: [255, 255, 255, 185],
        },
        atmosphere: {
            color: [60, 40, 80, 28],
        }
    },
    
    // Paleta 8: Turquesa-Coral (Océano vs Arrecife)
    {
        background: [0, 8, 10],
        spine: {
            color: [0, 200, 180, 150],
            glowColor: [255, 100, 80, 85],
        },
        segment: {
            color_start: [0, 140, 120],
            color_end: [200, 60, 40],
            stroke_alpha: 245,
            glow_alpha: 72,
        },
        limb: {
            color_start: [50, 220, 200],
            color_end: [255, 130, 100],
        },
        filament: {
            color: [240, 255, 250, 125],
            end_point_color: [255, 255, 255, 185],
        },
        atmosphere: {
            color: [40, 100, 90, 28],
        }
    },
    
    // Paleta 9: Fucsia-Lima (Neón Ultra)
    {
        background: [0, 0, 0],
        spine: {
            color: [255, 0, 150, 150],
            glowColor: [150, 255, 0, 90],
        },
        segment: {
            color_start: [200, 0, 100],
            color_end: [100, 200, 0],
            stroke_alpha: 255,
            glow_alpha: 85,
        },
        limb: {
            color_start: [255, 50, 180],
            color_end: [180, 255, 50],
        },
        filament: {
            color: [255, 255, 255, 140],
            end_point_color: [255, 255, 255, 200],
        },
        atmosphere: {
            color: [150, 80, 100, 35],
        }
    },
    
    // Paleta 10: Dorado-Azul Marino (Lujo vs Elegancia)
    {
        background: [0, 5, 15],
        spine: {
            color: [255, 200, 0, 150],
            glowColor: [0, 50, 150, 85],
        },
        segment: {
            color_start: [200, 150, 0],
            color_end: [0, 30, 100],
            stroke_alpha: 245,
            glow_alpha: 68,
        },
        limb: {
            color_start: [255, 220, 50],
            color_end: [50, 80, 180],
        },
        filament: {
            color: [255, 250, 230, 125],
            end_point_color: [255, 255, 255, 185],
        },
        atmosphere: {
            color: [80, 60, 100, 28],
        }
    }
];