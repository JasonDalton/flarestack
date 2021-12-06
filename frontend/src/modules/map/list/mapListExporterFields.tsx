import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.map.fields.id'),
  },
  {
    name: 'name',
    label: i18n('entities.map.fields.name'),
  },
  {
    name: 'description',
    label: i18n('entities.map.fields.description'),
  },
  {
    name: 'geojson',
    label: i18n('entities.map.fields.geojson'),
  },
  {
    name: 'preview',
    label: i18n('entities.map.fields.preview'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.map.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.map.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
