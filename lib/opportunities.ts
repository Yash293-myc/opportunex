// Seed dataset for opportunities
export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  orgLogo: string;
  category: "Internship" | "Hackathon" | "Course" | "Scholarship" | "OpenSource";
  description: string;
  stipend?: string;
  prize?: string;
  location: string;
  remote: boolean;
  deadline: string;
  eligibility: string[];
  skills: string[];
  interests: string[];
  applyLink: string;
  featured?: boolean;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export const opportunities: Opportunity[] = [
  {
    id: "1",
    title: "Google Summer of Code 2026",
    organization: "Google",
    orgLogo: "G",
    category: "OpenSource",
    description: "Contribute to open-source projects mentored by Google engineers. Work on real-world codebases, get stipend support, and earn global recognition.",
    stipend: "$1,500 – $6,600",
    location: "Global (Remote)",
    remote: true,
    deadline: "2026-11-15",
    eligibility: ["18+ years", "University student", "First-time or returning contributor"],
    skills: ["Python", "JavaScript", "C++", "Go", "Rust", "Machine Learning"],
    interests: ["Open Source", "AI/ML", "Web Dev", "Cloud"],
    applyLink: "https://summerofcode.withgoogle.com/",
    featured: true,
    difficulty: "Intermediate"
  },
  {
    id: "2",
    title: "Smart India Hackathon 2026",
    organization: "SIH India",
    orgLogo: "SIH",
    category: "Hackathon",
    description: "India's biggest open innovation model to solve pressing problems faced by our country. ₹1 lakh prize for winners in each problem statement.",
    prize: "₹1,00,000 per winning team",
    location: "Pan-India",
    remote: false,
    deadline: "2026-10-30",
    eligibility: ["Indian university students", "Team of 6 members", "Any branch"],
    skills: ["React", "Node.js", "Python", "IoT", "Blockchain", "AI/ML"],
    interests: ["AI/ML", "Web Dev", "Cloud", "Open Source"],
    applyLink: "https://www.sih.gov.in/",
    featured: true,
    difficulty: "Advanced"
  },
  {
    id: "3",
    title: "Microsoft Learn Student Ambassador",
    organization: "Microsoft",
    orgLogo: "MS",
    category: "OpenSource",
    description: "Join a global community of campus leaders passionate about making a difference. Get Azure credits, certification vouchers, and exclusive swag.",
    stipend: "Azure Credits + Certification Vouchers",
    location: "Global (Remote)",
    remote: true,
    deadline: "2026-11-01",
    eligibility: ["Currently enrolled student", "Passionate about tech", "Any major"],
    skills: ["Azure", "Python", "JavaScript", "Machine Learning", "TypeScript"],
    interests: ["Cloud", "AI/ML", "Web Dev"],
    applyLink: "https://mvp.microsoft.com/en-US/studentambassadors",
    featured: true,
    difficulty: "Beginner"
  },
  {
    id: "4",
    title: "GitHub Campus Expert Program",
    organization: "GitHub",
    orgLogo: "GH",
    category: "OpenSource",
    description: "Build the best technical community at your school with support from GitHub. Gain access to Campus Expert resources and training.",
    location: "Global (Hybrid)",
    remote: true,
    deadline: "2026-10-15",
    eligibility: ["Enrolled in college/university", "18+ years", "English proficiency"],
    skills: ["Git", "Open Source", "JavaScript", "Community Building"],
    interests: ["Open Source", "Web Dev"],
    applyLink: "https://education.github.com/experts",
    difficulty: "Beginner"
  },
  {
    id: "5",
    title: "Meta AI Research Internship",
    organization: "Meta",
    orgLogo: "META",
    category: "Internship",
    description: "Join Meta's AI Research team to work on cutting-edge NLP, computer vision, and generative AI projects alongside world-class researchers.",
    stipend: "$8,000 – $12,000/month",
    location: "Menlo Park, CA / Remote",
    remote: true,
    deadline: "2026-12-01",
    eligibility: ["Graduate student (MS/PhD)", "Strong ML background", "Published research preferred"],
    skills: ["PyTorch", "Python", "Machine Learning", "NLP", "Computer Vision", "CUDA"],
    interests: ["AI/ML"],
    applyLink: "https://www.metacareers.com/",
    difficulty: "Advanced"
  },
  {
    id: "6",
    title: "AWS Student Builder Program",
    organization: "Amazon Web Services",
    orgLogo: "AWS",
    category: "Course",
    description: "Access free AWS training, certifications, and $100 in AWS credits. Build real cloud projects and get AWS certified for free.",
    stipend: "$100 AWS Credits + Free Certifications",
    location: "Online",
    remote: true,
    deadline: "2026-12-31",
    eligibility: ["Any student with .edu email", "No prior cloud experience needed"],
    skills: ["AWS", "Cloud Computing", "Python", "DevOps", "Docker"],
    interests: ["Cloud", "Web Dev"],
    applyLink: "https://aws.amazon.com/education/awseducate/",
    difficulty: "Beginner"
  },
  {
    id: "7",
    title: "MLH Fellowship – Open Source",
    organization: "Major League Hacking",
    orgLogo: "MLH",
    category: "OpenSource",
    description: "A 12-week internship alternative. Contribute to open-source projects used by companies and millions of developers worldwide.",
    stipend: "$5,000",
    location: "Remote",
    remote: true,
    deadline: "2026-10-20",
    eligibility: ["Any student or recent graduate", "Strong coding skills"],
    skills: ["Python", "JavaScript", "React", "Node.js", "Open Source", "Git"],
    interests: ["Open Source", "Web Dev", "AI/ML"],
    applyLink: "https://fellowship.mlh.io/",
    featured: true,
    difficulty: "Intermediate"
  },
  {
    id: "8",
    title: "Infosys Springboard Scholarship",
    organization: "Infosys",
    orgLogo: "INFY",
    category: "Scholarship",
    description: "Merit-based scholarship for engineering students. Includes ₹75,000 annual scholarship, mentorship, and priority consideration for campus hiring.",
    prize: "₹75,000/year + Mentorship",
    location: "India",
    remote: false,
    deadline: "2026-10-10",
    eligibility: ["Indian engineering student", "CGPA > 8.0", "2nd or 3rd year"],
    skills: ["Java", "Python", "Data Structures", "SQL"],
    interests: ["Web Dev", "Cloud", "AI/ML"],
    applyLink: "https://springboard.infosys.com/",
    difficulty: "Intermediate"
  },
  {
    id: "9",
    title: "Google UX Design Certificate",
    organization: "Google",
    orgLogo: "G",
    category: "Course",
    description: "Get job-ready for an entry-level UX design role in under 6 months. Hands-on projects, portfolio building, and financial aid available.",
    stipend: "Free via Financial Aid / Coursera",
    location: "Online (Coursera)",
    remote: true,
    deadline: "2026-12-31",
    eligibility: ["No experience required", "Any educational background"],
    skills: ["Figma", "UI/UX Design", "Prototyping", "User Research"],
    interests: ["UI/UX"],
    applyLink: "https://grow.google/certificates/ux-design/",
    difficulty: "Beginner"
  },
  {
    id: "10",
    title: "HackMIT 2026",
    organization: "MIT",
    orgLogo: "MIT",
    category: "Hackathon",
    description: "One of the most prestigious hackathons at MIT. 24-hour building sprint with $10,000+ in prizes and networking with top engineers.",
    prize: "$10,000+ Total Prizes",
    location: "Cambridge, MA",
    remote: false,
    deadline: "2026-09-15",
    eligibility: ["Any university student worldwide", "Team of 1–4"],
    skills: ["React", "Python", "Machine Learning", "Node.js", "Web3"],
    interests: ["AI/ML", "Web Dev", "Open Source"],
    applyLink: "https://hackmit.org/",
    difficulty: "Advanced"
  },
  {
    id: "11",
    title: "Flipkart Grid 5.0",
    organization: "Flipkart",
    orgLogo: "FK",
    category: "Hackathon",
    description: "Flipkart's flagship engineering and technology challenge. Solve real e-commerce problems with AI, robotics, and data science.",
    prize: "₹1,00,000 + PPO Offer",
    location: "Bengaluru, India",
    remote: false,
    deadline: "2026-10-25",
    eligibility: ["B.Tech/M.Tech students", "2nd, 3rd, 4th year"],
    skills: ["Python", "Machine Learning", "Computer Vision", "NLP", "SQL"],
    interests: ["AI/ML", "Web Dev", "Cloud"],
    applyLink: "https://unstop.com/hackathons/flipkart-grid",
    featured: true,
    difficulty: "Advanced"
  },
  {
    id: "12",
    title: "Adobe Creative Residency",
    organization: "Adobe",
    orgLogo: "AD",
    category: "Internship",
    description: "Adobe's creative residency supports emerging creative professionals. Work on passion projects with Adobe tools, mentorship, and stipend support.",
    stipend: "$2,000/month + Adobe CC License",
    location: "San Jose, CA / Remote",
    remote: true,
    deadline: "2026-11-20",
    eligibility: ["Any design student or self-taught creator", "Strong portfolio required"],
    skills: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "After Effects", "UI/UX Design"],
    interests: ["UI/UX"],
    applyLink: "https://www.adobe.com/creativecloud/residency.html",
    difficulty: "Intermediate"
  },
  {
    id: "13",
    title: "Cloudflare Workers Developer Fund",
    organization: "Cloudflare",
    orgLogo: "CF",
    category: "OpenSource",
    description: "Get funded to build innovative projects on Cloudflare Workers. Edge deployments, KV storage, and R2 object storage included.",
    stipend: "$1,000 – $10,000 in Credits",
    location: "Global (Remote)",
    remote: true,
    deadline: "2026-11-30",
    eligibility: ["Any developer", "Open source project required"],
    skills: ["JavaScript", "TypeScript", "Cloudflare Workers", "Edge Computing", "Node.js"],
    interests: ["Web Dev", "Cloud", "Open Source"],
    applyLink: "https://workers.cloudflare.com/",
    difficulty: "Intermediate"
  },
  {
    id: "14",
    title: "NASSCOM 10K Design Challenge",
    organization: "NASSCOM",
    orgLogo: "NAS",
    category: "Hackathon",
    description: "India's premier design and tech challenge. Focus on building tech-for-good solutions with UI/UX and full-stack development.",
    prize: "₹50,000 + Incubation Opportunity",
    location: "India",
    remote: false,
    deadline: "2026-10-05",
    eligibility: ["Indian student", "Team of 2–5"],
    skills: ["Figma", "React", "Node.js", "UI/UX Design", "Python"],
    interests: ["UI/UX", "Web Dev", "AI/ML"],
    applyLink: "https://nasscom.in/",
    difficulty: "Intermediate"
  }
];

