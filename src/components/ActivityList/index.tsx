import React, { useContext } from 'react';
import './style.css';
import { StoreContext } from '../../contexts/StoreContext';
import { MyActivity } from '../../models/MyActivity';

export default function ActivityList() {
  const { activities } = useContext(StoreContext);

  const displayActivity = (activity: MyActivity) => {
    return <li key={activity.id}>Activity {activity.id}</li>;
  };

  return <ul className="activity-list">{activities.map(displayActivity)}</ul>;
}
