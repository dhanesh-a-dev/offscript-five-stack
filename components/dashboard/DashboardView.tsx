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
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel border border-white/15 p-6 sm:p-8 bg-gradient-to-r from-indigo-950/80 via-[#0D152F] to-[#0A0F24]">
        {/* Ambient background glow circles */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-cyan-600/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Aurelia University 2026 Companion</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-cyan-300">{profile.name}</span>!
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Your personalized hub for lecture schedules, campus shuttles, student clubs, second-hand books, and senior mentorship.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-400">
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200">
                🎓 {profile.department}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200">
                📅 {profile.year} • {profile.semester}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono">
                ⚡ {profile.campusCredits} Campus Credits
              </span>
            </div>
          </div>

          {/* Quick Onboarding Progress Badge */}
          <div className="glass-panel p-4 rounded-2xl border border-white/15 bg-white/5 flex flex-col gap-3 min-w-[240px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white">Fresher Orientation</span>
              <span className="text-xs font-bold text-cyan-400">75% Done</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-2 rounded-full w-3/4 animate-pulse"></div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>3 of 4 checklists verified</span>
              <button 
                onClick={() => onNavigate('academics')}
                className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1"
              >
                View Kit <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Campus Map', tab: 'map' as NavTab, icon: Compass, color: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30' },
          { label: 'Shuttle Buses', tab: 'transport' as NavTab, icon: Bus, color: 'from-cyan-500/20 to-teal-500/20 text-cyan-400 border-cyan-500/30' },
          { label: 'Clubs & Fests', tab: 'clubs' as NavTab, icon: Sparkles, color: 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30' },
          { label: 'Lost & Found', tab: 'lostfound' as NavTab, icon: PackageSearch, color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30' },
          { label: 'Marketplace', tab: 'marketplace' as NavTab, icon: ShoppingBag, color: 'from-emerald-500/20 to-green-500/20 text-emerald-400 border-emerald-500/30' },
          { label: 'Senior Advice', tab: 'memory' as NavTab, icon: BookOpen, color: 'from-violet-500/20 to-indigo-500/20 text-violet-400 border-violet-500/30' },
        ].map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              onClick={() => onNavigate(action.tab)}
              className={`p-3.5 rounded-2xl border glass-panel-interactive flex flex-col items-center justify-center gap-2 text-center group bg-gradient-to-b ${action.color}`}
            >
              <div className="p-2.5 rounded-xl bg-black/30 group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Two-Column Grid: Announcements & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Campus Announcements & Primary Route */}
        <div className="lg:col-span-2 space-y-6">
          {/* Important Announcements Feed */}
          <div className="glass-panel rounded-2xl border border-white/10 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <Bell className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-base text-white">Campus Bulletins & Notices</h3>
              </div>
              <span className="text-xs text-slate-400">All sources verified</span>
            </div>

            <div className="space-y-3">
              {announcements.map((ann) => (
                <div 
                  key={ann.id} 
                  className="p-4 rounded-xl bg-white/5 hover:bg-white/[0.08] border border-white/5 transition-all space-y-2 text-left"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <VerifiedBadge source={ann.source} size="sm" />
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {ann.date}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">{ann.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Shuttle Status Card */}
          <div className="glass-panel rounded-2xl border border-white/10 p-5 bg-gradient-to-r from-blue-950/40 to-indigo-950/40">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <Bus className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="font-bold text-sm text-white">Live Shuttle Status (Demo)</h3>
                  <p className="text-[11px] text-slate-400">Fictional campus transit schedules</p>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('transport')}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
              >
                Full Timetable <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {primaryRoute && (
              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-black/30 border border-white/5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold text-xs border border-cyan-500/30">
                      {primaryRoute.routeNumber}
                    </span>
                    <h4 className="text-sm font-semibold text-white">{primaryRoute.name}</h4>
                  </div>
                  <p className="text-xs text-slate-400">
                    Next arriving at Central Library in <strong className="text-cyan-300 font-mono">4 mins</strong> • Frequency: {primaryRoute.frequency}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    On Schedule
                  </span>
                  <button 
                    onClick={() => onNavigate('transport')}
                    className="px-3 py-1 text-xs rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
                  >
                    Track Route
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Upcoming Events & Quick Help */}
        <div className="space-y-6">
          {/* Upcoming Events Card */}
          <div className="glass-panel rounded-2xl border border-white/10 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
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
                  className="p-3.5 rounded-xl bg-white/5 hover:bg-white/[0.08] border border-white/5 transition-all space-y-2 text-left"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
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
                      👥 {evt.registeredCount} students attending
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
          <div className="glass-panel rounded-2xl border border-rose-500/30 p-5 bg-gradient-to-b from-rose-950/20 to-black/30 space-y-3">
            <div className="flex items-center gap-2 text-rose-400">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <h4 className="text-sm font-bold text-white">24/7 Campus Emergency Matrix</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Immediate fictional demo assistance for medical crises, security escorts, or anti-ragging support.
            </p>
            <div className="space-y-1.5 pt-1 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-400">Ambulance & Hospital</span>
                <span className="font-mono text-emerald-400 font-bold">+91 555-0911</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-400">Anti-Ragging Helpline</span>
                <span className="font-mono text-rose-400 font-bold">+91 555-0999</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400">Security Control</span>
                <span className="font-mono text-cyan-400 font-bold">+91 555-0100</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('wellbeing')}
              className="w-full mt-2 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-200 text-xs font-semibold transition-colors"
            >
              Open Wellbeing Sanctuary
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Featured Clubs & Lost Items Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Featured Clubs */}
        <div className="glass-panel rounded-2xl border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" /> Featured Campus Clubs
            </h3>
            <button 
              onClick={() => onNavigate('clubs')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Explore 9+ Clubs
            </button>
          </div>
          <div className="space-y-3">
            {featuredClubs.map((club) => (
              <div key={club.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center font-bold text-xs text-indigo-300 shrink-0">
                  {club.name.substring(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{club.name}</h4>
                  <p className="text-[11px] text-slate-400 truncate">{club.tagline}</p>
                  <span className="text-[10px] text-cyan-400 mt-1 inline-block">
                    {club.membersCount} members • {club.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Lost & Found */}
        <div className="glass-panel rounded-2xl border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <PackageSearch className="w-4 h-4 text-amber-400" /> Recent Lost & Found
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
              <div key={item.id} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className={`px-2 py-0.5 rounded-full font-bold uppercase ${
                    item.type === 'found' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {item.type}
                  </span>
                  <span className="text-slate-400">{item.location}</span>
                </div>
                <h4 className="text-xs font-semibold text-white line-clamp-1">{item.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Second-Hand Marketplace */}
        <div className="glass-panel rounded-2xl border border-white/10 p-5 space-y-4 md:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
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
              <div key={item.id} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-slate-400">{item.category} • {item.condition}</span>
                  <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                  <p className="text-[10px] text-slate-400 truncate">Seller: {item.sellerName} ({item.sellerDept})</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-1 rounded">
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
