import {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {continueRender, delayRender} from 'remotion';
import {getAccessToken, isLoggedIn} from '../services/auth';
import {getAthleteActivities, getAthlete} from '../services/data';
import {Athlete} from '../models/Athlete';
import {MyActivity} from '../models/MyActivity';
import {DataContext} from '../contexts/DataContext';
import {UserContext} from '../contexts/UserContext';
import Preview from '../components/Preview';
import RequestForm from '../components/RequestForm';
import RenderList from '../components/RenderList';

export default function Home() {
    const navigate = useNavigate();

    const [accessToken] = useState<string | null>(getAccessToken);
    const [athlete, setAthlete] = useState<Athlete>();
    const [activities, setActivities] = useState<MyActivity[]>([]);
    const [handle] = useState(() => delayRender());

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/login');
        }
    });

    const fetchData = useCallback(async () => {
        if (accessToken) {
            const athlete = await getAthlete(accessToken);
            setAthlete(athlete);
            const athleteActivities = await getAthleteActivities(accessToken);
            setActivities(athleteActivities);

            continueRender(handle);
        }
    }, [accessToken, handle]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <UserContext.Provider value={athlete}>
            <DataContext.Provider value={activities}>
                <RequestForm/>
                <RenderList/>
                <Preview/>
            </DataContext.Provider>
        </UserContext.Provider>
    );
}
