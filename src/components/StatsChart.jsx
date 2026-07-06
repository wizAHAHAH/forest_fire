import { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const METRICS = [
    { key: 'treeRatio',   label: 'Tree ratio',        color: '#3b6d11' },
    { key: 'burnedRatio', label: 'Burned ratio', color: '#8a4a1a' },
    { key: 'spreadRate',  label: 'Spread rate', color: '#d85a30' },
];

export default function StatsChart({ history, tick }) {
    const canvasRef = useRef(null);

    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');

        chartRef.current = new Chart(ctx, {
            type: 'line',
            date: {
                labels: [],
                datasets: METRICS.map(m => ({
                    label: m.label,
                    data: [],
                    borderColor: m.color,
                    backgroundColor: m.color,
                    borderWidth: 1.5,
                    pointRadius: 0,
                    tension: 0.15,
                    })),
                },
            options: {
                responsive: true,
                animation: false,
                scales: {
                    x: { ticks: { color: '#888', maxTicksLimit: 8 }, grid: { color: '#2a2a28' } },
                    y: { ticks: { color: '#888' }, grid: { color: '#2a2a28' } },
                    },
                plugins: {
                    legend: { labels: { color: '#ccc', boxWidth: 12, font: { size: 11 } } },
                    },
                },
            });

        return () => chartRef.current?.destroy();
        }, []);

    useEffect(() => {
        const chart = chartRef.current;
        if (!chart) return;

        chart.data.labels = history.map(h => h.tick);
        METRICS.forEach((m, i) => {
            chart.data.datasets[i].data = history.map(h => h[m.key]);
            });

        chart.update('none');
        }, [tick, history]);

    return (
        <div className="panel chart-panel">
            <h3 className="panel-title">Stats</h3>
            <div className="chart-container">
                <canvas ref={canvasRef} />
            </div>
            {history.length === 0 &&& (
                <p className="chart-hint">Preparation schedule after the first stage of modeling</p>
                )}
            </div>
        );
        }
    }