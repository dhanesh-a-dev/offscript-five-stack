import React from 'react';
import { 
  LayoutDashboard, 
  Compass, 
  Bus, 
  Sparkles, 
  GraduationCap, 
  HeartHandshake, 
  HeartPulse, 
  PackageSearch, 
  ShoppingBag, 
  BookMarked, 
  MessageSquarePlus, 
  Sliders, 
  Settings,
  Shield,
  Wifi,
  ChevronRight
} from 'lucide-react';
import { StudentProfile } from '@/types';

export type NavTab = 
  | 'dashboard'
  | 'map'
  | 'transport'
  | 'clubs'
  | 'academics'
  | 'seniors'
  | 'wellbeing'
  | 'lostfound'
  | 'marketplace'
  | 'memory'
  | 'suggestions'
  | 'admin'
  | 'settings';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  profile: StudentProfile;
  offlineReady: boolean;
}

export const NAV_ITEMS = [
  { id: 'dashboard' as NavTab, label: 'Dashboard', icon: LayoutDashboard, badge: '' },
  { id: 'map' as NavTab, label: 'Campus Explorer', icon: Compass, badge: 'Interactive' },
  { id: 'transport' as NavTab, label: 'Transportation', icon: Bus, badge: '' },
  { id: 'clubs' as NavTab, label: 'Clubs & Events', icon: Sparkles, badge: 'Promos' },
  { id: 'academics' as NavTab, label: 'Academic Kit', icon: GraduationCap, badge: '' },
  { id: 'seniors' as NavTab, label: 'Senior Connect', icon: HeartHandshake, badge: '' },
  { id: 'wellbeing' as NavTab, label: 'Student Wellbeing', icon: HeartPulse, badge: '24/7' },
  { id: 'lostfound' as NavTab, label: 'Lost & Found', icon: PackageSearch, badge: '' },
  { id: 'marketplace' as NavTab, label: 'Marketplace', icon: ShoppingBag, badge: 'Books' },
  { id: 'memory' as NavTab, label: 'Campus Memory', icon: BookMarked, badge: '' },
  { id: 'suggestions' as NavTab, label: 'Feedback & Ideas', icon: MessageSquarePlus, badge: '' },
  { id: 'admin' as NavTab, label: 'Demo Admin', icon: Sliders, badge: 'Control' },
  { id: 'settings' as NavTab, label: 'Settings', icon: Settings, badge: '' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  profile,
  offlineReady
}) => {
  return (
    <aside className="w-64 hidden lg:flex flex-col h-screen fixed left-0 top-0 z-30 glass-panel border-r border-white/10 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 p-0.5 shadow-glow flex items-center justify-center">
            <div className="w-full h-full bg-[#090E1F] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-wider text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-cyan-200">
                PERSEUS
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                HERO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-tight">Aurelia University Hub</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
          Campus Navigation
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600/90 to-purple-600/80 text-white shadow-glow border border-indigo-400/40 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 hover:border hover:border-white/5'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-cyan-300' : 'text-slate-400 group-hover:text-indigo-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-white/5 text-slate-400 border border-white/5'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-cyan-300" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Offline Status & User Profile Footer */}
      <div className="p-3 border-t border-white/10 space-y-2 bg-black/20">
        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px]">
          <span className="flex items-center gap-1.5 font-medium">
            <Wifi className="w-3 h-3 text-emerald-400" />
            {offlineReady ? 'Offline Campus Cache: Active' : 'Online Mode'}
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        </div>

        {/* Student Mini Profile */}
        <div 
          onClick={() => onSelectTab('settings')}
          className="flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer group"
          title="Click to view student settings"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white shadow-sm shrink-0">
            {profile.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate group-hover:text-cyan-300 transition-colors">
              {profile.name}
            </p>
            <p className="text-[10px] text-slate-400 truncate">
              {profile.department.split('&')[0]}
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-1.5 py-0.5 rounded">
              {profile.campusCredits} pts
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
