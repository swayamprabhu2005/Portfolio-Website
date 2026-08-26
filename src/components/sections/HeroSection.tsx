import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Scan,
  FileDown,
  MapPin,
  GraduationCap,
  Briefcase,
  Terminal,
  Activity
} from 'lucide-react';
import { ShimmerButton } from '../ui/ShimmerButton';
import { sounds } from '../ui/SoundEffects';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const [portraitOffset, setPortraitOffset] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 60]);

  const handlePortraitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!portraitRef.current) return;
    const rect = portraitRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.04;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.04;
    setPortraitOffset({ x, y });
  };

  const handlePortraitMouseLeave = () => {
    setPortraitOffset({ x: 0, y: 0 });
  };

  const scrollToSection = (id: string) => {
    sounds.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Animated Subtle Grid & Light Gradient */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-900/15 via-indigo-900/10 to-cyan-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Animated Container */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
      >
        {/* Left Column: Typography, Narrative & CTAs (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          {/* Small Technical Overline */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-2 flex-wrap"
          >
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 font-mono text-xs uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              Computer Engineering
            </span>
            <div className="h-px w-4 bg-white/20" />
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
              Software • AI • Edge Systems
            </span>
          </motion.div>

          {/* Large Hero Name Typography (Line by Line reveal) */}
          <div className="space-y-1">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white"
            >
              SWAYAM
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-gradient-purple-cyan"
            >
              KIRAN
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white"
            >
              PRABHU
            </motion.h1>
          </div>

          {/* Supporting Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-slate-300 text-base sm:text-lg md:text-xl font-sans leading-relaxed max-w-xl"
          >
            &ldquo;Building software systems today, exploring intelligent systems for tomorrow.&rdquo;
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-slate-400 text-xs sm:text-sm font-sans leading-relaxed max-w-lg"
          >
            Undergraduate engineer learning through building real systems — from full-stack architectures and forensic deep learning models to bare-metal automotive CAN bus firmware.
          </motion.p>

          {/* Interactive CTAs Stagger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex items-center gap-3 sm:gap-4 flex-wrap pt-2"
          >
            <ShimmerButton
              onClick={() => scrollToSection('projects')}
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              cursorLabel="EXPLORE WORK"
            >
              Explore Projects
            </ShimmerButton>

            <ShimmerButton
              onClick={() => scrollToSection('mind')}
              variant="glow"
              size="lg"
              icon={<Sparkles className="w-4 h-4 text-cyan-400" />}
              cursorLabel="3D NEURAL BRAIN"
            >
              Interactive Brain
            </ShimmerButton>

            <a
              href="/Swayam_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 hover:border-purple-400/40 text-xs sm:text-sm font-mono uppercase tracking-wider transition-all"
            >
              <FileDown className="w-4 h-4 text-purple-400" />
              <span>Resume PDF</span>
            </a>
          </motion.div>

          {/* Micro Metadata Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-6 border-t border-white/10 flex items-center gap-4 sm:gap-6 flex-wrap font-mono text-[11px] text-slate-400"
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              GOA / INDIA
            </span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              B.E. COMP ENG (9.23 CGPA)
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-purple-400" />
              CREATIVE CAPSULE INTERN
            </span>
          </motion.div>
        </div>

        {/* Right Column: Swayam's Portrait with Parallax, Badges & Shimmer (5 cols) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            ref={portraitRef}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handlePortraitMouseMove}
            onMouseLeave={handlePortraitMouseLeave}
            className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] rounded-3xl p-1 group"
          >
            {/* Ambient Background Aura */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-purple-600/30 via-indigo-600/20 to-cyan-500/30 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Portrait Frame */}
            <motion.div
              animate={{ x: portraitOffset.x, y: portraitOffset.y }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="relative w-full h-full rounded-3xl bg-[#0e111a] border border-white/15 overflow-hidden shadow-2xl"
            >
              {/* Actual Supplied Portrait Photograph */}
              <img
                src="/swayam.jpeg"
                alt="Swayam Kiran Prabhu"
                className="w-full h-full object-cover object-center filter contrast-105 brightness-100 transition-transform duration-700 group-hover:scale-105"
              />

              {/* Shimmer Light Sheen */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-transparent opacity-80" />

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>ACTIVE / 2026</span>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-purple-950/80 backdrop-blur-md border border-purple-500/40 text-purple-300 font-mono text-[10px] uppercase tracking-wider">
                  DEV & RESEARCH
                </div>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-[#090b12]/85 backdrop-blur-md border border-white/15 flex items-center justify-between">
                <div>
                  <div className="font-display font-bold text-sm text-white">Swayam Kiran Prabhu</div>
                  <div className="font-mono text-[10px] text-slate-400">Padre Conceicao College of Eng.</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs font-bold text-cyan-400">9.23 CGPA</div>
                  <div className="font-mono text-[9px] text-slate-400">COMPUTER ENG</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
