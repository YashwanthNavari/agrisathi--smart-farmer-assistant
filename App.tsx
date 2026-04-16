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
      className={`flex flex-col items-center justify-center w-full p-2 transition-colors ${
        currentView === view ? 'text-emerald-600' : 'text-gray-500 hover:text-emerald-500'
      }`}
    >
      <Icon size={24} className="mb-1" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <Header 
        title="AgriSathi" 
        onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
      />

      {/* Main Content Area - Scrollable */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        <div className="max-w-4xl mx-auto w-full">
           {renderView()}
        </div>
      </main>

      {/* Bottom Navigation Bar (Mobile First) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 pb-safe">
        <div className="max-w-4xl mx-auto flex justify-around items-center h-16">
          <NavItem view={View.DASHBOARD} icon={Home} label="Home" />
          <NavItem view={View.MARKETPLACE} icon={ShoppingCart} label="Market" />
          
          {/* Central Action Button */}
          <div className="relative -top-5">
            <button
              onClick={() => setCurrentView(View.DISEASE_DETECTION)}
              className="flex items-center justify-center w-14 h-14 bg-emerald-600 rounded-full shadow-lg text-white border-4 border-gray-50 hover:bg-emerald-700 transition-transform active:scale-95"
            >
              <ScanLine size={28} />
            </button>
          </div>

          <NavItem view={View.EXPERT_CHAT} icon={Users} label="Community" />
          <NavItem view={View.FARM_MANAGEMENT} icon={Sprout} label="My Farm" />
        </div>
      </nav>
    </div>
  );
};

export default App;