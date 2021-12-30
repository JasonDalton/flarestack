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
    const leafletContainer =
      context.layerContainer || context.map;
    fl.leafletContainer = leafletContainer;
    fl.myLayer = L.geoJSON().addTo(leafletContainer);
    leafletContainer.pm.addControls({
      drawMarker: false,
      drawCircleMarker: false,
    });
    leafletContainer.pm.setGlobalOptions({
      pmIgnore: false,
    });
    leafletContainer.on('pm:create', (e) => {
      if (e.layer && e.layer.pm) {
        const shape = e;
        shape.layer.pm.enable();
        layerCreate(leafletContainer);
        shape.layer.on('pm:edit', (e) => {
          layerCreate(leafletContainer);
        });
      }
    });
    leafletContainer.on('pm:remove', (e) => {
      console.log('object removed');
      fl.shape = null;
      fl.workingLayer = null;
      fl.myLayer.clearLayers();
      document.getElementById('geojson').value = null;
      document.getElementById('estTimeComplete').value =
        null;
    });
    leafletContainer.on(
      'pm:drawstart',
      ({ workingLayer, shape }) => {
        console.log('drawstart', shape);
        fl.shape = shape;
        fl.workingLayer = workingLayer;
        fl.myLayer.clearLayers();
        document.getElementById('geojson').value = null;
        document.getElementById('estTimeComplete').value =
          null;
        document.getElementById(
          'bufferSlider',
        ).style.visibility =
          fl.shape === 'Line' ? 'visible' : 'hidden';
        workingLayer.on(
          'pm:vertexadded',
          ({ shape, workingLayer, marker, latlng }) => {
            if (fl.shape !== 'Line') {
              return;
            }
            if (
              workingLayer.toGeoJSON().geometry.coordinates
                .length < 2
            ) {
              return;
            }
            const geojson = workingLayer.toGeoJSON();
            const geojsonBuffer = turfBuffer(
              geojson,
              fl.flightBuffer,
              'kilometers',
            );
            fl.myLayer.clearLayers();
            fl.myLayer.addData(geojsonBuffer);
          },
        );
      },
    );
    return () => {
      leafletContainer.pm.removeControls();
      leafletContainer.pm.setGlobalOptions({
        showTooltip: true,
      });
    };
  }, [context]);
  return null;
};
export default Geoman;
function layerCreate(leafletContainer) {
  if (fl.shape === 'Line') {
    const geojson = fl.myLayer.toGeoJSON().features[0];
    calcLayer(
      geojson,
      leafletContainer.pm.getGeomanLayers()[0],
    );
  } else {
    leafletContainer.pm.getGeomanLayers().forEach((layer) => {
      let geojson = layer.toGeoJSON();
      calcLayer(geojson, layer);
    });
  }
}
function calcLayer(geojson, layer) {
  const area = (turfArea(geojson) / 1000000).toFixed(2);
  geojson.properties.area = area;
  layer.bindPopup(`Area: ${area} sq. km`);
  layer.openPopup();
  document.getElementById('geojson').value = JSON.stringify(
    {
      type: 'FeatureCollection',
      features: [geojson],
    },
  );
  document.getElementById('estTimeComplete').value =
    Math.round((area * 9) / 60);
}
