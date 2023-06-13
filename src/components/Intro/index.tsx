import React from 'react';
import './intro.css';
import { Athlete } from '../../models/Athlete';
import { Img } from 'remotion';

export default function Intro({ athlete }: { athlete: Athlete }) {
  return (
    <section className="intro">
      {athlete.firstname}’s past week activities
      <Img src={athlete.profile} alt="" className="intro-profile" />
    </section>
  );
}
