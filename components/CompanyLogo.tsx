'use client';

interface Props {
  organization: string;
  className?: string;
  showText?: boolean;
}

export default function CompanyLogo({ organization, className = 'h-6', showText = true }: Props) {
  const org = organization.toLowerCase();

  if (org.includes('google')) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
        {showText && <span className="font-bold text-[var(--text-main)] text-sm tracking-tight">Google</span>}
      </div>
    );
  }

  if (org.includes('microsoft')) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
          <path fill="#F25022" d="M1 1h10v10H1z" />
          <path fill="#00A4EF" d="M1 13h10v10H1z" />
          <path fill="#7FBA00" d="M13 1h10v10H13z" />
          <path fill="#FFB900" d="M13 13h10v10H13z" />
        </svg>
        {showText && <span className="font-bold text-[var(--text-main)] text-sm tracking-tight">Microsoft</span>}
      </div>
    );
  }

  if (org.includes('meta')) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
          <path
            fill="#0668E1"
            d="M12 5.5c-2.3 0-4.3 1.2-5.4 3.1C5.2 6.4 3.2 5.5 1.5 5.5 0.7 5.5 0 6.2 0 7v10c0 .8.7 1.5 1.5 1.5 2.1 0 4-1.1 5.1-2.9 1.1 1.8 3 2.9 5.4 2.9 2.4 0 4.3-1.1 5.4-2.9 1.1 1.8 3 2.9 5.1 2.9.8 0 1.5-.7 1.5-1.5V7c0-.8-.7-1.5-1.5-1.5-1.7 0-3.7.9-5.1 3.1-1.1-1.9-3.1-3.1-5.4-3.1zm-6 9.5c-1.4 0-2.5-1.1-2.5-2.5S4.6 10 6 10s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5zm12 0c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"
          />
        </svg>
        {showText && <span className="font-bold text-[var(--text-main)] text-sm tracking-tight">Meta</span>}
      </div>
    );
  }

  if (org.includes('amazon') || org.includes('aws')) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="bg-[#232F3E] px-1.5 py-0.5 rounded flex items-center gap-1 border border-[#FF9900]/40">
          <span className="text-[#FF9900] font-black text-xs tracking-wider">AWS</span>
        </div>
        {showText && <span className="font-bold text-[var(--text-main)] text-sm tracking-tight">Amazon Web Services</span>}
      </div>
    );
  }

  if (org.includes('github')) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <svg className="w-5 h-5 flex-shrink-0 fill-[var(--text-main)]" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
        {showText && <span className="font-bold text-[var(--text-main)] text-sm tracking-tight">GitHub</span>}
      </div>
    );
  }

  if (org.includes('flipkart')) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-5 h-5 rounded-md bg-[#2874F0] flex items-center justify-center font-bold text-white text-xs border border-yellow-400">
          <span className="text-[#FFEB3B] font-black italic">f</span>
        </div>
        {showText && <span className="font-bold text-[var(--text-main)] text-sm tracking-tight">Flipkart</span>}
      </div>
    );
  }

  if (org.includes('adobe')) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-5 h-5 rounded bg-[#FA0F00] flex items-center justify-center font-bold text-white text-xs">
          <span className="font-black">A</span>
        </div>
        {showText && <span className="font-bold text-[var(--text-main)] text-sm tracking-tight">Adobe</span>}
      </div>
    );
  }

  if (org.includes('cloudflare')) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <svg className="w-5 h-5 text-[#F38020] fill-current flex-shrink-0" viewBox="0 0 24 24">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
        </svg>
        {showText && <span className="font-bold text-[var(--text-main)] text-sm tracking-tight">Cloudflare</span>}
      </div>
    );
  }

  if (org.includes('major league') || org.includes('mlh')) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-5 h-5 rounded bg-[#C32B27] flex items-center justify-center text-white text-[10px] font-black">
          MLH
        </div>
        {showText && <span className="font-bold text-[var(--text-main)] text-sm tracking-tight">Major League Hacking</span>}
      </div>
    );
  }

  if (org.includes('infosys')) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-5 h-5 rounded bg-[#007CC3] flex items-center justify-center text-white text-[10px] font-black">
          Infy
        </div>
        {showText && <span className="font-bold text-[var(--text-main)] text-sm tracking-tight">Infosys</span>}
      </div>
    );
  }

  if (org.includes('sih') || org.includes('smart india')) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-5 h-5 rounded bg-gradient-to-r from-orange-500 via-white to-green-500 flex items-center justify-center text-slate-900 font-black text-[9px] shadow-sm">
          SIH
        </div>
        {showText && <span className="font-bold text-[var(--text-main)] text-sm tracking-tight">SIH India</span>}
      </div>
    );
  }

  if (org.includes('mit')) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-5 h-5 rounded bg-[#8A1B29] flex items-center justify-center text-white font-mono font-bold text-[9px]">
          MIT
        </div>
        {showText && <span className="font-bold text-[var(--text-main)] text-sm tracking-tight">MIT Hackathon</span>}
      </div>
    );
  }

  if (org.includes('nasscom')) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-5 h-5 rounded bg-[#0A58CA] flex items-center justify-center text-white font-bold text-[8px]">
          NAS
        </div>
        {showText && <span className="font-bold text-[var(--text-main)] text-sm tracking-tight">NASSCOM</span>}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-5 h-5 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-xs">
        {organization.slice(0, 2).toUpperCase()}
      </div>
      {showText && <span className="font-bold text-[var(--text-main)] text-sm tracking-tight">{organization}</span>}
    </div>
  );
}
