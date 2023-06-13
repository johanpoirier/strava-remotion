import React, { useCallback, useEffect, useState } from 'react';
import { continueRender, delayRender, useCurrentFrame } from 'remotion';
import './activity-map.css';
import 'leaflet/dist/leaflet.css';
import { drawActivityMarker, drawActivityRoute, generateMap } from '../../../services/leaflet';
import { ACTIVITY_MAP_LOAD_TIMEOUT } from '../../../tools/constants';

export default function ActivityMap({
  id,
  pointsPerFrame,
  coordinates,
}: {
  id: string;
  pointsPerFrame: number;
  coordinates: any[];
}) {
  const frame = useCurrentFrame();

  const [map, setMap] = useState<any>();
  const [handle] = useState(() => delayRender(`[ActivityMap] Generate map ${id}`));

  const generateActivityMap = useCallback(() => {
    const leafletMap: any = generateMap(`map-${id}`, coordinates);
    setTimeout(() => continueRender(handle), ACTIVITY_MAP_LOAD_TIMEOUT); // force timeout to map load complete
    setMap(leafletMap);
    drawActivityMarker(leafletMap, coordinates[0]);
  }, [coordinates, handle, id]);

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

  return <div id={`map-${id}`} className="activity-map"></div>;
}
