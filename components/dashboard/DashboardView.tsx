import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Bus, 
  Users, 
  PackageSearch, 
  ShoppingBag, 
  Calendar, 
  ArrowRight, 
  Bell, 
  PhoneCall, 
  BookOpen, 
  Clock, 
  Compass, 
  CheckCircle2, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { 
  StudentProfile, 
  CampusAnnouncement, 
  CampusEvent, 
  Club, 
  LostFoundItem, 
  MarketplaceItem, 
  BusRoute 
} from '@/types';
import { NavTab } from '../layout/Sidebar';
import { VerifiedBadge } from '../layout/VerifiedBadge';

interface DashboardViewProps {
  profile: StudentProfile;
  announcements: CampusAnnouncement[];
  events: CampusEvent[];
  clubs: Club[];
  lostFound: LostFoundItem[];
  marketplace: MarketplaceItem[];
  routes: BusRoute[];
  onNavigate: (tab: NavTab) => void;
  onTrackReferral: (code: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  announcements,
  events,
  clubs,
  lostFound,
  marketplace,
  routes,
  onNavigate,
  onTrackReferral,
}) => {
  const upcomingEvents = events.slice(0, 3);
  const featuredClubs = clubs.slice(0, 3);
  const recentLostFound = lostFound.slice(0, 3);
  const trendingBooks = marketplace.slice(0, 3);
  const primaryRoute = routes[0];

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Spacious Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel p-7 sm:p-9 bg-gradient-to-r from-indigo-950/60 via-[#0B1126] to-[#070D1E] border border-white/[0.08]">
        {/* Ambient subtle backdrops */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Aurelia University • Fall Term</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Good morning, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-cyan-300">{profile.name}</span>
            </h2>
            <p className="text-sm text-slate-300/90 leading-relaxed font-normal">
              Your personalized campus hub for classes, internal electric shuttles, registered societies, second-hand books, and senior guidance.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs text-slate-400">
              <span className="px-3 py-1 rounded-xl bg-white/[0.04] border border-white/[0.06] text-slate-200">
                🎓 {profile.department}
              </span>
              <span className="px-3 py-1 rounded-xl bg-white/[0.04] border border-white/[0.06] text-slate-200">
                📅 {profile.year}
              </span>
              <span className="px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono">
                ⚡ {profile.campusCredits} Credits
              </span>
            </div>
          </div>

          {/* Quick Fresher Progress Glass Pill */}
          <div className="glass-panel p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] flex flex-col gap-3 min-w-[250px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white">Orientation Checklist</span>
              <span className="text-xs font-bold text-cyan-400 font-mono">75%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-1.5 rounded-full w-3/4"></div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>3 of 4 items verified</span>
              <button 
                onClick={() => onNavigate('academics')}
                className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1"
              >
                Open Kit <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts with Generous Touch Area */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {[
          { label: 'Campus Map', tab: 'map' as NavTab, icon: Compass, color: 'text-indigo-400 bg-indigo-500/10 hover:border-indigo-500/40' },
          { label: 'Shuttle Buses', tab: 'transport' as NavTab, icon: Bus, color: 'text-cyan-400 bg-cyan-500/10 hover:border-cyan-500/40' },
          { label: 'Clubs & Fests', tab: 'clubs' as NavTab, icon: Sparkles, color: 'text-purple-400 bg-purple-500/10 hover:border-purple-500/40' },
          { label: 'Lost & Found', tab: 'lostfound' as NavTab, icon: PackageSearch, color: 'text-amber-400 bg-amber-500/10 hover:border-amber-500/40' },
          { label: 'Marketplace', tab: 'marketplace' as NavTab, icon: ShoppingBag, color: 'text-emerald-400 bg-emerald-500/10 hover:border-emerald-500/40' },
          { label: 'Senior Advice', tab: 'memory' as NavTab, icon: BookOpen, color: 'text-sky-400 bg-sky-500/10 hover:border-sky-500/40' },
        ].map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              onClick={() => onNavigate(action.tab)}
              className={`p-4 rounded-2xl glass-panel-interactive border border-white/[0.06] flex flex-col items-center justify-center gap-2.5 text-center group ${action.color}`}
            >
              <div className="p-2.5 rounded-xl bg-black/30 group-hover:scale-105 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Two-Column Grid with Generous Gap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Bulletins & Transit Preview */}
        <div className="lg:col-span-2 space-y-7">
          {/* Important Announcements Feed */}
          <div className="glass-panel rounded-3xl border border-white/[0.07] p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-indigo-400" />
                <h3 className="font-bold text-sm text-white">Campus Bulletins & Notices</h3>
              </div>
              <span className="text-xs text-slate-400">Verified sources</span>
            </div>

            <div className="space-y-3.5">
              {announcements.map((ann) => (
                <div 
                  key={ann.id} 
                  className="p-4 rounded-2xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/[0.05] transition-all space-y-2 text-left"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <VerifiedBadge source={ann.source} size="sm" />
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-500" /> {ann.date}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white tracking-tight">{ann.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Clean Shuttle Status Card */}
          <div className="glass-panel rounded-3xl border border-white/[0.07] p-6 bg-gradient-to-r from-blue-950/20 via-[#0B1228] to-[#070D1E]">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <Bus className="w-4 h-4 text-cyan-400" />
                <div>
                  <h3 className="font-bold text-sm text-white">Campus Shuttle Status</h3>
                  <p className="text-[11px] text-slate-400">Internal electric transit schedule</p>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('transport')}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
              >
                Full Route Planner <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {primaryRoute && (
              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-black/30 border border-white/[0.04]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-lg bg-cyan-500/15 text-cyan-300 font-bold text-xs border border-cyan-500/25">
                      {primaryRoute.routeNumber}
                    </span>
                    <h4 className="text-sm font-semibold text-white">{primaryRoute.name}</h4>
                  </div>
                  <p className="text-xs text-slate-400">
                    Next stop at Central Library in <strong className="text-cyan-300 font-mono">4 mins</strong> • Frequency: {primaryRoute.frequency}
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    On Schedule
                  </span>
                  <button 
                    onClick={() => onNavigate('transport')}
                    className="px-3.5 py-1.5 text-xs rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors shadow-glow"
                  >
                    Track
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Upcoming Events & Emergency Matrix */}
        <div className="space-y-7">
          {/* Upcoming Events Card */}
          <div className="glass-panel rounded-3xl border border-white/[0.07] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <h3 className="font-bold text-sm text-white">Upcoming Events</h3>
              </div>
              <button 
                onClick={() => onNavigate('clubs')}
                className="text-xs text-purple-400 hover:text-purple-300 font-medium"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {upcomingEvents.map((evt) => (
                <div 
                  key={evt.id} 
                  className="p-3.5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/[0.05] transition-all space-y-2 text-left"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/20">
                      {evt.category}
                    </span>
                    {evt.isSponsored && <VerifiedBadge source="Sponsored / Promoted" size="sm" />}
                  </div>

                  <h4 className="text-xs font-bold text-white line-clamp-1">{evt.title}</h4>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" /> {evt.date} • {evt.venue}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-slate-400">
                      👥 {evt.registeredCount} attending
                    </span>
                    <button
                      onClick={() => {
                        if (evt.referralCode) onTrackReferral(evt.referralCode);
                        onNavigate('clubs');
                      }}
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                    >
                      Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Quick Helpline Bar */}
          <div className="glass-panel rounded-3xl border border-rose-500/25 p-6 bg-gradient-to-b from-rose-950/15 to-transparent space-y-3.5">
            <div className="flex items-center gap-2 text-rose-400">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <h4 className="text-sm font-bold text-white">24/7 Campus Emergency</h4>
            </div>
            <p className="text-xs text-slate-300/80 leading-relaxed">
              Immediate fictional assistance for medical crises, security, or anti-ragging.
            </p>
            <div className="space-y-2 pt-1 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                <span className="text-slate-400">Ambulance & Hospital</span>
                <span className="font-mono text-emerald-400 font-bold">+91 555-0911</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                <span className="text-slate-400">Anti-Ragging Squad</span>
                <span className="font-mono text-rose-400 font-bold">+91 555-0999</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400">Campus Security</span>
                <span className="font-mono text-cyan-400 font-bold">+91 555-0100</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('wellbeing')}
              className="w-full mt-2 py-2 rounded-xl bg-rose-600/15 hover:bg-rose-600/25 border border-rose-500/30 text-rose-200 text-xs font-semibold transition-colors"
            >
              Open Wellbeing Center
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Featured Societies & Marketplace */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Featured Clubs */}
        <div className="glass-panel rounded-3xl border border-white/[0.07] p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" /> Campus Clubs
            </h3>
            <button 
              onClick={() => onNavigate('clubs')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Explore All
            </button>
          </div>
          <div className="space-y-3">
            {featuredClubs.map((club) => (
              <div key={club.id} className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.025] hover:bg-white/[0.05] transition-colors">
                <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-400/20 flex items-center justify-center font-bold text-xs text-indigo-300 shrink-0">
                  {club.name.substring(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{club.name}</h4>
                  <p className="text-[11px] text-slate-400 truncate">{club.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Lost & Found */}
        <div className="glass-panel rounded-3xl border border-white/[0.07] p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <PackageSearch className="w-4 h-4 text-amber-400" /> Lost & Found Board
            </h3>
            <button 
              onClick={() => onNavigate('lostfound')}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium"
            >
              View Board
            </button>
          </div>
          <div className="space-y-3">
            {recentLostFound.map((item) => (
              <div key={item.id} className="p-3 rounded-2xl bg-white/[0.025] hover:bg-white/[0.05] transition-colors space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className={`px-2 py-0.5 rounded-full font-bold uppercase ${
                    item.type === 'found' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'
                  }`}>
                    {item.type}
                  </span>
                  <span className="text-slate-400">{item.location}</span>
                </div>
                <h4 className="text-xs font-semibold text-white line-clamp-1">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Marketplace */}
        <div className="glass-panel rounded-3xl border border-white/[0.07] p-6 space-y-4 md:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-emerald-400" /> Student Marketplace
            </h3>
            <button 
              onClick={() => onNavigate('marketplace')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
            >
              Browse All
            </button>
          </div>
          <div className="space-y-3">
            {trendingBooks.map((item) => (
              <div key={item.id} className="p-3 rounded-2xl bg-white/[0.025] hover:bg-white/[0.05] transition-colors flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-slate-400">{item.category} • {item.condition}</span>
                  <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-800/30 px-2 py-1 rounded-lg">
                    ₹{item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
