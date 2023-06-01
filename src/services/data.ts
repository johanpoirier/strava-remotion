import {fetchAthlete, fetchActivities, fetchActivityStreams} from './strava';
import {buildMyActivity} from '../models/MyActivity';
import {buildAthlete} from '../models/Athlete';
import {ACTIVITY_COUNT_TO_RENDER} from '../tools/constants';

export async function getAthleteActivities(accessToken: string, activityCount: number = ACTIVITY_COUNT_TO_RENDER) {
    const stravaActivities: any[] = await fetchActivities(accessToken, {activityCount});
    const streams: any[] = await Promise.all(stravaActivities.map(({id}) => fetchActivityStreams(accessToken, id, ['time', 'altitude'])));
    return stravaActivities.map((stravaActivity: any) => {
        return buildMyActivity(stravaActivity, streams.find(({activityId}) => activityId === stravaActivity.id));
    });
}
export async function getAthlete(accessToken: string) {
    const stravaAthlete: any = await fetchAthlete(accessToken);
    return buildAthlete(stravaAthlete);
}
