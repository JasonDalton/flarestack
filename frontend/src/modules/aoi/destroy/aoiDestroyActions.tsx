import listActions from 'src/modules/aoi/list/aoiListActions';
import AoiService from 'src/modules/aoi/aoiService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'AOI_DESTROY';

const aoiDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: aoiDestroyActions.DESTROY_STARTED,
      });

      await AoiService.destroyAll([id]);

      dispatch({
        type: aoiDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.aoi.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/aoi');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: aoiDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: aoiDestroyActions.DESTROY_ALL_STARTED,
      });

      await AoiService.destroyAll(ids);

      dispatch({
        type: aoiDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.aoi.destroyAll.success'),
      );

      getHistory().push('/aoi');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: aoiDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default aoiDestroyActions;
