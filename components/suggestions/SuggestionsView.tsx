import React, { useState } from 'react';
import { 
  MessageSquarePlus, 
  Search, 
  Plus, 
  ThumbsUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Filter, 
  Star,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { StudentSuggestion } from '@/types';
import { Modal } from '../ui/Modal';

interface SuggestionsViewProps {
  suggestions: StudentSuggestion[];
  onAddSuggestion: (suggestion: { title: string; category: StudentSuggestion['category']; description: string; rating?: number }) => StudentSuggestion;
  onUpvoteSuggestion: (id: string) => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
}

export const SuggestionsView: React.FC<SuggestionsViewProps> = ({
  suggestions,
  onAddSuggestion,
  onUpvoteSuggestion,
  onShowToast,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTrackingId, setSearchTrackingId] = useState<string>('');
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [inspectingSuggestion, setInspectingSuggestion] = useState<StudentSuggestion | null>(null);

  // New Suggestion Form
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<StudentSuggestion['category']>('Campus Facilities');
  const [newDescription, setNewDescription] = useState('');
  const [newRating, setNewRating] = useState<number>(5);

  const filteredSuggestions = suggestions.filter((sug) => {
    const matchesCat = categoryFilter === 'all' || sug.category === categoryFilter;
    const matchesStat = statusFilter === 'all' || sug.status === statusFilter;
    const q = searchTrackingId.toLowerCase();
    const matchesSearch = 
      sug.trackingId.toLowerCase().includes(q) ||
      sug.title.toLowerCase().includes(q) ||
      sug.description.toLowerCase().includes(q);
    return matchesCat && matchesStat && matchesSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const created = onAddSuggestion({
      title: newTitle,
      category: newCategory,
      description: newDescription,
      rating: newRating
    });

    setShowSubmitModal(false);
    setNewTitle('');
    setNewDescription('');
    setInspectingSuggestion(created);
    onShowToast("Suggestion Logged!", `Your tracking ticket is ${created.trackingId}. Check status anytime.`, "success");
  };

  const getStatusBadge = (status: StudentSuggestion['status']) => {
    switch (status) {
      case 'Resolved':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Accepted':
      case 'In Progress':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'Under Review':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Declined':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'Submitted':
      default:
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquarePlus className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Campus Ideas, Feedback & Suggestions
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Propose improvements for Aurelia University facilities, transit, and academics with transparent ticket tracking.
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold shadow-glow-cyan flex items-center gap-1.5 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Campus Idea</span>
        </button>
      </div>

      {/* Ticket Tracking Search & Filter Header */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-4 rounded-3xl glass-panel border border-white/10">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          {['all', 'Transportation', 'Campus Facilities', 'Academics', 'Events', 'Student Support'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              {cat === 'all' ? 'All Areas' : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none"
          >
            <option value="all" className="bg-[#0B1126]">All Statuses</option>
            <option value="Submitted" className="bg-[#0B1126]">Submitted</option>
            <option value="In Progress" className="bg-[#0B1126]">In Progress</option>
            <option value="Accepted" className="bg-[#0B1126]">Accepted</option>
            <option value="Resolved" className="bg-[#0B1126]">Resolved</option>
          </select>

          {/* Ticket ID search */}
          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTrackingId}
              onChange={(e) => setSearchTrackingId(e.target.value)}
              placeholder="Track ticket e.g. AUR-S7821"
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Suggestions List */}
      <div className="space-y-4">
        {filteredSuggestions.map((sug) => (
          <div
            key={sug.id}
            className="glass-panel-interactive rounded-3xl border border-white/10 p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 text-left"
          >
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded">
                  {sug.trackingId}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(sug.status)}`}>
                  {sug.status}
                </span>
                <span className="text-[11px] text-slate-400">
                  {sug.category} • {sug.submittedAt}
                </span>
              </div>

              <h3 className="text-base font-bold text-white leading-snug">
                {sug.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                {sug.description}
              </p>

              {sug.adminResponse && (
                <div className="p-3 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 space-y-0.5">
                  <span className="font-bold text-cyan-300 flex items-center gap-1 text-[11px]">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Administrative Update:
                  </span>
                  <p>{sug.adminResponse}</p>
                </div>
              )}
            </div>

            {/* Right Action Bar */}
            <div className="flex md:flex-col items-center justify-between md:items-end gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
              <button
                onClick={() => {
                  onUpvoteSuggestion(sug.id);
                  onShowToast(sug.userUpvoted ? "Vote Withdrawn" : "Upvoted Suggestion!", `Supported idea: "${sug.title.slice(0, 20)}..."`, "info");
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  sug.userUpvoted
                    ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan font-bold'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                }`}
                title="Support this student proposal"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{sug.upvotes} Upvotes</span>
              </button>

              <button
                onClick={() => setInspectingSuggestion(sug)}
                className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Track Timeline</span>
                <ArrowRight className="w-3 h-3 text-cyan-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Suggestion Modal */}
      {showSubmitModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowSubmitModal(false)}
          title="Submit Campus Suggestion"
          subtitle="Generate a public tracking ticket for student governance review"
        >
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Proposal Title:</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Install high-speed Wi-Fi router on Sports Pavilion"
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category:</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
                >
                  <option value="Campus Facilities">Campus Facilities</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Academics">Academics</option>
                  <option value="Events">Events</option>
                  <option value="Clubs">Clubs</option>
                  <option value="Student Support">Student Support</option>
                  <option value="General Suggestions">General Suggestions</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Priority / Rating Impact:</label>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
                >
                  <option value={5}>5 - Critical Need</option>
                  <option value={4}>4 - High Benefit</option>
                  <option value={3}>3 - Quality of Life</option>
                  <option value={2}>2 - Minor Idea</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Detailed Explanation & Justification:</label>
              <textarea
                rows={4}
                required
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Explain what the current issue is, why it matters, and your proposed solution..."
                className="w-full p-3 rounded-xl bg-black/40 border border-white/15 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold transition-all shadow-glow-cyan"
            >
              Generate Ticket & Submit to Student Senate
            </button>
          </form>
        </Modal>
      )}

      {/* Suggestion Timeline Tracker Modal */}
      {inspectingSuggestion && (
        <Modal
          isOpen={true}
          onClose={() => setInspectingSuggestion(null)}
          title={`Ticket Progress: ${inspectingSuggestion.trackingId}`}
          subtitle={inspectingSuggestion.title}
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
              <div>
                <span className="text-slate-400 block text-[10px]">Current Status</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(inspectingSuggestion.status)}`}>
                  {inspectingSuggestion.status}
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px]">Filed On</span>
                <strong className="text-white">{inspectingSuggestion.submittedAt}</strong>
              </div>
            </div>

            {/* Timeline updates */}
            <div className="space-y-3">
              <h4 className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
                Administrative Status Progression
              </h4>

              <div className="relative pl-6 space-y-3 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-500/40">
                {inspectingSuggestion.updates.map((upd, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-cyan-400 ring-2 ring-[#0B1126]" />
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-cyan-300">{upd.status}</span>
                        <span className="text-slate-400">{upd.date}</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">{upd.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setInspectingSuggestion(null)}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold transition-colors"
            >
              Close Ticket View
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

