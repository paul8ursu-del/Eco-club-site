import { Initiative, ClubEvent, MemberSpotlight, VolunteerRole } from '../types';

import heroImg from '../assets/images/hero_eco_club_1791541184217.jpg';
import rewildingImg from '../assets/images/initiative_rewilding_1791541195791.jpg';
import repairCafeImg from '../assets/images/initiative_repair_cafe_1791541206355.jpg';
import riverCleanupImg from '../assets/images/event_river_cleanup_1791541218001.jpg';
import mayaSpotlightImg from '../assets/images/member_spotlight_maya_1791541880723.jpg';
import marcusSpotlightImg from '../assets/images/member_spotlight_marcus_1791541891042.jpg';
import elenaSpotlightImg from '../assets/images/member_spotlight_elena_1791541905461.jpg';

export { heroImg, rewildingImg, repairCafeImg, riverCleanupImg, mayaSpotlightImg, marcusSpotlightImg, elenaSpotlightImg };

export const INITIATIVES: Initiative[] = [
  {
    id: 'canteen-food-waste',
    number: '01',
    title: 'Canteen Food Waste Reduction Initiative',
    category: 'Circular',
    shortDesc: 'Partnering with school dining services to track daily plate waste, optimize portion sizing, and divert surplus food.',
    fullDesc: 'Our primary school campaign focuses on auditing school canteen prep and plate waste. We work directly with dining staff and students during Thursday lunchtime in room d4 to measure leftover food, run awareness campaigns, and establish composting bins for unavoidable kitchen scraps.',
    image: heroImg,
    impactMetric: '320 kg food waste diverted · Weekly d4 lunchtime audits',
    leadName: 'Maya Lin',
    leadRole: 'Canteen Waste Coordinator',
    meetingTime: 'Thursday Lunchtime',
    meetingPlace: 'Room d4',
    tasks: [
      'Daily lunchtime plate waste sorting and weighing',
      'Dining hall signage and student awareness campaigns',
      'Liaising with kitchen staff on portion optimization',
      'Managing compost collection buckets'
    ]
  },
  {
    id: 'eco-packaging',
    number: '02',
    title: 'Eco-Friendly Canteen Packaging Campaign',
    category: 'Policy & Action',
    shortDesc: 'Transitioning takeaway containers, cutlery, and napkins to compostable, plant-based, and reusable alternatives.',
    fullDesc: 'Single-use plastics in school canteens create unnecessary landfill waste. Our packaging action team tests biodegradable bamboo and bagasse containers, designs student reusable cutlery kits, and presents packaging transition proposals to school administration during Thursday meetings in d4.',
    image: rewildingImg,
    impactMetric: '1,400 single-use plastics replaced · Reusable tray system trials',
    leadName: 'Marcus Thorne',
    leadRole: 'Packaging Transition Lead',
    meetingTime: 'Thursday Lunchtime',
    meetingPlace: 'Room d4',
    tasks: [
      'Sourcing plant-based bagasse and bamboo containers',
      'Running student reusable container check-out trials',
      'Auditing supplier packaging lifecycles',
      'Presenting proposals to school leadership'
    ]
  },
  {
    id: 'member-recruitment',
    number: '03',
    title: 'School-Wide Member Recruitment Drive',
    category: 'Policy & Action',
    shortDesc: 'Welcoming students from Year 7 through 13, teacher assistants, and teachers into our active Thursday lunchtime meetings.',
    fullDesc: 'Building a sustainable school community starts with inclusive recruitment. We host weekly sign-up sessions in d4 every Thursday lunchtime, pairing new members with active projects on food waste reduction and packaging audits.',
    image: riverCleanupImg,
    impactMetric: '85 new members recruited · Weekly Thursday gatherings in d4',
    leadName: 'Elena Vance',
    leadRole: 'Membership & Outreach Coordinator',
    meetingTime: 'Thursday Lunchtime',
    meetingPlace: 'Room d4',
    tasks: [
      'Hosting welcome onboarding tables at d4',
      'Designing info posters and morning briefing slides',
      'Pairing new members with canteen audit teams',
      'Maintaining active club attendance records'
    ]
  }
];

