import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  FileText,
  Copy,
  ExternalLink,
  Volume2,
  VolumeX,
  Sparkles,
  Layers,
  Cpu,
  GraduationCap,
  Briefcase,
  Mail,
  Check,
  X,
  Code
} from 'lucide-react';
import { sounds } from './SoundEffects';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(sounds.getMuted());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : handleOpenPalette();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleOpenPalette = () => {
    sounds.playClick();
    // handled by parent
  };

  const copyToClipboard = (text: string, label: string) => {
    sounds.playClick();
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const scrollTo = (id: string) => {
    sounds.playClick();
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const commands = [
    {
      category: 'Navigation',
      items: [
        { label: 'Hero / Overview', icon: Sparkles, action: () => scrollTo('hero') },
        { label: '01 / Engineering Narrative', icon: Layers, action: () => scrollTo('about') },
        { label: '02 / Interactive 3D Neural Brain', icon: Cpu, action: () => scrollTo('mind') },
        { label: '03 / Technology Ecosystem', icon: Code, action: () => scrollTo('skills') },
        { label: '04 / Featured Projects & VeritaScan', icon: Sparkles, action: () => scrollTo('projects') },
        { label: '05 / Currently Building: Automotive Black Box', icon: Cpu, action: () => scrollTo('currently-building') },
        { label: '06 / Current Internships (Creative Capsule)', icon: Briefcase, action: () => scrollTo('internships') },
        { label: '07 / Certifications Wall (Anthropic, IBM, NPTEL)', icon: FileText, action: () => scrollTo('certifications') },
        { label: '08 / Education & IDEAS 4.0 Finalist', icon: GraduationCap, action: () => scrollTo('education') },
        { label: '09 / Connect & Contact', icon: Mail, action: () => scrollTo('contact') },
      ],
    },
    {
      category: 'Quick Actions',
      items: [
        {
          label: 'Download Resume (PDF)',
          icon: FileText,
          action: () => {
            sounds.playClick();
            window.open('/Swayam_Resume.pdf', '_blank');
          },
        },
        {
          label: 'Copy Email: 23ce172.swayam@pccegoa.edu.in',
          icon: copied === 'email' ? Check : Copy,
          badge: copied === 'email' ? 'Copied!' : 'Copy',
          action: () => copyToClipboard('23ce172.swayam@pccegoa.edu.in', 'email'),
        },
        {
          label: 'Copy Phone: +91 8208921037',
          icon: copied === 'phone' ? Check : Copy,
          badge: copied === 'phone' ? 'Copied!' : 'Copy',
          action: () => copyToClipboard('+918208921037', 'phone'),
        },
        {
          label: 'Open GitHub Profile',
          icon: ExternalLink,
          action: () => {
            sounds.playClick();
            window.open('https://github.com/swayamprabhu2005', '_blank');
          },
        },
        {
          label: 'Open LinkedIn Profile',
          icon: ExternalLink,
          action: () => {
            sounds.playClick();
            window.open('https://www.linkedin.com/in/swayam-prabhu-b1490a287/', '_blank');
          },
        },
        {
          label: isMuted ? 'Unmute Synthesized Sound FX' : 'Mute Sound FX',
          icon: isMuted ? VolumeX : Volume2,
          badge: isMuted ? 'MUTED' : 'ACTIVE',
          action: toggleSound,
        },
      ],
    },
  ];

  const filteredCommands = commands
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-xl bg-[#0d1017] border border-white/15 rounded-2xl shadow-[0_20px_70px_rgba(0,0,0,0.8)] overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-[#121622]/50">
              <Search className="w-5 h-5 text-purple-400 mr-3 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or jump to section... (e.g. veritascan, resume, skills)"
                className="w-full bg-transparent text-sm sm:text-base text-slate-100 placeholder:text-slate-500 focus:outline-none font-mono"
              />
              <button
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Command List */}
            <div className="max-h-96 overflow-y-auto p-3 space-y-4 font-mono">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-slate-500 text-sm">
                  No matching commands found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                filteredCommands.map((section) => (
                  <div key={section.category} className="space-y-1">
                    <div className="text-[11px] uppercase tracking-wider text-slate-500 px-3 py-1 font-semibold">
                      {section.category}
                    </div>
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.label}
                          onClick={item.action}
                          onMouseEnter={() => sounds.playHover()}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs sm:text-sm text-slate-300 hover:text-white hover:bg-purple-950/40 hover:border-purple-500/30 border border-transparent transition-all group cursor-pointer"
                        >
                          <div className="flex items-center gap-3 truncate">
                            <Icon className="w-4 h-4 text-slate-400 group-hover:text-purple-400 shrink-0 transition-colors" />
                            <span className="truncate">{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer Hotkey Indicator */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#090b10] border-t border-white/10 text-[11px] text-slate-500 font-mono">
              <div className="flex items-center gap-2">
                <span>Navigation & Actions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-mono text-[10px]">ESC</span>
                <span>to close</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
