import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { MapboxStyleSwitcherControl } from 'mapbox-gl-style-switcher';
import config from '../../config';
import { GeoSettings } from './GeoSettings';

export const initToken = (token) => (mapboxgl.accessToken = token);
export const initMap = (mapRef) =>
  new mapboxgl.Map({
    container: mapRef.current,
    ...GeoSettings,
  });
export const initStyleSwitcher = () => new MapboxStyleSwitcherControl();
export const initGeolocate = () =>
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true,
  });
export const initGeocoder = () =>
  new MapboxGeocoder({
    accessToken: config.mapboxAccessToken,
    mapboxgl: mapboxgl,
  });
export const initDrawControl = () =>
  new MapboxDraw({
    displayControlsDefault: true,
    controls: {
      polygon: true,
      line_string: true,
      trash: true,
      combine_features: false,
    },
    defaultMode: 'draw_polygon',
  });
export const initPopup = () =>
  new mapboxgl.Popup({
    offset: 15,
  });
