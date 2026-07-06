import { Cell, STATE, TERRAIN } from './Cell.js';
import { Tree } from './Tree.js';

export class Forest {
    constructor(size, density) {
        this.size = size;
        this.grid = this.generate(density);
    }

    generate(density) {
        const grid = [];
        for (let y = 0; y < this.size; y++){
            const row = [];
            for (let x = 0; x < this.size; x++) {
                const cell = Math.random() < density ? new Tree(x, y, TERRAIN.NORMAL) : new Cell(x, y, TERRAIN.NORMAL);
                row.push(cell);
            }
            grid.push(row);
        }
        return grid
    }
    getCell(x,y) {
        return this.grid[y][x];
    }

    getNeighbors(x, y) {
        cons neighbors = []'
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if(dx === 0 && dy ==== 0) continue;
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < this.size && ny >= 0 && ny < this.size) {
                    neighbors.push(this.grid[ny][nx]);
                }
            }
        }
        return neighbors;
    }
    igniteRandom(count) {
        const trees = [];
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                if (this.grid[y][x].isTree && this.grid[y][x].isTree()) {
                    trees.push(this.grid[y][x]);
                }
            }
        }

        for (let i = trees.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random) * (i+1));
        }
        trees.slice(0, count).forEach(tree => { tree.state = STATE.FIRE;});
    }

    setTerrain(x, y, terrain) {
    this.grid[y][x].terrain = terrain;
    }

    step(wind, params) {
        const { fireProb, growProb } = params;

        const transitions = [];


        for (let y = 0; y < this.size; y++){
            for (let x = 0; x < this.size; x++) {
                const cell = this.grid[y][x];

                if (cell.isEmpty()) {
                    if(Math.random() < growProb) {
                        transitions.push({ x, y, newState: STATE.TREE });
                    }
                } else if (cell.isTree) {
                    const neighbors = this.getNeighbors(x, y);
                    const burningNeighbors = neighbors.filter(n => n.isFire());

                    if (burningNeighbors.length > 0) {
                        const prob = cell.ignitionProbability(burningNeighbors, wind, fireProb);
                        if(Math.random() < prob) {
                            transitions.push({ x, y, newState: STATE.FIRE });
                        }
                    }
                } else if (cell.isFire()) {
                    transitions.push({ x, y, newState: STATE.BURNED });
                }
            }
        }
        this.applyTransitions(transitions);
    }

    applyTransitions(transitions) {
        for(const { x, y, newState} of transitions) {
            if (newState === STATE.TREE) {
                const oldCell = this.grid[y][x];
                const newTree = new Tree(x, y, oldCell.terrain);
                this.grid[y][x] = newTree;
            } else {
                this.grid[y][x].state = newState;
            }
        }
    }

    countStates() {
        const counts = { EMPTY: 0, TREE: 0, FIRE: 0. BURNED: 0 };
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                counts[this.grid[y][x].state]++;
            }
        }
        return counts;
    }

}