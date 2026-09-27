'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, User, BookOpen, Zap, Star } from 'lucide-react';
import { useAppStore, StudentProfile } from '@/lib/store';
import { Interest } from '@/lib/opportunities';

const COMMON_SKILLS = [
  'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'Next.js',
  'Machine Learning', 'PyTorch', 'TensorFlow', 'NLP', 'Computer Vision',
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'DevOps',
  'Figma', 'UI/UX Design', 'Photoshop', 'Illustrator',
  'Java', 'C++', 'Go', 'Rust', 'SQL', 'MongoDB',
  'Git', 'Open Source', 'Blockchain', 'Web3', 'IoT',
];

const INTERESTS: Interest[] = ['AI/ML', 'Web Dev', 'Cloud', 'Open Source', 'UI/UX'];
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Masters', 'PhD', 'Graduate'];

export default function ProfileModal() {
  const { profile, setProfile, showProfileModal, setShowProfileModal } = useAppStore();
  
  const [form, setForm] = useState<StudentProfile>(profile || {
    name: '',
    college: '',
    degree: '',
    year: '2nd Year',
    skills: [],
    interests: [],
  });
  const [skillInput, setSkillInput] = useState('');
  const [error, setError] = useState('');

  const addSkill = (skill: string) => {
    const s = skill.trim();
    if (!s) return;
    if (!form.skills.includes(s)) {
      setForm(f => ({ ...f, skills: [...f.skills, s] }));
    }
    setSkillInput('');
  };

  const removeSkill = (skill: string) => {
    setForm(f => ({ ...f, skills: f.skills.filter(s => s !== skill) }));
  };

  const toggleInterest = (interest: Interest) => {
    setForm(f => ({
      ...f,
      interests: f.interests.includes(interest)
        ? f.interests.filter(i => i !== interest)
        : [...f.interests, interest]
    }));
  };

  const handleSave = () => {
    if (!form.name.trim()) { setError('Please enter your name'); return; }
    if (!form.college.trim()) { setError('Please enter your college'); return; }
    setProfile(form);
    setShowProfileModal(false);
    setError('');
  };

  const interestColors: Record<Interest, string> = {
    'AI/ML': 'from-violet-500 to-purple-600',
    'Web Dev': 'from-blue-500 to-cyan-500',
    'Cloud': 'from-sky-500 to-blue-600',
    'Open Source': 'from-emerald-500 to-teal-600',
    'UI/UX': 'from-pink-500 to-rose-600',
  };

  return (
    <AnimatePresence>
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowProfileModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl p-6 z-10"
            style={{ scrollbarWidth: 'none' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Student Profile</h2>
                  <p className="text-sm text-white/50">Power your personalized matches</p>
                </div>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="glass-btn p-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-5">
              {/* Name & College row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/60 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Full Name
                  </label>
                  <input
                    className="glass-input w-full rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="e.g. Priya Sharma"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    id="profile-name"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-1.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> College / University
                  </label>
                  <input
                    className="glass-input w-full rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="e.g. IIT Bombay"
                    value={form.college}
                    onChange={e => setForm(f => ({ ...f, college: e.target.value }))}
                    id="profile-college"
                  />
                </div>
              </div>

              {/* Degree & Year */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/60 mb-1.5 block">Degree / Course</label>
                  <input
                    className="glass-input w-full rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="e.g. B.Tech Computer Science"
                    value={form.degree}
                    onChange={e => setForm(f => ({ ...f, degree: e.target.value }))}
                    id="profile-degree"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-1.5 block">Year of Study</label>
                  <select
                    className="glass-input w-full rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none"
                    value={form.year}
                    onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                    id="profile-year"
                  >
                    {YEARS.map(y => <option key={y} value={y} className="bg-slate-900">{y}</option>)}
                  </select>
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="text-sm text-white/60 mb-1.5 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> Core Skills
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    className="glass-input flex-1 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="Type a skill and press Enter"
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addSkill(skillInput)}
                    id="profile-skill-input"
                  />
                  <button
                    onClick={() => addSkill(skillInput)}
                    className="glass-btn px-4 py-3 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-white/70" />
                  </button>
                </div>
                {/* Quick add chips */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {COMMON_SKILLS.filter(s => !form.skills.includes(s)).slice(0, 12).map(skill => (
                    <button
                      key={skill}
                      onClick={() => addSkill(skill)}
                      className="text-xs px-2.5 py-1 rounded-lg glass-chip hover:bg-indigo-500/20 transition-colors text-white/50 hover:text-white/80"
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
                {/* Selected skills */}
                {form.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {form.skills.map(skill => (
                      <span key={skill} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm">
                        {skill}
                        <button onClick={() => removeSkill(skill)}>
                          <X className="w-3 h-3 hover:text-white transition-colors" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Interests */}
              <div>
                <label className="text-sm text-white/60 mb-2 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5" /> Career Interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map(interest => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        form.interests.includes(interest)
                          ? `bg-gradient-to-r ${interestColors[interest]} text-white shadow-lg shadow-${interest.toLowerCase()}-500/20`
                          : 'glass-chip text-white/50 hover:text-white/80'
                      }`}
                      id={`interest-${interest.replace('/', '-')}`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                {profile && (
                  <button
                    onClick={() => { setProfile({ name: '', college: '', degree: '', year: '', skills: [], interests: [] }); setShowProfileModal(false); }}
                    className="glass-btn flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-red-500/10 hover:border-red-500/30 transition-colors text-white/60 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" /> Clear Profile
                  </button>
                )}
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
                  id="save-profile-btn"
                >
                  Save Profile & Start Matching ✦
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
