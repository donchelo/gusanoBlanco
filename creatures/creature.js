class Creature {
    constructor() {
        if (this.constructor === Creature) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    update(allCreatures) {
        throw new Error("Method 'update(allCreatures)' must be implemented.");
    }

    draw() {
        throw new Error("Method 'draw()' must be implemented.");
    }
} 