import listActions from 'src/modules/map/list/mapListActions';
import MapService from 'src/modules/map/mapService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'MAP_DESTROY';

const mapDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: mapDestroyActions.DESTROY_STARTED,
      });

      await MapService.destroyAll([id]);

      dispatch({
        type: mapDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.map.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/map');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: mapDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: mapDestroyActions.DESTROY_ALL_STARTED,
      });

      await MapService.destroyAll(ids);

      dispatch({
        type: mapDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.map.destroyAll.success'),
      );

      getHistory().push('/map');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: mapDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default mapDestroyActions;
