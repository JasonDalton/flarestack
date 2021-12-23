import { makeStyles } from '@material-ui/core';

export const UseStyles = makeStyles((theme) => ({
  chartWrapper: {
    border: '1px solid rgb(224, 224, 224)',
    borderRadius: '5px',
    backgroundColor: '#fff',
    padding: theme.spacing(2),
  },
  mapWrapper: {
    height: '50vh',
    width: '100%',
  },
}));
