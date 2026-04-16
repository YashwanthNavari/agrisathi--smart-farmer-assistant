import React, { useState } from 'react';
import { 
  Cloud, Droplets, Wind, Sun, 
  TrendingUp, Activity, Smartphone, 
  Languages, Bell, MapPin, 
  ChevronRight, Sparkles 
} from 'lucide-react';
import { SathiTicker } from './SathiTicker';
import { SathiEye } from './SathiEye';
import { View } from '../App';

interface DashboardProps {
  onViewChange: (view: View) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onViewChange }) => {
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');

  return (
    <div className="space-y-8 pb-32 animate-fade-in-up">
      {/* SathiTicker Integration */}
      <div className="-mx-4 sm:-mx-8">
        <SathiTicker />
      </div>

      {/* Modern Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-4">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-agri-600 bg-agri-100 px-3 py-1 rounded-full">Pro Dashboard</span>
              <span className="w-1.5 h-1.5 bg-agri-gold rounded-full animate-pulse"></span>
           </div>
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-2">
             Namaste, <span className="text-agri-700">Yashwanth</span>
           </h1>
           <p className="text-slate-500 font-medium text-sm flex items-center gap-2">
             <MapPin size={14} className="text-agri-500" /> Nagpur, Maharashtra • Tuesday, 24 Oct
           </p>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-2 rounded-3xl border border-slate-100 shadow-sm">
           <button 
             onClick={() => setLang('EN')}
             className={`px-4 py-2 rounded-2xl text-[10px] font-black transition-all ${lang === 'EN' ? 'bg-agri-950 text-white shadow-lg' : 'text-slate-400 hover:text-agri-600'}`}
           >
             ENGLISH
           </button>
           <button 
             onClick={() => setLang('HI')}
             className={`px-4 py-2 rounded-2xl text-[10px] font-black transition-all ${lang === 'HI' ? 'bg-agri-950 text-white shadow-lg' : 'text-slate-400 hover:text-agri-600'}`}
           >
             हिंदी
           </button>
        </div>
      </div>

      {/* Primary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Futuristic Weather & Environment Card */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="glass-midnight rounded-[40px] p-8 text-white relative overflow-hidden group hover-lift">
            <div className="absolute top-0 right-0 w-48 h-48 bg-agri-gold/10 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-agri-gold/20 transition-colors duration-700"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-10">
                <div>
                   <h3 className="text-5xl font-black tracking-tighter mb-1">28°C</h3>
                   <span className="text-xs font-bold text-agri-300 uppercase tracking-widest">Mostly Sunny</span>
                </div>
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center text-agri-gold border border-white/10 shadow-xl">
                  <Sun size={32} strokeWidth={2.5} className="animate-float" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
                   <div className="flex items-center gap-2 text-agri-300 mb-2">
                     <Droplets size={14} />
                     <span className="text-[10px] font-black uppercase tracking-widest">Moisture</span>
                   </div>
                   <div className="text-xl font-black">42%</div>
                </div>
                <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
                   <div className="flex items-center gap-2 text-agri-300 mb-2">
                     <Wind size={14} />
                     <span className="text-[10px] font-black uppercase tracking-widest">Wind</span>
                   </div>
                   <div className="text-xl font-black">12 km/h</div>
                </div>
              </div>

              <button className="w-full mt-8 py-4 bg-agri-gold text-agri-950 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-agri-gold/20 active:scale-95 transition-all text-center">
                 View Historical Trends
              </button>
            </div>
          </div>

          {/* Quick Actions / Insights */}
          <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
              <Sparkles size={18} className="text-agri-gold fill-agri-gold" />
              AI Intelligent Tasks
            </h3>
            <div className="space-y-3">
               {[
                 { label: 'Fertilizer Optimization', status: 'Ready', color: 'bg-agri-50 text-agri-600' },
                 { label: 'Pest Alert (Cotton)', status: 'Urgent', color: 'bg-rose-50 text-rose-600' },
                 { label: 'Irrigation Schedule', status: 'Manual', color: 'bg-blue-50 text-blue-600' }
               ].map((task, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group cursor-pointer hover:bg-white transition-all">
                    <span className="text-sm font-black text-slate-700 tracking-tight">{task.label}</span>
                    <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${task.color}`}>
                      {task.status}
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Sathi Eye Integration - Taking center/right stage */}
        <div className="lg:col-span-2">
          <SathiEye />
        </div>
      </div>

      {/* Market Pulse Mini-Widget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm flex items-center justify-between group cursor-pointer hover-lift">
           <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-agri-50 text-agri-700 rounded-3xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110">
                 🌾
              </div>
              <div>
                 <h4 className="text-xl font-black text-slate-800 tracking-tight">Wheat (Sharbati)</h4>
                 <p className="text-xs font-bold text-slate-400 mt-0.5 uppercase tracking-widest">Nagpur APMC • Live</p>
              </div>
           </div>
           <div className="text-right">
              <div className="text-2xl font-black text-agri-700 flex items-center justify-end gap-2">
                 ₹2,340
                 <TrendingUp size={20} className="text-agri-500" />
              </div>
              <p className="text-[10px] font-black text-agri-500 uppercase tracking-widest mt-1">+₹45 TODAY</p>
           </div>
        </div>

        <div 
          onClick={() => onViewChange(View.EXPERT_CHAT)}
          className="bg-agri-950 rounded-[40px] p-8 text-white flex items-center justify-between group cursor-pointer hover-lift"
        >
           <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white/10 text-white rounded-3xl flex items-center justify-center transition-transform group-hover:scale-110">
                 <Smartphone size={28} className="text-agri-gold" />
              </div>
              <div>
                 <h4 className="text-xl font-black tracking-tight">Connect with Expert</h4>
                 <p className="text-xs font-bold text-agri-400 mt-0.5 uppercase tracking-widest">AI & Voice Support</p>
              </div>
           </div>
           <button className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all">
              <ChevronRight size={24} />
           </button>
        </div>
      </div>
    </div>
  );
};