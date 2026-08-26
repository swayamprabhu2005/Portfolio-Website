import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Volume2,
  VolumeX,
  FileDown,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { sounds } from '../ui/SoundEffects';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sounds.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Mind & AI', href: '#mind' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Systems', href: '#currently-building' },
    { label: 'Internships', href: '#internships' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    sounds.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 pt-4 pb-2 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0d16]/80 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)] px-4 sm:px-6 py-2.5'
            : 'bg-transparent px-2 sm:px-4 py-3'
        } flex items-center justify-between`}
      >
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={() => sounds.playClick()}
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-[1px] shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            <div className="w-full h-full bg-[#090b10] rounded-[7px] flex items-center justify-center font-display font-black text-sm text-white group-hover:bg-transparent transition-colors">
              SP
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-purple-300 transition-colors">
              SWAYAM PRABHU
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 hidden sm:inline">
              Comp Eng • AI • Systems
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-full px-3 py-1 text-xs font-mono">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              onMouseEnter={() => sounds.playHover()}
              className="px-3 py-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Action Icons & Buttons */}
        <div className="flex items-center gap-2">
          {/* Command Palette Trigger */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenCommandPalette();
            }}
            onMouseEnter={() => sounds.playHover()}
            title="Command Palette (Cmd+K)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-purple-950/50 border border-white/10 hover:border-purple-500/40 text-slate-300 hover:text-white text-xs font-mono transition-all cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Cmd+K</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'Unmute Synthesized Sound FX' : 'Mute Sound FX'}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Resume PDF Download */}
          <a
            href="/Swayam_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono text-xs font-semibold shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mt-2 p-4 rounded-2xl bg-[#0d1017] border border-white/15 backdrop-blur-2xl shadow-2xl space-y-2 font-mono text-xs"
          >
            <div className="grid grid-cols-2 gap-1.5">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.href)}
                  className="px-3 py-2 rounded-lg text-left text-slate-300 hover:text-white hover:bg-purple-900/30 border border-transparent hover:border-purple-500/30 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <a
                href="/Swayam_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 rounded-xl bg-purple-600 text-white font-semibold flex items-center justify-center gap-2"
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
