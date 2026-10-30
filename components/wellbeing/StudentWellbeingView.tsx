import React, { useState } from 'react';
import { 
  HeartPulse, 
  PhoneCall, 
  ShieldAlert, 
  UserCheck, 
  Clock, 
  MapPin, 
  Mail, 
  AlertTriangle, 
  Send, 
  CheckCircle2, 
  HelpCircle,
  Stethoscope,
  LifeBuoy
} from 'lucide-react';
import { WELLBEING_RESOURCES } from '@/data/mockData';
import { Modal } from '../ui/Modal';

interface StudentWellbeingViewProps {
  onShowToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
}

export const StudentWellbeingView: React.FC<StudentWellbeingViewProps> = ({ onShowToast }) => {
  const [showAppointmentModal, setShowAppointmentModal] = useState<boolean>(false);
  const [appointmentTopic, setAppointmentTopic] = useState<string>('Academic Burnout');
  const [showGrievanceModal, setShowGrievanceModal] = useState<boolean>(false);

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAppointmentModal(false);
    onShowToast("Confidential Session Booked", "A counsellor will email you a private meeting link and room slot within 2 business hours.", "success");
  };

  const handleFileGrievance = (e: React.FormEvent) => {
    e.preventDefault();
    setShowGrievanceModal(false);
    onShowToast("Report Logged Securely", "Your confidential report #GRV-2026-99 is routed to the Dean of Student Affairs.", "info");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <HeartPulse className="w-6 h-6 text-rose-400" />
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Student Wellbeing Sanctuary & Safety
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            24/7 confidential campus healthcare, psychological counselling, anti-ragging squad, and grievance protection.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs">
          <LifeBuoy className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span>100% Confidential Demo Support</span>
        </div>
      </div>

      {/* 24/7 Red SOS Emergency Strip */}
      <div className="glass-panel rounded-3xl border border-rose-500/40 p-6 bg-gradient-to-r from-rose-950/40 via-[#1A0E1A] to-slate-950/60 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-rose-500/20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-300">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Emergency Response Matrix</h3>
              <p className="text-xs text-rose-200/80">Immediate campus assistance for physical or personal safety emergencies</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/80 px-2.5 py-1 rounded-full border border-rose-500/40">
            24/7 ACTIVE DISPATCH
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {WELLBEING_RESOURCES.emergencyContacts.slice(0, 3).map((contact, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
              <span className="text-xs font-semibold text-white block">{contact.name}</span>
              <p className="text-[11px] text-slate-400">{contact.desc}</p>
              <div className="pt-2 flex items-center justify-between">
                <span className="font-mono text-sm font-black text-rose-400">{contact.phone}</span>
                <span className="text-[10px] text-slate-400">Toll Free</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Pillars: Medical Centre & Psychological Sanctuary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Healthcare & Medical Clinic */}
        <div className="glass-panel rounded-3xl border border-white/10 p-6 flex flex-col justify-between text-left space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Campus Health & Medical Centre</h3>
                <p className="text-xs text-slate-400">North Wing, Adjacent to Falcon Hostel</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Equipped with a 24-hour resident physician, trained nursing triage, dispensary providing essential medications, and emergency ambulances on campus standby.
            </p>

            <div className="space-y-2 text-xs bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="flex justify-between">
                <span className="text-slate-400">OPD Consultation Hours:</span>
                <strong className="text-white">08:30 AM - 07:00 PM (Mon - Sat)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Emergency Casualty Ward:</span>
                <span className="text-emerald-400 font-bold">Open 24/7 365 Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Pharmacy Desk:</span>
                <span className="text-slate-300">Ground Floor Room 104</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-400">Call Medical OPD: +91 555-0911</span>
            <button
              onClick={() => onShowToast("Medical Centre Info", "Health Centre is at North Gate, 4 min walk from Central Quad.", "info")}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
            >
              Directions to Clinic
            </button>
          </div>
        </div>

        {/* Psychological Counselling Sanctuary */}
        <div className="glass-panel rounded-3xl border border-white/10 p-6 flex flex-col justify-between text-left space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Student Counselling Sanctuary</h3>
                <p className="text-xs text-slate-400">Private Consult Suites, Room 102 Health Centre</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              University life can bring academic stress, homesickness, or relationship anxieties. Professional licensed psychologists are here to support you in strict confidence without judgment.
            </p>

            <div className="space-y-2 text-xs bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="flex justify-between">
                <span className="text-slate-400">Confidentiality Guarantee:</span>
                <strong className="text-indigo-300">100% Private (No records on academic portal)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Cost:</span>
                <strong className="text-emerald-400">Free for all enrolled Aurelia students</strong>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-400">Direct Helpline: +91 555-0720</span>
            <button
              onClick={() => setShowAppointmentModal(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-glow transition-all"
            >
              Book Private Session
            </button>
          </div>
        </div>
      </div>

      {/* Whom to Approach Guide Matrix */}
      <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-cyan-400" />
              <span>Campus Guidance: Whom to Approach When?</span>
            </h3>
            <p className="text-xs text-slate-400">Clear path for who solves what on campus</p>
          </div>
          <button
            onClick={() => setShowGrievanceModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-colors"
          >
            File Official Grievance
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WELLBEING_RESOURCES.guidanceCards.map((card, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border border-white/10 bg-gradient-to-br ${card.color} space-y-2 text-left`}
            >
              <h4 className="text-sm font-bold text-white">{card.title}</h4>
              <div className="text-xs font-semibold text-cyan-300">
                Approach: {card.approach}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {card.details}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Counselling Booking Modal */}
      {showAppointmentModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowAppointmentModal(false)}
          title="Book Private Counselling Session"
          subtitle="Strictly confidential • Mental health sanctuary"
        >
          <form onSubmit={handleBookSession} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Select Topic of Discussion:</label>
              <select
                value={appointmentTopic}
                onChange={(e) => setAppointmentTopic(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:border-indigo-400"
              >
                <option value="Academic Burnout & Exam Anxiety">Academic Burnout & Exam Anxiety</option>
                <option value="Homesickness & First-Year Transition">Homesickness & First-Year Transition</option>
                <option value="Social Anxiety & Peer Pressure">Social Anxiety & Peer Pressure</option>
                <option value="General Wellbeing & Mindfulness">General Wellbeing & Mindfulness</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Preferred Time of Day:</label>
              <select className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:border-indigo-400">
                <option>Morning (10:00 AM - 12:00 PM)</option>
                <option>Afternoon (02:00 PM - 04:00 PM)</option>
                <option>Evening (04:30 PM - 06:30 PM)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Additional Note (Optional):</label>
              <textarea
                rows={3}
                placeholder="Anything you would like the counsellor to know beforehand..."
                className="w-full p-3 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
              />
            </div>

            <p className="text-[11px] text-slate-400">
              Your appointment details are encrypted and sent only to the Chief Psychological Counsellor.
            </p>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-glow"
            >
              Confirm Confidential Booking (Demo)
            </button>
          </form>
        </Modal>
      )}

      {/* Official Grievance Modal */}
      {showGrievanceModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowGrievanceModal(false)}
          title="Submit Formal Grievance or Anti-Ragging Notice"
          subtitle="Dean of Student Affairs & Internal Complaints Committee"
        >
          <form onSubmit={handleFileGrievance} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Grievance Nature:</label>
              <select className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white">
                <option>Anti-Ragging / Bullying Complaint</option>
                <option>Hostel Welfare or Facilities Discrepancy</option>
                <option>Discriminatory Behavior or Harassment</option>
                <option>Academic Irregularity</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Incident Description & Location:</label>
              <textarea
                rows={4}
                required
                placeholder="Provide factual details, dates, and locations. Anonymous submissions are honored."
                className="w-full p-3 rounded-xl bg-black/40 border border-white/15 text-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="anon" defaultChecked className="rounded bg-black/40 border-white/20" />
              <label htmlFor="anon" className="text-slate-300">File anonymously without disclosing student ID</label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-all shadow-glow"
            >
              Submit Report for Administrative Review
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};
