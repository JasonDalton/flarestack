import AoiService from 'src/modules/aoi/aoiService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'AOI_VIEW';

const aoiViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: aoiViewActions.FIND_STARTED,
      });

      const record = await AoiService.find(id);

      dispatch({
        type: aoiViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: aoiViewActions.FIND_ERROR,
      });

      getHistory().push('/aoi');
    }
  },
};

export default aoiViewActions;
