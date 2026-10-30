import { 
  CampusLocation, 
  BusRoute, 
  Club, 
  CampusEvent, 
  TimetableEntry, 
  ExamScheduleItem, 
  AssignmentItem, 
  StudyResource, 
  SeniorMentor, 
  LostFoundItem, 
  MarketplaceItem, 
  MemoryPost, 
  StudentSuggestion, 
  PromotionAnalytics, 
  CampusAnnouncement,
  StudentProfile
} from '../types';

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  name: "Alex Carter",
  idNumber: "AU-2026-CS-0418",
  email: "alex.carter@student.aurelia.edu",
  department: "Computer Science & Engineering",
  year: "1st Year (Fresher)",
  semester: "Semester 1",
  avatar: "AC",
  campusCredits: 340,
  savedOffline: true,
};

export const CAMPUS_LOCATIONS: CampusLocation[] = [
  {
    id: "loc-gate",
    name: "Main University Gate",
    category: "transport",
    x: 50,
    y: 88,
    code: "GATE-01",
    description: "The grand ceremonial entrance to Aurelia University, manned 24/7 by campus security. Primary drop-off point for city buses and auto-rickshaws.",
    hours: "Open 24/7 (ID verification after 10:00 PM)",
    facilities: ["Security Post", "Visitor Registration Desk", "Waiting Shelter", "E-Rickshaw Stand"],
    contact: "security.gate@aurelia.edu",
    phone: "+91 (0) 555-0101",
    nearby: ["Administration Block", "Central Transport Hub", "South Parking Lot"],
    walkingDirections: "Located at the southernmost perimeter. Direct walkway leads north to the Administration Lawn."
  },
  {
    id: "loc-admin",
    name: "Administration Block",
    category: "admin",
    x: 48,
    y: 72,
    code: "ADM-MAIN",
    description: "Central administrative headquarters housing the Registrar, Dean of Student Affairs, Academic Accounts, and Admissions Bureau.",
    hours: "09:00 AM - 05:00 PM (Mon - Fri)",
    facilities: ["Student Helpdesk Counter 1-4", "Registrar's Office", "Fee Payment Kiosk", "ATM Lobby"],
    contact: "admin.affairs@aurelia.edu",
    phone: "+91 (0) 555-0120",
    nearby: ["Main University Gate", "Central Library", "Auditorium"],
    walkingDirections: "Walk 150m north from Main Gate across the Fountain Quadrangle."
  },
  {
    id: "loc-cse",
    name: "Computer Science Department",
    category: "academic",
    x: 65,
    y: 35,
    code: "CSE-BLDG",
    description: "Four-story cutting-edge building housing AI Research Labs, Cloud Computing Centers, Robotics Workshop, and lecture halls.",
    hours: "07:30 AM - 09:30 PM (Mon - Sat)",
    facilities: ["Turing High-Performance Lab", "IoT Prototyping Bay", "Server Room", "Faculty Cabins", "Breakout Lounge"],
    contact: "hod.cse@aurelia.edu",
    phone: "+91 (0) 555-0144",
    nearby: ["Engineering Block", "Central Library", "Campus Canteen"],
    walkingDirections: "Northeast of the central quad. 3-minute walk from Central Library."
  },
  {
    id: "loc-engg",
    name: "Engineering Block (B-Tech Complex)",
    category: "academic",
    x: 32,
    y: 36,
    code: "ENG-WEST",
    description: "Houses Mechanical, Electrical, Civil, and Aerospace labs, along with heavy engineering fabrication workshops.",
    hours: "08:00 AM - 07:00 PM (Mon - Sat)",
    facilities: ["Fluid Dynamics Lab", "Robotics Bay", "CAD Center", "Auditorium 2", "Student Lockers"],
    contact: "eng.dept@aurelia.edu",
    phone: "+91 (0) 555-0155",
    nearby: ["Central Library", "Student Activity Centre", "Health Centre"],
    walkingDirections: "Northwest wing, opposite the CS Department across the botanical corridor."
  },
  {
    id: "loc-lib",
    name: "Central Library",
    category: "academic",
    x: 48,
    y: 45,
    code: "LIB-CENTRAL",
    description: "Multi-tier modern knowledge hub with over 150,000 volumes, private discussion pods, 24/7 digital reading room, and high-speed Wi-Fi.",
    hours: "08:00 AM - Midnight (24/7 during exam weeks)",
    facilities: ["Digital Media Lab", "Silent Study Cubicles", "Photocopy & Binding Kiosk", "Rare Book Vault", "Café Corner"],
    contact: "library.services@aurelia.edu",
    phone: "+91 (0) 555-0180",
    nearby: ["CSE Department", "Engineering Block", "Administration Block", "Campus Canteen"],
    walkingDirections: "Heart of the university campus. Visible directly from all main radial pathways."
  },
  {
    id: "loc-canteen",
    name: "Campus Canteen & Food Court",
    category: "dining",
    x: 62,
    y: 56,
    code: "CAFE-FOOD",
    description: "Vibrant two-floor food court offering multi-cuisine healthy meals, fresh juices, barista coffee, and open-air patio seating.",
    hours: "07:30 AM - 10:30 PM (Daily)",
    facilities: ["Juice Bar", "South Indian Express", "North Indian Thali Counter", "Espresso Bar", "Outdoor Garden Seating"],
    contact: "hospitality@aurelia.edu",
    phone: "+91 (0) 555-0210",
    nearby: ["Central Library", "CSE Department", "Sports Ground"],
    walkingDirections: "Just east of Central Library, 2 minutes walk from the CSE lobby."
  },
  {
    id: "loc-auditorium",
    name: "Grand Auditorium",
    category: "facility",
    x: 32,
    y: 62,
    code: "AUD-1200",
    description: "Acoustically engineered 1,200-seat amphitheater hosting convocations, national hackathons, cultural festivals, and guest lectures.",
    hours: "08:00 AM - 10:00 PM (Event dependent)",
    facilities: ["Dolby Atmos Stage Sound", "Green Rooms 1-4", "VIP Lounge", "Audio-Visual Control Booth"],
    contact: "events.venue@aurelia.edu",
    phone: "+91 (0) 555-0233",
    nearby: ["Administration Block", "Student Activity Centre", "Main Gate"],
    walkingDirections: "Southwest lawn, directly behind the Administration Block."
  },
  {
    id: "loc-sports",
    name: "Sports Ground & Athletics Arena",
    category: "sports",
    x: 78,
    y: 48,
    code: "SPORTS-ARENA",
    description: "Olympic-standard 400m synthetic running track, cricket pitch, football ground, 4 floodlit basketball & badminton courts.",
    hours: "05:30 AM - 09:30 PM (Daily)",
    facilities: ["Locker Rooms & Showers", "Equipment Rental Desk", "Floodlight Controls", "First Aid Corner", "Gymnasium"],
    contact: "sports.director@aurelia.edu",
    phone: "+91 (0) 555-0245",
    nearby: ["Campus Canteen", "Falcon Hostel Complex"],
    walkingDirections: "Far eastern flank of the campus, accessible via the tree-lined Sports Avenue."
  },
  {
    id: "loc-sac",
    name: "Student Activity Centre (SAC)",
    category: "facility",
    x: 22,
    y: 48,
    code: "SAC-HUB",
    description: "Headquarters for all 35+ student clubs, society secretariats, rehearsal studios, indoor gaming tables, and student union council.",
    hours: "08:00 AM - 11:00 PM (Daily)",
    facilities: ["Soundproof Music Jam Room", "Dance Studio with Mirrors", "Club Office Cubicles", "Makerspace 3D Printers"],
    contact: "sac.council@aurelia.edu",
    phone: "+91 (0) 555-0260",
    nearby: ["Auditorium", "Engineering Block", "Falcon Hostel Complex"],
    walkingDirections: "Western wing near the engineering quadrangle."
  },
  {
    id: "loc-hostel",
    name: "Falcon Hostel Complex",
    category: "facility",
    x: 75,
    y: 20,
    code: "HST-FALCON",
    description: "Residential towers accommodating 3,500 students with dedicated study halls, common recreation rooms, laundry, and dining messes.",
    hours: "Resident Access 24/7 (Gate closure at 10:30 PM)",
    facilities: ["Hostel Mess Hall A & B", "Laundromat", "Night Canteen (Open till 2 AM)", "Warden Office", "High-speed Wi-Fi"],
    contact: "warden.falcon@aurelia.edu",
    phone: "+91 (0) 555-0280",
    nearby: ["Health & Medical Centre", "Sports Ground", "CSE Department"],
    walkingDirections: "Northeast corner of campus, connected by Shuttle Route 1 & 3."
  },
  {
    id: "loc-medical",
    name: "Health & Medical Centre",
    category: "facility",
    x: 35,
    y: 18,
    code: "MED-CLINIC",
    description: "Fully equipped campus hospital with 24/7 resident doctor, emergency nursing staff, pharmacy, ambulance, and psychological counselling wing.",
    hours: "Open 24/7 for Emergencies (OPD: 08:30 AM - 07:00 PM)",
    facilities: ["Emergency Bay", "Ambulance Station", "Pharmacy & Dispenser", "Doctor Consultations", "Quiet Recovery Wards"],
    contact: "medical.centre@aurelia.edu",
    phone: "+91 (0) 555-0911",
    nearby: ["Falcon Hostel Complex", "Engineering Block"],
    walkingDirections: "Northwestern boundary, next to the north green park."
  },
  {
    id: "loc-transport",
    name: "Central Transport Hub",
    category: "transport",
    x: 20,
    y: 78,
    code: "TRAN-HUB",
    description: "Campus transit focal terminal where all internal electric shuttles, regional campus buses, and city connection lines converge.",
    hours: "06:30 AM - 11:30 PM (Daily)",
    facilities: ["Live Departure Screen (Demo)", "Shuttle Ticketing & Inquiries", "Covered Waiting Platforms 1-4", "EV Charging Stations"],
    contact: "transport.desk@aurelia.edu",
    phone: "+91 (0) 555-0310",
    nearby: ["Main Gate", "Administration Block", "South Parking Lot"],
    walkingDirections: "Southwest corner near the Main Gate."
  },
  {
    id: "loc-parking",
    name: "South Parking Lot",
    category: "transport",
    x: 75,
    y: 82,
    code: "PARK-STH",
    description: "Covered two-wheeler and four-wheeler student and faculty parking with automated tag scanners and EV charging points.",
    hours: "06:00 AM - 11:00 PM",
    facilities: ["1,200 Two-Wheeler Slots", "350 Car Slots", "Bicycle Lock Racks", "Tire Air Station"],
    contact: "parking.manager@aurelia.edu",
    phone: "+91 (0) 555-0315",
    nearby: ["Main Gate", "Sports Ground"],
    walkingDirections: "East of Main Gate along the outer perimeter wall."
  }
];

