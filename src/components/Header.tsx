import React, { useState } from 'react';
import { Zap, Settings, Bell, MoreVertical, Bolt } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

          {/* Navigation Links (desktop) */}
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
            <Link
              to="/zeflash"
              className="relative inline-flex items-center gap-1.5 text-sm font-semibold rounded-xl px-4 py-2
                bg-gradient-to-r from-cyan-400 to-blue-600 text-white
                shadow-[0_8px_20px_rgba(16,97,218,0.35)] border border-white/10
                transition-all duration-300 will-change-transform
                hover:from-cyan-300 hover:to-blue-500 hover:-translate-y-0.5 active:translate-y-0
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700/30 focus:ring-cyan-300/60"
            >
              {/* subtle inner glow */}
              <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></span>
              {/* top highlight */}
              <span className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-b from-white/30 to-transparent opacity-60"></span>
              {/* sheen sweep */}
              <span className="pointer-events-none absolute -left-8 top-0 h-full w-8 rotate-12 bg-white/30 blur-sm opacity-0 group-hover:opacity-60 animate-[shine_1.2s_ease-in-out]" />
              <Bolt size={16} className="relative z-10" />
              <span className="relative z-10">Quick Test</span>
            </Link>
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
          {/* Mobile kebab menu trigger */}
          <div className="md:hidden">
            <button
              aria-label="Open menu"
              className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 border border-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <MoreVertical size={22} />
            </button>
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
          {/* Mobile dropdown nav */}
          {mobileMenuOpen && (
            <div className="mt-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl overflow-hidden">
              <div className="divide-y divide-white/10">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <a
                  href="#analytics"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                >
                  Analytics
                </a>
                <Link
                  to="/ev-stations"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                >
                  Reports
                </Link>
                <a
                  href="#settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                >
                  Settings
                </a>
                <Link
                  to="/zeflash"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-white/90 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Bolt size={16} /> Quick Test
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;