import React from 'react';
import { Img, interpolate, useCurrentFrame } from 'remotion';
import './intro.css';
import { Athlete } from '../../models/Athlete';
import { INTRO_FRAME_DURATION } from '../../tools/constants';

export default function Intro({ athlete, from, to }: { athlete: Athlete; from: string; to: string }) {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, Math.round(INTRO_FRAME_DURATION / 2)], [0, 1]);
  const profileOpacity = interpolate(frame, [0, Math.round(INTRO_FRAME_DURATION * 0.9)], [0, 1]);

  return (
    <section className="intro">
      <p className="intro-title">
        <span className="intro-main-title" style={{ opacity: titleOpacity }}>
          {athlete.firstname}’s past week activities
        </span>
        <span className="intro-sub-title" style={{ opacity: titleOpacity }}>
          (from {from} to {to})
        </span>
      </p>
      <Img src={athlete.profile} alt="" className="intro-profile" style={{ opacity: profileOpacity }} />
    </section>
  );
}
