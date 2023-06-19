import React, { useContext } from 'react';
import './activity-list.css';
import { StoreContext } from '../../contexts/StoreContext';
import { MyActivity } from '../../models/MyActivity';
import ActivityListItem from './ActivityListItem';
import { useTranslation } from 'react-i18next';
import { Img, staticFile } from 'remotion';

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
      <p className="activity-list-title">{t('activity-list.title')}</p>
      <Img
        src={staticFile('assets/api-logo-pwrdBy-strava-horiz-light.svg')}
        alt="Powered by Strava"
        className="activity-list-poweredby"
      />
      <p>{t('activity-list.explanation')}</p>
      <ul>{activities.map(displayActivity)}</ul>
    </section>
  );
}
