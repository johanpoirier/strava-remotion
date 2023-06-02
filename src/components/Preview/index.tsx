import React from 'react';
import './style.css';
import { Thumbnail } from '@remotion/player';
import { MyActivities } from '../../remotion/MyActivities';
import { ACTIVITY_VIDEO_DURATION, FRAME_PER_SECOND } from '../../tools/constants';
import { MyActivity } from '../../models/MyActivity';

function Preview({ activities }: { activities: MyActivity[] }) {
  const renderPreview = () => {
    return (
      <Thumbnail
        component={MyActivities}
        compositionWidth={1280}
        compositionHeight={720}
        frameToDisplay={1}
        durationInFrames={Math.round((activities.length * FRAME_PER_SECOND * ACTIVITY_VIDEO_DURATION) / 1000)}
        fps={30}
      />
    );
  };

  return <div className="preview">{renderPreview()}</div>;
}

export default Preview;
