import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  Polygon,
} from 'react-leaflet';
import Geoman from './Geoman';
import './styles.css';
//import GeoSlider from './GeoSlider';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import turfBuffer from 'turf-buffer';
window.L = L;
window.turfBuffer = turfBuffer;
const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

function GeoSlider() {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    console.log('handleChange');

    leafletContainer.pm.getGeomanLayers().map((layer) => {
      const geojson1 = layer.toGeoJSON();

      const geojson = turfBuffer(
        geojson1,
        value,
        'kilometers',
      );
      const area = (turfArea(geojson) / 1000000).toFixed(2);
      geojson.properties.area = area;
      layer.bindPopup(`Area: ${area} sq. km`);
      layer.openPopup();
      document.getElementById('geojson').value =
        JSON.stringify(geojson);

      document.getElementById('estTimeComplete').value =
        Math.round((area * 9) / 60);
    });
  };

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        Buffer (km.)
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        // defaultValue={0}
        // onChange={onChange}
        //getAriaValueText={valuetext}
        //aria-labelledby="discrete-slider"
        //valueLabelDisplay="auto"
        step={0.1}
        //marks
        min={0}
        max={5}
      />
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
        {/* <Polygon
          pathOptions={{ color: 'purple' }}
          positions={[]}
        /> */}
        <Geoman />
      </MapContainer>
    </>
  );
};
export default MapView;
