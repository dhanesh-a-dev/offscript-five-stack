import React from 'react';
import { NavTab, NAV_ITEMS } from './Sidebar';
import { 
  LayoutDashboard, 
  Compass, 
  Bus, 
  Sparkles, 
  MoreHorizontal, 
  X, 
  Sparkle,
  Wifi
} from 'lucide-react';
import { StudentProfile } from '@/types';

interface MobileNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isOpenDrawer: boolean;
  onCloseDrawer: () => void;
  profile: StudentProfile;
  offlineReady: boolean;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  onSelectTab,
  isOpenDrawer,
  onCloseDrawer,
  profile,
  offlineReady,
}) => {
  // Main bottom bar items
  const mainBottomTabs: { id: NavTab; label: string; icon: any }[] = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'map', label: 'Explorer', icon: Compass },
    { id: 'transport', label: 'Transit', icon: Bus },
    { id: 'clubs', label: 'Clubs', icon: Sparkles },
  ];

  return (
    <>
      {/* Mobile Drawer (Slide-in) */}
      {isOpenDrawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onCloseDrawer}
          />
          <div className="fixed inset-y-0 left-0 w-72 glass-panel border-r border-white/10 p-5 flex flex-col z-10 bg-[#090E1F] text-white">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 p-0.5 flex items-center justify-center">
                  <div className="w-full h-full bg-[#090E1F] rounded-md flex items-center justify-center">
                    <Sparkle className="w-4 h-4 text-cyan-300" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide">PERSEUS</h3>
                  <p className="text-[10px] text-slate-400">Aurelia University Hub</p>
                </div>
              </div>
              <button
                onClick={onCloseDrawer}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      onCloseDrawer();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white font-semibold shadow-glow'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-300' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/10 text-slate-300">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2">
              <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 px-2">
                <Wifi className="w-3 h-3" />
                <span>{offlineReady ? 'Offline cache ready' : 'Online connected'}</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/10">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-xs">
                  {profile.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{profile.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{profile.idNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation Bar for Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-white/10 px-2 py-2 flex items-center justify-around bg-[#080D1C]/95 backdrop-blur-xl">
        {mainBottomTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                isActive ? 'text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400 scale-110' : ''}`} />
              <span className="text-[10px]">{tab.label}</span>
            </button>
          );
        })}
        {/* More Menu Tab */}
        <button
          onClick={() => onCloseDrawer()}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            isOpenDrawer ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-[10px]">More</span>
        </button>
      </nav>
    </>
  );
};

