import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'name',
    label: i18n('entities.order.fields.name'),
    schema: schemas.string(
      i18n('entities.order.fields.name'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'geojson',
    label: i18n('entities.order.fields.geojson'),
    schema: schemas.relationToOne(
      i18n('entities.order.fields.geojson'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'notifyOnComplete',
    label: i18n('entities.order.fields.notifyOnComplete'),
    schema: schemas.boolean(
      i18n('entities.order.fields.notifyOnComplete'),
      {},
    ),
  },
  {
    name: 'ready',
    label: i18n('entities.order.fields.ready'),
    schema: schemas.boolean(
      i18n('entities.order.fields.ready'),
      {},
    ),
  },
];