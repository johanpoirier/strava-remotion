export function getAuthUrl(): string {
    const redirectUri: string = process.env.REACT_APP_REDIRECT_URI ?? 'http://localhost:3000';
    return `https://www.strava.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${encodeURI(redirectUri)}&response_type=code&scope=read,activity:read`;
}

export async function fetchAccessTokens(code: string): Promise<object> {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
    const tokenUrl = `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code`
    const response: Response = await fetch(tokenUrl, {method: 'POST'});
    if (!response.ok) {
        throw Error(`fetchAccessTokens failed: ${response.statusText}`);
    }
    return response.json();
}

export async function fetchActivities(token: string): Promise<object[]> {
    const activitiesUrl: string = `https://www.strava.com/api/v3/athlete/activities`;
    const response: Response = await fetch(activitiesUrl, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw Error(`fetchActivities failed: ${response.statusText}`);
    }
    return response.json();
}
