import React from 'react';
import { i18n } from 'src/i18n';
import MapListFilter from 'src/view/map/list/MapListFilter';
import MapListTable from 'src/view/map/list/MapListTable';
import MapListToolbar from 'src/view/map/list/MapListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

function HomeListPage(props) {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          ['orders'],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          Orders
        </PageTitle>

        <MapListToolbar />
        <MapListFilter />
        <MapListTable />
      </ContentWrapper>
    </>
  );
}

export default HomeListPage;