export const BUS_ROUTES: BusRoute[] = [
  {
    id: "route-shuttle-1",
    routeNumber: "Shuttle 1",
    name: "Main Circular Campus Line",
    firstDeparture: "07:00 AM",
    lastDeparture: "10:30 PM",
    frequency: "Every 12 - 15 minutes",
    duration: "18 mins complete loop",
    status: "On Time",
    fare: "Free with Aurelia Student ID",
    stops: [
      "Central Transport Hub",
      "Main University Gate",
      "Administration Block",
      "Central Library",
      "Campus Canteen",
      "CSE Department",
      "Falcon Hostel Complex",
      "Health & Medical Centre",
      "Central Transport Hub"
    ],
    currentBusLocationIndex: 3,
    announcements: "Extra shuttles running during peak morning rush (08:30 - 09:30 AM)."
  },
  {
    id: "route-shuttle-2",
    routeNumber: "Shuttle 2",
    name: "Academic Express",
    firstDeparture: "07:30 AM",
    lastDeparture: "07:00 PM",
    frequency: "Every 20 minutes",
    duration: "12 mins",
    status: "On Time",
    fare: "Free with Aurelia Student ID",
    stops: [
      "Central Transport Hub",
      "Engineering Block (West)",
      "Student Activity Centre",
      "Central Library",
      "CSE Department",
      "Sports Ground"
    ],
    currentBusLocationIndex: 1,
    announcements: "Direct non-stop link between Engineering West and CS Department."
  },
  {
    id: "route-shuttle-3",
    routeNumber: "Shuttle 3",
    name: "Hostel & Sports Night Link",
    firstDeparture: "06:00 PM",
    lastDeparture: "11:45 PM",
    frequency: "Every 15 minutes",
    duration: "14 mins",
    status: "On Time",
    fare: "Free with Aurelia Student ID",
    stops: [
      "Falcon Hostel Complex",
      "Campus Canteen",
      "Sports Ground & Arena",
      "Central Library",
      "Health & Medical Centre",
      "Falcon Hostel Complex"
    ],
    currentBusLocationIndex: 0,
    announcements: "Late evening student shuttle for safe night library and sports returns."
  }
];

