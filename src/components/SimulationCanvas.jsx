import { useRef, useEffect, useState } from 'react';
import { STATE, TERRAIN } from '../simulation/Cell.js';

// Размер одной клетки в пикселях
const CELL_SIZE = 8;

// Цвет заливки клетки в зависимости от состояния
const STATE_COLORS = {
    [STATE.EMPTY]: '#1a1a18',
    [STATE.TREE]: '#3b6d11',
    [STATE.FIRE]: '#d85a30',
    [STATE.BURNED]: '#2a1a0a',
};

// Полупрозрачная подсветка типа местности
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

    // Рисует всю сетку целиком
    function draw() {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const grid = simRef.current.getGrid();
        const size = simRef.current.size;

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const cell = grid[y][x];


                ctx.fillStyle = STATE_COLORS[cell.state];
                ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

                const overlay = TERRAIN_OVERLAY[cell.terrain];
                if (overlay) {
                    ctx.fillStyle = overlay;
                    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                    }
                }
            }
        }
    // координаты клика мыши в координаты клетки
    function getCellCoords(e) {
            const rect = canvasRef.current.getBoundingClientRect();
            const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
            const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);
            return { x, y };
        }
    // Красит местность вокруг клетки
    function paintTerrain(cx, cy) {
        const sim = simRef.current;
        const size = sim.size;

        for (let dy = -brushSize; dy <= brushSize; dy++) {
        for (let dx = -brushSize; dx <= brushSize; dx++) {
        const nx = cx + dx;
        const ny = cy + dy;
        if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
          sim.setTerrain(nx, ny, brushTerrain);
        }
      }
    }
    draw(); // сразу перерисовываем чтобы оверлей был виден
   }

   function handleMouseDown(e) {
        if (running) return; // блокируем кисть во время симуляции
        isPainting.current = true;
        const { x, y } = getCellCoords(e);
        paintTerrain(x, y);
   }

    // Продолжение рисования при движении мыши с зажатой кнопкой
    function handleMouseMove(e) {
        if (!isPainting.current || running) return;
        const { x, y } = getCellCoords(e);
        paintTerrain(x, y);
        }

    // Отпустили кнопку мыши прекращаем рисовать
    function handleMouseUp() {
        isPainting.current = false;
        }

    // точечный поджиг при клике на канвасе
    function handleClick(e) {
        if (!running) return;
        const { x, y } = getCellCoords(e);
        const grid = simRef.current.getGrid();
        if (grid[y]?.[x]?.isTree?.()) {
            grid[y][x].state = STATE.FIRE;
            draw();
            }
        }

    const canvasSize = simRef.current.size * CELL_SIZE;

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={canvasSize}
                height={canvasSize}
                onClick={handleClick}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{
                    display: 'block',
                    cursor: running ? 'crosshair' : 'cell',
                    border: '1px solid #333',
                    }}
                />
                {!running && (
                    <div className="brush-panel">
                        <span className="brush-label">Brush:</span>
                        <div className="brush-buttons">
                            {[TERRAIN.NORMAL, TERRAIN.WET, TERRAIN.DRY].map(t => (
                                <button
                                    key={t}
                                    onClick={() => setBrushTerrain(t)}
                                    className={`brush-btn ${brushTerrain === t ? 'active' : ''}`}
                                >
                                {t === TERRAIN.NORMAL ? 'Normal' : t == TERRAIN.WET ? 'Wet' : 'Dry'}
                                </button>
                                ))}
                            </div>
                            <label className="brush-size-label">
                                Brush size: {brushSize * 2 + 1}×{brushSize * 2 + 1}
                                <input
                                    type="range"
                                    min={0}
                                    max={4}
                                    value={brushSize}
                                    onChange={e => setBrushSize(parseInt(e.target.value))}
                                    />
                                </label>
                            </div>
                    )}
                </div>
            );
    }
