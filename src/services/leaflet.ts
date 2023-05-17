import polyline from '../tools/polyline';
// @ts-ignore
import L from 'leaflet';

const startIcon = L.icon({
    iconUrl: '/marker.png',
    iconSize:     [48, 48], // size of the icon
    iconAnchor:   [24, 48], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

const endIcon = L.icon({
    iconUrl: '/marker-end.png',
    iconSize:     [48, 48], // size of the icon
    iconAnchor:   [24, 48], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

export function decodeEncodedPolyline(encodedData: string): any[] {
  return polyline.decode(encodedData);
}
export function generateMap(elementId: string, coordinates: any[]): any {
    // Creating a map object
    const map = new L.map(elementId);

    // Creating a Layer object
    const layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

    // Adding layer to the map
    map.addLayer(layer);

    const myBounds = new L.LatLngBounds(coordinates);
    map.fitBounds(myBounds);

    // const polylineOptions = {color: 'red'}
    // const polyline = L.polyline(coordinates, polylineOptions);
    // polyline.addTo(map);
    // console.log('coordinates count', coordinates.length);
    //
    // L.marker(coordinates[0], {icon: startIcon}).addTo(map);
    // L.marker(coordinates[coordinates.length - 1], {icon: endIcon}).addTo(map);

    return map;
}

export function drawActivityRoute(map: any, coordinates: any[]) {
    const polylineOptions = {color: 'red'}
    const polyline = L.polyline(coordinates, polylineOptions);
    polyline.addTo(map);
}
export function drawActivityMarker(map: any, coordinates: number[], iconType: string = 'start') {
    L.marker(coordinates, {icon: iconType === 'start' ? startIcon : endIcon}).addTo(map);
}