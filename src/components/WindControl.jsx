import { useState } from 'react'

// Раскладка компаса как сетка 3×3
const COMPASS = [
    ['NW', 'N', 'NE'],
    ['W', null, 'E'],
    ['SW', 'S', 'SE'],
];

// подписи
const DIR_LABELS = {
    N: 'North', NE: 'North-East', E: 'East', SE:'South-East', S: 'South', SW: 'South-West', W: 'West', NW: 'North-West',
};

// стрелки по направлениям
const ARROWS = {
  N: '↑', NE: '↗', E: '→', SE: '↘',
  S: '↓', SW: '↙', W: '←', NW: '↖',
};

export default function WindControl({ wind, onParamChange }) {
    const [direction, setDirection] = useState(wind.direction);
    const [strength, setStrength] = useState(wind.strength);

    // нажатие на одну из 8 кнопок компаса.
    function handleDirection(dir) {
        setDirection(dir);
        onParamChange('setWindDirection', dir);
        }

    // слайдер силы ветра
    function handleStrength(value) {
        const v = parseFloat(value);
        setStrength(v);
        onParamChange('setWindStrength', v)
        }

    return (
        <div className="panel">
            <h3 className="panel-title">Wind</h3>

            <div className="compass">
                {COMPASS.map((row, ri) =>
                    row.map((dir, ci) => {
                        if (dir === null) {
                            return (
                                <div key={`${ri}-${ci}`} className="compass-center">
                                    </div>
                                );
                            }
                        return (
                            <button
                            key={dir}
                            title={DIR_LABELS[dir]}
                            onClick={() => handleDirection(dir)}
                            className={`compass-btn ${direction === dir ? 'active' : ''}`}
                            >
                            {ARROWS[dir]}
                            </button>
                            );
                        })
                    )}
                </div>

        <div className="wind-direction-label">
        Direction: <strong>{DIR_LABELS[direction]}</strong>
      </div>

      <div className="slider-row" style={{ marginTop: 14 }}>
        <div className="slider-header">
          <label>Wind strength</label>
          <span className="slider-value">{strength.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={strength}
          onChange={e => handleStrength(e.target.value)}
        />
      </div>

      {strength === 0 && (
        <p className="wind-hint">At strength 0, wind has no effect on fire spread</p>
      )}
    </div>
  );
}