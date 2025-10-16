import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import BatteryReport from './components/BatteryReport';
import EVChargingStations from './components/EVChargingStations';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ev-stations" element={<EVChargingStations />} />
            <Route path="/report/:deviceId" element={<BatteryReport />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