export const SAMPLE_CLUBS: Club[] = [
  {
    id: "club-code",
    name: "Aurelia Coding Club",
    category: "Technical",
    tagline: "Build, debug, conquer algorithms and ship products.",
    description: "The largest technical society on campus. We host competitive programming drills, open-source cohorts, Web3/AI hackathons, and company tech talks.",
    membersCount: 384,
    leadName: "Rohan Varma (4th Year CSE)",
    email: "coding.club@aurelia.edu",
    meetingSchedule: "Wednesdays 05:30 PM & Saturdays 11:00 AM",
    room: "CSE Lab 3 / SAC Room 102",
    iconName: "Code",
    accentColor: "from-blue-600 to-indigo-600",
    isRecruiting: true
  },
  {
    id: "club-robotics",
    name: "Apex Robotics Society",
    category: "Technical",
    tagline: "From circuit boards to autonomous drones and battle bots.",
    description: "Hands-on robotics club with access to microcontrollers, PCB milling, 3D printers, and robotic arm simulators. Multi-time national Robocon finalists.",
    membersCount: 192,
    leadName: "Tanvi Saxena (3rd Year ECE)",
    email: "robotics@aurelia.edu",
    meetingSchedule: "Tuesdays & Thursdays 05:00 PM",
    room: "Engineering Fabrication Lab B",
    iconName: "Cpu",
    accentColor: "from-cyan-500 to-blue-600",
    isRecruiting: true
  },
  {
    id: "club-photo",
    name: "Aperture Photography Club",
    category: "Creative Arts",
    tagline: "Capturing the light and soul of campus memories.",
    description: "A community of photographers, videographers, and visual storytellers. We cover all major campus fests, conduct golden-hour photowalks, and exhibit in the art gallery.",
    membersCount: 145,
    leadName: "Arjun Nair (3rd Year Design)",
    email: "aperture@aurelia.edu",
    meetingSchedule: "Fridays 04:30 PM & Sunday Photowalks",
    room: "SAC Media Studio 204",
    iconName: "Camera",
    accentColor: "from-purple-500 to-pink-500",
    isRecruiting: false
  },
  {
    id: "club-ecell",
    name: "E-Cell (Entrepreneurship Club)",
    category: "Business & Leadership",
    tagline: "Empowering student founders from napkin sketches to seed funding.",
    description: "Mentors student startups, organizes the annual Aurelia Pitch Fest, connects juniors with alumni VCs, and runs incubator masterclasses.",
    membersCount: 220,
    leadName: "Priyanka Joshi (4th Year MBA Tech)",
    email: "ecell@aurelia.edu",
    meetingSchedule: "Mondays 06:00 PM",
    room: "SAC Conference Room A",
    iconName: "TrendingUp",
    accentColor: "from-amber-500 to-orange-600",
    isRecruiting: true
  },
  {
    id: "club-music",
    name: "Aurelia Music Collective",
    category: "Performing Arts",
    tagline: "Rhythms, chords, rock, classical and unplugged acoustic jams.",
    description: "A sanctuary for vocalists and instrumentalists. Equipped with professional sound monitors, drum kits, electric guitars, and audio production DAWs.",
    membersCount: 160,
    leadName: "Kabir Sen (3rd Year Mech)",
    email: "music.collective@aurelia.edu",
    meetingSchedule: "Daily Jam Sessions 05:30 PM - 08:00 PM",
    room: "SAC Soundproof Studio 003",
    iconName: "Music",
    accentColor: "from-rose-500 to-red-600",
    isRecruiting: true
  },
  {
    id: "club-pulse",
    name: "Pulse Dance Crew",
    category: "Performing Arts",
    tagline: "High-octane hip-hop, contemporary, and fusion choreography.",
    description: "Representing Aurelia at inter-university dance competitions across the country. Welcomes beginners for weekly foundation classes.",
    membersCount: 110,
    leadName: "Sanya Roy (2nd Year Biotech)",
    email: "pulse.dance@aurelia.edu",
    meetingSchedule: "Mon, Wed, Fri 06:00 PM",
    room: "SAC Mirrored Dance Hall",
    iconName: "Activity",
    accentColor: "from-fuchsia-500 to-indigo-500",
    isRecruiting: false
  },
  {
    id: "club-titans",
    name: "Titans Sports & Athletics Club",
    category: "Sports & Fitness",
    tagline: "Passion, grit, teamwork, and championship gold.",
    description: "Oversees university league tournaments in football, basketball, badminton, cricket, and chess. Coordinates regular fitness bootcamps.",
    membersCount: 310,
    leadName: "Devendra Patel (4th Year Civil)",
    email: "titans.sports@aurelia.edu",
    meetingSchedule: "Daily Morning Conditioning 06:00 AM",
    room: "Sports Complex Room 10",
    iconName: "Trophy",
    accentColor: "from-emerald-500 to-teal-600",
    isRecruiting: true
  },
  {
    id: "club-literary",
    name: "Literary & Debating Society",
    category: "Literary",
    tagline: "Where sharp wit meets eloquence and critical discourse.",
    description: "Hosts parliamentary debates, Model UN simulations, slam poetry nights, creative writing workshops, and book club discussions.",
    membersCount: 135,
    leadName: "Meera Krishnan (3rd Year Humanities)",
    email: "debsoc@aurelia.edu",
    meetingSchedule: "Thursdays 05:00 PM",
    room: "Central Library Seminar Hall",
    iconName: "BookOpen",
    accentColor: "from-indigo-400 to-cyan-500",
    isRecruiting: true
  },
  {
    id: "club-design",
    name: "Design & Creative Guild",
    category: "Creative Arts",
    tagline: "UI/UX, 3D blender art, motion graphics, and brand design.",
    description: "Campus design community collaborating on posters, UI for campus apps, design critique jams, and portfolio build sprints.",
    membersCount: 175,
    leadName: "Neil Fernandez (3rd Year Design)",
    email: "design.guild@aurelia.edu",
    meetingSchedule: "Saturdays 03:00 PM",
    room: "Design Studio 301",
    iconName: "Palette",
    accentColor: "from-violet-500 to-purple-600",
    isRecruiting: true
  }
];

export const CAMPUS_EVENTS: CampusEvent[] = [
  {
    id: "evt-hackathon",
    title: "Aurelia Hackathon 2026: Code the Future",
    clubId: "club-code",
    clubName: "Aurelia Coding Club",
    category: "Hackathon",
    date: "Nov 14 - Nov 15, 2026",
    time: "Starts 09:00 AM (36 Hours)",
    venue: "Grand Auditorium & CSE Labs",
    description: "The flagship annual hackathon featuring tracks in AI Agents, Campus Life SaaS, Green Tech, and Fintech. Cash prizes, swag bags, and internship interviews.",
    isSponsored: true,
    isPromoted: true,
    isFeatured: true,
    referralCode: "HACK-HERO-42",
    referralClicks: 142,
    registeredCount: 388,
    maxCapacity: 500,
    source: "Sponsored / Promoted",
    promoterName: "Apex Cloud Tech & DevCorp"
  },
  {
    id: "evt-robotics-expo",
    title: "RoboWars & Autonomous Drone Showcase",
    clubId: "club-robotics",
    clubName: "Apex Robotics Society",
    category: "Exhibition",
    date: "Nov 06, 2026",
    time: "02:00 PM - 06:30 PM",
    venue: "Engineering Quadrangle",
    description: "Live arena combat between 15kg robot battle bots, obstacle course drone racing, and autonomous line-follower demonstrations.",
    isSponsored: false,
    isPromoted: false,
    isFeatured: true,
    registeredCount: 215,
    maxCapacity: 350,
    source: "Club Announcement"
  },
  {
    id: "evt-fresher-welcome",
    title: "Official Vice-Chancellor Welcome & Fresher Induction",
    clubName: "Dean of Student Affairs",
    category: "University Official",
    date: "Nov 02, 2026",
    time: "10:00 AM - 01:00 PM",
    venue: "Grand Auditorium",
    description: "Compulsory induction address for all incoming Batch 2026 freshers. Introduction of academic deans, campus safety policies, and library privileges.",
    isSponsored: false,
    isPromoted: false,
    isFeatured: true,
    registeredCount: 850,
    maxCapacity: 1200,
    source: "Official University Information"
  },
  {
    id: "evt-acoustic-night",
    title: "Under The Stars: Acoustic Unplugged Jam",
    clubId: "club-music",
    clubName: "Aurelia Music Collective",
    category: "Cultural",
    date: "Nov 08, 2026",
    time: "07:00 PM - 10:00 PM",
    venue: "Canteen Open Air Amphitheatre",
    description: "Grab a warm coffee and relax with live indie acoustic performances, violin harmonies, and open-mic student poetry by starlight.",
    isSponsored: false,
    isPromoted: false,
    isFeatured: false,
    registeredCount: 160,
    maxCapacity: 250,
    source: "Club Announcement"
  },
  {
    id: "evt-career-pitch",
    title: "Campus Seed Fund: Student Startup Pitch Day",
    clubId: "club-ecell",
    clubName: "E-Cell (Entrepreneurship Club)",
    category: "Business",
    date: "Nov 19, 2026",
    time: "01:30 PM - 05:30 PM",
    venue: "Administration Conference Hall 1",
    description: "Ten shortlisted student ventures pitch in front of regional angel investors for seed micro-grants up to $5,000 and incubator mentorship.",
    isSponsored: true,
    isPromoted: true,
    isFeatured: false,
    referralCode: "ECELL-PITCH-26",
    referralClicks: 89,
    registeredCount: 95,
    maxCapacity: 150,
    source: "Sponsored / Promoted",
    promoterName: "Horizon Ventures Guild"
  },
  {
    id: "evt-sports-meet",
    title: "Inter-Department Cricket & Football Tournament",
    clubId: "club-titans",
    clubName: "Titans Sports & Athletics Club",
    category: "Sports",
    date: "Nov 22 - Nov 25, 2026",
    time: "08:00 AM - 06:00 PM",
    venue: "Sports Ground & Athletics Arena",
    description: "Cheer your department in the grand annual sports clash. Trophies for championship departments and best athletes.",
    isSponsored: false,
    isPromoted: false,
    isFeatured: false,
    registeredCount: 420,
    maxCapacity: 600,
    source: "Club Announcement"
  }
];

export const TIMETABLE_ENTRIES: TimetableEntry[] = [
  { day: "Monday", time: "09:00 - 10:30 AM", courseCode: "CS101", courseName: "Introduction to Programming & C", room: "CSE LH-101", instructor: "Dr. Arvind Rao", type: "Lecture" },
  { day: "Monday", time: "11:00 - 12:30 PM", courseCode: "MA101", courseName: "Engineering Calculus & Linear Algebra", room: "Engg West 202", instructor: "Prof. Sunita Sharma", type: "Lecture" },
  { day: "Monday", time: "02:00 - 05:00 PM", courseCode: "CS101L", courseName: "Programming & Data Lab", room: "Turing Lab Bay 2", instructor: "Asst. Prof. R. George", type: "Lab" },
  { day: "Tuesday", time: "10:00 - 11:30 AM", courseCode: "PH101", courseName: "Applied Physics for Engineers", room: "Science Block 301", instructor: "Dr. K. Nambiar", type: "Lecture" },
  { day: "Tuesday", time: "01:30 - 03:00 PM", courseCode: "EE101", courseName: "Basic Electrical & Electronics", room: "Engg West 104", instructor: "Prof. Deepa Roy", type: "Lecture" },
  { day: "Wednesday", time: "09:00 - 10:30 AM", courseCode: "CS101", courseName: "Data Structures Foundations", room: "CSE LH-101", instructor: "Dr. Arvind Rao", type: "Lecture" },
  { day: "Wednesday", time: "11:00 - 12:30 PM", courseCode: "MA101", courseName: "Calculus Problem Solving", room: "Engg West 202", instructor: "Prof. Sunita Sharma", type: "Tutorial" },
  { day: "Wednesday", time: "02:00 - 04:30 PM", courseCode: "PH101L", courseName: "Optics & Semiconductor Lab", room: "Physics Lab 1", instructor: "Dr. K. Nambiar", type: "Lab" },
  { day: "Thursday", time: "10:00 - 11:30 AM", courseCode: "HS101", courseName: "Technical Communication & Ethics", room: "Library LH-2", instructor: "Prof. Evelyn Vance", type: "Lecture" },
  { day: "Thursday", time: "02:00 - 03:30 PM", courseCode: "EE101", courseName: "Circuits & Signal Processing", room: "Engg West 104", instructor: "Prof. Deepa Roy", type: "Lecture" },
  { day: "Friday", time: "09:30 - 11:00 AM", courseCode: "CS101", courseName: "Algorithm Design Discussion", room: "CSE LH-101", instructor: "Dr. Arvind Rao", type: "Tutorial" },
  { day: "Friday", time: "02:00 - 05:00 PM", courseCode: "EE101L", courseName: "Electronics Hardware Testing Lab", room: "Hardware Lab 4", instructor: "Prof. Deepa Roy", type: "Lab" }
];

