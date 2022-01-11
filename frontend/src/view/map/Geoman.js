/* eslint-disable no-undef */
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import './styles.css';
import { useLeafletContext } from '@react-leaflet/core';
import turfArea from '@turf/area';
import { useEffect } from 'react';
import turfBuffer from 'turf-buffer';
const Geoman = () => {
  const context = useLeafletContext();
  useEffect(() => {
    const lmap = context.layerContainer || context.map;
    //L.PM.setOptIn(false);
    fl.lmap = lmap;
    const myLayer = L.geoJSON(null, {
      snapIgnore: true,
      style: function (feature) {
        return {
          color: 'blue',
          fillColor: 'blue',
          fillOpacity: 0.2,
          weight: 1,
        };
      },
    }).addTo(lmap);
    fl.myLayer = myLayer;
    lmap.pm.addControls({
      drawMarker: false,
      drawCircleMarker: false,
    });
    lmap.pm.setGlobalOptions({
      pmIgnore: true,
    });
    lmap.pm.setPathOptions({
      color: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.2,
      weight: 2,
    });
    lmap.on('pm:create', ({ shape, layer }) => {
      layer.pm.enable();
      layer.setStyle({ pmIgnore: false });
      L.PM.reInitLayer(layer);
      onEdit(lmap);
      layer.on('pm:edit', (e) => {
        onEdit(lmap);
      });
    });
    lmap.on('pm:remove', (e) => {
      onRemove(lmap);
    });
    lmap.on('pm:drawstart', ({ workingLayer, shape }) => {
      onRemove(lmap);
      //  ignoreShapes: ['Circle', 'Rectangle'],
      //workingLayer.setStyle(mapstyle);
      fl.shape = shape;
      myLayer.clearLayers();
      document.getElementById('geojson').value = null;
      document.getElementById('estTimeComplete').value =
        null;
      document.getElementById(
        'bufferSlider',
      ).style.visibility =
        fl.shape === 'Line' ? 'visible' : 'hidden';
      workingLayer.on('pm:vertexadded', (e) => {
        window.ee = e;
        onEdit(lmap, e.layer);
      });
    });
    return () => {
      lmap.pm.removeControls();
      lmap.pm.setGlobalOptions({
        showTooltip: true,
      });
    };
  }, [context]);
  return null;
};
export default Geoman;
function onRemove(lmap) {
  fl.shape = null;
  fl.myLayer.clearLayers();
  lmap.pm
    .getGeomanLayers()
    .forEach((layer) => layer.remove());
  document.getElementById('geojson').value = null;
  document.getElementById('estTimeComplete').value = null;
}
function onEdit(lmap, l) {
  fl.myLayer.clearLayers();
  console.log('onEdit');
  const layer = l || lmap.pm.getGeomanDrawLayers()[0];
  if (!layer) {
    return;
  }
  const geojsonMain = layer.toGeoJSON();
  const isline =
    geojsonMain?.geometry?.type === 'LineString';
  if (!isline) {
    calcLayer(geojsonMain);
    const area = calcLayer(geojsonMain);
    layer.bindPopup(`Area: ${area} sq. km`);
    layer.openPopup();
  }
  const coords = geojsonMain?.geometry?.coordinates || [];
  if (coords.length < 2) {
    return;
  }
  const geojsonBuffer = turfBuffer(
    geojsonMain,
    fl.flightBuffer,
    'kilometers',
  );
  fl.myLayer.addData(geojsonBuffer);
  const area = calcLayer(geojsonBuffer, fl.myLayer);
  layer.bindPopup(`Area: ${area} sq. km`);
  layer.openPopup();
}
function calcLayer(geojson, layer) {
  const coords = geojson?.geometry?.coordinates || [];
  const len = coords.length;
  const area = len
    ? (turfArea(geojson) / 1000000).toFixed(2)
    : 0;
  let geostr;
  if (len) {
    geojson.properties.area = area;
    geostr = JSON.stringify({
      type: 'FeatureCollection',
      features: [geojson],
    });
  }
  document.getElementById('geojson').value = geostr;
  document.getElementById('estTimeComplete').value =
    Math.round((area * 9) / 60);
  return area;
}
