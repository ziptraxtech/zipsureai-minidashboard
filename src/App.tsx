import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import BatteryReport from './components/BatteryReport';
import AIReport from './components/AIReport';
import EVChargingStations from './components/EVChargingStations';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';
import ZeflashLanding from './components/ZeflashLanding';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/zeflash" element={<ZeflashLanding />} />
            <Route path="/ev-stations" element={<EVChargingStations />} />
            <Route path="/report/:deviceId" element={<BatteryReport />} />
            <Route path="/report/:deviceId/ai" element={<AIReport />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
