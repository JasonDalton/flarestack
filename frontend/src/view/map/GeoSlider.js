import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
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
export default GeoSlider;
