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
}