import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Search, 
  Mail, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Send, 
  BookOpen, 
  UserCheck,
  Star,
  Clock
} from 'lucide-react';
import { SeniorMentor } from '@/types';
import { Modal } from '../ui/Modal';

interface SeniorConnectViewProps {
  mentors: SeniorMentor[];
  requestedMentorIds: Record<string, boolean>;
  onRequestMentorship: (mentorId: string) => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
}

export const SeniorConnectView: React.FC<SeniorConnectViewProps> = ({
  mentors,
  requestedMentorIds,
  onRequestMentorship,
  onShowToast,
}) => {
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [interestFilter, setInterestFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMentor, setSelectedMentor] = useState<SeniorMentor | null>(null);
  const [mentorRequestNote, setMentorRequestNote] = useState<string>('Hi, I am a 1st-year student interested in your project advice and tech mentorship.');

  const filteredMentors = mentors.filter((m) => {
    const matchesDept = departmentFilter === 'all' || m.department.toLowerCase().includes(departmentFilter.toLowerCase());
    const matchesInterest = interestFilter === 'all' || m.interests.some(i => i.toLowerCase().includes(interestFilter.toLowerCase())) || m.skills.some(s => s.toLowerCase().includes(interestFilter.toLowerCase()));
    const q = searchQuery.toLowerCase();
    const matchesSearch = m.name.toLowerCase().includes(q) || m.skills.some(s => s.toLowerCase().includes(q)) || m.bio.toLowerCase().includes(q);
    return matchesDept && matchesInterest && matchesSearch;
  });

  const handleSendRequest = (mentor: SeniorMentor) => {
    onRequestMentorship(mentor.id);
    setSelectedMentor(null);
    onShowToast("Mentorship Request Sent!", `Your request was delivered to ${mentor.name}. They will reach out via student email.`, "success");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-6 h-6 text-indigo-400" />
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Senior Student Mentorship Guild
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Connect directly with verified 3rd and 4th-year students for career tips, coursework guidance, and research insights.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs">
          <Star className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Fictional Peer Mentorship Network</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl glass-panel border border-white/10">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {['all', 'Computer Science', 'Mechanical', 'Electronics', 'Information Tech'].map((dept) => (
            <button
              key={dept}
              onClick={() => setDepartmentFilter(dept)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                departmentFilter === dept
                  ? 'bg-indigo-600 text-white shadow-glow'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              {dept === 'all' ? 'All Departments' : dept}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by skill, name..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400"
          />
        </div>
      </div>

      {/* Senior Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMentors.map((mentor) => {
          const isRequested = !!requestedMentorIds[mentor.id];
          return (
            <div
              key={mentor.id}
              className="glass-panel-interactive rounded-3xl border border-white/10 p-6 flex flex-col justify-between text-left space-y-4"
            >
              <div className="space-y-4">
                {/* Mentor Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-base text-white shadow-glow">
                      {mentor.avatarUrl}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{mentor.name}</h3>
                      <p className="text-xs text-indigo-300 font-medium">{mentor.department}</p>
                      <span className="text-[11px] text-slate-400">{mentor.year}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {mentor.gpaBadge}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {mentor.bio}
                </p>

                {/* Skills & Domains */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Areas of Expertise:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {mentor.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-cyan-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mentor's Golden Tip */}
                <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 space-y-1 text-xs">
                  <span className="font-bold text-indigo-300 flex items-center gap-1 text-[11px]">
                    <Sparkles className="w-3 h-3 text-cyan-400" /> Senior's Golden Tip:
                  </span>
                  <p className="text-slate-300 italic">"{mentor.topTip}"</p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {mentor.availableSlots} mentorship slots left
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedMentor(mentor)}
                    className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white transition-colors"
                  >
                    View Card
                  </button>
                  <button
                    onClick={() => handleSendRequest(mentor)}
                    disabled={isRequested}
                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      isRequested
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-glow'
                    }`}
                  >
                    {isRequested ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Requested</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Request Mentorship</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Mentor Profile Modal */}
      {selectedMentor && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedMentor(null)}
          title={`Mentor Profile: ${selectedMentor.name}`}
          subtitle={`${selectedMentor.department} • ${selectedMentor.year}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Academic Standing:</span>
                <span className="text-emerald-400 font-bold">{selectedMentor.gpaBadge}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fictional Email:</span>
                <span className="text-cyan-300 font-mono">{selectedMentor.contactEmail}</span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">{selectedMentor.bio}</p>

            <div className="space-y-1.5">
              <span className="font-bold text-slate-300">Message to Senior:</span>
              <textarea
                rows={3}
                value={mentorRequestNote}
                onChange={(e) => setMentorRequestNote(e.target.value)}
                className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-indigo-400"
              />
            </div>

            <button
              onClick={() => handleSendRequest(selectedMentor)}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-glow flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Confirm & Dispatch Mentorship Request</span>
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

