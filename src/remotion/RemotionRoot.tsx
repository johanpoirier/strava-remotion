import React, { useEffect, useMemo, useState } from 'react';
import { Composition, continueRender, delayRender, getInputProps } from 'remotion';
import * as Cabin from '@remotion/google-fonts/Cabin';
import './style.css';
import { getDataForStore } from '../services/data';
import { StoreContext } from '../contexts/StoreContext';
import {
  FRAME_PER_SECOND,
  ACTIVITY_VIDEO_DURATION,
  INTRO_DURATION,
  OUTRO_DURATION,
  ONE_SECOND_IN_MS,
} from '../tools/constants';
import { StravaInMotion } from './StravaInMotion';
import { Store } from '../models/Store';
import i18n from '../i18n';

Cabin.loadFont('normal', { weights: ['400', '700'] });
Cabin.loadFont('italic', { weights: ['400'] });

// @ts-ignore
const { token, lang } = getInputProps();

export const RemotionRoot: React.FC = () => {
  const [handle] = useState(() => delayRender());
  const [store, setStore] = useState<Store>();

  const videoTotalDuration = useMemo<number>(() => {
    return INTRO_DURATION + (store?.activities.length ?? 1) * ACTIVITY_VIDEO_DURATION + OUTRO_DURATION;
  }, [store?.activities]);

  useEffect(() => {
    i18n.changeLanguage(lang).then(() =>
      getDataForStore(token)
        .then((store: Store) => {
          setStore(store);
          continueRender(handle);
        })
        .catch((error: any) => {
          console.log('Fetching error', error);
        }),
    );
  }, [handle]);

  if (!store) {
    return <span></span>;
  }

  return (
    <StoreContext.Provider value={store}>
      <Composition
        id="StravaInMotion"
        component={StravaInMotion}
        durationInFrames={Math.round((videoTotalDuration * FRAME_PER_SECOND) / ONE_SECOND_IN_MS)}
        fps={FRAME_PER_SECOND}
        width={1280}
        height={720}
      />
    </StoreContext.Provider>
  );
};
