import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Opportunity, Category, Interest } from '@/lib/opportunities';

export interface EducationEntry {
  id: string;
  college: string;
  degree: string;
  branch: string;
  year: string;
  startYear: string;
  gradYear: string;
  cgpa: string;
  location: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  category: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  role: string;
  startDate?: string;
  endDate?: string;
  featured: boolean;
}

export interface HackathonEntry {
  id: string;
  name: string;
  organizer: string;
  year: string;
  type: 'Individual' | 'Team';
  teamName?: string;
  role: string;
  result: 'Winner' | 'Runner-up' | 'Finalist' | 'Shortlisted' | 'Participated';
  rank?: string;
  projectSubmitted?: string;
  certificateUrl?: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  type: 'Internship' | 'Freelance' | 'Part-time' | 'Campus Ambassador' | 'Club Role';
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  skillsUsed: string[];
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface CodingProfiles {
  leetcode?: { solved: number; rating: number; globalRank?: string };
  codechef?: { rating: number; stars: string; globalRank?: string };
  codeforces?: { rating: number; rankTitle: string };
  hackerrank?: { badges: string[] };
  kaggle?: { tier: string };
}

export interface ClubEntry {
  id: string;
  clubName: string;
  role: string;
  duration: string;
  description?: string;
}

export interface LanguageEntry {
  language: string;
  proficiency: 'Basic' | 'Conversational' | 'Professional' | 'Native';
}

export interface CareerPreferences {
  lookingFor: string[];
  preferredRoles: string[];
  preferredLocations: string[];
  workMode: 'Remote' | 'Hybrid' | 'On-site' | 'Flexible';
  availability: string;
  expectedGraduation: string;
}

export interface VerificationBadges {
  collegeVerified: boolean;
  emailVerified: boolean;
  githubConnected: boolean;
  achievementVerified: boolean;
  certificateVerified: boolean;
  experienceVerified: boolean;
}

export interface StudentProfile {
  // 1. Basic Profile
  photo: string;
  name: string;
  username: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  phonePrivate: boolean;

  // 2. Education
  education: EducationEntry[];

  // 3. Skills
  technicalSkills: string[];
  softSkills: string[];
  skillProficiency?: Record<string, 'Beginner' | 'Intermediate' | 'Advanced'>;

  // 4. Links
  links: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
    leetcode?: string;
    codechef?: string;
    hackerrank?: string;
    kaggle?: string;
    xTwitter?: string;
    other?: string;
  };

  // 5. Projects
  projects: ProjectEntry[];

  // 6. Hackathons & Competitions
  hackathons: HackathonEntry[];

  // 7. Achievements
  achievements: {
    id: string;
    title: string;
    issuer: string;
    date: string;
    description: string;
    verified: boolean;
  }[];

  // 8. Experience
  experience: ExperienceEntry[];

  // 9. Certifications
  certifications: CertificationEntry[];

  // 10. Coding Profiles
  codingProfiles: CodingProfiles;

  // 11. Resume
  resume: {
    resumeName: string;
    lastUpdated: string;
    visibility: 'Public' | 'Recruiters Only' | 'Private';
  };

  // 12. Clubs & Extracurriculars
  clubs: ClubEntry[];

  // 13. Languages
  languages: LanguageEntry[];

  // 14. Career Preferences
  careerPreferences: CareerPreferences;

  // 15. Verification
  verification: VerificationBadges;

  // Backward compatibility fields for match score algorithm
  college: string;
  degree: string;
  year: string;
  skills: string[];
  interests: Interest[];
}

export function calculateProfileStrength(p: StudentProfile | null): number {
  if (!p) return 0;
  let score = 0;
  if (p.name && p.college) score += 15;
  if (p.headline && p.bio) score += 10;
  if (p.email && p.location) score += 10;
  if (p.technicalSkills && p.technicalSkills.length >= 3) score += 15;
  if (p.links && (p.links.github || p.links.linkedin)) score += 10;
  if (p.projects && p.projects.length >= 1) score += 15;
  if (p.hackathons && p.hackathons.length >= 1) score += 10;
  if (p.experience && p.experience.length >= 1) score += 5;
  if (p.resume && p.resume.resumeName) score += 10;
  return Math.min(score, 100);
}

