// типы местности
export const TERRAIN = {
    NORMAL: 'NORMAL',
    WET: 'WET',
    DRY: 'DRY',
};

// вероятность возгорания для каждой местности
const TERRAIN_MULTIPLIER = {
    [TERRAIN.NORMAL]: 1.0,
    [TERRAIN.WET]: 0.4,
    [TERRAIN.DRY]: 1.6,
};

// состояние клетки
export const STATE = {
    EMPTY: 'EMPTY',
    TREE: 'TREE',
    FIRE: 'FIRE',
    BURNED: 'BURNED',
};

export class Cell {
    constructor(x, y, terrain = TERRAIN.NORMAL) {
        this.x = x;
        this.y = y;
        this.terrain = terrain;
        this.state = STATE.EMPTY;
    }


// влияние местности на вероятность возгорания

    terrainMultiplier(){
        return TERRAIN_MULTIPLIER[this.terrain];
    }

    isEmpty() {
        return this.state === STATE.EMPTY;
    }

    isTree() {
        return this.state === STATE.TREE;
    }

    isFire() {
        return this.state === STATE.FIRE;
    }

    isBurned() {
        return this.state === STATE.BURNED;
    }
}