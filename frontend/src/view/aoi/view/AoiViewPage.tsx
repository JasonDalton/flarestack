import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/aoi/view/aoiViewActions';
import selectors from 'src/modules/aoi/view/aoiViewSelectors';
import AoiView from 'src/view/aoi/view/AoiView';
import AoiViewToolbar from 'src/view/aoi/view/AoiViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

function AoiPage() {
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
          [i18n('entities.aoi.menu'), '/aoi'],
          [i18n('entities.aoi.view.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.aoi.view.title')}
        </PageTitle>

        <AoiViewToolbar match={match} />

        <AoiView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
}

export default AoiPage;
