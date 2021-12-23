import turfBuffer from 'turf-buffer';
import Line from '../../data/line';

export function OnMapLoad(map) {
  map.addSource('demoLine', {
    type: 'geojson',
    data: Line,
  });

  map.addLayer({
    id: 'demoLine',
    type: 'line',
    source: 'demoLine',
    layout: {},
    paint: {
      'line-color': '#000',
      'line-width': 3,
    },
  });
  var buffer = turfBuffer(Line, 0.2, 'miles');
  map.addSource('demoBuffer', {
    type: 'geojson',
    data: buffer.features[0],
  });
  map.addLayer({
    id: 'demoBuffer',
    type: 'fill',
    source: 'demoBuffer',
    layout: {},
    paint: {
      'fill-color': '#0080ff',
      'fill-opacity': 0.5,
    },
  });
}
