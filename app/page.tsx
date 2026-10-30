'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar, NavTab } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { ToastContainer, ToastMessage } from '@/components/ui/Toast';
import { PerseusStore } from '@/lib/storage';

// Feature Views
import { DashboardView } from '@/components/dashboard/DashboardView';
import { CampusExplorerView } from '@/components/map/CampusExplorerView';
import { TransportationView } from '@/components/transport/TransportationView';
import { ClubsEventsView } from '@/components/clubs/ClubsEventsView';
import { AcademicKitView } from '@/components/academics/AcademicKitView';
import { SeniorConnectView } from '@/components/seniors/SeniorConnectView';
import { StudentWellbeingView } from '@/components/wellbeing/StudentWellbeingView';
import { LostFoundView } from '@/components/lostfound/LostFoundView';
import { MarketplaceView } from '@/components/marketplace/MarketplaceView';
import { CampusMemoryView } from '@/components/memory/CampusMemoryView';
import { SuggestionsView } from '@/components/suggestions/SuggestionsView';
import { AdminPanelView } from '@/components/admin/AdminPanelView';
import { SettingsView } from '@/components/settings/SettingsView';

// Seed Datasets
import { 
  CAMPUS_LOCATIONS, 
  BUS_ROUTES, 
  SAMPLE_CLUBS, 
  CAMPUS_EVENTS, 
  TIMETABLE_ENTRIES, 
  EXAM_SCHEDULE, 
  ASSIGNMENTS, 
  STUDY_RESOURCES, 
  SENIOR_MENTORS, 
  CAMPUS_ANNOUNCEMENTS, 
  PROMOTION_ANALYTICS,
  INITIAL_STUDENT_PROFILE
} from '@/data/mockData';

