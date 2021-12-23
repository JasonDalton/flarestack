import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/map/form/mapFormActions';
import selectors from 'src/modules/map/form/mapFormSelectors';
import { getHistory } from 'src/modules/store';
import HomeForm from 'src/view/draw/DrawForm';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import Spinner from 'src/view/shared/Spinner';
import PageTitle from 'src/view/shared/styles/PageTitle';


import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  chartWrapper: {
    border: '1px solid rgb(224, 224, 224)',
    borderRadius: '5px',
    backgroundColor: '#fff',
    padding: theme.spacing(2),
  },
  mapWrapper: {
    height: '50vh',
    width: '100%',
  },
}));

function HomeFormPage(props) {
  const [dispatched, setDispatched] = useState(false);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );
  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );
  const record = useSelector(selectors.selectRecord);

  const isEditing = Boolean(match.params.id);
  const title = isEditing
    ? i18n('entities.map.edit.title')
    : i18n('entities.map.new.title');

  useEffect(() => {
    dispatch(actions.doInit(match.params.id));
    setDispatched(true);
  }, [dispatch, match.params.id]);

  const doSubmit = (id, data) => {
    if (isEditing) {
      dispatch(actions.doUpdate(id, data));
    } else {
      dispatch(actions.doCreate(data));
    }
    
  };

  return (
    <>
      <Breadcrumb
        items={[
          //[i18n('dashboard.menu'), '/'],
          //[],
          //[i18n('entities.map.menu'), '/home'],
         // ['Welcome!'],
        ]}
      />

      <ContentWrapper>
        <PageTitle>Flight Path Tool</PageTitle>

        {initLoading && <Spinner />}

        {dispatched && !initLoading && (
          <HomeForm
            saveLoading={saveLoading}
            initLoading={initLoading}
            record={record}
            isEditing={isEditing}
            onSubmit={doSubmit}
            onCancel={() => getHistory().push('/map')}
          />
        )}
      </ContentWrapper>
    </>
  );
}

export default HomeFormPage;
