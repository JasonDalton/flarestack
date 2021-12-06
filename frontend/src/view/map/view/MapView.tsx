import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import { i18n } from 'src/i18n';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import ImagesViewItem from 'src/view/shared/view/ImagesViewItem';

function MapView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <div>
        <TextViewItem
          label={i18n('entities.map.fields.name')}
          value={record.name}
        />

        <TextViewItem
          label={i18n('entities.map.fields.description')}
          value={record.description}
        />

        <TextViewItem
          label={i18n('entities.map.fields.geojson')}
          value={record.geojson}
        />

        <ImagesViewItem
          label={i18n('entities.map.fields.preview')}
          value={record.preview}
        />        
      </div>
    );
  };

  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return renderView();
}

export default MapView;
