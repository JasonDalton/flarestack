import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import './styles.css';
import { useLeafletContext } from '@react-leaflet/core';
import turfArea from '@turf/area';
import { useEffect } from 'react';

const Geoman = () => {
  const context = useLeafletContext();
  useEffect(() => {
    const leafletContainer =
      context.layerContainer || context.map;
    window.leafletContainer = leafletContainer;
    window.myLayer = L.geoJSON().addTo(leafletContainer);
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
        console.log(e);
        shape.layer.pm.enable();
        layerCreate(leafletContainer);
        shape.layer.on('pm:edit', (e) => {
          layerCreate(leafletContainer);
        });
      }
    });
    leafletContainer.on('pm:remove', (e) => {
      console.log('object removed');
    });

    return () => {
      leafletContainer.pm.removeControls();
      leafletContainer.pm.setGlobalOptions({
        //pmIgnore: true,
        showTooltip: true,
        // measurement:true,
        // measurements: {
        measurement: true,
        displayFormat: 'metric',
        // },
      });
    };
  }, [context]);
  return null;
};
export default Geoman;



function layerCreate(leafletContainer) {
  leafletContainer.pm.getGeomanLayers().map((layer) => {
    const geojson = layer.toGeoJSON();
    const area = (turfArea(geojson) / 1000000).toFixed(2);
    geojson.properties.area = area;
    layer.bindPopup(`Area: ${area} sq. km`);
    layer.openPopup();
    document.getElementById('geojson').value =
      JSON.stringify(geojson);

    document.getElementById('estTimeComplete').value =
      Math.round((area * 9) / 60);
  });
}
