import React from 'react';
import { Sprout, Calendar, Droplets, Thermometer, ChevronRight, Plus, Activity, Clock, Shield, Package, TrendingUp, Info } from 'lucide-react';

const MY_CROPS = [
  { id: 1, name: 'Premium Wheat', variety: 'Sharbati', area: '2.5 Acres', planted: 'Oct 12', status: 'Healthy', growth: 65, nextTask: 'Irrigation' },
  { id: 2, name: 'Cotton', variety: 'Bt Cotton', area: '1.2 Acres', planted: 'Jun 01', status: 'Warning', growth: 85, nextTask: 'Harvesting' },
];

const INVENTORY = [
  { name: 'Urea', amount: 80, unit: '%' },
  { name: 'DAP', amount: 45, unit: '%' },
  { name: 'Pesticide', amount: 20, unit: '%' },
];

const NUTRIENTS = [
  { name: 'Nitrogen (N)', val: 72, color: 'from-agri-400 to-agri-600', level: 'Optimal' },
  { name: 'Phosphorus (P)', val: 45, color: 'from-amber-400 to-amber-600', level: 'Medium' },
  { name: 'Potassium (K)', val: 88, color: 'from-indigo-400 to-indigo-600', level: 'High' },
];

export const FarmManagement: React.FC = () => {
  return (
    <div className="space-y-8 pb-32 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-agri-600 bg-agri-100 px-3 py-1 rounded-full">Pro Command Center</span>
           </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-1">Farm Management</h2>
          <p className="text-slate-500 font-medium text-sm">Automated tracking for high-yield precision farming.</p>
        </div>
        <button className="flex items-center gap-2 bg-agri-950 hover:bg-agri-800 text-white px-8 py-4 rounded-[24px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-agri-900/10 active:scale-95 transition-all">
          <Plus size={18} /> Register Plot
        </button>
      </div>

      {/* Unique Feature: Interactive NutriGauges */}
      <div className="bg-white rounded-[48px] p-8 border border-slate-100 shadow-xl shadow-agri-900/5">
        <div className="flex justify-between items-center mb-10">
           <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
             <Activity size={20} className="text-agri-600" />
             Soil Nutrient Analysis (V2)
           </h3>
           <button className="text-slate-400 hover:text-agri-600 transition-colors"><Info size={18}/></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           {NUTRIENTS.map((nutri, i) => (
             <div key={i} className="flex flex-col items-center">
                <div className="relative w-40 h-40 flex items-center justify-center">
                   {/* Simplified Gauge Circle */}
                   <svg className="w-full h-full transform -rotate-90">
                      <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                      <circle 
                        cx="80" cy="80" r="70" 
                        stroke="currentColor" 
                        strokeWidth="12" 
                        fill="transparent" 
                        strokeDasharray={440} 
                        strokeDashoffset={440 - (440 * nutri.val) / 100}
                        className={`text-agri-600 transition-all duration-[2s] ease-out`}
                        strokeLinecap="round"
                      />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-slate-800 leading-none">{nutri.val}%</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase mt-1 tracking-widest">{nutri.level}</span>
                   </div>
                </div>
                <p className="mt-6 text-xs font-black text-slate-700 uppercase tracking-widest">{nutri.name}</p>
             </div>
           ))}
        </div>
      </div>

      {/* Farm Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Soil Health', val: '92%', icon: Sprout, color: 'text-agri-600', bg: 'bg-agri-50' },
          { label: 'Moisture', val: '42%', icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Avg Temp', val: '28°C', icon: Thermometer, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Protection', val: 'Active', icon: Shield, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-7 rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center gap-4 hover-lift">
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-[24px] flex items-center justify-center shadow-inner`}>
              <stat.icon size={28} />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-xl font-black text-slate-800 tracking-tight">{stat.val}</p>
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
               Current Lifecycle
             </h3>
          </div>
          
          <div className="space-y-4">
            {MY_CROPS.map((crop) => (
              <div key={crop.id} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm group hover:border-agri-400 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-slate-50 rounded-[28px] flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform">
                      {crop.name.includes('Wheat') ? '🌾' : '🎋'}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-800 leading-tight">{crop.name}</h4>
                      <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">{crop.variety} • {crop.area}</p>
                    </div>
                  </div>
                  <div className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
                    crop.status === 'Healthy' ? 'bg-agri-50 text-agri-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {crop.status} Status
                  </div>
                </div>

                <div className="space-y-4">
                   <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth Velocity</span>
                      <span className="text-2xl font-black text-agri-700">{crop.growth}%</span>
                   </div>
                   <div className="h-6 bg-slate-100 rounded-full overflow-hidden p-1.5 shadow-inner">
                      <div 
                        className="h-full bg-gradient-to-r from-agri-400 via-agri-500 to-agri-600 rounded-full transition-all duration-1000 relative"
                        style={{ width: `${crop.growth}%` }}
                      >
                         <div className="absolute top-0 right-0 w-8 h-full bg-white/30 blur-sm"></div>
                      </div>
                   </div>
                </div>

                <div className="mt-10 flex items-center justify-between p-6 bg-slate-50 rounded-[32px] border border-dotted border-slate-200">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white shadow-xl rounded-xl flex items-center justify-center text-agri-600 text-lg">💡</div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recommended Task</span>
                        <span className="text-sm font-black text-slate-700">{crop.nextTask} scheduled for Octorber 25</span>
                      </div>
                   </div>
                   <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-agri-600 shadow-sm transition-all hover:scale-110">
                      <ChevronRight size={20} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Center Sidebar */}
        <div className="space-y-6">
          <div className="bg-agri-950 rounded-[48px] p-8 text-white relative overflow-hidden flex flex-col shadow-2xl shadow-agri-900/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-agri-gold/10 rounded-full blur-2xl -mr-16 -mt-16 animate-pulse"></div>
            <h3 className="text-xl font-black tracking-tight flex items-center gap-2 mb-10 relative z-10">
              <Clock size={20} className="text-agri-gold" />
              Pro Action Log
            </h3>
            
            <div className="space-y-10 relative ml-4 border-l-2 border-white/5 pl-8 relative z-10">
              {[
                { time: '06:00 AM', task: 'Soil Probe Check', desc: 'Optimal moisture levels', status: 'done' },
                { time: '09:30 AM', task: 'Urea Optimization', desc: 'North Sector • Block 4', status: 'pending' },
                { time: '02:00 PM', task: 'Logistics Prep', desc: '30 Quintals for Mandi', status: 'planned' }
              ].map((item, i) => (
                <div key={i} className="relative group">
                   <div className={`absolute -left-10 top-1.5 w-4 h-4 rounded-full border-4 border-agri-950 ${
                     item.status === 'done' ? 'bg-agri-400' : item.status === 'pending' ? 'bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.6)]' : 'bg-white/10'
                   }`}></div>
                   <p className="text-[10px] font-black text-agri-400 uppercase tracking-widest mb-1">{item.time}</p>
                   <h5 className="font-black text-sm tracking-tight text-white mb-1">{item.task}</h5>
                   <p className="text-[10px] text-agri-300/60 font-medium uppercase tracking-wider">{item.status}</p>
                </div>
              ))}
            </div>

            <button className="w-full mt-12 py-5 bg-white/10 hover:bg-white/20 rounded-[28px] border border-white/10 text-[10px] font-black uppercase tracking-widest transition-all shadow-xl">
              Modify Schedule
            </button>
          </div>

          <div className="bg-gradient-to-br from-agri-gold to-amber-600 rounded-[48px] p-8 text-agri-950 shadow-xl shadow-amber-200/40 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
             <TrendingUp size={64} className="absolute -right-4 -bottom-4 opacity-10 rotate-12" />
             <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Estimated Yield Value</p>
                <div className="flex items-baseline gap-2">
                   <h4 className="text-4xl font-black tracking-tighter">₹1.24L</h4>
                   <span className="text-xs font-bold opacity-60">NET PROFIT</span>
                </div>
                <div className="mt-8 flex items-center gap-3 bg-black/5 p-4 rounded-3xl border border-black/5">
                   <Shield size={20} className="text-agri-950" />
                   <span className="text-[10px] font-black uppercase leading-tight">Forecast Confidence: 94% • Optimized</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};