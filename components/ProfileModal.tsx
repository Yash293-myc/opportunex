'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Download, Upload, FileText, Trophy, Code2, Edit3, Check, Plus, Trash2, 
  Sparkles, CheckCircle2, GraduationCap, Building2, ExternalLink, Calendar,
  Star, Briefcase, RefreshCw, Eye, ShieldCheck, Award, FolderCode
} from 'lucide-react';
import { useAppStore, StudentProfile } from '@/lib/store';
import { 
  PythonLogo, ReactLogo, MLLogo, SQLLogo, TypeScriptLogo, NodeLogo,
  CollegeCrestLogo, LeetCodeOfficialLogo, SIHOfficialLogo, CodeFestLogo,
  AIChatbotLogo, WebPlatformLogo, PDFDocumentLogo,
  SkillBadgeWithLogo, ProjectBadgeWithLogo 
} from '@/components/TechAndCollegeLogos';

export default function ProfileModal() {
  const { 
    profile, setProfile, showProfileModal, setShowProfileModal, 
    profileModalMode, setProfileModalMode,
    uploadedResumeFile, setUploadedResumeFile
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'resume' | 'hackathons' | 'leetcode' | 'overview'>('resume');
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
          {/* Frosted Glass Overlay with Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-xl transition-all"
            onClick={() => setShowProfileModal(false)}
          />

          {/* ─── BIG, EXPANSIVE ULTRA-FROSTED GLASS MODAL BOX ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 18 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl xl:max-w-6xl z-10 overflow-hidden rounded-[28px] border border-cyan-400/30 bg-slate-950/45 backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,0.7)] text-slate-100"
            style={{
              backdropFilter: 'blur(32px) saturate(190%)',
              WebkitBackdropFilter: 'blur(32px) saturate(190%)',
            }}
          >
            {/* Ambient Refractive Glow Highlights */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-cyan-500/25 via-blue-600/15 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-purple-600/20 via-emerald-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* ─── MODAL HEADER BAR ─── */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-4 sm:py-5 border-b border-white/10 relative z-10 bg-white/[0.02]">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 to-indigo-600 p-0.5 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 flex-shrink-0">
                  <div className="w-full h-full bg-[#0a0f1e]/80 rounded-[14px] flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-cyan-300" />
                  </div>
                </div>
                <div>
                  <h2 className="text-white text-base sm:text-lg font-black tracking-wider uppercase flex items-center gap-2">
                    <span>STUDENT PROFILE CARD</span>
                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      <ShieldCheck className="w-3 h-3" /> Verified Student
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
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.16] border border-white/20 text-xs font-bold text-slate-200 hover:text-white transition-all backdrop-blur-md shadow-sm"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Edit</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setProfileModalMode('view')}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.16] border border-white/20 text-xs font-bold text-slate-200 hover:text-white transition-all backdrop-blur-md"
                  >
                    <span>View Card</span>
                  </button>
                )}

                <button
                  onClick={() => setShowProfileModal(false)}
                  className="w-9 h-9 rounded-xl border border-white/15 bg-white/[0.06] flex items-center justify-center hover:bg-rose-500/20 hover:border-rose-500/40 text-slate-400 hover:text-rose-200 transition-all backdrop-blur-md"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {profileModalMode === 'view' ? (
              /* ======================================================== */
              /* BIG TRANSPARENT VIEW MODE (MATCHING USER SCREENSHOT)     */
              /* ======================================================== */
              <div 
                className="p-6 sm:p-8 lg:p-10 space-y-7 relative z-10 max-h-[82vh] overflow-y-auto"
                style={{ scrollbarWidth: 'thin' }}
              >
                {/* 1. TOP ROW: EDUCATION, SKILLS, PROJECTS (WITH OFFICIAL LOGOS) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* EDUCATION BOX WITH OFFICIAL COLLEGE CREST LOGO */}
                  <div className="space-y-2">
                    <p className="text-xs font-extrabold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                      EDUCATION
                    </p>
                    <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.12] hover:border-cyan-400/40 hover:bg-white/[0.07] transition-all flex items-start gap-4 shadow-lg min-h-[96px]">
                      {/* Official University Crest Emblem */}
                      <CollegeCrestLogo className="w-12 h-12" />

                      <div className="min-w-0 flex-1">
                        <h4 className="text-white font-black text-sm sm:text-base leading-snug truncate">
                          {profile.college || 'XYZ Institute of Technology'}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-slate-300 text-xs sm:text-sm font-semibold">
                            {profile.degree || 'B.Tech CSE'}
                          </span>
                          <span className="text-slate-500 font-normal">|</span>
                          <span className="text-emerald-400 font-extrabold text-xs sm:text-sm bg-emerald-500/15 px-2 py-0.5 rounded-md border border-emerald-500/30">
                            {profile.education[0]?.cgpa || '8.7'} CGPA
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Class of 2024–2028 • Accredited Institute
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SKILLS BOX WITH AUTHENTIC LOGOS (PYTHON, REACT, ML, SQL) */}
                  <div className="space-y-2">
                    <p className="text-xs font-extrabold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      SKILLS
                    </p>
                    <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.12] hover:border-cyan-400/40 hover:bg-white/[0.07] transition-all flex flex-wrap gap-2 items-center min-h-[96px] shadow-lg">
                      {/* Authentic skill badges with genuine logos */}
                      <SkillBadgeWithLogo skill="Python" />
                      <SkillBadgeWithLogo skill="React" />
                      <SkillBadgeWithLogo skill="ML" />
                      <SkillBadgeWithLogo skill="SQL" />
                      {profile.technicalSkills.filter(s => !['python', 'react', 'ml', 'sql'].includes(s.toLowerCase())).slice(0, 2).map(extra => (
                        <SkillBadgeWithLogo key={extra} skill={extra} />
                      ))}
                    </div>
                  </div>

                  {/* PROJECTS BOX WITH AUTHENTIC LOGOS (AI CHATBOT, WEB PLATFORM) */}
                  <div className="space-y-2">
                    <p className="text-xs font-extrabold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                      <FolderCode className="w-3.5 h-3.5 text-cyan-400" />
                      PROJECTS
                    </p>
                    <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.12] hover:border-cyan-400/40 hover:bg-white/[0.07] transition-all flex flex-wrap gap-2 items-center min-h-[96px] shadow-lg">
                      <ProjectBadgeWithLogo name="AI Chatbot" />
                      <ProjectBadgeWithLogo name="Web Platform" />
                      {profile.projects.filter(p => !p.name.toLowerCase().includes('chatbot') && !p.name.toLowerCase().includes('platform')).slice(0, 1).map(extra => (
                        <ProjectBadgeWithLogo key={extra.id} name={extra.name} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. SUB TABS (Resume, Hackathons, LeetCode, Overview) */}
                <div className="flex items-center gap-6 sm:gap-10 border-b border-white/10 text-xs sm:text-sm font-bold pt-2">
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

                {/* 3. DEDICATED RESUME UPLOADER (WHEN RESUME TAB IS ACTIVE) */}
                {activeTab === 'resume' && (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/[0.12] bg-white/[0.04] backdrop-blur-xl p-6 space-y-5 shadow-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          {/* Official Adobe PDF Logo */}
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
                            <p className="text-xs text-slate-400 mt-0.5">
                              {uploadedResumeFile?.fileSize || '142 KB'} • Uploaded {uploadedResumeFile?.uploadDate || '27 Sep 2026'} • Verified for AI Opportunity Matching
                            </p>
                          </div>
                        </div>

                        {/* Hidden Native File Input */}
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                        />

                        {/* Upload trigger button */}
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.16] border border-white/20 text-xs font-bold text-white transition-all shadow-md backdrop-blur-md flex-shrink-0"
                        >
                          <Upload className="w-4 h-4 text-cyan-400" />
                          <span>Upload New Resume</span>
                        </button>
                      </div>

                      {uploadSuccess && (
                        <div className="text-xs text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-4 py-2.5 rounded-xl flex items-center gap-2 backdrop-blur-md">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span>Resume uploaded successfully! Verified for automated ATS parsing and opportunity alignment.</span>
                        </div>
                      )}

                      {/* Drag & Drop Visual Box with Frosted Transparency */}
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="p-8 rounded-2xl border-2 border-dashed border-white/20 hover:border-cyan-400/60 bg-slate-900/30 backdrop-blur-md text-center cursor-pointer transition-all hover:bg-slate-900/50 group"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center mx-auto mb-3 text-cyan-400 group-hover:scale-110 transition-transform">
                          <Upload className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-bold text-white mb-1">
                          Drag and drop your PDF / Word resume here, or <span className="text-cyan-400 underline font-extrabold">browse files</span>
                        </p>
                        <p className="text-xs text-slate-400">
                          Supports PDF, DOCX up to 10 MB • Automatically syncs credentials, projects & hackathons
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. HACKATHONS & LEETCODE GRID (WITH OFFICIAL HIGH-RES LOGOS) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* HACKATHONS BOX WITH OFFICIAL LOGOS */}
                  <div className="space-y-3">
                    <p className="text-xs font-extrabold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      HACKATHONS & COMPETITIONS
                    </p>

                    {/* Hackathon 1 with Official SIH Emblem Logo */}
                    <div className="p-4 sm:p-4.5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.12] hover:border-amber-400/40 hover:bg-white/[0.07] transition-all flex items-start gap-3.5 shadow-lg">
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
                        <p className="text-[11px] text-slate-400 mt-1">
                          Organized by AICTE & Govt of India • Grand Finale Team Lead
                        </p>
                      </div>
                    </div>

                    {/* Hackathon 2 with CodeFest Trophy Logo */}
                    <div className="p-4 sm:p-4.5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.12] hover:border-emerald-400/40 hover:bg-white/[0.07] transition-all flex items-start gap-3.5 shadow-lg">
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
                        <p className="text-[11px] text-slate-400 mt-1">
                          NIT Karnataka • Web Architecture & Algorithm Division
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* LEETCODE BOX WITH AUTHENTIC LEETCODE LOGO & STATS */}
                  <div className="space-y-3">
                    <p className="text-xs font-extrabold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-amber-400" />
                      LEETCODE & COMPETITIVE PROGRAMMING
                    </p>

                    <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.12] hover:border-cyan-400/40 hover:bg-white/[0.07] transition-all space-y-4 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Official LeetCode Icon */}
                          <LeetCodeOfficialLogo className="w-9 h-9" />
                          <div>
                            <span className="font-black text-white text-sm sm:text-base">&lt;/&gt; 1850 Rating</span>
                            <span className="text-[11px] text-slate-400 block font-semibold">Knight Rank • Guardian Track</span>
                          </div>
                        </div>

                        <span className="text-[11px] font-black text-cyan-300 bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-400/40 shadow-sm">
                          Top 2.5%
                        </span>
                      </div>

                      {/* 4-Box Solved Grid with Transparent Glass Boxes */}
                      <div className="grid grid-cols-4 gap-2.5 text-center pt-3 border-t border-white/10">
                        <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-md">
                          <p className="text-[11px] font-semibold text-slate-400">Solved</p>
                          <p className="text-base font-black text-white mt-0.5">640</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 backdrop-blur-md">
                          <p className="text-[11px] font-semibold text-emerald-400">Easy</p>
                          <p className="text-base font-black text-emerald-400 mt-0.5">250</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 backdrop-blur-md">
                          <p className="text-[11px] font-semibold text-amber-400">Medium</p>
                          <p className="text-base font-black text-amber-400 mt-0.5">310</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 backdrop-blur-md">
                          <p className="text-[11px] font-semibold text-rose-400">Hard</p>
                          <p className="text-base font-black text-rose-400 mt-0.5">80</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. PROMINENT CYAN DOWNLOAD RESUME BUTTON */}
                <div className="pt-2">
                  <button
                    onClick={handleDownloadResume}
                    className="btn-cyan-download w-full !py-4 !text-sm !font-black !rounded-2xl tracking-wide shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 flex items-center justify-center gap-2"
                    id="modal-download-resume-btn"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Resume ({uploadedResumeFile?.fileName || 'Rahul_Sharma_BTech_Resume_2026.pdf'})</span>
                  </button>
                </div>
              </div>
            ) : (
              /* ======================================================== */
              /* EDIT MODE: DIRECT COMPREHENSIVE FORM                     */
              /* ======================================================== */
              <div className="p-6 sm:p-8 lg:p-10 space-y-6 max-h-[82vh] overflow-y-auto relative z-10" style={{ scrollbarWidth: 'thin' }}>
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-cyan-400" />
                  Edit Student Profile & Academic Credentials
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 font-semibold mb-1.5 block">Full Name</label>
                    <input
                      className="clean-input"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-semibold mb-1.5 block">College / University</label>
                    <input
                      className="clean-input"
                      value={formData.college}
                      onChange={e => setFormData({ ...formData, college: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 font-semibold mb-1.5 block">Degree</label>
                    <input
                      className="clean-input"
                      value={formData.degree}
                      onChange={e => setFormData({ ...formData, degree: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-semibold mb-1.5 block">CGPA</label>
                    <input
                      className="clean-input"
                      value={formData.education[0]?.cgpa || '8.7'}
                      onChange={e => {
                        const updated = [...formData.education];
                        if (updated[0]) updated[0].cgpa = e.target.value;
                        setFormData({ ...formData, education: updated });
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-semibold mb-1.5 block">LeetCode Rating</label>
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
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold mb-1.5 block">Short Headline</label>
                  <input
                    className="clean-input"
                    value={formData.headline}
                    onChange={e => setFormData({ ...formData, headline: e.target.value })}
                  />
                </div>

                {/* Skills Editor */}
                <div>
                  <label className="text-xs text-slate-300 font-semibold mb-1.5 block">Technical Skills (Type and press Enter)</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      className="clean-input flex-1"
                      placeholder="e.g. Next.js, Docker, PyTorch"
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
                      onClick={() => {
                        if (newSkill.trim() && !formData.technicalSkills.includes(newSkill.trim())) {
                          setFormData({
                            ...formData,
                            technicalSkills: [...formData.technicalSkills, newSkill.trim()]
                          });
                          setNewSkill('');
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-bold transition-all"
                    >
                      + Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                    {formData.technicalSkills.map(s => (
                      <span key={s} className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-200 text-xs font-semibold flex items-center gap-2 backdrop-blur-md">
                        {s}
                        <button
                          onClick={() => setFormData({
                            ...formData,
                            technicalSkills: formData.technicalSkills.filter(x => x !== s)
                          })}
                          className="hover:text-rose-400 transition-colors"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => setProfileModalMode('view')}
                    className="px-5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-xs font-bold text-slate-300 hover:text-white transition-all border border-white/15"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="btn-cyan-download !text-xs !py-2.5 !px-6"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
