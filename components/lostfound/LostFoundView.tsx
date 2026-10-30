import React, { useState } from 'react';
import { 
  PackageSearch, 
  Search, 
  Plus, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Tag, 
  Lock, 
  FileCheck, 
  AlertCircle, 
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { LostFoundItem } from '@/types';
import { Modal } from '../ui/Modal';

interface LostFoundViewProps {
  items: LostFoundItem[];
  onAddItem: (item: Omit<LostFoundItem, 'id' | 'dateReported' | 'status' | 'claims'>) => void;
  onSubmitClaim: (itemId: string, claimData: { claimantName: string; claimantEmail: string; proofDetails: string; uniqueMarks: string }) => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
}

export const LostFoundView: React.FC<LostFoundViewProps> = ({
  items,
  onAddItem,
  onSubmitClaim,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'lost' | 'found'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [reportType, setReportType] = useState<'lost' | 'found'>('lost');
  const [claimingItem, setClaimingItem] = useState<LostFoundItem | null>(null);

  // Form states for new post
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<LostFoundItem['category']>('Electronics');
  const [newLocation, setNewLocation] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Form states for claim
  const [claimantName, setClaimantName] = useState('');
  const [claimantEmail, setClaimantEmail] = useState('');
  const [proofDetails, setProofDetails] = useState('');
  const [uniqueMarks, setUniqueMarks] = useState('');

  const filteredItems = items.filter((item) => {
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    const matchesCat = categoryFilter === 'all' || item.category === categoryFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(q) || item.location.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    return matchesTab && matchesCat && matchesSearch;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newLocation.trim()) return;

    onAddItem({
      type: reportType,
      title: newTitle,
      category: newCategory,
      description: newDesc,
      location: newLocation,
      imagePlaceholder: newCategory
    });

    setShowReportModal(false);
    setNewTitle('');
    setNewLocation('');
    setNewDesc('');
    onShowToast("Listing Published", `Your ${reportType} item notice was added to the campus board.`, "success");
  };

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimingItem) return;

    onSubmitClaim(claimingItem.id, {
      claimantName,
      claimantEmail,
      proofDetails,
      uniqueMarks
    });

    setClaimingItem(null);
    setClaimantName('');
    setClaimantEmail('');
    setProofDetails('');
    setUniqueMarks('');
    onShowToast("Private Claim Filed!", "Your verification answers were delivered to the administration for review.", "success");
  };

  const getStatusBadge = (status: LostFoundItem['status']) => {
    switch (status) {
      case 'Claimed':
      case 'Returned':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Under Review':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Expired':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      case 'Reported':
      default:
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <PackageSearch className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Campus Lost & Found Bureau
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Report misplaced belongings, discover found items, and submit confidential claim verifications.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setReportType('lost');
              setShowReportModal(true);
            }}
            className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Report Lost Item</span>
          </button>
          <button
            onClick={() => {
              setReportType('found');
              setShowReportModal(true);
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-glow flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Report Found Item</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl glass-panel border border-white/10">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'found', label: 'Found by Students' },
            { id: 'lost', label: 'Lost / Missing' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-glow'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items, locations..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400"
          />
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="glass-panel-interactive rounded-3xl border border-white/10 p-5 flex flex-col justify-between text-left space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                  item.type === 'found' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                }`}>
                  {item.type.toUpperCase()}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(item.status)}`}>
                  {item.status}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-semibold text-slate-400 block">{item.category}</span>
                <h3 className="text-base font-bold text-white leading-snug">{item.title}</h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {item.description}
              </p>

              <div className="space-y-1 text-xs text-slate-400 bg-white/5 p-3 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Location: <strong className="text-slate-200">{item.location}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Reported: {item.dateReported}</span>
                </div>
              </div>
            </div>

            {/* Claim verification button */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                {item.claims.length} claims submitted
              </span>

              {item.type === 'found' && item.status !== 'Claimed' && (
                <button
                  onClick={() => setClaimingItem(item)}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-glow transition-all flex items-center gap-1.5"
                >
                  <Lock className="w-3 h-3 text-cyan-300" />
                  <span>Claim Item</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowReportModal(false)}
          title={`Report a ${reportType.toUpperCase()} Item`}
          subtitle="Publish a community notice to help locate or return campus property"
        >
          <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Item Title:</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Navy Blue Hydro Flask or Texas Instruments Calculator"
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
                  <option value="Electronics">Electronics</option>
                  <option value="IDs & Cards">IDs & Cards</option>
                  <option value="Books & Stationery">Books & Stationery</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Bottles & Containers">Bottles & Containers</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Location on Campus:</label>
                <input
                  type="text"
                  required
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. Library 2nd Floor"
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Public Description (Do not disclose secret identifying marks):</label>
              <textarea
                rows={3}
                required
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="General description of color, condition, where found or lost..."
                className="w-full p-3 rounded-xl bg-black/40 border border-white/15 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-glow"
            >
              Post Notice to Campus Board
            </button>
          </form>
        </Modal>
      )}

      {/* Private Claim Modal */}
      {claimingItem && (
        <Modal
          isOpen={true}
          onClose={() => setClaimingItem(null)}
          title={`File Claim for: ${claimingItem.title}`}
          subtitle="Verification is reviewed privately by Admin to avoid fraudulent claims"
        >
          <form onSubmit={handleClaimSubmit} className="space-y-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
              <span className="font-bold block mb-1">Confidential Proof Verification:</span>
              <p className="text-[11px] leading-relaxed">
                To prevent wrongful claiming, please describe unique characteristics (scratches, wallpaper, specific contents, lockscreen details, or serial numbers).
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Full Name:</label>
                <input
                  type="text"
                  required
                  value={claimantName}
                  onChange={(e) => setClaimantName(e.target.value)}
                  placeholder="Alex Carter"
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Student Email:</label>
                <input
                  type="email"
                  required
                  value={claimantEmail}
                  onChange={(e) => setClaimantEmail(e.target.value)}
                  placeholder="alex.c@student.aurelia.edu"
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Identifying Proof & Details:</label>
              <textarea
                rows={2}
                required
                value={proofDetails}
                onChange={(e) => setProofDetails(e.target.value)}
                placeholder="e.g. Paired Bluetooth name is Alex's Pods, purchased in August..."
                className="w-full p-3 rounded-xl bg-black/40 border border-white/15 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Unique Scratches / Distinguishing Marks:</label>
              <input
                type="text"
                required
                value={uniqueMarks}
                onChange={(e) => setUniqueMarks(e.target.value)}
                placeholder="e.g. Small yellow sticker on top right corner"
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-glow"
            >
              Submit Confidential Claim to Admin
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

