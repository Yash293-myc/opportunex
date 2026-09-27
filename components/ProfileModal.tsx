'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Download, Upload, FileText, Trophy, Code2, Edit3, Check, Plus, Trash2, 
  Sparkles, CheckCircle2, GraduationCap, Building2, ExternalLink, Calendar,
  Star, Briefcase, RefreshCw, Eye, ShieldCheck, Award, FolderCode,
  User, Mail, Phone, MapPin, Globe, BookOpen
} from 'lucide-react';
import { useAppStore, StudentProfile } from '@/lib/store';
import { 
  PythonLogo, ReactLogo, MLLogo, SQLLogo, TypeScriptLogo, NodeLogo,
  CollegeCrestLogo, LeetCodeOfficialLogo, SIHOfficialLogo, CodeFestLogo,
  AIChatbotLogo, WebPlatformLogo, PDFDocumentLogo,
  SkillBadgeWithLogo, ProjectBadgeWithLogo 
} from '@/components/TechAndCollegeLogos';

const PRESET_SKILLS = [
  'Python', 'React', 'ML', 'SQL', 'TypeScript', 'Node.js', 
  'Next.js', 'Docker', 'AWS', 'Java', 'C++', 'MongoDB'
];

export default function ProfileModal() {
  const { 
    profile, setProfile, showProfileModal, setShowProfileModal, 
    profileModalMode, setProfileModalMode,
    uploadedResumeFile, setUploadedResumeFile
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'resume' | 'hackathons' | 'leetcode' | 'overview'>('resume');
  const [editSection, setEditSection] = useState<'personal' | 'education' | 'skills' | 'coding' | 'projects'>('personal');
  const [formData, setFormData] = useState<StudentProfile>(profile);
  const [newSkill, setNewSkill] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle actual file upload (PDF/Word)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeInKb = Math.round(file.size / 1024);
      setUploadedResumeFile({
        fileName: file.name,
        fileSize: sizeInKb > 1024 ? `${(sizeInKb / 1024).toFixed(1)} MB` : `${sizeInKb} KB`,
        uploadDate: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
        fileType: file.type || 'application/pdf',
      });
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3500);
    }
  };

  const handleDownloadResume = () => {
    const resumeText = `
============================================================
${profile.name.toUpperCase()}
${profile.headline}
============================================================
Contact: ${profile.email} | ${profile.location}
Portfolio: ${profile.links.portfolio || 'https://rahulsharma.dev'}
GitHub: ${profile.links.github || 'https://github.com/rahulsharma'}
LinkedIn: ${profile.links.linkedin || 'https://linkedin.com/in/rahulsharma'}

EDUCATION
------------------------------------------------------------
${profile.college} — ${profile.degree}
CGPA: ${profile.education[0]?.cgpa || '8.7'} / 10.0
Graduation: 2024–2028

TECHNICAL SKILLS
------------------------------------------------------------
${profile.technicalSkills.join(', ')}

FEATURED PROJECTS
------------------------------------------------------------
* AI Chatbot & Semantic Matcher [React, Python, FastApi, OpenAI]
* CampusConnect Web Platform [React, Node.js, MongoDB, WebSocket]

HACKATHONS & COMPETITIONS
------------------------------------------------------------
* Smart India Hackathon 2023 - Winner (Fire Amber Badge)
* CodeFest '23 - 1st Place (Emerald Trophy)
* Flipkart Grid 5.0 - National Finalist

LEETCODE & COMPETITIVE PROGRAMMING
------------------------------------------------------------
Rating: 1850 (Knight Rank, Top 2.5% Globally)
Problems Solved: 640 [Easy: 250, Medium: 310, Hard: 80]
============================================================
    `.trim();

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = uploadedResumeFile?.fileName || `${profile.name.replace(/\s+/g, '_')}_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveEdit = () => {
    setProfile(formData);
    setProfileModalMode('view');
  };

  return (
    <AnimatePresence>
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Solid Darkened Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setShowProfileModal(false)}
          />

          {/* ─── MAIN MODAL PANEL (CLEAN, SOLID, MAXIMUM CLARITY) ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="relative w-full max-w-5xl xl:max-w-6xl z-10 overflow-hidden rounded-[28px] border border-slate-700/80 bg-[#0b101e] text-slate-100 shadow-[0_25px_80px_rgba(0,0,0,0.85)] flex flex-col max-h-[90vh]"
            style={{ backgroundColor: '#0b101e' }}
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-800 bg-[#080d1a] relative z-10">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 p-0.5 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/25">
                  <div className="w-full h-full bg-[#070b14] rounded-[14px] flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-cyan-300" />
                  </div>
                </div>
                <div>
                  <h2 className="text-white text-base sm:text-lg font-black tracking-wider uppercase flex items-center gap-2">
                    <span>{profileModalMode === 'view' ? 'STUDENT PROFILE CARD' : 'EDIT STUDENT PROFILE'}</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                      <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED STUDENT
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Comprehensive Academic, Hackathon & Competitive Coding Passport
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                {profileModalMode === 'view' ? (
                  <button
                    onClick={() => {
                      setFormData(profile);
                      setProfileModalMode('edit-stepper');
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setProfileModalMode('view')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Card</span>
                  </button>
                )}

                <button
                  onClick={() => setShowProfileModal(false)}
                  className="w-9 h-9 rounded-xl border border-slate-700 bg-slate-800/80 flex items-center justify-center hover:bg-rose-500/20 hover:border-rose-500/40 text-slate-400 hover:text-white transition-all"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {profileModalMode === 'view' ? (
              /* ======================================================== */
              /* HIGH-VISIBILITY VIEW MODE                                */
              /* ======================================================== */
              <div 
                className="p-6 sm:p-8 space-y-7 relative z-10 overflow-y-auto"
                style={{ scrollbarWidth: 'thin' }}
              >
                {/* 1. TOP ROW: EDUCATION, SKILLS, PROJECTS (HIGH-CONTRAST CARDS) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* EDUCATION BOX */}
                  <div className="space-y-1.5">
                    <p className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4" />
                      EDUCATION
                    </p>
                    <div className="p-4 rounded-2xl bg-[#11192e] border border-slate-700/80 flex items-start gap-3.5 shadow-md min-h-[96px]">
                      <CollegeCrestLogo className="w-12 h-12" />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-white font-extrabold text-sm sm:text-base leading-snug truncate">
                          {profile.college || 'XYZ Institute of Technology'}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-slate-200 text-xs sm:text-sm font-bold">
                            {profile.degree || 'B.Tech CSE'}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="text-emerald-300 font-black text-xs sm:text-sm bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/40">
                            {profile.education[0]?.cgpa || '8.7'} CGPA
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 font-medium">
                          Class of 2024–2028 • Accredited Institute
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SKILLS BOX WITH CRISP BADGES */}
                  <div className="space-y-1.5">
                    <p className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      SKILLS
                    </p>
                    <div className="p-4 rounded-2xl bg-[#11192e] border border-slate-700/80 flex flex-wrap gap-2 items-center min-h-[96px] shadow-md">
                      <SkillBadgeWithLogo skill="Python" />
                      <SkillBadgeWithLogo skill="React" />
                      <SkillBadgeWithLogo skill="ML" />
                      <SkillBadgeWithLogo skill="SQL" />
                      <SkillBadgeWithLogo skill="TypeScript" />
                      <SkillBadgeWithLogo skill="Node.js" />
                    </div>
                  </div>

                  {/* PROJECTS BOX WITH AUTHENTIC BADGES */}
                  <div className="space-y-1.5">
                    <p className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                      <FolderCode className="w-4 h-4" />
                      PROJECTS
                    </p>
                    <div className="p-4 rounded-2xl bg-[#11192e] border border-slate-700/80 flex flex-wrap gap-2 items-center min-h-[96px] shadow-md">
                      <ProjectBadgeWithLogo name="AI Chatbot" />
                      <ProjectBadgeWithLogo name="Web Platform" />
                    </div>
                  </div>
                </div>

                {/* 2. SUB TABS (Resume, Hackathons, LeetCode, Overview) */}
                <div className="flex items-center gap-6 sm:gap-10 border-b border-slate-800 text-xs sm:text-sm font-bold pt-1">
                  <button
                    onClick={() => setActiveTab('resume')}
                    className={`pb-3.5 transition-colors relative flex items-center gap-2 ${
                      activeTab === 'resume' ? 'text-cyan-400 font-extrabold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Resume & Uploader</span>
                    {activeTab === 'resume' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_12px_#22d3ee]" />
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab('hackathons')}
                    className={`pb-3.5 transition-colors relative flex items-center gap-2 ${
                      activeTab === 'hackathons' ? 'text-cyan-400 font-extrabold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Trophy className="w-4 h-4" />
                    <span>Hackathons</span>
                    {activeTab === 'hackathons' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_12px_#22d3ee]" />
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab('leetcode')}
                    className={`pb-3.5 transition-colors relative flex items-center gap-2 ${
                      activeTab === 'leetcode' ? 'text-cyan-400 font-extrabold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Code2 className="w-4 h-4" />
                    <span>LeetCode</span>
                    {activeTab === 'leetcode' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_12px_#22d3ee]" />
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-3.5 transition-colors relative flex items-center gap-2 ${
                      activeTab === 'overview' ? 'text-cyan-400 font-extrabold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Overview</span>
                    {activeTab === 'overview' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_12px_#22d3ee]" />
                    )}
                  </button>
                </div>

                {/* 3. DEDICATED RESUME UPLOADER */}
                {activeTab === 'resume' && (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-slate-700/80 bg-[#11192e] p-6 space-y-5 shadow-md">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <PDFDocumentLogo className="w-12 h-12" />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-base font-bold text-white">
                                {uploadedResumeFile?.fileName || 'Rahul_Sharma_BTech_Resume_2026.pdf'}
                              </h4>
                              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                ATS 98%
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 mt-0.5 font-medium">
                              {uploadedResumeFile?.fileSize || '142 KB'} • Uploaded {uploadedResumeFile?.uploadDate || '27 Sep 2026'} • Verified for AI Opportunity Matching
                            </p>
                          </div>
                        </div>

                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                        />

                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-all shadow-md flex-shrink-0"
                        >
                          <Upload className="w-4 h-4" />
                          <span>Upload New Resume</span>
                        </button>
                      </div>

                      {uploadSuccess && (
                        <div className="text-xs text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-4 py-2.5 rounded-xl flex items-center gap-2 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span>Resume uploaded successfully! Verified for automated ATS parsing and opportunity alignment.</span>
                        </div>
                      )}

                      {/* Drag & Drop Visual Box */}
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="p-8 rounded-2xl border-2 border-dashed border-slate-600 hover:border-cyan-400 bg-[#0d1424] text-center cursor-pointer transition-all hover:bg-[#121c33] group"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center mx-auto mb-3 text-cyan-400 group-hover:scale-110 transition-transform">
                          <Upload className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-bold text-white mb-1">
                          Drag and drop your PDF / Word resume here, or <span className="text-cyan-400 underline font-black">browse files</span>
                        </p>
                        <p className="text-xs text-slate-400">
                          Supports PDF, DOCX up to 10 MB • Automatically syncs credentials, projects & hackathons
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. HACKATHONS & LEETCODE GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* HACKATHONS */}
                  <div className="space-y-2">
                    <p className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Trophy className="w-4 h-4" />
                      HACKATHONS & COMPETITIONS
                    </p>

                    <div className="p-4 rounded-2xl bg-[#11192e] border border-slate-700/80 flex items-start gap-3.5 shadow-md">
                      <SIHOfficialLogo className="w-11 h-11" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="font-extrabold text-white text-xs sm:text-sm">
                            Smart India Hackathon 2023 -
                          </h5>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex-shrink-0">
                            1st Place
                          </span>
                        </div>
                        <p className="text-amber-400 text-xs sm:text-sm font-extrabold mt-0.5">
                          Winner (Fire Amber Badge)
                        </p>
                        <p className="text-[11px] text-slate-400 mt-1 font-medium">
                          Organized by AICTE & Govt of India • Grand Finale Team Lead
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#11192e] border border-slate-700/80 flex items-start gap-3.5 shadow-md">
                      <CodeFestLogo className="w-11 h-11" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="font-extrabold text-white text-xs sm:text-sm">
                            CodeFest &apos;23 -
                          </h5>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex-shrink-0">
                            National Final
                          </span>
                        </div>
                        <p className="text-emerald-400 text-xs sm:text-sm font-extrabold mt-0.5">
                          1st Place (Emerald Trophy)
                        </p>
                        <p className="text-[11px] text-slate-400 mt-1 font-medium">
                          NIT Karnataka • Web Architecture & Algorithm Division
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* LEETCODE */}
                  <div className="space-y-2">
                    <p className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Code2 className="w-4 h-4" />
                      LEETCODE & COMPETITIVE PROGRAMMING
                    </p>

                    <div className="p-4 rounded-2xl bg-[#11192e] border border-slate-700/80 space-y-3 shadow-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <LeetCodeOfficialLogo className="w-9 h-9" />
                          <div>
                            <span className="font-black text-white text-sm sm:text-base">&lt;/&gt; 1850 Rating</span>
                            <span className="text-[11px] text-slate-300 block font-semibold">Knight Rank • Guardian Track</span>
                          </div>
                        </div>

                        <span className="text-[11px] font-black text-cyan-300 bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-400/40 shadow-sm">
                          Top 2.5%
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-2 text-center pt-2.5 border-t border-slate-700/80">
                        <div className="p-2.5 rounded-xl bg-[#0b101e] border border-slate-700">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Solved</p>
                          <p className="text-base font-black text-white mt-0.5">640</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30">
                          <p className="text-[10px] font-bold text-emerald-400 uppercase">Easy</p>
                          <p className="text-base font-black text-emerald-400 mt-0.5">250</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30">
                          <p className="text-[10px] font-bold text-amber-400 uppercase">Medium</p>
                          <p className="text-base font-black text-amber-400 mt-0.5">310</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30">
                          <p className="text-[10px] font-bold text-rose-400 uppercase">Hard</p>
                          <p className="text-base font-black text-rose-400 mt-0.5">80</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. DOWNLOAD RESUME BUTTON */}
                <div className="pt-2">
                  <button
                    onClick={handleDownloadResume}
                    className="btn-cyan-download w-full !py-4 !text-sm !font-black !rounded-2xl tracking-wide shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2"
                    id="modal-download-resume-btn"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Resume ({uploadedResumeFile?.fileName || 'Rahul_Sharma_BTech_Resume_2026.pdf'})</span>
                  </button>
                </div>
              </div>
            ) : (
              /* ======================================================== */
              /* CLEAN, STRUCTURED FORM EDITING MODE                      */
              /* ======================================================== */
              <div className="flex flex-col flex-1 overflow-hidden">
                {/* Form Section Navigation Tabs */}
                <div className="flex items-center gap-2 p-3 bg-[#080d1a] border-b border-slate-800 overflow-x-auto text-xs font-bold">
                  <button
                    onClick={() => setEditSection('personal')}
                    className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all flex-shrink-0 ${
                      editSection === 'personal' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Personal Info</span>
                  </button>

                  <button
                    onClick={() => setEditSection('education')}
                    className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all flex-shrink-0 ${
                      editSection === 'education' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Academics & College</span>
                  </button>

                  <button
                    onClick={() => setEditSection('skills')}
                    className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all flex-shrink-0 ${
                      editSection === 'skills' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Skills Selection</span>
                  </button>

                  <button
                    onClick={() => setEditSection('coding')}
                    className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all flex-shrink-0 ${
                      editSection === 'coding' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>LeetCode & SIH</span>
                  </button>

                  <button
                    onClick={() => setEditSection('projects')}
                    className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all flex-shrink-0 ${
                      editSection === 'projects' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <FolderCode className="w-3.5 h-3.5" />
                    <span>Projects</span>
                  </button>
                </div>

                {/* Form Fields Body */}
                <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6" style={{ scrollbarWidth: 'thin' }}>
                  {/* SECTION 1: PERSONAL INFO */}
                  {editSection === 'personal' && (
                    <div className="space-y-4 max-w-3xl">
                      <div className="border-b border-slate-800 pb-2">
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          <User className="w-4 h-4 text-cyan-400" />
                          Personal Identity & Contact
                        </h4>
                        <p className="text-xs text-slate-400">Manage your student name, professional headline, and verified contacts.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-300 mb-1.5 block">Full Name</label>
                          <input
                            className="clean-input"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Rahul Sharma"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-300 mb-1.5 block">Email Address</label>
                          <input
                            className="clean-input"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            placeholder="e.g. rahul.sharma@college.edu"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-300 mb-1.5 block">Location</label>
                          <input
                            className="clean-input"
                            value={formData.location}
                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                            placeholder="e.g. Bengaluru, India"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-300 mb-1.5 block">Phone Number</label>
                          <input
                            className="clean-input"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 mb-1.5 block">Professional Headline</label>
                        <input
                          className="clean-input"
                          value={formData.headline}
                          onChange={e => setFormData({ ...formData, headline: e.target.value })}
                          placeholder="e.g. Computer Science Student | Full Stack & AI Enthusiast"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 mb-1.5 block">Short Bio</label>
                        <textarea
                          rows={3}
                          className="clean-input !h-auto"
                          value={formData.bio}
                          onChange={e => setFormData({ ...formData, bio: e.target.value })}
                          placeholder="Tell recruiters and mentors about your technical background..."
                        />
                      </div>
                    </div>
                  )}

                  {/* SECTION 2: ACADEMICS & COLLEGE */}
                  {editSection === 'education' && (
                    <div className="space-y-4 max-w-3xl">
                      <div className="border-b border-slate-800 pb-2">
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-cyan-400" />
                          Academic Credentials & Institution
                        </h4>
                        <p className="text-xs text-slate-400">Your university records are matched against company degree criteria.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-300 mb-1.5 block">College / University Name</label>
                          <input
                            className="clean-input"
                            value={formData.college}
                            onChange={e => setFormData({ ...formData, college: e.target.value })}
                            placeholder="XYZ Institute of Technology"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-300 mb-1.5 block">Degree Title</label>
                          <input
                            className="clean-input"
                            value={formData.degree}
                            onChange={e => setFormData({ ...formData, degree: e.target.value })}
                            placeholder="B.Tech Computer Science"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-300 mb-1.5 block">Cumulative CGPA</label>
                          <input
                            className="clean-input"
                            value={formData.education[0]?.cgpa || '8.7'}
                            onChange={e => {
                              const updated = [...formData.education];
                              if (updated[0]) updated[0].cgpa = e.target.value;
                              setFormData({ ...formData, education: updated });
                            }}
                            placeholder="8.7"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-300 mb-1.5 block">Start Year</label>
                          <input
                            className="clean-input"
                            value={formData.education[0]?.startYear || '2024'}
                            onChange={e => {
                              const updated = [...formData.education];
                              if (updated[0]) updated[0].startYear = e.target.value;
                              setFormData({ ...formData, education: updated });
                            }}
                            placeholder="2024"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-300 mb-1.5 block">Graduation Year</label>
                          <input
                            className="clean-input"
                            value={formData.education[0]?.gradYear || '2028'}
                            onChange={e => {
                              const updated = [...formData.education];
                              if (updated[0]) updated[0].gradYear = e.target.value;
                              setFormData({ ...formData, education: updated });
                            }}
                            placeholder="2028"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SECTION 3: SKILLS SELECTION */}
                  {editSection === 'skills' && (
                    <div className="space-y-4 max-w-3xl">
                      <div className="border-b border-slate-800 pb-2">
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-cyan-400" />
                          Technical Skills & Frameworks
                        </h4>
                        <p className="text-xs text-slate-400">Click preset tags or type custom skills. These directly drive your Match Score.</p>
                      </div>

                      {/* Quick Add Preset Chips */}
                      <div>
                        <label className="text-xs font-bold text-slate-300 mb-2 block">Quick-Select Industry Skills</label>
                        <div className="flex flex-wrap gap-2">
                          {PRESET_SKILLS.map(preset => {
                            const isAdded = formData.technicalSkills.includes(preset);
                            return (
                              <button
                                key={preset}
                                type="button"
                                onClick={() => {
                                  if (isAdded) {
                                    setFormData({
                                      ...formData,
                                      technicalSkills: formData.technicalSkills.filter(s => s !== preset)
                                    });
                                  } else {
                                    setFormData({
                                      ...formData,
                                      technicalSkills: [...formData.technicalSkills, preset]
                                    });
                                  }
                                }}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                                  isAdded
                                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-sm'
                                    : 'bg-[#12192e] text-slate-300 border-slate-700 hover:border-slate-500'
                                }`}
                              >
                                {isAdded ? `✓ ${preset}` : `+ ${preset}`}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Custom Input */}
                      <div>
                        <label className="text-xs font-bold text-slate-300 mb-1.5 block">Add Custom Skill</label>
                        <div className="flex gap-2">
                          <input
                            className="clean-input flex-1"
                            placeholder="e.g. PyTorch, FastApi, GraphQL, Tailwind..."
                            value={newSkill}
                            onChange={e => setNewSkill(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === 'Enter' && newSkill.trim()) {
                                if (!formData.technicalSkills.includes(newSkill.trim())) {
                                  setFormData({
                                    ...formData,
                                    technicalSkills: [...formData.technicalSkills, newSkill.trim()]
                                  });
                                }
                                setNewSkill('');
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (newSkill.trim() && !formData.technicalSkills.includes(newSkill.trim())) {
                                setFormData({
                                  ...formData,
                                  technicalSkills: [...formData.technicalSkills, newSkill.trim()]
                                });
                                setNewSkill('');
                              }
                            }}
                            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all shadow-md"
                          >
                            + Add
                          </button>
                        </div>
                      </div>

                      {/* Current Active Skills List */}
                      <div>
                        <label className="text-xs font-bold text-slate-300 mb-2 block">
                          Active Skills ({formData.technicalSkills.length})
                        </label>
                        <div className="flex flex-wrap gap-2 p-4 rounded-2xl bg-[#0e1628] border border-slate-800">
                          {formData.technicalSkills.map(s => (
                            <span
                              key={s}
                              className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-200 text-xs font-bold flex items-center gap-2"
                            >
                              <span>{s}</span>
                              <button
                                type="button"
                                onClick={() => setFormData({
                                  ...formData,
                                  technicalSkills: formData.technicalSkills.filter(x => x !== s)
                                })}
                                className="hover:text-rose-400 font-bold"
                              >
                                ✕
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SECTION 4: LEETCODE & SIH */}
                  {editSection === 'coding' && (
                    <div className="space-y-4 max-w-3xl">
                      <div className="border-b border-slate-800 pb-2">
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          <Code2 className="w-4 h-4 text-amber-400" />
                          Coding Profiles & Competitive Programming
                        </h4>
                        <p className="text-xs text-slate-400">Verified scores boost your rank in online assessment matching.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-300 mb-1.5 block">LeetCode Contest Rating</label>
                          <input
                            className="clean-input"
                            value={formData.codingProfiles.leetcode?.rating || 1850}
                            onChange={e => setFormData({
                              ...formData,
                              codingProfiles: {
                                ...formData.codingProfiles,
                                leetcode: {
                                  ...formData.codingProfiles.leetcode,
                                  rating: parseInt(e.target.value) || 1850,
                                  solved: formData.codingProfiles.leetcode?.solved || 640
                                }
                              }
                            })}
                            placeholder="1850"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-300 mb-1.5 block">Total Problems Solved</label>
                          <input
                            className="clean-input"
                            value={formData.codingProfiles.leetcode?.solved || 640}
                            onChange={e => setFormData({
                              ...formData,
                              codingProfiles: {
                                ...formData.codingProfiles,
                                leetcode: {
                                  ...formData.codingProfiles.leetcode,
                                  rating: formData.codingProfiles.leetcode?.rating || 1850,
                                  solved: parseInt(e.target.value) || 640
                                }
                              }
                            })}
                            placeholder="640"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SECTION 5: PROJECTS */}
                  {editSection === 'projects' && (
                    <div className="space-y-4 max-w-3xl">
                      <div className="border-b border-slate-800 pb-2">
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          <FolderCode className="w-4 h-4 text-cyan-400" />
                          Featured Projects
                        </h4>
                        <p className="text-xs text-slate-400">Highlight hands-on builds, full stack apps, and AI implementations.</p>
                      </div>

                      {formData.projects.map((proj, idx) => (
                        <div key={proj.id} className="p-4 rounded-2xl bg-[#0e1628] border border-slate-800 space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-xs font-bold text-slate-300 mb-1 block">Project Title</label>
                              <input
                                className="clean-input"
                                value={proj.name}
                                onChange={e => {
                                  const updated = [...formData.projects];
                                  updated[idx] = { ...updated[idx], name: e.target.value };
                                  setFormData({ ...formData, projects: updated });
                                }}
                              />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-slate-300 mb-1 block">Category / Role</label>
                              <input
                                className="clean-input"
                                value={proj.category}
                                onChange={e => {
                                  const updated = [...formData.projects];
                                  updated[idx] = { ...updated[idx], category: e.target.value };
                                  setFormData({ ...formData, projects: updated });
                                }}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-bold text-slate-300 mb-1 block">Description</label>
                            <textarea
                              rows={2}
                              className="clean-input !h-auto"
                              value={proj.description}
                              onChange={e => {
                                const updated = [...formData.projects];
                                updated[idx] = { ...updated[idx], description: e.target.value };
                                setFormData({ ...formData, projects: updated });
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Form Footer Action Bar */}
                <div className="p-5 border-t border-slate-800 bg-[#080d1a] flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Changes are automatically verified & synced with ATS matcher.
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setProfileModalMode('view')}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition-all border border-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveEdit}
                      className="btn-cyan-download !text-xs !py-2.5 !px-6"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
