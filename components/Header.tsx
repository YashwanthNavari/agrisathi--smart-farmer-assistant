import React from 'react';
import { Bell, User, Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onMenuClick }) => {
  return (
    <header className="bg-emerald-600 text-white shadow-md sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={onMenuClick} className="p-1 hover:bg-emerald-700 rounded-full md:hidden">
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
             <span className="text-2xl">🌾</span>
             <h1 className="text-xl font-bold tracking-wide">{title}</h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-emerald-700 rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          <button className="p-2 hover:bg-emerald-700 rounded-full bg-emerald-800">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};