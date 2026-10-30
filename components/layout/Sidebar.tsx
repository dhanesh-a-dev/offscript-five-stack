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
    title: 'Core Hub',
    items: [
      { id: 'dashboard' as NavTab, label: 'Dashboard', icon: LayoutDashboard },
      { id: 'map' as NavTab, label: 'Campus Map', icon: Compass, badge: 'Vector' },
      { id: 'transport' as NavTab, label: 'Shuttle Transit', icon: Bus },
    ]
  },
  {
    title: 'Campus Life',
    items: [
      { id: 'clubs' as NavTab, label: 'Clubs & Events', icon: Sparkles },
      { id: 'lostfound' as NavTab, label: 'Lost & Found', icon: PackageSearch },
      { id: 'marketplace' as NavTab, label: 'Marketplace', icon: ShoppingBag },
      { id: 'memory' as NavTab, label: 'Memory Vault', icon: BookMarked },
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
    title: 'Platform',
    items: [
      { id: 'suggestions' as NavTab, label: 'Ideas & Feedback', icon: MessageSquarePlus },
      { id: 'admin' as NavTab, label: 'Admin Panel', icon: Sliders },
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
    <aside className="w-64 hidden lg:flex flex-col h-screen fixed left-0 top-0 z-30 select-none bg-[#0B0F1A] border-r border-white/[0.03] shadow-[8px_0_20px_#05070E]">
      {/* Brand Header with Extruded Tactile Emblem */}
      <div className="px-5 py-5 border-b border-white/[0.04] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-cyan-400 p-[1.5px] shadow-[4px_4px_10px_#05070E,-2px_-2px_6px_rgba(255,255,255,0.06)] flex items-center justify-center">
            <div className="w-full h-full bg-[#0E1424] rounded-[13px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[15px] tracking-tight text-white">
                Perseus
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-[#080C16] text-indigo-300 shadow-[inset_1px_1px_3px_#04060B] border border-indigo-400/20 font-mono">
                HERO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-tight">Aurelia University</p>
          </div>
        </div>
      </div>

      {/* Navigation Groups with Tactile Extruded & Inset states */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-4">
        {NAV_GROUPS.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            <div className="px-3 pb-1 text-[9px] font-bold tracking-[0.14em] text-slate-500 uppercase">
              {group.title}
            </div>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'neu-pressed font-semibold text-cyan-300'
                      : 'text-slate-300/85 hover:text-white hover:bg-white/[0.02] hover:shadow-[3px_3px_8px_#05070E,-2px_-2px_6px_rgba(255,255,255,0.02)]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-cyan-300' : 'text-slate-400 group-hover:text-indigo-300'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-semibold uppercase ${
                        isActive 
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                          : 'bg-[#080C16] text-slate-400 shadow-[inset_1px_1px_3px_#04060B]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-cyan-300/80" />}
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Offline Status & User Profile Footer */}
      <div className="p-3.5 border-t border-white/[0.04] space-y-2.5 bg-[#090D18]/60">
        <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#080C16] shadow-[inset_2px_2px_5px_#04060B,inset_-1px_-1px_4px_rgba(255,255,255,0.02)] text-emerald-300 text-[11px] border border-white/[0.02]">
          <span className="flex items-center gap-1.5 font-medium">
            <Wifi className="w-3 h-3 text-emerald-400" />
            {offlineReady ? 'Offline Campus: Ready' : 'Connected'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10B981]"></span>
        </div>

        {/* Student Mini Profile Button with Raised Tactile Bevel */}
        <div 
          onClick={() => onSelectTab('settings')}
          className="flex items-center gap-2.5 p-2.5 rounded-2xl neu-button cursor-pointer group"
          title="Click to view student settings"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-[11px] text-white shadow-[2px_2px_5px_#04060B] shrink-0">
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
            <span className="text-[10px] font-mono text-cyan-400 bg-[#080C16] shadow-[inset_1px_1px_3px_#04060B] border border-cyan-800/30 px-1.5 py-0.5 rounded-md">
              {profile.campusCredits} pts
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
