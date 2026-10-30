import { 
  LostFoundItem, 
  MarketplaceItem, 
  StudentSuggestion, 
  MemoryPost, 
  CampusEvent, 
  CampusAnnouncement, 
  StudentProfile,
  PromotionAnalytics,
  BusRoute,
  CampusLocation
} from '../types';
import { 
  LOST_FOUND_ITEMS, 
  MARKETPLACE_ITEMS, 
  STUDENT_SUGGESTIONS, 
  CAMPUS_MEMORIES, 
  CAMPUS_EVENTS, 
  CAMPUS_ANNOUNCEMENTS, 
  INITIAL_STUDENT_PROFILE,
  PROMOTION_ANALYTICS,
  BUS_ROUTES,
  CAMPUS_LOCATIONS
} from '../data/mockData';

const KEYS = {
  THEME: 'perseus_theme',
  PROFILE: 'perseus_profile',
  LOST_FOUND: 'perseus_lost_found',
  MARKETPLACE: 'perseus_marketplace',
  SUGGESTIONS: 'perseus_suggestions',
  MEMORIES: 'perseus_memories',
  EVENTS: 'perseus_events',
  ANNOUNCEMENTS: 'perseus_announcements',
  ANALYTICS: 'perseus_analytics',
  ROUTES: 'perseus_routes',
  LOCATIONS: 'perseus_locations',
  OFFLINE_SAVED: 'perseus_offline_saved',
  MENTOR_REQUESTS: 'perseus_mentor_requests',
};

// Safe localStorage helper for SSR
function getLocalItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return fallback;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
  }
}

