import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Sliders, 
  Menu, 
  X, 
  Sparkles, 
  CheckCircle2, 
  Info,
  ExternalLink
} from 'lucide-react';
import { NavTab, NAV_ITEMS } from './Sidebar';
import { CampusAnnouncement } from '@/types';
import { VerifiedBadge } from './VerifiedBadge';

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  announcements: CampusAnnouncement[];
  onOpenMobileMenu: () => void;
  onGlobalSearch: (query: string) => void;
  searchQuery: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  theme,
  onToggleTheme,
  announcements,
  onOpenMobileMenu,
  onGlobalSearch,
  searchQuery,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const currentTabItem = NAV_ITEMS.find(item => item.id === activeTab);

  return (
    <header className="sticky top-0 z-20 w-full glass-panel border-b border-white/[0.06] px-5 sm:px-8 py-3.5 flex items-center justify-between gap-6 bg-[#070B18]/85 backdrop-blur-2xl">
      {/* Left: Mobile menu toggle + Active Section Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-slate-300 hover:text-white"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {currentTabItem?.label || 'Dashboard'}
            </h1>
            <span className="hidden sm:inline-flex text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">
              Aurelia Hub
            </span>
          </div>
          <p className="text-[11px] text-slate-400 hidden md:block">
            Your campus. Your people. Everything in one place.
          </p>
        </div>
      </div>

      {/* Middle: Universal Clean Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onGlobalSearch(e.target.value)}
            placeholder="Search map, clubs, lost items, textbooks..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-2xl bg-white/[0.035] border border-white/[0.07] text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:bg-white/[0.06] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onGlobalSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Admin Switcher */}
        <button
          onClick={() => onSelectTab('admin')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
            activeTab === 'admin'
              ? 'bg-purple-600/30 border-purple-500/40 text-purple-200 shadow-glow'
              : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.06] text-slate-300 hover:text-white'
          }`}
          title="Demo Content Management Panel"
        >
          <Sliders className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden sm:inline">Admin Mode</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-slate-300 hover:text-white transition-colors"
            aria-label="View announcements"
          >
            <Bell className="w-4 h-4 text-slate-300" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 ring-2 ring-[#080D1C]"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 glass-panel rounded-2xl shadow-2xl border border-white/[0.1] p-4 z-50 bg-[#0A0F22]/95 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-sm font-bold text-white">Campus Bulletins</h4>
                </div>
                <span className="text-[10px] text-slate-400">{announcements.length} updates</span>
              </div>

              <div className="divide-y divide-white/[0.04] max-h-80 overflow-y-auto mt-2 space-y-2">
                {announcements.map((ann) => (
                  <div key={ann.id} className="pt-2 pb-2 text-left">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] text-slate-400 font-mono">{ann.date}</span>
                      <VerifiedBadge source={ann.source} size="sm" />
                    </div>
                    <h5 className="text-xs font-semibold text-white leading-snug">{ann.title}</h5>
                    <p className="text-[11px] text-slate-300/80 mt-1 line-clamp-2 leading-relaxed">{ann.summary}</p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/[0.06] text-center">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    onSelectTab('dashboard');
                  }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  View full announcement feed →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-slate-300 hover:text-white transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-300" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-400" />
          )}
        </button>
      </div>
    </header>
  );
};
