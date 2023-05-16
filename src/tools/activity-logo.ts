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
        case 'EBikeRide':
        case 'Ride':
            return 'bicycle.png';
        case 'StandUpPaddling':
            return 'sup.png';
        case 'Swim':
            return 'swimming.png';
        case 'AlpineSki':
        case 'BackcountrySki':
        case 'Canoeing':
        case 'Crossfit':
        case 'Elliptical':
        case 'Golf':
        case 'Handcycle':
        case 'IceSkate':
        case 'InlineSkate':
        case 'Kayaking':
        case 'Kitesurf':
        case 'NordicSki':
        case 'RockClimbing':
        case 'RollerSki':
        case 'Rowing':
        case 'Sail':
        case 'Skateboard':
        case 'Snowboard':
        case 'Snowshoe':
        case 'Soccer':
        case 'StairStepper':
        case 'Surfing':
        case 'Velomobile':
        case 'VirtualRide':
        case 'VirtualRun':
        case 'WeightTraining':
        case 'Wheelchair':
        case 'Windsurf':
        case 'Workout':
        case 'Yoga':
        default:
            return 'activity.png';
    }
}