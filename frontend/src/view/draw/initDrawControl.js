import MapboxDraw from '@mapbox/mapbox-gl-draw';

export const initDrawControl = () => new MapboxDraw({
  displayControlsDefault: true,
  controls: {
    polygon: true,
    line_string: true,
    trash: true,
    combine_features: false,
  },
  defaultMode: 'draw_polygon',
});
