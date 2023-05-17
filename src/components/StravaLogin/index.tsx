import React, {useEffect, useState} from 'react';
import {fetchAccessTokens, getAuthUrl} from '../../services/strava';
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, TOKEN_EXPIRATION_KEY} from '../../tools/constants';
import {useNavigate} from 'react-router-dom';
import './style.css';

export default function StravaLogin({code}: { code?: string }) {
    const navigate = useNavigate();

    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem(ACCESS_TOKEN_KEY));

    useEffect(() => {
        if (!code) {
            return;
        }
        fetchAccessTokens(code).then((tokens) => {
            // @ts-ignore
            setAccessToken(tokens['access_token']);
            // @ts-ignore
            localStorage.setItem(ACCESS_TOKEN_KEY, tokens['access_token']);
            // @ts-ignore
            localStorage.setItem(REFRESH_TOKEN_KEY, tokens['refresh_token']);
            // @ts-ignore
            localStorage.setItem(TOKEN_EXPIRATION_KEY, tokens['expires_at']);
        });
    }, [code]);

    useEffect(() => {
        if (accessToken) {
            navigate('/');
        }
    }, [accessToken])


    const renderLoginLink = () => {
        if (!accessToken) {
            return (<a className="strava-login-button" href={getAuthUrl()}>Login to Strava</a>);
        }
        return null;
    }

    return (
        <main className="strava-login">
            {renderLoginLink()}
        </main>
    );
}
