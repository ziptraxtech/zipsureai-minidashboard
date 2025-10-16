import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, BarChart3, Clock, AlertTriangle } from 'lucide-react';

interface Device {
  id: number;
  name: string;
  location: string;
  cost: number | null;
  status: 'excellent' | 'good' | 'warning' | 'critical' | 'offline';
  lastUpdate: string;
  reportAvailable: boolean;
}

const DeviceCards: React.FC = () => {
  const devices: Device[] = [
    {
      id: 1,
      name: 'Device 1',
      location: 'Andheria More',
      cost: null,
      status: 'offline',
      lastUpdate: 'Offline',
      reportAvailable: false
    },
    {
      id: 2,
      name: 'Device 2',
      location: 'Hauz Khas Telephone Centre',
      cost: 250,
      status: 'good',
      lastUpdate: '2 min ago',
      reportAvailable: true
    },
    {
      id: 3,
      name: 'Device 3',
      location: 'Qutub Minar',
      cost: 180,
      status: 'excellent',
      lastUpdate: '1 min ago',
      reportAvailable: true
    },
    {
      id: 4,
      name: 'Device 4',
      location: 'TB Hospital',
      cost: null,
      status: 'offline',
      lastUpdate: 'Offline',
      reportAvailable: false
    },
    {
      id: 5,
      name: 'Device 5',
      location: 'Hauz Khas Metro Station',
      cost: null,
      status: 'offline',
      lastUpdate: 'Offline',
      reportAvailable: true // Offline report available
    },
    {
      id: 6,
      name: 'Device 6',
      location: 'RK Puram Sector 5',
      cost: 320,
      status: 'good',
      lastUpdate: '3 min ago',
      reportAvailable: true
    },
    {
      id: 7,
      name: 'Device 7',
      location: 'IIT',
      cost: 150,
      status: 'excellent',
      lastUpdate: '2 min ago',
      reportAvailable: true
    },
    {
      id: 8,
      name: 'Device 8',
      location: 'Pascheel Park',
      cost: 290,
      status: 'good',
      lastUpdate: '1 min ago',
      reportAvailable: true
    }
  ];

  const getStatusColor = (status: string) => {
    if (status === 'offline') {
      return 'bg-red-50 text-red-700 border border-red-200';
    }
    // All other statuses are considered online
    return 'bg-green-50 text-green-700 border border-green-200';
  };

  const getStatusIndicator = (status: string) => {
    const baseClasses = 'w-3 h-3 rounded-full mr-2 shadow-sm';
    if (status === 'offline') {
      return `${baseClasses} bg-red-500 shadow-red-200`;
    }
    // All other statuses are considered online
    return `${baseClasses} bg-green-500 shadow-green-200`;
  };

  const getCostColor = (cost: number | null, status: string) => {
    if (cost === null) return 'text-gray-600';
    if (status === 'excellent' || status === 'good') return 'text-green-600';
    if (status === 'warning') return 'text-amber-600';
    if (status === 'critical') return 'text-red-600';
    return 'text-gray-600';
  };

  const getButtonStyle = (status: string) => {
    if (status === 'critical') {
      return 'bg-gradient-to-r from-red-500 to-red-600 text-white font-medium py-3 px-4 rounded-xl hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5';
    }
    if (status === 'offline') {
      return 'bg-gray-100 text-gray-500 font-medium py-3 px-4 rounded-xl cursor-not-allowed border border-gray-200';
    }
    return 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium py-3 px-4 rounded-xl hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
      {devices.map((device) => (
        <div key={device.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 border border-gray-100 hover:border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className={getStatusIndicator(device.status)}></span>
                <h3 className="text-lg font-bold text-gray-800">{device.name}</h3>
              </div>
              <div className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusColor(device.status)}`}>
                {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-600 mb-2 flex items-center">
                <MapPin className="text-blue-500 mr-2" size={16} />
                {device.location}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Monthly Cost</p>
                  <p className={`font-semibold ${getCostColor(device.cost, device.status)}`}>
                    {device.cost !== null ? `₹${device.cost}` : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Last Update</p>
                  <p className="font-semibold">{device.lastUpdate}</p>
                </div>
              </div>
            </div>
            {device.reportAvailable ? (
              <Link 
                to={`/report/${device.id}`}
                className={`w-full inline-block text-center ${getButtonStyle(device.status)}`}
              >
                {device.status === 'critical' ? (
                  <>
                    <AlertTriangle className="inline mr-2" size={16} />
                    View Report
                  </>
                ) : (
                  <>
                    <BarChart3 className="inline mr-2" size={16} />
                    View Report
                  </>
                )}
              </Link>
            ) : (
              <button className={`w-full inline-block text-center ${getButtonStyle(device.status)}`}>
                <Clock className="inline mr-2" size={16} />
                Coming Soon
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeviceCards;