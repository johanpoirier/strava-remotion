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
            <div className="ActivityHeader">
                <span className="ActivityHeaderTitle">{data.name}</span>
                <span className="ActivityHeaderDistance">{Math.round(data.distance / 1000)}km</span>
                <span className="ActivityHeaderDuration">{data.moving_time}s</span>
            </div>
            <div id={mapId} className="ActivityMap"></div>
        </section>
    );
}