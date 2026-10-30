import React, { useState } from 'react';
import { 
  Sliders, 
  ShieldAlert, 
  Bell, 
  PackageSearch, 
  ShoppingBag, 
  MessageSquarePlus, 
  BarChart3, 
  Plus, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  Sparkles,
  Trash2,
  FileCheck
} from 'lucide-react';
import { 
  CampusAnnouncement, 
  LostFoundItem, 
  MarketplaceItem, 
  StudentSuggestion, 
  PromotionAnalytics,
  VerificationSource 
} from '@/types';
import { VerifiedBadge } from '../layout/VerifiedBadge';
import { Modal } from '../ui/Modal';

interface AdminPanelViewProps {
  announcements: CampusAnnouncement[];
  lostFound: LostFoundItem[];
  marketplace: MarketplaceItem[];
  suggestions: StudentSuggestion[];
  analytics: PromotionAnalytics[];
  onAddAnnouncement: (ann: Omit<CampusAnnouncement, 'id' | 'date'>) => void;
  onUpdateLostFoundStatus: (id: string, status: LostFoundItem['status']) => void;
  onUpdateSuggestionStatus: (id: string, status: StudentSuggestion['status'], comment: string, adminResponse?: string) => void;
  onUpdateMarketplaceStatus: (id: string, status: MarketplaceItem['status']) => void;
  onResetAllData: () => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
}

