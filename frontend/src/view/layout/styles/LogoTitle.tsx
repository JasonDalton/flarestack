import React from 'react';
import {
  Typography,
  withStyles
} from '@material-ui/core';
import { i18n } from 'src/i18n';
function makeTitle(props) {
  const { classes } = props
  return (
    <Typography
      variant="h4"
      className={classes.brandText}
      display="inline"
      color="secondary"
    >
      {i18n('app.title')}
    </Typography>
  )
}


const LogoTitle = withStyles({
  brandText: {
    fontFamily: `'Fira Sans', sans-serif`,
    fontWeight: 400,
    // color:  theme.palette.primary.main,
  },
})(makeTitle);

export default LogoTitle