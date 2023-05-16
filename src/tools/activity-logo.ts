export function getActivityLogo(activityType: string) {
    switch (activityType) {
        case 'Run':
            return 'running.png';
        case 'TrailRun':
            return 'trail-running.png';
        case 'Walk':
            return 'walking.png';
        case 'Hike':
            return 'hiking.png';
        case 'MountainBikeRide':
            return 'mountain-bike.png';
        case 'Ride':
            return 'bicycle.png';
        case 'StandUpPaddling':
            return 'sup.png';
        case 'Swim':
            return 'swimming.png';
        default:
            return 'activity.png';
    }
}