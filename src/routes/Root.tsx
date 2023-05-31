import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {isLoggedIn} from '../services/auth';
import Preview from '../components/Preview';
import RequestForm from '../components/RequestForm';

export default function Root() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/login');
        }
    });

    return (
        <>
            <RequestForm/>
            <Preview/>
        </>
    );
}
