import {useCallback, useEffect, useMemo, useRef} from 'react';
import {useCurrentFrame} from 'remotion';
import {DISPLAY_FRAME_RATIO, ACTIVITY_VIDEO_DURATION, FRAME_PER_SECOND} from '../../../tools/constants';
import './style.css';

const CANVAS_HEIGHT = 80;
const CANVAS_WIDTH = 1220;
const MIN_ELEVATION_GAIN = 50;

export default function ActivityElevation({id, times, elevations}: {
    id: string,
    times: number[],
    elevations: number[]
}) {
    const elevationId: string = useMemo(() => `elevation-${id}`, [id]);
    const frame = useCurrentFrame();
    const canvasRef = useRef(null);

    const timeRatio: number = useMemo(() => {
        return (times[times.length - 1] - times[0]) / CANVAS_WIDTH;
    }, [times]);

    const elevationMin: number = useMemo(() => Math.min(...elevations), [elevations]);
    const elevationMax: number = useMemo(() => {
        const max: number = Math.max(...elevations);
        const elevationGain: number = max - elevationMin;
        if (elevationGain < MIN_ELEVATION_GAIN) {
            return max + MIN_ELEVATION_GAIN - elevationGain;
        }
        return max;
    }, [elevations, elevationMin]);

    const elevationRatio: number = useMemo(() => {
        return (elevationMax - elevationMin) / (CANVAS_HEIGHT - 10);
    }, [elevationMax, elevationMin]);

    const pointsPerFrame = useMemo(() => {
        return Math.ceil(times.length / (DISPLAY_FRAME_RATIO * ACTIVITY_VIDEO_DURATION * FRAME_PER_SECOND / 1000));
    }, [times])

    const getPointCoordinates = useCallback((x: number, y: number) => {
        return {x: x / timeRatio, y: (5 + (y - elevationMin) / elevationRatio)};
    }, [timeRatio, elevationRatio, elevationMin]);

    const drawLine = useCallback((ref: any, xData: number[], yData: number[]) => {
        const canvasContext = ref.current.getContext('2d');
        canvasContext.lineWidth = 4;
        canvasContext.fillStyle = '#e86322';
        canvasContext.beginPath();

        const firstPoint = getPointCoordinates(xData[0], yData[0]);
        canvasContext.moveTo(firstPoint.x - 1, CANVAS_HEIGHT);
        canvasContext.lineTo(firstPoint.x - 1, CANVAS_HEIGHT - firstPoint.y);

        xData.forEach((x, index) => {
            if (index === 0) return;
            const nextPointCoordinates = getPointCoordinates(xData[index], yData[index]);
            canvasContext.lineTo(nextPointCoordinates.x, CANVAS_HEIGHT - nextPointCoordinates.y);
        });

        const lastPoint = getPointCoordinates(xData[xData.length - 1], yData[yData.length - 1]);
        canvasContext.lineTo(lastPoint.x, CANVAS_HEIGHT);
        canvasContext.lineTo(firstPoint.x, CANVAS_HEIGHT);

        canvasContext.fill();
    }, [getPointCoordinates]);

    useEffect(() => {
        const from = frame * pointsPerFrame;
        const to = (frame + 1) * pointsPerFrame + 1;
        if (from > times.length) {
            return;
        }
        const xData = times.slice(from, to);
        const yData = elevations.slice(from, to);
        drawLine(canvasRef, xData, yData);
    }, [drawLine, elevations, times, frame, canvasRef, pointsPerFrame]);

    return (
        <div className="ActivityElevation">
            <div className="elevation-axis">
                <span>{Math.round(elevationMax)} m</span>
                <span>{Math.round(elevationMin)} m</span>
            </div>
            <canvas id={elevationId} ref={canvasRef} width={`${CANVAS_WIDTH}px`} height={`${CANVAS_HEIGHT}px`}></canvas>
        </div>
    );
}