export type Category = "All" | "Internship" | "Hackathon" | "Course" | "Scholarship" | "OpenSource";
export type Interest = "AI/ML" | "Web Dev" | "Cloud" | "Open Source" | "UI/UX";

export function calculateMatchScore(
  studentSkills: string[],
  studentInterests: string[],
  opportunity: Opportunity
): number {
  if (studentSkills.length === 0 && studentInterests.length === 0) return 0;

  const normalizedStudentSkills = studentSkills.map(s => s.toLowerCase());
  const normalizedStudentInterests = studentInterests.map(s => s.toLowerCase());

  const oppSkills = opportunity.skills.map(s => s.toLowerCase());
  const oppInterests = opportunity.interests.map(s => s.toLowerCase());

  // Skill match: how many of opportunity's skills does the student have?
  const skillMatches = oppSkills.filter(s => normalizedStudentSkills.includes(s)).length;
  const skillScore = oppSkills.length > 0 ? (skillMatches / oppSkills.length) * 60 : 0;

  // Interest match: direct interest alignment
  const interestMatches = oppInterests.filter(i => normalizedStudentInterests.includes(i)).length;
  const interestScore = oppInterests.length > 0 ? (interestMatches / oppInterests.length) * 40 : 0;

  const rawScore = skillScore + interestScore;

  // Featured bonus
  const featuredBonus = opportunity.featured ? 5 : 0;

  return Math.min(Math.round(rawScore + featuredBonus), 99);
}
