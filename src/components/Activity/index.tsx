import React, { useMemo } from 'react';
import './style.css';
import { DISPLAY_FRAME_RATIO, ACTIVITY_VIDEO_DURATION, FRAME_PER_SECOND } from '../../tools/constants';
import { MyActivity } from '../../models/MyActivity';
import ActivityHeader from './ActivityHeader';
import ActivityMap from './ActivityMap';
import { Img, staticFile } from 'remotion';
import { getActivityLogo } from '../../tools/activity-logo';

export default function Activity({ data }: { data: MyActivity }) {
  const pointsPerFrame = useMemo(() => {
    return Math.ceil(data.map.length / ((DISPLAY_FRAME_RATIO * ACTIVITY_VIDEO_DURATION * FRAME_PER_SECOND) / 1000));
  }, [data.map]);

  return (
    <section className="activity">
      <ActivityHeader data={data} />
      {/*<div className="ActivityData">*/}
      {/*  <span className="ActivityDataDetail">{Math.round(data.distance / 1000)} km</span>*/}
      {/*  <span className="ActivityDataDetail">{Math.round(data.duration / 60)} min</span>*/}
      {/*  <span className="ActivityDataDetail">{Math.round(data.elevationGain)}m+</span>*/}
      {/*</div>*/}
      <ActivityMap id={data.id} pointsPerFrame={pointsPerFrame} coordinates={data.map} />
      <Img className="activity-logo" src={staticFile(`assets/${getActivityLogo(data.type)}`)} alt={data.type} />
    </section>
  );
}
