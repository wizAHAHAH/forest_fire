import { Forest } from './Forest.js'
import { Wind } from './Wind.js'
import { STATE } from './Cell.js'

export class Simulation {
    constructor(size, density) {
        this.size = size;

        // настраиваемые  по умолчанию
        this.params = {
            density,
            fireProb: 0.4,
            growProb: 0.01,
            igniteCount: 3,
            speed: 200,
            lightningProb: 0.0002,
        };


        this.forest = new Forest(size, density);
        this.wind = new Wind('N', 0);

        this.tick = 0;
        this.running = false;

        this.history = [];
        this.prevFireCount = 0;
    }

    // один тик симуляции
    step() {
        this.forest.step(this.wind, this.params);
        this.tick++;
        this.recordStats();
    }

    // считает текущ статистику
    recordStats() {
        const counts = this.forest.countStates();
        const total = this.size * this.size;

        const treeRatio = counts[STATE.TREE] / total;
        const burnedRatio = counts[STATE.BURNED] / total;

        const spreadRate = counts[STATE.FIRE] - this.prevFireCount;
        this.prevFireCount = counts[STATE.FIRE];

        this.history.push({
            tick: this.tick,
            treeRatio: parseFloat(treeRatio.toFixed(3)),
            burnedRatio: parseFloat(burnedRatio.toFixed(3)),
            spreadRate,
            counts,
        });

        if (this.history.length > 500) {
            this.history.shift();
        }
    }

    // Поджигает params.igniteCount случайных деревьев
    ignite() {
        this.forest.igniteRandom(this.params.igniteCount);
    }

    // сброс симуляции
    reset() {
        this.forest = new Forest(this.size, this.params.density);
        this.wind = new Wind('N', 0);
        this.tick = 0;
        this.running = false;
        this.history = [];
        this.prevFireCount = 0;
    }

    // возвращ последнюю точку статист
    getCurrentStats() {
        if (this.history.length === 0) {
            return { counts: { EMPTY: 0, TREE: 0, FIRE: 0, BURNED: 0}, treeRatio: 0, burnedRatio: 0, spreadRate: 0 };
        }
        return this.history[this.history.length - 1];
    }

    // сеттеры параметров
    setFireProb(value) { this.params.fireProb = value; }
    setGrowProb(value) { this.params.growProb = value; }
    setSpeed(value) { this.params.speed = value; }
    setIgniteCount(value) { this.params.igniteCount = value; }

    setWindDirection(dir) { this.wind.setDirection(dir); }
    setWindStrength(value) { this.wind.setStrength(value); }

    setTerrain(x, y, terrain) {
        this.forest.setTerrain(x, y, terrain);
    }

    getGrid() {
        return this.forest.grid;
    }

}