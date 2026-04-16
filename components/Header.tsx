import React from 'react';
import { Bell, User, Menu, Hexagon, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
  cartCount: number;
}

export const Header: React.FC<HeaderProps> = ({ title, onMenuClick, cartCount }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] glass-pro border-b border-white/20">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button 
            onClick={onMenuClick} 
            className="p-3 hover:bg-agri-50 rounded-2xl transition-all md:hidden text-slate-600 active:scale-90"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-4 group cursor-pointer">
             <div className="relative">
                <div className="absolute inset-0 bg-agri-600 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="w-12 h-12 bg-agri-950 rounded-2xl flex items-center justify-center shadow-2xl relative z-10 overflow-hidden">
                   <div className="absolute top-0 right-0 w-6 h-6 bg-agri-gold/20 rounded-full -mr-2 -mt-2"></div>
                   <span className="text-2xl animate-float">🌾</span>
                </div>
             </div>
             <div className="hidden sm:block">
                <h1 className="text-xl font-black tracking-tighter text-slate-900 leading-none mb-1">AgriSathi <span className="text-agri-gold italic">Pro</span></h1>
                <p className="text-[9px] font-black text-agri-600 uppercase tracking-[0.2em]">Next-Gen Assistant</p>
             </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-3.5 hover:bg-slate-50 rounded-2xl relative text-slate-400 transition-all hover:text-agri-600">
            <ShoppingCart size={22} strokeWidth={2.5} />
            {cartCount > 0 && (
              <span className="absolute top-2 right-2 w-5 h-5 bg-rose-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
          
          <button className="flex items-center gap-3 pl-1 pr-4 py-1.5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-xl bg-agri-950 flex items-center justify-center text-agri-gold shadow-lg group-hover:rotate-6 transition-transform">
              <User size={20} />
            </div>
            <div className="hidden lg:block text-left">
               <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">Profile</span>
               <span className="text-xs font-black text-slate-800">Yashwanth</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};