export const EXAM_SCHEDULE: ExamScheduleItem[] = [
  { id: "ex-1", courseCode: "CS101", courseName: "Introduction to Programming & C", date: "Dec 08, 2026", time: "09:30 AM - 12:30 PM", venue: "Auditorium Hall A", seatRange: "AU-26-001 to AU-26-150", status: "Upcoming" },
  { id: "ex-2", courseCode: "MA101", courseName: "Engineering Calculus & Linear Algebra", date: "Dec 11, 2026", time: "09:30 AM - 12:30 PM", venue: "CSE Department Exam Hall 201", seatRange: "AU-26-001 to AU-26-080", status: "Upcoming" },
  { id: "ex-3", courseCode: "PH101", courseName: "Applied Physics for Engineers", date: "Dec 14, 2026", time: "02:00 PM - 05:00 PM", venue: "Science Block LH 1-3", seatRange: "AU-26-001 to AU-26-120", status: "Upcoming" },
  { id: "ex-4", courseCode: "EE101", courseName: "Basic Electrical & Electronics", date: "Dec 17, 2026", time: "09:30 AM - 12:30 PM", venue: "Engineering West Ground Hall", seatRange: "AU-26-001 to AU-26-200", status: "Upcoming" },
  { id: "ex-5", courseCode: "HS101", courseName: "Technical Communication & Ethics", date: "Dec 20, 2026", time: "02:00 PM - 04:00 PM", venue: "Central Library Seminar Room", seatRange: "AU-26-001 to AU-26-300", status: "Upcoming" }
];

export const ASSIGNMENTS: AssignmentItem[] = [
  { id: "asg-1", title: "Pointer Arithmetic & Memory Management in C", courseCode: "CS101", dueDate: "Nov 05, 2026 (11:59 PM)", points: 20, status: "In Progress", description: "Implement dynamic allocation for sparse matrices with memory leak detection." },
  { id: "asg-2", title: "Eigenvalues, Matrix Diagonalization & Graph Models", courseCode: "MA101", dueDate: "Nov 09, 2026 (05:00 PM)", points: 25, status: "Pending", description: "Solve problem set 4 exercises 1 through 12 on orthogonal projections." },
  { id: "asg-3", title: "Diffraction Grating Lab Report & Error Analysis", courseCode: "PH101L", dueDate: "Nov 12, 2026 (02:00 PM)", points: 15, status: "Pending", description: "Submit formal lab write-up with plot calibrations and wavelength calculations." },
  { id: "asg-4", title: "Thevenin & Norton Equivalent Circuit Simulation", courseCode: "EE101", dueDate: "Oct 28, 2026 (05:00 PM)", points: 20, status: "Submitted", description: "Simulated nodal analysis and verified with breadboard oscilloscope readings." }
];

export const STUDY_RESOURCES: StudyResource[] = [
  { id: "res-1", title: "Handwritten C Programming & Pointers Master Notes", subject: "Programming", department: "Computer Science", semester: "Semester 1", type: "Notes", author: "Tanmay (Alumnus '25)", size: "4.8 MB PDF", downloads: 842 },
  { id: "res-2", title: "Calculus 1 Solved Mid-Term & End-Term Papers (2021-2025)", subject: "Mathematics", department: "Applied Sciences", semester: "Semester 1", type: "Previous Papers", author: "Academic Cell", size: "12.3 MB PDF", downloads: 1210 },
  { id: "res-3", title: "Official Physics Lab Manual & Circuit Cheat Sheet", subject: "Applied Physics", department: "Physics Dept", semester: "Semester 1", type: "Lab Manual", author: "Prof. K. Nambiar", size: "6.1 MB PDF", downloads: 654 },
  { id: "res-4", title: "Digital Logic Design & Karnaugh Maps Summary Guide", subject: "Electrical Engg", department: "ECE / CSE", semester: "Semester 1", type: "Notes", author: "Senior Mentor Bureau", size: "3.2 MB PDF", downloads: 720 }
];

