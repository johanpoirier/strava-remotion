import React, {useCallback, useEffect, useState} from 'react';
import './style.css';
import 'leaflet/dist/leaflet.css';
import {drawActivityMarker, drawActivityRoute, generateMap} from '../../../services/leaflet';
import {useCurrentFrame} from 'remotion';

export default function ActivityMap({id, pointsPerFrame, coordinates}: { id: string, pointsPerFrame: number, coordinates: any[] }) {
    const frame = useCurrentFrame();

    const [map, setMap] = useState<any>();
    // const [handle] = useState(() => delayRender(`[ActivityMap] Generate map ${id}`));

    const generateActivityMap = useCallback(() => {
        const start = Date.now();
        const leafletMap: any = generateMap(`map-${id}`, coordinates, () => {
            console.log(`[ActivityMap] map ${id} generated`, Date.now() - start);
            // continueRender(handle);
        });
        setMap(leafletMap);
        drawActivityMarker(leafletMap, coordinates[0]);
    }, [coordinates, id]);

    useEffect(() => {
        generateActivityMap();
    }, [generateActivityMap]);

    useEffect(() => {
        if (map && frame > 0) {
            const from = frame * pointsPerFrame;
            const to = (frame + 1) * pointsPerFrame + 1;
            drawActivityRoute(map, coordinates.slice(from, to));
            if (to > coordinates.length) {
                drawActivityMarker(map, coordinates[coordinates.length - 1], 'end');
            }
        }
    }, [map, coordinates, frame, pointsPerFrame]);

    return (<div id={`map-${id}`} className="ActivityMap"></div>);
}