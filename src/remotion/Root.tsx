import React, {useEffect, useState} from 'react';
import {Composition, continueRender, delayRender, getInputProps} from 'remotion';
import {DataContext} from '../contexts/DataContext';
import {MyActivities} from './MyActivities';
import {MyActivity} from '../models/MyActivity';
import * as Cabin from '@remotion/google-fonts/Cabin';
import './style.css';
import {ACTIVITY_VIDEO_DURATION, FRAME_PER_SECOND} from '../tools/constants';
import {fetchAthleteActivities} from '../services/data';

Cabin.loadFont('normal', {weights: ['400', '700']});
Cabin.loadFont('italic', {weights: ['400']});

// @ts-ignore
const { token } = getInputProps();

export const RemotionRoot: React.FC = () => {
    const [handle] = useState(() => delayRender());
    const [activities, setActivities] = useState<MyActivity[]>([]);

    useEffect(() => {
        fetchAthleteActivities(token)
            .then(activities => {
                setActivities(activities);
                continueRender(handle);
            })
            .catch(error => {
                console.log('Fetching error', error);
            });
    }, [handle]);

    return (
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
    );
};