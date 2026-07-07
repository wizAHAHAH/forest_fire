import { Cell, STATE } from './Cell.js'

export function clamp(value, min = 0, max = 1) {
    return Math.max(min, Math.min(max, value));
}

export class Tree extends Cell {
    constructor(x, y, terrain) {
        super(x, y, terrain);
        this.state = STATE.TREE;
    }

    ignitionProbability(burningNeighbors, wind, baseFireProb) {
        if (burningNeighbors.length === 0) return 0;

        // вероятность НЕ загореться ни от одного соседа
        let survivalProb = 1;

        for (const neighbor of burningNeighbors) {
            const windMultiplier = wind.multiplierFor(neighbor, this);
            const terrainMultiplier = this.terrainMultiplier();

            // вероятность загореться именно от этого соседа
            const pFromThisNeighbor = clamp(baseFireProb * windMultiplier * terrainMultiplier);
            survivalProb *= (1 - pFromThisNeighbor);
        }

        return clamp(1 - survivalProb);
    }

    tryIgnite(burningNeighbors, wind, baseFireProb) {
        const p = this.ignitionProbability(burningNeighbors, wind, baseFireProb);
        if (Math.random() < p) {
            this.state = STATE.FIRE;
            return true;
        }
        return false
    }
}