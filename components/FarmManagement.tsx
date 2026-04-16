import React from 'react';
import { Sprout, Calendar, Droplets, Thermometer, ChevronRight, Plus, Activity, Clock, Shield, Package, TrendingUp } from 'lucide-react';

const MY_CROPS = [
  { id: 1, name: 'Premium Wheat', variety: 'Sharbati', area: '2.5 Acres', planted: 'Oct 12', status: 'Healthy', growth: 65, nextTask: 'Irrigation' },
  { id: 2, name: 'Cotton', variety: 'Bt Cotton', area: '1.2 Acres', planted: 'Jun 01', status: 'Warning', growth: 85, nextTask: 'Harvesting' },
];

const INVENTORY = [
  { name: 'Urea', amount: 80, unit: '%' },
  { name: 'DAP', amount: 45, unit: '%' },
  { name: 'Pesticide', amount: 20, unit: '%' },
];

export const FarmManagement: React.FC = () => {
  return (
    <div className="space-y-8 pb-32">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Farm Command</h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Real-time tracking of your crops, inventory, and yields.</p>
        </div>
        <button className="flex items-center gap-2 bg-agri-600 hover:bg-agri-700 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-agri-600/20 active:scale-95 transition-all">
          <Plus size={16} /> New Plot
        </button>
      </div>

      {/* Modern Dashboard Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Soil Health', val: 'Optimal', icon: Sprout, color: 'text-agri-600', bg: 'bg-agri-50' },
          { label: 'Moisture', val: '42%', icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Avg Temp', val: '28°C', icon: Thermometer, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Protection', val: 'Active', icon: Shield, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center gap-3 hover:scale-105 transition-transform">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
              <stat.icon size={22} />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
              <p className="text-sm font-black text-slate-800 tracking-tight">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Crops Trackers */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
             <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
               <Activity size={20} className="text-agri-600" />
               Crop Lifecycle
             </h3>
          </div>
          
          <div className="space-y-4">
            {MY_CROPS.map((crop) => (
              <div key={crop.id} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm group hover:border-agri-300 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-[24px] flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
                      {crop.name.includes('Wheat') ? '🌾' : '🎋'}
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-800 leading-tight">{crop.name}</h4>
                      <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">{crop.variety} • {crop.area}</p>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                    crop.status === 'Healthy' ? 'bg-agri-50 text-agri-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {crop.status} Status
                  </div>
                </div>

                <div className="space-y-3">
                   <div className="flex justify-between items-end">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Growth Progress</span>
                      <span className="text-lg font-black text-agri-600">{crop.growth}%</span>
                   </div>
                   <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner">
                      <div 
                        className="h-full bg-gradient-to-r from-agri-400 to-agri-600 rounded-full transition-all duration-1000"
                        style={{ width: `${crop.growth}%` }}
                      ></div>
                   </div>
                </div>

                <div className="mt-8 flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-dotted border-slate-200">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                         <Calendar size={14} className="text-agri-600" />
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Next Action</span>
                        <span className="text-xs font-black text-slate-700">{crop.nextTask} Plan</span>
                      </div>
                   </div>
                   <button className="text-agri-600 hover:text-agri-700 transition-colors">
                      <ChevronRight size={20} />
                   </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Inventory Overview */}
          <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                <Package size={20} className="text-indigo-600" />
                Input Inventory
              </h3>
              <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Manage Stock</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {INVENTORY.map((item) => (
                <div key={item.name} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-black text-slate-700">{item.name}</span>
                    <span className={`text-xs font-bold ${item.amount < 30 ? 'text-rose-500' : 'text-slate-400'}`}>{item.amount}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        item.amount < 30 ? 'bg-rose-500' : 'bg-indigo-500'
                      }`} 
                      style={{ width: `${item.amount}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Center */}
        <div className="space-y-6">
          {/* Timeline */}
          <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 w-32 h-32 bg-agri-500/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
            <h3 className="text-xl font-black tracking-tight flex items-center gap-2 mb-8 relative z-10">
              <Clock size={20} className="text-agri-400" />
              Daily Log
            </h3>
            
            <div className="space-y-8 relative ml-4 border-l-2 border-slate-800 pl-8 relative z-10">
              {[
                { time: '06:00 AM', task: 'Soil Check', desc: 'Optimal moisture detected', status: 'done' },
                { time: '09:30 AM', task: 'Urea Application', desc: 'North Sector • Block 4', status: 'pending' },
                { time: '02:00 PM', task: 'Mandi Shipment', desc: '30 Quintals ready', status: 'planned' }
              ].map((item, i) => (
                <div key={i} className="relative group">
                   <div className={`absolute -left-10 top-1.5 w-4 h-4 rounded-full border-4 border-slate-900 ${
                     item.status === 'done' ? 'bg-agri-500' : item.status === 'pending' ? 'bg-amber-400 animate-pulse' : 'bg-slate-700'
                   }`}></div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{item.time}</p>
                   <h5 className="font-black text-sm tracking-tight">{item.task}</h5>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Card */}
          <div className="bg-gradient-to-br from-agri-600 to-agri-800 rounded-[40px] p-8 text-white shadow-xl shadow-agri-200">
             <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                   <TrendingUp size={24} className="text-agri-100" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-agri-200">Season Target</span>
             </div>
             <div>
                <p className="text-[10px] font-black text-agri-200 uppercase tracking-widest mb-1">Projected Net Profit</p>
                <h4 className="text-4xl font-black tracking-tighter">₹1.24L</h4>
                <div className="flex items-center gap-2 mt-4 text-[10px] font-bold text-agri-100 bg-white/10 px-3 py-2 rounded-xl border border-white/10">
                   <div className="w-1.5 h-1.5 bg-agri-300 rounded-full"></div>
                   Performance: +12% from last season
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};