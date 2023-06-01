import React, {useEffect, useState} from 'react';
import {Composition, continueRender, delayRender, getInputProps} from 'remotion';
import * as Cabin from '@remotion/google-fonts/Cabin';
import './style.css';
import {getAthleteActivities, getAthlete} from '../services/data';
import {DataContext} from '../contexts/DataContext';
import {UserContext} from '../contexts/UserContext';
import {MyActivity} from '../models/MyActivity';
import {Athlete} from '../models/Athlete';
import {ACTIVITY_COUNT_TO_RENDER, ACTIVITY_VIDEO_DURATION, FRAME_PER_SECOND} from '../tools/constants';
import {MyActivities} from './MyActivities';

Cabin.loadFont('normal', {weights: ['400', '700']});
Cabin.loadFont('italic', {weights: ['400']});

// @ts-ignore
const { token, activityCount = ACTIVITY_COUNT_TO_RENDER } = getInputProps();

export const RemotionRoot: React.FC = () => {
    const [handle] = useState(() => delayRender());
    const [athlete, setAthlete] = useState<Athlete>();
    const [activities, setActivities] = useState<MyActivity[]>([]);

    useEffect(() => {
        getAthlete(token)
            .then(setAthlete)
            .then(() => getAthleteActivities(token, activityCount))
            .then(activities => {
                setActivities(activities);
                continueRender(handle);
            })
            .catch(error => {
                console.log('Fetching error', error);
            });
    }, [handle]);

    return (
        <UserContext.Provider value={athlete}>
            <DataContext.Provider value={activities}>
                <Composition
                    id="InMotion"
                    component={MyActivities}
                    durationInFrames={Math.round((activities.length * FRAME_PER_SECOND * ACTIVITY_VIDEO_DURATION) / 1000) || 1}
                    fps={FRAME_PER_SECOND}
                    width={1280}
                    height={720}
                />
            </DataContext.Provider>
        </UserContext.Provider>
    );
};