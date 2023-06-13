import React from 'react';
import './activity-header.css';
import ActivityElevation from '../ActivityElevation';
import { MyActivity } from '../../../models/MyActivity';
import { formatDate, formatStringDate } from '../../../tools/format-date';

export default function ActivityHeader({ data }: { data: MyActivity }) {
  const { id, name, startDate, streams } = data;
  return (
    <div className="activity-header">
      <ActivityElevation id={id} times={streams.time.data} elevations={streams.altitude.data} />
      <span className="activity-header-title">{name}</span>
      <span className="activity-header-date">{formatStringDate(startDate)}</span>
      <span className="activity-header-overlay"></span>
    </div>
  );
}
