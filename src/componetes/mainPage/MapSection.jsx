import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapSection = ({ lang }) => {
  // Amman, Jordan coordinates
  const position = [31.9454, 35.9284];
  
  // Sample charging stations data
  const chargingStations = [
    { id: 1, position: [31.9554, 35.9184], name: "Downtown Station" },
    { id: 2, position: [31.9654, 35.9384], name: "City Mall Station" },
    { id: 3, position: [31.9354, 35.9484], name: "Airport Station" }
  ];

  return (
    <div className="h-full w-full">
      <MapContainer 
        center={position} 
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {chargingStations.map(station => (
          <Marker 
            key={station.id} 
            position={station.position}
            icon={DefaultIcon}
          >
            <Popup className="custom-popup">
              <div className="text-sm font-medium text-gray-800">
                {station.name}
              </div>
              <a
                href={`https://www.openstreetmap.org/directions?from=&to=${station.position[0]}%2C${station.position[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline text-xs mt-1 block"
              >
                {lang === 'en' ? 'Get Directions' : 'الحصول على الاتجاهات'}
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapSection
