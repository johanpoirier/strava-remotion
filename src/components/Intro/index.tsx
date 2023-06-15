import React from 'react';
import { Img, interpolate, useCurrentFrame } from 'remotion';
import './intro.css';
import { Athlete } from '../../models/Athlete';
import { INTRO_DURATION_IN_FRAMES } from '../../tools/constants';
import { useTranslation } from 'react-i18next';

export default function Intro({ athlete, from, to }: { athlete: Athlete; from: string; to: string }) {
  const { t } = useTranslation();
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, Math.round(INTRO_DURATION_IN_FRAMES / 2)], [0, 1]);
  const profileOpacity = interpolate(frame, [0, Math.round(INTRO_DURATION_IN_FRAMES * 0.9)], [0, 1]);

  return (
    <section className="intro">
      <p className="intro-title">
        <span className="intro-main-title" style={{ opacity: titleOpacity }}>
          {t('intro.title', { firstname: athlete.firstname })}
        </span>
        <span className="intro-sub-title" style={{ opacity: titleOpacity }}>
          {t('intro.from-to', { from, to })}
        </span>
      </p>
      <Img src={athlete.profile} alt="" className="intro-profile" style={{ opacity: profileOpacity }} />
    </section>
  );
}
