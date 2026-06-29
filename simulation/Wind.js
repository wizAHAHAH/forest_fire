const WIND_VECTORS = {
    N: { dx: 0, dy: -1 },
    NE: { dx: 1, dy: -1 },
    E: { dx: 1, dy: 0 },
    SE: { dx: 1, dy: 1 },
    S: { dx: 0, dy: 1 },
    SW: { dx: -1, dy: 1 },
    W: { dx: -1, dy: 0 },
    NW: { dx: -1, dy: -1 },
};

export class Wind {
    constructor(direction = 'N', strength = 0) {
        this.direction = direction;
        this.strength = strength;
    }

    setDirection(direction) {
        this.direction = direction;
    }

    setStrength(strength) {
        this.strength = strength;
    }

    multiplierFor(fromCell, toCell) {
        const a = {
            dx: toCell.x - fromCell.x,
            dy: toCell.y - fromCell.y,
        };

        const b = WIND_VECTORS[this.direction];
        
        const dot = a.dx * b.dx + a.dy * b.dy;

        const magA = Math.hypot(a.dx, a.dy);
        const magB = Math.hypot(b.dx, b.dy);


        const cos = dot / (magA * magB);

        return 1 + this.strength * cos;
    }
}