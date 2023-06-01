import {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {continueRender, delayRender} from 'remotion';
import {isLoggedIn} from '../services/auth';
import {getAthleteActivities, getAthlete} from '../services/data';
import {Athlete} from '../models/Athlete';
import {MyActivity} from '../models/MyActivity';
import {DataContext} from '../contexts/DataContext';
import {UserContext} from '../contexts/UserContext';
import Preview from '../components/Preview';
import RequestForm from '../components/RequestForm';

export default function Root() {
    const navigate = useNavigate();

    const [accessToken] = useState<string | null>(localStorage.getItem('atkn'));
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
                <Preview/>
            </DataContext.Provider>
        </UserContext.Provider>
    );
}
