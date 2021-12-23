import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.aoi.fields.id'),
  },
  {
    name: 'name',
    label: i18n('entities.aoi.fields.name'),
  },
  {
    name: 'description',
    label: i18n('entities.aoi.fields.description'),
  },
  {
    name: 'geojson',
    label: i18n('entities.aoi.fields.geojson'),
  },
  {
    name: 'estTimeComplete',
    label: i18n('entities.aoi.fields.estTimeComplete'),
  },
  {
    name: 'orders',
    label: i18n('entities.aoi.fields.orders'),
    render: exporterRenders.relationToMany(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.aoi.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.aoi.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
