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
  Command
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
    <header className="sticky top-0 z-20 w-full px-5 sm:px-8 py-3.5 flex items-center justify-between gap-6 bg-[#0B0F19] border-b border-white/[0.03] shadow-[0_6px_16px_#05070E]">
      {/* Left: Mobile menu toggle + Active Section Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl neu-button text-slate-300 hover:text-white"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-semibold text-white tracking-tight">
              {currentTabItem?.label || 'Dashboard'}
            </h1>
            <span className="hidden sm:inline-flex text-[9px] font-mono font-medium tracking-wide uppercase px-2 py-0.5 rounded-md bg-[#080C16] text-indigo-300 shadow-[inset_1px_1px_3px_#04060B] border border-indigo-500/20">
              Aurelia
            </span>
          </div>
          <p className="text-[11px] text-slate-400 hidden md:block">
            Your campus. Your people. Everything in one place.
          </p>
        </div>
      </div>

      {/* Middle: Universal Neumorphic Inset Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onGlobalSearch(e.target.value)}
            placeholder="Search campus resources, clubs, books..."
            className="w-full pl-9 pr-14 py-2 text-xs rounded-xl neu-inset placeholder-slate-500 focus:outline-none transition-all"
          />
          {searchQuery ? (
            <button
              onClick={() => onGlobalSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#0A0E1A] shadow-[inset_1px_1px_2px_#04060B] text-[10px] text-slate-400 font-mono pointer-events-none">
              <span>⌘K</span>
            </div>
          )}
        </div>
      </div>

      {/* Right: Tactile Neumorphic Actions */}
      <div className="flex items-center gap-2.5">
        {/* Admin Switcher */}
        <button
          onClick={() => onSelectTab('admin')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === 'admin'
              ? 'neu-pressed font-semibold text-purple-300'
              : 'neu-button text-slate-300 hover:text-white'
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
            className="relative p-2 rounded-xl neu-button text-slate-300 hover:text-white"
            aria-label="View announcements"
          >
            <Bell className="w-4 h-4 text-slate-300" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38BDF8]"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 neu-card p-4 z-50 bg-[#0C1222] shadow-[10px_10px_25px_#04060C,-6px_-6px_16px_rgba(255,255,255,0.04)] border border-white/[0.04] animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Campus Bulletins</h4>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">{announcements.length} updates</span>
              </div>

              <div className="divide-y divide-white/[0.03] max-h-80 overflow-y-auto mt-2 space-y-2">
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

              <div className="pt-3 border-t border-white/[0.04] text-center">
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
          className="p-2 rounded-xl neu-button text-slate-300 hover:text-white"
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
