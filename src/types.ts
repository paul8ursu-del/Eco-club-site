export interface Initiative {
  id: string;
  number: string;
  title: string;
  category: 'Rewilding' | 'Circular' | 'Clean Energy' | 'Policy & Action';
  shortDesc: string;
  fullDesc: string;
  image: string;
  impactMetric: string;
  leadName: string;
  leadRole: string;
  meetingTime: string;
  meetingPlace: string;
  tasks: string[];
}

export interface ClubEvent {
  id: string;
  title: string;
  category: 'Fieldwork' | 'Workshop' | 'Advocacy' | 'Social';
  dateStr: string;
  timeStr: string;
  location: string;
  description: string;
  capacity: number;
  rsvpCount: number;
  gearProvided: string;
  image?: string;
}

export interface CalculatorState {
  commuteMode: 'walk_bike' | 'public_transit' | 'carpool_ev' | 'gas_car';
  weeklyCommuteKm: number;
  dietPreference: 'vegan' | 'vegetarian' | 'low_meat' | 'standard';
  compostHabit: 'daily' | 'occasional' | 'none';
  repairBeforeReplace: 'always' | 'sometimes' | 'rarely';
}

export interface MemberPledge {
  fullName: string;
  email: string;
  studyYear: string;
  podPreference: string;
  pledges: string[];
  issuedAt: string;
  membershipId: string;
}

export interface MemberSpotlight {
  id: string;
  name: string;
  role: string;
  majorAndYear: string;
  photo: string;
  bio: string;
  favoriteTip: string;
  favoriteActivity: string;
}

export interface VolunteerRole {
  id: string;
  title: string;
  pod: string;
  commitment: string;
  description: string;
  skillsNeeded: string[];
  spotsAvailable: number;
}

