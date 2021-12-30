import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  Polygon,
} from 'react-leaflet';

import L from "leaflet"
import Geoman from './Geoman';
import './styles.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
var fl = {
  leafletContainer: null,
  myLayer: null,
  flightBuffer: 1,
  shape: null,
};
window.fl = fl;
const useStyles = makeStyles({
  root: {
    width: 300,
  },
  slider: {
    visibility: 'hidden',
  },
});
function valuetext(value) {
  return `${value}`;
}
function GeoSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState(fl.flightBuffer);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    fl.flightBuffer = newValue;
  };
  return (
    <div className={classes.root}>
      <div id="bufferSlider" className={classes.slider}>
        <Typography id="discrete-slider" gutterBottom>
          Buffer (km.)
        </Typography>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
          step={0.1}
          min={0}
          max={5}
        />
      </div>
    </div>
  );
}
const MapView = () => {
  const position = [39.097428, -77.61343];
  const zoomLv = 13;
  return (
    <>
      <GeoSlider />
      <MapContainer
        center={position}
        zoom={zoomLv}
        scrollWheelZoom={false}
        //doubleClickZoom={false}
      >
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        <Geoman />
      </MapContainer>
    </>
  );
};
export default MapView;
