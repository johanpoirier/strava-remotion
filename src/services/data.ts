import { fetchActivity, fetchActivityStreams, fetchAthlete, fetchAthleteActivitiesFromDate } from './strava';
import { buildMyActivity } from '../models/MyActivity';
import { buildAthlete } from '../models/Athlete';
import { Store } from '../models/Store';
import { ONE_WEEK_IN_MS } from '../tools/constants';

export async function fetchActivities(accessToken: string, fromDate: Date = new Date(Date.now() - ONE_WEEK_IN_MS)) {
  const stravaActivities: any[] = await fetchAthleteActivitiesFromDate(accessToken, fromDate);
  const stravaActivitiyIds: string[] = stravaActivities.map((activity: any) => activity.id);
  const activityDetails: any[] = await Promise.all(
    stravaActivitiyIds.map((id: string) => fetchActivity(accessToken, id)),
  );
  const streams: any[] = await Promise.all(
    stravaActivitiyIds.map((id: string) => fetchActivityStreams(accessToken, id, ['time', 'altitude'])),
  );
  return activityDetails.map((stravaActivity: any) => {
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
  const activities = await fetchActivities(accessToken);

  return {
    athlete,
    activities,
  };
}
