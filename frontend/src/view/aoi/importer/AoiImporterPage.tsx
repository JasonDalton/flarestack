import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/aoi/importer/aoiImporterActions';
import fields from 'src/modules/aoi/importer/aoiImporterFields';
import selectors from 'src/modules/aoi/importer/aoiImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

function AoiImportPage() {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.aoi.importer.hint'),
  );

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.aoi.menu'), '/aoi'],
          [i18n('entities.aoi.importer.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.aoi.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
}

export default AoiImportPage;
