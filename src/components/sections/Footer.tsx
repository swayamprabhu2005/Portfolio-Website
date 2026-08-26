import React from 'react';
import {
  Github,
  Linkedin,
  Mail,
  FileDown,
  ArrowUp,
  Sparkles
} from 'lucide-react';
import { sounds } from '../ui/SoundEffects';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#040508] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Identity */}
        <div className="space-y-1 text-center md:text-left">
          <div className="font-display font-black text-lg text-white tracking-tight">
            SWAYAM KIRAN PRABHU
          </div>
          <div className="font-mono text-xs text-slate-400">
            Computer Engineering • Software • AI • Systems
          </div>
          <div className="font-mono text-[10px] text-slate-500">
            Padre Conceicao College of Engineering, Goa
          </div>
        </div>

        {/* Center: Social & Action Links */}
        <div className="flex items-center gap-4 font-mono text-xs">
          <a
            href="https://github.com/swayamprabhu2005"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/swayam-prabhu-b1490a287/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:23ce172.swayam@pccegoa.edu.in"
            onClick={() => sounds.playClick()}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="/Swayam_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all"
            title="Resume PDF"
          >
            <FileDown className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Scroll to Top */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-slate-500 hidden sm:inline">
            SYSTEM BOOT: 2026.08
          </span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-purple-950/40 border border-white/10 hover:border-purple-500/40 text-slate-300 hover:text-white font-mono text-xs transition-all cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
