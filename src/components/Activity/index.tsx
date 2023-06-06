import React, { useMemo } from 'react';
import { Img, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import './style.css';
import { DISPLAY_FRAME_RATIO, ACTIVITY_VIDEO_DURATION, FRAME_PER_SECOND } from '../../tools/constants';
import { getActivityLogo } from '../../tools/activity-logo';
import { MyActivity } from '../../models/MyActivity';
import ActivityHeader from './ActivityHeader';
import ActivityMap from './ActivityMap';

export default function Activity({ data }: { data: MyActivity }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pointsPerFrame = useMemo(() => {
    return Math.ceil(data.map.length / ((DISPLAY_FRAME_RATIO * ACTIVITY_VIDEO_DURATION * FRAME_PER_SECOND) / 1000));
  }, [data.map]);

  const scale = spring({
    fps,
    frame,
  });

  return (
    <section className="activity">
      <ActivityHeader data={data} />
      <div className="activity-data" style={{ transform: `scale(${scale})` }}>
        <span className="activity-data-detail">{Math.round(data.distance / 1000)} km</span>
        <span className="activity-data-detail">{Math.round(data.duration / 60)} min</span>
        <span className="activity-data-detail">{Math.round(data.elevationGain)}m+</span>
      </div>
      <ActivityMap id={data.id} pointsPerFrame={pointsPerFrame} coordinates={data.map} />
      <Img className="activity-logo" src={staticFile(`assets/${getActivityLogo(data.type)}`)} alt={data.type} />
    </section>
  );
}