export const SENIOR_MENTORS: SeniorMentor[] = [
  {
    id: "snr-1",
    name: "Rhea Deshmukh",
    department: "Computer Science & Engineering",
    year: "4th Year (Senior)",
    gpaBadge: "CGPA 9.4 / 10",
    skills: ["Full-Stack Next.js", "Data Structures", "Open Source", "Internship Prep"],
    interests: ["Hackathons", "Tech Community Leadership", "Cloud Architecture"],
    bio: "Ex-Google summer intern and former president of Aurelia Coding Club. Love helping 1st-year students avoid freshman burnout and land strong summer fellowships.",
    topTip: "Don't just watch tutorial videos—build 2 tiny unpolished projects from scratch each month. That puts you in the top 5% of your class.",
    availableSlots: 3,
    contactEmail: "rhea.d@student.aurelia.edu",
    isAvailable: true,
    avatarUrl: "RD"
  },
  {
    id: "snr-2",
    name: "Vikramaditya Roy",
    department: "Mechanical & Robotics",
    year: "3rd Year (Junior)",
    gpaBadge: "CGPA 8.9 / 10",
    skills: ["SolidWorks CAD", "Embedded C", "Robocon", "3D Prototyping"],
    interests: ["Robotics", "Formula Student", "Motorsport Engineering"],
    bio: "Lead chassis designer for Team Aurelia Motorsports. Happy to mentor juniors on CAD tools, workshop safety clearances, and mechanical department projects.",
    topTip: "Spend time in the central fabrication workshop early in your semester. Practical shop skills will make your theoretical mechanics much easier.",
    availableSlots: 2,
    contactEmail: "vikram.roy@student.aurelia.edu",
    isAvailable: true,
    avatarUrl: "VR"
  },
  {
    id: "snr-3",
    name: "Aanya Chawla",
    department: "Electronics & Communication",
    year: "4th Year (Senior)",
    gpaBadge: "CGPA 9.2 / 10",
    skills: ["Signal Processing", "VLSI Design", "Verilog", "Research Publishing"],
    interests: ["Semiconductors", "Academic Scholarships", "GRE & Higher Studies"],
    bio: "Published researcher in IEEE student conference. Mentoring students aiming for master's programs abroad or core semiconductor company roles.",
    topTip: "Keep your calculus and basic physics fundamentals crystal clear. Everything in 2nd and 3rd year builds directly on them.",
    availableSlots: 4,
    contactEmail: "aanya.c@student.aurelia.edu",
    isAvailable: true,
    avatarUrl: "AC"
  },
  {
    id: "snr-4",
    name: "Karan Johal",
    department: "Information Technology",
    year: "3rd Year (Junior)",
    gpaBadge: "CGPA 8.7 / 10",
    skills: ["DevOps & Docker", "Cybersecurity", "Linux Kernel", "Capture The Flag"],
    interests: ["Network Security", "Self-Hosting", "Open Source"],
    bio: "Active CTF player and mentor at the Aurelia Cyber Defense group. Helping freshers transition comfortably into Linux and system engineering.",
    topTip: "Dual-boot Linux or set up WSL on your laptop in the first two weeks. It saves you hundreds of hours of debugging later.",
    availableSlots: 1,
    contactEmail: "karan.j@student.aurelia.edu",
    isAvailable: true,
    avatarUrl: "KJ"
  }
];

export const LOST_FOUND_ITEMS: LostFoundItem[] = [
  {
    id: "lf-1",
    type: "found",
    title: "Navy Blue Hydration Flask (Hydro Flask 32oz)",
    category: "Bottles & Containers",
    description: "Insulated matte navy bottle with mountain stickers and a small dent near the bottom rim. Found on bench outside Central Library.",
    location: "Central Library Steps",
    dateReported: "Oct 29, 2026",
    status: "Reported",
    imagePlaceholder: "Flask",
    claims: []
  },
  {
    id: "lf-2",
    type: "found",
    title: "Apple AirPods Pro (2nd Gen) in Translucent Case",
    category: "Electronics",
    description: "White charging case inside a smoky grey silicone bumper. Engraved with initials 'M.K.'. Safely handed over to Admin Desk.",
    location: "Campus Canteen Table 14",
    dateReported: "Oct 28, 2026",
    status: "Under Review",
    imagePlaceholder: "AirPods",
    claims: [
      {
        id: "cl-1",
        claimantName: "Mohit Kapoor",
        claimantEmail: "mohit.k@student.aurelia.edu",
        proofDetails: "Bluetooth MAC address starts with AC:7F, paired with iPhone 14 named Mohit's Phone.",
        uniqueMarks: "Has a tiny scratch on the right pod ear-tip.",
        status: "Pending",
        submittedAt: "Oct 29, 2026 04:30 PM"
      }
    ]
  },
  {
    id: "lf-3",
    type: "lost",
    title: "Black HP Pavilion Laptop Bag with Calculus Notebook",
    category: "Books & Stationery",
    description: "Contains handwritten MA101 notes, Casio fx-991EX calculator, and blue umbrella. Left during evening class.",
    location: "CSE Lecture Hall 101 (Row 4)",
    dateReported: "Oct 27, 2026",
    status: "Reported",
    imagePlaceholder: "Bag",
    claims: []
  },
  {
    id: "lf-4",
    type: "found",
    title: "Official Aurelia University Student ID Card",
    category: "IDs & Cards",
    description: "ID card belonging to a 2nd Year Mechanical student. Deposited with Main Gate Security Guard Cabin.",
    location: "Sports Ground Pavilion",
    dateReported: "Oct 26, 2026",
    status: "Claimed",
    imagePlaceholder: "ID Card",
    claims: []
  }
];

export const MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: "mkt-1",
    title: "Data Structures and Algorithm Analysis in C++ (4th Ed - Weiss)",
    category: "Textbooks",
    price: 380,
    condition: "Like New",
    sellerName: "Rohan Varma",
    sellerDept: "CSE",
    sellerYear: "4th Year",
    sellerContact: "rohan.v@student.aurelia.edu",
    status: "Available",
    subject: "Data Structures",
    semester: "Semester 2",
    department: "Computer Science",
    edition: "4th International Edition",
    description: "Barely used, clean pages with no highlighter marks. Essential reference book for CS102 and competitive programming.",
    postedDate: "Oct 27, 2026",
    imagePlaceholder: "Book",
    wantedRequestsCount: 4
  },
  {
    id: "mkt-2",
    title: "Thomas' Calculus: Early Transcendentals (14th Edition)",
    category: "Textbooks",
    price: 450,
    condition: "Good",
    sellerName: "Shreya Malik",
    sellerDept: "Mathematics",
    sellerYear: "2nd Year",
    sellerContact: "shreya.m@student.aurelia.edu",
    status: "Available",
    subject: "Engineering Mathematics",
    semester: "Semester 1",
    department: "Applied Sciences",
    edition: "14th Global Edition",
    description: "Complete calculus textbook required for MA101. Includes step-by-step solved practice problem booklet.",
    postedDate: "Oct 25, 2026",
    imagePlaceholder: "Book",
    wantedRequestsCount: 7
  },
  {
    id: "mkt-3",
    title: "Casio fx-991EX ClassWiz Non-Programmable Scientific Calculator",
    category: "Electronics",
    price: 750,
    condition: "Like New",
    sellerName: "Aditya Nair",
    sellerDept: "Electrical",
    sellerYear: "3rd Year",
    sellerContact: "aditya.n@student.aurelia.edu",
    status: "Available",
    department: "All Engineering",
    description: "Approved for university exams. Has high-resolution natural textbook display and matrix vector solvers. Battery in 100% health.",
    postedDate: "Oct 28, 2026",
    imagePlaceholder: "Calculator",
    wantedRequestsCount: 12
  },
  {
    id: "mkt-4",
    title: "Engineering Drawing Drafting Board + Mini Drafter Kit",
    category: "Study Aids",
    price: 520,
    condition: "Good",
    sellerName: "Deepak Kumar",
    sellerDept: "Mechanical",
    sellerYear: "2nd Year",
    sellerContact: "deepak.k@student.aurelia.edu",
    status: "Reserved",
    subject: "Engineering Graphics",
    semester: "Semester 1",
    department: "Mechanical / Civil",
    description: "Complete wooden drawing board with brass clamp mini-drafter, set squares, and canvas carry case. Saves purchasing brand new.",
    postedDate: "Oct 24, 2026",
    imagePlaceholder: "Drafting",
    wantedRequestsCount: 3
  },
  {
    id: "mkt-5",
    title: "Rechargeable LED Desk Lamp with 3 Color Modes & Phone Stand",
    category: "Hostel Gear",
    price: 320,
    condition: "Brand New",
    sellerName: "Kavita Rao",
    sellerDept: "Biotechnology",
    sellerYear: "2nd Year",
    sellerContact: "kavita.r@student.aurelia.edu",
    status: "Available",
    description: "Great for late-night hostel study sessions without disturbing roommates. USB-C rechargeable, 12-hour battery life.",
    postedDate: "Oct 29, 2026",
    imagePlaceholder: "Lamp",
    wantedRequestsCount: 2
  }
];

