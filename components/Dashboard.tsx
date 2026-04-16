import React, { useState } from 'react';
import { 
  CloudSun, Droplets, Wind, ArrowRight, TrendingUp, Sun, 
  CloudRain, Cloud, AlertCircle, TrendingDown, Clock, MapPin 
} from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('daily');

  return (
    <div className="space-y-8 pb-10">
      
      {/* Dynamic Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Farm Overview</h2>
          <div className="flex items-center gap-2 text-slate-500 mt-1">
            <MapPin size={14} className="text-agri-600" />
            <span className="text-xs font-semibold uppercase tracking-wider">Amravati region, MH</span>
          </div>
        </div>
        <div className="flex bg-slate-200/50 p-1 rounded-full border border-slate-200">
          <button 
            onClick={() => setActiveTab('daily')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'daily' ? 'bg-white text-agri-700 shadow-sm' : 'text-slate-500'}`}
          >
            Daily
          </button>
          <button 
            onClick={() => setActiveTab('weekly')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'weekly' ? 'bg-white text-agri-700 shadow-sm' : 'text-slate-500'}`}
          >
            Weekly
          </button>
        </div>
      </div>

      {/* Critical Alerts - Premium Floating Style */}
      <div className="bg-rose-50 border border-rose-100 rounded-3xl p-5 flex items-center gap-4 shadow-sm animate-pulse-slow">
        <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600 shrink-0 shadow-inner">
          <AlertCircle size={24} strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">Weather Alert</span>
            <span className="w-1 h-1 bg-rose-300 rounded-full"></span>
            <span className="text-[10px] font-bold text-rose-400">Arriving in 4h</span>
          </div>
          <h4 className="text-sm font-extrabold text-rose-900 leading-tight">Unexpected Heavy Precipitation</h4>
          <p className="text-xs text-rose-700/80 mt-1 font-medium italic">"Cover your harvested stock immediately."</p>
        </div>
      </div>

      {/* Premium Weather Feature Card */}
      <div className="relative group overflow-hidden rounded-[32px] bg-gradient-to-br from-agri-700 via-agri-600 to-agri-500 p-8 text-white shadow-2xl shadow-agri-200">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-agri-400/20 rounded-full -ml-10 -mb-10 blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 backdrop-blur-sm">Today's Weather</span>
              <div className="flex items-center gap-1 text-agri-100 text-xs font-bold">
                <Clock size={12} />
                <span>Updated 5m ago</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-7xl font-black tracking-tighter drop-shadow-md">32°</span>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold opacity-95">Mainly Sunny</span>
                <span className="text-sm font-medium opacity-70">L: 24° • H: 34°</span>
              </div>
              <CloudSun size={80} className="ml-auto text-yellow-300 drop-shadow-2xl animate-float hidden sm:block" />
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Droplets, val: '45%', label: 'Humidity' },
                { icon: Wind, val: '12 km/h', label: 'Wind' },
                { icon: CloudRain, val: '0%', label: 'Rain' }
              ].map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
                  <item.icon size={18} className="mx-auto mb-1 opacity-80" />
                  <div className="text-sm font-bold">{item.val}</div>
                  <div className="text-[10px] uppercase font-bold opacity-60 tracking-wider font-display">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-px md:h-auto h-px w-full bg-white/20"></div>

          <div className="flex flex-col justify-between gap-4">
            <h5 className="text-[10px] font-black uppercase tracking-widest opacity-60">Forecast</h5>
            <div className="space-y-4">
              {[
                { day: 'Friday', temp: '30°', icon: Cloud, color: 'text-slate-200' },
                { day: 'Saturday', temp: '34°', icon: Sun, color: 'text-yellow-300' },
                { day: 'Sunday', temp: '28°', icon: CloudRain, color: 'text-blue-200' }
              ].map((day, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-xs font-bold w-14 opacity-80">{day.day}</span>
                  <day.icon size={18} className={day.color} />
                  <span className="text-sm font-black ml-auto">{day.temp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Market Trend Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-[32px] p-7 shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={16} className="text-agri-600" />
                <h3 className="font-extrabold text-slate-800 tracking-tight">Wheat Mandi Trends</h3>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nagpur Region • Last 7 Days</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-slate-800">₹2,000</span>
              <div className="flex items-center justify-end gap-1 text-[10px] font-bold text-agri-600 uppercase">
                <TrendingUp size={10} />
                <span>+₹200 Today</span>
              </div>
            </div>
          </div>
          
          <div className="h-48 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 600}} dy={10} />
                <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
                <Tooltip 
                  cursor={{ stroke: '#22c55e', strokeWidth: 2 }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="price" stroke="#22c55e" strokeWidth={4} fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Floating Action Banner */}
        <button 
          onClick={() => onViewChange(View.SCHEMES)}
          className="bg-amber-100 rounded-[32px] p-7 border-2 border-amber-200/50 flex flex-col items-start text-left relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
        >
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-amber-500/10 rounded-full group-hover:scale-110 transition-transform"></div>
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-sm">🏛️</div>
          <h4 className="text-lg font-black text-amber-900 leading-none mb-1">Government Schemes</h4>
          <p className="text-xs font-semibold text-amber-700/80 mb-6">Unlock subsidies, loans, and PM-Kisan benefits available for you.</p>
          <div className="mt-auto flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-800">
            Check Status <ArrowRight size={14} />
          </div>
        </button>
      </div>

      {/* Modern Quick Actions Grid */}
      <div>
        <div className="flex justify-between items-end mb-4 px-2">
          <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">Intelligent Actions</h3>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Powered</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Heal Crop', emoji: '🩺', color: 'bg-rose-50 text-rose-600', view: View.DISEASE_DETECTION },
            { label: 'Rent Gear', emoji: '🚜', color: 'bg-indigo-50 text-indigo-600', view: View.MARKETPLACE },
            { label: 'Farm Plan', emoji: '📅', color: 'bg-sky-50 text-sky-600', view: View.FARM_MANAGEMENT },
            { label: 'Ask Expert', emoji: '👨‍🎓', color: 'bg-violet-50 text-violet-600', view: View.EXPERT_CHAT }
          ].map((action, i) => (
            <button 
              key={i}
              onClick={() => onViewChange(action.view)}
              className="bg-white p-5 rounded-[28px] shadow-sm border border-slate-100 flex flex-col items-center text-center gap-3 hover:border-agri-400 hover:shadow-lg hover:shadow-slate-200/50 transition-all group"
            >
              <div className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform`}>
                {action.emoji}
              </div>
              <span className="font-extrabold text-xs text-slate-700 uppercase tracking-wider">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};