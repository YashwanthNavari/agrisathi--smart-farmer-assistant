import React from 'react';
import { Bell, User, Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onMenuClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/40 shadow-sm">
      <div className="max-w-4xl mx-auto px-6 h-18 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onMenuClick} 
            className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors md:hidden text-slate-600"
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-agri-600 rounded-xl flex items-center justify-center shadow-lg shadow-agri-600/30 rotate-3 animate-float">
               <span className="text-xl">🌾</span>
             </div>
             <div>
               <h1 className="text-xl font-extrabold tracking-tight text-slate-800 leading-none">{title}</h1>
               <p className="text-[10px] font-bold text-agri-600 uppercase tracking-widest mt-0.5">Premium Assistant</p>
             </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="p-2.5 hover:bg-slate-100 rounded-xl relative text-slate-600 transition-colors">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
          </button>
          <button className="flex items-center gap-2 pl-1 pr-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full transition-all border border-slate-200 group">
            <div className="w-8 h-8 rounded-full bg-agri-700 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
              <User size={16} />
            </div>
            <span className="text-xs font-bold text-slate-700 hidden sm:inline">Farmer John</span>
          </button>
        </div>
      </div>
    </header>
  );
};