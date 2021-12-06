import MapService from 'src/modules/map/mapService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'MAP_FORM';

const mapFormActions = {
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
        type: mapFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await MapService.find(id);
      }

      dispatch({
        type: mapFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: mapFormActions.INIT_ERROR,
      });

      getHistory().push('/map');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: mapFormActions.CREATE_STARTED,
      });

      await MapService.create(values);

      dispatch({
        type: mapFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.map.create.success'),
      );

      getHistory().push('/map');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: mapFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: mapFormActions.UPDATE_STARTED,
      });

      await MapService.update(id, values);

      dispatch({
        type: mapFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.map.update.success'),
      );

      getHistory().push('/map');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: mapFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default mapFormActions;
