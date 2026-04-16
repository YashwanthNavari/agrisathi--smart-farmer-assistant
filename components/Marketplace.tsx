import React, { useState } from 'react';
import { ShoppingCart, Search, Filter, Star, Truck, ShieldCheck, Tag, MapPin, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const PRODUCTS = [
  { id: '1', name: 'Eco-Friendly Urea (50kg)', price: 450, rating: 4.8, type: 'Fertilizer', category: 'Supplies', image: '🌱', discount: '10% OFF', seller: 'AgriCorp', location: 'Nagpur' },
  { id: '2', name: 'Premium Wheat Seeds', price: 1200, rating: 4.9, type: 'Seeds', category: 'Supplies', image: '🌾', discount: null, seller: 'Kisan Kendra', location: 'Amravati' },
  { id: '3', name: 'John Deere 5050D', price: '₹2,500/day', rating: 4.7, type: 'Tractor', category: 'Rental', image: '🚜', discount: 'HOT', seller: 'Ramesh Patil', location: 'Local' },
  { id: '4', name: 'Organic Pest Control', price: 850, rating: 4.5, type: 'Chemicals', category: 'Supplies', image: '🚿', discount: null, seller: 'GreenTech', location: 'Nashik' },
  { id: '5', name: 'Solar Water Pump', price: 45000, rating: 4.9, type: 'Equipment', category: 'Supplies', image: '☀️', discount: 'SUBSIDY', seller: 'Self', location: 'Farm' },
  { id: '6', name: 'Harvester Rent', price: '₹4,000/day', rating: 4.6, type: 'Machinery', category: 'Rental', image: '⚙️', discount: null, seller: 'AgriDrone', location: 'Pune' },
];

const MANDI_RATES = [
  { id: '1', commodity: 'Wheat (Sharbati)', market: 'Nagpur APMC', price: 2300, trend: 'up', updated: 'Today' },
  { id: '2', commodity: 'Soyabean', market: 'Amravati Mandi', price: 4450, trend: 'down', updated: 'Today' },
  { id: '3', commodity: 'Cotton', market: 'Akola Mandi', price: 7000, trend: 'stable', updated: 'Yesterday' },
];

interface MarketplaceProps {
  onAddToCart: () => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ onAddToCart }) => {
  const [activeTab, setActiveTab] = useState<'buy' | 'mandi'>('buy');
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [mandiRates, setMandiRates] = useState(MANDI_RATES);

  // Simulate Live Mandi Updates
  useEffect(() => {
    if (activeTab === 'mandi') {
      const interval = setInterval(() => {
        setMandiRates(prev => prev.map(r => ({
          ...r,
          price: r.price + Math.floor(Math.random() * 20 - 10)
        })));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const categories = ['All', 'Supplies', 'Rental', 'Equipment'];

  const filteredProducts = PRODUCTS.filter(p => 
    (filter === 'All' || p.category === filter) &&
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-32">
      {/* Premium Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Marketplace</h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Direct access to quality supplies and live mandi rates.</p>
        </div>
        
        <div className="flex bg-slate-200/50 p-1.5 rounded-2xl border border-slate-200">
          <button 
            onClick={() => setActiveTab('buy')}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'buy' ? 'bg-white text-agri-700 shadow-md' : 'text-slate-500 hover:text-agri-600'}`}
          >
            Market
          </button>
          <button 
            onClick={() => setActiveTab('mandi')}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'mandi' ? 'bg-white text-agri-700 shadow-md' : 'text-slate-500 hover:text-agri-600'}`}
          >
            Mandi Rates
          </button>
        </div>
      </div>

      {activeTab === 'buy' ? (
        <>
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-agri-500 transition-colors" size={20} />
              <input 
                type="text"
                placeholder="Search seeds, tractors, or fertilizers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-3xl text-sm font-semibold focus:ring-4 focus:ring-agri-500/10 focus:border-agri-500 shadow-sm outline-none transition-all"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-4 rounded-3xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                    filter === cat 
                      ? 'bg-agri-600 text-white shadow-xl shadow-agri-600/30' 
                      : 'bg-white text-slate-500 border border-slate-200 hover:border-agri-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-1">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="group bg-white rounded-[40px] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 flex flex-col"
              >
                <div className="relative aspect-square sm:aspect-[1.2/1] bg-slate-50 flex items-center justify-center text-7xl group-hover:scale-105 transition-transform duration-700">
                  <div className="relative z-10">{product.image}</div>
                  {product.discount && (
                    <div className="absolute top-6 left-6 bg-agri-600 text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest flex items-center gap-1.5 shadow-xl shadow-agri-600/20 z-20">
                      <Tag size={12} /> {product.discount}
                    </div>
                  )}
                  <button className="absolute top-6 right-6 w-12 h-12 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-slate-400 hover:text-agri-600 hover:bg-white transition-all border border-white/20 z-20">
                    <Star size={24} fill={product.rating > 4.8 ? 'currentColor' : 'none'} className={product.rating > 4.8 ? 'text-amber-400' : ''} />
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-tr from-agri-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] uppercase font-black tracking-widest text-agri-700 bg-agri-100 px-3 py-1 rounded-lg">
                      {product.type}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-400 font-bold text-xs bg-slate-100 px-2 py-1 rounded-lg">
                      <MapPin size={12} />
                      <span>{product.location}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-black text-slate-800 leading-tight mb-4 group-hover:text-agri-700 transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex flex-wrap gap-4 mb-8 text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                    <div className="flex items-center gap-1.5"><Truck size={14} className="text-agri-500" /> Fast Delivery</div>
                    <div className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-agri-500" /> Guaranteed</div>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-6 pt-6 border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pricing</span>
                      <span className="text-2xl font-black text-slate-900">{typeof product.price === 'number' ? `₹${product.price}` : product.price}</span>
                    </div>
                    <button 
                      onClick={onAddToCart}
                      className="flex-1 flex items-center justify-center gap-3 bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-agri-600 transition-all active:scale-90 group/btn shadow-xl shadow-slate-200"
                    >
                      Order <ShoppingCart size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-6 animate-fade-in-up">
          <div className="flex justify-between items-center mb-4 px-2">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Live APMC Rates</h3>
            <div className="flex items-center gap-2 text-[10px] font-black text-agri-600 bg-agri-50 px-3 py-1 rounded-full uppercase tracking-widest">
              <div className="w-1.5 h-1.5 bg-agri-600 rounded-full animate-pulse"></div>
              Live Feed
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mandiRates.map((rate) => (
              <div key={rate.id} className="bg-white p-7 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {rate.commodity.includes('Wheat') ? '🌾' : rate.commodity.includes('Soy') ? '🫘' : '⚪'}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{rate.market}</span>
                    <div className="flex items-center justify-end gap-1.5 text-xs font-black mt-1 uppercase">
                      {rate.trend === 'up' && <><TrendingUp size={14} className="text-agri-600" /> <span className="text-agri-600">Rising</span></>}
                      {rate.trend === 'down' && <><TrendingDown size={14} className="text-rose-600" /> <span className="text-rose-600">Falling</span></>}
                      {rate.trend === 'stable' && <><Minus size={14} className="text-slate-400" /> <span className="text-slate-400">Stable</span></>}
                    </div>
                  </div>
                </div>
                
                <p className="text-sm font-black text-slate-500 mb-1">{rate.commodity}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-900 leading-none">₹{rate.price}</span>
                  <span className="text-xs font-bold text-slate-400">/ Quintal</span>
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                   <div className="text-slate-400">Daily Volume: <span className="text-slate-900">120T</span></div>
                   <div className="text-agri-600">Updated {rate.updated}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 rounded-[40px] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-agri-500/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="max-w-md relative z-10">
              <h4 className="text-3xl font-black tracking-tight mb-4">Sell to Verified Buyers</h4>
              <p className="text-slate-400 font-medium mb-0">Skip the middlemen. List your harvest on AgriSathi today and get higher prices with transparent settlements.</p>
            </div>
            <button className="relative z-10 bg-agri-600 hover:bg-agri-500 text-white px-10 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-2xl shadow-agri-600/20 transition-all hover:-translate-y-1">
              Start Selling
            </button>
          </div>
        </div>
      )}
    </div>
  );
};