import { useRef, useEffect, useState } from 'react';
import { STATE, TERRAIN } from '../simulation/Cell.js';

const CELL_SIZE = 8;

const STATE_COLORS = {
    [STATE.EMPTY]: '#1a1a18',
    [STATE.TREE]: '#3b6d11',
    [STATE.FIRE]: '#d85a30',
    [STATE.BURNED]: '#2a1a0a',
};


const TERRAIN_OVERLAY = {
  [TERRAIN.NORMAL]: null,
  [TERRAIN.WET]:    'rgba(30, 100, 200, 0.25)',
  [TERRAIN.DRY]:    'rgba(200, 150, 30, 0.25)',
};

export default function SimulationCanvas({ simRef, running, tick }) {
    const canvasRef = useRef(null);

    const [brushTerrain, setBrushTerrain] = useState(TERRAIN.WET);

    const [brushSize, setBrushSize] = useState(1);

    const isPainting = useRef(false);

    useEffect(() => {
        draw();
        }, [tick]);
    
    useEffect(() => {
        draw();
        }, []);
    }
