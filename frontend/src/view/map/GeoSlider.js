/* eslint-disable no-undef */
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

//var myLayer = L.geoJSON().addTo(leafletContainer);

/* function valuetext(value) {
  console.log(value);
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

  return `${value} km.`;
}
 */

function valuetext(value) {
  return `${value}°C`;
}

function GeoSlider() {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    console.log('handleChange');
    return;
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

export default GeoSlider;
