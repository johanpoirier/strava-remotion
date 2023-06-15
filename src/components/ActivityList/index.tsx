import React, { useContext } from 'react';
import './activity-list.css';
import { StoreContext } from '../../contexts/StoreContext';
import { MyActivity } from '../../models/MyActivity';
import ActivityListItem from './ActivityListItem';
import { useTranslation } from 'react-i18next';

export default function ActivityList() {
  const { activities } = useContext(StoreContext);
  const { t } = useTranslation();

  const displayActivity = (activity: MyActivity) => {
    return (
      <li key={activity.id}>
        <ActivityListItem activity={activity} />
      </li>
    );
  };

  return (
    <section className="activity-list">
      <p>{t('activity-list.title')}</p>
      <p>{t('activity-list.explanation')}</p>
      <ul>{activities.map(displayActivity)}</ul>
    </section>
  );
}
