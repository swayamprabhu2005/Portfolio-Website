import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  FileDown,
  MapPin,
  Github,
  Linkedin
} from 'lucide-react';
import { ShimmerButton } from '../ui/ShimmerButton';
import { SecurePortrait } from '../ui/SecurePortrait';

interface HeroGlassShardsProps {
  onOpenResumeModal?: () => void;
  scrollToSection: (id: string) => void;
}

export const HeroGlassShards: React.FC<HeroGlassShardsProps> = ({
  onOpenResumeModal,
  scrollToSection,
}) => {
  const [assembled, setAssembled] = useState(false);

  useEffect(() => {
    // 3 Shards fly together along organic fracture seams over 1.2s; cracks smoothly blend away
    const timer = setTimeout(() => {
      setAssembled(true);
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  return (
    /* SINGLE UNIFIED RECTANGULAR GLASS SCREEN (Image 3) */
    <div className="relative w-full max-w-6xl mx-auto rounded-3xl overflow-hidden border border-white/20 bg-[#080E24]/35 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.35)] transition-all duration-700">
      
      {/* Subtle Ambient Refraction Sheen across the monolithic glass card */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#00D2FF]/10 pointer-events-none" />

      {/* 3 Seamlessly Interlocking Shards touching edge-to-edge */}
      <div className="relative w-full grid grid-cols-1 md:grid-cols-12 min-h-[540px]">
        
        {/* LEFT COLUMN: Shards 1 & 2 (md:col-span-7) */}
        <div className="md:col-span-7 flex flex-col relative">
          
          {/* SHARD 1: Upper-Left (Headline, Badges, Title Pitch) */}
          <motion.div
            initial={{ opacity: 0, x: -35, y: -25, rotate: -1.5 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative p-6 sm:p-8 lg:p-10 flex-1 flex flex-col justify-center"
          >
            {/* Overline Tag & Role Subtitle */}
            <div className="space-y-2.5">
              <div>
                <span className="inline-flex items-center font-mono text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#0E1738]/80 border border-[#00D2FF]/40 text-[#00D2FF] shadow-[0_0_12px_rgba(0,210,255,0.25)]">
                  Computer Engineer
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap font-mono text-xs uppercase tracking-wider text-slate-300">
                <span className="whitespace-nowrap">Full Stack Developer</span>
                <span className="text-[#00D2FF]/60 font-bold">•</span>
                <span className="whitespace-nowrap">Software Developer</span>
                <span className="text-[#00D2FF]/60 font-bold">•</span>
                <span className="whitespace-nowrap">AI Application Developer</span>
              </div>
            </div>

            {/* Editorial Headline */}
            <div className="space-y-2.5 mt-3 sm:mt-4">
              <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.05]">
                Swayam Kiran Prabhu
              </h1>
              <p className="font-display text-lg sm:text-xl lg:text-2xl text-slate-200 font-semibold tracking-tight leading-snug">
                Computer Engineer building software, AI & intelligent systems.
              </p>
            </div>
          </motion.div>

          {/* ORGANIC CRACK SEAM BETWEEN SHARD 1 AND SHARD 2 (Bubbling / cracked contour) */}
          <div className="relative w-full h-[1px] px-6">
            <svg
              className={`w-full h-4 -my-2 overflow-visible pointer-events-none transition-opacity duration-1000 ${
                assembled ? 'opacity-30' : 'opacity-100'
              }`}
              viewBox="0 0 700 20"
              preserveAspectRatio="none"
            >
              <path
                d="M0,10 Q140,2 260,14 T480,8 T700,10"
                fill="none"
                stroke={assembled ? 'rgba(255,255,255,0.2)' : 'rgba(0,210,255,0.85)'}
                strokeWidth={assembled ? '1' : '2'}
                filter={assembled ? undefined : 'drop-shadow(0 0 6px rgba(0,210,255,0.8))'}
              />
            </svg>
          </div>

          {/* SHARD 2: Lower-Left (Bio Narrative, Action Buttons, Location) */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 25, rotate: 1 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            transition={{ duration: 1.1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative p-6 sm:p-8 lg:p-10 flex-1 flex flex-col justify-center"
          >
            {/* Narrative Bio */}
            <p className="text-slate-300 text-sm sm:text-base font-sans leading-relaxed max-w-xl">
              Undergraduate engineer at Padre Conceicao College of Engineering learning through building real systems — from full-stack web architectures and deep learning models to agentic LLM workflows.
            </p>

            {/* Action CTAs (View Projects RETAINED + Download Resume + Socials) */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap pt-4">
              <ShimmerButton
                onClick={() => scrollToSection('work')}
                variant="primary"
                size="md"
                icon={<ArrowDown className="w-4 h-4" />}
              >
                View Projects
              </ShimmerButton>

              <button
                onClick={onOpenResumeModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0E1738]/80 hover:bg-[#14214D] text-white border border-white/20 shadow-sm hover:shadow-md text-xs sm:text-sm font-semibold transition-all focus-editorial hover:border-[#00D2FF]/50 cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-[#00D2FF]" />
                <span>Download Resume</span>
              </button>

              {/* Social Links */}
              <div className="flex items-center gap-2 pl-0.5">
                <a
                  href="https://github.com/swayamprabhu2005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#0E1738]/80 hover:bg-[#14214D] border border-white/20 text-slate-300 hover:text-white shadow-sm transition-all focus-editorial hover:border-[#00D2FF]/50"
                  title="GitHub Profile"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/swayam-prabhu-b1490a287/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#0E1738]/80 hover:bg-[#14214D] border border-white/20 text-slate-300 hover:text-white shadow-sm transition-all focus-editorial hover:border-[#00D2FF]/50"
                  title="LinkedIn Profile"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Location Metadata */}
            <div className="pt-3.5 mt-3.5 border-t border-white/10 flex items-center gap-4 font-mono text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Goa, India
              </span>
            </div>
          </motion.div>
        </div>

        {/* ORGANIC VERTICAL CRACK DIVIDER BETWEEN LEFT SHARDS AND RIGHT SHARD */}
        <div className="hidden md:block absolute top-0 bottom-0 left-[58.333%] w-[2px] -ml-[1px] pointer-events-none z-10">
          <svg
            className={`w-6 h-full -ml-3 overflow-visible transition-opacity duration-1000 ${
              assembled ? 'opacity-30' : 'opacity-100'
            }`}
            viewBox="0 0 20 600"
            preserveAspectRatio="none"
          >
            <path
              d="M10,0 Q18,120 7,240 T15,400 T8,600"
              fill="none"
              stroke={assembled ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.9)'}
              strokeWidth={assembled ? '1' : '2'}
              filter={assembled ? undefined : 'drop-shadow(0 0 8px rgba(0,210,255,0.9))'}
            />
          </svg>
        </div>

        {/* SHARD 3: Right Portrait Photo (md:col-span-5) */}
        <motion.div
          initial={{ opacity: 0, x: 40, y: 0, rotate: 1.5, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5 relative flex items-center justify-center p-6 sm:p-8"
        >
          {/* Portrait Container fitting seamlessly into the glass card - NO CAPTION BAR */}
          <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-[#050B1A]/80">
            <SecurePortrait
              src={`${import.meta.env.BASE_URL}swayam.jpeg`}
              alt="Swayam Kiran Prabhu"
              className="w-full h-full filter contrast-[1.03] transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
};
