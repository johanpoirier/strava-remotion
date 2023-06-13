import React from 'react';
import { Img, staticFile } from 'remotion';
import './activity-list-item.css';
import { MyActivity } from '../../../models/MyActivity';
import { getActivityLogo } from '../../../tools/activity-logo';

export default function ActivityListItem({ activity }: { activity: MyActivity }) {
  return (
    <>
      <Img className="activity-list-item-logo" src={staticFile(`assets/${getActivityLogo(activity.type)}`)} alt="" />
      <span className="activity-list-item-title">
        {activity.name} ({Math.round(activity.distance / 100) / 10}km)
      </span>
    </>
  );
}
