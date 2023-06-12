export function getAuthUrl(): string {
  const redirectUri: string = process.env.REACT_APP_REDIRECT_URI ?? 'http://localhost:3002/login';
  return `https://www.strava.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${encodeURI(
    redirectUri,
  )}&response_type=code&scope=read,activity:read`;
}

export async function fetchAccessTokens(code: string): Promise<object> {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  const tokenUrl = `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code`;
  const response: Response = await fetch(tokenUrl, { method: 'POST' });
  if (!response.ok) {
    throw Error(`fetchAccessTokens failed: ${response.statusText}`);
  }
  return response.json();
}

export async function refreshAccessTokens(refreshToken: string): Promise<object> {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  const refreshTokenUrl = `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`;
  const response: Response = await fetch(refreshTokenUrl, { method: 'POST' });
  if (!response.ok) {
    throw Error(`fetchAccessTokens failed: ${response.statusText}`);
  }
  return response.json();
}

function sortActivitiesByDate(a: { start_date: string }, b: { start_date: string }): 1 | -1 {
  return a.start_date > b.start_date ? 1 : -1;
}

export async function fetchAthleteActivities(
  token: string,
  { activityCount }: { activityCount: number },
): Promise<any[]> {
  const activitiesUrl = `https://www.strava.com/api/v3/athlete/activities?per_page=${activityCount}`;
  const response: Response = await fetch(activitiesUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw Error(`fetchActivities failed: ${response.statusText}`);
  }
  const activities = await response.json();
  return activities.sort(sortActivitiesByDate);
}

export async function fetchAthleteActivitiesFromDate(token: string, fromDate: Date): Promise<any[]> {
  const activitiesUrl = `https://www.strava.com/api/v3/athlete/activities?after=${Math.round(
    fromDate.getTime() / 1000,
  )}`;
  const response: Response = await fetch(activitiesUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw Error(`fetchActivities failed: ${response.statusText}`);
  }
  const activities = await response.json();
  return activities.sort(sortActivitiesByDate);
}

export async function fetchActivity(token: string, activityId: string): Promise<any> {
  const activityUrl = `https://www.strava.com/api/v3/activities/${activityId}`;
  const response: Response = await fetch(activityUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw Error(`fetchActivity failed: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchActivityStreams(
  token: string,
  activityId: string,
  streamTypes: string[] = ['distance'],
): Promise<any> {
  const activityUrl = `https://www.strava.com/api/v3/activities/${activityId}/streams?keys=${streamTypes.join(
    ',',
  )}&key_by_type=true`;
  const response: Response = await fetch(activityUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw Error(`fetchActivity failed: ${response.statusText}`);
  }
  const streams = await response.json();
  streams.activityId = activityId;
  return streams;
}

export async function fetchAthlete(token: string): Promise<any> {
  const athleteUrl = 'https://www.strava.com/api/v3/athlete';
  const response: Response = await fetch(athleteUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw Error(`fetchAthlete failed: ${response.statusText}`);
  }
  return response.json();
}