export const UPCOMING_EVENTS: ClubEvent[] = [
  {
    id: 'evt-campus-cleanup',
    title: 'Campus Cleanup Drive',
    category: 'Fieldwork',
    dateStr: 'Thursday, October 15, 2026',
    timeStr: 'Thursday Lunchtime',
    location: 'd4',
    description: 'Join our weekly lunchtime meeting at d4 to plan our campus cleanup and litter audit. We will organize quadrant teams, separate recyclables, and coordinate student gear.',
    capacity: 60,
    rsvpCount: 47,
    gearProvided: 'Burlap collection bags, grabbers, high-vis vests, work gloves'
  },
  {
    id: 'evt-guest-speaker',
    title: 'Guest Speaker: Sustainable Living',
    category: 'Advocacy',
    dateStr: 'Thursday, October 22, 2026',
    timeStr: 'Thursday Lunchtime',
    location: 'd4',
    description: 'An engaging lunchtime presentation and discussion on zero-waste domestic systems, decentralized composting, and student climate leadership.',
    capacity: 120,
    rsvpCount: 94,
    gearProvided: 'Complimentary zine guides, discussion notes'
  },
  {
    id: 'evt-tree-planting',
    title: 'Tree Planting Initiative',
    category: 'Fieldwork',
    dateStr: 'Thursday, October 29, 2026',
    timeStr: 'Thursday Lunchtime',
    location: 'd4',
    description: 'Planning session for our upcoming native riparian sapling planting along the river corridor to restore shade and prevent sediment runoff.',
    capacity: 50,
    rsvpCount: 42,
    gearProvided: 'Sapling root dips, mulch buckets, site maps'
  }
];

export const MEMBER_SPOTLIGHTS: MemberSpotlight[] = [
  {
    id: 'spotlight-maya',
    name: 'Maya Lin',
    role: 'Food Forest & Nursery Coordinator',
    majorAndYear: 'Sophomore · Urban Planning',
    photo: mayaSpotlightImg,
    bio: 'Maya joined Eco Club in her first semester after noticing how much underutilized lawn space surrounded campus residence halls. She co-founded our heirloom seed nursery, coordinating seed swaps and teaching dormitory students how to cultivate kitchen herbs on window ledges.',
    favoriteTip: 'Wash everyday clothes with cold water and air-dry them on a folding rack. It cuts up to 90% of laundry energy use and prevents microfiber breakdown.',
    favoriteActivity: 'Seed bombing degraded compacted trail margins with cold-stratified native wildflower balls before spring rains.'
  },
  {
    id: 'spotlight-marcus',
    name: 'Marcus Thorne',
    role: 'Circular Repair Café Lead',
    majorAndYear: 'Junior · Mechanical Engineering',
    photo: marcusSpotlightImg,
    bio: 'Marcus believes the most sustainable product is the one you already own. Frustrated by campus e-waste bins full of easily fixable electronics and bikes, he launched our bi-weekly Repair Cafés and has guided over 200 students through hands-on diagnostics.',
    favoriteTip: 'Before replacing an appliance or bike, spend 15 minutes checking for loose solder joints or cable tension. Over 75% of "broken" dorm gadgets only need a single screw tightened or contact cleaned.',
    favoriteActivity: 'Hosting open-air bike tuning clinics on sunny quad afternoons with our mobile tool trailer.'
  },
  {
    id: 'spotlight-elena',
    name: 'Elena Vance',
    role: 'Rewilding & Biodiversity Lead',
    majorAndYear: 'Senior · Environmental Sciences',
    photo: elenaSpotlightImg,
    bio: 'Elena conducts our quarterly campus insect bioblitzes and authored the native plant transition proposal approved by campus facilities. Under her leadership, the club converted 1,800 square meters of sterile turf into thriving pollinator habitat.',
    favoriteTip: 'Carry a lightweight cloth napkin and a compact travel cutlery kit in your day pack. You eliminate hundreds of single-use paper napkins and plastic forks every semester without any hassle.',
    favoriteActivity: 'Leading sunrise bumblebee and pollinator identification walks through the campus native prairie pockets.'
  }
];

