import AoiService from 'src/modules/aoi/aoiService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'AOI_FORM';

const aoiFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: aoiFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await AoiService.find(id);
      }

      dispatch({
        type: aoiFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: aoiFormActions.INIT_ERROR,
      });

      getHistory().push('/aoi');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: aoiFormActions.CREATE_STARTED,
      });

      await AoiService.create(values);

      dispatch({
        type: aoiFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.aoi.create.success'),
      );

      getHistory().push('/aoi');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: aoiFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: aoiFormActions.UPDATE_STARTED,
      });

      await AoiService.update(id, values);

      dispatch({
        type: aoiFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.aoi.update.success'),
      );

      getHistory().push('/aoi');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: aoiFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default aoiFormActions;
