import React, { useState } from 'react';
import { CloudSun, Droplets, Wind, ArrowRight, TrendingUp, Sun, CloudRain, Cloud, AlertTriangle, X } from 'lucide-react';
import { View } from '../App';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  onViewChange: (view: View) => void;
}

const mockChartData = [
  { name: 'Mon', price: 1800 },
  { name: 'Tue', price: 1850 },
  { name: 'Wed', price: 1820 },
  { name: 'Thu', price: 1900 },
  { name: 'Fri', price: 1950 },
  { name: 'Sat', price: 2000 },
  { name: 'Sun', price: 1980 },
];

export const Dashboard: React.FC<DashboardProps> = ({ onViewChange }) => {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="p-4 space-y-6">
      
      {/* Weather Alert Banner */}
      {showAlert && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-3 relative animate-in slide-in-from-top-2 duration-300">
          <div className="bg-red-100 p-1.5 rounded-full text-red-600 shrink-0">
            <AlertTriangle size={18} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-red-800">Heavy Rainfall Alert</h4>
            <p className="text-xs text-red-700 mt-0.5">Expected in next 24hrs. Protect harvested crops.</p>
          </div>
          <button onClick={() => setShowAlert(false)} className="text-red-400 hover:text-red-600">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Weather Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-medium opacity-90">Amravati, MH</h2>
            <p className="text-sm opacity-75">Today, 24 Oct</p>
          </div>
          <CloudSun size={40} className="text-yellow-300" />
        </div>
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-5xl font-bold">32°</span>
          <span className="text-xl opacity-80">Sunny</span>
        </div>
        
        {/* Current Stats */}
        <div className="flex justify-between border-t border-blue-400/30 pt-4 mb-4">
          <div className="flex flex-col items-center">
            <Droplets size={18} className="mb-1 opacity-75" />
            <span className="text-sm font-semibold">45%</span>
          </div>
          <div className="flex flex-col items-center">
            <Wind size={18} className="mb-1 opacity-75" />
            <span className="text-sm font-semibold">12 km/h</span>
          </div>
          <div className="flex flex-col items-center">
            <CloudRain size={18} className="mb-1 opacity-75" />
            <span className="text-sm font-semibold">0%</span>
          </div>
        </div>

        {/* 3-Day Forecast */}
        <div className="grid grid-cols-3 gap-2 bg-white/10 rounded-xl p-3">
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs opacity-80">Fri</span>
            <Cloud size={20} className="text-gray-200" />
            <span className="text-sm font-bold">30°</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-l border-white/10">
            <span className="text-xs opacity-80">Sat</span>
            <Sun size={20} className="text-yellow-300" />
            <span className="text-sm font-bold">34°</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-l border-white/10">
            <span className="text-xs opacity-80">Sun</span>
            <CloudRain size={20} className="text-blue-200" />
            <span className="text-sm font-bold">28°</span>
          </div>
        </div>
      </div>

      {/* Government Scheme Banner */}
      <button 
        onClick={() => onViewChange(View.SCHEMES)}
        className="w-full bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between hover:bg-amber-100 transition-colors shadow-sm"
      >
        <div className="text-left">
          <div className="flex items-center gap-2 mb-1">
             <span className="text-xl">🏛️</span>
             <h4 className="font-bold text-amber-900">Government Schemes</h4>
          </div>
          <p className="text-xs text-amber-700">Check eligibility for PM-Kisan & Subsidy Loans</p>
        </div>
        <div className="bg-amber-200 p-2 rounded-full">
           <ArrowRight size={20} className="text-amber-800" />
        </div>
      </button>

      {/* Market Trend Snippet */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <TrendingUp size={20} className="text-emerald-600" />
            Wheat Prices (₹/Qtl)
          </h3>
          <button 
            onClick={() => onViewChange(View.MARKETPLACE)}
            className="text-xs text-emerald-600 font-semibold hover:underline"
          >
            View Market
          </button>
        </div>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockChartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
              <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => onViewChange(View.DISEASE_DETECTION)}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-2 hover:bg-emerald-50 transition-colors"
          >
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
              <span className="text-xl">🩺</span>
            </div>
            <span className="font-medium text-sm text-gray-700">Heal Crop</span>
          </button>
          
          <button 
             onClick={() => onViewChange(View.MARKETPLACE)}
             className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-2 hover:bg-emerald-50 transition-colors"
          >
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-xl">🚜</span>
            </div>
            <span className="font-medium text-sm text-gray-700">Rent Tractor</span>
          </button>

          <button 
             onClick={() => onViewChange(View.FARM_MANAGEMENT)}
             className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-2 hover:bg-emerald-50 transition-colors"
          >
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <span className="text-xl">📅</span>
            </div>
            <span className="font-medium text-sm text-gray-700">Farm Plan</span>
          </button>

          <button 
            onClick={() => onViewChange(View.EXPERT_CHAT)}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-2 hover:bg-emerald-50 transition-colors"
          >
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
              <span className="text-xl">👨‍🎓</span>
            </div>
            <span className="font-medium text-sm text-gray-700">Ask Expert</span>
          </button>
        </div>
      </div>
    </div>
  );
};