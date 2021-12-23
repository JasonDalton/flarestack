import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import { i18n } from 'src/i18n';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import OrderViewItem from 'src/view/order/view/OrderViewItem';

function AoiView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <div>
        <TextViewItem
          label={i18n('entities.aoi.fields.name')}
          value={record.name}
        />

        <TextViewItem
          label={i18n('entities.aoi.fields.description')}
          value={record.description}
        />

        <TextViewItem
          label={i18n('entities.aoi.fields.geojson')}
          value={record.geojson}
        />

        <TextViewItem
          label={i18n('entities.aoi.fields.estTimeComplete')}
          value={record.estTimeComplete}
        />

        <OrderViewItem
          label={i18n('entities.aoi.fields.orders')}
          value={record.orders}
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

export default AoiView;
