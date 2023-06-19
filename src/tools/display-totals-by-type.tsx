import { MyActivity } from '../models/MyActivity';
import { Img, staticFile } from 'remotion';
import { getActivityLogo } from './activity-logo';
import React from 'react';
import { formatDuration } from './format-duration';

function getTotalDistance(activities: MyActivity[]): number {
  return activities.reduce((totalDistance: number, currentActivity: MyActivity) => {
    return totalDistance + currentActivity.distance;
  }, 0);
}

function getTotalElevation(activities: MyActivity[]): number {
  return activities.reduce((totalElevation: number, currentActivity: MyActivity) => {
    return totalElevation + currentActivity.elevationGain;
  }, 0);
}

function getTotalDuration(activities: MyActivity[]): number {
  return activities.reduce((totalDuration: number, currentActivity: MyActivity) => {
    return totalDuration + currentActivity.duration;
  }, 0);
}

function displayTrailRunTotals(activities: MyActivity[]) {
  const totalDistance = getTotalDistance(activities);
  return (
    <li className="outro-activity-type">
      <Img src={staticFile(`assets/${getActivityLogo('TrailRun')}`)} alt="" />
      <span>{Math.round(totalDistance / 1000)} km</span>
      <span>{getTotalElevation(activities)} D+</span>
    </li>
  );
}
function displayRunTotals(activities: MyActivity[]) {
  const totalDistance = getTotalDistance(activities);
  return (
    <li className="outro-activity-type">
      <Img src={staticFile(`assets/${getActivityLogo('Run')}`)} alt="" />
      <span>{Math.round(totalDistance / 1000)}km</span>
    </li>
  );
}
function displayHikeTotals(activities: MyActivity[]) {
  const totalDistance = getTotalDistance(activities);
  return (
    <li className="outro-activity-type">
      <Img src={staticFile(`assets/${getActivityLogo('Hike')}`)} alt="" />
      <span>{Math.round(totalDistance / 1000)}km</span>
      <span>{getTotalElevation(activities)} D+</span>
    </li>
  );
}

function displaySwimTotals(activities: MyActivity[]) {
  return (
    <li className="outro-activity-type">
      <Img src={staticFile(`assets/${getActivityLogo('Swim')}`)} alt="" />
      <span>{getTotalDistance(activities)} m</span>
      <span>{formatDuration(getTotalDuration(activities))}</span>
    </li>
  );
}

function displayDefaultTotals(activities: MyActivity[]) {
  const totalDistance = getTotalDistance(activities);
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
    case 'Hike':
    case 'Walk':
      return displayHikeTotals(activitiesOfType);
    case 'Swim':
      return displaySwimTotals(activitiesOfType);
    default:
      return displayDefaultTotals(activitiesOfType);
  }
}
