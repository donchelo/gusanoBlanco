// Archivo índice para exportar todas las criaturas
// Esto facilita la importación y organización de las criaturas

// Clase base
export { default as Creature } from './base/creature.js';

// Tipos de gusanos
export { default as BigWorm } from './worms/big_worm.js';
export { default as SmallWorm } from './worms/small_worm.js';

// Función para crear criaturas por tipo
export function createCreature(type, x, y, options = {}) {
    switch(type) {
        case 'big_worm':
            return new BigWorm(x, y, options);
        case 'small_worm':
            return new SmallWorm(x, y, options);
        default:
            console.warn(`Tipo de criatura desconocido: ${type}`);
            return new SmallWorm(x, y, options);
    }
} 