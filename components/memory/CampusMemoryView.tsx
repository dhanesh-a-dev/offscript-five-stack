import React, { useState } from 'react';
import { 
  BookMarked, 
  Search, 
  ThumbsUp, 
  Bookmark, 
  Plus, 
  Share2, 
  Tag, 
  Sparkles, 
  Clock, 
  MapPin, 
  User, 
  Flag,
  CheckCircle2
} from 'lucide-react';
import { MemoryPost, StudentProfile } from '@/types';
import { Modal } from '../ui/Modal';

interface CampusMemoryViewProps {
  memories: MemoryPost[];
  profile: StudentProfile;
  onAddMemory: (post: Omit<MemoryPost, 'id' | 'date' | 'upvotes' | 'userUpvoted' | 'userBookmarked'>) => void;
  onToggleUpvote: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
}

export const CampusMemoryView: React.FC<CampusMemoryViewProps> = ({
  memories,
  profile,
  onAddMemory,
  onToggleUpvote,
  onToggleBookmark,
  onShowToast,
}) => {
  const [topicFilter, setTopicFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  // New post form state
  const [newTitle, setNewTitle] = useState('');
  const [newTopic, setNewTopic] = useState<MemoryPost['topic']>('Academics');
  const [newSubject, setNewSubject] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('Advice, Fresher');

  const filteredMemories = memories.filter((post) => {
    const matchesTopic = topicFilter === 'all' || post.topic === topicFilter;
    const matchesBookmark = !showBookmarksOnly || post.userBookmarked;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      post.title.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q) ||
      post.tags.some(t => t.toLowerCase().includes(q));
    return matchesTopic && matchesBookmark && matchesSearch;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    onAddMemory({
      title: newTitle,
      department: profile.department.split('&')[0],
      year: profile.year,
      semester: profile.semester,
      subject: newSubject || undefined,
      location: newLocation || undefined,
      topic: newTopic,
      content: newContent,
      author: profile.name,
      authorRole: `${profile.year} Student`,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean)
    });

    setShowCreateModal(false);
    setNewTitle('');
    setNewContent('');
    setNewSubject('');
    setNewLocation('');
    onShowToast("Campus Memory Inscribed", "Your advice has been archived for present and future Aurelia batches.", "success");
  };

  const handleUpvote = (post: MemoryPost) => {
    onToggleUpvote(post.id);
    const wasUpvoted = !!post.userUpvoted;
    onShowToast(wasUpvoted ? "Vote Removed" : "Marked Helpful!", wasUpvoted ? "Removed upvote." : "Thanks for validating peer wisdom.", "info");
  };

  const handleBookmark = (post: MemoryPost) => {
    onToggleBookmark(post.id);
    const wasBookmarked = !!post.userBookmarked;
    onShowToast(wasBookmarked ? "Removed from Saved" : "Saved to Vault!", wasBookmarked ? "Removed from bookmarks." : "Archived in your campus offline vault.", "info");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookMarked className="w-6 h-6 text-violet-400" />
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Aurelia Campus Memory Vault
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Preserving student survival hacks, secret library corners, exam advice, and institutional memory.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-glow flex items-center gap-1.5 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Leave Advice for Juniors</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl glass-panel border border-white/10">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {['all', 'Academics', 'Campus Secret', 'Hostel Life', 'Exam Prep', 'Transport'].map((top) => (
            <button
              key={top}
              onClick={() => {
                setTopicFilter(top);
                setShowBookmarksOnly(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                topicFilter === top && !showBookmarksOnly
                  ? 'bg-violet-600 text-white shadow-glow'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              {top === 'all' ? 'All Wisdom' : top}
            </button>
          ))}
          <button
            onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              showBookmarksOnly
                ? 'bg-amber-600 text-white shadow-glow'
                : 'bg-white/5 hover:bg-white/10 text-amber-300'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>My Bookmarks</span>
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search memory vault..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-violet-400"
          />
        </div>
      </div>

      {/* Memory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMemories.map((post) => (
          <div
            key={post.id}
            className="glass-panel-interactive rounded-3xl border border-white/10 p-6 flex flex-col justify-between text-left space-y-4"
          >
            <div className="space-y-3">
              {/* Category & Tags */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 text-[10px] font-bold uppercase tracking-wider">
                  {post.topic}
                </span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.date}
                </span>
              </div>

              <h3 className="text-base font-bold text-white leading-snug">
                {post.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                {post.content}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] font-mono text-cyan-300 bg-white/5 border border-white/5 px-2 py-0.5 rounded-lg">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Author Attribution */}
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-violet-600/30 text-violet-300 flex items-center justify-center font-bold text-[10px]">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <span className="text-white font-semibold block">{post.author}</span>
                    <span className="text-[10px] text-slate-400">{post.authorRole}</span>
                  </div>
                </div>

                {post.location && (
                  <span className="text-[11px] text-indigo-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-cyan-400" /> {post.location}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Actions: Upvote, Bookmark, Report */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleUpvote(post)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                    post.userUpvoted
                      ? 'bg-violet-600 text-white font-bold shadow-glow'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                  title="Mark this tip as helpful"
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${post.userUpvoted ? 'text-cyan-300' : ''}`} />
                  <span>{post.upvotes} Helpful</span>
                </button>

                <button
                  onClick={() => handleBookmark(post)}
                  className={`p-1.5 rounded-xl transition-all ${
                    post.userBookmarked
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-white/5 hover:bg-white/10 text-slate-400'
                  }`}
                  title={post.userBookmarked ? 'Saved to vault' : 'Save bookmark'}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => onShowToast("Report Logged", "Community moderators will review this submission.", "info")}
                className="text-slate-500 hover:text-slate-300 p-1"
                title="Flag inappropriate tip"
              >
                <Flag className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Post Advice Modal */}
      {showCreateModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowCreateModal(false)}
          title="Inscribe Campus Memory & Advice"
          subtitle="Pass on real wisdom to juniors so they don't have to start from zero"
        >
          <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Headline / Core Tip:</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. How to ace the Mid-Term Calculus exam without staying up all night"
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Wisdom Category:</label>
                <select
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
                >
                  <option value="Academics">Academics</option>
                  <option value="Campus Secret">Campus Secret</option>
                  <option value="Hostel Life">Hostel Life</option>
                  <option value="Exam Prep">Exam Prep</option>
                  <option value="Clubs">Clubs</option>
                  <option value="Transport">Transport</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Relevant Campus Location:</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. Central Library 3rd Floor"
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Your Detailed Advice & Instructions:</label>
              <textarea
                rows={4}
                required
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Explain step-by-step: what worked, what professors look for, or where to find resources..."
                className="w-full p-3 rounded-xl bg-black/40 border border-white/15 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Tags (Comma-separated):</label>
              <input
                type="text"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
                placeholder="Advice, StudySpots, FirstYear"
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-all shadow-glow"
            >
              Preserve Advice in Campus Vault
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

