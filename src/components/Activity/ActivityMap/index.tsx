import React, {useEffect, useState} from 'react';
import './style.css';
import {drawActivityMarker, drawActivityRoute, generateMap} from '../../../services/leaflet';
import {useCurrentFrame} from 'remotion';

export default function ActivityMap({pointsPerFrame, coordinates}: { pointsPerFrame: number, coordinates: any[] }) {
    const mapId = `map-${Math.round(Math.random() * 100000)}`;
    const frame = useCurrentFrame();

    const [rendered, setRendered] = useState(false);
    const [map, setMap] = useState<any>();

    useEffect(() => {
        if (!rendered) {
            setRendered(true);
            const leafletMap = generateMap(mapId, coordinates);
            setMap(leafletMap);
            drawActivityMarker(leafletMap, coordinates[0]);
        }
    }, [coordinates, mapId, rendered]);

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

    return (<div id={mapId} className="ActivityMap"></div>);
}