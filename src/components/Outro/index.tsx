import React from 'react';
import { Img, interpolate, useCurrentFrame } from 'remotion';
import './outro.css';
import { Athlete } from '../../models/Athlete';
import { OUTRO_DURATION_IN_FRAMES } from '../../tools/constants';

export default function Outro({ athlete }: { athlete: Athlete }) {
  const frame = useCurrentFrame();
  const profileOpacity = interpolate(frame, [0, Math.round(OUTRO_DURATION_IN_FRAMES * 0.9)], [0, 1]);

  return (
    <section className="outro">
      <p className="intro-title">Thanks.</p>
      <Img src={athlete.profile} alt="" className="intro-profile" style={{ opacity: profileOpacity }} />
    </section>
  );
}
