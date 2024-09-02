import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet'

const MapContact = () => {

  // Custom hook to manage dragging behavior
  const EnableDraggingOnClick = () => {
    const map = useMapEvent('click', () => {
      map.dragging.enable();
    });

    useMapEvent('mouseout', () => {
      map.dragging.disable();
    });

    return null;
  };

  return (
    <MapContainer id="mapContact" center={[12.189283475968463, 75.74842653994045]} zoom={13} scrollWheelZoom={false} dragging={false}>

      <EnableDraggingOnClick />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[12.189283475968463, 75.74842653994045]}>
        <Popup>
          <p>Navut Homestay</p>
          <a target="_blank" rel="noreferrer" href="https://maps.app.goo.gl/iKeZKYX7rrkuHwKA8">Get Directions</a>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapContact;