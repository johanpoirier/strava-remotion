import App from '../components/App';
import {isLoggedIn} from '../services/auth';
import {useNavigate} from 'react-router-dom';
import {useEffect} from "react";

export default function Root() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/login');
        }
    });

    return (<App />);
}
