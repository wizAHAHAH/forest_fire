import { Cell, STATE } from './Cell.js'

export function clamp (value, min = 0, max = 1) {
    return Math.max(min, Math.min(max, value));
}

export class Tree extends Cell {
    constructor(x, y, terrain) {
        super(x, y, terrain);
        this.state = STATE.TREE;
    }
}