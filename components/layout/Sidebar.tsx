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

export const NAV_GROUPS = [
  {
    title: 'Overview',
    items: [
      { id: 'dashboard' as NavTab, label: 'Dashboard', icon: LayoutDashboard },
      { id: 'map' as NavTab, label: 'Campus Map', icon: Compass, badge: 'SVG' },
      { id: 'transport' as NavTab, label: 'Shuttle Transit', icon: Bus },
    ]
  },
  {
    title: 'Campus Life',
    items: [
      { id: 'clubs' as NavTab, label: 'Clubs & Events', icon: Sparkles },
      { id: 'lostfound' as NavTab, label: 'Lost & Found', icon: PackageSearch },
      { id: 'marketplace' as NavTab, label: 'Marketplace', icon: ShoppingBag },
      { id: 'memory' as NavTab, label: 'Campus Memory', icon: BookMarked },
    ]
  },
  {
    title: 'Academics & Care',
    items: [
      { id: 'academics' as NavTab, label: 'Academic Kit', icon: GraduationCap },
      { id: 'seniors' as NavTab, label: 'Senior Connect', icon: HeartHandshake },
      { id: 'wellbeing' as NavTab, label: 'Wellbeing Sanctuary', icon: HeartPulse, badge: '24/7' },
    ]
  },
  {
    title: 'Management',
    items: [
      { id: 'suggestions' as NavTab, label: 'Ideas & Feedback', icon: MessageSquarePlus },
      { id: 'admin' as NavTab, label: 'Demo Admin Panel', icon: Sliders },
      { id: 'settings' as NavTab, label: 'Settings', icon: Settings },
    ]
  }
];

export const NAV_ITEMS = NAV_GROUPS.flatMap(g => g.items);

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  profile,
  offlineReady
}) => {
  return (
    <aside className="w-64 hidden lg:flex flex-col h-screen fixed left-0 top-0 z-30 glass-panel border-r border-white/[0.08] select-none bg-[#070B18]/90 backdrop-blur-2xl">
      {/* Brand Header */}
      <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 p-[1.5px] shadow-glow flex items-center justify-center">
            <div className="w-full h-full bg-[#080D1C] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-wider text-white">
                PERSEUS
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-400/20">
                HERO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-normal">Aurelia University Hub</p>
          </div>
        </div>
      </div>

      {/* Navigation Groups with Generous Spacing */}
      <div className="flex-1 overflow-y-auto px-3.5 py-5 space-y-5">
        {NAV_GROUPS.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            <div className="px-3 pb-1 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
              {group.title}
            </div>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600/90 to-purple-600/80 text-white shadow-glow border border-indigo-400/30 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-cyan-300' : 'text-slate-400 group-hover:text-indigo-300'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : 'bg-white/[0.05] text-slate-400 border border-white/[0.06]'
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
        ))}
      </div>

      {/* Offline Status & User Profile Footer */}
      <div className="p-3.5 border-t border-white/[0.06] space-y-2 bg-black/30">
        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px]">
          <span className="flex items-center gap-1.5 font-medium">
            <Wifi className="w-3 h-3 text-emerald-400" />
            {offlineReady ? 'Offline Campus: Ready' : 'Connected'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        </div>

        {/* Student Mini Profile */}
        <div 
          onClick={() => onSelectTab('settings')}
          className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] transition-colors cursor-pointer group"
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
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-800/30 px-1.5 py-0.5 rounded">
              {profile.campusCredits} pts
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