export const PerseusStore = {
  // Theme
  getTheme: (): 'dark' | 'light' => {
    if (typeof window === 'undefined') return 'dark';
    return (localStorage.getItem(KEYS.THEME) as 'dark' | 'light') || 'dark';
  },
  setTheme: (theme: 'dark' | 'light') => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEYS.THEME, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  // Student Profile
  getProfile: (): StudentProfile => getLocalItem(KEYS.PROFILE, INITIAL_STUDENT_PROFILE),
  setProfile: (profile: StudentProfile) => setLocalItem(KEYS.PROFILE, profile),

  // Lost & Found
  getLostFound: (): LostFoundItem[] => getLocalItem(KEYS.LOST_FOUND, LOST_FOUND_ITEMS),
  setLostFound: (items: LostFoundItem[]) => setLocalItem(KEYS.LOST_FOUND, items),
  addLostFoundItem: (item: Omit<LostFoundItem, 'id' | 'dateReported' | 'status' | 'claims'>) => {
    const current = PerseusStore.getLostFound();
    const newItem: LostFoundItem = {
      ...item,
      id: `lf-${Date.now()}`,
      dateReported: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Reported',
      claims: []
    };
    const updated = [newItem, ...current];
    PerseusStore.setLostFound(updated);
    return newItem;
  },
  submitClaim: (itemId: string, claimant: { claimantName: string; claimantEmail: string; proofDetails: string; uniqueMarks: string }) => {
    const current = PerseusStore.getLostFound();
    const updated = current.map(item => {
      if (item.id === itemId) {
        const newClaim = {
          id: `cl-${Date.now()}`,
          ...claimant,
          status: 'Pending' as const,
          submittedAt: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        };
        return {
          ...item,
          status: 'Under Review' as const,
          claims: [...item.claims, newClaim]
        };
      }
      return item;
    });
    PerseusStore.setLostFound(updated);
  },
  updateLostFoundStatus: (itemId: string, status: LostFoundItem['status']) => {
    const current = PerseusStore.getLostFound();
    const updated = current.map(item => item.id === itemId ? { ...item, status } : item);
    PerseusStore.setLostFound(updated);
  },

  // Marketplace
  getMarketplace: (): MarketplaceItem[] => getLocalItem(KEYS.MARKETPLACE, MARKETPLACE_ITEMS),
  setMarketplace: (items: MarketplaceItem[]) => setLocalItem(KEYS.MARKETPLACE, items),
  addMarketplaceItem: (item: Omit<MarketplaceItem, 'id' | 'postedDate' | 'status' | 'wantedRequestsCount'>) => {
    const current = PerseusStore.getMarketplace();
    const newItem: MarketplaceItem = {
      ...item,
      id: `mkt-${Date.now()}`,
      postedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Available',
      wantedRequestsCount: 0
    };
    const updated = [newItem, ...current];
    PerseusStore.setMarketplace(updated);
    return newItem;
  },
  updateMarketplaceStatus: (itemId: string, status: MarketplaceItem['status']) => {
    const current = PerseusStore.getMarketplace();
    const updated = current.map(item => item.id === itemId ? { ...item, status } : item);
    PerseusStore.setMarketplace(updated);
  },

  // Suggestions
  getSuggestions: (): StudentSuggestion[] => getLocalItem(KEYS.SUGGESTIONS, STUDENT_SUGGESTIONS),
  setSuggestions: (items: StudentSuggestion[]) => setLocalItem(KEYS.SUGGESTIONS, items),
  addSuggestion: (suggestion: { title: string; category: StudentSuggestion['category']; description: string; rating?: number }) => {
    const current = PerseusStore.getSuggestions();
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const trackingId = `AUR-S${randNum}`;
    const newSug: StudentSuggestion = {
      id: `sug-${Date.now()}`,
      trackingId,
      ...suggestion,
      status: 'Submitted',
      submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      upvotes: 1,
      userUpvoted: true,
      updates: [
        {
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: 'Submitted',
          comment: 'Suggestion successfully logged in Aurelia student forum.'
        }
      ]
    };
    const updated = [newSug, ...current];
    PerseusStore.setSuggestions(updated);
    return newSug;
  },
  upvoteSuggestion: (id: string) => {
    const current = PerseusStore.getSuggestions();
    const updated = current.map(s => {
      if (s.id === id) {
        const isUpvoted = !!s.userUpvoted;
        return {
          ...s,
          upvotes: isUpvoted ? s.upvotes - 1 : s.upvotes + 1,
          userUpvoted: !isUpvoted
        };
      }
      return s;
    });
    PerseusStore.setSuggestions(updated);
  },
  updateSuggestionStatus: (id: string, status: StudentSuggestion['status'], comment: string, adminResponse?: string) => {
    const current = PerseusStore.getSuggestions();
    const updated = current.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status,
          adminResponse: adminResponse || s.adminResponse,
          updates: [
            ...s.updates,
            {
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              status,
              comment
            }
          ]
        };
      }
      return s;
    });
    PerseusStore.setSuggestions(updated);
  },

  // Memories
  getMemories: (): MemoryPost[] => getLocalItem(KEYS.MEMORIES, CAMPUS_MEMORIES),
  setMemories: (items: MemoryPost[]) => setLocalItem(KEYS.MEMORIES, items),
  addMemory: (mem: Omit<MemoryPost, 'id' | 'date' | 'upvotes' | 'userUpvoted' | 'userBookmarked'>) => {
    const current = PerseusStore.getMemories();
    const newPost: MemoryPost = {
      ...mem,
      id: `mem-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      upvotes: 1,
      userUpvoted: true,
      userBookmarked: false
    };
    const updated = [newPost, ...current];
    PerseusStore.setMemories(updated);
    return newPost;
  },
  toggleMemoryUpvote: (id: string) => {
    const current = PerseusStore.getMemories();
    const updated = current.map(m => {
      if (m.id === id) {
        const hasUpvoted = !!m.userUpvoted;
        return {
          ...m,
          upvotes: hasUpvoted ? m.upvotes - 1 : m.upvotes + 1,
          userUpvoted: !hasUpvoted
        };
      }
      return m;
    });
    PerseusStore.setMemories(updated);
  },
  toggleMemoryBookmark: (id: string) => {
    const current = PerseusStore.getMemories();
    const updated = current.map(m => {
      if (m.id === id) {
        return {
          ...m,
          userBookmarked: !m.userBookmarked
        };
      }
      return m;
    });
    PerseusStore.setMemories(updated);
  },

  // Events & Referral Tracking
  getEvents: (): CampusEvent[] => getLocalItem(KEYS.EVENTS, CAMPUS_EVENTS),
  setEvents: (items: CampusEvent[]) => setLocalItem(KEYS.EVENTS, items),
  trackReferralClick: (referralCode: string) => {
    const events = PerseusStore.getEvents();
    let clickedEventTitle = '';
    const updated = events.map(evt => {
      if (evt.referralCode === referralCode) {
        clickedEventTitle = evt.title;
        return { ...evt, referralClicks: (evt.referralClicks || 0) + 1 };
      }
      return evt;
    });
    PerseusStore.setEvents(updated);

    // Update Analytics
    const analytics = PerseusStore.getAnalytics();
    const updatedAnalytics = analytics.map(a => {
      if (a.referralCode === referralCode) {
        const clicks = a.clicks + 1;
        const ctr = `${((clicks / a.views) * 100).toFixed(1)}%`;
        return { ...a, clicks, ctr };
      }
      return a;
    });
    PerseusStore.setAnalytics(updatedAnalytics);
    return clickedEventTitle;
  },
  registerForEvent: (eventId: string) => {
    const events = PerseusStore.getEvents();
    const updated = events.map(evt => {
      if (evt.id === eventId) {
        return { ...evt, registeredCount: evt.registeredCount + 1 };
      }
      return evt;
    });
    PerseusStore.setEvents(updated);
  },

  // Analytics
  getAnalytics: (): PromotionAnalytics[] => getLocalItem(KEYS.ANALYTICS, PROMOTION_ANALYTICS),
  setAnalytics: (items: PromotionAnalytics[]) => setLocalItem(KEYS.ANALYTICS, items),

  // Announcements
  getAnnouncements: (): CampusAnnouncement[] => getLocalItem(KEYS.ANNOUNCEMENTS, CAMPUS_ANNOUNCEMENTS),
  setAnnouncements: (items: CampusAnnouncement[]) => setLocalItem(KEYS.ANNOUNCEMENTS, items),
  addAnnouncement: (ann: Omit<CampusAnnouncement, 'id' | 'date'>) => {
    const current = PerseusStore.getAnnouncements();
    const newAnn: CampusAnnouncement = {
      ...ann,
      id: `ann-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    const updated = [newAnn, ...current];
    PerseusStore.setAnnouncements(updated);
    return newAnn;
  },

  // Routes & Locations (Admin editable)
  getRoutes: (): BusRoute[] => getLocalItem(KEYS.ROUTES, BUS_ROUTES),
  setRoutes: (routes: BusRoute[]) => setLocalItem(KEYS.ROUTES, routes),
  getLocations: (): CampusLocation[] => getLocalItem(KEYS.LOCATIONS, CAMPUS_LOCATIONS),
  setLocations: (locs: CampusLocation[]) => setLocalItem(KEYS.LOCATIONS, locs),

  // Mentorship Requests
  getMentorRequests: (): Record<string, boolean> => getLocalItem(KEYS.MENTOR_REQUESTS, {}),
  sendMentorRequest: (mentorId: string) => {
    const reqs = PerseusStore.getMentorRequests();
    reqs[mentorId] = true;
    setLocalItem(KEYS.MENTOR_REQUESTS, reqs);
  },

  // Reset demo data to factory defaults
  resetAllDemoData: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(KEYS.PROFILE);
    localStorage.removeItem(KEYS.LOST_FOUND);
    localStorage.removeItem(KEYS.MARKETPLACE);
    localStorage.removeItem(KEYS.SUGGESTIONS);
    localStorage.removeItem(KEYS.MEMORIES);
    localStorage.removeItem(KEYS.EVENTS);
    localStorage.removeItem(KEYS.ANNOUNCEMENTS);
    localStorage.removeItem(KEYS.ANALYTICS);
    localStorage.removeItem(KEYS.ROUTES);
    localStorage.removeItem(KEYS.LOCATIONS);
    localStorage.removeItem(KEYS.MENTOR_REQUESTS);
  }
};

