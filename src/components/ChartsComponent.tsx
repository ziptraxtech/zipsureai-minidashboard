import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { TrendingUp, IndianRupee, Zap, Activity } from 'lucide-react';

const ChartsComponent: React.FC = () => {
  // Device status distribution data
  const statusData = [
    { name: 'Excellent', value: 2, color: '#10B981' },
    { name: 'Good', value: 3, color: '#3B82F6' },
    { name: 'Critical', value: 2, color: '#EF4444' },
    { name: 'Offline', value: 1, color: '#6B7280' }
  ];

  // Usage trend data (mock data for demonstration)
  const usageData = [
    { time: '6AM', usage: 12, efficiency: 85 },
    { time: '9AM', usage: 45, efficiency: 92 },
    { time: '12PM', usage: 78, efficiency: 88 },
    { time: '3PM', usage: 89, efficiency: 94 },
    { time: '6PM', usage: 95, efficiency: 91 },
    { time: '9PM', usage: 67, efficiency: 89 },
    { time: '12AM', usage: 23, efficiency: 87 }
  ];

  // Energy consumption data (mock data)
  const energyData = [
    { month: 'Jan', energy: 2400 },
    { month: 'Feb', energy: 1398 },
    { month: 'Mar', energy: 9800 },
    { month: 'Apr', energy: 3908 },
    { month: 'May', energy: 4800 },
    { month: 'Jun', energy: 3800 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Device Status Distribution */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <div className="bg-green-600 p-2 rounded-lg mr-3">
            <Activity className="text-white" size={20} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Device Status Distribution</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Energy Consumption */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-3 rounded-xl mr-3 shadow-lg">
              <IndianRupee className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Monthly Energy Consumption</h3>
              <p className="text-sm text-gray-600">Cost breakdown by charging station</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-cyan-600">₹1,995</p>
            <p className="text-sm text-gray-500">Total Monthly</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1">
          {/* Area Chart */}
          <div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    formatter={(value, name) => [`${value}%`, 'Usage']}
                    contentStyle={{
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="usage" 
                    stroke="#06B6D4" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorUsage)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Usage Trends */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <div className="bg-purple-600 p-2 rounded-lg mr-3">
            <TrendingUp className="text-white" size={20} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Daily Usage & Efficiency</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="usage" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                name="Usage %"
              />
              <Line 
                type="monotone" 
                dataKey="efficiency" 
                stroke="#10B981" 
                strokeWidth={3}
                name="Efficiency %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Energy Consumption */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <div className="bg-yellow-600 p-2 rounded-lg mr-3">
            <Zap className="text-white" size={20} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Monthly Energy Consumption</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={energyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} kWh`, 'Energy Consumed']} />
              <Area 
                type="monotone" 
                dataKey="energy" 
                stroke="#F59E0B" 
                fill="url(#energyGradient)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartsComponent;