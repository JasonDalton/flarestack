import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});
function valuetext(value) {
  return `${value} meters`;
}
export default function DiscreteSlider() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography
        id="discrete-slider-small-steps"
        gutterBottom
      >
      Select Layer Buffer (m)
      </Typography>
      <Slider
        defaultValue={0}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-small-steps"
        step={100}
        marks
        min={50}
        max={5000}
        valueLabelDisplay="on"
      />
    </div>
  );
}
