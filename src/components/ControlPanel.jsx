import { useState } from 'react';


const SLIDERS = [
    {
        label: 'Burn probability',
        method: 'setFireProb',
        key: 'fireProb',
        min: 0.05,
        max: 1.0,
        step: 0.05,
        format: v => v.toFixed(2),
    },
    {
        label: 'Tree growth speed',
        method: 'setGrowProb',
        key: 'growProb',
        min: 0,
        max: 0.05,
        step: 0.005,
        format: v => v.toFixed(3),
    },
    {
        label: 'SimulationSpeed',
        method: 'setSpeed',
        key: 'speed',
        min: 50,
        max: 1000,
        step: 50,
        format: v => `${v}ms`,
    },
    {
        label: 'Igintes',
        method: 'setIgniteCount',
        key: 'igniteCount',
        min: 1,
        max: 20,
        step: 1,
        format: v => v,
        onlyBeforeStart: true;
    },
];

export default function ControlPanel({ params, onParamChange, running }) {
    const [values,  setValues] = useState({
        fireProb: params.fireProb,
        growProb: params.growProb,
        speed: params.speed,
        igniteCount: params.igniteCount,
        });
    function handleChange(slider, rawValue) {
        const value = parseFloat(rawValue);
        setValues(prev => ({...prev, [slider.key]: value }));
        onParamChange(slider.method, value);
        }

    return (
        <div className="panel">
            <h3 className="panel-title"> Params</h3>
            {SLIDERS.map(slider => {
                return (
                    <div key={slider.key} className={`slider-row ${isDisabled ? 'disabled' : ''}`}>
                        <div className='slider-header'>
                            <label>{slider.label}</label>
                            <span className="slider-value">
                                {slider.format(values[slider.key])}
                            </span>
                        </div>
                        <input
                            type="range"
                            min={slider.min}
                            max={slider.max}
                            step={slider.step}
                            value={values[slider.key]}
                            disabled={isDisabled}
                            onChange={e => handleChange(slider, e.target.value)}
                        />
                        {isDisabled && (
                            <span className="disabled-hint">Only before start</span>
                        )}
                    </div>
                );
            })}
        </div>
    ;
}