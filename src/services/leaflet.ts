import { staticFile } from 'remotion';
// @ts-ignore
import L from 'leaflet';
import polyline from '../tools/polyline';

const startIcon = L.icon({
  iconUrl: staticFile('marker.png'),
  iconSize: [48, 48], // size of the icon
  iconAnchor: [24, 48], // point of the icon which will correspond to marker's location
  popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
});

const endIcon = L.icon({
  iconUrl: staticFile('/marker-end.png'),
  iconSize: [48, 48], // size of the icon
  iconAnchor: [24, 48], // point of the icon which will correspond to marker's location
  popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
});

export function decodeEncodedPolyline(encodedData: string): unknown[] {
  return polyline.decode(encodedData);
}
export function generateMap(elementId: string, coordinates: number[][], onRenderComplete?: unknown): unknown {
  const canvasRenderer = L.canvas();

  const map = new L.map(elementId, {
    attributionControl: false,
    dragging: false,
    keyboard: false,
    renderer: canvasRenderer,
    scrollWheelZoom: false,
    touchZoom: false,
    zoomControl: false,
  });
  map.addLayer(new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'));
  map.fitBounds(new L.LatLngBounds(coordinates));

  if (onRenderComplete) {
    canvasRenderer.on('update', onRenderComplete);
  }

  return map;
}

export function drawActivityRoute(map: unknown, coordinates: number[][]) {
  const polylineOptions = { color: 'red' };
  const polyline = L.polyline(coordinates, polylineOptions);
  polyline.addTo(map);
}
export function drawActivityMarker(map: unknown, coordinates: number[], iconType = 'start') {
  L.marker(coordinates, { icon: iconType === 'start' ? startIcon : endIcon }).addTo(map);
}
