import React from 'react';
import {
  Github,
  Linkedin,
  Mail,
  FileDown,
  ArrowUp
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#070D1E]/95 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Identity */}
        <div className="space-y-1 text-center md:text-left">
          <div className="font-display font-black text-lg text-white tracking-tight">
            SWAYAM KIRAN PRABHU
          </div>
          <div className="font-mono text-xs text-slate-400">
            Computer Engineering
          </div>
          <div className="font-mono text-[11px] text-slate-500">
            Padre Conceicao College of Engineering, Goa
          </div>
        </div>

        {/* Center: Social & Action Links */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <a
            href="https://github.com/swayamprabhu2005"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-[#0E1738]/80 hover:bg-white/10 text-slate-300 hover:text-white border border-white/15 transition-all shadow-sm"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/swayam-prabhu-b1490a287/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-[#0E1738]/80 hover:bg-white/10 text-slate-300 hover:text-white border border-white/15 transition-all shadow-sm"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:swayamkiranprabhu2005@gmail.com"
            className="p-2.5 rounded-xl bg-[#0E1738]/80 hover:bg-white/10 text-slate-300 hover:text-white border border-white/15 transition-all shadow-sm"
            title="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href={`${import.meta.env.BASE_URL}Swayam_Resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-[#0E1738]/80 hover:bg-white/10 text-slate-300 hover:text-white border border-white/15 transition-all shadow-sm"
            title="Download Resume (PDF)"
          >
            <FileDown className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Colophon & Scroll to Top */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] text-slate-400 hidden sm:inline">
            Engineering Portfolio • 2026
          </span>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-[#0E1738]/80 hover:bg-[#00D2FF] hover:text-[#0B132B] text-slate-300 border border-white/15 transition-all shadow-sm cursor-pointer"
            title="Scroll to Top"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

