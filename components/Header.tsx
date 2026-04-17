import React from 'react';
import { User, Menu, ShoppingCart, X, Trash2, PackageOpen, ArrowRight } from 'lucide-react';
import { CartItem } from '../App';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
  cartItems: CartItem[];
  onCartOpen: () => void;
  isCartOpen: boolean;
  onCartClose: () => void;
  onRemoveFromCart: (id: string) => void;
  onClearCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onMenuClick,
  cartItems,
  onCartOpen,
  isCartOpen,
  onCartClose,
  onRemoveFromCart,
  onClearCart,
}) => {
  const cartCount = cartItems.length;

  const subtotal = cartItems.reduce((sum, item) => {
    const price = typeof item.price === 'number' ? item.price : 0;
    return sum + price;
  }, 0);

  return (
    <>
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
                  <div className="absolute top-0 right-0 w-6 h-6 bg-amber-400/20 rounded-full -mr-2 -mt-2"></div>
                  <span className="text-2xl" style={{ animation: 'float 4s ease-in-out infinite' }}>🌾</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-black tracking-tighter text-slate-900 leading-none mb-1">
                  AgriSathi <span style={{ color: '#fbbf24' }} className="italic">Pro</span>
                </h1>
                <p className="text-[9px] font-black text-agri-600 uppercase tracking-[0.2em]">Next-Gen Assistant</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={onCartOpen}
              className="p-3.5 hover:bg-slate-50 rounded-2xl relative text-slate-400 transition-all hover:text-agri-600 active:scale-90"
              aria-label={`Open cart (${cartCount} items)`}
            >
              <ShoppingCart size={22} strokeWidth={2.5} />
              {cartCount > 0 && (
                <span className="absolute top-2 right-2 w-5 h-5 bg-rose-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Button */}
            <button className="flex items-center gap-3 pl-1 pr-4 py-1.5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all group">
              <div className="w-10 h-10 rounded-xl bg-agri-950 flex items-center justify-center text-amber-400 shadow-lg group-hover:rotate-6 transition-transform">
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

      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end" role="dialog" aria-modal="true" aria-label="Shopping cart">
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(5, 46, 22, 0.40)', backdropFilter: 'blur(4px)' }}
            onClick={onCartClose}
          />

          {/* Drawer Panel */}
          <div
            className="relative w-full max-w-md h-full bg-white flex flex-col shadow-2xl"
            style={{ animation: 'slideInRight 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards' }}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Your Cart</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                  {cartCount === 0 ? 'No items yet' : `${cartCount} item${cartCount > 1 ? 's' : ''}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {cartCount > 0 && (
                  <button
                    onClick={onClearCart}
                    className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                    title="Clear all"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
                <button
                  onClick={onCartClose}
                  className="p-2.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
              {cartCount === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-6 text-center py-20">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                    <PackageOpen size={40} className="text-slate-300" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-700 tracking-tight">Cart is empty</p>
                    <p className="text-sm font-medium text-slate-400 mt-2">Add products from the Marketplace</p>
                  </div>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-5 p-5 bg-slate-50 rounded-3xl border border-slate-100 group"
                  >
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm flex-shrink-0 border border-slate-100">
                      {item.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-slate-800 text-sm leading-tight truncate">{item.name}</p>
                      <p className="text-[10px] font-bold text-agri-600 uppercase tracking-widest mt-1 bg-agri-50 px-2 py-0.5 rounded-lg inline-block">
                        {item.type}
                      </p>
                      <p className="text-lg font-black text-slate-900 mt-1">
                        {typeof item.price === 'number' ? `₹${item.price.toLocaleString('en-IN')}` : item.price}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100 flex-shrink-0"
                      title="Remove item"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cartCount > 0 && (
              <div className="px-8 py-6 border-t border-slate-100 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Subtotal</span>
                  <span className="text-2xl font-black text-slate-900">
                    {subtotal > 0
                      ? `₹${subtotal.toLocaleString('en-IN')}`
                      : 'Includes rental items'}
                  </span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Taxes & delivery calculated at checkout
                </p>
                <button className="w-full flex items-center justify-center gap-3 bg-agri-950 hover:bg-agri-800 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-agri-900/20">
                  Proceed to Checkout <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </>
  );
};