import { 
  CampusLocation, 
  BusRoute, 
  Club, 
  CampusEvent, 
  LostFoundItem, 
  MarketplaceItem, 
  MemoryPost, 
  StudentSuggestion, 
  CampusAnnouncement, 
  PromotionAnalytics, 
  StudentProfile 
} from '@/types';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persistent States
  const [profile, setProfile] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);
  const [locations, setLocations] = useState<CampusLocation[]>(CAMPUS_LOCATIONS);
  const [routes, setRoutes] = useState<BusRoute[]>(BUS_ROUTES);
  const [clubs, setClubs] = useState<Club[]>(SAMPLE_CLUBS);
  const [events, setEvents] = useState<CampusEvent[]>(CAMPUS_EVENTS);
  const [announcements, setAnnouncements] = useState<CampusAnnouncement[]>(CAMPUS_ANNOUNCEMENTS);
  const [lostFound, setLostFound] = useState<LostFoundItem[]>([]);
  const [marketplace, setMarketplace] = useState<MarketplaceItem[]>([]);
  const [memories, setMemories] = useState<MemoryPost[]>([]);
  const [suggestions, setSuggestions] = useState<StudentSuggestion[]>([]);
  const [analytics, setAnalytics] = useState<PromotionAnalytics[]>(PROMOTION_ANALYTICS);
  const [mentorRequests, setMentorRequests] = useState<Record<string, boolean>>({});
  const [offlineReady, setOfflineReady] = useState(true);

  // Initialize from storage on client mount
  useEffect(() => {
    setMounted(true);
    const storedTheme = PerseusStore.getTheme();
    setTheme(storedTheme);
    PerseusStore.setTheme(storedTheme);

    setProfile(PerseusStore.getProfile());
    setLocations(PerseusStore.getLocations());
    setRoutes(PerseusStore.getRoutes());
    setEvents(PerseusStore.getEvents());
    setAnnouncements(PerseusStore.getAnnouncements());
    setLostFound(PerseusStore.getLostFound());
    setMarketplace(PerseusStore.getMarketplace());
    setMemories(PerseusStore.getMemories());
    setSuggestions(PerseusStore.getSuggestions());
    setAnalytics(PerseusStore.getAnalytics());
    setMentorRequests(PerseusStore.getMentorRequests());
  }, []);

  const addToast = (title: string, message?: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, title, message, type };
    setToasts(prev => [...prev, newToast]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    PerseusStore.setTheme(nextTheme);
    addToast(`Theme Changed`, `Switched to ${nextTheme === 'dark' ? 'Dark Glassmorphism' : 'Clean Light'} mode.`, 'info');
  };

  // Lost & Found Actions
  const handleAddLostFound = (item: Omit<LostFoundItem, 'id' | 'dateReported' | 'status' | 'claims'>) => {
    const created = PerseusStore.addLostFoundItem(item);
    setLostFound(PerseusStore.getLostFound());
    return created;
  };

  const handleSubmitClaim = (itemId: string, claimant: { claimantName: string; claimantEmail: string; proofDetails: string; uniqueMarks: string }) => {
    PerseusStore.submitClaim(itemId, claimant);
    setLostFound(PerseusStore.getLostFound());
  };

  const handleUpdateLostFoundStatus = (id: string, status: LostFoundItem['status']) => {
    PerseusStore.updateLostFoundStatus(id, status);
    setLostFound(PerseusStore.getLostFound());
  };

  // Marketplace Actions
  const handleAddMarketplace = (item: Omit<MarketplaceItem, 'id' | 'postedDate' | 'status' | 'wantedRequestsCount'>) => {
    const created = PerseusStore.addMarketplaceItem(item);
    setMarketplace(PerseusStore.getMarketplace());
    return created;
  };

  const handleUpdateMarketplaceStatus = (id: string, status: MarketplaceItem['status']) => {
    PerseusStore.updateMarketplaceStatus(id, status);
    setMarketplace(PerseusStore.getMarketplace());
  };

  // Suggestions Actions
  const handleAddSuggestion = (sug: { title: string; category: StudentSuggestion['category']; description: string; rating?: number }) => {
    const created = PerseusStore.addSuggestion(sug);
    setSuggestions(PerseusStore.getSuggestions());
    return created;
  };

  const handleUpvoteSuggestion = (id: string) => {
    PerseusStore.upvoteSuggestion(id);
    setSuggestions(PerseusStore.getSuggestions());
  };

  const handleUpdateSuggestionStatus = (id: string, status: StudentSuggestion['status'], comment: string, adminResponse?: string) => {
    PerseusStore.updateSuggestionStatus(id, status, comment, adminResponse);
    setSuggestions(PerseusStore.getSuggestions());
  };

  // Memories Actions
  const handleAddMemory = (mem: Omit<MemoryPost, 'id' | 'date' | 'upvotes' | 'userUpvoted' | 'userBookmarked'>) => {
    const created = PerseusStore.addMemory(mem);
    setMemories(PerseusStore.getMemories());
    return created;
  };

  const handleToggleMemoryUpvote = (id: string) => {
    PerseusStore.toggleMemoryUpvote(id);
    setMemories(PerseusStore.getMemories());
  };

  const handleToggleMemoryBookmark = (id: string) => {
    PerseusStore.toggleMemoryBookmark(id);
    setMemories(PerseusStore.getMemories());
  };

  // Events & Referral Tracking
  const handleTrackReferral = (code: string) => {
    const title = PerseusStore.trackReferralClick(code);
    setEvents(PerseusStore.getEvents());
    setAnalytics(PerseusStore.getAnalytics());
  };

  const handleRegisterEvent = (eventId: string) => {
    PerseusStore.registerForEvent(eventId);
    setEvents(PerseusStore.getEvents());
  };

  // Announcements Action
  const handleAddAnnouncement = (ann: Omit<CampusAnnouncement, 'id' | 'date'>) => {
    PerseusStore.addAnnouncement(ann);
    setAnnouncements(PerseusStore.getAnnouncements());
  };

  // Mentorship Action
  const handleRequestMentorship = (mentorId: string) => {
    PerseusStore.sendMentorRequest(mentorId);
    setMentorRequests(PerseusStore.getMentorRequests());
  };

  // Profile Action
  const handleUpdateProfile = (newProfile: StudentProfile) => {
    setProfile(newProfile);
    PerseusStore.setProfile(newProfile);
  };

  // Reset Everything
  const handleResetAllData = () => {
    PerseusStore.resetAllDemoData();
    setProfile(INITIAL_STUDENT_PROFILE);
    setLocations(CAMPUS_LOCATIONS);
    setRoutes(BUS_ROUTES);
    setEvents(CAMPUS_EVENTS);
    setAnnouncements(CAMPUS_ANNOUNCEMENTS);
    setLostFound(PerseusStore.getLostFound());
    setMarketplace(PerseusStore.getMarketplace());
    setMemories(PerseusStore.getMemories());
    setSuggestions(PerseusStore.getSuggestions());
    setAnalytics(PROMOTION_ANALYTICS);
    setMentorRequests({});
  };

  // Global Search Router
  const handleGlobalSearch = (query: string) => {
    setGlobalSearch(query);
    if (!query) return;

    const q = query.toLowerCase();
    // Auto navigate to most appropriate section if user types specific terms
    if (q.includes('bus') || q.includes('shuttle') || q.includes('route')) {
      setActiveTab('transport');
    } else if (q.includes('book') || q.includes('buy') || q.includes('sell') || q.includes('price')) {
      setActiveTab('marketplace');
    } else if (q.includes('lost') || q.includes('found') || q.includes('claim')) {
      setActiveTab('lostfound');
    } else if (q.includes('club') || q.includes('hackathon') || q.includes('society')) {
      setActiveTab('clubs');
    } else if (q.includes('exam') || q.includes('timetable') || q.includes('syllabus')) {
      setActiveTab('academics');
    } else if (q.includes('mentor') || q.includes('senior')) {
      setActiveTab('seniors');
    } else if (q.includes('doctor') || q.includes('counsel') || q.includes('emergency')) {
      setActiveTab('wellbeing');
    } else if (q.includes('idea') || q.includes('feedback') || q.includes('suggest')) {
      setActiveTab('suggestions');
    }
  };

  // SSR skeleton protection
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#080D1C] flex items-center justify-center text-white font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-cyan-400 rounded-full animate-spin"></div>
          <span className="text-sm font-semibold tracking-wider text-slate-300">INITIALIZING PERSEUS...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background text-white selection:bg-indigo-500 ${theme === 'light' ? 'light text-slate-900' : ''}`}>
      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Desktop Persistent Glass Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        profile={profile}
        offlineReady={offlineReady}
      />

      {/* Mobile Navigation (Drawer + Bottom Bar) */}
      <MobileNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isOpenDrawer={isMobileMenuOpen}
        onCloseDrawer={() => setIsMobileMenuOpen(false)}
        profile={profile}
        offlineReady={offlineReady}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Sticky Top Header */}
        <Header
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          announcements={announcements}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onGlobalSearch={handleGlobalSearch}
          searchQuery={globalSearch}
        />

        {/* Dynamic Route Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              profile={profile}
              announcements={announcements}
              events={events}
              clubs={clubs}
              lostFound={lostFound}
              marketplace={marketplace}
              routes={routes}
              onNavigate={setActiveTab}
              onTrackReferral={handleTrackReferral}
            />
          )}

          {activeTab === 'map' && (
            <CampusExplorerView
              locations={locations}
              searchQuery={globalSearch}
            />
          )}

          {activeTab === 'transport' && (
            <TransportationView
              routes={routes}
              locations={locations}
            />
          )}

          {activeTab === 'clubs' && (
            <ClubsEventsView
              clubs={clubs}
              events={events}
              analytics={analytics}
              onTrackReferral={handleTrackReferral}
              onRegisterEvent={handleRegisterEvent}
              onShowToast={addToast}
            />
          )}

          {activeTab === 'academics' && (
            <AcademicKitView
              profile={profile}
              timetable={TIMETABLE_ENTRIES}
              exams={EXAM_SCHEDULE}
              assignments={ASSIGNMENTS}
              resources={STUDY_RESOURCES}
              onShowToast={addToast}
            />
          )}

          {activeTab === 'seniors' && (
            <SeniorConnectView
              mentors={SENIOR_MENTORS}
              requestedMentorIds={mentorRequests}
              onRequestMentorship={handleRequestMentorship}
              onShowToast={addToast}
            />
          )}

          {activeTab === 'wellbeing' && (
            <StudentWellbeingView
              onShowToast={addToast}
            />
          )}

          {activeTab === 'lostfound' && (
            <LostFoundView
              items={lostFound}
              onAddItem={handleAddLostFound}
              onSubmitClaim={handleSubmitClaim}
              onShowToast={addToast}
            />
          )}

          {activeTab === 'marketplace' && (
            <MarketplaceView
              items={marketplace}
              profile={profile}
              onAddItem={handleAddMarketplace}
              onUpdateStatus={handleUpdateMarketplaceStatus}
              onShowToast={addToast}
            />
          )}

          {activeTab === 'memory' && (
            <CampusMemoryView
              memories={memories}
              profile={profile}
              onAddMemory={handleAddMemory}
              onToggleUpvote={handleToggleMemoryUpvote}
              onToggleBookmark={handleToggleMemoryBookmark}
              onShowToast={addToast}
            />
          )}

          {activeTab === 'suggestions' && (
            <SuggestionsView
              suggestions={suggestions}
              onAddSuggestion={handleAddSuggestion}
              onUpvoteSuggestion={handleUpvoteSuggestion}
              onShowToast={addToast}
            />
          )}

          {activeTab === 'admin' && (
            <AdminPanelView
              announcements={announcements}
              lostFound={lostFound}
              marketplace={marketplace}
              suggestions={suggestions}
              analytics={analytics}
              onAddAnnouncement={handleAddAnnouncement}
              onUpdateLostFoundStatus={handleUpdateLostFoundStatus}
              onUpdateSuggestionStatus={handleUpdateSuggestionStatus}
              onUpdateMarketplaceStatus={handleUpdateMarketplaceStatus}
              onResetAllData={handleResetAllData}
              onShowToast={addToast}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              theme={theme}
              onToggleTheme={handleToggleTheme}
              offlineReady={offlineReady}
              onToggleOffline={() => setOfflineReady(!offlineReady)}
              onResetAllData={handleResetAllData}
              onShowToast={addToast}
            />
          )}
        </main>
      </div>
    </div>
  );
}
