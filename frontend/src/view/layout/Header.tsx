import layoutActions from 'src/modules/layout/layoutActions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import UserMenu from 'src/view/layout/UserMenu';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import selectors from 'src/modules/auth/authSelectors';

const useStyles = makeStyles((theme) => ({
  appBar: {
    color: theme.palette.getContrastText(
      theme.palette.secondary.main,
    ),
    zIndex: theme.zIndex.drawer + 1,
  },
  logo: {
    paddingLeft: theme.spacing(1),
    fontWeight: 500,
    fontSize: '1.5em',
    color: theme.palette.getContrastText(
      theme.palette.secondary.main,
    ),
    textDecoration: 'none',
  },
  grow: {
    flex: '1 1 auto',
  },
}));

function Header(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const logoUrl = useSelector(selectors.selectLogoUrl);

  const doToggleMenu = () => {
    dispatch(layoutActions.doToggleMenu());
  };

  return (
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          onClick={doToggleMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>

        <Link className={classes.logo} to="/">
          {logoUrl ? (
            <img
              src={logoUrl}
              height="40px"
              alt={i18n('app.title')}
              style={{ verticalAlign: 'middle',backgroundColor:'#fff' }}
            />
          ) : (
            <>{i18n('app.title')}</>
          )}
        </Link>

        <div className={classes.grow} />


        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
