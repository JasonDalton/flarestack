import mapboxgl from 'mapbox-gl';
import { GeoSettings } from './GeoSettings';

export const initMap = (mapRef) => new mapboxgl.Map({
  container: mapRef.current,
  ...GeoSettings,
});
