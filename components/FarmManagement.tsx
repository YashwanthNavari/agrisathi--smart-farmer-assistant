import React from 'react';
import { Calendar, Package, Droplet, Sprout, AlertCircle, TrendingUp, Sun } from 'lucide-react';
import { CropLifecycle } from '../types';

const inventoryData = [
  { name: 'Urea', amount: 80, unit: '%' },
  { name: 'DAP', amount: 45, unit: '%' },
  { name: 'Pesticide', amount: 20, unit: '%' },
];

const MY_CROPS: CropLifecycle[] = [
  {
    id: '1',
    name: 'Wheat',
    variety: 'Sharbati',
    sownDate: '15 Oct 2024',
    harvestDate: '20 Feb 2025',
    stage: 'Vegetative',
    progress: 35,
    health: 'Good',
    image: 'https://picsum.photos/100/100?random=10'
  },
  {
    id: '2',
    name: 'Cotton',
    variety: 'Bt Cotton',
    sownDate: '01 June 2024',
    harvestDate: '15 Nov 2024',
    stage: 'Maturity',
    progress: 85,
    health: 'Average',
    image: 'https://picsum.photos/100/100?random=11'
  }
];

export const FarmManagement: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-gray-800">My Farm Manager</h2>

      {/* Live Crop Tracker */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Sprout size={20} className="text-emerald-600" />
          Live Crop Tracker
        </h3>
        <div className="space-y-3">
          {MY_CROPS.map(crop => (
            <div key={crop.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
               <div className="flex gap-4 mb-3">
                 <img src={crop.image} alt={crop.name} className="w-16 h-16 rounded-lg object-cover" />
                 <div className="flex-1">
                   <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-gray-800">{crop.name}</h4>
                        <p className="text-xs text-gray-500">{crop.variety}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        crop.health === 'Good' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {crop.health}
                      </span>
                   </div>
                   <div className="flex justify-between items-end mt-2">
                      <span className="text-xs font-semibold text-emerald-700">{crop.stage} Stage</span>
                      <span className="text-[10px] text-gray-400">Harvest: {crop.harvestDate}</span>
                   </div>
                 </div>
               </div>
               {/* Progress Bar */}
               <div className="relative pt-1">
                  <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-100">
                    <div style={{ width: `${crop.progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>Sowing</span>
                    <span>Growth</span>
                    <span>Harvest</span>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-emerald-50 px-4 py-3 border-b border-emerald-100 flex justify-between items-center">
          <h3 className="font-semibold text-emerald-800 flex items-center gap-2">
            <Calendar size={18} />
            Action Plan
          </h3>
          <span className="text-xs bg-emerald-200 text-emerald-800 px-2 py-1 rounded-full font-bold">3 Actions</span>
        </div>
        <div className="divide-y divide-gray-100">
          {/* Weather Alert in Tasks */}
          <div className="p-4 flex gap-3 bg-red-50/50">
             <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0 animate-pulse">
               <AlertCircle size={20} />
             </div>
             <div>
               <h4 className="font-bold text-red-700">Heavy Rain Alert</h4>
               <p className="text-xs text-red-600">Ensure drainage in Cotton field today.</p>
             </div>
          </div>

          <div className="p-4 flex gap-3 hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
              <Droplet size={20} />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Irrigate Wheat Field</h4>
              <p className="text-xs text-gray-500">Sector 2 • Due Today</p>
            </div>
          </div>
          <div className="p-4 flex gap-3 hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
              <Sprout size={20} />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Apply NPK Fertilizer</h4>
              <p className="text-xs text-gray-500">Sector 1 • Due Tomorrow</p>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Package size={18} className="text-indigo-600" />
            Stock Inventory
          </h3>
          <button className="text-xs text-indigo-600 font-medium">Manage</button>
        </div>
        <div className="space-y-4">
          {inventoryData.map((item) => (
            <div key={item.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{item.name}</span>
                <span className={`font-bold ${item.amount < 30 ? 'text-red-500' : 'text-gray-600'}`}>
                  {item.amount}{item.unit}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${item.amount < 30 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                  style={{ width: `${item.amount}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Overview (Placeholder for Profit/Loss) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-800 mb-2">Estimated Yield Profit</h3>
        <p className="text-sm text-gray-500 mb-4">Projected based on current market rates and crop health.</p>
        <div className="h-40 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg flex items-center justify-center border border-emerald-100 relative overflow-hidden">
           <TrendingUp size={100} className="absolute -right-4 -bottom-4 text-emerald-100/50" />
           <div className="text-center z-10">
            <span className="text-3xl font-bold text-emerald-700">₹1,24,000</span>
            <p className="text-xs text-emerald-600 mt-1">Projected Net Profit</p>
          </div>
        </div>
      </div>
    </div>
  );
};