export const CAMPUS_MEMORIES: MemoryPost[] = [
  {
    id: "mem-1",
    title: "How to survive 1st semester CS without getting overwhelmed",
    department: "Computer Science",
    year: "Class of 2025",
    semester: "Semester 1",
    subject: "General Fresher Advice",
    topic: "Academics",
    author: "Rohan Varma",
    authorRole: "Senior / Coding Club Lead",
    date: "Sep 15, 2026",
    upvotes: 184,
    userUpvoted: true,
    userBookmarked: true,
    tags: ["Academics", "Coding", "First Year", "Time Management"],
    content: "When you start, professors will jump straight into memory pointers, recursion, and discrete math. Don't panic if your high school had no programming. The university Turing Lab has open tutoring every Wednesday evening. Form a group of 3-4 peers to solve lab sheets together. Most importantly: submit lab records on time; attendance and continuous assessment are 40% of your grade!"
  },
  {
    id: "mem-2",
    title: "The secret quiet zone on Central Library 3rd Floor",
    department: "All University",
    year: "Class of 2024",
    semester: "All Semesters",
    location: "Central Library 3rd Floor West",
    topic: "Campus Secret",
    author: "Zoya Akhtar",
    authorRole: "Alumna",
    date: "Aug 20, 2026",
    upvotes: 142,
    userUpvoted: false,
    userBookmarked: true,
    tags: ["Library", "Study Spots", "Quiet Zone"],
    content: "The ground floor and 1st floor get noisy with project groups. If you take the back stairs behind the periodical stacks up to 3rd floor west, there is an enclosed natural-light reading alcove facing the botanical garden. Plugs at every desk and absolute silence. Best spot on campus for mid-term cramming."
  },
  {
    id: "mem-3",
    title: "Free printing & poster plotting hack at SAC Makerspace",
    department: "Design & Arts",
    year: "Class of 2026",
    semester: "Semester 3",
    location: "SAC Room 104",
    topic: "Campus Secret",
    author: "Neil Fernandez",
    authorRole: "Design Guild",
    date: "Sep 28, 2026",
    upvotes: 98,
    userUpvoted: false,
    userBookmarked: false,
    tags: ["Makerspace", "Printing", "SAC", "Savings"],
    content: "Don't pay 10 bucks a sheet at external xerox shops. The SAC Makerspace allows student club members and verified course projects up to 50 free laser prints a month if you bring your own 75gsm A4 paper. Just show your student ID to the student coordinator on duty."
  },
  {
    id: "mem-4",
    title: "Canteen Food Court combo: The Paneer Tikka Sub hack",
    department: "Student Life",
    year: "Class of 2025",
    semester: "All Semesters",
    location: "Campus Canteen Counter 2",
    topic: "Hostel Life",
    author: "Samarth Nair",
    authorRole: "Hostel Falcon Rep",
    date: "Oct 04, 2026",
    upvotes: 115,
    userUpvoted: false,
    userBookmarked: false,
    tags: ["Food", "Canteen", "Budget Eating"],
    content: "If you're on a tight budget between 4 PM and 6 PM, ask Counter 2 for the freshly toasted multigrain roll with extra mint chutney. Cost is only ₹60 and it fills you up before evening lab sessions!"
  }
];

export const STUDENT_SUGGESTIONS: StudentSuggestion[] = [
  {
    id: "sug-1",
    trackingId: "AUR-S7821",
    title: "Extend Central Library reading hall hours until 02:00 AM during mid-terms",
    category: "Campus Facilities",
    description: "During exam fortnight, hostel rooms can be distracting. Having the ground floor digital reading hall open until 2:00 AM with security patrol will benefit day-scholars and hostellers alike.",
    rating: 5,
    status: "Accepted",
    submittedAt: "Oct 18, 2026",
    upvotes: 168,
    userUpvoted: true,
    updates: [
      { date: "Oct 19, 2026", status: "Under Review", comment: "Forwarded to Chief Librarian and Dean of Infrastructure." },
      { date: "Oct 24, 2026", status: "Accepted", comment: "Approved for upcoming December exam cycle with additional night guards deployed." }
    ],
    adminResponse: "Library Administration has approved the 2 AM extension starting November 25 through December 22."
  },
  {
    id: "sug-2",
    trackingId: "AUR-S7834",
    title: "Add dedicated morning shuttle between Falcon Hostel and CSE Block",
    category: "Transportation",
    description: "At 08:45 AM, Shuttle 1 is overflowing with students from hostels heading to morning 9 AM labs. A dedicated direct express shuttle would ease overcrowding.",
    rating: 4,
    status: "In Progress",
    submittedAt: "Oct 21, 2026",
    upvotes: 134,
    userUpvoted: false,
    updates: [
      { date: "Oct 22, 2026", status: "Under Review", comment: "Transport Desk evaluating shuttle capacity telemetry." },
      { date: "Oct 26, 2026", status: "In Progress", comment: "Additional 32-seater EV bus scheduled for pilot run beginning next Monday." }
    ],
    adminResponse: "Pilot bus trial scheduled for 08:35 AM and 08:50 AM departure slots."
  },
  {
    id: "sug-3",
    trackingId: "AUR-S7850",
    title: "Install additional high-output water dispensers on Engineering West 2nd Floor",
    category: "Campus Facilities",
    description: "The current water cooler on the 2nd floor is frequently empty during afternoon labs, causing students to walk down two flights.",
    rating: 4,
    status: "Resolved",
    submittedAt: "Oct 12, 2026",
    upvotes: 92,
    updates: [
      { date: "Oct 15, 2026", status: "In Progress", comment: "Estate office assigned maintenance ticket #EST-409." },
      { date: "Oct 23, 2026", status: "Resolved", comment: "New RO UV dispenser installed and pressure calibrated." }
    ],
    adminResponse: "Completed. Two new stainless steel dispensers operational outside Room 204."
  }
];

