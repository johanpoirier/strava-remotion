import React, { useEffect, useState } from 'react';
import { Composition, continueRender, delayRender, getInputProps } from 'remotion';
import * as Cabin from '@remotion/google-fonts/Cabin';
import './style.css';
import { getDataForStore } from '../services/data';
import { StoreContext } from '../contexts/StoreContext';
import { ACTIVITY_VIDEO_DURATION, FRAME_PER_SECOND, INTRO_FRAME_DURATION } from '../tools/constants';
import { MyActivities } from './MyActivities';
import { Store } from '../models/Store';

Cabin.loadFont('normal', { weights: ['400', '700'] });
Cabin.loadFont('italic', { weights: ['400'] });

// @ts-ignore
const { token } = getInputProps();

export const RemotionRoot: React.FC = () => {
  const [handle] = useState(() => delayRender());
  const [store, setStore] = useState<Store>();

  useEffect(() => {
    getDataForStore(token)
      .then((store: Store) => {
        setStore(store);
        continueRender(handle);
      })
      .catch((error: any) => {
        console.log('Fetching error', error);
      });
  }, [handle]);

  if (!store) {
    return <span></span>;
  }

  return (
    <StoreContext.Provider value={store}>
      <Composition
        id="InMotion"
        component={MyActivities}
        durationInFrames={
          INTRO_FRAME_DURATION +
          Math.round(((store?.activities.length ?? 1) * FRAME_PER_SECOND * ACTIVITY_VIDEO_DURATION) / 1000)
        }
        fps={FRAME_PER_SECOND}
        width={1280}
        height={720}
      />
    </StoreContext.Provider>
  );
};
