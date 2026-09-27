'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Sparkles, Send, Bot, User, Cpu, Zap, Key, ArrowRight, 
  FileText, CheckCircle2, RefreshCw, Copy, Check, ChevronRight,
  ShieldCheck, MessageSquare, Terminal
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  model?: string;
  timestamp: string;
}

export default function AICopilotModal() {
  const { 
    showAICopilot, setShowAICopilot, 
    geminiApiKey, grokApiKey, profile,
    uploadedResumeFile, setActiveNav
  } = useAppStore();

  const [activeModel, setActiveModel] = useState<'gemini' | 'grok' | 'neural'>('gemini');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-init',
      sender: 'ai',
      text: `Hello ${profile.name.split(' ')[0]}! I'm your TalentOrbit Career Copilot. I've analyzed your academic records at ${profile.college}, your verified skills in Python, React, and ML, and your SIH 2023 victory. How can I help boost your applications today?`,
      model: 'Gemini 2.0 Flash',
      timestamp: 'Just now'
    }
  ]);

  const quickPrompts = [
    'Analyze my resume fit for Google Summer of Code',
    'Generate top 3 winning project ideas for SIH 2026',
    'Mock interview questions for Microsoft SDE intern',
    'How do I boost my LeetCode rating to 2000+?'
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = (msgToSend?: string) => {
    const query = msgToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // AI Response generation
    setTimeout(() => {
      let aiReply = '';
      const modelName = activeModel === 'grok' 
        ? (grokApiKey ? 'xAI Grok-2' : 'Grok Engine') 
        : activeModel === 'gemini' 
          ? (geminiApiKey ? 'Google Gemini 2.0' : 'Gemini Flash Engine') 
          : 'TalentOrbit Neural';

      const q = query.toLowerCase();
      if (q.includes('resume') || q.includes('google') || q.includes('gsoc')) {
        aiReply = `📊 **Resume Fit Analysis for Google Summer of Code / Top Tech:**\n\n• **Match Score:** 95% (Top Tier Candidate)\n• **Key Strengths:** Strong full-stack proficiency with React & Node.js, verified Knight rank in LeetCode (1850), and national SIH podium credential.\n• **High-Impact Recommendations:**\n  1. Highlight open-source pull requests on GitHub in the top 3 bullet points.\n  2. Emphasize low-latency API optimization and caching metrics from your AI Chatbot project.\n  3. Mention CI/CD & container deployment (Docker/AWS).\n• **ATS Keyword Status:** Python, React, FastApi, Distributed Systems all verified.`;
      } else if (q.includes('sih') || q.includes('project') || q.includes('hackathon')) {
        aiReply = `🏆 **Top 3 Winning Project Architectures for SIH 2026:**\n\n1. **Decentralized Land & Credential Verification:** Uses blockchain + zero-knowledge proof OCR to eliminate counterfeit university certificates.\n2. **AI Grievance Prioritization Engine:** Uses lightweight NLP embeddings to cluster citizen complaints and auto-route emergency alerts to government bodies.\n3. **Predictive Energy Load Dispatcher:** Leverages time-series ML for institutional grid conservation.\n\n💡 *Pro-tip: Focus your slide deck on clear cost-savings and scalability.*`;
      } else if (q.includes('interview') || q.includes('microsoft')) {
        aiReply = `🎯 **Microsoft SDE Internship Technical Interview Checklist:**\n\n1. **Data Structures:** "Implement LRU Cache in O(1) time" & "Detect cycle in Directed Graph".\n2. **System Design:** "How would you design a real-time notification service for 500,000 active students?" (Leverage your CampusConnect WebSocket experience).\n3. **Behavioral:** "Describe a high-pressure deadline during SIH 2023 and how your team resolved unexpected architectural bugs."`;
      } else {
        aiReply = `✨ Based on your verified credentials (${profile.college}, ${profile.education[0]?.cgpa} CGPA, and ${profile.technicalSkills.length} verified technical skills), you are currently in the **Top 2.5% of candidate matches** for our 14 active openings. I recommend applying to the **Meta AI Research Internship** and **Smart India Hackathon 2026** today!`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: aiReply,
          model: modelName,
          timestamp: 'Just now'
        }
      ]);
      setIsTyping(false);
    }, 850);
  };

  return (
    <AnimatePresence>
      {showAICopilot && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Dark Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setShowAICopilot(false)}
          />

          {/* ─── SIDEBAR DRAWER (OPENS FROM THE RIGHT SIDE) ─── */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 h-full w-full max-w-xl z-50 bg-[#0b101e] border-l border-slate-700/80 shadow-[0_0_80px_rgba(0,0,0,0.85)] flex flex-col"
            style={{ backgroundColor: '#0b101e' }}
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-800 bg-[#090d19] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600 p-0.5 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/25">
                  <div className="w-full h-full bg-[#080c16] rounded-[14px] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-extrabold text-base flex items-center gap-2">
                    <span>AI Career Copilot</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                      ACTIVE
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Dual Model Intelligence: Gemini 2.0 & xAI Grok
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowAICopilot(false)}
                className="w-9 h-9 rounded-xl border border-slate-700 bg-slate-800/80 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Close sidebar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Model Selector Bar */}
            <div className="px-5 py-2.5 bg-[#0e1424] border-b border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#090d19] border border-slate-800 text-xs w-full sm:w-auto">
                <button
                  onClick={() => setActiveModel('gemini')}
                  className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeModel === 'gemini' 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Gemini 2.0</span>
                </button>

                <button
                  onClick={() => setActiveModel('grok')}
                  className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeModel === 'grok' 
                      ? 'bg-purple-600 text-white shadow-sm' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Grok-2</span>
                </button>

                <button
                  onClick={() => setActiveModel('neural')}
                  className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeModel === 'neural' 
                      ? 'bg-cyan-600 text-white shadow-sm' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Neural</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setShowAICopilot(false);
                  setActiveNav('settings');
                }}
                className="hidden sm:flex items-center gap-1 text-[11px] text-cyan-400 hover:underline font-semibold"
              >
                <Key className="w-3 h-3" />
                <span>API Keys</span>
              </button>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ scrollbarWidth: 'thin' }}>
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 flex-shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-1.5 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-tr-sm shadow-md'
                          : 'bg-[#12192c] text-slate-100 border border-slate-700/80 rounded-tl-sm shadow-md'
                      }`}
                    >
                      {msg.text}
                    </div>

                    <div className="flex items-center gap-2 px-1 text-[10px] text-slate-400">
                      <span>{msg.timestamp}</span>
                      {msg.model && (
                        <>
                          <span>•</span>
                          <span className="text-cyan-400 font-semibold">{msg.model}</span>
                        </>
                      )}
                      {msg.sender === 'ai' && (
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="ml-auto hover:text-white flex items-center gap-1 text-[10px]"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 flex-shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-cyan-400 p-3 bg-[#12192c] border border-slate-800 rounded-2xl w-fit">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>Synthesizing career strategy with {activeModel.toUpperCase()}...</span>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="p-3 bg-[#090d19] border-t border-slate-800/80 overflow-x-auto">
              <div className="flex gap-2 text-xs whitespace-nowrap">
                {quickPrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(p)}
                    className="px-3 py-1.5 rounded-xl bg-[#12192c] hover:bg-[#1a233d] border border-slate-700/80 text-slate-300 hover:text-cyan-300 text-xs font-medium transition-all flex items-center gap-1.5 flex-shrink-0"
                  >
                    <span>{p}</span>
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>

            {/* Input Box Bar */}
            <div className="p-4 border-t border-slate-800 bg-[#0b101e]">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder={`Ask ${activeModel === 'grok' ? 'Grok-2' : 'Gemini 2.0'} about resumes, hackathons...`}
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                  className="flex-1 bg-[#12192c] border border-slate-700/90 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="p-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md shadow-blue-600/30 transition-all flex-shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
