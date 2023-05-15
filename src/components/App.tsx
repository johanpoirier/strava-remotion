import React, { useState, useMemo } from 'react';
import './App.css';
import {Player} from '@remotion/player';
import {MyActivities} from '../remotion/MyActivities';
import {fetchAccessTokens, fetchActivities, getAuthUrl} from '../services/strava';

function App({code}: {code?: string}) {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [activityList, setActivityList] = useState<object[]>([]);

    const stravaLogin = useMemo(() => {
        if (activityList.length > 0) {
            return (<span>plop</span>)
        }
        if (accessToken) {
            fetchActivities(accessToken).then((data) => {
                setActivityList(data);
            });
            return (<span>Loading</span>)
        }
        if (code) {
            fetchAccessTokens(code).then((tokens) => {
                // @ts-ignore
                setAccessToken(tokens['access_token']);
            });
            return (<span>{code}</span>);
        }
        return (<a href={getAuthUrl()}>Login to Strava</a>);
    }, [code, accessToken, activityList]);

    return (
        <div className="App">
            <div>
                {stravaLogin}
            </div>
            <Player
                component={MyActivities}
                durationInFrames={1800}
                compositionWidth={1024}
                compositionHeight={768}
                fps={30}
                controls
            />
        </div>
    );
}

export default App;
