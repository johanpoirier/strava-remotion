import {continueRender, delayRender} from "remotion";
import React, {useEffect, useState} from "react";
import {generateMap} from "../services/leaflet";

export default function Activity({data, index}: {data: any[], index: number}) {
    const mapId = `map-${index}`;

    const [handle] = useState(() => delayRender());
    const [rendered, setRendered] = useState(false);

    useEffect(() => {
        if (!rendered) {
            generateMap(mapId, data);
            setRendered(true);
        }
        continueRender(handle);
    }, [data, mapId, rendered]);

    return (<div id={mapId} style={{width: '640px', height: '480px'}}></div>);
}