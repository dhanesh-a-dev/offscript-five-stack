import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Plus, 
  BookOpen, 
  Tag, 
  Filter, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  Heart, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { MarketplaceItem, StudentProfile } from '@/types';
import { Modal } from '../ui/Modal';

interface MarketplaceViewProps {
  items: MarketplaceItem[];
  profile: StudentProfile;
  onAddItem: (item: Omit<MarketplaceItem, 'id' | 'postedDate' | 'status' | 'wantedRequestsCount'>) => void;
  onUpdateStatus: (itemId: string, status: MarketplaceItem['status']) => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  items,
  profile,
  onAddItem,
  onUpdateStatus,
  onShowToast,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [conditionFilter, setConditionFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');
  
  // Modals
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [contactingItem, setContactingItem] = useState<MarketplaceItem | null>(null);

  // Form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<MarketplaceItem['category']>('Textbooks');
  const [newPrice, setNewPrice] = useState<number>(350);
  const [newCondition, setNewCondition] = useState<MarketplaceItem['condition']>('Good');
  const [newDesc, setNewDesc] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newEdition, setNewEdition] = useState('');

  // Contact form
  const [inquiryMessage, setInquiryMessage] = useState('Hi! Is this textbook still available? I can meet at Central Library or Canteen.');

  // Filtering & Sorting
  const filteredItems = items
    .filter((item) => {
      const matchesCat = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesCond = conditionFilter === 'all' || item.condition === conditionFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        item.title.toLowerCase().includes(q) ||
        (item.subject && item.subject.toLowerCase().includes(q)) ||
        (item.department && item.department.toLowerCase().includes(q)) ||
        item.description.toLowerCase().includes(q);
      return matchesCat && matchesCond && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0; // default newest
    });

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || newPrice <= 0) return;

    onAddItem({
      title: newTitle,
      category: newCategory,
      price: newPrice,
      condition: newCondition,
      sellerName: profile.name,
      sellerDept: profile.department.split('&')[0],
      sellerYear: profile.year.split(' ')[0],
      sellerContact: profile.email,
      subject: newSubject || undefined,
      edition: newEdition || undefined,
      description: newDesc,
      imagePlaceholder: newCategory
    });

    setShowCreateModal(false);
    setNewTitle('');
    setNewDesc('');
    setNewSubject('');
    setNewEdition('');
    onShowToast("Listing Live!", "Your textbook listing was published to the Aurelia student exchange.", "success");
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactingItem) return;
    onShowToast("Inquiry Delivered!", `Message sent to ${contactingItem.sellerName} at ${contactingItem.sellerContact}.`, "success");
    setContactingItem(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-emerald-400" />
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Aurelia Student Second-Hand Marketplace
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Buy and sell course textbooks, lab manuals, drawing drafters, and hostel essentials directly between batches.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-glow flex items-center gap-1.5 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>List Item for Sale</span>
        </button>
      </div>

      {/* Advanced Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-4 rounded-3xl glass-panel border border-white/10">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          {['all', 'Textbooks', 'Electronics', 'Study Aids', 'Hostel Gear'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-emerald-600 text-white shadow-glow'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              {cat === 'all' ? 'All Items' : cat}
            </button>
          ))}
        </div>

        {/* Condition + Sort + Search */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Condition Filter */}
          <select
            value={conditionFilter}
            onChange={(e) => setConditionFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none"
          >
            <option value="all" className="bg-[#0B1126]">All Conditions</option>
            <option value="Brand New" className="bg-[#0B1126]">Brand New</option>
            <option value="Like New" className="bg-[#0B1126]">Like New</option>
            <option value="Good" className="bg-[#0B1126]">Good</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none"
          >
            <option value="newest" className="bg-[#0B1126]">Newest First</option>
            <option value="price-low" className="bg-[#0B1126]">Price: Low to High</option>
            <option value="price-high" className="bg-[#0B1126]">Price: High to Low</option>
          </select>

          {/* Search */}
          <div className="relative w-full sm:w-52">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter title, subject..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Marketplace Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isSold = item.status === 'Sold';
          const isReserved = item.status === 'Reserved';

          return (
            <div
              key={item.id}
              className={`glass-panel-interactive rounded-3xl border border-white/10 p-5 flex flex-col justify-between text-left space-y-4 ${
                isSold ? 'opacity-60 grayscale' : ''
              }`}
            >
              <div className="space-y-3">
                {/* Top Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {item.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSold ? 'bg-rose-500/20 text-rose-300' :
                    isReserved ? 'bg-amber-500/20 text-amber-300' :
                    'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {item.status}
                  </span>
                </div>

                {/* Title & Price */}
                <div>
                  <h3 className="text-base font-bold text-white leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  {item.edition && (
                    <span className="text-[11px] font-mono text-cyan-400 block mt-0.5">
                      Edition: {item.edition}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-2xl font-black text-emerald-400">
                    ₹{item.price}
                  </span>
                  <span className="text-xs text-slate-400">
                    Condition: <strong className="text-white">{item.condition}</strong>
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Seller Bio Box */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1 text-xs text-slate-400">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Seller:</span>
                    <strong className="text-white">{item.sellerName}</strong>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span>Dept & Year:</span>
                    <span>{item.sellerDept} • {item.sellerYear}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                <span className="text-[10px] text-slate-400">
                  Posted {item.postedDate}
                </span>

                <div className="flex items-center gap-2">
                  {!isSold && (
                    <button
                      onClick={() => setContactingItem(item)}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-glow transition-all flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Contact Seller</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Listing Modal */}
      {showCreateModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowCreateModal(false)}
          title="List Second-Hand Item for Sale"
          subtitle="All deals are settled in-person on Aurelia campus"
        >
          <form onSubmit={handleCreateListing} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Item Title / Book Name:</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Higher Engineering Mathematics by B.S. Grewal"
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category:</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
                >
                  <option value="Textbooks">Textbooks</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Study Aids">Study Aids</option>
                  <option value="Hostel Gear">Hostel Gear</option>
                  <option value="Stationery">Stationery</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Price (₹ INR):</label>
                <input
                  type="number"
                  required
                  min={10}
                  max={50000}
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Condition:</label>
                <select
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
                >
                  <option value="Brand New">Brand New</option>
                  <option value="Like New">Like New</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Subject / Course (Optional):</label>
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. MA101 Calculus"
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Book Edition (Optional):</label>
                <input
                  type="text"
                  value={newEdition}
                  onChange={(e) => setNewEdition(e.target.value)}
                  placeholder="e.g. 8th Edition"
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Description & Handover Spot:</label>
              <textarea
                rows={3}
                required
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Mention page cleanliness, pencil marks, and where on campus you can meet..."
                className="w-full p-3 rounded-xl bg-black/40 border border-white/15 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-glow"
            >
              Publish Listing Immediately
            </button>
          </form>
        </Modal>
      )}

      {/* Contact Seller Modal */}
      {contactingItem && (
        <Modal
          isOpen={true}
          onClose={() => setContactingItem(null)}
          title={`Contact Seller: ${contactingItem.sellerName}`}
          subtitle={`Item: ${contactingItem.title} (₹${contactingItem.price})`}
        >
          <form onSubmit={handleSendInquiry} className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-slate-400 block text-[11px]">Seller Email:</span>
              <strong className="text-cyan-300 font-mono text-sm">{contactingItem.sellerContact}</strong>
              <div className="text-slate-400 text-[11px] mt-1">
                Department: {contactingItem.sellerDept} • {contactingItem.sellerYear}
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Your Inquiry Message:</label>
              <textarea
                rows={3}
                required
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                className="w-full p-3 rounded-xl bg-black/40 border border-white/15 text-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onUpdateStatus(contactingItem.id, 'Reserved');
                  onShowToast("Item Marked Reserved", `Reserved "${contactingItem.title}" under your account.`, "info");
                  setContactingItem(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 font-semibold"
              >
                Mark as Reserved
              </button>

              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-glow"
              >
                Send Message (Demo)
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
