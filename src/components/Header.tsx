import React from 'react';
import { Zap, Settings, Bell, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="zipsure-gradient shadow-xl border-b border-blue-600/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <Zap className="text-white text-2xl" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                ZipSureAI
              </h1>
              <p className="text-blue-100 font-medium text-sm">Battery Monitoring Dashboard</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-white/90 hover:text-white transition-colors duration-200 font-medium">
              Dashboard
            </Link>
            <a href="#analytics" className="text-white/90 hover:text-white transition-colors duration-200 font-medium">
              Analytics
            </a>
            <Link to="/ev-stations" className="text-white/90 hover:text-white transition-colors duration-200 font-medium">
              Reports
            </Link>
            <a href="#settings" className="text-white/90 hover:text-white transition-colors duration-200 font-medium">
              Settings
            </a>
          </nav>

          {/* Status Indicators */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
              <div className="text-center">
                <div className="text-xl font-bold text-white">8</div>
                <div className="text-xs text-blue-100">Stations</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-300">5</div>
                <div className="text-xs text-blue-100">Online</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-xl font-bold text-red-300">3</div>
                <div className="text-xs text-blue-100">Offline</div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                <Bell size={20} />
              </button>
              <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile-only quick actions */}
        <div className="md:hidden mt-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <div className="text-lg font-bold text-white">8</div>
              <div className="text-xs text-blue-100">Total</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <div className="text-lg font-bold text-green-300">5</div>
              <div className="text-xs text-blue-100">Online</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <div className="text-lg font-bold text-red-300">3</div>
              <div className="text-xs text-blue-100">Offline</div>
            </div>
          </div>

          {/* Mobile-only Reports button */}
          <Link
            to="/ev-stations"
            className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 border border-white/20 shadow-lg shadow-cyan-500/30 transition-colors"
          >
            <BarChart3 size={18} />
            <span>View Reports</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;