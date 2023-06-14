import React, { useMemo } from 'react';
import { Img, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import './activity.css';
import { DISPLAY_FRAME_RATIO, ACTIVITY_VIDEO_DURATION, FRAME_PER_SECOND } from '../../tools/constants';
import { getActivityLogo } from '../../tools/activity-logo';
import { MyActivity } from '../../models/MyActivity';
import ActivityHeader from './ActivityHeader';
import ActivityMap from './ActivityMap';
import ActivityDataDetail from './ActivityDataDetail';
import { formatDuration } from '../../tools/format-duration';
import { ActivityDetailType } from '../../tools/activity-detail-type.enum';

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
        <ActivityDataDetail value={Math.round(data.distance / 1000)} type={ActivityDetailType.Distance} />
        <ActivityDataDetail value={formatDuration(data.duration)} type={ActivityDetailType.Duration} />
        <ActivityDataDetail value={Math.round(data.elevationGain)} type={ActivityDetailType.Elevation} />
        {data.photo && <Img src={data.photo} alt="" className="activity-data-photo" />}
      </div>
      <ActivityMap id={data.id} pointsPerFrame={pointsPerFrame} coordinates={data.map} />
      <Img className="activity-logo" src={staticFile(`assets/${getActivityLogo(data.type)}`)} alt={data.type} />
    </section>
  );
}
