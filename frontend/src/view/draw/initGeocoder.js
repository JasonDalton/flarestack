import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import config from '../../config';

export const initGeocoder = () => new MapboxGeocoder({
  accessToken: config.mapboxAccessToken,
  mapboxgl: mapboxgl,
});
