import React, { useState } from 'react';
import { 
  Sparkles, 
  Users, 
  Calendar, 
  Search, 
  Tag, 
  Share2, 
  ExternalLink, 
  CheckCircle2, 
  BarChart3, 
  Copy, 
  Clock, 
  MapPin, 
  Mail, 
  Plus, 
  Filter,
  Check,
  TrendingUp,
  Award
} from 'lucide-react';
import { Club, CampusEvent, PromotionAnalytics } from '@/types';
import { VerifiedBadge } from '../layout/VerifiedBadge';
import { Modal } from '../ui/Modal';

interface ClubsEventsViewProps {
  clubs: Club[];
  events: CampusEvent[];
  analytics: PromotionAnalytics[];
  onTrackReferral: (code: string) => void;
  onRegisterEvent: (eventId: string) => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
}

export const ClubsEventsView: React.FC<ClubsEventsViewProps> = ({
  clubs,
  events,
  analytics,
  onTrackReferral,
  onRegisterEvent,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'events' | 'clubs' | 'analytics'>('events');
  const [eventCategoryFilter, setEventCategoryFilter] = useState<string>('all');
  const [clubCategoryFilter, setClubCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals
  const [selectedClubForJoin, setSelectedClubForJoin] = useState<Club | null>(null);
  const [selectedEventForDetails, setSelectedEventForDetails] = useState<CampusEvent | null>(null);
  const [registeredEventIds, setRegisteredEventIds] = useState<Record<string, boolean>>({});

  // Filtered Events
  const filteredEvents = events.filter((evt) => {
    const matchesCat = eventCategoryFilter === 'all' || evt.category.toLowerCase().includes(eventCategoryFilter.toLowerCase());
    const matchesSearch = 
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.clubName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Filtered Clubs
  const filteredClubs = clubs.filter((club) => {
    const matchesCat = clubCategoryFilter === 'all' || club.category.toLowerCase().includes(clubCategoryFilter.toLowerCase());
    const matchesSearch = 
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopyReferral = (code: string, eventTitle: string) => {
    onTrackReferral(code);
    const dummyUrl = `https://perseus.aurelia.edu/events?ref=${code}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(dummyUrl);
    }
    onShowToast("Referral Link Copied!", `Demo link for "${eventTitle}" with code ${code} tracked +1 click.`, "success");
  };

  const handleRegister = (evt: CampusEvent) => {
    onRegisterEvent(evt.id);
    setRegisteredEventIds(prev => ({ ...prev, [evt.id]: true }));
    onShowToast("Registration Confirmed!", `You are registered for ${evt.title}. Pass sent to student email.`, "success");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header & Section Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Campus Clubs & Events Hub
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Discover 35+ student societies, hackathons, cultural festivals, and track promotional campaigns.
          </p>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl glass-panel border border-white/10 self-start md:self-auto bg-black/30">
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'events'
                ? 'bg-indigo-600 text-white shadow-glow border border-indigo-400/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Events Feed ({events.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('clubs')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'clubs'
                ? 'bg-indigo-600 text-white shadow-glow border border-indigo-400/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Clubs Directory ({clubs.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'analytics'
                ? 'bg-purple-600 text-white shadow-glow border border-purple-400/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Promo Analytics</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Header (for Events and Clubs) */}
      {activeTab !== 'analytics' && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl glass-panel border border-white/10">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {activeTab === 'events' ? (
              ['all', 'Hackathon', 'Cultural', 'Business', 'Sports', 'University Official'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setEventCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    eventCategoryFilter === cat
                      ? 'bg-indigo-600 text-white shadow-glow'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  {cat === 'all' ? 'All Events' : cat}
                </button>
              ))
            ) : (
              ['all', 'Technical', 'Creative Arts', 'Business', 'Performing Arts', 'Sports'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setClubCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    clubCategoryFilter === cat
                      ? 'bg-indigo-600 text-white shadow-glow'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  {cat === 'all' ? 'All Societies' : cat}
                </button>
              ))
            )}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeTab === 'events' ? 'events, fests...' : 'societies, leads...'}`}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400"
            />
          </div>
        </div>
      )}

      {/* TAB 1: EVENTS DISCOVERY */}
      {activeTab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => {
            const isRegistered = !!registeredEventIds[evt.id];
            return (
              <div
                key={evt.id}
                className="glass-panel-interactive rounded-3xl border border-white/10 p-5 flex flex-col justify-between text-left space-y-4 group relative overflow-hidden"
              >
                {/* Event header badges */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <VerifiedBadge source={evt.source} size="sm" />
                    <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                      {evt.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-indigo-300 font-medium">Organized by {evt.clubName}</p>
                </div>

                {/* Event Details */}
                <div className="space-y-1.5 text-xs text-slate-300 bg-black/20 p-3 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>{evt.venue}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {evt.description}
                </p>

                {/* Promotional Referral Banner if sponsored */}
                {evt.isSponsored && evt.referralCode && (
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-300 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" /> Demo Referral Link
                      </span>
                      <span className="text-[10px] font-mono text-amber-200">
                        {evt.referralClicks} clicks tracked
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 bg-black/50 px-2 py-1 rounded text-[11px] text-amber-200 font-mono truncate">
                        {evt.referralCode}
                      </code>
                      <button
                        onClick={() => handleCopyReferral(evt.referralCode!, evt.title)}
                        className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                        title="Copy and simulate click tracking"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Bottom Actions */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400">
                    👥 {evt.registeredCount} {evt.maxCapacity ? `/ ${evt.maxCapacity}` : ''} attending
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedEventForDetails(evt)}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleRegister(evt)}
                      disabled={isRegistered}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        isRegistered
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-glow'
                      }`}
                    >
                      {isRegistered ? 'Registered ✓' : 'Register Free'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: CLUBS DIRECTORY */}
      {activeTab === 'clubs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club) => (
            <div
              key={club.id}
              className="glass-panel-interactive rounded-3xl border border-white/10 p-6 flex flex-col justify-between text-left space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-base text-white shadow-glow shrink-0">
                    {club.name.substring(0, 2)}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    {club.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">{club.name}</h3>
                  <p className="text-xs text-cyan-300 font-medium italic mt-0.5">"{club.tagline}"</p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {club.description}
                </p>
              </div>

              {/* Club Meta Info */}
              <div className="space-y-1.5 text-xs text-slate-400 bg-white/5 p-3 rounded-2xl border border-white/5">
                <div className="flex justify-between items-center">
                  <span>Lead Coordinator:</span>
                  <strong className="text-white">{club.leadName}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span>Regular Meets:</span>
                  <span className="text-slate-300">{club.meetingSchedule}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Base Room:</span>
                  <span className="font-mono text-cyan-400">{club.room}</span>
                </div>
              </div>

              {/* Bottom Club Actions */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  ⚡ {club.membersCount} Active Members
                </span>
                <button
                  onClick={() => setSelectedClubForJoin(club)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-glow transition-all"
                >
                  Join Society
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: CLUB PROMOTION ANALYTICS (FEATURE 15) */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-4 bg-gradient-to-r from-purple-950/40 via-[#0F142D] to-indigo-950/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <span>Promoted Campaigns & Referral Telemetry</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Simulated metrics for sponsored hackathons and student partner events.
                </p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold self-start sm:self-auto">
                Demo Analytics Engine
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
              {[
                { label: 'Total Campaign Views', value: '3,400+', change: '+18% this week' },
                { label: 'Referral Link Clicks', value: '646', change: '+34 today' },
                { label: 'Average CTR', value: '18.9%', change: 'High Engagement' },
                { label: 'Active Promotions', value: '2 Live', change: '1 Completed' }
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-1">
                  <span className="text-xs text-slate-400">{stat.label}</span>
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <span className="text-[11px] text-emerald-400 font-medium">{stat.change}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Campaign Table */}
          <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
            <div className="p-5 border-b border-white/10">
              <h4 className="font-bold text-sm text-white">Campaign Performance Breakdown</h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 text-slate-400 border-b border-white/5 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Campaign & Event</th>
                    <th className="p-4">Sponsor Partner</th>
                    <th className="p-4">Referral Code</th>
                    <th className="p-4">Impressions</th>
                    <th className="p-4">Clicks</th>
                    <th className="p-4">CTR</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {analytics.map((camp) => (
                    <tr key={camp.id} className="hover:bg-white/[0.04] transition-colors">
                      <td className="p-4 font-semibold text-white">
                        <div>{camp.campaignName}</div>
                        <div className="text-[11px] text-slate-400">{camp.eventTitle}</div>
                      </td>
                      <td className="p-4">{camp.sponsorName}</td>
                      <td className="p-4 font-mono text-cyan-300">{camp.referralCode}</td>
                      <td className="p-4 font-mono">{camp.views.toLocaleString()}</td>
                      <td className="p-4 font-mono text-emerald-400 font-bold">{camp.clicks}</td>
                      <td className="p-4 font-mono text-indigo-300">{camp.ctr}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          camp.status === 'Active' 
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-slate-500/20 text-slate-300'
                        }`}>
                          {camp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Join Club Modal */}
      {selectedClubForJoin && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedClubForJoin(null)}
          title={`Join ${selectedClubForJoin.name}`}
          subtitle="Submit student registration to join the official roster"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-300 leading-relaxed">
              You are applying to join <strong>{selectedClubForJoin.name}</strong> as a student member. Meets are scheduled for {selectedClubForJoin.meetingSchedule}.
            </p>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Society Category:</span>
                <span className="text-white font-semibold">{selectedClubForJoin.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Faculty Coordinator Desk:</span>
                <span className="text-white font-semibold">{selectedClubForJoin.room}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold">Tell the lead why you want to join (Demo submission):</label>
              <textarea
                rows={3}
                defaultValue="I am a first-year student eager to contribute to upcoming projects and learn from seniors."
                className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
              />
            </div>

            <button
              onClick={() => {
                setSelectedClubForJoin(null);
                onShowToast("Application Submitted!", `Your membership request for ${selectedClubForJoin.name} was sent to ${selectedClubForJoin.leadName}.`, "success");
              }}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-glow"
            >
              Confirm Application (Demo)
            </button>
          </div>
        </Modal>
      )}

      {/* Event Details Modal */}
      {selectedEventForDetails && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedEventForDetails(null)}
          title={selectedEventForDetails.title}
          subtitle={`Hosted by ${selectedEventForDetails.clubName}`}
        >
          <div className="space-y-4 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
              <VerifiedBadge source={selectedEventForDetails.source} size="md" showDetails />
              <span className="text-cyan-400 font-mono">{selectedEventForDetails.category}</span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              {selectedEventForDetails.description}
            </p>

            <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300">
              <div>
                <span className="text-slate-400 block text-[11px]">Date & Time</span>
                <strong className="text-white">{selectedEventForDetails.date}</strong>
                <div className="text-slate-400 text-[11px]">{selectedEventForDetails.time}</div>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Venue</span>
                <strong className="text-white">{selectedEventForDetails.venue}</strong>
              </div>
            </div>

            {selectedEventForDetails.referralCode && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
                <span className="font-bold block mb-1">Affiliated Promotion Partner:</span>
                <p className="text-[11px] leading-relaxed">
                  This event is part of the Aurelia University Innovation grant. Tracking code: <strong className="font-mono">{selectedEventForDetails.referralCode}</strong>
                </p>
              </div>
            )}

            <button
              onClick={() => {
                handleRegister(selectedEventForDetails);
                setSelectedEventForDetails(null);
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold transition-all shadow-glow"
            >
              Register For Event Now
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};
