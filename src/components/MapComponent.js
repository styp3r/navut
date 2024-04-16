import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const MapComponent = () => {
  return (
    <MapContainer id="map" center={[12.189283475968463, 75.74842653994045]} zoom={14} scrollWheelZoom={false}>
      <TileLayer
        
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <div className="map-overlay">Tap on the blue marker to get directions</div>
      <Marker position={[12.189283475968463, 75.74842653994045]}>
        <Popup>
          <p>Navut Homestay</p>
          <a target = "_blank" rel="noreferrer" href = "https://maps.app.goo.gl/iKeZKYX7rrkuHwKA8">Get Directions</a>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;