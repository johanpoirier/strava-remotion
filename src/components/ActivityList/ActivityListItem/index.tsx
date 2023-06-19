import React from 'react';
import { Img, staticFile } from 'remotion';
import { useTranslation } from 'react-i18next';
import './activity-list-item.css';
import { MyActivity } from '../../../models/MyActivity';
import { getActivityLogo } from '../../../tools/activity-logo';

export default function ActivityListItem({ activity }: { activity: MyActivity }) {
  const { t } = useTranslation();
  return (
    <>
      <Img className="activity-list-item-logo" src={staticFile(`assets/${getActivityLogo(activity.type)}`)} alt="" />
      <span className="activity-list-item-title">
        {activity.name} ({Math.round(activity.distance / 100) / 10}km) -&nbsp;
        <a
          href={`https://www.strava.com/activities/${activity.id}`}
          className="activity-list-item-strava-link"
          target="_blank"
          rel="noreferrer"
        >
          {t('activity-list-item.view-on-strava')}
        </a>
      </span>
    </>
  );
}
