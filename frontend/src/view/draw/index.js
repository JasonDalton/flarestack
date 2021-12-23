import mapboxgl from 'mapbox-gl';
import GeoSlider from './components/slider';
import GeoPopup from './components/popup';
const defaultSettings = {
  map: {
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-73.95747184753418, 40.6284804653916],
    zoom: 12.5,
  },
  drawControl: {
    displayControlsDefault: true,
    controls: {
      polygon: true,
      line_string: true,
      trash: true,
      combine_features: false,
    },
    defaultMode: 'draw_polygon',
  },
};
function initSettings(overrides = {}) {
  return {
    ...defaultSettings,
    ...overrides,
  };
}
//{GeoSlider,GeoToolTip};
export const initToken = (token) => (mapboxgl.accessToken = token);
function geoDraw(token, settings) {
  initToken(token);
  const settings = initSettings(settings);
  return { settings: settings };
}

export default geoDraw;
