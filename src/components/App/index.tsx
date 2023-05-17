import React, {useState, useCallback, useEffect} from 'react';
import './style.css';
import {Player} from '@remotion/player';
import {MyActivities} from '../../remotion/MyActivities';
import {fetchAccessTokens, fetchActivities, fetchActivityStreams, getAuthUrl} from '../../services/strava';
import { DataContext } from '../../contexts/DataContext';
import {buildMyActivity, MyActivity} from '../../models/MyActivity';
import {continueRender, delayRender} from 'remotion';
import {fetchAthleteActivities} from "../../services/data";

function App() {
    const [accessToken] = useState<string | null>(localStorage.getItem('atkn'));
    const [activityList, setActivityList] = useState<MyActivity[]>([]);
    const [handle] = useState(() => delayRender());

    const fetchData = useCallback(async () => {
        if (accessToken) {
            const athleteActivities = await fetchAthleteActivities(accessToken);
            setActivityList(athleteActivities);
            continueRender(handle);
        }
    }, [accessToken, handle]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const renderPlayer = () => {
        if (activityList.length === 0) {
            return (<span>Loading…</span>);
        }
        return (<Player
            component={MyActivities}
            durationInFrames={activityList.length * 60}
            compositionWidth={1024}
            compositionHeight={768}
            fps={30}
            controls
        />);
    }

    return (
        <DataContext.Provider value={activityList}>
            <div className="App">
                {renderPlayer()}
            </div>
        </DataContext.Provider>
    );
}

export default App;