export const AdminPanelView: React.FC<AdminPanelViewProps> = ({
  announcements,
  lostFound,
  marketplace,
  suggestions,
  analytics,
  onAddAnnouncement,
  onUpdateLostFoundStatus,
  onUpdateSuggestionStatus,
  onUpdateMarketplaceStatus,
  onResetAllData,
  onShowToast,
}) => {
  const [activeSection, setActiveSection] = useState<'announcements' | 'lostfound' | 'suggestions' | 'marketplace' | 'analytics'>('announcements');
  const [showNewAnnouncementModal, setShowNewAnnouncementModal] = useState(false);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);

  // Announcement form
  const [annTitle, setAnnTitle] = useState('');
  const [annCategory, setAnnCategory] = useState('Examinations');
  const [annSource, setAnnSource] = useState<VerificationSource>('Official University Information');
  const [annSummary, setAnnSummary] = useState('');
  const [annContent, setAnnContent] = useState('');

  // Selected Suggestion for Status Update
  const [selectedSugForUpdate, setSelectedSugForUpdate] = useState<StudentSuggestion | null>(null);
  const [newSugStatus, setNewSugStatus] = useState<StudentSuggestion['status']>('Accepted');
  const [sugComment, setSugComment] = useState('Approved by student affairs committee.');
  const [sugAdminResponse, setSugAdminResponse] = useState('');

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annSummary.trim()) return;

    onAddAnnouncement({
      title: annTitle,
      category: annCategory,
      source: annSource,
      summary: annSummary,
      content: annContent || annSummary
    });

    setShowNewAnnouncementModal(false);
    setAnnTitle('');
    setAnnSummary('');
    setAnnContent('');
    onShowToast("Announcement Published!", "Notice dispatched with verified badge.", "success");
  };

  const handleUpdateSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSugForUpdate) return;

    onUpdateSuggestionStatus(
      selectedSugForUpdate.id,
      newSugStatus,
      sugComment,
      sugAdminResponse || undefined
    );

    setSelectedSugForUpdate(null);
    onShowToast("Suggestion Status Updated", `Ticket ${selectedSugForUpdate.trackingId} moved to ${newSugStatus}.`, "success");
  };

  const handleConfirmReset = () => {
    onResetAllData();
    setShowResetConfirmModal(false);
    onShowToast("Demo Data Restored", "All local state has been reset to default university seeds.", "info");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Perseus Demo Content Management Panel
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate administrative control: publish bulletins, review lost-item claims, and update student ideas.
          </p>
        </div>

        <button
          onClick={() => setShowResetConfirmModal(true)}
          className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start md:self-auto"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {/* Demo Limitation Disclaimer Card */}
      <div className="glass-panel p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 flex items-start gap-3 text-xs text-amber-200">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-white block font-semibold">Hackathon Evaluation Notice (Client-Side Storage)</strong>
          <p className="leading-relaxed">
            This administration console uses browser <code>localStorage</code> to illustrate live state mutation. In production, these controls will connect to a secure backend with role-based auth (RBAC) and OAuth 2.0.
          </p>
        </div>
      </div>

      {/* Section Navigation Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto p-1 rounded-2xl glass-panel border border-white/10 scrollbar-none bg-black/30">
        {[
          { id: 'announcements', label: 'Bulletins & Notices', icon: Bell },
          { id: 'lostfound', label: 'Lost & Found Claims', icon: PackageSearch },
          { id: 'suggestions', label: 'Suggestion Pipeline', icon: MessageSquarePlus },
          { id: 'marketplace', label: 'Marketplace Inventory', icon: ShoppingBag },
          { id: 'analytics', label: 'Campaign Analytics', icon: BarChart3 },
        ].map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-purple-600 text-white shadow-glow border border-purple-400/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: ANNOUNCEMENTS & VERIFIED INFORMATION SYSTEM */}
      {activeSection === 'announcements' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white">Campus Bulletins & Source Badging</h3>
            <button
              onClick={() => setShowNewAnnouncementModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-glow flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Notice</span>
            </button>
          </div>

          <div className="space-y-3">
            {announcements.map((ann) => (
              <div key={ann.id} className="p-4 rounded-2xl glass-panel border border-white/10 text-left space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <VerifiedBadge source={ann.source} size="sm" showDetails />
                  <span className="text-xs text-slate-400 font-mono">{ann.date}</span>
                </div>
                <h4 className="text-sm font-bold text-white">{ann.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{ann.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: LOST & FOUND CLAIMS REVIEW */}
      {activeSection === 'lostfound' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white">Item Lifecycle & Claim Verification</h3>
            <span className="text-xs text-slate-400">Review pending student claim requests</span>
          </div>

          <div className="space-y-4">
            {lostFound.map((item) => (
              <div key={item.id} className="p-5 rounded-2xl glass-panel border border-white/10 text-left space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {item.type.toUpperCase()} • {item.category}
                    </span>
                    <h4 className="text-base font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400">Location: {item.location} • Reported {item.dateReported}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Set Status:</span>
                    <select
                      value={item.status}
                      onChange={(e) => {
                        onUpdateLostFoundStatus(item.id, e.target.value as any);
                        onShowToast("Item Status Updated", `Marked "${item.title}" as ${e.target.value}`, "info");
                      }}
                      className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none"
                    >
                      <option value="Reported">Reported</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Claimed">Claimed</option>
                      <option value="Returned">Returned</option>
                      <option value="Expired">Expired</option>
                    </select>
                  </div>
                </div>

                {/* Claims submitted for this item */}
                {item.claims.length > 0 ? (
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-cyan-500/20 space-y-2">
                    <span className="font-bold text-xs text-cyan-300 flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4" /> Submitted Student Claims ({item.claims.length})
                    </span>
                    {item.claims.map((claim) => (
                      <div key={claim.id} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1 text-xs">
                        <div className="flex justify-between items-center text-slate-300">
                          <strong>{claim.claimantName} ({claim.claimantEmail})</strong>
                          <span className="text-[10px] text-slate-400">{claim.submittedAt}</span>
                        </div>
                        <p className="text-slate-300"><strong>Proof:</strong> {claim.proofDetails}</p>
                        <p className="text-slate-300"><strong>Distinguishing Mark:</strong> {claim.uniqueMarks}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">No student claims filed yet for this item.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: SUGGESTION PIPELINE */}
      {activeSection === 'suggestions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white">Student Senate Proposal Queue</h3>
            <span className="text-xs text-slate-400">Click ticket to advance status</span>
          </div>

          <div className="space-y-3">
            {suggestions.map((sug) => (
              <div
                key={sug.id}
                className="p-4 rounded-2xl glass-panel border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-300">{sug.trackingId}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/5 border border-white/10 text-slate-300">
                      {sug.status}
                    </span>
                    <span className="text-xs text-slate-400">👍 {sug.upvotes} votes</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{sug.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-1">{sug.description}</p>
                </div>

                <button
                  onClick={() => {
                    setSelectedSugForUpdate(sug);
                    setNewSugStatus(sug.status);
                    setSugAdminResponse(sug.adminResponse || '');
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-glow self-start md:self-auto shrink-0"
                >
                  Update Decision
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: MARKETPLACE INVENTORY */}
      {activeSection === 'marketplace' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white">Student Second-Hand Listings Inventory</h3>
            <span className="text-xs text-slate-400">{marketplace.length} total listings</span>
          </div>

          <div className="space-y-3">
            {marketplace.map((mkt) => (
              <div key={mkt.id} className="p-4 rounded-2xl glass-panel border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-emerald-400 font-mono font-bold">₹{mkt.price}</span>
                    <span className="text-xs text-slate-400">• {mkt.category} ({mkt.condition})</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-0.5">{mkt.title}</h4>
                  <p className="text-xs text-slate-400">Seller: {mkt.sellerName} ({mkt.sellerContact})</p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-xs text-slate-400">Status:</span>
                  <select
                    value={mkt.status}
                    onChange={(e) => {
                      onUpdateMarketplaceStatus(mkt.id, e.target.value as any);
                      onShowToast("Marketplace Status", `Updated "${mkt.title}" to ${e.target.value}`, "info");
                    }}
                    className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none"
                  >
                    <option value="Available">Available</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: CAMPAIGN ANALYTICS */}
      {activeSection === 'analytics' && (
        <div className="glass-panel rounded-3xl border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-bold text-sm text-white">Promoted Club Campaign Telemetry</h3>
            <span className="text-xs text-cyan-400 font-mono">Live Demo Stream</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {analytics.map((camp) => (
              <div key={camp.id} className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-2 text-left">
                <span className="text-[10px] font-mono text-purple-300 uppercase">{camp.campaignName}</span>
                <h4 className="text-sm font-bold text-white">{camp.eventTitle}</h4>
                <div className="pt-2 grid grid-cols-2 gap-2 text-xs border-t border-white/5">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Referral Clicks</span>
                    <strong className="text-cyan-400 text-sm font-mono">{camp.clicks}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">CTR</span>
                    <strong className="text-emerald-400 text-sm font-mono">{camp.ctr}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Announcement Modal */}
      {showNewAnnouncementModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowNewAnnouncementModal(false)}
          title="Publish Campus Announcement"
          subtitle="Select verifiable source badge to maintain student information trust"
        >
          <form onSubmit={handleCreateAnnouncement} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Notice Headline:</label>
              <input
                type="text"
                required
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                placeholder="e.g. Revised Exam Hall Allocations for Engineering Complex"
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Source Verification Badge:</label>
                <select
                  value={annSource}
                  onChange={(e) => setAnnSource(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
                >
                  <option value="Official University Information">Official University Information</option>
                  <option value="Verified Perseus Team Update">Verified Perseus Team Update</option>
                  <option value="Club Announcement">Club Announcement</option>
                  <option value="Sponsored / Promoted">Sponsored / Promoted</option>
                  <option value="Student Submitted">Student Submitted</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category:</label>
                <input
                  type="text"
                  required
                  value={annCategory}
                  onChange={(e) => setAnnCategory(e.target.value)}
                  placeholder="e.g. Examinations or Infrastructure"
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Summary (Short preview):</label>
              <input
                type="text"
                required
                value={annSummary}
                onChange={(e) => setAnnSummary(e.target.value)}
                placeholder="Brief summary appearing in feed..."
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Announcement Body:</label>
              <textarea
                rows={3}
                value={annContent}
                onChange={(e) => setAnnContent(e.target.value)}
                placeholder="Detailed guidance..."
                className="w-full p-3 rounded-xl bg-black/40 border border-white/15 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-glow"
            >
              Broadcast Bulletin Across Campus
            </button>
          </form>
        </Modal>
      )}

      {/* Update Suggestion Modal */}
      {selectedSugForUpdate && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedSugForUpdate(null)}
          title={`Update Ticket: ${selectedSugForUpdate.trackingId}`}
          subtitle={selectedSugForUpdate.title}
        >
          <form onSubmit={handleUpdateSuggestion} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">New Resolution Status:</label>
              <select
                value={newSugStatus}
                onChange={(e) => setNewSugStatus(e.target.value as any)}
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
              >
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Accepted">Accepted</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Declined">Declined</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Status Progression Log:</label>
              <input
                type="text"
                required
                value={sugComment}
                onChange={(e) => setSugComment(e.target.value)}
                placeholder="e.g. Dean of Facilities scheduled pilot implementation"
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Official Response Note to Student:</label>
              <textarea
                rows={2}
                value={sugAdminResponse}
                onChange={(e) => setSugAdminResponse(e.target.value)}
                placeholder="Message visible on public suggestion card..."
                className="w-full p-3 rounded-xl bg-black/40 border border-white/15 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-glow"
            >
              Commit Status Update
            </button>
          </form>
        </Modal>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirmModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowResetConfirmModal(false)}
          title="Reset All Demo Data?"
          subtitle="Restore original Aurelia University dataset"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-300 leading-relaxed">
              This will clear all newly posted lost items, marketplace listings, feedback tickets, and mentorship requests from your browser's local cache. Factory sample items will be reseeded immediately.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowResetConfirmModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-all shadow-glow"
              >
                Reset Everything
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

