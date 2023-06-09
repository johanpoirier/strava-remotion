import React, { useMemo } from 'react';
import './activity-data-detail.css';
import { ActivityDetailType } from '../../../tools/activity-detail-type.enum';
import { useTranslation } from 'react-i18next';

export default function ActivityDataDetail({ value, type }: { value: string | number; type: ActivityDetailType }) {
  const { t } = useTranslation();

  const unit = useMemo<string>(() => {
    switch (type) {
      case ActivityDetailType.Distance:
        return 'km';
      case ActivityDetailType.Elevation:
        return 'm';
      default:
        return '';
    }
  }, [type]);

  return (
    <div className="activity-data-detail">
      <span className="activity-data-detail-label">{t(`activity-data-detail.${type.toLowerCase()}`, { type })}</span>
      <span className="activity-data-detail-value">
        {value} {unit}
      </span>
    </div>
  );
}
