import Permissions from 'src/security/permissions';
import { i18n } from 'src/i18n';
import React from 'react';
import CreditCardOutlinedIcon from '@material-ui/icons/CreditCardOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import HistoryIcon from '@material-ui/icons/History';
import SettingsIcon from '@material-ui/icons/Settings';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MapIcon from '@material-ui//icons/Map';
import ListIcon from '@material-ui/icons/List';
import config from 'src/config';

const permissions = Permissions.values;

export default [
  /*   {
    path: '/',
    exact: true,
    icon: <MapIcon />,
    label: i18n('dashboard.menu'),
    permissionRequired: null,
  }, */

  /*   config.isPlanEnabled && {
    path: '/plan',
    permissionRequired: permissions.planRead,
    icon: <CreditCardOutlinedIcon />,
    label: i18n('plan.menu'),
  },
*/
  /*

   {
     path: '/settings',
     icon: <SettingsIcon />,
     label: i18n('settings.menu'),
     permissionRequired: permissions.settingsEdit,
   }, */
  /*
  {
    path: '/aoi',
    permissionRequired: permissions.aoiRead,
    icon: <ChevronRightIcon />,
    label: i18n('entities.aoi.menu'),
  }, */

  {
    path: '/',
    exact: true,
    icon: <MapIcon />,
    label: i18n('entities.aoi.menu'),
    permissionRequired: permissions.aoiRead,
  },
  {
    path: '/order',
    permissionRequired: permissions.orderRead,
    icon: <ListIcon />,
    label: i18n('entities.order.menu'),
  },
  {
    path: '/user',
    label: i18n('user.menu'),
    permissionRequired: permissions.userRead,
    icon: <PersonIcon />,
  },
  {
    path: '/audit-logs',
    icon: <HistoryIcon />,
    label: i18n('auditLog.menu'),
    permissionRequired: permissions.auditLogRead,
  }
].filter(Boolean);
