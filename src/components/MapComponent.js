import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const MapComponent = () => {
  return (
    <MapContainer id="map" center={[12.189959001348894, 75.74811592069636]} zoom={14} scrollWheelZoom={false}>
      <TileLayer
        
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <div className="map-overlay">Tap on the blue marker to get directions</div>
      <Marker position={[12.189959001348894, 75.74811592069636]}>
        <Popup>
          <p>Navut Homestay</p>
          <a target = "_blank" rel="noreferrer" href = "https://maps.app.goo.gl/einaSmhzhyLDxp6h7">Get Directions</a>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;