export const CAMPUS_ANNOUNCEMENTS: CampusAnnouncement[] = [
  {
    id: "ann-1",
    title: "Official Mid-Semester Examination Timetable Published",
    date: "Oct 29, 2026",
    category: "Examinations",
    source: "Official University Information",
    summary: "Office of the Controller of Examinations has published the finalized schedule for Semester 1 & 3 B.Tech courses.",
    content: "All students must download their digital admit cards from the student portal before November 10. Seating arrangements and room allocations are posted in the Academic section."
  },
  {
    id: "ann-2",
    title: "Perseus v1.4 Released: Offline Campus Guide & Route Planner Live",
    date: "Oct 28, 2026",
    category: "Platform Update",
    source: "Verified Perseus Team Update",
    summary: "Students can now cache the campus directory, emergency helplines, and shuttle time tables for offline reference.",
    content: "The Perseus engineering team has enabled zero-network access to critical university survival resources. Toggle offline mode in Settings anytime!"
  },
  {
    id: "ann-3",
    title: "Annual Robocon 2027 Trials Announced by Apex Robotics",
    date: "Oct 26, 2026",
    category: "Club Notice",
    source: "Club Announcement",
    summary: "Freshers and 2nd years interested in embedded coding, chassis fabrication, or power electronics are invited to trials.",
    content: "No prior experience required. Training workshops will be conducted on Saturdays in the Engineering Fab Lab."
  },
  {
    id: "ann-4",
    title: "Free Cloud Certification Vouchers Sponsored by Apex Cloud Tech",
    date: "Oct 25, 2026",
    category: "Career / Sponsorship",
    source: "Sponsored / Promoted",
    summary: "Top 100 students participating in Aurelia Hackathon 2026 receive $300 in free cloud computing credits.",
    content: "Courtesy of our partner Apex Cloud Tech. Track your referral link and team registrations under the Clubs & Events promotion hub."
  }
];

export const PROMOTION_ANALYTICS: PromotionAnalytics[] = [
  {
    id: "promo-1",
    campaignName: "Aurelia Hackathon 2026 Mega Push",
    eventTitle: "Aurelia Hackathon 2026: Code the Future",
    sponsorName: "Apex Cloud Tech & DevCorp",
    referralCode: "HACK-HERO-42",
    views: 1840,
    clicks: 412,
    conversions: 188,
    ctr: "22.4%",
    status: "Active",
    budgetDemo: "$1,200 Demo Allocation"
  },
  {
    id: "promo-2",
    campaignName: "Founder Seed Grant Pitch Drive",
    eventTitle: "Campus Seed Fund: Student Startup Pitch Day",
    sponsorName: "Horizon Ventures Guild",
    referralCode: "ECELL-PITCH-26",
    views: 920,
    clicks: 148,
    conversions: 62,
    ctr: "16.1%",
    status: "Active",
    budgetDemo: "$600 Demo Allocation"
  },
  {
    id: "promo-3",
    campaignName: "Acoustic Cafe Autumn Sponsor Jam",
    eventTitle: "Under The Stars: Acoustic Unplugged Jam",
    sponsorName: "GreenBean Artisan Cafe",
    referralCode: "MUSIC-JAM-BEAN",
    views: 640,
    clicks: 86,
    conversions: 45,
    ctr: "13.4%",
    status: "Ended",
    budgetDemo: "$250 Demo Allocation"
  }
];

export const WELLBEING_RESOURCES = {
  emergencyContacts: [
    { name: "24/7 Campus Medical Emergency Response", phone: "+91 (0) 555-0911", desc: "Immediate ambulance dispatch and doctor on call" },
    { name: "Anti-Ragging Squad Helpline (Zero Tolerance)", phone: "+91 (0) 555-0999", desc: "Confidential immediate dean intervention squad" },
    { name: "Chief Proctor & Security Control Room", phone: "+91 (0) 555-0100", desc: "Campus boundary, gates, and nighttime escorts" },
    { name: "Student Psychological Counselling Sanctuary", phone: "+91 (0) 555-0720", desc: "Trained confidential licensed counsellors" },
    { name: "Women's Internal Complaints Committee (ICC)", phone: "+91 (0) 555-0810", desc: "Safe grievance reporting and legal counsel" }
  ],
  guidanceCards: [
    {
      title: "Feeling Overwhelmed by Academic Pressure?",
      approach: "Student Wellbeing Counselling Desk (Room 102, Health Centre)",
      details: "Free, 100% confidential sessions with professional psychologists. Walk-ins welcome Mon-Sat 9 AM to 6 PM or book via email sanctuary@aurelia.edu.",
      color: "from-blue-600/30 to-indigo-600/20"
    },
    {
      title: "Facing Harassment or Bullying?",
      approach: "Anti-Ragging Squad & Dean of Student Affairs",
      details: "Aurelia University maintains a zero-tolerance policy. Anonymous complaints can be logged, with disciplinary proceedings initiated within 24 hours.",
      color: "from-rose-600/30 to-red-600/20"
    },
    {
      title: "Physical Illness, Injury or Late-Night Sickness?",
      approach: "Health & Medical Centre (North Wing, next to Hostels)",
      details: "Open 24/7 with resident medical officers, clean recovery wards, generic medicines, and ambulance transport to city referral hospitals.",
      color: "from-emerald-600/30 to-teal-600/20"
    },
    {
      title: "Academic Grievances or Grade Discrepancies?",
      approach: "Department Student Advisor or Faculty Ombudsman",
      details: "Approach your assigned faculty mentor or file a re-evaluation petition at the Administration Academic Desk within 14 days of grade publication.",
      color: "from-purple-600/30 to-violet-600/20"
    }
  ]
};

