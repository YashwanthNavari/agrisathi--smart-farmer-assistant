import React from 'react';
import { TrendingUp, AlertTriangle, Zap, Wheat } from 'lucide-react';

const NEWS_ITEMS = [
  { id: 1, text: "Wheat Mandi prices up 15% in Nagpur region.", type: 'trend' },
  { id: 2, text: "Unseasonal rain alert for Central Maharashtra on Oct 28.", type: 'alert' },
  { id: 3, text: "New Govt. subsidy announced for Solar Water Pumps.", type: 'update' },
  { id: 4, text: "Pest outbreak reported in neighboring Cotton fields.", type: 'alert' },
];

export const SathiTicker: React.FC = () => {
  return (
    <div className="w-full bg-agri-950 text-white overflow-hidden py-2 border-y border-white/5 relative z-50">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...NEWS_ITEMS, ...NEWS_ITEMS].map((item, index) => (
          <div key={`${item.id}-${index}`} className="flex items-center gap-4 mx-8">
            <div className={`p-1 rounded-md ${
              item.type === 'alert' ? 'bg-rose-500/20 text-rose-400' : 
              item.type === 'trend' ? 'bg-agri-400/20 text-agri-400' : 'bg-agri-gold/20 text-agri-gold'
            }`}>
              {item.type === 'alert' ? <AlertTriangle size={14} /> : 
               item.type === 'trend' ? <TrendingUp size={14} /> : <Zap size={14} />}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <span className="opacity-40">{index % 2 === 0 ? <Wheat size={10} /> : <Zap size={10} />}</span>
              {item.text}
            </span>
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};
