import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import './LMap.css';
const useStyles = makeStyles({
  root: {
    // width: '100%',
    zIndex: '10000000',
    position: 'absolute',
    width: '200px',
    left: '0',
    bottom: '0',
    margin: '10px',
    background: '#fff',
    padding: '10px',
  },
});
const valuetext = (value) => `${value} meters`;
function handleChange() {}
function GeoSlider() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-small-steps" gutterBottom>
        Flight Path Buffer (m)
      </Typography>
      <Slider
        defaultValue={0}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-small-steps"
        onChange={handleChange}
        step={100}
        marks
        min={50}
        max={5000}
        valueLabelDisplay="auto"
      />
    </div>
  );
}
//export default GeoSlider;

//import L from 'leaflet';
//import '@geoman-io/leaflet-geoman-free';
//import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

//import GeoSlider from './GeoSlider';

class LMap extends React.Component {
  //constructor() {
  //  this.state = { flighttool: false };
  //}
  componentDidMount() {
    // create map
    this.map = L.map('map', {
      center: [49.8419, 24.0315],
      zoom: 16,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });
    this.map.pm.addControls({
      position: 'topleft',
      drawCircleMarker: false,
      drawMarker: false,
    });

    this.map.on('pm:create', ({ shape, layer }) => {
      console.log(layer);
      //window.layer = layer;
      // e.layer.setStyle({ pmIgnore: false });
      // L.PM.reInitLayer(e.layer);
      document.getElementById('geojson').value = JSON.stringify(
        layer.toGeoJSON(),
      );

      layer // listen to when a layer is changed in Edit Mode
        .on('pm:edit', ({ layer }) => {
          //  console.log(e);
          document.getElementById('geojson').value = JSON.stringify(
            layer.toGeoJSON(),
          );
        });
    });

   // this.map.on('pm:buttonclick', (e) => {
    //  console.log(e);
   // });
  }

  render() {
    return (
      <>
        <div id="map" style={{ height: '500px' }}>
          <GeoSlider />
        </div>
      </>
    );
  }
}

export default LMap;
