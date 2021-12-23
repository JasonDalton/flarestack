import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import { i18n } from 'src/i18n';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import AoiViewItem from 'src/view/aoi/view/AoiViewItem';

function OrderView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <div>
        <TextViewItem
          label={i18n('entities.order.fields.name')}
          value={record.name}
        />

        <AoiViewItem
          label={i18n('entities.order.fields.aoi')}
          value={record.aoi}
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
