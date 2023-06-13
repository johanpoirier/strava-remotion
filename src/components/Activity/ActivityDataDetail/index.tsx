import React from 'react';
import './activity-data-detail.css';
export default function ActivityDataDetail({ value, unit, label }: { value: number; unit: string; label: string }) {
  return (
    <div className="activity-data-detail">
      <span className="activity-data-detail-label">{label}</span>
      <span className="activity-data-detail-value">
        {value} {unit}
      </span>
    </div>
  );
}
