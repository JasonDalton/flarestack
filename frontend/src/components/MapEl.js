import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl-style-switcher/styles.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Grid, makeStyles } from '@material-ui/core';
import { turfArea } from '@turf/turf';
import mapboxgl from 'mapbox-gl';
import turfBuffer from 'turf-buffer';
import Tooltip from './ToolTip';
import DiscreteSlider from 'src/components/DiscreteSlider';
import Line from './line';
import config from 'src/config';
import { MapboxStyleSwitcherControl } from 'mapbox-gl-style-switcher';

const useStyles = makeStyles((theme) => ({
  chartWrapper: {
    border: '1px solid rgb(224, 224, 224)',
    borderRadius: '5px',
    backgroundColor: '#fff',
    padding: theme.spacing(2),
  },
  mapWrapper: {
    height: '50vh',
    width: '100%',
  },
}));
const MapEl = () => {
  const mapParams = {
    map: {
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-73.95747184753418, 40.6284804653916],
      zoom: 12.5,
    },
    drawControl: {
      displayControlsDefault: true,
      controls: {
        polygon: true,
        line_string: true,
        trash: true,
        combine_features: false,
      },
      defaultMode: 'draw_polygon',
    },
  };

  mapboxgl.accessToken = config.mapboxAccessToken;
  const classes = useStyles();
  const mapRef = useRef(null);
  const toolTipRef = useRef(
    new mapboxgl.Popup({
      offset: 15,
    }),
  );

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapRef.current,
      ...mapParams.map,
    });
    const drawControl = new MapboxDraw(
      mapParams.drawControl,
    );

    const geoCodeCodeControl = new MapboxGeocoder({
      accessToken: config.mapboxAccessToken,
      mapboxgl,
    });
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true,
    });
    map.addControl(new MapboxStyleSwitcherControl());
    map.addControl(geoCodeCodeControl, 'top-left');
    map.addControl(geolocate);
    map.addControl(drawControl);
    map.on('draw.create', [updateArea]);
    map.on('draw.delete', [updateArea]);
    map.on('draw.update', [updateArea]);
    //map.on( 'mouseenter',(e) => e.features.length && (map.getCanvas().style.cursor = 'pointer'),
    map.on(
      'mouseleave',
      () => (map.getCanvas().style.cursor = ''),
    );
    map.on('mousemove', (e) => {
      const features = map.queryRenderedFeatures(e.point);
      if (features.length) {
        const feature = features[0];
        const tooltipNode = document.createElement('div');
        ReactDOM.render(
          <Tooltip feature={feature} />,
          tooltipNode,
        );
        toolTipRef.current
          .setLngLat(e.lngLat)
          .setDOMContent(tooltipNode)
          .addTo(map);
      }
    });

    function updateArea(e) {
      const data = drawControl.getAll();
      if (data.features.length > 0) {
        try {
          const area = turfArea(data);
          const rounded_area = Math.round(area * 100) / 100;
          document.getElementById(
            'calculated-area',
          ).innerHTML = `<p><strong>${rounded_area}</strong></p><p>square meters</p>`;
          document.getElementById('geojson').value =
            JSON.stringify(data);
        } catch (e) {
          console.error(e);
        }
      } else {
        // eslint-disable-next-line no-undef
        answer.innerHTML = '';
        // eslint-disable-next-line no-undef
        geo.value = '';
        if (e.type !== 'draw.delete')
          alert('Click the map to draw a polygon.');
      }
    }
    map.on('load', () => {
      map.addSource('demoLine', {
        type: 'geojson',
        data: Line,
      });
      return;
      map.addLayer({
        id: 'demoLine',
        type: 'line',
        source: 'demoLine',
        layout: {},
        paint: {
          'line-color': '#000',
          'line-width': 3,
        },
      });
      var buffer = turfBuffer(Line, 0.2, 'miles');
      map.addSource('demoBuffer', {
        type: 'geojson',
        data: buffer.features[0],
      });
      map.addLayer({
        id: 'demoBuffer',
        type: 'fill',
        source: 'demoBuffer',
        layout: {},
        paint: {
          'fill-color': '#0080ff',
          'fill-opacity': 0.5,
        },
      });
    });
    return () => map.remove();
  }, []);
  return (
    <>
      <Grid item lg={6} xs={6}>
        <DiscreteSlider />
      </Grid>
      <div className={classes.mapWrapper} ref={mapRef} />
      <div id="calculated-area"> </div>
    </>
  );
};
export default MapEl;
