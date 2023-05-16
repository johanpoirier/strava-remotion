import React, {useState, useMemo, useCallback, useEffect} from 'react';
import './App.css';
import {Player} from '@remotion/player';
import {MyActivities} from '../remotion/MyActivities';
import {fetchAccessTokens, fetchActivities, fetchActivityStreams, getAuthUrl} from '../services/strava';
import { DataContext } from '../contexts/DataContext';
import {buildMyActivity, MyActivity} from '../models/MyActivity';
import {continueRender, delayRender} from 'remotion';

function App({code}: {code?: string}) {
    const [accessToken, setAccessToken] = useState<string | null>('plop');
    const [activityList, setActivityList] = useState<MyActivity[]>([]);
    const [handle] = useState(() => delayRender());

    const fetchData = useCallback(async () => {
        if (accessToken) {
            const stravaActivities: any[] = await fetchActivities(accessToken);
            const streams: any[] = await Promise.all(stravaActivities.map(({id}) => fetchActivityStreams(accessToken, id, ['altitude'])));
            setActivityList(stravaActivities.slice(0, 10).map((stravaActivity: any) => {
                return buildMyActivity(stravaActivity, streams.find(({activityId}) => activityId === stravaActivity.id));
            }));

            continueRender(handle);
        }
    }, [accessToken, handle]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const stravaLogin = useMemo(() => {
        if (activityList.length > 0) {
            return (<span>Done</span>)
        }
        if (code) {
            fetchAccessTokens(code).then((tokens) => {
                // @ts-ignore
                setAccessToken(tokens['access_token']);
            });
            return (<span>{code}</span>);
        }
        return (<a href={getAuthUrl()}>Login to Strava</a>);
    }, [code, activityList]);

    if (activityList.length === 0) {
        return (<span>Loading…</span>);
    }

    return (
        <DataContext.Provider value={activityList}>
            <div className="App">
                <div>
                    {stravaLogin}
                </div>
                <Player
                    component={MyActivities}
                    durationInFrames={activityList.length * 60}
                    compositionWidth={1024}
                    compositionHeight={768}
                    fps={30}
                    controls
                />
            </div>
        </DataContext.Provider>
    );
}

export default App;
