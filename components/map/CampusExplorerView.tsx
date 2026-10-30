import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  MapPin, 
  Search, 
  Clock, 
  Phone, 
  Mail, 
  Navigation, 
  Footprints, 
  Layers, 
  Info, 
  Sparkles,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Building,
  Coffee,
  Trophy,
  Bus,
  Shield
} from 'lucide-react';
import { CampusLocation } from '@/types';

interface CampusExplorerViewProps {
  locations: CampusLocation[];
  searchQuery?: string;
}

export const CampusExplorerView: React.FC<CampusExplorerViewProps> = ({ 
  locations,
  searchQuery: initialSearch = ''
}) => {
  const [selectedLocationId, setSelectedLocationId] = useState<string>('loc-lib');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState<string>(initialSearch);
  const [routeFromId, setRouteFromId] = useState<string>('loc-gate');
  const [showDirectionsMode, setShowDirectionsMode] = useState<boolean>(false);

  // Filtered locations
  const filteredLocations = useMemo(() => {
    return locations.filter((loc) => {
      const matchesCategory = activeCategory === 'all' || loc.category === activeCategory;
      const q = localSearch.toLowerCase();
      const matchesSearch = 
        loc.name.toLowerCase().includes(q) || 
        loc.description.toLowerCase().includes(q) ||
        loc.code.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [locations, activeCategory, localSearch]);

  const selectedLoc = locations.find(l => l.id === selectedLocationId) || locations[0];
  const fromLoc = locations.find(l => l.id === routeFromId) || locations[0];

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'academic': return 'text-indigo-400 bg-indigo-500/20 border-indigo-500/40';
      case 'dining': return 'text-amber-400 bg-amber-500/20 border-amber-500/40';
      case 'sports': return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/40';
      case 'transport': return 'text-cyan-400 bg-cyan-500/20 border-cyan-500/40';
      case 'admin': return 'text-purple-400 bg-purple-500/20 border-purple-500/40';
      default: return 'text-sky-400 bg-sky-500/20 border-sky-500/40';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'academic': return Building;
      case 'dining': return Coffee;
      case 'sports': return Trophy;
      case 'transport': return Bus;
      case 'admin': return Shield;
      default: return MapPin;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Aurelia University Interactive Map
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Original top-down campus layout. Click any building marker to inspect hours, amenities, and walking paths.
          </p>
        </div>

        {/* Demo Disclaimer Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs">
          <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>Fictional Aurelia Campus layout (No external live map API)</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl glass-panel border border-white/10">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'All Zones' },
            { id: 'academic', label: 'Academic' },
            { id: 'facility', label: 'Facilities' },
            { id: 'transport', label: 'Transport' },
            { id: 'sports', label: 'Sports' },
            { id: 'dining', label: 'Dining' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-glow border border-indigo-400/40'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Filter buildings & gates..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400"
          />
        </div>
      </div>

      {/* Main Grid: Interactive Map + Location Directory List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Interactive SVG Top-Down Illustrated Map */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="relative aspect-[4/3] w-full rounded-3xl glass-panel border border-white/15 overflow-hidden bg-[#070B18] shadow-2xl">
            {/* SVG Top-down Campus Illustration */}
            <svg
              viewBox="0 0 1000 750"
              className="w-full h-full object-cover select-none"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Patterns and gradients */}
                <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#151E3D" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#070B18" stopOpacity="1" />
                </radialGradient>

                <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#253258" />
                  <stop offset="100%" stopColor="#1E2A4A" />
                </linearGradient>

                <pattern id="campusGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                </pattern>

                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background fill */}
              <rect width="1000" height="750" fill="url(#bgGlow)" />
              <rect width="1000" height="750" fill="url(#campusGrid)" />

              {/* Campus Boundary Wall / Ring Road */}
              <rect
                x="60"
                y="50"
                width="880"
                height="650"
                rx="35"
                fill="none"
                stroke="rgba(101, 88, 245, 0.25)"
                strokeWidth="2"
                strokeDasharray="8 6"
              />

              {/* Green Lawns & Courtyards */}
              {/* Botanical Quad */}
              <path
                d="M 380 280 Q 500 240 620 280 T 620 400 Q 500 440 380 400 Z"
                fill="rgba(16, 185, 129, 0.12)"
                stroke="rgba(16, 185, 129, 0.25)"
                strokeWidth="1.5"
              />
              {/* Sports Ground Field */}
              <rect
                x="700"
                y="280"
                width="180"
                height="150"
                rx="30"
                fill="rgba(16, 185, 129, 0.18)"
                stroke="rgba(16, 185, 129, 0.4)"
                strokeWidth="2"
              />
              {/* Running Track Oval */}
              <ellipse
                cx="790"
                cy="355"
                rx="70"
                ry="55"
                fill="none"
                stroke="rgba(244, 63, 94, 0.4)"
                strokeWidth="4"
              />

              {/* Primary Campus Roads */}
              {/* Main South-North Avenue */}
              <path
                d="M 500 680 L 500 520 L 480 340 L 480 120"
                fill="none"
                stroke="url(#roadGrad)"
                strokeWidth="32"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 500 680 L 500 520 L 480 340 L 480 120"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2"
                strokeDasharray="10 8"
                opacity="0.4"
              />

              {/* East-West Radial Connector */}
              <path
                d="M 180 380 L 820 380"
                fill="none"
                stroke="url(#roadGrad)"
                strokeWidth="26"
                strokeLinecap="round"
              />

              {/* Diagonal pathways to CS and SAC */}
              <path
                d="M 480 520 L 220 580"
                fill="none"
                stroke="url(#roadGrad)"
                strokeWidth="20"
                strokeLinecap="round"
              />
              <path
                d="M 480 340 L 680 250"
                fill="none"
                stroke="url(#roadGrad)"
                strokeWidth="20"
                strokeLinecap="round"
              />

              {/* Active Route Walking Path (if directions enabled) */}
              {showDirectionsMode && selectedLoc && fromLoc && (
                <path
                  d={`M ${fromLoc.x * 10} ${fromLoc.y * 7.5} Q 500 375 ${selectedLoc.x * 10} ${selectedLoc.y * 7.5}`}
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="5"
                  strokeDasharray="8 6"
                  className="animate-pulse"
                  filter="url(#neonGlow)"
                />
              )}

              {/* Central Fountain in Quad */}
              <circle cx="480" cy="340" r="22" fill="#1E3A8A" stroke="#38BDF8" strokeWidth="2" />
              <circle cx="480" cy="340" r="10" fill="#38BDF8" opacity="0.6" className="animate-ping" />

              {/* Building Footprint Blocks */}
              {locations.map((loc) => {
                const isSelected = loc.id === selectedLocationId;
                const isFrom = showDirectionsMode && loc.id === routeFromId;
                const px = loc.x * 10;
                const py = loc.y * 7.5;

                return (
                  <g 
                    key={loc.id} 
                    className="cursor-pointer transition-transform hover:scale-110"
                    onClick={() => {
                      setSelectedLocationId(loc.id);
                    }}
                  >
                    {/* Shadow / Footprint */}
                    <rect
                      x={px - 36}
                      y={py - 24}
                      width="72"
                      height="48"
                      rx="10"
                      fill={isSelected ? 'rgba(99, 102, 241, 0.4)' : 'rgba(30, 41, 75, 0.8)'}
                      stroke={isSelected ? '#38BDF8' : 'rgba(255, 255, 255, 0.15)'}
                      strokeWidth={isSelected ? 3 : 1}
                      filter={isSelected ? 'url(#neonGlow)' : undefined}
                    />

                    {/* Building Code Label */}
                    <text
                      x={px}
                      y={py - 30}
                      textAnchor="middle"
                      fill={isSelected ? '#38BDF8' : '#E2E8F0'}
                      fontSize="11"
                      fontWeight="700"
                      letterSpacing="0.5"
                    >
                      {loc.name.split(' ')[0]}
                    </text>

                    {/* Interactive Marker Pin */}
                    <circle
                      cx={px}
                      cy={py}
                      r={isSelected ? 14 : 10}
                      fill={isSelected ? '#6558F5' : isFrom ? '#10B981' : '#1E293B'}
                      stroke={isSelected ? '#38BDF8' : '#94A3B8'}
                      strokeWidth={2}
                    />

                    {/* Pin center pulse */}
                    {isSelected && (
                      <circle
                        cx={px}
                        cy={py}
                        r="20"
                        fill="none"
                        stroke="#38BDF8"
                        strokeWidth="1.5"
                        opacity="0.8"
                        className="animate-ping"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Map Top-Right Controls / Legend */}
            <div className="absolute top-4 right-4 glass-panel p-2.5 rounded-xl border border-white/10 text-[11px] space-y-1.5 hidden sm:block bg-[#090E1F]/90">
              <div className="font-bold text-white mb-1">Campus Map Key</div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6558F5] ring-2 ring-cyan-400"></span>
                <span>Selected Destination</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Starting Point</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
                <span>Campus Building</span>
              </div>
            </div>

            {/* Bottom Overlay Route Controller */}
            <div className="absolute bottom-4 left-4 right-4 glass-panel p-3 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-3 bg-[#0B1126]/90">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold text-white">
                  {showDirectionsMode ? 'Active Route Path Illustrated' : 'Select Building to inspect'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowDirectionsMode(!showDirectionsMode)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    showDirectionsMode
                      ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <Footprints className="w-3.5 h-3.5" />
                  <span>{showDirectionsMode ? 'Hide Route' : 'Show Walking Route'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Selected Location Glassmorphism Detail Panel */}
          {selectedLoc && (
            <div className="glass-panel rounded-3xl border border-white/15 p-6 bg-gradient-to-br from-[#0F172E] to-[#0A0E22] space-y-5 animate-in slide-in-from-bottom-3 duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase border ${getCategoryColor(selectedLoc.category)}`}>
                      {selectedLoc.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">Code: {selectedLoc.code}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white">{selectedLoc.name}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{selectedLoc.hours}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedLoc.description}
              </p>

              {/* Facilities grid */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Facilities & Services:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedLoc.facilities.map((fac, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      {fac}
                    </span>
                  ))}
                </div>
              </div>

              {/* Walking Directions & Route */}
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 space-y-2">
                <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase">
                  <Footprints className="w-4 h-4 text-cyan-400" />
                  <span>Walking Directions (Demo Campus Path)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedLoc.walkingDirections}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Nearby Spots:</span>
                  {selectedLoc.nearby.map((near, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-lg bg-black/40 border border-white/5 text-slate-300">
                      {near}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Footer */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-indigo-400" /> {selectedLoc.contact}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" /> {selectedLoc.phone}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">Aurelia Campus GIS Demo</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Campus Directory List */}
        <div className="space-y-4">
          <div className="glass-panel rounded-3xl border border-white/10 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-indigo-400" />
                <span>Campus Locations ({filteredLocations.length})</span>
              </h3>
              <span className="text-[11px] text-slate-400">Click to focus</span>
            </div>

            <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
              {filteredLocations.map((loc) => {
                const isSelected = loc.id === selectedLocationId;
                const Icon = getCategoryIcon(loc.category);
                return (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedLocationId(loc.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-900/50 to-purple-900/40 border-indigo-400 shadow-glow'
                        : 'bg-white/5 hover:bg-white/[0.08] border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-xl ${isSelected ? 'bg-indigo-500 text-white' : 'bg-black/30 text-slate-400'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{loc.name}</h4>
                          <span className="text-[10px] text-slate-400">{loc.hours.split('(')[0]}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-800/40 px-1.5 py-0.5 rounded">
                        {loc.code}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                      {loc.description}
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 capitalize">{loc.category}</span>
                      <span className="text-indigo-400 font-medium hover:underline flex items-center gap-1">
                        View Details <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
