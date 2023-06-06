import React from 'react';
import './style.css';
import ActivityElevation from '../ActivityElevation';
import { MyActivity } from '../../../models/MyActivity';

export default function ActivityHeader({ data }: { data: MyActivity }) {
  const { id, name, startDate, streams } = data;
  return (
    <div className="activity-header">
      <ActivityElevation id={id} times={streams.time.data} elevations={streams.altitude.data} />
      <span className="activity-header-title">{name}</span>
      <span className="activity-header-date">{new Intl.DateTimeFormat('fr-FR').format(Date.parse(startDate))}</span>
      <span className="activity-header-overlay"></span>
    </div>
  );
}
