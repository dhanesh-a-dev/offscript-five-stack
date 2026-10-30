import React, { useState } from 'react';
import { 
  Bus, 
  Clock, 
  MapPin, 
  Navigation, 
  AlertCircle, 
  Info, 
  CheckCircle2, 
  ArrowRight, 
  Footprints,
  Phone,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { BusRoute, CampusLocation } from '@/types';

interface TransportationViewProps {
  routes: BusRoute[];
  locations: CampusLocation[];
}

export const TransportationView: React.FC<TransportationViewProps> = ({ routes, locations }) => {
  const [selectedRouteId, setSelectedRouteId] = useState<string>(routes[0]?.id || '');
  
  // Advanced Transport Planner State
  const [originId, setOriginId] = useState<string>('loc-gate');
  const [destinationId, setDestinationId] = useState<string>('loc-lib');
  const [planResult, setPlanResult] = useState<{
    bestRoute: BusRoute;
    estimatedMinutes: number;
    walkingToStop: string;
    intermediateStops: string[];
    walkingFromStop: string;
  } | null>(null);

  const selectedRoute = routes.find(r => r.id === selectedRouteId) || routes[0];

  const handlePlanTrip = (e: React.FormEvent) => {
    e.preventDefault();
    if (originId === destinationId) return;

    const origin = locations.find(l => l.id === originId)?.name || 'Origin';
    const destination = locations.find(l => l.id === destinationId)?.name || 'Destination';

    // Find route that best services these or pick primary
    const matchedRoute = routes.find(r => 
      r.stops.some(s => s.toLowerCase().includes(destination.toLowerCase().split(' ')[0]))
    ) || routes[0];

    setPlanResult({
      bestRoute: matchedRoute,
      estimatedMinutes: 8 + Math.floor(Math.random() * 6),
      walkingToStop: `Walk 120m from ${origin} to ${matchedRoute.stops[0]}`,
      intermediateStops: matchedRoute.stops.slice(1, 4),
      walkingFromStop: `Alight at ${matchedRoute.stops[4] || destination} and take paved North Corridor (2 mins)`
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Bus className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Aurelia Campus Transit Network
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Electric campus shuttles, connecting lines, departure tables, and route planners.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Demo Timetable (Free internal service with student ID)</span>
        </div>
      </div>

      {/* Advanced Transport Planner Glass Box */}
      <div className="glass-panel rounded-3xl border border-white/15 p-6 bg-gradient-to-r from-blue-950/60 via-[#0E1733] to-[#0A1024] shadow-2xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Advanced Campus Journey Planner</h3>
            <p className="text-xs text-slate-400">Select where you are and where you need to be</p>
          </div>
        </div>

        <form onSubmit={handlePlanTrip} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Starting Point (From):</label>
            <select
              value={originId}
              onChange={(e) => setOriginId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id} className="bg-[#0B1126] text-white">
                  {loc.name} ({loc.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Destination (To):</label>
            <select
              value={destinationId}
              onChange={(e) => setDestinationId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id} className="bg-[#0B1126] text-white">
                  {loc.name} ({loc.code})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-glow-cyan transition-all flex items-center justify-center gap-2"
          >
            <span>Calculate Best Route</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Journey Plan Output */}
        {planResult && (
          <div className="mt-5 p-4 rounded-2xl bg-black/40 border border-cyan-500/30 animate-in slide-in-from-top-2 duration-200 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold text-xs">
                  {planResult.bestRoute.routeNumber}
                </span>
                <span className="text-sm font-bold text-white">{planResult.bestRoute.name}</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-semibold">
                Est. Travel Time: ~{planResult.estimatedMinutes} minutes
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-slate-400 flex items-center gap-1 font-semibold">
                  <Footprints className="w-3.5 h-3.5 text-cyan-400" /> Step 1: Walk to Stop
                </span>
                <p className="text-slate-200">{planResult.walkingToStop}</p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-slate-400 flex items-center gap-1 font-semibold">
                  <Bus className="w-3.5 h-3.5 text-indigo-400" /> Step 2: Board Shuttle
                </span>
                <p className="text-slate-200">Ride through: {planResult.intermediateStops.join(' → ')}</p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-slate-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Step 3: Arrive
                </span>
                <p className="text-slate-200">{planResult.walkingFromStop}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Route Cards & Schedule Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Route Selector Column */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Select Shuttle Line</span>
          </h3>

          {routes.map((route) => {
            const isSelected = route.id === selectedRouteId;
            return (
              <div
                key={route.id}
                onClick={() => setSelectedRouteId(route.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-950/80 to-[#121A3D] border-indigo-400 shadow-glow'
                    : 'glass-panel hover:bg-white/[0.08] border-white/10'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono ${
                    isSelected ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'bg-white/10 text-slate-300'
                  }`}>
                    {route.routeNumber}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
                    {route.status}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white">{route.name}</h4>
                <p className="text-xs text-slate-400 mt-1">
                  ⏱ {route.firstDeparture} - {route.lastDeparture} • {route.frequency}
                </p>

                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <span>{route.stops.length} campus stops</span>
                  <span className="text-cyan-400 font-semibold">{route.duration}</span>
                </div>
              </div>
            );
          })}

          {/* Transport Helpdesk */}
          <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-cyan-400" /> Transport Dispatch Office
            </h4>
            <p className="text-slate-400">
              For lost property left on shuttles or special disability transit assistance:
            </p>
            <div className="pt-1 flex flex-col gap-1 font-mono text-cyan-300">
              <span>Helpline: +91 (0) 555-0310</span>
              <span>Central Terminal Platform 1</span>
            </div>
          </div>
        </div>

        {/* Selected Route Detailed Stop Sequence & Timetable */}
        {selectedRoute && (
          <div className="lg:col-span-2 space-y-5">
            <div className="glass-panel rounded-3xl border border-white/15 p-6 space-y-6">
              {/* Route Heading */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs border border-cyan-400/30">
                      {selectedRoute.routeNumber}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold">
                      Fare: {selectedRoute.fare}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white">{selectedRoute.name}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
                    Frequency: <strong className="text-white">{selectedRoute.frequency}</strong>
                  </div>
                </div>
              </div>

              {/* Transit Notice */}
              {selectedRoute.announcements && (
                <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-400/30 flex items-start gap-2.5 text-xs text-indigo-200">
                  <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{selectedRoute.announcements}</span>
                </div>
              )}

              {/* Sequential Stops Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Stop Sequence & Estimated Progression
                </h4>

                <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-cyan-400 before:via-indigo-500 before:to-purple-500">
                  {selectedRoute.stops.map((stop, index) => {
                    const isTerminal = index === 0 || index === selectedRoute.stops.length - 1;
                    return (
                      <div key={index} className="relative flex items-center justify-between group">
                        {/* Dot on timeline */}
                        <div className={`absolute -left-6 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 ${
                          isTerminal 
                            ? 'bg-cyan-400 border-white ring-2 ring-cyan-500/40' 
                            : 'bg-[#0E1528] border-indigo-400 group-hover:border-cyan-300'
                        }`} />

                        <div className="pl-3">
                          <h5 className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                            {stop}
                          </h5>
                          <span className="text-[10px] text-slate-400">
                            {index === 0 ? 'Terminal Departure Point' : index === selectedRoute.stops.length - 1 ? 'Terminal Destination' : `Stop #${index + 1}`}
                          </span>
                        </div>

                        <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                          +{index * 3} mins
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Departure Schedule Matrix */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Morning & Evening Departure Batches (Demo Schedule)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-center font-mono">
                  {['07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '11:00 AM', '12:30 PM', '02:00 PM', '03:30 PM', '05:00 PM', '06:30 PM'].map((time, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-300 hover:border-cyan-400/40 transition-colors">
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
