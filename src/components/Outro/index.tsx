import React, { useMemo } from 'react';
import './outro.css';
import { onlyUniqueFilter } from '../../tools/only-uniq-filter';
import { Athlete } from '../../models/Athlete';
import { MyActivity } from '../../models/MyActivity';
import { displayTotalsByType } from '../../tools/display-totals-by-type';
import { formatDuration } from '../../tools/format-duration';

export default function Outro({ activities }: { athlete: Athlete; activities: MyActivity[] }) {
  const activityTypes = useMemo(() => {
    return activities.map((activity: MyActivity) => activity.type).filter(onlyUniqueFilter);
  }, [activities]);

  const totalDuration = activities.reduce((duration: number, currentActivity: MyActivity) => {
    return duration + currentActivity.duration;
  }, 0);

  function displayDataByTypes(types: string[]) {
    return <ul>{types.map((type: string) => displayTotalsByType(type, activities))}</ul>;
  }

  return (
    <section className="outro">
      <span>This past 7 days: {formatDuration(totalDuration)}</span>
      {displayDataByTypes(activityTypes)}
    </section>
  );
}