export const DEFAULT_STUDENT_PROFILE: StudentProfile = {
  photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  name: 'Rahul Sharma',
  username: 'rahulsharma',
  headline: 'Computer Science Student | Full Stack Developer | Hackathon Enthusiast',
  bio: 'Pre-final year Computer Science undergrad passionate about building scalable full-stack web applications and machine learning solutions. Winner at SIH 2025 and active open source contributor.',
  location: 'Bengaluru, India',
  email: 'rahul.sharma@iitb.ac.in',
  phone: '+91 98765 43210',
  phonePrivate: true,

  college: 'XYZ Institute of Technology',
  degree: 'B.Tech CSE',
  year: '3rd Year',
  skills: ['React', 'Node.js', 'Python', 'Java', 'SQL', 'AWS', 'MongoDB', 'Git'],
  interests: ['AI/ML', 'Web Dev', 'Cloud', 'Open Source'],

  education: [
    {
      id: 'edu-1',
      college: 'XYZ Institute of Technology',
      degree: 'B.Tech',
      branch: 'Computer Science & Engineering',
      year: '3rd Year | 6th Semester',
      startYear: '2024',
      gradYear: '2028',
      cgpa: '8.7',
      location: 'Bengaluru, Karnataka'
    }
  ],

  technicalSkills: ['Python', 'React', 'ML', 'SQL', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'MongoDB'],
  softSkills: ['Problem Solving', 'Leadership', 'Communication', 'Teamwork', 'Event Management'],
  skillProficiency: {
    'Python': 'Advanced',
    'React': 'Advanced',
    'ML': 'Intermediate',
    'SQL': 'Intermediate',
    'TypeScript': 'Intermediate',
    'Node.js': 'Advanced'
  },

  links: {
    github: 'https://github.com/rahulsharma-dev',
    linkedin: 'https://linkedin.com/in/rahulsharma-tech',
    portfolio: 'https://rahulsharma.dev',
    leetcode: 'https://leetcode.com/rahulsharma',
    codechef: 'https://codechef.com/users/rahul_1650',
    hackerrank: 'https://hackerrank.com/rahul_sharma'
  },

  projects: [
    {
      id: 'proj-1',
      name: 'AI Chatbot',
      description: 'An AI-powered conversational chatbot and semantic resume matcher built with FastAPI, vector search, and OpenAI.',
      technologies: ['Python', 'React', 'FastAPI', 'OpenAI'],
      category: 'AI / ML',
      githubUrl: 'https://github.com/rahulsharma-dev/ai-chatbot',
      liveDemoUrl: 'https://aichatbot-demo.vercel.app',
      role: 'Lead AI Engineer',
      startDate: 'Aug 2025',
      endDate: 'Dec 2025',
      featured: true
    },
    {
      id: 'proj-2',
      name: 'Web Platform',
      description: 'CampusConnect student opportunity platform connecting 10,000+ university students to live hackathons, technical clubs, and peer mentorship.',
      technologies: ['React', 'Node.js', 'MongoDB', 'WebSocket'],
      category: 'Web App',
      githubUrl: 'https://github.com/rahulsharma-dev/campusconnect',
      liveDemoUrl: 'https://webplatform-demo.vercel.app',
      role: 'Lead Architect',
      startDate: 'Jan 2026',
      endDate: 'Present',
      featured: true
    }
  ],

  hackathons: [
    {
      id: 'hack-1',
      name: 'Smart India Hackathon 2025',
      organizer: 'Ministry of Education & AICTE',
      year: '2025',
      type: 'Team',
      teamName: 'ByteForce',
      role: 'Team Lead & Backend Developer',
      result: 'Winner',
      rank: '1st in Problem Statement SW-89',
      projectSubmitted: 'Automated Grievance Redressal System',
      certificateUrl: 'https://sih.gov.in/certificate/byteforce'
    },
    {
      id: 'hack-2',
      name: 'Hackverse 2025',
      organizer: 'NIT Karnataka',
      year: '2025',
      type: 'Team',
      teamName: 'CodeCrafters',
      role: 'Full Stack Developer',
      result: 'Runner-up',
      rank: '2nd Place Overall',
      projectSubmitted: 'Decentralized Peer Study Network'
    },
    {
      id: 'hack-3',
      name: 'Flipkart Grid 5.0 Tech Challenge',
      organizer: 'Flipkart',
      year: '2025',
      type: 'Team',
      role: 'Algorithm Engineer',
      result: 'Finalist',
      rank: 'Top 50 National Finalist'
    }
  ],

  achievements: [
    {
      id: 'ach-1',
      title: 'Smart India Hackathon National Winner',
      issuer: 'Govt of India / AICTE',
      date: 'Dec 2025',
      description: 'Awarded ₹1,00,000 cash prize among 1,200 participating teams across India.',
      verified: true
    },
    {
      id: 'ach-2',
      title: 'Global Rank 412 in LeetCode Weekly Contest 390',
      issuer: 'LeetCode',
      date: 'Feb 2026',
      description: 'Placed in top 1.5% out of 28,000 global participants.',
      verified: true
    },
    {
      id: 'ach-3',
      title: 'Merit Academic Scholarship',
      issuer: 'State Higher Education Council',
      date: '2024 - 2025',
      description: 'Awarded tuition waiver for maintaining top 2% branch CGPA.',
      verified: true
    }
  ],

  experience: [
    {
      id: 'exp-1',
      company: 'ABC Technologies',
      role: 'Software Engineering Intern',
      type: 'Internship',
      location: 'Bengaluru (Hybrid)',
      startDate: 'May 2025',
      endDate: 'July 2025',
      current: false,
      description: 'Built high-throughput REST APIs handling 50k daily active requests. Reduced query latency by 35% through Redis caching and PostgreSQL query optimizations.',
      skillsUsed: ['Node.js', 'Express', 'Redis', 'PostgreSQL', 'Docker']
    },
    {
      id: 'exp-2',
      company: 'Google Developer Student Club',
      role: 'Core Technical Lead',
      type: 'Club Role',
      location: 'Campus',
      startDate: 'Aug 2025',
      endDate: 'Present',
      current: true,
      description: 'Conducted hands-on workshops on Full Stack Development, Cloud Computing, and Git for over 450+ first- and second-year engineering students.',
      skillsUsed: ['Mentorship', 'React', 'Cloud Architecture', 'Community Leadership']
    }
  ],

  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      issueDate: 'Oct 2025',
      credentialId: 'AWS-CCP-982143',
      credentialUrl: 'https://aws.amazon.com/verification'
    },
    {
      id: 'cert-2',
      name: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Meta / Coursera',
      issueDate: 'July 2025',
      credentialId: 'META-FED-77120',
      credentialUrl: 'https://coursera.org/verify/professional-cert'
    }
  ],

  codingProfiles: {
    leetcode: { solved: 350, rating: 1780, globalRank: 'Top 7.8%' },
    codechef: { rating: 1650, stars: '3★', globalRank: 'Global 14,200' },
    codeforces: { rating: 1215, rankTitle: 'Pupil' },
    hackerrank: { badges: ['5★ Problem Solving', '5★ Python', '4★ SQL'] },
    kaggle: { tier: 'Contributor' }
  },

  resume: {
    resumeName: 'Rahul_Sharma_BTech_CSE_2026.pdf',
    lastUpdated: 'Sep 2026',
    visibility: 'Public'
  },

  clubs: [
    {
      id: 'club-1',
      clubName: 'Google Developer Student Club (GDSC)',
      role: 'Core Technical Team Member',
      duration: '2025 – 2026',
      description: 'Mentoring campus students in web development and open source.'
    },
    {
      id: 'club-2',
      clubName: 'ACM Student Chapter',
      role: 'Competitive Coding Lead',
      duration: '2024 – 2025'
    }
  ],

  languages: [
    { language: 'English', proficiency: 'Professional' },
    { language: 'Hindi', proficiency: 'Native' },
    { language: 'Kannada', proficiency: 'Conversational' }
  ],

  careerPreferences: {
    lookingFor: ['Internship', 'Full-time', 'Hackathons'],
    preferredRoles: ['Full Stack Developer', 'Software Engineer', 'Frontend Engineer', 'Backend Developer'],
    preferredLocations: ['Bengaluru', 'Hyderabad', 'Pune', 'Remote'],
    workMode: 'Hybrid',
    availability: 'Summer 2026 / Immediate',
    expectedGraduation: '2028'
  },

  verification: {
    collegeVerified: true,
    emailVerified: true,
    githubConnected: true,
    achievementVerified: true,
    certificateVerified: true,
    experienceVerified: false
  }
};

