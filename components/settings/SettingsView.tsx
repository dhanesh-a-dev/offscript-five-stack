import React, { useState } from 'react';
import { 
  Settings, 
  Sun, 
  Moon, 
  Wifi, 
  WifiOff, 
  Download, 
  User, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Smartphone,
  Eye
} from 'lucide-react';
import { StudentProfile } from '@/types';

interface SettingsViewProps {
  profile: StudentProfile;
  onUpdateProfile: (profile: StudentProfile) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  offlineReady: boolean;
  onToggleOffline: () => void;
  onResetAllData: () => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  profile,
  onUpdateProfile,
  theme,
  onToggleTheme,
  offlineReady,
  onToggleOffline,
  onResetAllData,
  onShowToast,
}) => {
  const [name, setName] = useState(profile.name);
  const [department, setDepartment] = useState(profile.department);
  const [year, setYear] = useState(profile.year);
  const [email, setEmail] = useState(profile.email);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const updated: StudentProfile = {
      ...profile,
      name,
      department,
      year,
      email,
      avatar: initials || 'ST'
    };

    onUpdateProfile(updated);
    onShowToast("Profile Updated!", "Student card details saved successfully.", "success");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Settings className="w-6 h-6 text-indigo-400" />
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Perseus Platform Settings & Offline Vault
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Personalize theme appearance, sync offline survival guides, and manage student profile data.
        </p>
      </div>

      {/* Feature 14: Offline Campus Guide Card */}
      <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-4 bg-gradient-to-r from-blue-950/40 via-[#0F1735] to-indigo-950/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl ${offlineReady ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-white/5 text-slate-400'}`}>
              {offlineReady ? <Wifi className="w-6 h-6 text-emerald-400" /> : <WifiOff className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Offline Campus Guide (Feature 14)</h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  offlineReady ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-500/20 text-slate-400'
                }`}>
                  {offlineReady ? 'Cached & Available' : 'Not Cached'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Pre-caches campus map, transit routes, and emergency SOS contacts for weak Wi-Fi or basement labs.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              onToggleOffline();
              onShowToast(
                offlineReady ? "Offline Cache Cleared" : "Offline Campus Cache Ready!",
                offlineReady ? "Local guide cache disabled." : "Map, schedules, and emergency contacts are now cached in browser memory.",
                offlineReady ? "info" : "success"
              );
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-glow flex items-center gap-2 self-start sm:self-auto ${
              offlineReady
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>{offlineReady ? 'Update Cache' : 'Cache Campus Guide (1.2 MB)'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-black/30 border border-white/5">
            <span className="font-semibold text-cyan-300 block">✓ Illustrated Map</span>
            <p className="text-[11px] text-slate-400 mt-0.5">All 13 building coordinates, opening hours, and walking paths</p>
          </div>
          <div className="p-3 rounded-xl bg-black/30 border border-white/5">
            <span className="font-semibold text-emerald-300 block">✓ Transit Timetable</span>
            <p className="text-[11px] text-slate-400 mt-0.5">All 3 campus shuttle lines, sequence of stops, and first/last runs</p>
          </div>
          <div className="p-3 rounded-xl bg-black/30 border border-white/5">
            <span className="font-semibold text-rose-300 block">✓ Emergency Matrix</span>
            <p className="text-[11px] text-slate-400 mt-0.5">Medical clinic, anti-ragging helpline, and proctor phone numbers</p>
          </div>
        </div>
      </div>

      {/* Theme & Display Mode */}
      <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-4 text-left">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <Eye className="w-4 h-4 text-cyan-400" />
          <span>Appearance & Dark Glassmorphism Mode</span>
        </h3>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
          <div>
            <strong className="text-white text-xs block">Active Theme: {theme === 'dark' ? 'Dark Glassmorphism (Default)' : 'Crisp Light Mode'}</strong>
            <p className="text-xs text-slate-400 mt-0.5">
              Dark mode features deep navy `#080D1C` with luminous glass borders. Preference persists across sessions.
            </p>
          </div>

          <button
            onClick={onToggleTheme}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-semibold text-white flex items-center gap-2 transition-colors self-start sm:self-auto shrink-0"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-300" />
                <span>Switch to Light Theme</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>Switch to Dark Theme</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Student Profile Card Editor */}
      <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-4 text-left">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <User className="w-4 h-4 text-indigo-400" />
          <span>Student Profile Information</span>
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Student Full Name:</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Student University Email:</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Department / Branch:</label>
              <input
                type="text"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Academic Year:</label>
              <input
                type="text"
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-glow"
            >
              Save Student Profile
            </button>
          </div>
        </form>
      </div>

      {/* Reset Cache and Seed Data */}
      <div className="glass-panel rounded-3xl border border-white/10 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
        <div>
          <h4 className="font-bold text-sm text-white">Reset Demo Environment</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Clear all created mock posts and revert back to default Aurelia sample data.
          </p>
        </div>
        <button
          onClick={() => {
            onResetAllData();
            onShowToast("Local State Reset", "Restored factory demo settings.", "info");
          }}
          className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Data</span>
        </button>
      </div>
    </div>
  );
};
