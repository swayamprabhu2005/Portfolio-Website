import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  FileText,
  Copy,
  ExternalLink,
  Layers,
  Cpu,
  GraduationCap,
  Briefcase,
  Mail,
  Check,
  X,
  Code,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
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
    // open palette
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const scrollTo = (id: string) => {
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
        { label: 'Hero / Top', icon: Sparkles, action: () => scrollTo('hero') },
        { label: 'About & Background', icon: Layers, action: () => scrollTo('about') },
        { label: 'Selected Work & Projects', icon: Sparkles, action: () => scrollTo('work') },
        { label: 'Mind / Systems: Intelligent Systems Architecture', icon: Cpu, action: () => scrollTo('mind') },
        { label: 'Technical Skills Ecosystem', icon: Code, action: () => scrollTo('skills') },
        { label: 'Experience & Internships', icon: Briefcase, action: () => scrollTo('experience') },
        { label: 'Credentials & Certifications', icon: FileText, action: () => scrollTo('credentials') },
        { label: 'Education & Honors', icon: GraduationCap, action: () => scrollTo('education') },
        { label: 'Contact & Opportunities', icon: Mail, action: () => scrollTo('contact') },
      ],
    },
    {
      category: 'Quick Actions',
      items: [
        {
          label: 'Download Resume (PDF)',
          icon: FileText,
          action: () => {
            window.open(`${import.meta.env.BASE_URL}Swayam_Resume.pdf`, '_blank');
          },
        },
        {
          label: 'Copy Email: swayamkiranprabhu2005@gmail.com',
          icon: copied === 'email' ? Check : Copy,
          badge: copied === 'email' ? 'Copied!' : 'Copy',
          action: () => copyToClipboard('swayamkiranprabhu2005@gmail.com', 'email'),
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
            window.open('https://github.com/swayamprabhu2005', '_blank');
          },
        },
        {
          label: 'Open LinkedIn Profile',
          icon: ExternalLink,
          action: () => {
            window.open('https://www.linkedin.com/in/swayam-prabhu-b1490a287/', '_blank');
          },
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
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-xl bg-[#0B132B]/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 text-white"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-[#091024]/80">
              <Search className="w-4 h-4 text-[#00D2FF] mr-3 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands, projects, skills, or jump to section..."
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none font-sans"
              />
              <button
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors ml-2"
                aria-label="Close command palette"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Command List */}
            <div className="max-h-96 overflow-y-auto p-3 space-y-4">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-sm font-sans">
                  No matching items found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                filteredCommands.map((section) => (
                  <div key={section.category} className="space-y-1">
                    <div className="text-[11px] uppercase tracking-wider text-[#00D2FF] px-3 py-1 font-mono font-semibold">
                      {section.category}
                    </div>
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.label}
                          onClick={item.action}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs sm:text-sm text-slate-300 hover:text-white hover:bg-white/10 border border-transparent transition-all group cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <Icon className="w-4 h-4 text-slate-400 group-hover:text-[#00D2FF] shrink-0 transition-colors" />
                            <span className="truncate font-sans font-medium">{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#00D2FF]/15 text-[#00D2FF] border border-[#00D2FF]/30">
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
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#091024]/80 border-t border-white/10 text-[11px] text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <span>Flash & Kahhori Navigation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-[#0E1738] text-slate-300 font-mono text-[10px] border border-white/10">ESC</span>
                <span>to close</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
