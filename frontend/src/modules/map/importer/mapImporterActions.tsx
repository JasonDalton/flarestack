import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/map/importer/mapImporterSelectors';
import MapService from 'src/modules/map/mapService';
import fields from 'src/modules/map/importer/mapImporterFields';
import { i18n } from 'src/i18n';

const mapImporterActions = importerActions(
  'MAP_IMPORTER',
  selectors,
  MapService.import,
  fields,
  i18n('entities.map.importer.fileName'),
);

export default mapImporterActions;