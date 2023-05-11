export async function fetchAccessTokens(code: string): Promise<object> {
    const clientId = '';
    const clientSecret = '';
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
