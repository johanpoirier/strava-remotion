import React, { useState, useMemo } from 'react';
import './App.css';
import {Player} from '@remotion/player';
import {HelloWorld} from '../remotion/HelloWorld';
import {fetchAccessTokens, fetchActivities} from '../services/strava';
import Activities from './Activities';

function App({code}: {code?: string}) {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [activityList, setActivityList] = useState<object[]>([]);

    const stravaLogin = useMemo(() => {
        if (activityList) {
            return (<Activities data={activityList} />)
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
        const redirectUri: string = 'http://localhost:3000/';
        const authUrl: string = `https://www.strava.com/oauth/authorize?client_id=105673&redirect_uri=${encodeURI(redirectUri)}&response_type=code&scope=read,activity:read`;
        return (<a href={authUrl}>Login to Strava</a>);
    }, [code, accessToken, activityList]);

    return (
        <div className="App">
            <div>
                {stravaLogin}
            </div>
            <Player
                component={HelloWorld}
                inputProps={{titleText: "Strava", titleColor: "orange"}}
                durationInFrames={120}
                compositionWidth={640}
                compositionHeight={480}
                fps={30}
                controls
            />
        </div>
    );
}

export default App;
