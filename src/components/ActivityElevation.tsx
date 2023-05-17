import Chart from 'chart.js/auto';
import {useEffect, useMemo, useState} from 'react';
import {useCurrentFrame} from 'remotion';
import {DISPLAY_FRAME_RATIO, ACTIVITY_VIDEO_DURATION} from '../tools/constants';
import './ActivityElevation.css';

const totalDuration = DISPLAY_FRAME_RATIO * ACTIVITY_VIDEO_DURATION;

export default function ActivityElevation({distances, elevations}: { distances: number[], elevations: number[] }) {
    const elevationId = `elevation-${Math.round(Math.random() * 100000)}`;

    const frame = useCurrentFrame();
    const [chart, setChart] = useState<any>(null);

    const animation = useMemo(() => {
        const delayBetweenPoints = totalDuration / distances.length;
        const previousY = (ctx: any) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
        return {
            x: {
                type: 'number',
                easing: 'linear',
                duration: delayBetweenPoints,
                from: NaN, // the point is initially skipped
                delay(ctx: any) {
                    if (ctx.type !== 'data' || ctx.xStarted) {
                        return 0;
                    }
                    ctx.xStarted = true;
                    return ctx.index * delayBetweenPoints;
                }
            },
            y: {
                type: 'number',
                easing: 'linear',
                duration: delayBetweenPoints,
                from: previousY,
                delay(ctx: any) {
                    if (ctx.type !== 'data' || ctx.yStarted) {
                        return 0;
                    }
                    ctx.yStarted = true;
                    return ctx.index * delayBetweenPoints;
                }
            }
        };
    }, [distances]);

    useEffect(() => {
        if (frame === 0) {
            return;
        }
        if (chart) {
            return;
        }
        setChart(new Chart(
            // @ts-ignore
            document.getElementById(elevationId),
            {
                type: 'line',
                data: {
                    labels: distances,
                    datasets: [{
                        data: elevations,
                        fill: true,
                        backgroundColor: 'rgb(255,227,215)',
                        borderColor: 'rgb(255,128,65)',
                        borderWidth: 1,
                        tension: 0.1
                    }]
                },
                options: {
                    animation,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                            ticks: {
                                display: false,
                            }
                        }
                    }
                }
            }
        ));
    }, [chart, frame, animation, distances, elevations, elevationId]);

    return (<canvas id={elevationId} className="ActivityElevation" height="80px"></canvas>);
}