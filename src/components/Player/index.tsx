import React, { useContext, useMemo } from 'react';
import './style.css';
import { Player as RemotionPlayer } from '@remotion/player';
import { StravaInMotion } from '../../remotion/StravaInMotion';
import { StoreContext } from '../../contexts/StoreContext';
import {
  FRAME_PER_SECOND,
  ACTIVITY_VIDEO_DURATION,
  INTRO_DURATION,
  OUTRO_DURATION,
  ONE_SECOND_IN_MS,
} from '../../tools/constants';

export default function Player() {
  const { activities } = useContext(StoreContext);

  const videoTotalDuration = useMemo<number>(() => {
    return INTRO_DURATION + (activities.length ?? 1) * ACTIVITY_VIDEO_DURATION + OUTRO_DURATION;
  }, [activities]);

  console.log('Player', { videoTotalDuration });

  const renderPlayer = () => {
    return (
      <RemotionPlayer
        component={StravaInMotion}
        durationInFrames={Math.round((videoTotalDuration * FRAME_PER_SECOND) / ONE_SECOND_IN_MS)}
        compositionWidth={1280}
        compositionHeight={720}
        fps={FRAME_PER_SECOND}
        controls
      />
    );
  };

  return <div className="player">{renderPlayer()}</div>;
}
