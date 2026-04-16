import React, { useState } from 'react';
import { Search, Filter, MapPin, Tag, TrendingUp, TrendingDown, Minus, Calendar, X } from 'lucide-react';
import { Product, MandiRate } from '../types';

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Sharbati Wheat Seeds', price: 4200, category: 'seeds', image: 'https://picsum.photos/300/200?random=1', seller: 'Kisan Kendra', location: 'Nagpur', rating: 4.5, type: 'buy' },
  { id: '2', name: 'NPK Fertilizer 50kg', price: 1200, category: 'fertilizer', image: 'https://picsum.photos/300/200?random=2', seller: 'AgriCorp', location: 'Pune', rating: 4.8, type: 'buy' },
  { id: '3', name: 'Mahindra Tractor 575 DI', price: 800, category: 'machinery', image: 'https://picsum.photos/300/200?random=3', seller: 'Ramesh Patil', location: 'Local', rating: 4.2, type: 'buy', isRentable: true },
  { id: '4', name: 'Fresh Tomatoes (Quintal)', price: 2500, category: 'crop', image: 'https://picsum.photos/300/200?random=4', seller: 'Self', location: 'Farm', rating: 0, type: 'sell' },
  { id: '5', name: 'Solar Insect Trap', price: 1500, category: 'tools', image: 'https://picsum.photos/300/200?random=5', seller: 'GreenTech', location: 'Nashik', rating: 4.6, type: 'buy' },
  { id: '6', name: 'Basmati Paddy', price: 3800, category: 'crop', image: 'https://picsum.photos/300/200?random=6', seller: 'Suresh Kumar', location: 'Amravati', rating: 4.9, type: 'sell' },
  { id: '7', name: 'Drone Sprayer', price: 1500, category: 'machinery', image: 'https://picsum.photos/300/200?random=7', seller: 'AgriDrone Services', location: 'Nagpur', rating: 4.9, type: 'buy', isRentable: true },
];

const MOCK_MANDI_RATES: MandiRate[] = [
  { id: '1', commodity: 'Wheat (Lokwan)', market: 'Nagpur APMC', minPrice: 2100, maxPrice: 2450, modalPrice: 2300, trend: 'up', lastUpdated: 'Today' },
  { id: '2', commodity: 'Soyabean', market: 'Amravati Mandi', minPrice: 4200, maxPrice: 4600, modalPrice: 4450, trend: 'down', lastUpdated: 'Today' },
  { id: '3', commodity: 'Cotton', market: 'Akola', minPrice: 6800, maxPrice: 7200, modalPrice: 7000, trend: 'stable', lastUpdated: 'Yesterday' },
  { id: '4', commodity: 'Onion (Red)', market: 'Lasalgaon', minPrice: 1200, maxPrice: 1800, modalPrice: 1500, trend: 'up', lastUpdated: 'Today' },
  { id: '5', commodity: 'Turmeric', market: 'Sangli', minPrice: 6500, maxPrice: 7800, modalPrice: 7200, trend: 'stable', lastUpdated: '2 days ago' },
];

