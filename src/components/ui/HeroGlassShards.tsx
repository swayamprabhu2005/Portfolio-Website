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
    // Shards fly in along irregular fracture paths and lock in; cracks dissolve smoothly
    const timer = setTimeout(() => {
      setAssembled(true);
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
      
      {/* LEFT COLUMN: Shard 1 (Upper-Left) & Shard 2 (Lower-Left) */}
      <div className="md:col-span-7 flex flex-col gap-5 sm:gap-6">
        
        {/* SHARD 1: Upper-Left Organic Broken Shard (Headline, Role Badges, Subtitle) */}
        <motion.div
          initial={{ opacity: 0, x: -45, y: -30, rotate: -3 }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            // Organic cracked polygon boundary on the right and bottom seams
            clipPath: 'polygon(0% 0%, 100% 0%, 98% 88%, 93% 100%, 0% 97%)',
          }}
          className={`relative p-6 sm:p-8 rounded-2xl bg-[#09112A]/40 backdrop-blur-xl transition-all duration-700 ${
            assembled
              ? 'border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.2)]'
              : 'border border-[#00D2FF]/60 shadow-[0_0_25px_rgba(0,210,255,0.3)]'
          }`}
        >
          {/* Glowing crack line overlay during assembly flight */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
              assembled ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              boxShadow: 'inset 0 0 15px rgba(0, 210, 255, 0.4), 0 0 10px rgba(0, 210, 255, 0.3)',
            }}
          />

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

        {/* SHARD 2: Lower-Left Organic Broken Shard (Bio Narrative, Action Buttons, Location) */}
        <motion.div
          initial={{ opacity: 0, x: -40, y: 35, rotate: 2 }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={{
            // Organic cracked polygon boundary on the top and right seams
            clipPath: 'polygon(0% 4%, 93% 0%, 98% 12%, 100% 100%, 0% 100%)',
          }}
          className={`relative p-6 sm:p-8 rounded-2xl bg-[#09112A]/40 backdrop-blur-xl transition-all duration-700 ${
            assembled
              ? 'border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.2)]'
              : 'border border-[#FF007F]/60 shadow-[0_0_25px_rgba(255,0,127,0.3)]'
          }`}
        >
          {/* Glowing crack line overlay during assembly flight */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
              assembled ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              boxShadow: 'inset 0 0 15px rgba(255, 0, 127, 0.35), 0 0 10px rgba(255, 0, 127, 0.3)',
            }}
          />

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

      {/* RIGHT COLUMN: Shard 3 Organic Portrait Shard (Image 3) */}
      <motion.div
        initial={{ opacity: 0, x: 50, y: 0, rotate: 3, scale: 0.94 }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="md:col-span-5 flex justify-center md:justify-end"
      >
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[380px] aspect-[4/5] mx-auto md:mr-0">
          
          {/* Subtle multi-colored background ambient glow behind portrait */}
          <div className="absolute -inset-2 bg-gradient-to-tr from-[#00D2FF]/30 via-[#7B2CBF]/20 to-[#FF007F]/20 rounded-3xl blur-2xl -z-10 transition-all pointer-events-none" />

          {/* Organic broken polygon portrait frame - NO CAPTION BAR */}
          <div
            style={{
              clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 97%)',
            }}
            className={`relative w-full h-full rounded-2xl overflow-hidden bg-[#070D1E]/80 backdrop-blur-md shadow-2xl transition-all duration-700 ${
              assembled
                ? 'border border-white/15'
                : 'border-2 border-[#00D2FF]/70 shadow-[0_0_30px_rgba(0,210,255,0.35)]'
            }`}
          >
            {/* Crack outline overlay that dissolves smoothly */}
            <div
              className={`absolute inset-0 pointer-events-none z-20 transition-opacity duration-1000 ${
                assembled ? 'opacity-0' : 'opacity-100'
              }`}
              style={{
                boxShadow: 'inset 0 0 20px rgba(0, 210, 255, 0.5)',
              }}
            />

            <SecurePortrait
              src={`${import.meta.env.BASE_URL}swayam.jpeg`}
              alt="Swayam Kiran Prabhu"
              className="w-full h-full filter contrast-[1.03] transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>
      </motion.div>

    </div>
  );
};
