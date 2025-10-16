import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface Device {
  id: number;
  name: string;
  location: string;
  status: 'excellent' | 'good' | 'warning' | 'critical' | 'offline';
  coordinates: {
    lat: number;
    lng: number;
  };
  cost: number | null;
}

const MapComponent: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  // Device data with South Delhi coordinates
  const devices: Device[] = [
    {
      id: 1,
      name: 'Andheria More Charging Hub',
      location: 'CDR Chowk, Near Chattarpur Metro',
      status: 'critical',
      cost: 385,
      coordinates: { lat: 28.508596, lng: 77.177059 } // Andheria More/CDR Chowk near Chattarpur Metro
    },
    {
      id: 2,
      name: 'Telephone Centre',
      location: 'Hauz Khas Metro Station, 1km ahead',
      status: 'excellent',
      cost: 250,
      coordinates: { lat: 28.5454000, lng: 77.2016000 } // Telephone Centre
    },
    {
      id: 3,
      name: 'Qutub Minar Charging Station',
      location: 'Qutub Minar',
      status: 'good',
      cost: 180,
      coordinates: { lat: 28.526532, lng: 77.186158 } // Qutub Minar
    },
    {
      id: 4,
      name: 'TB Hospital Charging Point',
      location: 'TB Hospital near Qutub Minar',
      status: 'critical',
      cost: 420,
      coordinates: { lat: 28.529312, lng: 77.191063 } // TB Hospital near Qutub Minar
    },
    {
      id: 5,
      name: 'Hauz Khas Metro Gate 1',
      location: 'Hauz Khas Metro Gate 1',
      status: 'offline',
      cost: null,
      coordinates: { lat: 28.543621, lng: 77.204830 } // Hauz Khas Metro Gate 1
    },
    {
      id: 6,
      name: 'RK Puram Sector 5',
      location: 'RK Puram Sector 5',
      status: 'good',
      cost: 320,
      coordinates: { lat: 28.560649, lng: 77.170350 } // RK Puram Sector 5
    },
    {
      id: 7,
      name: 'IIT Delhi Campus',
      location: 'IIT Delhi',
      status: 'excellent',
      cost: 150,
      coordinates: { lat: 28.548083, lng: 77.190417 } // IIT Delhi
    },
    {
      id: 8,
      name: 'Panchsheel Park Metro',
      location: 'Panchsheel Park Metro Station',
      status: 'good',
      cost: 290,
      coordinates: { lat: 28.542361, lng: 77.222028 } // Panchsheel Park Metro Station
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return '#10B981'; // green-500
      case 'good': return '#10B981'; // green-500  
      case 'warning': return '#F59E0B'; // amber-500
      case 'critical': return '#EF4444'; // red-500
      case 'offline': return '#6B7280'; // gray-500
      default: return '#6B7280'; // gray-500
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'excellent': return 'Excellent';
      case 'good': return 'Good';
      case 'warning': return 'Warning';
      case 'critical': return 'Critical';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  const openInGoogleMaps = (device: Device) => {
    const url = `https://www.google.com/maps/place/${device.coordinates.lat},${device.coordinates.lng}/@${device.coordinates.lat},${device.coordinates.lng},17z`;
    window.open(url, '_blank');
  };

  // Render the map component with truly embedded markers
  const renderMap = () => {
    // Use an actual Leaflet map embedded via data URL
    const createLeafletMap = () => {
      const mapHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <style>
        body { margin: 0; padding: 0; }
        #map { height: 100vh; width: 100vw; }
    </style>
</head>
<body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
        var map = L.map('map').setView([28.5755, 77.1600], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        // Define marker colors based on status
        var markers = [
          ${devices.map((device, index) => `
          {
            lat: ${device.coordinates.lat},
            lng: ${device.coordinates.lng},
            name: "${device.name}",
            location: "${device.location}",
            status: "${device.status}",
            id: ${device.id}
          }`).join(',')}
        ];
        
        markers.forEach(function(device, index) {
          var color = device.status === 'offline' ? 'red' : 
                     device.status === 'critical' ? 'red' :
                     device.status === 'warning' ? 'orange' : 'green';
          
          var marker = L.marker([device.lat, device.lng]).addTo(map);
          marker.bindPopup('<b>' + device.name + '</b><br/>' + device.location + '<br/>Status: ' + device.status);
        });
    </script>
</body>
</html>`;
      
      return 'data:text/html;charset=utf-8,' + encodeURIComponent(mapHtml);
    };

    return (
      <div className="w-full h-full relative bg-blue-50">
        {/* Embedded Leaflet map with real markers */}
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          src={createLeafletMap()}
          title="EV Charging Stations Map - South Delhi"
          className="rounded-lg"
          sandbox="allow-scripts"
        ></iframe>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        <div className="bg-blue-600 p-2 rounded-lg mr-3">
          <MapPin className="text-white" size={20} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Device Locations Map
        </h2>
      </div>

      <div className="relative rounded-xl overflow-hidden border border-gray-200 mb-6">
        {/* Interactive Map with Custom Markers */}
        <div className="relative h-96 bg-gradient-to-br from-blue-50 to-gray-100 rounded-lg">
          {renderMap()}
        </div>
      </div>

      {/* Selected Device Info */}
      {selectedDevice && (
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 mb-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{selectedDevice.name}</h3>
              <p className="text-gray-600 mb-2">📍 {selectedDevice.location}</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: getStatusColor(selectedDevice.status) }}
                  ></div>
                  <span className="text-sm font-medium">{getStatusLabel(selectedDevice.status)}</span>
                </div>
                {selectedDevice.cost && (
                  <span className="text-sm text-gray-600">
                    � Monthly Cost: <span className="font-medium text-green-600">₹{selectedDevice.cost}</span>
                  </span>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => openInGoogleMaps(selectedDevice)}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                <Navigation size={16} className="mr-1" />
                Navigate
              </button>
              <button 
                onClick={() => setSelectedDevice(null)}
                className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Device list below map */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Locations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {devices.map((device) => (
            <div 
              key={device.id} 
              className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => setSelectedDevice(device)}
            >
              <div 
                className="w-3 h-3 rounded-full mr-3 flex-shrink-0"
                style={{ backgroundColor: getStatusColor(device.status) }}
              ></div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 truncate">{device.name}</p>
                <p className="text-sm text-gray-600 truncate">{device.location}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">{getStatusLabel(device.status)}</p>
                  {device.cost && (
                    <p className="text-xs text-green-600 font-medium">₹{device.cost}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapComponent;