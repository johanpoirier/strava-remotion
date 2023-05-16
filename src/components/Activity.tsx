import React, {useMemo} from 'react';
import './Activity.css';
import {getActivityLogo} from '../tools/activity-logo';
import ActivityMap from "./ActivityMap";
import {MyActivity} from "../models/MyActivity";
import ActivityElevation from "./ActivityElevation";

const TOTAL_FRAME_COUNT = 60;
const DISPLAY_FRAME_RATIO = 0.9;

export default function Activity({data}: { data: MyActivity }) {
    const pointsPerFrame = useMemo(() => {
        return Math.ceil(data.map.length / (DISPLAY_FRAME_RATIO * TOTAL_FRAME_COUNT));
    }, [data.map])

    return (
        <section className="Activity">
            <img className="ActivityLogo" src={`/assets/${getActivityLogo(data.type)}`}
                 alt={data.type}/>
            <div className="ActivityTitle">{data.name}</div>
            <div className="ActivityData">
                <span className="ActivityDataDetail">{Math.round(data.distance / 1000)} km</span>
                <span className="ActivityDataDetail">{Math.round(data.duration / 60)} min</span>
                <span className="ActivityDataDetail">{Math.round(data.elevationGain)}+</span>
            </div>
            <ActivityMap pointsPerFrame={pointsPerFrame} coordinates={data.map}/>
            <ActivityElevation distances={data.streams.distance.data} elevations={data.streams.altitude.data}/>
        </section>
    );
}