export const Marketplace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'mandi'>('buy');
  const [filter, setFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showRentModal, setShowRentModal] = useState(false);

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.type === activeTab && (filter === 'all' || p.category === filter)
  );

  const handleProductClick = (product: Product) => {
    if (product.isRentable) {
      setSelectedProduct(product);
      setShowRentModal(true);
    }
  };

  const RentModal = () => {
    if (!selectedProduct) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="relative h-40">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            <button 
              onClick={() => setShowRentModal(false)}
              className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-5">
            <h3 className="text-lg font-bold text-gray-800 mb-1">{selectedProduct.name}</h3>
            <p className="text-emerald-600 font-bold text-xl mb-4">₹{selectedProduct.price}<span className="text-sm font-normal text-gray-500"> / hour</span></p>
            
            <div className="space-y-3 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <label className="text-xs text-gray-500 font-semibold uppercase block mb-1">Select Date</label>
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar size={18} className="text-emerald-600" />
                  <span className="font-medium">Tomorrow, 26 Oct</span>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <label className="text-xs text-gray-500 font-semibold uppercase block mb-1">Duration</label>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">4 Hours</span>
                  <span className="text-sm text-gray-500">Total: ₹{selectedProduct.price * 4}</span>
                </div>
              </div>
            </div>

            <button 
              className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg active:scale-95 transition-all"
              onClick={() => {
                alert(`Booking Request Sent for ${selectedProduct.name}!`);
                setShowRentModal(false);
              }}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pb-20">
      {showRentModal && <RentModal />}

      {/* Sticky Top Bar */}
      <div className="sticky top-0 bg-white z-30 pt-4 pb-2 px-4 shadow-sm">
        <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
          <button
            className={`flex-1 py-2 text-xs md:text-sm font-semibold rounded-md transition-all ${activeTab === 'buy' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500'}`}
            onClick={() => setActiveTab('buy')}
          >
            Buy Input
          </button>
          <button
            className={`flex-1 py-2 text-xs md:text-sm font-semibold rounded-md transition-all ${activeTab === 'sell' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500'}`}
            onClick={() => setActiveTab('sell')}
          >
            Sell Produce
          </button>
          <button
            className={`flex-1 py-2 text-xs md:text-sm font-semibold rounded-md transition-all ${activeTab === 'mandi' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500'}`}
            onClick={() => setActiveTab('mandi')}
          >
            Mandi Rates
          </button>
        </div>

        {activeTab !== 'mandi' && (
          <>
            <div className="flex gap-2 items-center mb-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder={activeTab === 'buy' ? "Search seeds, tools..." : "Search buyers..."}
                  className="w-full bg-gray-50 border border-gray-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button className="p-2 bg-gray-50 border border-gray-200 rounded-full">
                <Filter size={18} className="text-gray-600" />
              </button>
            </div>

            {/* Categories Pills */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {['all', 'seeds', 'fertilizer', 'machinery', 'tools', 'crop'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap capitalize border ${
                    filter === cat 
                    ? 'bg-emerald-600 text-white border-emerald-600' 
                    : 'bg-white text-gray-600 border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4">
        {activeTab === 'mandi' ? (
          <div className="space-y-3">
             <div className="flex justify-between items-center mb-2">
               <h3 className="font-bold text-gray-800">Live APMC Rates</h3>
               <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Updated: Today 10 AM</span>
             </div>
             {MOCK_MANDI_RATES.map(rate => (
               <div key={rate.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex justify-between items-center">
                 <div>
                   <h4 className="font-bold text-gray-800">{rate.commodity}</h4>
                   <p className="text-xs text-gray-500 flex items-center gap-1">
                     <MapPin size={10} /> {rate.market}
                   </p>
                 </div>
                 <div className="text-right">
                   <div className="font-bold text-emerald-700 text-lg">₹{rate.modalPrice}</div>
                   <div className="flex items-center justify-end gap-1 text-xs">
                      {rate.trend === 'up' && <TrendingUp size={12} className="text-green-500" />}
                      {rate.trend === 'down' && <TrendingDown size={12} className="text-red-500" />}
                      {rate.trend === 'stable' && <Minus size={12} className="text-gray-400" />}
                      <span className={`${rate.trend === 'up' ? 'text-green-500' : rate.trend === 'down' ? 'text-red-500' : 'text-gray-400'}`}>
                        {rate.trend === 'up' ? 'Rising' : rate.trend === 'down' ? 'Falling' : 'Stable'}
                      </span>
                   </div>
                 </div>
               </div>
             ))}
             <button className="w-full py-3 mt-4 border border-emerald-600 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-colors">
               View All Commodities
             </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div className="relative h-32 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-bold text-gray-700 flex items-center gap-1">
                    ⭐ {product.rating || 'New'}
                  </div>
                  {product.isRentable && (
                    <div className="absolute bottom-0 left-0 right-0 bg-blue-600/90 text-white text-[10px] font-bold text-center py-1 uppercase tracking-wide">
                      Available for Rent
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">{product.name}</h3>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                    <MapPin size={12} />
                    <span>{product.location}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-emerald-700 font-bold">₹{product.price}{product.isRentable ? '/hr' : ''}</span>
                    <button 
                      className={`${product.isRentable ? 'bg-blue-600 active:bg-blue-700' : 'bg-emerald-600 active:bg-emerald-700'} text-white px-3 py-1.5 rounded-lg text-xs font-medium`}
                    >
                      {activeTab === 'buy' ? (product.isRentable ? 'Rent' : 'Buy') : 'Sell'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && activeTab !== 'mandi' && (
           <div className="flex flex-col items-center justify-center py-20 text-gray-400">
             <Tag size={48} className="mb-2 opacity-50" />
             <p>No items found.</p>
           </div>
        )}
      </div>
    </div>
  );
};