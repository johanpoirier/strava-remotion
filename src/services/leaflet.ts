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
export function generateMap(elementId: string, coordinates: any[], onRenderComplete?: any): any {
    const canvasRenderer = L.canvas();
    const map = new L.map(elementId, {renderer: canvasRenderer});

    const layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

    // Adding layer to the map
    map.addLayer(layer);

    const myBounds = new L.LatLngBounds(coordinates);
    map.fitBounds(myBounds);

    if (onRenderComplete) {
        canvasRenderer.on('update', onRenderComplete);
    }

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