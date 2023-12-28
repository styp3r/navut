import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const MapComponent = () => {
  return (
      <MapContainer id = "map" center={[12.189564148833279, 75.74841266659514]} zoom={14} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[12.189564148833279, 75.74841266659514]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
  );
}

export default MapComponent;