import { Series } from 'remotion';
import React, { useCallback, useContext } from 'react';
import Activity from '../components/Activity';
import { StoreContext } from '../contexts/StoreContext';
import { ACTIVITY_VIDEO_DURATION, FRAME_PER_SECOND } from '../tools/constants';

export const MyActivities: React.FC = () => {
  const store = useContext(StoreContext);

  const renderActivity = (activity: any, index: number) => {
    return (
      <Series.Sequence
        durationInFrames={Math.round((FRAME_PER_SECOND * ACTIVITY_VIDEO_DURATION) / 1000)}
        key={`seq-${index}`}
      >
        <Activity data={activity} />
      </Series.Sequence>
    );
  };
  const renderActivities = useCallback(() => {
    return <Series>{store?.activities.map(renderActivity)}</Series>;
  }, [store?.activities]);

  return (
    <div
      style={{
        flex: 1,
        textAlign: 'center',
        fontSize: '7em',
        backgroundColor: 'white',
      }}
    >
      {store?.activities.length ? renderActivities() : null}
    </div>
  );
};
