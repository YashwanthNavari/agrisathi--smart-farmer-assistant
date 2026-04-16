import React, { useState } from 'react';
import { Crosshair, Map as MapIcon, Layers, Scan, Activity, Info } from 'lucide-react';

export const SathiEye: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'ndvi' | 'moisture'>('ndvi');
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  return (
    <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-agri-900/5 overflow-hidden group">
      {/* Header */}
      <div className="p-8 pb-4 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <div className="w-2 h-2 bg-agri-gold rounded-full animate-ping"></div>
             <span className="text-[10px] font-black uppercase tracking-widest text-agri-600">Pro Sathi Satellite AI</span>
          </div>
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">Sathi Eye™ Field Monitor</h3>
        </div>
        <button className="p-3 bg-slate-50 hover:bg-agri-50 rounded-2xl transition-colors text-slate-400 hover:text-agri-600">
          <Info size={20} />
        </button>
      </div>

      {/* Main Analysis Window */}
      <div className="px-8 pb-8">
        <div className="relative aspect-[16/10] rounded-[32px] overflow-hidden bg-slate-900 shadow-inner group/map">
          {/* Base Layer (Satellite Image) */}
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop" 
            className={`w-full h-full object-cover transition-all duration-1000 ${isScanning ? 'brightness-50' : 'brightness-90 opacity-40'}`}
            alt="Farm View"
          />

          {/* Heatmap Layer */}
          <div className={`absolute inset-0 transition-opacity duration-1000 mix-blend-overlay ${
             isScanning ? 'opacity-0' : activeLayer === 'ndvi' ? 'opacity-80' : 'opacity-60'
          }`}>
             <div className={`w-full h-full bg-gradient-to-tr ${
               activeLayer === 'ndvi' 
                ? 'from-rose-500/40 via-agri-400/60 to-agri-600/80 animate-liquid' 
                : 'from-blue-600/40 via-cyan-400/60 to-indigo-600/80 animate-wave'
             }`}></div>
          </div>

          {/* Scanning Line */}
          {isScanning && (
            <div className="absolute inset-0 bg-agri-400/20 backdrop-blur-[1px] animate-pulse">
               <div className="absolute top-0 left-0 right-0 h-1 bg-agri-400 shadow-[0_0_20px_rgba(74,222,128,0.8)] animate-[scan_3s_ease-in-out_infinite]"></div>
            </div>
          )}

          {/* Markers */}
          <div className="absolute top-1/4 left-1/3 w-8 h-8 flex items-center justify-center">
             <div className="absolute inset-0 bg-rose-500/20 rounded-full animate-ping"></div>
             <Crosshair size={16} className="text-rose-500" />
             <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md text-white text-[8px] font-black px-2 py-1 rounded-lg border border-white/10 whitespace-nowrap opacity-0 group-hover/map:opacity-100 transition-opacity">
                PEST ZONE DETECTED
             </div>
          </div>

          <div className="absolute bottom-1/3 right-1/4">
             <div className="absolute inset-0 bg-agri-400/20 rounded-full animate-ping"></div>
             <Crosshair size={16} className="text-agri-400" />
          </div>

          {/* UI Overlays */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button 
              onClick={() => setActiveLayer('ndvi')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${
                activeLayer === 'ndvi' ? 'bg-agri-600 border-agri-500 text-white shadow-lg' : 'bg-slate-900/50 border-white/10 text-white/60'
              }`}
            >
              <Activity size={18} />
            </button>
            <button 
              onClick={() => setActiveLayer('moisture')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${
                activeLayer === 'moisture' ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-slate-900/50 border-white/10 text-white/60'
              }`}
            >
              <Layers size={18} />
            </button>
          </div>

          <button 
            onClick={startScan}
            className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-2xl text-[10px] font-black flex items-center gap-2 hover:bg-white/20 transition-all uppercase tracking-widest"
          >
            <Scan size={14} className={isScanning ? 'animate-spin' : ''} />
            {isScanning ? 'Processing...' : 'Recalibrate'}
          </button>
        </div>

        {/* Legend & Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
           <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-2">Overall Health</span>
              <div className="flex items-center gap-3">
                 <div className="text-2xl font-black text-agri-700">88.5</div>
                 <div className="px-2 py-0.5 bg-agri-100 text-agri-600 text-[8px] font-black rounded-full">+2.4%</div>
              </div>
           </div>
           
           <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-2">Nitrogen Levels</span>
              <div className="flex items-center gap-3">
                 <div className="text-2xl font-black text-slate-800">High</div>
                 <div className="w-2 h-2 bg-agri-500 rounded-full animate-pulse"></div>
              </div>
           </div>

           <div className="p-5 bg-slate-900 rounded-3xl group/btn cursor-pointer overflow-hidden relative">
              <div className="absolute top-0 right-0 w-16 h-16 bg-agri-gold/5 rounded-full blur-xl"></div>
              <div className="relative z-10 flex flex-col justify-center h-full">
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Export Data</span>
                  <div className="text-white text-xs font-black flex items-center gap-2">
                    Download PDF <MapIcon size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                  </div>
              </div>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};
