import { fetchAthleteActivities, fetchActivityStreams, fetchAthlete } from './strava.mock';
import { buildMyActivity } from '../models/MyActivity';
import { buildAthlete } from '../models/Athlete';
import { ACTIVITY_COUNT_TO_RENDER } from '../tools/constants';
import { Store } from '../models/Store';

export async function fetchActivities(accessToken: string, activityCount: number = ACTIVITY_COUNT_TO_RENDER) {
  const stravaActivities: any[] = await fetchAthleteActivities(accessToken, { activityCount });
  const streams: any[] = await Promise.all(
    stravaActivities.map(({ id }) => fetchActivityStreams(accessToken, id, ['time', 'altitude'])),
  );
  return stravaActivities.map((stravaActivity: any) => {
    return buildMyActivity(
      stravaActivity,
      streams.find(({ activityId }) => activityId === stravaActivity.id),
    );
  });
}
export async function fetchUser(accessToken: string) {
  const stravaAthlete = await fetchAthlete(accessToken);
  return buildAthlete(stravaAthlete);
}

export async function getDataForStore(accessToken: string): Promise<Store> {
  const athlete = await fetchUser(accessToken);
  const activities = await fetchActivities(accessToken, 10);

  return {
    athlete,
    activities,
  };
}
