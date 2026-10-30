import React, { useState } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  Clock, 
  FileText, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  MapPin,
  ListTodo,
  Check
} from 'lucide-react';
import { 
  TimetableEntry, 
  ExamScheduleItem, 
  AssignmentItem, 
  StudyResource, 
  StudentProfile 
} from '@/types';

interface AcademicKitViewProps {
  profile: StudentProfile;
  timetable: TimetableEntry[];
  exams: ExamScheduleItem[];
  assignments: AssignmentItem[];
  resources: StudyResource[];
  onShowToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
}

export const AcademicKitView: React.FC<AcademicKitViewProps> = ({
  profile,
  timetable,
  exams,
  assignments: initialAssignments,
  resources,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'timetable' | 'exams' | 'assignments' | 'resources' | 'faqs'>('timetable');
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [assignments, setAssignments] = useState<AssignmentItem[]>(initialAssignments);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const daySchedule = timetable.filter(entry => entry.day === selectedDay);

  const toggleAssignmentStatus = (id: string) => {
    setAssignments(prev => prev.map(asg => {
      if (asg.id === id) {
        let nextStatus: AssignmentItem['status'] = 'Pending';
        if (asg.status === 'Pending') nextStatus = 'In Progress';
        else if (asg.status === 'In Progress') nextStatus = 'Submitted';
        else nextStatus = 'Pending';
        onShowToast("Assignment Updated", `Marked "${asg.title.slice(0, 24)}..." as ${nextStatus}`, "info");
        return { ...asg, status: nextStatus };
      }
      return asg;
    }));
  };

  const handleDownloadResource = (res: StudyResource) => {
    onShowToast("Download Started", `Cached "${res.title}" for offline study (${res.size})`, "success");
  };

  const academicFaqs = [
    {
      q: "What is the mandatory attendance threshold at Aurelia University?",
      a: "Aurelia University requires an absolute minimum of 75% attendance in each registered subject to be eligible to sit for the End-Semester Final Examinations. Medical certificates must be submitted to the Academic Dean's desk within 5 working days of absence."
    },
    {
      q: "How does the Relative Grading & CGPA system work?",
      a: "Courses follow a 10-point credit index: Grade O (10), A+ (9), A (8), B+ (7), B (6), C (5), and F (Fail). Semester Grade Point Average (SGPA) is computed by multiplying subject credits with acquired grade points divided by total semester credits."
    },
    {
      q: "Where do I apply for official re-evaluation or paper review?",
      a: "Students can request an academic review within 14 calendar days of result publication at the Administration Academic Counter 2. A nominal review fee of ₹300 per subject is credited to the examination fund."
    },
    {
      q: "How many backlogs are permissible for campus placement eligibility?",
      a: "Major recruitment drives in 4th year require 0 active standing backlogs and a minimum cumulative CGPA of 7.00. Remedial summer semester examinations are conducted in July every year."
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-indigo-400" />
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Academic Survival Kit
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Department curriculum, weekly timetable, exam venues, and student study repositories.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 rounded-2xl glass-panel border border-white/10 scrollbar-none bg-black/30">
          {[
            { id: 'timetable', label: 'Class Schedule', icon: Clock },
            { id: 'exams', label: 'Exam Dates', icon: Calendar },
            { id: 'assignments', label: 'Assignments', icon: ListTodo },
            { id: 'resources', label: 'Study Repos', icon: FileText },
            { id: 'faqs', label: 'Academic FAQs', icon: HelpCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-glow border border-indigo-400/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Student Department Card Banner */}
      <div className="p-4 rounded-2xl glass-panel border border-white/10 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-indigo-950/40 to-blue-950/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center font-bold text-sm text-indigo-300">
            CS
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">{profile.department}</h3>
            <p className="text-xs text-slate-400">Current Cohort: {profile.year} • {profile.semester}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
            Enrolled: <strong>6 Courses (22 Credits)</strong>
          </span>
          <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium">
            Attendance: <strong>91.4% (Good Standing)</strong>
          </span>
        </div>
      </div>

      {/* TAB 1: WEEKLY TIMETABLE */}
      {activeTab === 'timetable' && (
        <div className="space-y-4">
          {/* Day selection buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedDay === day
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-glow'
                    : 'glass-panel hover:bg-white/10 text-slate-300'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Schedule list for the day */}
          <div className="space-y-3">
            {daySchedule.map((entry, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-white/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-400/40 transition-all text-left"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs font-bold shrink-0">
                    {entry.time.split(' - ')[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-300 bg-indigo-950/60 border border-indigo-800/40 px-2 py-0.5 rounded">
                        {entry.courseCode}
                      </span>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        entry.type === 'Lab' 
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                          : entry.type === 'Lecture' 
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {entry.type}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mt-1">{entry.courseName}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Faculty: {entry.instructor}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-slate-300 bg-black/30 px-3 py-1.5 rounded-xl border border-white/5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Room: <strong className="text-white">{entry.room}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: EXAM SCHEDULE */}
      {activeTab === 'exams' && (
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-white">Semester 1 Mid-Term Exam Roster</h3>
              <p className="text-xs text-slate-400">All venues require Aurelia Physical Student ID card</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-semibold">
              Admit Card: Verified
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 text-slate-400 uppercase tracking-wider text-[10px] border-b border-white/5">
                <tr>
                  <th className="p-4">Course</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Timing</th>
                  <th className="p-4">Exam Hall</th>
                  <th className="p-4">Seat Allocation</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {exams.map((ex) => (
                  <tr key={ex.id} className="hover:bg-white/[0.04] transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white">{ex.courseName}</div>
                      <div className="font-mono text-cyan-300 text-[11px]">{ex.courseCode}</div>
                    </td>
                    <td className="p-4 font-semibold text-white">{ex.date}</td>
                    <td className="p-4">{ex.time}</td>
                    <td className="p-4 text-indigo-300 font-medium">{ex.venue}</td>
                    <td className="p-4 font-mono text-[11px]">{ex.seatRange}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold text-[10px]">
                        {ex.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ASSIGNMENT TRACKER */}
      {activeTab === 'assignments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white">Continuous Assessment Submissions</h3>
            <span className="text-xs text-slate-400">Click circle to change status (Pending → In Progress → Submitted)</span>
          </div>

          <div className="space-y-3">
            {assignments.map((asg) => {
              const isDone = asg.status === 'Submitted';
              const isInProg = asg.status === 'In Progress';
              return (
                <div
                  key={asg.id}
                  className={`glass-panel rounded-2xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all text-left ${
                    isDone ? 'border-emerald-500/30 bg-emerald-950/10 opacity-75' : 'border-white/10 hover:border-indigo-400/40'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleAssignmentStatus(asg.id)}
                      className={`w-6 h-6 rounded-lg mt-0.5 flex items-center justify-center border transition-all ${
                        isDone 
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950' 
                          : isInProg 
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300' 
                          : 'border-white/20 text-transparent hover:border-white/40'
                      }`}
                      title="Click to cycle status"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-indigo-300">{asg.courseCode}</span>
                        <span className="text-[10px] text-slate-400">Weightage: {asg.points} pts</span>
                      </div>
                      <h4 className={`text-sm font-bold text-white mt-0.5 ${isDone ? 'line-through text-slate-400' : ''}`}>
                        {asg.title}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1">{asg.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-start sm:self-auto text-xs">
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px]">Due Date</span>
                      <strong className="text-amber-300">{asg.dueDate}</strong>
                    </div>
                    <span className={`px-2.5 py-1 rounded-xl text-xs font-bold uppercase ${
                      isDone ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                      isInProg ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                      'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}>
                      {asg.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: STUDY RESOURCES */}
      {activeTab === 'resources' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((res) => (
            <div
              key={res.id}
              className="glass-panel-interactive rounded-2xl border border-white/10 p-5 flex flex-col justify-between text-left space-y-3"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-400/30">
                    {res.type}
                  </span>
                  <span className="text-slate-400">{res.size}</span>
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">{res.title}</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Subject: {res.subject} • Shared by {res.author}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400">🔥 {res.downloads} student downloads</span>
                <button
                  onClick={() => handleDownloadResource(res)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center gap-1.5 shadow-glow transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: ACADEMIC FAQS */}
      {activeTab === 'faqs' && (
        <div className="space-y-3">
          {academicFaqs.map((faq, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-white/10 overflow-hidden text-left transition-all"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  className="w-full p-4 flex items-center justify-between gap-3 text-left font-semibold text-sm text-white hover:text-indigo-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
