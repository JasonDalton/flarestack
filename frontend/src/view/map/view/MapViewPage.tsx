import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/map/view/mapViewActions';
import selectors from 'src/modules/map/view/mapViewSelectors';
import MapView from 'src/view/map/view/MapView';
import MapViewToolbar from 'src/view/map/view/MapViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

function MapPage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.map.menu'), '/map'],
          [i18n('entities.map.view.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.map.view.title')}
        </PageTitle>

        <MapViewToolbar match={match} />

        <MapView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
}

export default MapPage;
