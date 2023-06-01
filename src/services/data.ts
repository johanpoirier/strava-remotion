import {fetchActivities, fetchActivityStreams} from './strava';
import {buildMyActivity} from '../models/MyActivity';
import {ACTIVITY_COUNT_TO_RENDER} from '../tools/constants';

export async  function fetchAthleteActivities(accessToken: string) {
    const stravaActivities: any[] = await fetchActivities(accessToken, {activityCount: ACTIVITY_COUNT_TO_RENDER});
    const streams: any[] = await Promise.all(stravaActivities.map(({id}) => fetchActivityStreams(accessToken, id, ['time', 'altitude'])));
    return stravaActivities.map((stravaActivity: any) => {
        return buildMyActivity(stravaActivity, streams.find(({activityId}) => activityId === stravaActivity.id));
    });
}