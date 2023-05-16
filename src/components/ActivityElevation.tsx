import Chart from 'chart.js/auto';
import {useEffect, useMemo} from 'react';

const totalDuration = 1800;

export default function ActivityElevation({distances, elevations}: { distances: number[], elevations: number[] }) {
    const elevationId = `elevation-${Math.round(Math.random() * 100000)}`;

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
        new Chart(
            // @ts-ignore
            document.getElementById(elevationId),
            {
                type: 'line',
                data: {
                    labels: distances,
                    datasets: [{
                        data: elevations,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
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
        )
    }, []);

    return (<canvas id={elevationId} className="ActivityElevation" height="80px"></canvas>);
}