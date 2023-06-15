import { Audio, Series, Sequence, staticFile, interpolate } from 'remotion';
import React, { useCallback, useContext, useMemo } from 'react';
import {
  ACTIVITY_VIDEO_DURATION,
  ACTIVITY_VIDEO_DURATION_IN_FRAMES,
  FRAME_PER_SECOND,
  INTRO_DURATION,
  INTRO_DURATION_IN_FRAMES,
  ONE_WEEK_IN_MS,
  OUTRO_DURATION_IN_FRAMES,
} from '../tools/constants';
import { formatTimeDate } from '../tools/format-date';
import { StoreContext } from '../contexts/StoreContext';
import Activity from '../components/Activity';
import Intro from '../components/Intro';
import Outro from '../components/Outro';

export const MyActivities: React.FC = () => {
  const store = useContext(StoreContext);

  const activitiesTotalDurationInFrames = useMemo<number>(() => {
    return store.activities.length * ACTIVITY_VIDEO_DURATION_IN_FRAMES;
  }, [store.activities]);

  const renderActivity = (activity: any, index: number) => {
    return (
      <Series.Sequence durationInFrames={ACTIVITY_VIDEO_DURATION_IN_FRAMES} key={`seq-${index}`}>
        <Activity data={activity} />
      </Series.Sequence>
    );
  };
  const renderActivities = useCallback(() => {
    return (
      <Sequence from={INTRO_DURATION_IN_FRAMES}>
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
              INTRO_DURATION_IN_FRAMES,
              activitiesTotalDurationInFrames,
              activitiesTotalDurationInFrames + INTRO_DURATION_IN_FRAMES,
            ],
            [0, 1, 1, 0],
            { extrapolateLeft: 'clamp' },
          )
        }
      />
      <Sequence from={0} durationInFrames={INTRO_DURATION_IN_FRAMES}>
        <Intro
          athlete={store.athlete}
          from={formatTimeDate(Date.now() - ONE_WEEK_IN_MS)}
          to={formatTimeDate(Date.now())}
        />
      </Sequence>
      {store?.activities.length ? renderActivities() : null}
      <Sequence
        from={INTRO_DURATION_IN_FRAMES + activitiesTotalDurationInFrames}
        durationInFrames={OUTRO_DURATION_IN_FRAMES}
      >
        <Outro athlete={store.athlete} />
      </Sequence>
    </div>
  );
};
