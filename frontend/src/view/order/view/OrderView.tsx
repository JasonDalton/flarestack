import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import { i18n } from 'src/i18n';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import MapViewItem from 'src/view/map/view/MapViewItem';

function OrderView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <div>
        <TextViewItem
          label={i18n('entities.order.fields.name')}
          value={record.name}
        />

        <MapViewItem
          label={i18n('entities.order.fields.geojson')}
          value={record.geojson}
        />

        <TextViewItem
          label={i18n('entities.order.fields.notifyOnComplete')}
          value={
            record.notifyOnComplete
              ? i18n('common.yes')
              : i18n('common.no')
          }
        />

        <TextViewItem
          label={i18n('entities.order.fields.ready')}
          value={
            record.ready
              ? i18n('common.yes')
              : i18n('common.no')
          }
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

export default OrderView;
