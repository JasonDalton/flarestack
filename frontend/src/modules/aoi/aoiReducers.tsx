import list from 'src/modules/aoi/list/aoiListReducers';
import form from 'src/modules/aoi/form/aoiFormReducers';
import view from 'src/modules/aoi/view/aoiViewReducers';
import destroy from 'src/modules/aoi/destroy/aoiDestroyReducers';
import importerReducer from 'src/modules/aoi/importer/aoiImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
