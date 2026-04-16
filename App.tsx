import React, { useState } from 'react';
import { 
  Home, 
  ShoppingCart, 
  Sprout, 
  Users, 
  Menu,
  ScanLine
} from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { Marketplace } from './components/Marketplace';
import { DiseaseDetector } from './components/DiseaseDetector';
import { ExpertChat } from './components/ExpertChat';
import { FarmManagement } from './components/FarmManagement';
import { Schemes } from './components/Schemes';
import { Header } from './components/Header';

// Define View Types
export enum View {
  DASHBOARD = 'DASHBOARD',
  MARKETPLACE = 'MARKETPLACE',
  DISEASE_DETECTION = 'DISEASE_DETECTION',
  EXPERT_CHAT = 'EXPERT_CHAT',
  FARM_MANAGEMENT = 'FARM_MANAGEMENT',
  SCHEMES = 'SCHEMES'
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard onViewChange={setCurrentView} />;
      case View.MARKETPLACE:
        return <Marketplace />;
      case View.DISEASE_DETECTION:
        return <DiseaseDetector />;
      case View.EXPERT_CHAT:
        return <ExpertChat />;
      case View.FARM_MANAGEMENT:
        return <FarmManagement />;
      case View.SCHEMES:
        return <Schemes onBack={() => setCurrentView(View.DASHBOARD)} />;
      default:
        return <Dashboard onViewChange={setCurrentView} />;
    }
  };

  const NavItem = ({ view, icon: Icon, label }: { view: View; icon: React.ElementType; label: string }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setIsMobileMenuOpen(false);
      }}
      className={`relative flex flex-col items-center justify-center py-1 px-3 transition-all duration-300 ${
        currentView === view 
          ? 'text-agri-600 scale-110' 
          : 'text-slate-400 hover:text-agri-500'
      }`}
    >
      <Icon size={22} className={`${currentView === view ? 'drop-shadow-[0_0_8px_rgba(22,163,74,0.3)]' : ''}`} />
      <span className="text-[10px] font-bold mt-1 tracking-tight">{label}</span>
      {currentView === view && (
        <span className="absolute -bottom-1 w-1 h-1 bg-agri-600 rounded-full animate-pulse"></span>
      )}
    </button>
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden selection:bg-agri-100 selection:text-agri-900">
      {/* Header */}
      <Header 
        title="AgriSathi" 
        onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
      />

      {/* Main Content Area - Scrollable */}
      <main className="flex-1 overflow-y-auto no-scrollbar pt-safe pb-32">
        <div className="max-w-4xl mx-auto w-full page-transition px-4">
           {renderView()}
        </div>
      </main>

      {/* Bottom Navigation Bar (Floating & Glassmorphism) */}
      <div className="fixed bottom-6 left-0 right-0 px-6 z-50 pointer-events-none">
        <nav className="max-w-lg mx-auto glass rounded-full shadow-2xl border border-white/50 px-6 py-2 pointer-events-auto flex justify-around items-center">
          <div className="flex gap-4">
            <NavItem view={View.DASHBOARD} icon={Home} label="Home" />
            <NavItem view={View.MARKETPLACE} icon={ShoppingCart} label="Market" />
          </div>
          
          {/* Central Action Button with Glow */}
          <div className="relative -top-3">
            <div className="absolute inset-0 bg-agri-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
            <button
              onClick={() => setCurrentView(View.DISEASE_DETECTION)}
              className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-agri-600 to-agri-400 rounded-full shadow-[0_8px_20px_rgba(21,128,61,0.4)] text-white border-4 border-white active:scale-90 transition-transform hover:rotate-12"
            >
              <ScanLine size={28} strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex gap-4">
            <NavItem view={View.EXPERT_CHAT} icon={Users} label="Experts" />
            <NavItem view={View.FARM_MANAGEMENT} icon={Sprout} label="Farm" />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default App;