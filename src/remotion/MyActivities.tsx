import { Series, Sequence } from 'remotion';
import React, { useCallback, useContext } from 'react';
import { ACTIVITY_VIDEO_DURATION, FRAME_PER_SECOND, INTRO_FRAME_DURATION, ONE_WEEK_IN_MS } from '../tools/constants';
import Activity from '../components/Activity';
import { StoreContext } from '../contexts/StoreContext';
import Intro from '../components/Intro';
import { formatTimeDate } from '../tools/format-date';

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
    return (
      <Sequence from={INTRO_FRAME_DURATION}>
        <Series>{store?.activities.map(renderActivity)}</Series>
      </Sequence>
    );
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
      <Sequence from={0} durationInFrames={30}>
        <Intro
          athlete={store.athlete}
          from={formatTimeDate(Date.now() - ONE_WEEK_IN_MS)}
          to={formatTimeDate(Date.now())}
        />
      </Sequence>
      {store?.activities.length ? renderActivities() : null}
    </div>
  );
};
