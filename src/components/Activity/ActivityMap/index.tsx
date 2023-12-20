import React, { useCallback, useEffect, useState } from 'react';
import { continueRender, delayRender, useCurrentFrame } from 'remotion';
import './activity-map.css';
import 'leaflet/dist/leaflet.css';
import { drawActivityMarker, drawActivityRoute, generateMap } from '../../../services/leaflet';
import { ACTIVITY_MAP_LOAD_TIMEOUT } from '../../../tools/constants';

export default function ActivityMap({
  id,
  pointsPerFrame,
  coordinateList,
}: {
  id: string;
  pointsPerFrame: number;
  coordinateList: number[][];
}) {
  const frame = useCurrentFrame();

  const [map, setMap] = useState<unknown>();
  const [handle] = useState(() => delayRender(`[ActivityMap] Generate map ${id}`));

  const generateActivityMap = useCallback(() => {
    if (coordinateList.length === 0) {
      return;
    }
    const leafletMap: unknown = generateMap(`map-${id}`, coordinateList);
    setTimeout(() => continueRender(handle), ACTIVITY_MAP_LOAD_TIMEOUT); // force timeout to map load complete
    setMap(leafletMap);
    drawActivityMarker(leafletMap, coordinateList[0]);
  }, [coordinateList, handle, id]);

  useEffect(() => {
    generateActivityMap();
  }, [generateActivityMap]);

  useEffect(() => {
    if (map && frame > 0) {
      const from = frame * pointsPerFrame;
      const to = (frame + 1) * pointsPerFrame + 1;
      drawActivityRoute(map, coordinateList.slice(from, to));
      if (to > coordinateList.length) {
        drawActivityMarker(map, coordinateList[coordinateList.length - 1], 'end');
      }
    }
  }, [map, coordinateList, frame, pointsPerFrame]);

  return <div id={`map-${id}`} className="activity-map"></div>;
}
