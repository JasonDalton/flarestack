import list from 'src/modules/map/list/mapListReducers';
import form from 'src/modules/map/form/mapFormReducers';
import view from 'src/modules/map/view/mapViewReducers';
import destroy from 'src/modules/map/destroy/mapDestroyReducers';
import importerReducer from 'src/modules/map/importer/mapImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
