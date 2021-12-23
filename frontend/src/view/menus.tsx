import Permissions from 'src/security/permissions';
import { i18n } from 'src/i18n';
import React from 'react';
//import CreditCardOutlinedIcon from '@material-ui/icons/CreditCardOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HistoryIcon from '@material-ui/icons/History';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import MapIcon from '@material-ui//icons/Map';
import ListIcon from '@material-ui/icons/List';
const permissions = Permissions.values;
export default [
  {
    path: '/',
    exact: true,
    icon: <DashboardIcon />,
    label: 'Maps'/* i18n('dashboard.menu') */,
    permissionRequired: null,
  },
/*   {
    path: '/draw',
    icon: <MapIcon />,
    permissionRequired: permissions.mapRead,
    label: i18n('draw.menu'),
  }, */
/*   {
    path: '/list',
    permissionRequired: permissions.mapRead,
    icon: <ChevronRightIcon />,
    label: i18n('entities.map.menu'),
  }, */
/*   {
    path: '/settings',
    icon: <SettingsIcon />,
    label: i18n('settings.menu'),
    permissionRequired: permissions.settingsEdit,
  }, */
/*   {
    path: '/map/new',
    permissionRequired: permissions.mapRead,
    icon: <ChevronRightIcon />,
    label: i18n('entities.map.menu'),
  }, */
  {
    path: '/order',
    permissionRequired: permissions.orderRead,
    icon: <ChevronRightIcon />,
    label: i18n('entities.order.menu'),
  },
  {
    path: '/audit-logs',
    icon: <HistoryIcon />,
    label: i18n('auditLog.menu'),
    permissionRequired: permissions.auditLogRead,
  },
  {
    path: '/user',
    label: i18n('user.menu'),
    permissionRequired: permissions.userRead,
    icon: <PersonIcon />,
  },
].filter(Boolean);
