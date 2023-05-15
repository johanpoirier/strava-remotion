import React, {useEffect, useMemo, useState} from "react";
import './Activity.css';
import {continueRender, delayRender} from "remotion";
import {decodeEncodedPolyline, generateMap} from "../services/leaflet";

export default function Activity({data, index}: {data: any, index: number}) {
    const mapId = `map-${index}`;
    const polyline = useMemo(() => decodeEncodedPolyline(data.map['summary_polyline']), [data.map]);

    const [handle] = useState(() => delayRender());
    const [rendered, setRendered] = useState(false);

    useEffect(() => {
        if (!rendered) {
            generateMap(mapId, polyline);
            setRendered(true);
        }
        continueRender(handle);
    }, [polyline, mapId, rendered]);

    return (
        <section className="Activity">
            <img className="ActivityLogo" src="/assets/trail-running.png" alt={data['sport_type']} />
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