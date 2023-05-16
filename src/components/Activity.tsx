import React, {useEffect, useMemo, useState} from "react";
import './Activity.css';
import {continueRender, delayRender, useCurrentFrame} from "remotion";
import {decodeEncodedPolyline, drawActivityMarker, drawActivityRoute, generateMap} from "../services/leaflet";
import {getActivityLogo} from "../tools/activity-logo";

export default function Activity({data, index}: {data: any, index: number}) {
    const mapId = `map-${index}`;
    const polyline = useMemo(() => decodeEncodedPolyline(data.map['summary_polyline']), [data.map]);
    const frame = useCurrentFrame();
    const coordinatesPerFrame = useMemo(() => {
        return Math.ceil(polyline.length / 55);
    }, [polyline])

    const [handle] = useState(() => delayRender());
    const [rendered, setRendered] = useState(false);
    const [map, setMap] = useState<any>();

    useEffect(() => {
        if (!rendered) {
            const currentMap = generateMap(mapId, polyline);
            setMap(currentMap);
            drawActivityMarker(currentMap, polyline[0]);
            setRendered(true);
        }
        continueRender(handle);
    }, [polyline, mapId, rendered]);

    useEffect(() => {
        if (map) {
            const from = frame * coordinatesPerFrame;
            const to = (frame + 1) * coordinatesPerFrame + 1;
            drawActivityRoute(map, polyline.slice(from, to));
            if (to > polyline.length) {
                drawActivityMarker(map, polyline[polyline.length - 1], 'end');
            }
        }
    }, [map, polyline, frame, coordinatesPerFrame]);

    return (
        <section className="Activity">
            <img className="ActivityLogo" src={`/assets/${getActivityLogo(data['sport_type'])}`} alt={data['sport_type']} />
            <div className="ActivityTitle">{data.name}</div>
            <div className="ActivityData">
                <span className="ActivityDataDetail">{Math.round(data.distance / 1000)} km</span>
                <span className="ActivityDataDetail">{Math.round(data.moving_time / 60)} min</span>
                <span className="ActivityDataDetail">{Math.round(data.total_elevation_gain)}+</span>
            </div>
            <div id={mapId} className="ActivityMap"></div>
        </section>
    );
}