import React from 'react';
import ReactDOM from 'react-dom';
import GeoPopup from './components/popup';

export function OnMouseMove(map, e, popupRef) {
  const features = map.queryRenderedFeatures(e.point);
  if (features.length) {
    const feature = features[0];
    const tooltipNode = document.createElement('div');
    ReactDOM.render(<GeoPopup feature={feature} />, tooltipNode);
    popupRef.current
      .setLngLat(e.lngLat)
      .setDOMContent(tooltipNode)
      .addTo(map);
  }
}
