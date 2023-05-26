import {useCallback, useEffect, useMemo, useRef} from 'react';
import {useCurrentFrame} from 'remotion';
import {DISPLAY_FRAME_RATIO, ACTIVITY_VIDEO_DURATION, FRAME_PER_SECOND} from '../../../tools/constants';
import './style.css';
import {drawActivityMarker, drawActivityRoute} from "../../../services/leaflet";

const totalDuration = DISPLAY_FRAME_RATIO * ACTIVITY_VIDEO_DURATION;

export default function ActivityElevation({id, times, elevations}: {
    id: string,
    times: number[],
    elevations: number[]
}) {
    const elevationId: string = useMemo(() => `elevation-${id}`, [id]);
    const frame = useCurrentFrame();
    const canvasRef = useRef(null);

    const timeRatio: number = useMemo(() => {
        return (times[times.length - 1] - times[0]) / 1000;
    }, [times]);

    const elevationMin: number = useMemo(() => Math.min(...elevations), [elevations]);
    const elevationRatio: number = useMemo(() => {
        return (Math.max(...elevations) - elevationMin) / 70;
    }, [elevations, elevationMin]);

    const pointsPerFrame = useMemo(() => {
        return Math.ceil(times.length / (DISPLAY_FRAME_RATIO * ACTIVITY_VIDEO_DURATION * FRAME_PER_SECOND / 1000));
    }, [times])

    const getPointCoordinates = useCallback((x: number, y: number) => {
        return {x: x / timeRatio, y: (5 + (y - elevationMin) / elevationRatio)};
    }, [timeRatio, elevationRatio, elevationMin]);

    const drawLine = useCallback((ref: any, xData: number[], yData: number[]) => {
        const canvasContext = ref.current.getContext('2d');
        canvasContext.lineWidth = 5;
        canvasContext.beginPath();

        const firstPoint = getPointCoordinates(xData[0], yData[0]);
        canvasContext.moveTo(firstPoint.x, firstPoint.y);
        xData.forEach((x, index) => {
            if (index === 0) return;
            const nextPointCoordinates = getPointCoordinates(xData[index], yData[index]);
            canvasContext.lineTo(nextPointCoordinates.x, nextPointCoordinates.y);
            canvasContext.stroke();
        });
        canvasContext.fill();
    }, [getPointCoordinates]);

    useEffect(() => {
        const from = frame * pointsPerFrame;
        const to = (frame + 1) * pointsPerFrame + 1;
        const xData = times.slice(from, to);
        const yData = elevations.slice(from, to);
        drawLine(canvasRef, xData, yData);
    }, [drawLine, elevations, times, frame, canvasRef, pointsPerFrame]);

    return (
        <div className="ActivityElevation">
            <canvas id={elevationId} ref={canvasRef} width="1280px" height="80px"></canvas>
        </div>
    );
}