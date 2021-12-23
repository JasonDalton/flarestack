import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/aoi/importer/aoiImporterSelectors';
import AoiService from 'src/modules/aoi/aoiService';
import fields from 'src/modules/aoi/importer/aoiImporterFields';
import { i18n } from 'src/i18n';

const aoiImporterActions = importerActions(
  'AOI_IMPORTER',
  selectors,
  AoiService.import,
  fields,
  i18n('entities.aoi.importer.fileName'),
);

export default aoiImporterActions;