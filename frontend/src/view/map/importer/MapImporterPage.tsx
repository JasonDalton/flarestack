import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/map/importer/mapImporterActions';
import fields from 'src/modules/map/importer/mapImporterFields';
import selectors from 'src/modules/map/importer/mapImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

function MapImportPage() {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.map.importer.hint'),
  );

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.map.menu'), '/map'],
          [i18n('entities.map.importer.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.map.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
}

export default MapImportPage;
