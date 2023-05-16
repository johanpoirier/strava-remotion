import {decodeEncodedPolyline} from '../services/leaflet';

export interface MyActivity {
    id: string
    name: string
    type: string
    startDate: string
    distance: number
    elevationGain: number
    duration: number
    map: any[]
    streams: any
}

export function buildMyActivity(data: any, streams: any): MyActivity {
    return {
        id: data.id,
        name: data.name,
        type: data.sport_type,
        startDate: data.start_date,
        distance: data.distance,
        elevationGain: data.total_elevation_gain,
        duration: data.moving_time,
        map: decodeEncodedPolyline(data.map['summary_polyline']),
        streams
    };
}