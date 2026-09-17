import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  FileDown,
  Menu,
  X,
  ArrowUpRight
} from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Architecture', href: '#mind' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 pt-3 pb-2 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto rounded-2xl transition-all duration-200 ${
          scrolled
            ? 'bg-[#0B132B]/85 backdrop-blur-xl border border-white/15 shadow-2xl px-4 py-2.5'
            : 'bg-[#0E1738]/80 backdrop-blur-md border border-white/10 px-4 py-3'
        } flex items-center justify-between`}
      >
        {/* Brand Monogram & Title */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 group focus-editorial rounded-lg"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#00D2FF] to-[#DC143C] flex items-center justify-center font-mono font-bold text-xs text-[#0B132B] shadow-[0_0_12px_rgba(0,210,255,0.3)] transition-transform group-hover:scale-105">
            SP
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-[#00D2FF] transition-colors">
              Swayam Prabhu
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 hidden sm:inline">
              Computer Engineer
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#091024]/80 p-1 rounded-xl border border-white/10 text-xs font-medium">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer focus-editorial"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Action Icons & Buttons */}
        <div className="flex items-center gap-2">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            title="Command Palette (Ctrl+K / Cmd+K)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0E1738]/80 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white text-xs font-mono transition-all cursor-pointer focus-editorial"
          >
            <Terminal className="w-3.5 h-3.5 text-[#00D2FF]" />
            <span className="hidden sm:inline text-[11px]">Ctrl+K</span>
          </button>

          {/* Resume PDF Download */}
          <a
            href={`${import.meta.env.BASE_URL}resume/Swayam-Resume.pdf`}
            download="Swayam-Prabhu-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#00D2FF] to-[#00A3FF] hover:from-[#33DCFF] hover:to-[#00B4FF] text-[#0B132B] font-sans text-xs font-bold shadow-[0_0_15px_rgba(0,210,255,0.35)] hover:shadow-[0_0_20px_rgba(0,210,255,0.5)] transition-all cursor-pointer focus-editorial"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#0E1738] border border-white/15 text-slate-300 hover:bg-white/10 focus-editorial"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="md:hidden mt-2 p-4 rounded-2xl bg-[#0B132B]/95 backdrop-blur-xl border border-white/15 shadow-2xl space-y-3 font-sans text-sm"
          >
            <div className="grid grid-cols-2 gap-1.5">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.href)}
                  className="px-3 py-2.5 rounded-xl text-left font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10">
              <a
                href={`${import.meta.env.BASE_URL}resume/Swayam-Resume.pdf`}
                download="Swayam-Prabhu-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-[#00D2FF] to-[#00A3FF] text-[#0B132B] font-bold flex items-center justify-center gap-2 text-xs shadow-sm"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
