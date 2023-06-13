import React, { useContext } from 'react';
import './activity-list.css';
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
      <p>Welcome to Strava in motion!</p>
      <p>We will generate a video of your activities from the past 7 days:</p>
      <ul>{activities.slice(activities.length - ACTIVITY_COUNT_TO_RENDER).map(displayActivity)}</ul>
    </section>
  );
}
