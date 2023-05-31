import React, {useState, useCallback, useEffect} from 'react';
import './style.css';
import {Player} from '@remotion/player';
import {continueRender, delayRender} from 'remotion';
import {MyActivities} from '../../remotion/MyActivities';
import {DataContext} from '../../contexts/DataContext';
import {MyActivity} from '../../models/MyActivity';
import {fetchAthleteActivities} from '../../services/data';
import {ACTIVITY_VIDEO_DURATION, FRAME_PER_SECOND} from '../../tools/constants';

function Preview() {
    const [accessToken] = useState<string | null>(localStorage.getItem('atkn'));
    const [activities, setActivities] = useState<MyActivity[]>([]);
    const [handle] = useState(() => delayRender());

    const fetchData = useCallback(async () => {
        if (accessToken) {
            const athleteActivities = await fetchAthleteActivities(accessToken);
            setActivities(athleteActivities);
            continueRender(handle);
        }
    }, [accessToken, handle]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const renderPlayer = () => {
        if (activities.length === 0) {
            return (<span>Loading…</span>);
        }
        return (<Player
            component={MyActivities}
            durationInFrames={Math.round((activities.length * FRAME_PER_SECOND * ACTIVITY_VIDEO_DURATION) / 1000)}
            compositionWidth={1280}
            compositionHeight={720}
            fps={30}
            controls
        />);
    }

    return (
        <DataContext.Provider value={activities}>
            <div className="preview">
                {renderPlayer()}
            </div>
        </DataContext.Provider>
    );
}

export default Preview;
