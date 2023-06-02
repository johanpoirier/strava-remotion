import React, { useContext } from 'react';
import './style.css';
import { StoreContext } from '../../contexts/StoreContext';
import { MyActivity } from '../../models/MyActivity';
import { ACTIVITY_COUNT_TO_RENDER } from '../../tools/constants';
import ActivityListItem from './ActivityListItem';

export default function ActivityList() {
  const { activities } = useContext(StoreContext);

  const displayActivity = (activity: MyActivity) => {
    return (
      <li key={activity.id}>
        <ActivityListItem activity={activity} />
      </li>
    );
  };

  return (
    <section className="activity-list">
      <p>Welcome to Strava in motion. We will generate a video of your {ACTIVITY_COUNT_TO_RENDER} last activities:</p>
      <ul>{activities.slice(0, ACTIVITY_COUNT_TO_RENDER).map(displayActivity)}</ul>
    </section>
  );
}
