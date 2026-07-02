import { useRef, useState, useEffect, useCallback } from 'react';
import { Simulation } from './simulation/Simulation.js';
import SimulationCanvas from './components/SimulationCanvas.jsx';
import ControlPanel from './components/ControlPanel.jsx';
import WindControl from './components/WindControl.jsx';
import StatsChart from './components/StatsChart.jsx';
import './App.css';

const SIZE = 60;

export default function App() {
    const simRef = useRef(new Simulation(SIZE, 0.6));

    const [running. setRunning] = useState(false);
    const [tick, setTick] = useState(0);

    useEffect() => {
        if (!running) return;

        const interval = setInterval(() => {
            simRef.current.step();
            setTick(t => t + 1);
            }, simRef.current.params.speed);
        return () => clearInterval(interval);
        }, [running]);

    const handleStartPause = () => {
        setRunning(r => !r);
        };

    const handleIgnite = () => {
        simRef.currentq.ignite();
        setTick(t => t + 1);
        };

    const handleReset = () => {
        setRunning(false);
        simRef.current.reset();
        setTick(0);
        };

    const handleParamChange = useCallback((param, value) => {
        simRef.current[param](value);
        }, []);

    return (
        <div className="app">
            <h1>Forest Fire Simulation</h1>
            <div className="layout">
                <div className="left">
                    <SimulationCanvas
                    simRef={simRef}
                    running={running}
                    tick={tick}
                    />
                    <StatsChart history={simRef.current.history} tick={tick} />
                    </div>
                    <div className="right">
                        <div className="action-buttons">
                            <button onClick={handleStartPause}>
                                {running ? 'Pause' : 'Start'}
                                </button>
                                <button onClick={handleIgnite} disabled={!running}>
                                    Burn
                                </button>
                                <button onClick={handleReset}>
                                    Reset
                                </button>
                                </div>
                                <ControlPanel
                                    params={simRef.current.params}
                                    onParamChange={handleParamChange}
                                    running={running}
                                />
                                <WindControl
                                    wind={simRef.current.params}
                                    onParamChange={handleParamChange}
                                />
                            </div>
                        </div>
                    </div>
        );
    }