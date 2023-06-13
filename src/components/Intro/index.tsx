import React from 'react';
import { Img } from 'remotion';
import './intro.css';
import { Athlete } from '../../models/Athlete';

export default function Intro({ athlete, from, to }: { athlete: Athlete; from: string; to: string }) {
  return (
    <section className="intro">
      <p className="intro-title">
        <span className="intro-main-title">{athlete.firstname}’s past week activities</span>
        <span className="intro-sub-title">
          (from {from} to {to})
        </span>
      </p>
      <Img src={athlete.profile} alt="" className="intro-profile" />
    </section>
  );
}
