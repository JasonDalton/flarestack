import mapboxgl from 'mapbox-gl';


export const initToken = (token) => (mapboxgl.accessToken = token);
