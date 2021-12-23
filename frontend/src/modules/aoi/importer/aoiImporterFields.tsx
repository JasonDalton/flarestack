import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'name',
    label: i18n('entities.aoi.fields.name'),
    schema: schemas.string(
      i18n('entities.aoi.fields.name'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'description',
    label: i18n('entities.aoi.fields.description'),
    schema: schemas.string(
      i18n('entities.aoi.fields.description'),
      {},
    ),
  },
  {
    name: 'geojson',
    label: i18n('entities.aoi.fields.geojson'),
    schema: schemas.string(
      i18n('entities.aoi.fields.geojson'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'estTimeComplete',
    label: i18n('entities.aoi.fields.estTimeComplete'),
    schema: schemas.integer(
      i18n('entities.aoi.fields.estTimeComplete'),
      {},
    ),
  },
  {
    name: 'orders',
    label: i18n('entities.aoi.fields.orders'),
    schema: schemas.relationToMany(
      i18n('entities.aoi.fields.orders'),
      {},
    ),
  },
];