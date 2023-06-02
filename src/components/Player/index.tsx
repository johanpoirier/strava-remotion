import React, { useContext } from 'react';
import './style.css';
import { Player as RemotionPlayer } from '@remotion/player';
import { MyActivities } from '../../remotion/MyActivities';
import { StoreContext } from '../../contexts/StoreContext';
import { ACTIVITY_VIDEO_DURATION, FRAME_PER_SECOND } from '../../tools/constants';

function Player() {
  const { activities } = useContext(StoreContext);

  const renderPlayer = () => {
    return (
      <RemotionPlayer
        component={MyActivities}
        durationInFrames={Math.round((activities.length * FRAME_PER_SECOND * ACTIVITY_VIDEO_DURATION) / 1000)}
        compositionWidth={1280}
        compositionHeight={720}
        fps={30}
        controls
      />
    );
  };

  return <div className="player">{renderPlayer()}</div>;
}

export default Player;
