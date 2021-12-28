import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import Geoman from './Geoman';
import './styles.css';
import GeoSlider from './GeoSlider';



const MapView = () => {
  const position = [39.097428, -77.61343];
  const zoomLv = 13;
  return (
    <>
      <GeoSlider />
      <MapContainer
        center={position}
        zoom={zoomLv}
        scrollWheelZoom={false}
        //doubleClickZoom={false}
      >
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        <Geoman />
      </MapContainer>
    </>
  );
};
export default MapView;
