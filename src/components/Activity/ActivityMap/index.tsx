import React, {useCallback, useEffect, useState} from 'react';
import './style.css';
import {drawActivityMarker, drawActivityRoute, generateMap} from '../../../services/leaflet';
import {continueRender, delayRender, useCurrentFrame} from 'remotion';

export default function ActivityMap({id, pointsPerFrame, coordinates}: { id: string, pointsPerFrame: number, coordinates: any[] }) {
    const frame = useCurrentFrame();

    const [map, setMap] = useState<any>();

    const [handle] = useState(() => {
        // console.log('[ActivityMap] delay render');
        return delayRender();
    });

    const generateActivityMap = useCallback(() => {
        const leafletMap = generateMap(`map-${id}`, coordinates, () => {
            // console.log('[ActivityMap] continue render');
            continueRender(handle);
        });
        setTimeout(() => {
            // console.log('[ActivityMap] continue render');
            continueRender(handle);
        }, 2000);
        setMap(leafletMap);
        drawActivityMarker(leafletMap, coordinates[0]);
    }, [coordinates, handle, id]);

    useEffect(() => {
        generateActivityMap();
    }, [generateActivityMap]);

    useEffect(() => {
        if (map) {
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