interface AppState {
  // Profile
  profile: StudentProfile;
  setProfile: (profile: StudentProfile) => void;
  updateProfilePartial: (partial: Partial<StudentProfile>) => void;

  // Saved opportunities
  savedIds: string[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;

  // Filters
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: Category;
  setActiveCategory: (c: Category) => void;
  activeInterests: Interest[];
  toggleInterest: (i: Interest) => void;
  showRemoteOnly: boolean;
  toggleRemoteOnly: () => void;

  // UI state
  showProfileModal: boolean;
  setShowProfileModal: (v: boolean) => void;
  showSavedDrawer: boolean;
  setShowSavedDrawer: (v: boolean) => void;
  selectedOpportunity: Opportunity | null;
  setSelectedOpportunity: (o: Opportunity | null) => void;

  // Profile modal mode ('view' | 'edit-stepper')
  profileModalMode: 'view' | 'edit-stepper';
  setProfileModalMode: (mode: 'view' | 'edit-stepper') => void;

  // Theme support ('dark' | 'light')
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  setTheme: (t: 'dark' | 'light') => void;

  // Active navigation tab
  activeNav: 'dashboard' | 'internships' | 'hackathons' | 'scholarships' | 'projects' | 'mentorship' | 'events' | 'settings';
  setActiveNav: (nav: 'dashboard' | 'internships' | 'hackathons' | 'scholarships' | 'projects' | 'mentorship' | 'events' | 'settings') => void;

  // AI API Keys for Gemini & Grok
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
  grokApiKey: string;
  setGrokApiKey: (key: string) => void;

  // Resume Upload Document
  uploadedResumeFile: {
    fileName: string;
    fileSize: string;
    uploadDate: string;
    fileType: string;
  } | null;
  setUploadedResumeFile: (file: { fileName: string; fileSize: string; uploadDate: string; fileType: string } | null) => void;

  // AI Career Copilot Modal state
  showAICopilot: boolean;
  setShowAICopilot: (v: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      profile: DEFAULT_STUDENT_PROFILE,
      setProfile: (profile) => {
        // Automatically sync legacy fields
        const updated = {
          ...profile,
          skills: profile.technicalSkills || profile.skills,
          college: profile.education[0]?.college || profile.college,
          degree: profile.education[0]?.degree || profile.degree,
          year: profile.education[0]?.year || profile.year,
        };
        set({ profile: updated });
      },
      updateProfilePartial: (partial) => {
        const current = get().profile;
        const updated = { ...current, ...partial };
        if (partial.technicalSkills) updated.skills = partial.technicalSkills;
        if (partial.education && partial.education.length > 0) {
          updated.college = partial.education[0].college;
          updated.degree = partial.education[0].degree;
          updated.year = partial.education[0].year;
        }
        set({ profile: updated });
      },

      savedIds: ['1', '2', '7'], // seed with a few saved items so user sees it right away
      toggleSave: (id) => {
        const { savedIds } = get();
        set({
          savedIds: savedIds.includes(id)
            ? savedIds.filter(s => s !== id)
            : [...savedIds, id]
        });
      },
      isSaved: (id) => get().savedIds.includes(id),

      searchQuery: '',
      setSearchQuery: (q) => set({ searchQuery: q }),
      activeCategory: 'All',
      setActiveCategory: (c) => set({ activeCategory: c }),
      activeInterests: [],
      toggleInterest: (i) => {
        const { activeInterests } = get();
        set({
          activeInterests: activeInterests.includes(i)
            ? activeInterests.filter(x => x !== i)
            : [...activeInterests, i]
        });
      },
      showRemoteOnly: false,
      toggleRemoteOnly: () => set(s => ({ showRemoteOnly: !s.showRemoteOnly })),

      showProfileModal: false,
      setShowProfileModal: (v) => set({ showProfileModal: v }),
      showSavedDrawer: false,
      setShowSavedDrawer: (v) => set({ showSavedDrawer: v }),
      selectedOpportunity: null,
      setSelectedOpportunity: (o) => set({ selectedOpportunity: o }),

      profileModalMode: 'view',
      setProfileModalMode: (mode) => set({ profileModalMode: mode }),

      theme: 'dark',
      toggleTheme: () => set(s => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
      setTheme: (t) => set({ theme: t }),

      activeNav: 'dashboard',
      setActiveNav: (nav) => set({ activeNav: nav }),

      geminiApiKey: '',
      setGeminiApiKey: (key) => set({ geminiApiKey: key }),
      grokApiKey: '',
      setGrokApiKey: (key) => set({ grokApiKey: key }),

      uploadedResumeFile: {
        fileName: 'Rahul_Sharma_BTech_Resume_2026.pdf',
        fileSize: '142 KB',
        uploadDate: '27 Sep 2026',
        fileType: 'application/pdf',
      },
      setUploadedResumeFile: (file) => set({ uploadedResumeFile: file }),

      showAICopilot: false,
      setShowAICopilot: (v) => set({ showAICopilot: v }),
    }),
    {
      name: 'student-matcher-store-v4',
      partialize: (state) => ({
        profile: state.profile,
        savedIds: state.savedIds,
        theme: state.theme,
        activeNav: state.activeNav,
        geminiApiKey: state.geminiApiKey,
        grokApiKey: state.grokApiKey,
        uploadedResumeFile: state.uploadedResumeFile,
      }),
    }
  )
);
