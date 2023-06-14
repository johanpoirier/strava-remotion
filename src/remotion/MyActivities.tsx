import { Audio, Series, Sequence, staticFile, interpolate } from 'remotion';
import React, { useCallback, useContext, useMemo } from 'react';
import { ACTIVITY_VIDEO_DURATION, FRAME_PER_SECOND, INTRO_FRAME_DURATION, ONE_WEEK_IN_MS } from '../tools/constants';
import { formatTimeDate } from '../tools/format-date';
import { StoreContext } from '../contexts/StoreContext';
import Activity from '../components/Activity';
import Intro from '../components/Intro';

export const MyActivities: React.FC = () => {
  const store = useContext(StoreContext);
  const activitiesTotalDurationInFrames = useMemo<number>(() => {
    return store.activities.length * Math.round((FRAME_PER_SECOND * ACTIVITY_VIDEO_DURATION) / 1000);
  }, [store.activities]);

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
      <Audio
        src={staticFile('music.mp3')}
        volume={(frame: number) =>
          interpolate(
            frame,
            [
              0,
              INTRO_FRAME_DURATION,
              activitiesTotalDurationInFrames,
              activitiesTotalDurationInFrames + INTRO_FRAME_DURATION,
            ],
            [0, 1, 1, 0],
            { extrapolateLeft: 'clamp' },
          )
        }
      />
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
