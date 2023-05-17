import {fetchActivities, fetchActivityStreams} from './strava';
import {buildMyActivity} from '../models/MyActivity';

export async  function fetchAthleteActivities(accessToken: string) {
    const stravaActivities: any[] = await fetchActivities(accessToken);
    const streams: any[] = await Promise.all(stravaActivities.map(({id}) => fetchActivityStreams(accessToken, id, ['altitude'])));
    return stravaActivities.slice(0, 10).map((stravaActivity: any) => {
        return buildMyActivity(stravaActivity, streams.find(({activityId}) => activityId === stravaActivity.id));
    });
}