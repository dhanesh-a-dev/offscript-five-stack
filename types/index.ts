export type VerificationSource = 
  | 'Official University Information'
  | 'Verified Perseus Team Update'
  | 'Club Announcement'
  | 'Student Submitted'
  | 'Sponsored / Promoted';

export interface StudentProfile {
  name: string;
  idNumber: string;
  email: string;
  department: string;
  year: string;
  semester: string;
  avatar: string;
  campusCredits: number;
  savedOffline: boolean;
}

export interface CampusLocation {
  id: string;
  name: string;
  category: 'academic' | 'facility' | 'transport' | 'sports' | 'admin' | 'dining';
  x: number; // percentage coordinates 0-100 on map
  y: number;
  description: string;
  hours: string;
  facilities: string[];
  contact: string;
  phone: string;
  nearby: string[];
  walkingDirections: string;
  code: string;
}

export interface BusRoute {
  id: string;
  routeNumber: string;
  name: string;
  firstDeparture: string;
  lastDeparture: string;
  frequency: string;
  duration: string;
  status: 'On Time' | 'Delayed' | 'Maintenance';
  stops: string[];
  currentBusLocationIndex?: number;
  announcements?: string;
  fare: string;
}

export interface Club {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  membersCount: number;
  leadName: string;
  email: string;
  meetingSchedule: string;
  room: string;
  iconName: string;
  accentColor: string;
  isRecruiting: boolean;
}

export interface CampusEvent {
  id: string;
  title: string;
  clubId?: string;
  clubName: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  isSponsored?: boolean;
  isPromoted?: boolean;
  isFeatured?: boolean;
  referralCode?: string;
  referralClicks?: number;
  registeredCount: number;
  maxCapacity?: number;
  source: VerificationSource;
  promoterName?: string;
}

export interface TimetableEntry {
  day: string;
  time: string;
  courseCode: string;
  courseName: string;
  room: string;
  instructor: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
}

export interface ExamScheduleItem {
  id: string;
  courseCode: string;
  courseName: string;
  date: string;
  time: string;
  venue: string;
  seatRange: string;
  status: 'Upcoming' | 'Completed';
}

export interface AssignmentItem {
  id: string;
  title: string;
  courseCode: string;
  dueDate: string;
  points: number;
  status: 'Pending' | 'In Progress' | 'Submitted';
  description: string;
}

export interface StudyResource {
  id: string;
  title: string;
  subject: string;
  department: string;
  semester: string;
  type: 'Notes' | 'Syllabus' | 'Previous Papers' | 'Lab Manual';
  author: string;
  size: string;
  downloads: number;
}

export interface SeniorMentor {
  id: string;
  name: string;
  department: string;
  year: string;
  gpaBadge: string;
  skills: string[];
  interests: string[];
  bio: string;
  topTip: string;
  availableSlots: number;
  contactEmail: string;
  isAvailable: boolean;
  avatarUrl: string;
}

export interface LostFoundClaim {
  id: string;
  claimantName: string;
  claimantEmail: string;
  proofDetails: string;
  uniqueMarks: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedAt: string;
}

export interface LostFoundItem {
  id: string;
  type: 'lost' | 'found';
  title: string;
  category: 'Electronics' | 'IDs & Cards' | 'Books & Stationery' | 'Accessories' | 'Bottles & Containers' | 'Other';
  description: string;
  location: string;
  dateReported: string;
  status: 'Reported' | 'Under Review' | 'Claimed' | 'Returned' | 'Expired';
  imagePlaceholder: string;
  claims: LostFoundClaim[];
}

export interface MarketplaceItem {
  id: string;
  title: string;
  category: 'Textbooks' | 'Electronics' | 'Study Aids' | 'Hostel Gear' | 'Stationery';
  price: number;
  condition: 'Brand New' | 'Like New' | 'Good' | 'Fair';
  sellerName: string;
  sellerDept: string;
  sellerYear: string;
  sellerContact: string;
  status: 'Available' | 'Reserved' | 'Sold';
  subject?: string;
  semester?: string;
  department?: string;
  edition?: string;
  description: string;
  postedDate: string;
  imagePlaceholder: string;
  wantedRequestsCount?: number;
}

export interface MemoryPost {
  id: string;
  title: string;
  department: string;
  year: string;
  semester: string;
  subject?: string;
  location?: string;
  topic: 'Academics' | 'Hostel Life' | 'Campus Secret' | 'Exam Prep' | 'Clubs' | 'Transport';
  content: string;
  author: string;
  authorRole: string;
  date: string;
  upvotes: number;
  userUpvoted?: boolean;
  userBookmarked?: boolean;
  tags: string[];
}

export interface SuggestionStatusUpdate {
  date: string;
  status: 'Submitted' | 'Under Review' | 'Accepted' | 'In Progress' | 'Resolved' | 'Declined';
  comment: string;
}

export interface StudentSuggestion {
  id: string;
  trackingId: string;
  title: string;
  category: 'Transportation' | 'Campus Facilities' | 'Academics' | 'Events' | 'Clubs' | 'Student Support' | 'General Suggestions';
  description: string;
  rating?: number;
  status: 'Submitted' | 'Under Review' | 'Accepted' | 'In Progress' | 'Resolved' | 'Declined';
  submittedAt: string;
  upvotes: number;
  userUpvoted?: boolean;
  updates: SuggestionStatusUpdate[];
  adminResponse?: string;
}

export interface PromotionAnalytics {
  id: string;
  campaignName: string;
  eventTitle: string;
  sponsorName: string;
  referralCode: string;
  views: number;
  clicks: number;
  conversions: number;
  ctr: string;
  status: 'Active' | 'Paused' | 'Ended';
  budgetDemo: string;
}

export interface CampusAnnouncement {
  id: string;
  title: string;
  date: string;
  category: string;
  source: VerificationSource;
  summary: string;
  content: string;
  isUrgent?: boolean;
}
