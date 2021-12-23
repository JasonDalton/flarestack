import React from 'react';
import { i18n } from 'src/i18n';
import AoiListFilter from 'src/view/aoi/list/AoiListFilter';
import AoiListTable from 'src/view/aoi/list/AoiListTable';
import AoiListToolbar from 'src/view/aoi/list/AoiListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

function AoiListPage(props) {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.aoi.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.aoi.list.title')}
        </PageTitle>

        <AoiListToolbar />
        <AoiListFilter />
        <AoiListTable />
      </ContentWrapper>
    </>
  );
}

export default AoiListPage;
