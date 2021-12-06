import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'name',
    label: i18n('entities.map.fields.name'),
    schema: schemas.string(
      i18n('entities.map.fields.name'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'description',
    label: i18n('entities.map.fields.description'),
    schema: schemas.string(
      i18n('entities.map.fields.description'),
      {},
    ),
  },
  {
    name: 'geojson',
    label: i18n('entities.map.fields.geojson'),
    schema: schemas.string(
      i18n('entities.map.fields.geojson'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'preview',
    label: i18n('entities.map.fields.preview'),
    schema: schemas.images(
      i18n('entities.map.fields.preview'),
      {
        "max": 1
      },
    ),
  },
];