import React, {useMemo} from 'react';
import './style.css';
import {getActivityLogo} from '../../tools/activity-logo';
import {DISPLAY_FRAME_RATIO, ACTIVITY_VIDEO_DURATION, FRAME_PER_SECOND} from '../../tools/constants';
import {MyActivity} from '../../models/MyActivity';
import ActivityHeader from './ActivityHeader';
import ActivityMap from './ActivityMap';
import ActivityElevation from './ActivityElevation';

export default function Activity({data}: { data: MyActivity }) {
    const pointsPerFrame = useMemo(() => {
        return Math.ceil(data.map.length / (DISPLAY_FRAME_RATIO * ACTIVITY_VIDEO_DURATION * FRAME_PER_SECOND / 1000));
    }, [data.map])

    return (
        <section className="Activity">
            <img className="ActivityLogo" src={`/assets/${getActivityLogo(data.type)}`}
                 alt={data.type}/>
            <ActivityHeader name={data.name} date={data.startDate} />
            <div className="ActivityData">
                <span className="ActivityDataDetail">{Math.round(data.distance / 1000)} km</span>
                <span className="ActivityDataDetail">{Math.round(data.duration / 60)} min</span>
                <span className="ActivityDataDetail">{Math.round(data.elevationGain)}m+</span>
            </div>
            <ActivityMap pointsPerFrame={pointsPerFrame} coordinates={data.map}/>
            <ActivityElevation distances={data.streams.distance.data} elevations={data.streams.altitude.data}/>
        </section>
    );
}