import { useState } from 'react'

const COMPASS = [
    ['NW', 'N', 'NE'],
    ['W', null, 'E'],
    ['SW', 'S', 'SE'],
];


const DIR_LABELS = {
    N: 'North', NE: 'North-East', E: 'East', SE:'South-East', S: 'South', SW: 'South-West', W: 'West', NW: 'North-West',
};

export default function WindControl({ wind, onParamChange }) {
    const [direction, setDirection] = useState(wind.direction);
    const [strength, setStrength] = useState(wind.strength);

    function handleDirection(dir) {
        setDirection(dir);
        onParamChange('setWindDirection', dir);
        }

    function handleStrength(value) {
        const v = parseFloat(value);
        setStrength(v);
        onParamChange('setWindStrength', v)
        }

    return (
        <div className="panel">
            <h3 className="panel-title">Wind</h3>

            <div className="compass">
        )
    }