export const VOLUNTEER_ROLES: VolunteerRole[] = [
  {
    id: 'role-propagator',
    title: 'Native Plant & Nursery Steward',
    pod: 'Rewilding Pod',
    commitment: '2 hours/week (Tue morning or Sat)',
    description: 'Help manage seed stratification, nursery seedling pots, and soil mixing in the North Quad greenhouse. No prior botany experience needed.',
    skillsNeeded: ['Seed handling', 'Greenhouse watering', 'Plant tagging'],
    spotsAvailable: 4
  },
  {
    id: 'role-repair-mentor',
    title: 'Repair Café Technical Apprentice',
    pod: 'Circularity Pod',
    commitment: '3 hours bi-weekly (Thursday afternoon)',
    description: 'Work alongside lead fixers diagnosing bicycles, replacing zippers, and repairing dorm electronics. Great for anyone interested in practical mechanics.',
    skillsNeeded: ['Basic tool comfort', 'Patience', 'Diagnostic curiosity'],
    spotsAvailable: 3
  },
  {
    id: 'role-compost-cyclist',
    title: 'Dining Hall Compost Cargo Cyclist',
    pod: 'Food Forest Pod',
    commitment: '2 hours/week (Mon or Wed afternoon)',
    description: 'Pedal our electric-assist cargo trike to collect pre-consumer kitchen prep buckets from dining halls and deliver them to our aerobic composting bays.',
    skillsNeeded: ['Safe bicycle riding', 'Comfort with organic compost', 'Punctuality'],
    spotsAvailable: 2
  },
  {
    id: 'role-watershed-auditor',
    title: 'Watershed & River Debris Auditor',
    pod: 'Hydrology Pod',
    commitment: '3 hours on alternate Sundays',
    description: 'Survey stream reaches along Mill Creek, log macroplastic categories on field tablets, and assist in planting live willow stakes for bank stabilization.',
    skillsNeeded: ['Outdoor footing', 'Data logging', 'Team coordination'],
    spotsAvailable: 5
  },
  {
    id: 'role-outreach-lead',
    title: 'Event & Educational Media Organizer',
    pod: 'Advocacy & Events Pod',
    commitment: '2 hours/week (Flexible timing)',
    description: 'Create printed workshop zines, manage event check-ins at speaker sessions, and photograph student fieldwork for our annual campus sustainability audit.',
    skillsNeeded: ['Writing / Visual design', 'Community outreach', 'Camera handling'],
    spotsAvailable: 3
  }
];

export const PLEDGE_OPTIONS = [
  'Commute by foot, bicycle, or transit at least 3 days per week',
  'Carry a reusable bottle and container to avoid single-use takeout plastic',
  'Sort all food scraps into campus compost hubs instead of landfill bins',
  'Attend at least two hands-on field restoration or volunteer mornings per month',
  'Participate in the Repair Café before replacing broken personal belongings',
  'Conserve electricity by turning off unused room lights and power strips'
];

export const TESTIMONIALS = [
  {
    quote: 'Before joining Eco Club, the grassy spaces outside our engineering hall felt like sterile green carpets. Working on the pollinator corridor transformed how I see my campus—it proved that 20 students with spades can build real ecological resilience.',
    author: 'Elena Vance',
    role: 'Senior, Environmental Sciences',
    pod: 'Rewilding Pod'
  },
  {
    quote: 'Our Repair Cafés have mended over 600 items. People often arrive ready to discard a $100 jacket or bicycle, and 30 minutes later they walk out with the skill to fix it themselves next time. That is systemic change.',
    author: 'Marcus Thorne',
    role: 'Junior, Mechanical Engineering',
    pod: 'Circularity Pod'
  },
  {
    quote: 'Joining this club connected me to people who do not just doomscroll climate news. We measure stream water quality, get our boots muddy every Sunday morning, and hold our university administration accountable to real carbon targets.',
    author: 'Aria Patel',
    role: 'First Year, Public Policy',
    pod: 'Advocacy Pod'
  }
];

export const CLUB_FAQ = [
  {
    q: 'Do I need prior gardening or technical experience to join?',
    a: 'None whatsoever. Every working pod pairs beginners with experienced student leads. Whether you have never held a spade or you have years of experience, there are meaningful tasks for everyone.'
  },
  {
    q: 'How much time commitment is expected?',
    a: 'Members participate at whatever level fits their academic schedule. Active members typically dedicate 2 to 4 hours per week (one weekend field session or a Thursday workshop). We do not require mandatory attendance.'
  },
  {
    q: 'Are club events free for all students and local community members?',
    a: 'Yes, 100% free. Eco Club is student-funded through the University Sustainability Grant and community donations. All tools, seeds, and workshop materials are provided at no charge.'
  },
  {
    q: 'Can I propose a new project or working pod?',
    a: 'Absolutely. Any member can bring a project proposal to our bi-weekly General Assembly. Once approved, the club provides seed funding, tool access, and volunteer coordination.'
  }
];
