import React from 'react';
import { Zap } from 'lucide-react';
import Header from './Header';
import DeviceCards from './DeviceCards';
import Footer from './Footer';

const EVChargingStations: React.FC = () => {
  return (
    <div className="bg-gray-50 text-slate-800 min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-900">
              EV Charging Station Monitoring
            </h1>
            <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-lg border border-gray-200">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
          <p className="text-gray-600">Monitor and manage your EV charging stations in real-time</p>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-blue-600 p-2 rounded-lg mr-3">
              <Zap className="text-white" size={20} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Charging Station Status
            </h2>
          </div>
        </div>
        
        <DeviceCards />
      </main>
      <Footer />
    </div>
  );
};

export default EVChargingStations;