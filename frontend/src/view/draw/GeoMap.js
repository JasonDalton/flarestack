import { useEffect, useRef } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import config from '../../config';
import { GeoSlider } from './components/slider';
import { addControl } from './helpers';
import { initToken } from './initToken';
import { initMap } from './initMap';
import { initStyleSwitcher } from './initStyleSwitcher';
import { initGeolocate } from './initGeolocate';
import { initGeocoder } from './initGeocoder';
import { initDrawControl } from './initDrawControl';
import { initPopup } from './initPopup';
import { UseStyles } from './styles';
import { OnMouseMove } from './OnMouseMove';
import { onDrawUpdate } from './onDrawUpdate';
import { OnMapLoad } from './OnMapLoad';

const GeoMap = () => {
  const classes = UseStyles();
  const mapRef = useRef(null);
  const popup = initPopup();
  const popupRef = useRef(popup);
  useEffect(() => {
    const map = setup(mapRef);
    return () => map.remove();
  }, []);
};

export default GeoMap;
function setup(mapRef) {
  initToken(config.mapboxAccessToken);
  const map = initMap(mapRef);

  const drawControl = initDrawControl();
  map.addControl(styleSwitcher);

  const geoCodeCodeControl = initGeocoder();
  map.addControl(geoCodeCodeControl, 'top-left');

  const geolocate = initGeolocate();
  map.addControl(geolocate);

  const styleSwitcher = initStyleSwitcher();
  map.addControl(drawControl);

  map.on('load', [OnMapLoad]);
  map.on('draw.create', [onDrawUpdate]);
  map.on('draw.delete', [onDrawUpdate]);
  map.on('draw.update', [onDrawUpdate]);
  map.on('mousemove', [OnMouseMove]);
  map.on('mouseleave', () => (map.getCanvas().style.cursor = ''));
  return map;
}

