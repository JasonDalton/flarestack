import React from 'react';
import { i18n } from 'src/i18n';
import MapListFilter from 'src/view/map/list/MapListFilter';
import MapListTable from 'src/view/map/list/MapListTable';
import MapListToolbar from 'src/view/map/list/MapListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

function MapListPage(props) {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.map.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.map.list.title')}
        </PageTitle>

        <MapListToolbar />
        <MapListFilter />
        <MapListTable />
      </ContentWrapper>
    </>
  );
}

export default MapListPage;
