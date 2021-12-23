export const defaultSettings = {
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



export function GeoSettings(overrides = {}) {
  return {
    ...defaultSettings,
    ...overrides,
  };
}
