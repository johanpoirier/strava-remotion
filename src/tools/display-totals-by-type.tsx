import { MyActivity } from '../models/MyActivity';
import { Img, staticFile } from 'remotion';
import { getActivityLogo } from './activity-logo';
import React from 'react';

function displayTrailRunTotals(activities: MyActivity[]) {
  const totalDistance = activities.reduce((totalDistance: number, currentActivity: MyActivity) => {
    return totalDistance + currentActivity.distance;
  }, 0);
  const totalElevation = activities.reduce((totalElevation: number, currentActivity: MyActivity) => {
    return totalElevation + currentActivity.elevationGain;
  }, 0);
  return (
    <li className="outro-activity-type">
      <Img src={staticFile(`assets/${getActivityLogo('TrailRun')}`)} alt="" />
      <span>{Math.round(totalDistance / 1000)} km</span>
      <span>{totalElevation} D+</span>
    </li>
  );
}
function displayRunTotals(activities: MyActivity[]) {
  const totalDistance = activities.reduce((totalDistance: number, currentActivity: MyActivity) => {
    return totalDistance + currentActivity.distance;
  }, 0);
  return (
    <li className="outro-activity-type">
      <Img src={staticFile(`assets/${getActivityLogo('Run')}`)} alt="" />
      <span>{Math.round(totalDistance / 1000)}km</span>
    </li>
  );
}
function displayDefaultTotals(activities: MyActivity[]) {
  const totalDistance = activities.reduce((totalDistance: number, currentActivity: MyActivity) => {
    return totalDistance + currentActivity.distance;
  }, 0);
  return (
    <li className="outro-activity-type">
      <Img src={staticFile(`assets/${getActivityLogo('')}`)} alt="" />
      <span>{Math.round(totalDistance / 1000)}km</span>
    </li>
  );
}

export function displayTotalsByType(type: string, activities: MyActivity[]) {
  const activitiesOfType = activities.filter((a: MyActivity) => a.type === type);
  switch (type) {
    case 'TrailRun':
      return displayTrailRunTotals(activitiesOfType);
    case 'Run':
      return displayRunTotals(activitiesOfType);
    default:
      return displayDefaultTotals(activitiesOfType);
  }
}
