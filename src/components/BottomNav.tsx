import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Home,
  Activity,
  Cpu,
  MapPin,
  Truck,
  UserCheck,
  ShieldAlert,
  Menu
} from 'lucide-react';

interface BottomNavProps {
  onOpenMore: () => void;
  isMoreOpen: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({ onOpenMore, isMoreOpen }) => {
  const location = useLocation();
  const { user } = useAuth();

  // Role-aware bottom tabs
  const getTabsByRole = () => {
    if (user?.role === 'supplier') {
      return [
        { path: '/supplier', label: 'Dashboard', icon: <Truck className="w-5 h-5" /> },
      ];
    }
    if (user?.role === 'customer') {
      return [
        { path: '/client', label: 'Tracking', icon: <UserCheck className="w-5 h-5" /> },
      ];
    }
    // Admin tabs
    return [
      { path: '/admin', label: 'Admin', icon: <ShieldAlert className="w-5 h-5" /> },
      { path: '/operations', label: 'Operations', icon: <Activity className="w-5 h-5" /> },
      { path: '/agents', label: 'Agents', icon: <Cpu className="w-5 h-5" /> },
      { path: '/routes', label: 'Routes', icon: <MapPin className="w-5 h-5" /> },
    ];
  };

  const primaryTabs = getTabsByRole();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080B11]/95 backdrop-blur-lg border-t border-white/10 px-2 py-1.5 pb-safe shadow-2xl">
      <div className="grid grid-cols-5 items-center max-w-md mx-auto">
        
        {primaryTabs.map((tab) => {
          const isActive = location.pathname === tab.path && !isMoreOpen;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all min-h-[44px] active:scale-95 ${
                isActive
                  ? 'text-cyan-400 font-bold bg-cyan-950/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.icon}
              <span className="text-[10px] font-mono tracking-tight mt-0.5">{tab.label}</span>
            </NavLink>
          );
        })}

        {/* More Tab Trigger */}
        <button
          onClick={onOpenMore}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all min-h-[44px] active:scale-95 ${
            isMoreOpen
              ? 'text-cyan-400 font-bold bg-cyan-950/50'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] font-mono tracking-tight mt-0.5">More</span>
        </button>

      </div>
    </div>
  );
};
