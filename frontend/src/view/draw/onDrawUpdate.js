import turfArea from '@turf/area';

export function onDrawUpdate(e) {
  const data = drawControl.getAll();
  if (data.features.length > 0) {
    try {
      const area = turfArea(data);
      const rounded_area = Math.round(area * 100) / 100;
      document.getElementById(
        'calculated-area'
      ).innerHTML = `<p><strong>${rounded_area}</strong></p><p>square meters</p>`;
      document.getElementById('geojson').value = JSON.stringify(data);
    } catch (e) {
      console.error(e);
    }
  } else {
    // eslint-disable-next-line no-undef
    answer.innerHTML = '';
    // eslint-disable-next-line no-undef
    geo.value = '';
    if (e.type !== 'draw.delete')
      alert('Click the map to draw a polygon.');
  }
}
