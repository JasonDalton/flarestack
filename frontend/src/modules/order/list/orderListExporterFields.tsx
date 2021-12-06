import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.order.fields.id'),
  },
  {
    name: 'name',
    label: i18n('entities.order.fields.name'),
  },
  {
    name: 'geojson',
    label: i18n('entities.order.fields.geojson'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'notifyOnComplete',
    label: i18n('entities.order.fields.notifyOnComplete'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'ready',
    label: i18n('entities.order.fields.ready'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.order.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.order.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
