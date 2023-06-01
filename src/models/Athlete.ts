export interface Athlete {
    id: string
    username: string
    firstname: string
    lastname: string
    profile: string
}

export function buildAthlete(data: any): Athlete {
    return {
        id: data.id,
        username: data.username,
        firstname: data.firstname,
        lastname: data.lastname,
        profile: data.profile
    };
}
